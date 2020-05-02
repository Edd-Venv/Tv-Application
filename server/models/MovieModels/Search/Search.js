const fetch = require("node-fetch");

exports.searchModel = async (text) => {
  try {
    const moviesFirstApiCall = `https://www.omdbapi.com/?t=${text}&apikey=728de06e`;
    const moviesSecondApiCall = `https://tastedive.com/api/similar?q=${text}&type=movies&info=1&limit=1&verbose=1&k=341314-MusicApp-1I2LKOB1`;
    const firstResult = await (await fetch(moviesFirstApiCall)).json();
    const secondResult = await (await fetch(moviesSecondApiCall)).json();
    const finalResult = [firstResult, secondResult];
    return finalResult;
  } catch (error) {
    console.log(error);
  }
};
