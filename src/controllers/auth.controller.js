"use strict";

const authService = require("../services/auth.service");
const catchAsync = require("../utils/catch-async");

exports.httpSignup = catchAsync(async (req, res, next) => {
  return res.status(201).json({
    status: "success",
    data: await authService.signup(req.body),
  });
});

exports.httpLogin = catchAsync(async (req, res, next) => {});
