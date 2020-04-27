import React, { useContext, useState, useEffect } from "react";
import { UserContext, BaseUrl } from "../../../App.js";
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
    if (!user.accesstoken) {
      document.getElementById("movie-button").style.backgroundColor = "red";
      setState({ message: "You need to login to Save." });
    } else {
      const result = await (
        await fetch(`${BaseUrl}/search/saveMovie`, {
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
        if (result.message !== "Movie Saved")
          document.getElementById("movie-button").style.backgroundColor = "red";
        setState({ message: result.message });
      } else {
        setState({ message: result.error });
      }
    }
  }
  useEffect(() => {
    if (state.message !== "") {
      setTimeout(() => {
        if (document.getElementById("movie-button"))
          if (!user.accesstoken)
            document.getElementById("movie-button").style.backgroundColor =
              "#337ab7";
        setState({ message: "" });
      }, 3000);
    }
  }, [state]);

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
              className="movie-search-result-card card mb-3"
              style={{
                backgroundImage: `url(${Movie.Poster})`,
              }}
            >
              <span onClick={handleClose} className="close-card-button">
                <svg
                  className="bi bi-x-square-fill"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm9.854 4.854a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <div id="movie-image"></div>
                </div>
                <div className="col-md-8">
                  <div className="card-body" id="movie-search-result-font">
                    <h3 className="card-title">
                      {Movie.Title}
                      <hr />
                    </h3>
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
                        id="movie-button"
                        onClick={saveMovie.bind(this, [
                          Movie.Poster,
                          Movie.Title,
                          Movie.Plot,
                          Movie.Genre,
                          Movie.Released,
                          Movie.Runtime,
                          Movie.imdbRating,
                          Movie.imdbID,
                          trailer,
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
