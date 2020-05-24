const fetch = require("node-fetch");

exports.searchModel = async (text) => {
  try {
    const moviesFirstApiCall = `https://www.omdbapi.com/?t=${text}`;
    const moviesSecondApiCall = `https://tastedive.com/api/similar?q=${text}&type=movies&info=1&limit=1&verbose=1`;
    const firstResult = await (await fetch(moviesFirstApiCall)).json();
    const secondResult = await (await fetch(moviesSecondApiCall)).json();
    const finalResult = [firstResult, secondResult];
    return finalResult;
  } catch (error) {
    console.log(error);
  }
};
