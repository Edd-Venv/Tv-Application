import React, { useState, useRef, useEffect } from "react";
import { navigate } from "@reach/router";

import handleToolTip from "../Utils/tooltip.js";
import { BaseUrl } from "../../App.js";
import Navigation from "../Navigation/Navigation.js";
import "../Login/Login.css";

const ResetPassword = (props) => {
  const [name, setName] = useState("");
  const [state, setState] = useState({ message: "" });
  const [password, setPassword] = useState("");
  const newPasswordRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    newPasswordRef.current.focus();
  }, []);

  const firstKeyDown = (event) => {
    if (event.key === "Enter") emailRef.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.location.pathname.split("/")[2];
    const result = await (
      await fetch(`${BaseUrl}/resetPassword/${token}`, {
        method: "PATCH",
        credentials: "include", // Needed to include the cookie
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      })
    ).json();

    if (result.status === "success") {
      navigate("/login");
    } else if (result.status === "error") {
      setState({ message: result.error });
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  handleToolTip(
    "reset-password-tool-tip",
    "reset-password-user-name-input",
    "reset-password-form"
  );

  useEffect(() => {
    if (document.getElementById("reset-password-tool-tip")) {
      const setToolTip = document.getElementById("reset-password-tool-tip");
      if (state.message !== "") setToolTip.textContent = state.message;

      setTimeout(() => {
        setToolTip.textContent = "";
      }, 3000);
    }
  }, [state.message]);

  return (
    <React.Fragment>
      <Navigation />
      <div>
        <form
          className="card mb-3"
          onSubmit={handleSubmit}
          id="reset-password-form"
        >
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              id="reset-password-user-name-input"
              className="form-control"
              value={password}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="New Password"
              required
              ref={newPasswordRef}
              onKeyDown={firstKeyDown}
              style={{ fontFamily: "Roboto Condensed, sans-serif" }}
            />
          </div>
          <div />

          <br />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default React.memo(ResetPassword);
