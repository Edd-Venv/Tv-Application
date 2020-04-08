import React, { useContext, useState } from "react";
import "./Body.css";
import { TvContext } from "../../contexts/tvContext";
import MainCard from "../MainCard.js";
import dummyData from "../DummyData.js";

function Body() {
  const { isLoaded, data } = useContext(TvContext);
  const [state, setState] = useState({
    data: { ...dummyData },
  });

  const handleClose = () => {
    setState({ data: { ...dummyData } });
    document.getElementById("main-card").style.display = "none";
    document.getElementById("slider").style.display = "block";
  };

  const showMainCard = (data) => {
    if (document.getElementById("main-card") !== null) {
      setState({ data: data });
      document.getElementById("slider").style.display = "none";
      document.getElementById("main-card").style.display = "block";
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
            <MainCard data={state.data} handleClose={handleClose} />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default React.memo(Body);
