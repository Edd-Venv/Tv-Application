export const tvReducer = (state, action) => {
  switch (action.type) {
    case "GET":
      return { isLoaded: true, data: action.data };
    default:
      throw new Error();
  }
};
