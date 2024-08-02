"use strict";

const authService = require("../services/auth.service");
const catchAsync = require("../utils/catch-async");

exports.httpSignup = catchAsync(async (req, res, next) => {
  return res.status(201).json({
    status: "success",
    data: await authService.signup(req.body),
  });
});

exports.httpLogin = catchAsync(async (req, res, next) => {
  const data = await authService.login(req.body);

  res.cookie("token", data.token, {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    // secure: true,
    httpOnly: true,
  });

  return res.status(200).json({
    status: "success",
    data,
  });
});

exports.httpForgotPassword = catchAsync(async (req, res, next) => {
  await authService.forgotPassword(req);

  return res.status(200).json({
    status: "success",
    message: "Reset token was sent to your email.",
  });
});

exports.httpResetPassword = catchAsync(async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: await authService.resetPassword(req.params.resetToken.req.body),
  });
});
