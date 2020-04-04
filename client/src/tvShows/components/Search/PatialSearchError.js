import React from "react";
import "./Search.css";

const PartialSearchError = props => {
  const { data, summary } = props;
  return (
    <React.Fragment>
      <h2 className="card-img-top" style={{ marginLeft: "20%" }}>
        <i>IMAGE IS NOT AVAILABLE</i>
      </h2>
      <hr />
      <div className="card-body">
        <h2 className="card-title" style={{ marginLeft: "41%" }}>
          {data.name}
        </h2>
        <div className="card-text" id="font-size">
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default PartialSearchError;
