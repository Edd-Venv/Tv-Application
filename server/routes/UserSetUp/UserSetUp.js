const express = require("express");
const userSetUpController = require("../../controllers/UserSetUpControllers/UserSetUp.js");

const router = express.Router();

// 1. Register a user
router.post(
  "/register",
  userSetUpController.uploadUserPhoto,
  userSetUpController.resizeUserPhoto,
  userSetUpController.register
);

// 2. Login a user
router.post("/login", userSetUpController.login);

// 3. Logout a user
router.post("/logout", userSetUpController.logOut);

// 4. Get a new access token with a refresh token
router.post("/refresh_token", userSetUpController.refreshToken);

module.exports = router;
