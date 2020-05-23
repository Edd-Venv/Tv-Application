import React, { useContext, useState } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import Axios from "axios";
import "./Settings.css";

function ChangeUserPhoto(props) {
  const [user] = useContext(UserContext);
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    (async function () {
      if (file) {
        const formData = new FormData();
        formData.append("person_name", `${localStorage.getItem("userName")}`);
        formData.append("photo", file, "photo");

        await Axios.patch(`${BaseUrl}/user/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${user.accesstoken}`,
          },
        });
        setFile(null);
        props.logOutCallback();
      }
    })();
  };

  const handleChange = (event) => {
    const blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
    setFile(blob);
  };

  return (
    <form className="settings-image" onSubmit={handleSubmit} autoComplete="off">
      <img
        id="userImg"
        src={require(`../../images/users/${localStorage.getItem("userImage")}`)}
      />
      <label htmlFor="photo"></label>
      <input
        style={{ outline: "none" }}
        onChange={handleChange}
        type="file"
        name="photo"
        id="photo"
        accept="image/*"
      />

      <button type="submit">Save Photo</button>
    </form>
  );
}

export default ChangeUserPhoto;
