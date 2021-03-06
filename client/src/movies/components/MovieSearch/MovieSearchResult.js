import React, { useContext, useState, useEffect } from "react";
import { UserContext, BaseUrl } from "../../../App.js";
import MovieTrailer from "./MovieTrailer.js";
import FetalMovieSearchError from "./FetalMovieSearchError.js";
import PropTypes from "prop-types";
import "./MovieSearchResult.css";

const MovieSearchResult = (props) => {
  const {
    Movie,
    exists,
    trailer,
    handleTrailerPlayButton,
    handleTrailerCloseButton,
    handleCloseErrorBackDrop,
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
      <div id="movie-error-back-drop" onClick={handleCloseErrorBackDrop} />
      {Movie.Status === "Not found!" && isLoaded === true ? (
        <FetalMovieSearchError
          handleCloseErrorBackDrop={handleCloseErrorBackDrop}
        />
      ) : (
            <div className="movie-search-container" key={Movie.imdbID}>
              <div
                className="movie-search-result-card card mb-3"
                style={{
                  backgroundImage: `url(${Movie.Poster})`,
                }}
              >
                <span onClick={handleClose} className="close-card-button">
               
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
                          <big>Summary: </big>
                          {Movie.Plot}
                        </p>
                        <p>
                          <big>Genre: </big>
                          {Movie.Genre}.
                        </p>
                        <p>
                          <big>Release Date: </big>
                          {Movie.Released}
                        </p>
                        <p>
                          <big>Run time: </big>
                          {Movie.Runtime}'s
                        </p>
                        <p>
                          <big>Rating:</big> {Movie.imdbRating}
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

MovieSearchResult.propTypes = {
  Movie: PropTypes.object.isRequired,
  exists: PropTypes.string,
  trailer: PropTypes.string,
  handleTrailerPlayButton: PropTypes.func.isRequired,
  handleTrailerCloseButton: PropTypes.func.isRequired,
  handleCloseErrorBackDrop: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};
export default MovieSearchResult;
