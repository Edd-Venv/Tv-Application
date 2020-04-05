import React, { createContext, useReducer, useEffect } from "react";
import { movieReducer } from "./movieReducers.js";

const initialState = {
  isLoaded: false,
  data: [],
};
export const MovieContext = createContext(initialState);

export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  useEffect(() => {
    document.title = "Movies";
    fetch("http://localhost:4010/movieData")
      .then((result) => {
        return result.json();
      })
      .then((Data) => {
        dispatch({
          type: "GET",
          isLoaded: true,
          data: Data.data,
        });
      });
  }, []);
  return (
    <MovieContext.Provider
      value={{ isLoaded: state.isLoaded, data: state.data }}
    >
      {children}
    </MovieContext.Provider>
  );
};
