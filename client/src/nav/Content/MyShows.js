import React, { useEffect, useState, useContext } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import Navigation from "../Navigation/Navigation.js";
import OneShow from "./oneShow.js";
import "./MyShows.css";

const MyShows = (props) => {
  const [currentFilterText, setFilterText] = useState("");
  const [user] = useContext(UserContext);
  const [content, setContent] = useState([]);

  async function fetchShows() {
    const result = await (
      await fetch(`${BaseUrl}/Myshows`, {
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
        await fetch(`${BaseUrl}/MyShows/Delete`, {
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

  const filteredShows = !currentFilterText
    ? content[0]
    : content[0].filter((show) =>
        show.show_title.toLowerCase().includes(currentFilterText.toLowerCase())
      );

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
      ) : user.accesstoken && content[0].length === 1 ? (
        <OneShow content={content} deleteShow={deleteShow} />
      ) : (
        <React.Fragment>
          <div className="show-input-container" id="show-input">
            <button id="SearchButton" type="submit">
              <i className="fas fa-search" />
            </button>
            <input
              id="filter-by-show-title"
              onMouseLeave={() => {
                document.getElementById("filter-by-show-title").blur();
              }}
              onMouseOver={() => {
                document.getElementById("filter-by-show-title").focus();
              }}
              className="show-input-style"
              type="text/number"
              placeholder="Show Title"
              onChange={(event) => {
                setFilterText(event.target.value);
              }}
              value={currentFilterText}
            />
          </div>
          <div className="my-shows-container">
            {filteredShows.map((info) => {
              return (
                <div
                  className="card mb-3"
                  style={{ width: "80%" }}
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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MyShows;
