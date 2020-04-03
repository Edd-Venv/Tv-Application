import React from "react";
import "./MovieSearch.css";

class FetalMovieSearchError extends React.Component {
  render() {
    const { handleClick } = this.props;
    return (
      <React.Fragment>
        <div className="error-div">
          <p className="error-paragraph">Sorry Movie Not In DataBase</p>
          <span onClick={handleClick} className="close" id="error-close-button">
            ×
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default FetalMovieSearchError;
