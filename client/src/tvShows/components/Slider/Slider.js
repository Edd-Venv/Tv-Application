import React, { useContext, useReducer } from "react";
import { TvContext } from "../../contexts/tvContext.js";
import "./Slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarouselCard from "./Card.js";
import { carouselReducer } from "../../contexts/tvReducers.js";
import { sliderData } from "../DummyData.js";

function Slider() {
  const { isLoaded, data } = useContext(TvContext);
  const [state, dispatch] = useReducer(carouselReducer, sliderData.data);
  const slicedArray = [];

  for (let i = 0; i < 12; i++) {
    slicedArray.push(data[i]);
  }

  const showCarouselCard = (data) => {
    if (document.getElementById("carousel-card") !== null) {
      dispatch({ type: "CAROUSEL", carouselData: data });
      document.getElementById("slider").style.display = "none";
      document.getElementById("carousel-card").style.display = "block";
    }
  };
  const handleClose = () => {
    dispatch({
      type: "CAROUSEL",
      carouselData: sliderData.data,
    });
    document.getElementById("carousel-card").style.display = "none";
    document.getElementById("slider").style.display = "block";
  };
  return (
    <React.Fragment>
      {isLoaded === false ? (
        <div
          className="spinner-grow text-dark"
          role="status"
          style={{ margin: "0 auto" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <React.Fragment>
          <div id="slider">
            <Carousel
              centerMode={true}
              showStatus={false}
              showThumbs={false}
              autoPlay
              infiniteLoop
              showIndicators={false}
            >
              {slicedArray.map((data) => {
                return (
                  <React.Fragment key={data.id}>
                    <button
                      onClick={showCarouselCard.bind(this, data)}
                      id="slider-box"
                    >
                      <img
                        alt="loading"
                        src={data.image.original}
                        className="img-thumbnail"
                      />
                    </button>
                  </React.Fragment>
                );
              })}
            </Carousel>
          </div>
          <CarouselCard data={state} handleClose={handleClose} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default Slider;
