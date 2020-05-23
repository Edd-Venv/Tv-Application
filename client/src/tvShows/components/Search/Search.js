import React, { useState } from "react";
import "./Search.css";
import { BaseUrl } from "../../../App.js";
import { initialState } from "./DummyState";
import SearchResult from "./SearchResult";
import SearchForm from "./SearchForm.js";

function Search() {
  const [state, setState] = useState({ initialState });
  const handleClose = () => {
    setState({
      initialState,
    });
    document.getElementById("search-result-modal").style.display = "none";
    document.getElementById("slider").style.zIndex = 0;
  };

  const handleTrailerPlayButton = () => {
    document.querySelector("iframe").src = state.initialState.showTrailer;
    document.getElementById("show-trailer").style.display = "block";
    document.getElementById("search-result-modal").style.zIndex = 0;
  };

  const handleTrailerCloseButton = () => {
    document.querySelector("iframe").src = "";
    document.getElementById("show-trailer").style.display = "none";
    document.getElementById("search-result-modal").style.zIndex = 1;
  };

  const handleErrorBackDrop = () => {
    document
      .getElementById("tv-show-error-back-drop")
      .classList.toggle("visible");
  };

  const handleCloseErrorBackDrop = () => {
    setState({
      initialState,
    });
    document.getElementById("slider").style.zIndex = 0;
    if (
      document
        .getElementById("tv-show-error-back-drop")
        .classList.toggle("visible")
    )
      document
        .getElementById("tv-show-error-back-drop")
        .classList.toggle("visible");
  };

  const onAddSearch = (text) => {
    (async function fetchData() {
      await fetch(`${BaseUrl}/search`, {
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
          if (Data.data[0][0] === undefined) {
            handleErrorBackDrop();
            return setState({
              initialState: {
                data: { image: { orginal: null }, summary: null, exists: null },
                isLoaded: true,
                showTrailer: "",
                Test: "",
                teaser: "",
                display: "show",
                image: null,
              },
            });
          }
          setState({
            initialState: {
              data: Data.data[0][0].show,
              isLoaded: true,
              showTrailer: Data.data[1].Similar.Info[0].yUrl,
              Test: Data.data[1].Similar.Info[0].Type,
              teaser: Data.data[1].Similar.Info[0].wTeaser,
              display: "show",
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
      <br />
      <SearchForm onAddSearch={onAddSearch} />
      <br />
      <br />
      <SearchResult
        data={state.initialState.data}
        isLoaded={state.initialState.isLoaded}
        image={state.initialState.data.image}
        display={state.initialState.display}
        summary={state.initialState.data.summary}
        exists={state.initialState.Test}
        showTrailer={state.initialState.showTrailer}
        teaser={state.initialState.teaser}
        handleClose={handleClose}
        handleTrailerPlayButton={handleTrailerPlayButton}
        handleTrailerCloseButton={handleTrailerCloseButton}
        handleCloseErrorBackDrop={handleCloseErrorBackDrop}
      />
    </React.Fragment>
  );
}

export default Search;
