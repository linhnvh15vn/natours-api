"use strict";

const User = require("../models/user.schema");
const AppError = require("../utils/app-error");
const { signJwt } = require("../utils/jwt");

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

exports.forgotPassword = async (body) => {};

exports.resetPassword = async (body) => {};
