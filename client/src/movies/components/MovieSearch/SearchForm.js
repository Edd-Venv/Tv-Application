import React from "react";
import PropTypes from "prop-types";

const SearchForm = React.memo((props) => {
  const [currentText, setText] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddSearch(currentText);
    setText("");
    document.getElementById("movie-input-area").blur();
    document.getElementById("movie-slider").style.zIndex = -1;
    document.getElementById("movie-model").style.display = "block";
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="movie-input-container" id="movie-input">
        <button id="MovieSearchButton" data-test="submit-button" type="submit">
          <i className="fas fa-search" />
        </button>
        <input
          id="movie-input-area"
          onMouseLeave={() => {
            document.getElementById("movie-input-area").blur();
          }}
          onMouseOver={() => {
            document.getElementById("movie-input-area").focus();
          }}
          className="movie-input-style"
          type="text/number"
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={currentText}
          placeholder="Movie Title"
          required
          data-test="input-box"
          style={{ fontFamily: "Roboto Condensed, sans-serif" }}
        />
      </div>
      <div data-test="search-form-component" />
    </form>
  );
});

SearchForm.propTypes = {
  onAddSearch: PropTypes.func.isRequired,
};
export default SearchForm;
