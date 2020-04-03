import React from "react";
import Header from "./tvShows/components/Header/Header";
import { TvContextProvider } from "./tvShows/contexts/tvContext.js";
import Body from "./tvShows/components/Body/Body";
function TvShows() {
  return (
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
    </TvContextProvider>
  );
}
export default TvShows;
