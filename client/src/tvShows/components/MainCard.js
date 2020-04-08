import React, { useContext, useState } from "react";
import { UserContext } from "../../App.js";
import "./MainCard.css";

const MainCard = (props) => {
  const [user] = useContext(UserContext);
  const [state, setState] = useState({ message: "" });
  const { data, handleClose } = props;

  async function saveShow(Args) {
    if (!user.accesstoken) setState({ messsage: "You need to login to Save." });
    else {
      const result = await (
        await fetch("http://localhost:4010/", {
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
        setState({ message: result.message });
      } else {
        setState({ message: result.error });
      }
    }
  }
  console.log(state);
  return (
    <div id="main-card">
      <div className="main-card-container">
        <div className="card mb-3">
          <span onClick={handleClose} className="close" id="close-button">
            ×
          </span>
          <div className="row no-gutters">
            <div className="col-md-4">
              <div className="main-show-image">
                <img
                  src={data.image.original}
                  alt={data.name}
                  className="img-thumbnail"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body" id="main-card-font">
                <h2 className="card-title">
                  {data.name}
                  <hr />
                </h2>

                <div className="card-text">
                  <p>
                    {" "}
                    <strong>Description:</strong>
                    {data.summary
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
                  {state.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
