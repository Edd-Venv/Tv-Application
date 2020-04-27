import React from "react";
import "./SearchResult.css";

const Trailer = (props) => {
  const { showTrailer, handleTrailerCloseButton } = props;

  return (
    <div id="show-trailer">
      <div className="tv-show-trailer-container">
        <p
          onClick={handleTrailerCloseButton}
          className="close-tv-show-trailer-button"
        >
          ×
        </p>
        <iframe
          autoPlay
          src={showTrailer}
          className="img-thumbnail"
          title="This is a unique title prop"
          id="search-result-tv-show-trailer-iframe"
        />
      </div>
    </div>
  );
};
export default Trailer;
