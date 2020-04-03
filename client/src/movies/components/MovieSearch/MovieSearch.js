import React from "react";
import { MovieSearchContext } from "../../contexts/movieSearchContext";
import FetalMovieSearchError from "./FetalMovieSearchError";
import MovieSearchResult from "./MovieSearchResult";
import "./MovieSearch.css";

class MovieSearch extends React.Component {
  static contextType = MovieSearchContext;

  render() {
    const {
      Movies,
      isLoaded,
      display,
      Test,
      MovieTrailer,
      handleSubmit,
      handleChange,
      value,
      handleClick
    } = this.context;
    return (
      <React.Fragment>
        <div className="movie-center-form">
          <form onSubmit={handleSubmit}>
            <span className="form-inline">
              <button id="MovieSearchButton" type="submit">
                <i className="fas fa-search" />
              </button>
              <input
                className="MovieInputStyle"
                type="text/number"
                onChange={handleChange}
                value={value}
                placeholder="Movie Title"
                id="input"
              />
            </span>
          </form>
        </div>
        <br />
        <br />
        {isLoaded === false ? null : (
          <div className={display}>
            {Movies.Poster === "N/A" || Movies.Error === "Movie not found!" ? (
              <FetalMovieSearchError handleClick={handleClick} />
            ) : (
              <MovieSearchResult
                Movies={Movies}
                Test={Test}
                MovieTrailer={MovieTrailer}
                handleClick={handleClick}
              />
            )}{" "}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default MovieSearch;
