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
            <div className="body1" key={data[30].id}>
              <a
                href={data[30]._links.self.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="loading"
                  src={data[30].image.original}
                  className="img-thumbnail"
                  id="box"
                />
              </a>
            </div>
            <div className="body2" key={data[127].id}>
              <a
                href={data[127]._links.self.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="loading"
                  src={data[127].image.original}
                  className="img-thumbnail"
                  id="box"
                />
              </a>
            </div>
            <div className="body3" key={data[50].id}>
              <a
                href={data[50]._links.self.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="loading"
                  src={data[50].image.original}
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
