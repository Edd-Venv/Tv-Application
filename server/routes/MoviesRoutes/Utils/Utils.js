const express = require("express");
const router = express.Router();
const movieController = require("../../../controllers/MoviesControllers/Utils/Utils.js");

//Saving a Searched Movie
router.post("/search/saveMovie", movieController.saveMovie);

///FETCHING SAVED Movies
router.get("/MyMovies", movieController.getMyMovies);

//DELETING SAVED MOVIES
router.delete("/MyMovies", movieController.deleteSavedMovie);

module.exports = router;
