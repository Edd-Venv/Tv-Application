const NodeCache = require("node-cache");
const fetch = require("node-fetch");
const Cache = new NodeCache();

exports.search = async (req, res) => {
  const moviesFirstApiCall = `https://www.omdbapi.com/?t=${req.body.search_text}&apikey=728de06e`;
  const moviesSecondApiCall = `https://tastedive.com/api/similar?q=${req.body.search_text}&type=movies&info=1&limit=1&verbose=1&k=341314-MusicApp-1I2LKOB1`;

  try {
    const exists = Cache.has(`${req.body.search_text}`);
    if (exists) {
      res.status(200).json({
        status: "success",
        results: Cache.get(`${req.body.search_text}`).length,
        data: Cache.get(`${req.body.search_text}`),
      });
    } else {
      const firstResult = await (await fetch(moviesFirstApiCall)).json();
      const secondResult = await (await fetch(moviesSecondApiCall)).json();
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
