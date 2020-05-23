import React from "react";
import "./Search.css";

const FetalSearchError = (props) => {
  const { handleCloseErrorBackDrop } = props;

  setTimeout(() => {
    handleCloseErrorBackDrop();
  }, 4000);

  return (
    <React.Fragment>
      <p className="tv-error-paragraph">
        Sorry Show Not In DataBase{" "}
        <span
          onClick={handleCloseErrorBackDrop}
          style={{ color: "red", cursor: "pointer" }}
        >
          ×
        </span>
      </p>
    </React.Fragment>
  );
};

export default FetalSearchError;
