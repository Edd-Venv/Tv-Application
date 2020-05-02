const NodeCache = require("node-cache");
const Model = require("../../../models/MovieModels/ApiCalls/ApiCalls.js");

const Cache = new NodeCache();

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
      const finalResult = await Model.getMovieApiDataModel();
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
