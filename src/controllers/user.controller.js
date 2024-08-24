"use strict";

const userService = require("../services/user.service");
const catchAsync = require("../utils/catch-async");

exports.httpGetMe = async (req, res, next) => {
  req.params._id = req.user._id;
  next();
};

exports.httpGetAllUsers = catchAsync(async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: await userService.getAllUsers(req.query),
  });
});

exports.httpGetUserById = catchAsync(async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: await userService.getUserById(req.params._id),
  });
});

exports.httpUpdateUser = catchAsync(async (req, res, next) => {
  return res.status(201).json({
    status: "success",
    data: await userService.updateUser(req.params._id, req.body),
  });
});

exports.httpDeleteUser = catchAsync(async (req, res, next) => {
  await userService.deleteUser(req.body);
  return res.status(204).json({
    status: "success",
  });
});
