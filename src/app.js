"use strict";

const express = require("express");
const morgan = require("morgan");

const authRouter = require("./routes/auth.routes");

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

module.exports = app;
