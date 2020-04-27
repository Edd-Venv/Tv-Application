const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const Cache = new NodeCache();
const express = require("express");
const router = express.Router();

///// MOVIE SEARCH
router.post("/movieSearch", async (req, res) => {
  const moviesFirstApiCall = `https://www.omdbapi.com/?t=${req.body.search_text}&apikey=728de06e`;
  const moviesSecondApiCall = `https://tastedive.com/api/similar?q=${req.body.search_text}&type=movies&info=1&limit=1&verbose=1&k=341314-MusicApp-1I2LKOB1`;

  try {
    const exists = Cache.has(`${req.body.search_text}`);
    if (exists) {
      res.json({ data: Cache.get(`${req.body.search_text}`) });
    } else {
      const firstResult = await (await fetch(moviesFirstApiCall)).json();
      const secondResult = await (await fetch(moviesSecondApiCall)).json();
      const finalResult = [firstResult, secondResult];
      Cache.set(`${req.body.search_text}`, finalResult, 691200);
      res.json({ data: finalResult });
    }
  } catch (error) {
    res.json({ error: error });
  }
});
module.exports = router;
