const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", authController.httpSignup);
authRouter.post("/login", authController.httpLogin);
authRouter.post("/forgot-password", authController.httpForgotPassword);
authRouter.post(
  "/reset-password/:resetToken",
  authController.httpResetPassword
);

module.exports = authRouter;
