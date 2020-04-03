import React from "react";
import "./Body.css";
import { TvContext } from "../../contexts/tvContext";

class Body extends React.Component {
  static contextType = TvContext;

  render() {
    const {
      BodyImage,
      BodyImage1,
      BodyImage3,
      BodyLink,
      BodyLink1,
      BodyLink3,
      isLoaded
    } = this.context;
    return (
      <React.Fragment>
        <div className="flex-containerBody">
          {isLoaded === false ? (
            <div
              className="spinner-grow text-dark"
              role="status"
              style={{ margin: "0 auto" }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <React.Fragment>
              <div className="body1">
                body1
                <a href={BodyLink} target="_blank" rel="noopener noreferrer">
                  <img
                    alt="loading"
                    src={BodyImage.original}
                    className="img-thumbnail"
                    id="box"
                  />
                </a>
              </div>
              <div className="body2">
                <a href={BodyLink1} target="_blank" rel="noopener noreferrer">
                  <img
                    alt="loading"
                    src={BodyImage1.original}
                    className="img-thumbnail"
                    id="box"
                  />
                </a>
              </div>
              <div className="body3">
                <a href={BodyLink3} target="_blank" rel="noopener noreferrer">
                  <img
                    alt="loading"
                    src={BodyImage3.original}
                    className="img-thumbnail"
                    id="box"
                  />
                </a>
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Body;
