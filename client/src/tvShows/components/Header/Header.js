import React, { useContext } from "react";
import { TvContext } from "../../contexts/tvContext";
import "./Header.css";

function Header() {
  const { isLoaded, data } = useContext(TvContext);

  return (
    <div className="flex-container">
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
          <div className="header1" key={data[49].id}>
            <a
              href={data[49].officialSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="loading"
                src={data[49].image.original}
                className="img-thumbnail"
                id="box"
              />
            </a>
          </div>
          <div className="header2" key={data[6].id}>
            <a
              href={data[6].officialSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="loading"
                src={data[6].image.original}
                className="img-thumbnail"
                id="box"
              />
            </a>
          </div>
          <div className="header3" key={data[52].id}>
            <a
              href={data[52].officialSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="loading"
                src={data[52].image.original}
                className="img-thumbnail"
                id="box"
              />
            </a>
          </div>
          <div className="header4" key={data[7].id}>
            <a
              href={data[7].officialSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="loading"
                src={data[7].image.original}
                className="img-thumbnail"
                id="box"
              />
            </a>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
export default React.memo(Header);
