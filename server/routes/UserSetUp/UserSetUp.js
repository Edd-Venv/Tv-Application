const express = require("express");
const router = express.Router();
const userSetUpController = require("../../controllers/UserSetUpControllers/UserSetUp.js");

// 1. Register a user
router.post("/register", userSetUpController.register);

// 2. Login a user
router.post("/login", userSetUpController.login);

// 3. Logout a user
router.post("/logout", userSetUpController.logOut);

// 4. Get a new access token with a refresh token
router.post("/refresh_token", userSetUpController.refreshToken);

module.exports = router;
