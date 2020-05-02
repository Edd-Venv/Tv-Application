import React, { createContext, useReducer, useEffect } from "react";
import { BaseUrl } from "../../App";
import { movieReducer } from "./movieReducers";

const initialState = {
  isLoaded: false,
  data: [],
};
export const MovieContext = createContext(initialState);

export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  useEffect(() => {
    document.title = "Movies";
    fetch(`${BaseUrl}/movieData`)
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
