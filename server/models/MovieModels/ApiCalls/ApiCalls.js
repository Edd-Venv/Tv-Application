const fetch = require("node-fetch");

exports.getMovieApiDataModel = async () => {
  try {
    const movieApi1 = "https://www.omdbapi.com/?t=Bohemian Rhapsody";
    const movieApi2 = "https://www.omdbapi.com/?t=A Star Is Born&";
    const movieApi3 =
      "https://www.omdbapi.com/?t=Fantastic Beasts: The Crimes Of Grindelwald";
    const movieApi4 =
      "https://www.omdbapi.com/?t=Jurassic World: Fallen Kingdom";
    const result1 = await (await fetch(movieApi1)).json();
    const result2 = await (await fetch(movieApi2)).json();
    const result3 = await (await fetch(movieApi3)).json();
    const result4 = await (await fetch(movieApi4)).json();
    const finalResult = [result1, result2, result3, result4];

    return finalResult;
  } catch (error) {
    console.log(error);
  }
};
