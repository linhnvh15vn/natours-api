"use strict";

const AppError = require("../utils/app-error");
const User = require("../models/user.schema");
const catchAsync = require("../utils/catch-async");
const jwt = require("jsonwebtoken");

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError(
      "You are not logged in! Please log in to get access.",
      401
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id);
  if (!user) {
    throw new AppError(
      "The user belonging to this token does no longer exist.",
      401
    );
  }

  if (user.changedPasswordAfter(decoded.iat)) {
    throw new AppError(
      "User recently changed password! Please log in again.",
      401
    );
  }

  req.user = user;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError(
        "You do not have permission to perform this action.",
        403
      );
    }

    next();
  };
};
