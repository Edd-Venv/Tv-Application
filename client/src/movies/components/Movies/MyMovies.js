import React, { useEffect, useState, useContext } from "react";
import { UserContext, BaseUrl } from "../../../App.js";
import Navigation from "../../../nav/Navigation/Navigation.js";
import PropTypes from "prop-types";
import "./Movies.css";

const MyMovies = (props) => {
  const [currentFilterText, setFilterText] = useState("");
  const [user] = useContext(UserContext);
  const [content, setContent] = useState([]);

  async function fetchMovies() {
    const result = await (
      await fetch(`${BaseUrl}/MyMovies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accesstoken}`,
        },
      })
    ).json();

    if (result.data) setContent([result.data]);
  }

  useEffect(() => {
    fetchMovies();
  }, [user]);

  async function deleteMovie(Args) {
    try {
      if (user.accesstoken)
        await fetch(`${BaseUrl}/MyMovies`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accesstoken}`,
          },
          body: JSON.stringify({
            movie_title: Args[0],
            movie_key: Args[1],
          }),
        });
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  }

  const filteredMovies = !currentFilterText
    ? content[0]
    : content[0].filter((show) =>
        show.movie_title.toLowerCase().includes(currentFilterText.toLowerCase())
      );

  return (
    <React.Fragment>
      <Navigation
        displayLogin={"dontDisplayLoginForm"}
        logOutCallback={props.logOutCallback}
      />
      <br />
      <React.Fragment>
        <div className="movie-input-container" id="movie-input">
          <button id="MovieSearchButton" type="submit">
            <i className="fas fa-search" />
          </button>
          <input
            id="filter-by-movie-title"
            onMouseLeave={() => {
              document.getElementById("filter-by-movie-title").blur();
            }}
            onMouseOver={() => {
              document.getElementById("filter-by-movie-title").focus();
            }}
            className="movie-input-style"
            type="text/number"
            placeholder="Movie Title"
            onChange={(event) => {
              setFilterText(event.target.value);
            }}
            value={currentFilterText}
            style={{ fontFamily: "Roboto Condensed, sans-serif" }}
          />
        </div>
        <div className="my-movies-container">
          {filteredMovies.map((info) => {
            return (
              <div
                className="my-movies-card card mb-3"
                id="my-movies-item"
                key={info.movie_key}
              >
                <div className="row no-gutters">
                  <div className="my-movies-image-container">
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
                      <div className="my-movies-card-font">
                        <p className="card-text">
                          <strong>Summary : </strong>{" "}
                          {info.movie_summary.substring(0, 90)}
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
      <div data-test="my-movies-component" />
    </React.Fragment>
  );
};

MyMovies.propTypes = {
  logOutCallback: PropTypes.func.isRequired,
};
export default MyMovies;
