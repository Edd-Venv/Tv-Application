const fetch = require("node-fetch");

exports.getMovieApiDataModel = async () => {
  try {
    const movieApi1 =
      "https://www.omdbapi.com/?t=Bohemian Rhapsody&apikey=728de06e";
    const movieApi2 =
      "https://www.omdbapi.com/?t=A Star Is Born&apikey=728de06e";
    const movieApi3 =
      "https://www.omdbapi.com/?t=Fantastic Beasts: The Crimes Of Grindelwald&apikey=728de06e";
    const movieApi4 =
      "https://www.omdbapi.com/?t=Jurassic World: Fallen Kingdom&apikey=728de06e";
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
