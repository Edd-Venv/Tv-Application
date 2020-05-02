/* eslint-disable camelcase */
const uuid_generate = require("uuid");
//const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const pool = require("../../database-connection/db.js");

const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../../src/tokens.js");

exports.registerModel = async (req) => {
  const { person_name, password } = req.body;

  // 1. Check if the user exist
  const checkDB = await pool.query(
    `SELECT person_name FROM person WHERE person_name = '${person_name}'`
  );
  const doesUserExist = checkDB.rows[0];

  if (doesUserExist !== undefined)
    throw new Error(`USER NAME " ${person_name} " IS TAKEN.`);

  // 2. If not user exist already, hash the password
  const hashedPassword = await hash(password, 10);

  // 3. Insert the user in database
  await pool.query(
    "INSERT INTO person (id_uid, person_name, password) VALUES($1, $2, $3)",
    [uuid_generate.v4(), person_name, hashedPassword]
  );
};

exports.loginModel = async (req, res) => {
  const { person_name, password } = req.body;

  // 1. Check if the user exists
  const checkDB = await pool.query(
    `SELECT * from person where person_name = '${person_name}'`
  );
  const doesUserExist = checkDB.rows[0];

  if (!doesUserExist)
    throw new Error(`" ${person_name} " IS AN INVALID USER! `);

  // 2. Compare crypted password and see if it checks out. Send error if not
  const user = doesUserExist;

  const valid = await compare(password, user.password);
  if (!valid) throw new Error(" PASSWORD ENTERED IS NOT CORRECT! ");

  // 3. Create Refresh- and Accesstoken
  const accesstoken = createAccessToken(user.id_uid);
  const refreshtoken = createRefreshToken(user.id_uid);

  // 4. Store Refreshtoken with user in db
  await pool.query(
    `UPDATE person SET refreshtoken = '${refreshtoken}'
               WHERE id_uid = '${user.id_uid}'`
  );

  // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
  sendRefreshToken(res, refreshtoken);
  sendAccessToken(res, req, accesstoken);
};

exports.logOutModel = async (req, res) => {
  res.clearCookie("refreshtoken", { path: "/refresh_token" });

  // Logic here to also remove refreshtoken from dataBase
  const { person_name } = req.body;
  await pool.query(
    `UPDATE person SET refreshtoken = '' WHERE person_name = '${person_name}'`
  );
};
/*
exports.refreshTokenModel = async (req, res) => {
  const token = req.cookies.refreshtoken;
  console.log(token);
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

  return accesstoken;
};
*/
