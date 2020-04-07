import React, { useState } from "react";

const SearchForm = React.memo((props) => {
  const [currentText, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddSearch(currentText);
    setText("");

    document.getElementById("movie-slider").style.display = "none";
    document.getElementById("movie-model").style.display = "block";
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="movie-input-container" id="movie-input">
        <button id="MovieSearchButton" type="submit">
          <i className="fas fa-search" />
        </button>
        <input
          className="movie-input-style"
          type="text/number"
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={currentText}
          placeholder="Movie Title"
          required
        />
      </div>
    </form>
  );
});
export default SearchForm;
