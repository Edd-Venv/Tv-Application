export const tvReducer = (state, action) => {
  switch (action.type) {
    case "GET":
      return { isLoaded: action.isLoaded, data: action.data };
    default:
      throw new Error();
  }
};

export const carouselReducer = (state, action) => {
  switch (action.type) {
    case "CAROUSEL":
      return { ...action.carouselData };
    default:
      throw new Error();
  }
};

export const searchReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        data: action.data,
        Test: action.Test,
        showTrailer: action.showTrailer,
        isLoaded: action.isLoaded,
        display: action.display,
        teaser: action.teaser,
      };
    default:
      throw new Error();
  }
};
