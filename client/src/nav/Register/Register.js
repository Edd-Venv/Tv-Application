import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import { navigate } from "@reach/router";
import handleLoginAndResgister from "../Utils/RegisterFunc.js";
import handleToolTip from "../Utils/tooltip.js";
import Navigation from "../Navigation/Navigation";
import "./Register.css";

const Register = () => {
  const [, setUser] = useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({ message: "" });
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  const firstKeyDown = (event) => {
    if (event.key === "Enter") passwordRef.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await (
      await handleLoginAndResgister(`${BaseUrl}/register`, name, password)
    ).json();

    if (!result.error) {
      //Login User automatically
      const secondResult = await (
        await handleLoginAndResgister(`${BaseUrl}/login`, name, password)
      ).json();

      if (secondResult.accesstoken) {
        setUser({
          accesstoken: secondResult.accesstoken,
        });
        navigate("/");
      }
    } else {
      setState({ message: result.error });
    }
  };

  const handleChange = (e) => {
    if (e.currentTarget.name === "name") {
      setName(e.currentTarget.value.toUpperCase());
    } else {
      setPassword(e.currentTarget.value);
    }
  };
  handleToolTip(
    "register-tool-tip",
    "register-user-name-input",
    "register-form"
  );

  useEffect(() => {
    if (document.getElementById("register-tool-tip")) {
      const setToolTip = document.getElementById("register-tool-tip");
      if (state.message !== "") setToolTip.textContent = state.message;

      setTimeout(() => {
        setToolTip.textContent = "";
      }, 3000);
    }
  }, [state.message]);

  return (
    <React.Fragment>
      <Navigation displayLogin={"dontDisplayLoginForm"} />
      <form className="card mb-3" onSubmit={handleSubmit} id="register-form">
        <h3 style={{ textAlign: "center" }}>
          REGISTER
          <hr />
        </h3>
        <div className="form-group">
          <label htmlFor="name">USER NAME</label>
          <input
            id="register-user-name-input"
            className="form-control"
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="User Name"
            required
            onKeyDown={firstKeyDown}
            ref={userNameRef}
          />
          <div />
        </div>
        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            className="form-control"
            value={password}
            onChange={handleChange}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            required
            ref={passwordRef}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          REGISTER
        </button>
      </form>
    </React.Fragment>
  );
};

export default Register;
