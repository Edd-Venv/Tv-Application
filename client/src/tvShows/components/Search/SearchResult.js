import React, { useContext, useEffect, useState } from "react";
import FetalSearchError from "./FetalSearchError.js";
import "./SearchResult.css";
import { UserContext, BaseUrl } from "../../../App.js";
import Trailer from "./SearchResultTrailer.js";

function SearchResult(props) {
  const [state, setState] = useState({ message: "" });
  const {
    data,
    isLoaded,
    image,
    summary,
    exists,
    showTrailer,
    teaser,
    handleClose,
    handleTrailerPlayButton,
    handleTrailerCloseButton,
    handleCloseErrorBackDrop,
  } = props;
  const [user] = useContext(UserContext);

  async function saveShow(Args) {
    if (!user.accesstoken) {
      document.getElementById(
        "tv-show-search-result-button"
      ).style.backgroundColor = "red";
      setState({ message: "You need to login to Save." });
    } else {
      const result = await (
        await fetch(`${BaseUrl}/search/saveShow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accesstoken}`,
          },
          body: JSON.stringify({
            show_key: Args[0],
            show_title: Args[1],
            show_runtime: Args[2],
            show_status: Args[3],
            show_premiered: Args[4],
            show_genre: Args[5],
            show_rating: Args[6],
            show_summary: Args[7],
            show_image: Args[8],
          }),
        })
      ).json();

      if (!result.error) {
        if (result.message !== "Show Saved")
          document.getElementById(
            "tv-show-search-result-button"
          ).style.backgroundColor = "red";
        setState({ message: result.message });
      } else {
        setState({ message: result.error });
      }
    }
  }

  useEffect(() => {
    if (state.message !== "") {
      setTimeout(() => {
        if (document.getElementById("tv-show-search-result-button"))
          document.getElementById(
            "tv-show-search-result-button"
          ).style.backgroundColor = "#337ab7";
        setState({ message: "" });
      }, 3000);
    }
  }, [state]);

  return (
    <React.Fragment>
      <br />
      <br />
      <div id="tv-show-error-back-drop" onClick={handleCloseErrorBackDrop} />
      <Trailer
        showTrailer={showTrailer}
        handleTrailerCloseButton={handleTrailerCloseButton}
      />
      {(data.exists === null && isLoaded === true) ||
      image.original === null ? (
        <FetalSearchError handleCloseErrorBackDrop={handleCloseErrorBackDrop} />
      ) : (
        <div id="search-result-modal">
          <div className="search-container">
            {isLoaded === false || image.original === "" ? (
              <div
                className="spinner-grow text-dark"
                role="status"
                style={{ margin: "0 auto" }}
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div
                className=" tv-search-result-card card mb-3"
                style={{
                  backgroundImage: `url(${image.original})`,
                }}
              >
                <span onClick={handleClose} className="close-card-button">
                  <svg
                    className="bi bi-x-square-fill"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm9.854 4.854a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <React.Fragment>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <div className="show-image"></div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body" id="search-result-font">
                        <h2 className="card-title">{data.name}</h2>
                        <hr />
                        <div className="card-text">
                          <p>
                            {" "}
                            <big>Description:</big>
                            {summary
                              .replace(/<p>/g, " ")
                              .replace(/<b>/g, " ")
                              .replace(/p>/g, " ")
                              .replace(/</g, " ")
                              .replace(/i>/g, " ")
                              .replace(/b>/g, " ")
                              .substring(0, 250)}
                            .
                          </p>
                          <p>
                            <big>Premiered: </big>
                            {data.premiered}{" "}
                          </p>
                          <p>
                            <big>Runtime: </big>
                            {data.runtime} min's
                          </p>
                          <p>
                            <big>Rating: </big>
                            {data.rating.average}
                          </p>
                          <button
                            className="btn btn-primary"
                            id="tv-show-search-result-button"
                            onClick={saveShow.bind(this, [
                              data.id,
                              data.name,
                              data.runtime,
                              data.status,
                              data.premiered,
                              data.genres[0],
                              data.rating.average,
                              data.summary
                                .replace(/<p>/g, " ")
                                .replace(/<b>/g, " ")
                                .replace(/p>/g, " ")
                                .replace(/</g, " ")
                                .replace(/i>/g, " ")
                                .replace(/b>/g, " ")
                                .substring(0, 100),
                              data.image.original,
                            ])}
                          >
                            {state.message === "" ? "Save" : state.message}
                          </button>
                          <br />
                          {exists === "unknown" ? null : (
                            <button
                              className="btn btn-dark"
                              onClick={handleTrailerPlayButton}
                            >
                              Watch Trailer
                              <i className="fab fa-google-play" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default SearchResult;
/*

(showTrailer === "" && !teaser) ||
            (data === undefined && isLoaded === true) ||
            image === null ? (
            <FetalSearchError handleClose={handleClose} />
          ) :


isLoaded === false ? (
            <div
              className="spinner-grow text-dark"
              role="status"
              style={{ margin: "0 auto" }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : 

<div className="col-md-4">
                      <div className="show-image">
                        <img
                          src={image.original}
                          alt={data.name}
                          className="img-thumbnail"
                        />
                      </div>
                    </div>
{Test === "unknown" ? (
                        <p id="show-error-paragraph">SHOW NOT IN DATABASE</p>
                      ) : (
                        <div className="card-body">
                          <h5 id="show-trailer">Show Trailer</h5>
                          <iframe
                            src={showTrailer}
                            className="iframe"
                            title="This is a unique title prop"
                          />
                        </div>
                      )}
*/
