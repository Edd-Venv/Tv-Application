import React, { useContext } from "react";
import { UserContext } from "../../App.js";
import { GoTrashcan } from "react-icons/go";
import Navigation from "../Navigation/Navigation.js";
import ChangeUserName from "./ChangeUserName.js";
import ChangeUserPwd from "./ChangeUserPwd.js";

function Settings(props) {
  const [user] = useContext(UserContext);

  const deleteUser = async () => {
    const result = await (
      await fetch("http://localhost:4010/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accesstoken}`,
        },
      })
    ).json();

    if (!result.error) {
      console.log(result.message);
    } else {
      console.log(result.error);
    }

    props.logOutCallback();
  };

  return (
    <React.Fragment>
      <Navigation logOutCallback={props.logOutCallback} />
      <ChangeUserName logOutCallback={props.logOutCallback} />
      <ChangeUserPwd logOutCallback={props.logOutCallback} />
      <h3>DELETE Profile</h3>
      <button className="btn btn-danger" onClick={deleteUser}>
        DELETE USER
        <GoTrashcan />
      </button>
    </React.Fragment>
  );
}

export default Settings;
