const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const Cache = new NodeCache();
const express = require("express");
const router = express.Router();

//FETCH DATA
const apiData = "https://api.tvmaze.com/shows";
router.get("/apiData", async (req, res) => {
  try {
    const exists = Cache.has("apiData");

    if (exists) {
      res.json({ data: Cache.get("apiData") });
    } else {
      const result = await (await fetch(apiData)).json();
      Cache.set("apiData", result, 691200);
      res.json({ data: result });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
