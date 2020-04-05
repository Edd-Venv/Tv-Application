import React, { useContext } from "react";
import "./Movies.css";
import { MovieContext } from "../../contexts/movieContext.js";

function Movie() {
  const { isLoaded, data } = useContext(MovieContext);

  return (
    <React.Fragment>
      {isLoaded === false ? (
        <div
          className="spinner-grow text-dark"
          role="status"
          style={{ margin: "0 auto" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="movieContainer">
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
        </div>
      )}
    </React.Fragment>
  );
}

export default Movie;
