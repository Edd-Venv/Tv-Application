import React from "react";
import "./MovieSearch.css";

const FetalMovieSearchError = (props) => {
  return (
    <React.Fragment>
      <div className="error-div">
        <div className="error-paragraph">
          Sorry Movie Not In DataBase{" "}
          <div
            style={{ display: "inline" }}
            onClick={props.handleClose}
            id="error-close-button"
          >
            ×
          </div>{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default FetalMovieSearchError;
