import React, { useContext } from "react";
import "./Body.css";
import { TvContext } from "../../contexts/tvContext";

function Body() {
  const { isLoaded, data } = useContext(TvContext);

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
            <div className="body1" key={data[40].id}>
              <a
                href={data[40].officialSite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="loading"
                  src={data[40].image.original}
                  className="img-thumbnail"
                  id="box"
                />
              </a>
            </div>
            <div className="body2" key={data[124].id}>
              <a
                href={data[124].officialSite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="loading"
                  src={data[124].image.original}
                  className="img-thumbnail"
                  id="box"
                />
              </a>
            </div>
            <div className="body3" key={data[51].id}>
              <a
                href={data[51].officialSite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="loading"
                  src={data[51].image.original}
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

export default React.memo(Body);
