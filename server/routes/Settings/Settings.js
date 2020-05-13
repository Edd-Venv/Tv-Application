const express = require("express");
const settingsController = require("../../controllers/SettingsControllers/Settings.js");
const userSetUpController = require("../../controllers/UserSetUpControllers/UserSetUp.js");

const router = express.Router();

router.post("/forgotPassword", settingsController.forgotPassword);

router.patch("/resetPassword/:token", settingsController.resetPassword);

router.patch("/user/password", settingsController.changeUserPassWord);

router.patch("/user/name", settingsController.changeUserName);

router.delete("/user", settingsController.deleteUser);

router.patch(
  "/user/image",
  userSetUpController.uploadUserPhoto,
  userSetUpController.resizeUserPhoto,
  settingsController.updateUserImage
);

module.exports = router;
