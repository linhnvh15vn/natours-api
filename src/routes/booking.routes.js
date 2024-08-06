"use strict";

const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const bookingController = require("../controllers/booking.controller");

const bookingRouter = express.Router();

bookingRouter.get(
  "/checkout-session/:tourId",
  authMiddleware.protect,
  bookingController.httpGetCheckoutSession
);

module.exports = bookingRouter;
