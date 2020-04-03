import React from "react";
import "./MovieSearchResult.css";

class MovieSearchResult extends React.Component {
  render() {
    const { Movies, Test, MovieTrailer, handleClick } = this.props;
    return (
      <React.Fragment>
        <div className="movieSearchContainer">
          <div className="card mb-3">
            <span onClick={handleClick} className="close" id="close-button">
              ×
            </span>
            <div className="row no-gutters">
              <div className="col-md-4">
                <div className="movie-image">
                  <img
                    alt="loading"
                    src={Movies.Poster}
                    className="img-thumbnail"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title" id="movie-title">
                    {Movies.Title}
                    <hr />
                  </h3>
                  <br />
                  <div className="card-text" id="movie-search-result-font-size">
                    <p>
                      <strong>Summary: </strong>
                      {Movies.Plot}
                    </p>
                    <p>
                      <strong>Genre: </strong>
                      {Movies.Genre}.
                    </p>
                    <p>
                      <strong>Release Date: </strong>
                      {Movies.Released}
                    </p>
                    <p>
                      <strong>Run time: </strong>
                      {Movies.Runtime}'s
                    </p>
                    <p>
                      <strong>Rating:</strong> {Movies.imdbRating}
                    </p>
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
      </React.Fragment>
    );
  }
}

export default MovieSearchResult;
