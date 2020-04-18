import React, { useReducer } from "react";
import "./Search.css";
import { initialState } from "./DummyState";
import { searchReducer } from "../../contexts/tvReducers.js";
import SearchResult from "./SearchResult";
import SearchForm from "./SearchForm.js";

function Search() {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const handleClose = () => {
    dispatch({
      type: "SEARCH",
      ...initialState,
    });
    document.getElementById("search-result-modal").style.display = "none";
    document.getElementById("slider").style.display = "block";
  };

  const handleTrailerPlayButton = () => {
    document.querySelector("iframe").src = state.showTrailer;
    document.getElementById("show-trailer").style.display = "block";
    document.getElementById("search-result-modal").style.zIndex = 0;
  };

  const handleTrailerCloseButton = () => {
    document.querySelector("iframe").src = "";
    document.getElementById("show-trailer").style.display = "none";
    document.getElementById("search-result-modal").style.zIndex = 1;
  };
  const onAddSearch = (text) => {
    (async function fetchData() {
      await fetch("http://localhost:4010/search", {
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
          dispatch({
            type: "SEARCH",
            data: Data.data[0][0].show,
            isLoaded: true,
            showTrailer: Data.data[1].Similar.Info[0].yUrl,
            Test: Data.data[1].Similar.Info[0].Type,
            teaser: Data.data[1].Similar.Info[0].wTeaser,
            display: "show",
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
        data={state.data}
        isLoaded={state.isLoaded}
        image={state.data.image}
        display={state.display}
        summary={state.data.summary}
        exists={state.Test}
        showTrailer={state.showTrailer}
        teaser={state.teaser}
        handleClose={handleClose}
        handleTrailerPlayButton={handleTrailerPlayButton}
        handleTrailerCloseButton={handleTrailerCloseButton}
      />
    </React.Fragment>
  );
}

export default Search;
