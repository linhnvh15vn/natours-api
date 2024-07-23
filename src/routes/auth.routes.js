const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", authController.httpSignup);
authController.post("/login", authController.httpLogin);
authController.post("/forgot-password", authController.httpForgotPassword);
authController.post(
  "/reset-password/:resetToken",
  authController.httpResetPassword
);

module.exports = authRouter;
