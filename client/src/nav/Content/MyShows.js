import React, { useEffect, useState, useContext } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import Navigation from "../Navigation/Navigation.js";

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
    fetchShows();
  }, [user]);



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
        <h2
          style={{
            fontFamily: "Roboto Condensed, sans-serif",
            textAlign: "center",
            fontWeight: "bold",
            color: "red",
          }}
        >
          YOU NEED TO LOGIN.
        </h2>
      ) : 
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
              style={{ fontFamily: "Roboto Condensed, sans-serif" }}
              value={currentFilterText}
            />
          </div>
        
          <div className="my-shows-container">
            {filteredShows.map((info) => {
              return (
                <div
                  className="my-shows-card card mb-3"
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
