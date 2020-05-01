const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const Cache = new NodeCache();

const movieApi1 =
  "https://www.omdbapi.com/?t=Bohemian Rhapsody&apikey=728de06e";
const movieApi2 = "https://www.omdbapi.com/?t=A Star Is Born&apikey=728de06e";
const movieApi3 =
  "https://www.omdbapi.com/?t=Fantastic Beasts: The Crimes Of Grindelwald&apikey=728de06e";
const movieApi4 =
  "https://www.omdbapi.com/?t=Jurassic World: Fallen Kingdom&apikey=728de06e";

exports.getMovieApiData = async (req, res) => {
  try {
    const exists = Cache.has("movieData");

    if (exists) {
      res.status(200).json({
        status: "success",
        results: Cache.get("movieData").length,
        data: Cache.get("movieData"),
      });
    } else {
      const result1 = await (await fetch(movieApi1)).json();
      const result2 = await (await fetch(movieApi2)).json();
      const result3 = await (await fetch(movieApi3)).json();
      const result4 = await (await fetch(movieApi4)).json();
      finalResult = [result1, result2, result3, result4];
      Cache.set("movieData", finalResult, 691200);
      res.status(200).json({
        status: "success",
        results: finalResult.length,
        data: finalResult,
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error });
  }
};
