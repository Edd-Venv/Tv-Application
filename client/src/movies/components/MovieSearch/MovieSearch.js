import React, { useState } from "react";
import { initialState } from "./DummyData.js";
import SearchForm from "./SearchForm.js";
import MovieSearchResult from "./MovieSearchResult.js";
import { BaseUrl } from "../../../App.js";
import "./MovieSearch.css";

function Search() {
  const [state, setState] = useState({ data: initialState });

  const handleClose = () => {
    setState({
      data: initialState,
    });

    document.getElementById("movie-slider").style.display = "block";
    document.getElementById("movie-model").style.display = "none";
  };
  const handleTrailerPlayButton = () => {
    document.getElementById("Iframe").src = state.MovieTrailer;
    document.getElementById("movie-trailer").style.display = "block";
    document.getElementById("movie-model").style.zIndex = 0;
  };

  const handleTrailerCloseButton = () => {
    document.getElementById("Iframe").src = "";
    document.getElementById("movie-trailer").style.display = "none";
    document.getElementById("movie-model").style.zIndex = 1;
  };
  const onAddSearch = (text) => {
    (async function fetchData() {
      await fetch(`${BaseUrl}/movieSearch`, {
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
          setState({
            data: {
              isLoaded: true,
              Movie: Data.data[0],
              MovieTrailer: Data.data[1].Similar.Info[0].yUrl,
              Test: Data.data[1].Similar.Info[0].Type,
            },
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
        Movie={state.data.Movie}
        exists={state.data.Test}
        trailer={state.data.MovieTrailer}
        handleClose={handleClose}
        handleTrailerPlayButton={handleTrailerPlayButton}
        handleTrailerCloseButton={handleTrailerCloseButton}
      />
      <br />
    </React.Fragment>
  );
}

export default Search;
