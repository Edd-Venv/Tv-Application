export const movieReducer = (state, action) => {
  switch (action.type) {
    case "GET":
      return { isLoaded: action.isLoaded, data: action.data };
    default:
      throw new Error();
  }
};

export const movieCarouselReducer = (state, action) => {
  const data = Object.assign({}, action.movieCarouselData);
  switch (action.type) {
    case "MOVIECAROUSEL":
      return data;
    default:
      throw new Error();
  }
};
