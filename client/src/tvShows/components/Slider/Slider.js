import React, { useContext } from "react";
import { TvContext } from "../../contexts/tvContext.js";
import "./Slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { UserContext } from "../../../App.js";
import PopUp from "./Card.js";

function Slider() {
  const { isLoaded, data } = useContext(TvContext);
  const [user] = useContext(UserContext);
  const slicedArray = [];

  for (let i = 0; i < 12; i++) {
    slicedArray.push(data[i]);
  }
  async function saveShow(Args) {
    if (!user.accesstoken) return console.log("You need to login to Save.");
    else {
      const result = await (
        await fetch("http://localhost:4010/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accesstoken}`, //To Be Converted To User ID using Auth in Server
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
  const showPopUp = (data) => {
    if (document.getElementById("show-pop-up") !== null) {
      document.getElementById("show-pop-up").style.display = "block";
      return <PopUp data={data} />;
    }
  };
  return (
    <React.Fragment>
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
          <div id="slider">
            <Carousel
              centerMode={true}
              showStatus={false}
              showThumbs={false}
              autoPlay
              infiniteLoop
              showIndicators={false}
            >
              {slicedArray.map((data) => {
                return (
                  <React.Fragment key={data.id}>
                    <button onClick={showPopUp.bind(this, data)}>
                      <img
                        alt="loading"
                        src={data.image.original}
                        className="img-thumbnail"
                        id="slider-box"
                      />
                    </button>
                  </React.Fragment>
                );
              })}
            </Carousel>
          </div>
          <PopUp data={data} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default Slider;
