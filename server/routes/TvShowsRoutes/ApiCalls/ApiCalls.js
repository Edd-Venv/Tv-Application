const express = require("express");
const router = express.Router();
const tvShowsController = require("../../../controllers/TvShowControllers/ApiCalls/ApiCalls.js");

//FETCH DATA
router.get("/apiData", tvShowsController.getTvShowsApiData);

module.exports = router;
