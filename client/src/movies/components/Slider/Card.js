import React from "react";
import PropTypes from "prop-types";
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
              <span
                onClick={handleClose}
                className="close-card"
                id="close-card-button"
              >
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

MovieCarouselCard.propTypes = {
  data: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default MovieCarouselCard;
