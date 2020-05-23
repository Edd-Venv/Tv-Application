import React, { useContext, useState, useEffect } from "react";
import { UserContext, BaseUrl } from "../../../App.js";
import "./BodyCard.css";

const BodyCard = (props) => {
  const [user] = useContext(UserContext);
  const [state, setState] = useState({ message: "" });
  const { data, handleClose } = props;

  async function saveShow(Args) {
    if (!user.accesstoken) {
      document.getElementById("body-button").style.backgroundColor = "red";
      setState({ message: "You need to login to Save." });
    } else {
      const result = await (
        await fetch(`${BaseUrl}/`, {
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
          document.getElementById("body-button").style.backgroundColor = "red";
        setState({ message: result.message });
      } else {
        setState({ message: result.error });
      }
    }
  }

  useEffect(() => {
    if (state.message !== "") {
      setTimeout(() => {
        if (document.getElementById("body-button"))
          document.getElementById("body-button").style.backgroundColor =
            "#337ab7";
        setState({ message: "" });
      }, 3000);
    }
  }, [state]);

  return (
    <div id="body-card">
      <div className="body-card-container">
        <div
          className="body-card card mb-3"
          style={{
            backgroundImage: `url(${data.image.original})`,
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
          <div className="row no-gutters">
            <div className="col-md-4">
              <div className="body-card-show-image"></div>
            </div>
            <div className="col-md-8">
              <div className="card-body" id="body-card-font">
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
                    id="body-button"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyCard;
