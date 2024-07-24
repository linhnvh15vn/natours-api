"use strict";

const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/app-error");
const authRouter = require("./routes/auth.routes");
const tourRouter = require("./routes/tour.routes");
const userRouter = require("./routes/user.routes");

const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tour", tourRouter);
app.use("/api/v1/users", userRouter);

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
