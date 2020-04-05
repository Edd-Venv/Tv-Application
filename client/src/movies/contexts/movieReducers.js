export const movieReducer = (state, action) => {
  switch (action.type) {
    case "GET":
      return { isLoaded: action.isLoaded, data: action.data };
    default:
      throw new Error();
  }
};

export const searchReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        Movie: action.Movie,
        MovieTrailer: action.MovieTrailer,
        isLoaded: action.isLoaded,
        Test: action.Test,
      };
    default:
      throw new Error();
  }
};
