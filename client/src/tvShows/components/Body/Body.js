import React, { useContext, useState } from "react";
import "./Body.css";
import "./BodyCard.css";
import { TvContext } from "../../contexts/tvContext";
import BodyCard from "./BodyCard.js";
import { dummyData } from "../DummyData.js";

function Body() {
  const { isLoaded, data } = useContext(TvContext);
  const DummyData = Object.assign({}, dummyData);

  const [state, setState] = useState({ data: DummyData });

  const handleClose = () => {
    setState({ data: DummyData });
    document.getElementById("body-card").style.display = "none";
    document.getElementById("slider").style.display = "block";
  };

  const showMainCard = (data) => {
    if (document.getElementById("body-card") !== null) {
      setState({ data: data });
      document.getElementById("slider").style.display = "none";
      document.getElementById("body-card").style.display = "block";
    }
  };

  return (
    <React.Fragment>
      <div className="flex-containerBody">
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
            <div className="body1" key={data[40].id}>
              <button id="button" onClick={showMainCard.bind(this, data[40])}>
                <img
                  alt="loading"
                  src={data[40].image.original}
                  className="img-thumbnail"
                  id="box"
                />
              </button>
            </div>
            <div className="body2" key={data[124].id}>
              <button id="button" onClick={showMainCard.bind(this, data[124])}>
                <img
                  alt="loading"
                  src={data[124].image.original}
                  className="img-thumbnail"
                  id="box"
                />
              </button>
            </div>
            <div className="body3" key={data[51].id}>
              <button id="button" onClick={showMainCard.bind(this, data[51])}>
                <img
                  alt="loading"
                  src={data[51].image.original}
                  className="img-thumbnail"
                  id="box"
                />
              </button>
            </div>
            <BodyCard data={state.data} handleClose={handleClose} />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default React.memo(Body);
