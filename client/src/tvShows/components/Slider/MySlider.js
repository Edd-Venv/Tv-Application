import React, { useContext, useState } from "react";
import { TvContext } from "../../contexts/tvContext.js";
import data from "./SliderData.js";

function MySlider() {
  const { isLoaded } = useContext(TvContext);
  const initialState = { ...data, property: data.properties[0] };
  const [state, setState] = useState(initialState);

  const nextProperty = () => {
    const newIndex = state.property.id;
    setState({ property: data.properties[newIndex] });
  };

  const prevProperty = () => {
    const newIndex = state.property.id - 2;
    setState({ property: data.properties[newIndex] });
  };
  console.log("here!", state);
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
          <div className="cards-slider">
            <div className="cards-slider-wrapper">
              <button onClick={prevProperty} disabled={state.property.id === 1}>
                Prev
              </button>

              <img
                alt="loading"
                src={state.property.image.original}
                className="img-thumbnail"
              />
              <button
                onClick={nextProperty}
                disabled={
                  state.property.id === initialState.properties.length - 1
                }
              >
                Next
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default MySlider;
