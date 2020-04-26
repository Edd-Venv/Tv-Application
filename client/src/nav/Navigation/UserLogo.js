import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App.js";
import { GoPerson } from "react-icons/go";

const UserLogo = (props) => {
  const [user] = useContext(UserContext);
  const [name, setName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userName"))
      setName(localStorage.getItem("userName"));
    else setName("GUEST");
    if (user.accesstoken && !localStorage.getItem("userName"))
      props.logOutCallback();
  }, [user.accesstoken]);

  return (
    <span>
      <i
        style={{
          fontSize: "1.5rem",
          color: "black",
          fontWeight: "bold",
          paddingLeft: "0.5rem",
        }}
      >
        <GoPerson />
        {name}
      </i>
    </span>
  );
};
export default React.memo(UserLogo);
