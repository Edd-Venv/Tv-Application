import React from "react";

const OneBook = props => {
  const { content, deleteBook } = props;
  return (
    <div className="books-container">
      {content[0].map(info => {
        return (
          <div
            className="card mb-3"
            style={{ width: "40%" }}
            key={info.book_key}
          >
            <div className="row no-gutters">
              <div style={{ width: "30%", marginLeft: "3.2%" }}>
                <img
                  alt="loading"
                  src={info.book_image}
                  className="img-thumbnail"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title" style={{ marginLeft: "2%" }}>
                    {info.book_title}
                  </h2>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
                    {info.author}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
                    <strong>Author : </strong>
                    {info.book_author}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
                    <strong>Number of pages : </strong>
                    {info.book_pages}
                  </p>
                  <p
                    className="card-text"
                    style={{ fontSize: "1.5rem", width: "100%" }}
                  >
                    <strong>Price : </strong>
                    {info.book_price}
                    {info.book_currencycode}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={deleteBook.bind(this, [
                      info.book_title,
                      info.book_key
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
export default React.memo(OneBook);
