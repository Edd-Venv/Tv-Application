const express = require("express");
const router = express.Router();
const tvShowController = require("../../../controllers/TvShowControllers/Search/Search.js");

router.post("/search", tvShowController.search);

module.exports = router;
