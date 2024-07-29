"use strict";

const Review = require("../models/review.schema");
const AppError = require("../utils/app-error");

exports.getAllReviews = async (query) => {
  const reviews = await Review.find(query);
  return reviews;
};

exports.createReview = async (body) => {
  const newReview = await Review.create(body);
  return newReview;
};

exports.deleteReview = async (_id) => {
  const review = await Review.findByIdAndDelete(_id);
  if (!review) {
    throw new AppError("No reviews were found with this id", 404);
  }
};
