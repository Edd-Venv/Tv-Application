import React, { useContext, useState } from "react";
import { UserContext, BaseUrl } from "../../App.js";
import Axios from "axios";
import "./Settings.css";

function ChangeUserPhoto() {
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
      }
    })();
  };

  const handleChange = (event) => {
    const blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
    setFile(blob);
  };

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      <div style={{ margin: "0 auto" }}>
        <img
          id="logoImg"
          style={{
            width: "3vw",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
          src={require(`../../images/users/${localStorage.getItem(
            "userImage"
          )}`)}
        />
        <label htmlFor="photo">Choose New Photo</label>
        <input
          onChange={handleChange}
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
        />
      </div>
      <button type="submit">Save Photo</button>
    </form>
  );
}

export default ChangeUserPhoto;
