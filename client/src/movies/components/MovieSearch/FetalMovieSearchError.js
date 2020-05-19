import React from "react";
import PropTypes from "prop-types";
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
FetalMovieSearchError.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
export default FetalMovieSearchError;
