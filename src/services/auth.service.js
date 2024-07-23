"use strict";

const crypto = require("crypto");
const User = require("../models/user.schema");
const AppError = require("../utils/app-error");
const { signJwt } = require("../utils/jwt");
const sendMail = require("../utils/email");

exports.signup = async (body) => {
  const newUser = await User.create(body);
  const token = signJwt({ _id: newUser._id });

  return { token, newUser };
};

exports.login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Please provide email and password!", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password.", 401);
  }

  const token = signJwt({ _id: user._id });

  return { token, user };
};

exports.forgotPassword = async (req) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new AppError("There is no user with email and address.", 404);
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.host}:8080/api/v1/auth/reset-password/${resetToken}`;
  const text = resetURL;

  try {
    await sendMail({
      to: user.email,
      subject: "Your password reset token (valid for 10 min)",
      text,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new AppError(
      "An error occurred while sending the email. Try later!",
      500
    );
  }
};

exports.resetPassword = async (resetToken, body) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new AppError("Token is invalid or expired!", 400);
  }

  user.password = newPassword;
  user.confirmPassword = confirmNewPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  const token = signToken({ _id: user._id });

  return { token, user };
};
