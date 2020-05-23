import React from "react";
import PropTypes from "prop-types";
import "./oneMovie.css";

const OneMovie = (props) => {
  const { content, deleteMovie } = props;
  return (
    <div className="one-movie-container">
      {content[0].map((info) => {
        return (
          <div className="one-movie-card card mb-3" key={info.movie_key}>
            <div className="row no-gutters">
              <div className="one-movie-image-container">
                <img
                  alt="loading"
                  src={info.movie_image}
                  className="img-thumbnail"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title" style={{ marginLeft: "2%" }}>
                    {info.movie_title}
                  </h2>
                  <div className="one-movie-card-font">
                    <p className="card-text">
                      <strong>Summary : </strong>{" "}
                      {info.movie_summary.substring(0, 80)}
                    </p>
                    <p className="card-text">
                      <strong>Premier Date : </strong>
                      {info.movie_release}
                    </p>
                    <p className="card-text">
                      <strong>Rating : </strong>
                      {info.movie_rating}
                    </p>
                    <p className="card-text">
                      <strong>Genres : </strong>
                      {info.movie_genre}
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={deleteMovie.bind(this, [
                        info.movie_title,
                        info.movie_key,
                      ])}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
};
OneMovie.propTypes = {
  deleteMovie: PropTypes.func.isRequired,
  content: PropTypes.array,
};
export default React.memo(OneMovie);
