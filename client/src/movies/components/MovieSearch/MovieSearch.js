import React, { useReducer } from "react";
import { initialState } from "./DummyData.js";
import { searchReducer } from "../../contexts/movieReducers.js";
import SearchForm from "./SearchForm.js";
import MovieSearchResult from "./MovieSearchResult.js";
import "./MovieSearch.css";

function Search() {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const handleClose = () => {
    dispatch({
      type: "SEARCH",
      ...initialState,
    });

    document.getElementById("movie-model").style.display = "none";
    document.getElementById("movie-slider").style.display = "block";
  };

  const onAddSearch = (text) => {
    (async function fetchData() {
      await fetch("http://localhost:4010/movieSearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search_text: text,
        }),
      })
        .then((result) => {
          return result.json();
        })
        .then((Data) => {
          console.log(Data);
          dispatch({
            type: "SEARCH",
            isLoaded: true,
            Movie: Data.data[0],
            MovieTrailer: Data.data[1].Similar.Info[0].yUrl,
            Test: Data.data[1].Similar.Info[0].Type,
          });
        });
    })();
  };

  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <SearchForm onAddSearch={onAddSearch} />
      <br />
      <MovieSearchResult
        Movie={state.Movie}
        Test={state.Test}
        MovieTrailer={state.MovieTrailer}
        handleClose={handleClose}
      />
      <br />
    </React.Fragment>
  );
}

export default Search;
