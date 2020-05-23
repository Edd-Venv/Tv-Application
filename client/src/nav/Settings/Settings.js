import React, { useContext } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import { GoTrashcan } from "react-icons/go";
import Navigation from "../Navigation/Navigation.js";
import ChangeUserName from "./ChangeUserName.js";
import ChangeUserPwd from "./ChangeUserPwd.js";
import ChangeUserPhoto from "./ChangeUserPhoto.js";

function Settings(props) {
  const [user] = useContext(UserContext);

  const deleteUser = async () => {
    const result = await fetch(`${BaseUrl}/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accesstoken}`,
      },
    });

    if (result.ok) {
      props.logOutCallback();
    } else {
      console.log(result.error);
    }
  };

  return (
    <React.Fragment>
      <Navigation logOutCallback={props.logOutCallback} />
      <h3
        style={{
          fontFamily: "Oswald, sans-serif",
          textAlign: "center",
          color: "white",
        }}
      >
        ACCOUNT SETTINGS
      </h3>
      <div className="settings-flex-container">
        <div className="settings-image">
          <ChangeUserPhoto logOutCallback={props.logOutCallback} />
        </div>
        <div className="settings-form">
          <ChangeUserName />
          <ChangeUserPwd />
          <button
            className="settings-button btn btn-danger"
            onClick={deleteUser}
          >
            DELETE USER
            <GoTrashcan />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Settings;
