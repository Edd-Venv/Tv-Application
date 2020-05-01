const express = require("express");
const router = express.Router();
const movieController = require("../../../controllers/MoviesControllers/Search/Search.js");

///// MOVIE SEARCH
router.post("/movieSearch", movieController.search);
module.exports = router;
