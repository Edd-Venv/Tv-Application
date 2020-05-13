import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import { navigate } from "@reach/router";
import handleLogin from "../Utils/RegisterFunc.js";
import handleToolTip from "../Utils/tooltip.js";
import Navigation from "../Navigation/Navigation";
import Axios from "axios";
import "./Register.css";

const Register = () => {
  const [, setUser] = useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [state, setState] = useState({ message: "" });
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  const firstKeyDown = (event) => {
    if (event.key === "Enter") passwordRef.current.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    (async function () {
      if (file) {
        const formData = new FormData();
        formData.append("person_name", `${name}`);
        formData.append("password", `${password}`);
        formData.append("photo", file, "photo");

        await Axios.post(`${BaseUrl}/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        navigate("/login");
      } else {
        await handleLogin(`${BaseUrl}/register`, name, password);
        navigate("/login");
      }
    })();
  };

  const handleChange = (event) => {
    if (event.currentTarget.name === "name") {
      setName(event.currentTarget.value.toUpperCase());
    } else if (event.currentTarget.name === "password") {
      setPassword(event.currentTarget.value);
    } else {
      const blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
      setFile(blob);
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
      <form
        className="card mb-3"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="register-form"
        autoComplete="off"
      >
        <h3 style={{ textAlign: "center" }}>REGISTER</h3>
        <div className="form-group">
          <label htmlFor="name"></label>
          <input
            id="register-user-name-input"
            className="register-inputs form-control"
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="User Name"
            required
            onKeyDown={firstKeyDown}
            ref={userNameRef}
            style={{ fontFamily: "Roboto Condensed, sans-serif" }}
          />
          <div />
        </div>
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            className="register-inputs form-control"
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
        <div className="form-group">
          <label htmlFor="photo" className="custom-file-upload">
            Add Photo ( Optional )
            <input
              onChange={handleChange}
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              placeholder="test"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          REGISTER
        </button>
      </form>
    </React.Fragment>
  );
};

export default Register;
