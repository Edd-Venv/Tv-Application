const express = require("express");
const router = express.Router();
const tvShowsController = require("../../controllers/SettingsControllers/Settings.js");

router.patch("/settings/password", tvShowsController.changeUserPassWord);

router.patch("/settings/name", tvShowsController.changeUserName);

router.delete("/user", tvShowsController.deleteUser);

module.exports = router;
