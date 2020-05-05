import React, { useState, useContext } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import "./Settings.css";

function ChangeUserName(props) {
  const [user] = useContext(UserContext);
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await (
      await fetch(`${BaseUrl}/user/name`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accesstoken}`,
        },
        body: JSON.stringify({
          old_name: oldName,
          new_name: newName,
        }),
      })
    ).json();

    if (!result.error) {
      console.log(result.message);
      props.logOutCallback();
    } else {
      console.log(result.error);
    }
  };

  const handleInput = (event) => {
    if (event.target.name === "old Name") {
      setOldName(event.target.value.toUpperCase());
    } else setNewName(event.target.value.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-3 form" autoComplete="off">
      <div className="form-group">
        <h3
          style={{
            fontFamily: "Oswald, sans-serif",
            textAlign: "center",
            color: "white",
          }}
        >
          CHANGE USER NAME
        </h3>
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
