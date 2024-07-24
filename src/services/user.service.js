"use strict";

const { excludedFields } = require("../constants");
const User = require("../models/user.schema");
const AppError = require("../utils/app-error");

exports.getAllUsers = async (query) => {
  const queryObj = { ...query };
  excludedFields.forEach((field) => delete queryObj[field]);

  let query = User.find(queryObj);

  if (query.sort) {
    query = query.sort(query.sort);
  } else {
    query = query.sort("-createdAt");
  }

  const page = query.page || 1;
  const limit = query.limit || 15;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const users = await query;

  const totalItems = await User.countDocuments();
  const totalPage = Math.ceil(totalItems / limit);

  return {
    currentItemCount: users.length,
    itemsPerPage: limit,
    totalItems,
    totalPage,
    items: users,
  };
};

exports.getUserById = async (_id) => {
  const user = await User.findById(_id);
  if (!user) {
    throw new AppError("No users were found with this id", 404);
  }

  return user;
};

exports.updateUser = async (_id, body) => {
  const user = await User.findByIdAndUpdate(_id, body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new AppError("No users were found with this id", 404);
  }

  return user;
};

exports.deleteUser = async (_id) => {
  const user = await User.findByIdAndUpdate(_id, {
    active: false,
  });
  if (!user) {
    throw new AppError("No users were found with this id", 404);
  }
};
