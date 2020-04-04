import React, { useState } from "react";
import { navigate } from "@reach/router";
import Navigation from "../Navigation/Navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await (
      await fetch("http://localhost:4010/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person_name: name,
          password: password,
        }),
      })
    ).json();
    if (!result.error) {
      console.log(result.message);
      navigate("/login");
    } else {
      console.log(result.error);
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
          REGISTER
        </button>
      </form>
    </React.Fragment>
  );
};

export default Register;
