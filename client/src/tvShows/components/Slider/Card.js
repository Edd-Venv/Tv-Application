import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../../App.js";
import rData from "./SliderData.js";
import "./Slider.css";

const PopUp = (props) => {
  const [user] = useContext(UserContext);
  const [state, setState] = useState(rData.data);
  //console.log("1st props", props.data.slice(0, 12)[0]);
  const pRef = useRef(null);
  //console.log("2nd state", state);

  async function saveShow(Args) {
    if (!user.accesstoken) return console.log("You need to login to Save.");
    else {
      const result = await (
        await fetch("http://localhost:4010/saveShow", {
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
    <div id="show-pop-up">
      <p ref={pRef}>test</p>
    </div>
  );
};

export default PopUp;

/*
const [user] = useContext(UserContext);
  const [state, setState] = useState(rData.data);
  //console.log("1st props", props.data.slice(0, 12)[0]);
  const { data } = props;
  //console.log("2nd state", state);
  console.log(data);
  useEffect(() => {
    setState(data.slice(0, 1)[0]);
  }, [data]);

  async function saveShow(Args) {
    if (!user.accesstoken) return console.log("You need to login to Save.");
    else {
      const result = await (
        await fetch("http://localhost:4010/saveShow", {
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
    <div id="show-pop-up">
      <div className="row no-gutters">
        <div className="col-md-4">
          <div className="ShowImage">
            <img
              src={state.image.original}
              alt={state.name}
              className="img-thumbnail"
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">{state.name}</h2>
            <hr />
            <div id="search-result-font-size" className="card-text">
              <p>
                {" "}
                <strong>Description:</strong>
                {state.summary
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
                {state.premiered}{" "}
              </p>
              <p>
                <strong>Runtime: </strong>
                {state.runtime} mins
              </p>
              <p>
                <strong>Rating: </strong>
                {state.rating.average}
              </p>
              <button
                className="btn btn-primary"
                onClick={saveShow.bind(this, [
                  state.id,
                  state.name,
                  state.runtime,
                  state.status,
                  state.premiered,
                  state.genres[0],
                  state.rating.average,
                  state.summary
                    .replace(/<p>/g, " ")
                    .replace(/<b>/g, " ")
                    .replace(/p>/g, " ")
                    .replace(/</g, " ")
                    .replace(/i>/g, " ")
                    .replace(/b>/g, " ")
                    .substring(0, 100),
                  state.image.original,
                ])}
              >
                save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


*/
/*<div className="row no-gutters">
        <div className="col-md-4">
          <div className="ShowImage">
            <img
              src={data.image.original}
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
            </div>
          </div>
        </div>
      </div> */
