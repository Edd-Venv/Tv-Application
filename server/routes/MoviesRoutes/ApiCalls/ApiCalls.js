const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const Cache = new NodeCache();
const express = require("express");
const router = express.Router();

//FETCH MOVIE DATA
const movieApi1 =
  "https://www.omdbapi.com/?t=Bohemian Rhapsody&apikey=728de06e";
const movieApi2 = "https://www.omdbapi.com/?t=A Star Is Born&apikey=728de06e";
const movieApi3 =
  "https://www.omdbapi.com/?t=Fantastic Beasts: The Crimes Of Grindelwald&apikey=728de06e";
const movieApi4 =
  "https://www.omdbapi.com/?t=Jurassic World: Fallen Kingdom&apikey=728de06e";
router.get("/movieData", async (req, res) => {
  try {
    const exists = Cache.has("movieData");

    if (exists) {
      res.json({ data: Cache.get("movieData") });
    } else {
      const result1 = await (await fetch(movieApi1)).json();
      const result2 = await (await fetch(movieApi2)).json();
      const result3 = await (await fetch(movieApi3)).json();
      const result4 = await (await fetch(movieApi4)).json();
      finalResult = [result1, result2, result3, result4];
      Cache.set("movieData", finalResult, 691200);
      res.json({ data: finalResult });
    }
  } catch (error) {
    res.json({ error: error });
  }
});
module.exports = router;
