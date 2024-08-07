"use strict";

const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.get(
  "/me",
  authMiddleware.protect,
  userController.httpGetMe,
  userController.httpGetUserById
);

userRouter.get(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo("admin"),
  userController.httpGetAllUsers
);

userRouter
  .route("/:_id")
  .get(authMiddleware.protect, userController.httpGetUserById)
  .patch(authMiddleware.protect, userController.httpUpdateUser)
  .delete(authMiddleware.protect, userController.httpDeleteUser);

module.exports = userRouter;
