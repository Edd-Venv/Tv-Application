import React, { useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import Content from "./nav/Content/Content.js";
import "./App.css";

export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const logOutCallback = async () => {
    await fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include" // Needed to include the cookie
    });
    // Clear user from context
    setUser({});
    navigate("/");
  };

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
      <div
        style={{
          maxWidth: "1000px",
          minWidth: "50%",
          margin: "0 auto"
        }}
      >
        <Router id="router">
          <Content path="/" loading={loading} logOutCallback={logOutCallback} />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
