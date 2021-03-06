import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchForm = React.memo((props) => {
  const [currentText, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddSearch(currentText);
    setText("");
    document.getElementById("input-area").blur();
    document.getElementById("search-result-modal").style.display = "block";
    document.getElementById("slider").style.zIndex = -1;
  };
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="show-input-container" id="show-input">
        <button id="SearchButton" type="submit">
          <i className="fas fa-search" />
        </button>
        <input
          id="input-area"
          onMouseLeave={() => {
            document.getElementById("input-area").blur();
          }}
          onMouseOver={() => {
            document.getElementById("input-area").focus();
          }}
          className="show-input-style"
          type="text/number"
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={currentText}
          placeholder="Show Title"
          required
          style={{ fontFamily: "Roboto Condensed, sans-serif" }}
        />
      </div>
    </form>
  );
});
SearchForm.propTypes = {
  onAddSearch: PropTypes.func.isRequired,
};
export default SearchForm;
