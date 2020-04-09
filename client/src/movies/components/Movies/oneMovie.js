import React from "react";
import "./Movies.css";

const OneMovie = (props) => {
  const { content, deleteMovie } = props;
  return (
    <div className="my-movies-container">
      {content[0].map((info) => {
        return (
          <div
            className="card mb-3"
            style={{ width: "60%" }}
            key={info.movie_key}
          >
            <div className="row no-gutters">
              <div style={{ width: "30%", marginLeft: "3.2%" }}>
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
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
                    <strong>Summary : </strong>{" "}
                    {info.movie_summary.substring(0, 80)}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
                    <strong>Premier Date : </strong>
                    {info.movie_release}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
                    <strong>Rating : </strong>
                    {info.movie_rating}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
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
              </div>{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default React.memo(OneMovie);
