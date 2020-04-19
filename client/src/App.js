import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import Content from "./nav/Content/Content.js";
import "./App.css";
import Login from "./nav/Login/Login.js";
import Register from "./nav/Register/Register.js";
import Movies from "./moviesApp.js";
import Settings from "./nav/Settings/Settings.js";
import MyShows from "./nav/Content/MyShows.js";
import MyMovies from "./movies/components/Movies/MyMovies.js";

export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const logOutCallback = async () => {
    await fetch("http://localhost:4010/logout", {
      method: "POST",
      credentials: "include", // Needed to include the cookie
    });
    // Clear user from context
    setUser({});
    navigate("/");
  };

  // First thing, check if a refreshtoken exist(If USer STill Has Access)
  useEffect(() => {
    async function checkRefreshToken() {
      const result = await (
        await fetch("http://localhost:4010/refresh_token", {
          method: "POST",
          credentials: "include", // Needed to include the cookie
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      setUser({
        accesstoken: result.accesstoken,
      });
      setLoading(false);
    }
    checkRefreshToken();
  }, []);

  if (loading)
    return (
      <div
        className="spinner-grow text-dark"
        role="status"
        style={{ margin: "auto" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router id="router">
        <Settings path="/settings" logOutCallback={logOutCallback} />
        <Login path="/login" />
        <Register path="/register" />
        <Content path="/" loading={loading} logOutCallback={logOutCallback} />
        <Movies path="/Movies" logOutCallback={logOutCallback} />
        <MyMovies path="/MyMovies" logOutCallback={logOutCallback} />
        <MyShows path="/MyTvShows" logOutCallback={logOutCallback} />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
