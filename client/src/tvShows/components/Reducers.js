export const mainCardReducer = (state, action) => {
  switch (action.type) {
    case "HEADER":
      console.log(action);
      return {
        actionData: action.actionData,
        stateData: state.actionData,
      };
    case "BODY":
      return {
        data: action.data,
      };
    default:
      throw new Error();
  }
};
