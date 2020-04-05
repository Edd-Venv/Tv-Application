import React, { useState } from "react";

const SearchForm = React.memo((props) => {
  const [currentText, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddSearch(currentText);
    setText("");

    document.getElementById("movie-model").style.display = "block";

    //document.getElementById("movie-slider").style.display = "none";
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="movie-center-form"
      autoComplete="off"
    >
      <span className="form-inline">
        <button id="MovieSearchButton" type="submit">
          <i className="fas fa-search" />
        </button>
        <input
          className="MovieInputStyle"
          type="text/number"
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={currentText}
          placeholder="Movie Title"
          id="input"
          required
        />
      </span>
    </form>
  );
});
export default SearchForm;
