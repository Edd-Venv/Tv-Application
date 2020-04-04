export const tvReducer = (state, action) => {
  switch (action.type) {
    case "GET":
      return { isLoaded: true, data: action.data };
    default:
      throw new Error();
  }
};

export const searchReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        data: action.data
      };
    case "SECONDSEARCH":
      return {
        ...state,
        Test: action.Test,
        showTrailer: action.showTrailer,
        isLoaded: action.isLoaded,
        display: action.display
      };
    default:
      throw new Error();
  }
};
