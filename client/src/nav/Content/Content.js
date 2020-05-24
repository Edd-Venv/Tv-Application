import React from "react";
import TvShows from "../../tvShowsApp.js";

const Content = React.memo((props) => {
  if (props.loading) return <div>Loading ...</div>;
  return (
    <React.Fragment>
      <TvShows path="/TvShows" logOutCallback={props.logOutCallback} />
    </React.Fragment>
  );
});

export default Content;
