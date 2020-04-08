import React, { useContext, useState } from "react";
import { UserContext } from "../../../App.js";
import FetalMovieSearchError from "./FetalMovieSearchError.js";
import "./MovieSearchResult.css";

const MovieSearchResult = (props) => {
  const { Movie, Test, MovieTrailer, handleClose, isLoaded } = props;
  const [state, setState] = useState({ message: "" });
  const [user] = useContext(UserContext);

  async function saveMovie(Args) {
    if (!user.accesstoken)
      return console.log("You need to login to Save Book.");
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

  if (isLoaded === false)
    return <div style={{ textAlign: "center", color: "white" }}>Loading</div>;

  return (
    <div id="movie-model">
      {Movie.Poster === "N/A" || Movie.Error ? (
        <FetalMovieSearchError handleClose={handleClose} />
      ) : (
        <div className="movieSearchContainer" key={Movie.imdbID}>
          <div className="card mb-3">
            <span onClick={handleClose} className="close" id="close-button">
              ×
            </span>
            <div className="row no-gutters">
              <div className="col-md-4">
                <div className="movie-image">
                  <img
                    alt="loading"
                    src={Movie.Poster}
                    className="img-thumbnail"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title" id="movie-title">
                    {Movie.Title}
                    <hr />
                  </h3>
                  <br />
                  <div className="card-text" id="movie-search-result-font-size">
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
                      save
                    </button>
                    {state.message}
                  </div>
                </div>
              </div>
              {Test === "unknown" ? (
                <p className="error-movie-not-in-data-base-paragraph">
                  MOVIE NOT IN DATABASE
                </p>
              ) : (
                <div className="card-body">
                  <h5 className="movie-trailer">
                    <strong>Movie Trailer</strong>
                  </h5>
                  <iframe
                    src={MovieTrailer}
                    className="movie-search-result-iframe"
                    title="This is a unique title prop"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearchResult;
