import React, { useState } from "react";

const SearchForm = React.memo((props) => {
  const [currentText, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddSearch(currentText);
    setText("");

    document.getElementById("model").style.display = "block";
    document.getElementById("slider").style.display = "none";
  };
  return (
    <form onSubmit={handleSubmit} className="center-form" autoComplete="off">
      <span className="form-inline">
        <button id="SearchButton" type="submit">
          <i className="fas fa-search" />
        </button>
        <input
          className="InputStyle"
          type="text/number"
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={currentText}
          placeholder="Show Title"
          id="input"
          required
        />
      </span>
    </form>
  );
});
export default SearchForm;
