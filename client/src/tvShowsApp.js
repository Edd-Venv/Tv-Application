import React from "react";
import Header from "./tvShows/components/Header/Header";
import { TvContextProvider } from "./tvShows/contexts/tvContext.js";
import Body from "./tvShows/components/Body/Body";
import Search from "./tvShows/components/Search/Search";
import Slider from "./tvShows/components/Slider/Slider.js";

function TvShows() {
  return (
    <React.Fragment>
      <TvContextProvider>
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.5em",
            fontWeight: "bolder",
            color: "white"
          }}
        >
          TRENDING SHOWS
        </h2>
        <Header />
        <br />
        <Body />
        <br />
        <Search />
        <br />
        <Slider />
      </TvContextProvider>
    </React.Fragment>
  );
}
export default TvShows;
