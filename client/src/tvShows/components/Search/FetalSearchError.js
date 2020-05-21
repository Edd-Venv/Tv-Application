import React from "react";
import "./Search.css";

const FetalSearchError = (props) => {
  const { handleClose } = props;

  setTimeout(() => {
    handleClose();
  }, 4000);

  return (
    <p className="tv-show-error-paragraph">
      Sorry Show Not In DataBase{" "}
      <span onClick={handleClose} style={{ color: "red", cursor: "pointer" }}>
        ×
      </span>
    </p>
  );
};

export default FetalSearchError;
