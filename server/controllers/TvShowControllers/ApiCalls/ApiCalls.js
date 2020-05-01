const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const Cache = new NodeCache();

const apiData = "https://api.tvmaze.com/shows";

exports.getTvShowsApiData = async (req, res) => {
  try {
    const exists = Cache.has("apiData");

    if (exists) {
      res.status(200).json({
        status: "success",
        results: Cache.get("apiData").length,
        data: Cache.get("apiData"),
      });
    } else {
      const result = await (await fetch(apiData)).json();
      Cache.set("apiData", result, 691200);

      res
        .status(200)
        .json({ status: "success", results: result.length, data: result });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: error });
  }
};
