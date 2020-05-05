const express = require("express");
const tvShowsController = require("../../controllers/SettingsControllers/Settings.js");
const userSetUpController = require("../../controllers/UserSetUpControllers/UserSetUp.js");

const router = express.Router();

router.patch("/user/password", tvShowsController.changeUserPassWord);

router.patch("/user/name", tvShowsController.changeUserName);

router.delete("/user", tvShowsController.deleteUser);

router.patch(
  "/user/image",
  userSetUpController.uploadUserPhoto,
  userSetUpController.resizeUserPhoto,
  tvShowsController.updateUserImage
);

module.exports = router;
