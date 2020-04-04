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
    document.getElementById("model").style.display = "none";
    document.getElementById("slider").style.display = "block";
  };

  const onAddSearch = (text) => {
    (async function fetchData() {
      await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.tvmaze.com/search/shows?q=${text}&embed=seasons`
      )
        .then((result) => {
          return result.json();
        })
        .then((Data) => {
          dispatch({
            type: "SEARCH",
            data: Data[0].show,
          });
        });

      await fetch(
        `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${text}&type=shows&info=1&verbose=1&k=341314-MusicApp-1I2LKOB1`
      )
        .then((result) => {
          return result.json();
        })
        .then((Data) => {
          dispatch({
            type: "SECONDSEARCH",
            isLoaded: true,
            showTrailer: Data.Similar.Info[0].yUrl,
            Test: Data.Similar.Info[0].Type,
            teaser: Data.Similar.Info[0].wTeaser,
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
        Test={state.Test}
        showTrailer={state.showTrailer}
        teaser={state.teaser}
        handleClose={handleClose}
      />
    </React.Fragment>
  );
}

export default Search;
