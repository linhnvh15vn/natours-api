"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const catchAsync = require("../utils/catch-async");
const Tour = require("../models/tour.schema");
const Booking = require("../models/booking.schema");

exports.httpGetCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);

  /* See more information about session object:
  https://docs.stripe.com/api/checkout/sessions/object */
  const session = stripe.checkout.session.create({
    payment_method_types: ["card"],
    // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get("host")}/my-tours?alert=booking`,
    cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [
          `${req.protocol}://${req.get("host")}/img/tours/${tour.imageCover}`,
        ],
        amount: tour.price * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });

  return res.status(200).json({
    status: "success",
    session,
  });
});

exports.createBookingCheckout = async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour && !user && !price) {
    return next();
  }

  await Booking.create({
    tour,
    user,
    price,
  });

  next();
};
