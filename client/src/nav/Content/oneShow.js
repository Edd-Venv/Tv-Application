import React from "react";

const OneShow = (props) => {
  const { content, deleteShow } = props;
  return (
    <div className="books-container">
      {content[0].map((info) => {
        return (
          <div
            className="card mb-3"
            style={{ width: "40%" }}
            key={info.show_key}
          >
            <div className="row no-gutters">
              <div style={{ width: "30%", marginLeft: "3.2%" }}>
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
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
                    <strong>Summary : </strong>{" "}
                    {info.show_summary
                      .substring(3, 80)
                      .replace(/<p>/g, " ")
                      .replace(/<b>/g, " ")}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
                    <strong>Premier Date : </strong>
                    {info.show_premiered}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
                    <strong>Rating : </strong>
                    {info.show_rating}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
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
              </div>{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default React.memo(OneShow);
