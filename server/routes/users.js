import express from "express";
import * as userController from "../controllers/user/userController.js";

export const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", userController.register);

// @route POST api/users/login
// @desc Login user
// @access Public
router.post("/login", userController.login);
