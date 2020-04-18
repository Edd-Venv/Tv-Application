import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App.js";
import Navigation from "../Navigation/Navigation.js";
import OneShow from "./oneShow.js";
import "./MyShows.css";

const MyShows = (props) => {
  // Could have something here to check for the time when the accesstoken expires
  // and then call the refresh_token endpoint to get a new accesstoken automatically
  const [user] = useContext(UserContext);
  const [content, setContent] = useState([]);

  async function fetchShows() {
    const result = await (
      await fetch("http://localhost:4010/Myshows", {
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
    fetchShows();
  }, [user]);

  async function deleteShow(Args) {
    try {
      if (user.accesstoken)
        await fetch("http://localhost:4010/MyShows/Delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accesstoken}`,
          },
          body: JSON.stringify({
            show_title: Args[0],
            show_key: Args[1],
          }),
        });
      fetchShows();
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
          You Don't Have Shows Saved.
        </h2>
      ) : (
        <div className="my-shows-container">
          {content[0].map((info) => {
            return (
              <div
                className="card mb-3"
                style={{ width: "85%" }}
                id="my-shows-item"
                key={info.show_key}
              >
                <div className="row no-gutters">
                  <div className="my-shows-image-container">
                    <img
                      alt="loading"
                      src={info.show_image}
                      className="img-thumbnail"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h2 className="card-title" style={{ marginLeft: "2%" }}>
                        {info.show_title}
                      </h2>
                      <div className="my-shows-card-font">
                        <p className="card-text">
                          <strong>Summary : </strong>{" "}
                          {info.show_summary
                            .substring(0, 90)
                            .replace(/<p>/g, " ")
                            .replace(/<b>/g, " ")}
                        </p>
                        <p className="card-text">
                          <strong>Premier Date : </strong>
                          {info.show_premiered}
                        </p>
                        <p className="card-text">
                          <strong>Rating : </strong>
                          {info.show_rating}
                        </p>
                        <p className="card-text">
                          <strong>Genre : </strong>
                          {info.show_genre}
                        </p>
                        <button
                          className="btn btn-danger"
                          onClick={deleteShow.bind(this, [
                            info.show_title,
                            info.show_key,
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
      )}
    </React.Fragment>
  );
};

export default MyShows;
