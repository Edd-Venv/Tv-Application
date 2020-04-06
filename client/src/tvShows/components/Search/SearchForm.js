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
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="show-input-container" id="show-input">
        <button id="SearchButton" type="submit">
          <i className="fas fa-search" />
        </button>
        <input
          className="show-input-style"
          type="text/number"
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={currentText}
          placeholder="Show Title"
          required
        />
      </div>
    </form>
  );
});
export default SearchForm;
