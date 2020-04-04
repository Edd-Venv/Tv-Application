import React from "react";
import "./Search.css";

const FetalSearchError = props => {
  const { handleClose } = props;
  return (
    <React.Fragment>
      <span onClick={handleClose} className="close" id="error-close-button">
        ×
      </span>
      <p id="error-paragraph">Sorry Show Not In DataBase</p>
    </React.Fragment>
  );
};

export default FetalSearchError;
