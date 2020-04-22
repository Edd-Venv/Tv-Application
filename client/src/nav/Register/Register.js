import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import { navigate } from "@reach/router";
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
  const handleLoginAndResgister = async (url) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        person_name: name,
        password: password,
      }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = handleLoginAndResgister(`${BaseUrl}/register`);

    if (!result.error) {
      //Login User automatically
      const secondResult = await (
        await handleLoginAndResgister(`${BaseUrl}/login`)
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
          {state.message}
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
