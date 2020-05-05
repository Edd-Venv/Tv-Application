const { verify } = require("jsonwebtoken");

const isAuth = (req) => {
  const { authorization } = req.headers;

  if (!authorization || authorization.includes(undefined)) return null;
  // Based on 'Bearer ksfljrewori384328289398432'
  const token = authorization.split(" ")[1];

  const { userId } = verify(token, "EDWINRULES");

  return userId;
};

module.exports = {
  isAuth,
};
