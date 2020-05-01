const pool = require("../../../database-connection/db.js");
const { isAuth } = require("../../../src/isAuth.js");
const express = require("express");
const router = express.Router();
const tvShowsUtilsController = require("../../../controllers/TvShowControllers/Utils/Utils.js");

//Saving a show after the user authentication
router.post("/", tvShowsUtilsController.saveShow);

//Saving a searched Show
router.post("/search/saveShow", tvShowsUtilsController.saveShow);

//Getting saved Shows
router.get("/MyShows", tvShowsUtilsController.getMyShows);

//Delete saved Shows
router.delete("/MyShows", tvShowsUtilsController.deleteSavedShow);

module.exports = router;
