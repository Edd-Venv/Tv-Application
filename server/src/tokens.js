const { sign } = require("jsonwebtoken");

// Create tokens
// ----------------------------------
const createAccessToken = (userId) => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "14d",
    algorithm: "HS256",
  });
};

const createRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
    algorithm: "HS256",
  });
};

// Send tokens
// ----------------------------------
const sendAccessToken = (res, req, accesstoken) => {
  res.send({
    accesstoken,
    person_name: req.body.person_name,
  });
};

const sendRefreshToken = (res, token) => {
  res.cookie("refreshtoken", token, {
    httpOnly: true,
    path: "/refresh_token",
    expires: new Date(Date.now() + 168 * 3600000),
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
