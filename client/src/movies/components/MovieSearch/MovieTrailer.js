import React from "react";
import "./MovieSearchResult.css";

const MovieTrailer = (props) => {
  const { trailer, handleTrailerCloseButton } = props;
  return (
    <div id="movie-trailer">
      <div className="movie-trailer-container">
        <p
          onClick={handleTrailerCloseButton}
          className="close-movie-trailer-button"
        >
          ×
        </p>
        <iframe
          id="Iframe"
          src={trailer}
          className="movie-search-result-iframe img-thumbnail"
          title="This is a unique title prop"
        />
      </div>
    </div>
  );
};
export default MovieTrailer;
