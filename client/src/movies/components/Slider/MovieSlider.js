import React, { useReducer } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { movieCarouselReducer } from "../../contexts/movieReducers.js";
import MovieCarouselCard from "./Card.js";
import recommedations from "./SliderData.js";
import "./MovieSlider.css";

const MovieSlider = () => {
  const [state, dispatch] = useReducer(movieCarouselReducer, recommedations);

  const showCarouselCard = (data) => {
    if (document.getElementById("movie-carousel-card") !== null) {
      dispatch({ type: "MOVIECAROUSEL", movieCarouselData: data });
      document.getElementById("movie-slider").style.display = "none";
      document.getElementById("movie-carousel-card").style.display = "block";
    }
  };
  const handleClose = () => {
    dispatch({
      type: "MOVIECAROUSEL",
      movieCarouselData: recommedations,
    });
    document.getElementById("movie-carousel-card").style.display = "none";
    document.getElementById("movie-slider").style.display = "block";
  };

  return (
    <React.Fragment>
      {state.isLoaded === false ? (
        <div
          className="spinner-grow text-dark"
          role="status"
          style={{ margin: "0 auto" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <React.Fragment>
          <div id="movie-slider">
            <Carousel
              centerMode={true}
              showStatus={false}
              showThumbs={false}
              autoPlay
              infiniteLoop
              showIndicators={false}
            >
              {recommedations.map((data) => {
                return (
                  <div key={data.yID}>
                    <button
                      onClick={showCarouselCard.bind(this, data)}
                      id="movie-slider-box"
                    >
                      <div id="movie-carousel-slider-font">
                        <p className="card-title">{data.Name}</p>
                        <iframe
                          id="movie-slider-iframe"
                          src={data.yUrl}
                          className="img-thumbnail"
                          title="This is a unique title prop"
                        />{" "}
                      </div>
                    </button>
                  </div>
                );
              })}
            </Carousel>
          </div>
          <MovieCarouselCard data={state} handleClose={handleClose} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MovieSlider;
/*
<CarouselCard data={state} handleClose={handleClose} />
 <video src={data.yUrl} className="img-thumbnail" />
*/
