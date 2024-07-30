"use strict";

const { excludedFields } = require("../constants");
const User = require("../models/user.schema");
const AppError = require("../utils/app-error");

exports.getAllUsers = async (query) => {
  if (query.all) {
    const users = await User.find({
      $or: [{ role: "guide" }, { role: "lead-guide" }],
    });

    return users.map((user) => ({
      label: user.name,
      value: user._id,
    }));
  }

  const queryObj = { ...query };
  excludedFields.forEach((field) => delete queryObj[field]);

  let executedQuery = User.find(queryObj);

  if (query.sort) {
    executedQuery = executedQuery.sort(query.sort);
  } else {
    executedQuery = executedQuery.sort("-createdAt");
  }

  const page = query.page || 1;
  const limit = query.limit || 15;
  const skip = (page - 1) * limit;

  executedQuery = executedQuery.skip(skip).limit(limit);

  const users = await executedQuery;

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
