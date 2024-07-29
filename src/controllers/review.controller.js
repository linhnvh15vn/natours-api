"use strict";

const reviewService = require("../services/review.service");
const catchAsync = require("../utils/catch-async");

exports.httpGetAllReviews = catchAsync(async (req, res, next) => {
  let query = {};
  if (req.params.tourId) query = { tour: req.params.tourId };

  return res.status(200).json({
    status: "success",
    data: await reviewService.getAllReviews(query),
  });
});

exports.httpCreateReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;

  return res.status(201).json({
    status: "success",
    data: await reviewService.createReview(req.body),
  });
});

exports.httpDeleteReview = catchAsync(async (req, res, next) => {
  await reviewService.deleteReview(req.params._id);

  return res.status(204).json({
    status: "success",
  });
});
