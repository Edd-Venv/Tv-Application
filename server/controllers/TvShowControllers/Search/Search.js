const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const Cache = new NodeCache();

exports.search = async (req, res) => {
  const tvShowsFirstApi = `https://api.tvmaze.com/search/shows?q=${req.body.search_text}&embed=seasons`;
  const tvShowsSecondApi = `https://tastedive.com/api/similar?q=${req.body.search_text}&type=shows&info=1&verbose=1&k=341314-MusicApp-1I2LKOB1`;

  try {
    const exists = Cache.has(`${req.body.search_text}`);
    if (exists) {
      res.status(200).json({
        status: "success",
        results: Cache.get(`${req.body.search_text}`).length,
        data: Cache.get(`${req.body.search_text}`),
      });
    } else {
      const firstResult = await (await fetch(tvShowsFirstApi)).json();
      const secondResult = await (await fetch(tvShowsSecondApi)).json();
      const finalResult = [firstResult, secondResult];
      Cache.set(`${req.body.search_text}`, finalResult, 691200);

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
