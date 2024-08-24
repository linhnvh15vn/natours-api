"use strict";

const Tour = require("../models/tour.schema");
const AppError = require("../utils/app-error");
const { excludedFields } = require("../constants");

exports.getAllTours = async (query) => {
  let queryObj = { ...query };
  excludedFields.forEach((field) => delete queryObj[field]);
  delete queryObj["name"];

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let executedQuery = Tour.find({
    name: new RegExp(query.name, "i"),
    ...JSON.parse(queryStr),
  });

  if (query.sort) {
    executedQuery = executedQuery.sort(query.sort);
  } else {
    executedQuery = executedQuery.sort("-createdAt");
  }

  const page = query.page || 1;
  const limit = query.limit || 15;
  const skip = (page - 1) * limit;

  executedQuery = executedQuery.skip(skip).limit(limit);

  const tours = await executedQuery.select(
    "_id name duration maxGroupSize difficulty ratingsAverage ratingsQuantity price summary imageCover startDates startLocation locations"
  );

  const totalItems = await Tour.countDocuments();
  const totalPage = Math.ceil(totalItems / limit);

  return {
    currentItemCount: tours.length,
    itemsPerPage: limit,
    totalItems,
    totalPage,
    items: tours,
  };
};

exports.getTourById = async (_id) => {
  const tour = await Tour.findById(_id).populate("reviews");
  if (!tour) {
    throw new AppError("No tours were found with this id", 404);
  }

  return tour;
};

exports.createTour = async (body) => {
  const newTour = await Tour.create(body);
  return newTour;
};

exports.updateTour = async (_id, body) => {
  const tour = await Tour.findByIdAndUpdate(_id, body, {
    new: true,
    runValidators: true,
  });
  if (!tour) {
    throw new AppError("No tours were found with this id", 404);
  }

  return tour;
};

exports.deleteTour = async (_id) => {
  const tour = await Tour.findByIdAndDelete(_id);
  if (!tour) {
    throw new AppError("No tours were found with this id", 404);
  }
};
