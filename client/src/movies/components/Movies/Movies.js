import React from "react";
import "./Movies.css";
import { MovieContext } from "../../contexts/movieContext";

class Movies extends React.Component {
  static contextType = MovieContext;

  render() {
    const { Movies, Movies2, Movies3, Movies4 } = this.context;
    return (
      <React.Fragment>
        <div className="movieContainer">
          <div className="poster1">
            <img
              alt="loading"
              src={Movies.Poster}
              className="img-thumbnail"
              id="boxMovie"
            />
          </div>
          <div className="poster2">
            <img
              alt="loading"
              src={Movies2.Poster}
              className="img-thumbnail"
              id="boxMovie"
            />
          </div>
          <div className="poster3">
            <img
              alt="loading"
              src={Movies3.Poster}
              className="img-thumbnail"
              id="boxMovie"
            />
          </div>
          <div className="poster4">
            <img
              alt="loading"
              src={Movies4.Poster}
              className="img-thumbnail"
              id="boxMovie"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
