import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import { UserContext } from "../../App.js";
import Navigation from "../Navigation/Navigation.js";

const Login = (props) => {
  const [setUser] = useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await (
      await fetch("http://localhost:4010/login", {
        method: "POST",
        credentials: "include", // Needed to include the cookie
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person_name: name,
          password: password,
        }),
      })
    ).json();

    if (result.accesstoken) {
      setUser({
        accesstoken: result.accesstoken,
      });

      navigate("/");
    } else {
      console.log(result.error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value.toUpperCase());
    } else {
      setPassword(e.target.value);
    }
  };

  const { displayLogin } = props;

  return (
    <React.Fragment>
      <Navigation />
      <div className={displayLogin}>
        <form
          className="card mb-3"
          onSubmit={handleSubmit}
          style={{
            width: "30%",
            margin: "0 auto",
            font: "2rem",
            marginTop: "10%",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            LOGIN
            <hr />
          </h3>

          <div className="form-group">
            <label htmlFor="name">USER NAME</label>
            <input
              className="form-control"
              value={name}
              onChange={handleChange.bind(this)}
              type="text"
              name="name"
              placeholder="User Name"
              required
            />
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
            />
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Login);
