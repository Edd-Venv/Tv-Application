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

    document.getElementById("movie-slider").style.zIndex = 0;
    document.getElementById("movie-model").style.display = "none";
  };
  const handleTrailerPlayButton = () => {
    document.getElementById("Iframe").src = state.data.MovieTrailer;
    document.getElementById("movie-trailer").style.display = "block";
    document.getElementById("movie-model").style.zIndex = 1;
  };

  const handleTrailerCloseButton = () => {
    document.getElementById("Iframe").src = "";
    document.getElementById("movie-trailer").style.display = "none";
    document.getElementById("movie-model").style.zIndex = 2;
  };

  const handleErrorBackDrop = () => {
    document
      .getElementById("movie-error-back-drop")
      .classList.toggle("visible");
  };

  const handleCloseErrorBackDrop = () => {
    setState({
      data: initialState,
    });
    document.getElementById("movie-slider").style.zIndex = 0;
    if (
      document
        .getElementById("movie-error-back-drop")
        .classList.toggle("visible")
    )
      document
        .getElementById("movie-error-back-drop")
        .classList.toggle("visible");
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
          if (
            Data.data[0].Error === "Movie not found!" ||
            Data.data[0].Poster === "N/A"
          ) {
            handleErrorBackDrop();
            return setState({
              data: {
                isLoaded: true,
                Movie: { Status: "Not found!" },
                MovieTrailer: "",
                Test: "",
              },
            });
          }
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
      <SearchForm onAddSearch={onAddSearch} />
      <br />
      <MovieSearchResult
        isLoaded={state.data.isLoaded}
        Movie={state.data.Movie}
        exists={state.data.Test}
        trailer={state.data.MovieTrailer}
        handleClose={handleClose}
        handleTrailerPlayButton={handleTrailerPlayButton}
        handleTrailerCloseButton={handleTrailerCloseButton}
        handleCloseErrorBackDrop={handleCloseErrorBackDrop}
      />
      <br />
    </React.Fragment>
  );
}

export default Search;
