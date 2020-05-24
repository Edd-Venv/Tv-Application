const fetch = require("node-fetch");

exports.searchModel = async (req) => {
  const tvShowsFirstApi = `https://api.tvmaze.com/search/shows?q=${req.body.search_text}&embed=seasons`;
  const tvShowsSecondApi = `https://tastedive.com/api/similar?q=${req.body.search_text}&type=shows&info=1&verbose=1`;

  const firstResult = await (await fetch(tvShowsFirstApi)).json();
  const secondResult = await (await fetch(tvShowsSecondApi)).json();
  const finalResult = [firstResult, secondResult];
  return finalResult;
};
