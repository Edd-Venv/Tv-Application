import React, { useContext, useState } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import "./Settings.css";

function ChangeUserPwd(props) {
  const [user] = useContext(UserContext);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await (
      await fetch(`${BaseUrl}/settings/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accesstoken}`,
        },
        body: JSON.stringify({
          old_password: oldPwd,
          new_password: newPwd,
        }),
      })
    ).json();
    if (!result.error) {
      console.log(result.message);
    } else {
      console.log(result.error);
    }

    props.logOutCallback();
  };

  const handleInput = (event) => {
    if (event.target.name === "old password") {
      setOldPwd(event.target.value);
    } else setNewPwd(event.target.value);
  };
  return (
    <form className="card mb-3 form" onSubmit={handleSubmit}>
      <div className="form-group">
        <h3 style={{ textAlign: "center", color: "white" }}>CHANGE PASSWORD</h3>
        <label htmlFor="old password">OLD PASSWORD</label>
        <input
          className="form-control"
          value={oldPwd}
          placeholder="Old Password"
          type="password"
          onChange={handleInput}
          name="old password"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="new password">NEW PASSWORD</label>
        <input
          className="form-control"
          name="new password"
          value={newPwd}
          placeholder="New Password"
          type="password"
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

export default ChangeUserPwd;
