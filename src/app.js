"use strict";

const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { default: helmet } = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const AppError = require("./utils/app-error");
const authRouter = require("./routes/auth.routes");
const tourRouter = require("./routes/tour.routes");
const userRouter = require("./routes/user.routes");
const bookingRouter = require("./routes/booking.routes");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. Please try again in an hour!",
});

// Middlewares
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(compression());

app.use(mongoSanitize());
app.use(xss());

app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookings", bookingRouter);

// Handle global errors
app.all("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
