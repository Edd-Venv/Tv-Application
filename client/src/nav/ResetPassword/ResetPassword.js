import React, { useState, useRef, useEffect } from "react";
import { navigate } from "@reach/router";

import handleToolTip from "../Utils/tooltip.js";
import { BaseUrl } from "../../App.js";
import Navigation from "../Navigation/Navigation.js";
import "./ResetPassword.css";

const ResetPassword = (props) => {
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (confirmPassword !== password)
      setState({ message: "Passwords do not match!" });
    else {
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
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "password") setPassword(event.target.value);
    else setConfirmPassword(event.target.value);
  };

  handleToolTip(
    "reset-password-tool-tip",
    "reset-password-user-name-input",
    "reset-password-form"
  );

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
            <h3 style={{ textAlign: "center" }}>NEW PASSWORD</h3>
            <div className="form-group">
              <label htmlFor="password"></label>
              <input
                id="reset-password-user-name-input"
                className="reset-password-input form-control"
                value={password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="New Password"
                required
                ref={newPasswordRef}
                onKeyDown={firstKeyDown}
              />
            </div>
            <div className="form-group">
              <input
                className="reset-password-input form-control"
                value={confirmPassword}
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            SEND
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default React.memo(ResetPassword);
