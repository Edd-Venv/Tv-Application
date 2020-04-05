import React from "react";
import Navigation from "./nav/Navigation/Navigation.js";
import Movie from "./movies/components/Movies/Movies.js";
import Search from "./movies/components/MovieSearch/MovieSearch.js";
import { MovieContextProvider } from "./movies/contexts/movieContext.js";

function Movies(props) {
  return (
    <React.Fragment>
      <Navigation logOutCallback={props.logOutCallback} />
      <MovieContextProvider>
        <div
          style={{
            maxWidth: "1000px",
            minWidth: "50%",
            margin: "0 auto",
          }}
        >
          <Movie />
          <br />
          <Search />
        </div>
      </MovieContextProvider>
    </React.Fragment>
  );
}
export default Movies;
