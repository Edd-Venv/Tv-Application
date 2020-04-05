import React, { useContext } from "react";
import "./SearchResult.css";
import PartialSearchError from "./PatialSearchError";
import { UserContext } from "../../../App.js";

function SearchResult(props) {
  const {
    data,
    isLoaded,
    image,
    summary,
    Test,
    showTrailer,
    teaser,
    handleClose,
  } = props;
  const [user] = useContext(UserContext);

  async function saveShow(Args) {
    if (!user.accesstoken) return console.log("You need to login to Save.");
    else {
      const result = await (
        await fetch("http://localhost:4010/search/saveShow", {
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
        console.log(result.message);
      } else {
        console.log(result.error);
      }
    }
  }

  return (
    <React.Fragment>
      <br />
      <br />
      <div id="model">
        {(showTrailer === "" && !teaser) ||
        (isLoaded === false && data === undefined) ||
        !image ? (
          <div style={{ textAlign: "center", color: "white" }}>Loading...</div>
        ) : (
          <div className="search-container">
            <div className="card mb-3">
              <span onClick={handleClose} className="close" id="close-button">
                ×
              </span>
              {image === null ? (
                <PartialSearchError data={data} summary={summary} />
              ) : (
                <React.Fragment>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <div className="ShowImage">
                        <img
                          src={image.original}
                          alt={data.name}
                          className="img-thumbnail"
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h2 className="card-title">{data.name}</h2>
                        <hr />
                        <div id="search-result-font-size" className="card-text">
                          <p>
                            {" "}
                            <strong>Description:</strong>
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
                            <strong>Premiered: </strong>
                            {data.premiered}{" "}
                          </p>
                          <p>
                            <strong>Runtime: </strong>
                            {data.runtime} mins
                          </p>
                          <p>
                            <strong>Rating: </strong>
                            {data.rating.average}
                          </p>
                          <button
                            className="btn btn-primary"
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
                            save
                          </button>
                        </div>
                      </div>
                    </div>
                    <React.Fragment>
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
                    </React.Fragment>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default SearchResult;
