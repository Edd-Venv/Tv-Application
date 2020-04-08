import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../App.js";
import Navigation from "../../../nav/Navigation/Navigation.js";
import OneMovie from "./oneMovie.js";
import "./Movies.css";

const MyMovies = (props) => {
  // Could have something here to check for the time when the accesstoken expires
  // and then call the refresh_token endpoint to get a new accesstoken automatically
  const [user] = useContext(UserContext);
  const [content, setContent] = useState([]);

  async function fetchMovies() {
    const result = await (
      await fetch("http://localhost:4010/MyMovies", {
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
    //fetch Data at Initialization
    fetchMovies();
  }, [user]);

  async function deleteMovie(Args) {
    try {
      if (user.accesstoken)
        await fetch("http://localhost:4010/MyMovies/Delete", {
          method: "POST",
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

  return (
    <React.Fragment>
      <Navigation
        displayLogin={"dontDisplayLoginForm"}
        logOutCallback={props.logOutCallback}
      />
      <br />
      {!user.accesstoken ? (
        <h2 style={{ textAlign: "center", fontWeight: "bold", color: "white" }}>
          You need to login.
        </h2>
      ) : user.accesstoken && content[0] === undefined ? (
        <div
          className="spinner-grow text-dark"
          role="status"
          style={{ margin: "auto" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : user.accesstoken && content[0].length === 0 ? (
        <h2 style={{ textAlign: "center", fontWeight: "bold", color: "white" }}>
          You Don't Have Movies Saved.
        </h2>
      ) : user.accesstoken && content[0].length <= 2 ? (
        <OneMovie deleteMovie={deleteMovie} content={content} />
      ) : (
        <div className="my-movies-container">
          {content[0].map((info) => {
            return (
              <div
                className="card mb-3"
                style={{ width: "85%" }}
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
                        {info.movie_summary.substring(0, 90)}
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
      )}
    </React.Fragment>
  );
};

export default MyMovies;
