import React from "react";
import "./MovieSlider.css";

const MovieCarouselCard = (props) => {
  const { data, handleClose } = props;

  return (
    <div id="movie-carousel-card">
      <div className="movie-carousel-container">
        <div key={data.yID}>
          <div id="movie-carousel-card-font">
            <p className="card-title">
              {data.Name}
              <span onClick={handleClose} className="close" id="close-button">
                ×
              </span>
            </p>
            <iframe
              id="movie-carousel-card-iframe"
              src={data.yUrl}
              className="img-thumbnail"
              title={data.Name}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCarouselCard;
