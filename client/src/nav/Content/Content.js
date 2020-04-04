import React from "react";
import TvShows from "../../tvShowsApp.js";
//import Navigation from "../Navigation/Navigation.js";

const Content = React.memo((props) => {
  // Could have something here to check for the time when the accesstoken expires
  // and then call the refresh_token endpoint to get a new accesstoken automatically
  //<Navigation path="/" logOutCallback={props.logOutCallback} />
  if (props.loading) return <div>Loading ...</div>;
  return (
    <React.Fragment>
      <TvShows path="/TvShows" logOutCallback={props.logOutCallback} />
    </React.Fragment>
  );
});

export default Content;

/*
import { Redirect } from "@reach/router";
const Content = React.memo(() => {
  // Could have something here to check for the time when the accesstoken expires
  // and then call the refresh_token endpoint to get a new accesstoken automatically
  const [user] = useContext(UserContext);
  if (!user.accesstoken) return <Redirect from="" to="login" noThrow />;
  console.log("Content Rendering");
  return (
    <React.Fragment>
      <p>content</p>
    </React.Fragment>
  );
});

*/
