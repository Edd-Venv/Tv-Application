import React, { useContext } from "react";
import "./Movies.css";
import { MovieContext } from "../../contexts/movieContext.js";

function Movie() {
  const { isLoaded, data } = useContext(MovieContext);

  return (
    <div className="movie-container">
      {isLoaded === false ? (
        <div
          className="spinner-grow text-dark"
          role="status"
          style={{ margin: "0 auto" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <React.Fragment>
          {data.map((info) => {
            return (
              <div className="poster" key={info.imdbID}>
                <img
                  alt="loading"
                  src={info.Poster}
                  className="img-thumbnail"
                  id="boxMovie"
                />
              </div>
            );
          })}
        </React.Fragment>
      )}
    </div>
  );
}

export default Movie;
