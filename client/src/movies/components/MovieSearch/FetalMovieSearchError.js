import React from "react";
import PropTypes from "prop-types";
import "./MovieSearch.css";

const FetalMovieSearchError = (props) => {
  setTimeout(() => {
    props.handleCloseErrorBackDrop();
  }, 4000);

  return (
    <React.Fragment>
      <p className="tv-error-paragraph">
        Sorry Movie Not In DataBase{" "}
        <span
          onClick={props.handleCloseErrorBackDrop}
          style={{ color: "red", cursor: "pointer" }}
        >
          ×
        </span>{" "}
      </p>
    </React.Fragment>
  );
};
FetalMovieSearchError.propTypes = {
  handleCloseErrorBackDrop: PropTypes.func.isRequired,
};
export default FetalMovieSearchError;
