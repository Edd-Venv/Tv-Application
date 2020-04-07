import React from "react";

const MovieCarouselCard = (props) => {
  const { data, handleClose } = props;

  return (
    <div id="movie-carousel-card">
      <div className="movie-carousel-container">
        <div className="card mb-3" id="movie-carousel-card-font">
          <h2 className="card-title">
            {data.name}
            <hr />{" "}
          </h2>
          <span onClick={handleClose} className="close" id="close-button">
            ×
          </span>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <video />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCarouselCard;
