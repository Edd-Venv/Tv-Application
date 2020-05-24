import React from "react";
import Header from "./tvShows/components/Header/Header";
import { TvContextProvider } from "./tvShows/contexts/tvContext.js";
import Body from "./tvShows/components/Body/Body";
import Search from "./tvShows/components/Search/Search";
import Slider from "./tvShows/components/Slider/Slider.js";
import Navigation from "./nav/Navigation/Navigation.js";

function TvShows(props) {
  return (
    <React.Fragment>
      <Navigation path="/" logOutCallback={props.logOutCallback} />
      <TvContextProvider>
        <div>
          <h2>TRENDING SHOWS</h2>
          <Header />
          <br />
          <Body />
          <br />
          <Search />
          <br />
          <Slider />
          <br />
        </div>
      </TvContextProvider>
    </React.Fragment>
  );
}
export default TvShows;
