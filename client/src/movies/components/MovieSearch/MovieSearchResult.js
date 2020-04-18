import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../App.js";
import MovieTrailer from "./MovieTrailer.js";
import FetalMovieSearchError from "./FetalMovieSearchError.js";
import "./MovieSearchResult.css";

const MovieSearchResult = (props) => {
  const {
    Movie,
    exists,
    trailer,
    handleTrailerPlayButton,
    handleTrailerCloseButton,
    handleClose,
    isLoaded,
  } = props;
  const [state, setState] = useState({ message: "" });
  const [user] = useContext(UserContext);

  async function saveMovie(Args) {
    if (!user.accesstoken)
      setState({ message: "You need to login to Save Movie." });
    else {
      const result = await (
        await fetch("http://localhost:4010/search/saveMovie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accesstoken}`,
          },

          body: JSON.stringify({
            movie_image: Args[0],
            movie_title: Args[1],
            movie_summary: Args[2],
            movie_genre: Args[3],
            movie_release: Args[4],
            movie_runtime: Args[5],
            movie_rating: Args[6],
            movie_key: Args[7],
            movie_trailer: Args[8],
          }),
        })
      ).json();

      if (!result.error) {
        setState({ message: result.message });
      } else {
        setState({ message: result.error });
      }
    }
  }
  useEffect(() => {
    if (state.message !== "") {
      setTimeout(() => {
        setState({ message: "" });
      }, 3000);
    }
  }, [state]);

  console.log(Movie);

  return (
    <React.Fragment>
      <MovieTrailer
        trailer={trailer}
        handleTrailerCloseButton={handleTrailerCloseButton}
      />
      <div id="movie-model">
        {isLoaded === false || Movie.DummyData ? (
          <div className="movie-container">
            <div
              className="spinner-grow text-dark"
              role="status"
              style={{ margin: "0 auto" }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : Movie.Poster === "N/A" || Movie.Error ? (
          <FetalMovieSearchError handleClose={handleClose} />
        ) : (
          <div className="movie-search-container" key={Movie.imdbID}>
            <div
              className="card mb-3"
              style={{ backgroundColor: "rgb(243, 243, 243)" }}
            >
              <span onClick={handleClose} className="close" id="close-button">
                ×
              </span>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <div id="movie-image">
                    <img
                      alt="loading"
                      src={Movie.Poster}
                      className="img-thumbnail"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body" id="movie-search-result-font">
                    <h3 className="card-title">
                      {Movie.Title}
                      <hr />
                    </h3>
                    <br />
                    <div
                      className="card-text"
                      id="movie-search-result-font-size"
                    >
                      <p>
                        <strong>Summary: </strong>
                        {Movie.Plot}
                      </p>
                      <p>
                        <strong>Genre: </strong>
                        {Movie.Genre}.
                      </p>
                      <p>
                        <strong>Release Date: </strong>
                        {Movie.Released}
                      </p>
                      <p>
                        <strong>Run time: </strong>
                        {Movie.Runtime}'s
                      </p>
                      <p>
                        <strong>Rating:</strong> {Movie.imdbRating}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={saveMovie.bind(this, [
                          Movie.Poster,
                          Movie.Title,
                          Movie.Plot,
                          Movie.Genre,
                          Movie.Released,
                          Movie.Runtime,
                          Movie.imdbRating,
                          Movie.imdbID,
                          MovieTrailer,
                        ])}
                      >
                        {state.message === "" ? "Save" : state.message}
                      </button>
                      <br />
                      {exists === "unknown" ? null : (
                        <button
                          className="btn btn-dark"
                          onClick={handleTrailerPlayButton}
                        >
                          Watch Trailer
                          <i className="fab fa-google-play" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default MovieSearchResult;
