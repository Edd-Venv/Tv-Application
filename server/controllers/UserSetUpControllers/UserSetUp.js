/* eslint-disable camelcase */
const { verify } = require("jsonwebtoken");
const pool = require("../../database-connection/db.js");

const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require("../../src/tokens.js");
const Model = require("../../models/UserSetUpModel/UserSetUp.js");

exports.register = async (req, res) => {
  try {
    await Model.registerModel(req);
    res.status(201).send({ status: "success", message: "User Created" });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err.message}` });
  }
};

exports.login = async (req, res) => {
  try {
    await Model.loginModel(req, res);
  } catch (err) {
    res.status(404).json({
      status: "error",
      error: `${err.message}`,
    });
  }
};

exports.logOut = async (req, res) => {
  await Model.logOutModel(req, res);
  return res.status(200).json({
    status: "success",
    message: "Logged out",
  });
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshtoken;
    // If we don't have a token in our request ask to relogin I think
    if (!token)
      return res.json({ status: "error", error: "token doesn't exist" });
    // We have a token, let's verify it!
    let payload = null;
    try {
      payload = verify(token, "EDWINRULESEVENMORE");
    } catch (err) {
      return res.status(404).json({ status: "error", error: err });
    }

    // token is valid, now check if user exists in dataBase
    const checkDB = await pool.query(
      `SELECT id_uid FROM person WHERE id_uid = '${payload.userId}'`
    );
    const doesUserExist = checkDB.rows[0].id_uid;
    if (!doesUserExist) throw new Error("User Doesn't Exist In DataBase");

    // user exists, check if refreshtoken exist on user in dataBase.
    const checkRefreshToken = await pool.query(
      `SELECT refreshtoken FROM person WHERE id_uid = '${payload.userId}'`
    );

    if (checkRefreshToken.rows[0].refreshtoken !== token)
      throw new Error("Tokens Don't Match");

    // token exist, create new Refresh And Accesstoken
    const id_uid = doesUserExist;
    const accesstoken = createAccessToken(id_uid);
    const refreshtoken = createRefreshToken(id_uid);

    //Update refreshtoken on user in dataBase
    await pool.query(
      `UPDATE person SET refreshtoken = '${refreshtoken}'
             WHERE id_uid = '${id_uid}'`
    );

    //All Checks Out send new refreshtoken and accesstoken
    sendRefreshToken(res, refreshtoken);
    //const accesstoken = Model.registerModel(req, res);

    return res.status(200).json({ status: "success", accesstoken });
  } catch (err) {
    return res.status(404).json({ status: "success", message: err });
  }
};
