import React, { useContext } from "react";
import { TvContext } from "../../contexts/tvContext.js";
import "./Slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Slider() {
  const { isLoaded, data } = useContext(TvContext);
  const slicedArray = [];

  for (let i = 0; i < 12; i++) {
    slicedArray.push(data[i]);
  }
  const consoler = (key) => {
    return console.log("key", key);
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
                  <img
                    alt="loading"
                    src={data.image.original}
                    className="img-thumbnail"
                    id="slider-box"
                  />
                  <button onClick={consoler.bind(this, data.id)}>save</button>
                </React.Fragment>
              );
            })}
          </Carousel>
        </div>
      )}
    </React.Fragment>
  );
}
export default Slider;
