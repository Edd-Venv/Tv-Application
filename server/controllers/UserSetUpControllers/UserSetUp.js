/* eslint-disable camelcase */
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const { verify } = require("jsonwebtoken");
const pool = require("../../database-connection/db.js");

const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require("../../src/tokens.js");
const Model = require("../../models/UserSetUpModel/UserSetUp.js");

const multerStorage = multer.memoryStorage();

const multerFliter = (req, file, cb) => {
  try {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } catch (error) {
    console.log(error);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFliter });

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) {
    res.json({ error: "File Not Recevied" });
  } else if (req.file) {
    try {
      req.file.filename = `user-${req.body.person_name}-${Date.now()}.jpeg`;

      sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(
          path.resolve(
            __dirname,
            "../../../client",
            `src/images/users/${req.file.filename}`
          )
        );
      res.json({ user_image_name: req.file.filename });
    } catch (error) {
      console.log("error", error);
    }
  }
  next();
};

exports.register = async (req, res, next) => {
  try {
    await Model.registerModel(req);

    //res.status(201).json({ status: "success", message: "User Created" });
  } catch (err) {
    console.log("Error from UserSetpContro line 89", err);

    //res.status(404).json({ status: "error", error: `${err.message}` });
  }
  next();
};

exports.login = async (req, res, next) => {
  try {
    await Model.loginModel(req, res);
    next();
  } catch (err) {
    res.status(404).json({
      status: "error",
      error: `${err.message}`,
    });
  }
  //return next();
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
    const userImage = await pool.query(
      `SELECT person_image FROM person WHERE id_uid = '${payload.userId}'`
    );
    //All Checks Out send new refreshtoken and accesstoken
    sendRefreshToken(res, refreshtoken);
    //const accesstoken = Model.registerModel(req, res);

    return res.status(200).json({
      status: "success",
      userImage: userImage.rows[0].person_image,
      accesstoken,
    });
  } catch (err) {
    return res.status(404).json({ status: "success", message: err });
  }
};
