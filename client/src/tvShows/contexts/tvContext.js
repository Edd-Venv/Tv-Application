import React, { createContext, useReducer, useEffect } from "react";
import { tvReducer } from "./tvReducers.js";

const initialState = {
  isLoaded: false,
  data: {}
};
export const TvContext = createContext(initialState);

export const TvContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tvReducer, initialState);

  useEffect(() => {
    document.title = "Tv Shows";
    fetch("https://api.tvmaze.com/shows")
      .then(result => {
        return result.json();
      })
      .then(Data => {
        dispatch({
          type: "GET",
          isLoaded: true,
          data: Data.slice(0, 128)
        });
      });
  }, []);

  return (
    <TvContext.Provider value={{ isLoaded: state.isLoaded, data: state.data }}>
      {children}
    </TvContext.Provider>
  );
};
