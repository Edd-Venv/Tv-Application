import React, { useState, useContext } from "react";
import { UserContext } from "../../App.js";

function ChangeUserName(props) {
  const [user] = useContext(UserContext);
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    const result = await (
      await fetch("http://localhost:4000/settings/changeName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accesstoken}`
        },
        body: JSON.stringify({
          old_name: oldName,
          new_name: newName
        })
      })
    ).json();

    if (!result.error) {
      console.log(result.message);
    } else {
      console.log(result.error);
    }

    props.logOutCallback();
  };

  const handleInput = event => {
    if (event.target.name === "old Name") {
      setOldName(event.target.value.toUpperCase());
    } else setNewName(event.target.value.toUpperCase());
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "30%", margin: "0 auto", font: "2rem" }}
    >
      <div className="form-group">
        <h3 style={{ textAlign: "center" }}>CHANGE USER NAME</h3>
        <label htmlFor="old Name">OLD USERNAME</label>
        <input
          className="form-control"
          value={oldName}
          type="text/number"
          name="old Name"
          placeholder="Old Name"
          onChange={handleInput}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="new Name">NEW USERNAME</label>
        <input
          className="form-control"
          value={newName}
          type="text/number"
          name="new Name"
          placeholder="New Name"
          onChange={handleInput}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        SUBMIT
      </button>
    </form>
  );
}
export default ChangeUserName;
