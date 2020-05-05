const { sign } = require("jsonwebtoken");

// Create tokens
// ----------------------------------
const createAccessToken = (userId) => {
  return sign({ userId }, "EDWINRULES", {
    expiresIn: "14d",
    algorithm: "HS256",
  });
};

const createRefreshToken = (userId) => {
  return sign({ userId }, "EDWINRULESEVENMORE", {
    expiresIn: "14d",
    algorithm: "HS256",
  });
};

// Send tokens
// ----------------------------------
const sendAccessToken = (res, req, accesstoken, userImage) => {
  res.json({
    accesstoken,
    person_name: req.body.person_name,
    userImage: userImage,
  });
};

const sendRefreshToken = (res, token) => {
  res.cookie("refreshtoken", token, {
    httpOnly: true,
    path: "/refresh_token",
    expires: new Date(Date.now() + 8 * 3600000),
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
