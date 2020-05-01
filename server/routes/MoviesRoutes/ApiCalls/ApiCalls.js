const express = require("express");
const router = express.Router();
const moviesController = require("../../../controllers/MoviesControllers/ApiCalls/ApiCalls.js");

router.get("/movieData", moviesController.getMovieApiData);
module.exports = router;
