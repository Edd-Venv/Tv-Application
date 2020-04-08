import React, { useContext, useState } from "react";
import { TvContext } from "../../contexts/tvContext";
import HeaderCard from "./HeaderCard.js";
import { dummyData } from "../DummyData.js";
import "./Header.css";

function Header() {
  const { isLoaded, data } = useContext(TvContext);
  const [state, setState] = useState({
    data: { ...dummyData },
  });

  const handleClose = () => {
    setState({ data: { ...dummyData } });
    document.getElementById("header-card").style.display = "none";
    document.getElementById("slider").style.display = "block";
  };

  const showMainCard = (data) => {
    if (document.getElementById("header-card") !== null) {
      setState({ data: data });
      document.getElementById("slider").style.display = "none";
      document.getElementById("header-card").style.display = "block";
    }
  };
  return (
    <div className="flex-container">
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
          <div className="header1" key={data[49].id}>
            <button id="button" onClick={showMainCard.bind(this, data[49])}>
              <img
                alt="loading"
                src={data[49].image.original}
                className="img-thumbnail"
                id="box"
              />
            </button>
          </div>
          <div className="header2" key={data[6].id}>
            <button id="button" onClick={showMainCard.bind(this, data[6])}>
              <img
                alt="loading"
                src={data[6].image.original}
                className="img-thumbnail"
                id="box"
              />
            </button>
          </div>
          <div className="header3" key={data[52].id}>
            <button id="button" onClick={showMainCard.bind(this, data[52])}>
              <img
                alt="loading"
                src={data[52].image.original}
                className="img-thumbnail"
                id="box"
              />
            </button>
          </div>
          <div className="header4" key={data[7].id}>
            <button id="button" onClick={showMainCard.bind(this, data[7])}>
              <img
                alt="loading"
                src={data[7].image.original}
                className="img-thumbnail"
                id="box"
              />
            </button>
          </div>
          <HeaderCard data={state.data} handleClose={handleClose} />
        </React.Fragment>
      )}
    </div>
  );
}
export default React.memo(Header);
