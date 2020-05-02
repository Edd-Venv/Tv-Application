const express = require("express");
const moviesController = require("../../../controllers/MoviesControllers/ApiCalls/ApiCalls.js");

const router = express.Router();

router.get("/movieData", moviesController.getMovieApiData);
module.exports = router;
