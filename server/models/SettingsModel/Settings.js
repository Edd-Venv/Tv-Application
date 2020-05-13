/* eslint-disable camelcase */
const crypto = require("crypto");
const { hash, compare } = require("bcryptjs");
const pool = require("../../database-connection/db.js");
const { isAuth } = require("../../src/isAuth.js");

exports.changeUserPasswordModel = async (req) => {
  const userId = isAuth(req);
  if (userId !== null) {
    const { new_password, old_password } = req.body;

    const checkDB = await pool.query(
      `SELECT * from person where id_uid = '${userId}'`
    );
    const user = checkDB.rows[0];

    const valid = await compare(old_password, user.password);
    if (!valid) throw new Error("Password not correct");

    const hashedPassword = await hash(new_password, 10);
    await pool.query(`UPDATE person SET password = '${hashedPassword}' 
              WHERE id_uid = '${userId}'`);
  }
};

exports.changeUserNameModel = async (req) => {
  const userId = isAuth(req);
  if (userId !== null) {
    await pool.query(
      `UPDATE person SET person_name = '${req.body.new_name}' 
                WHERE id_uid = '${userId}' AND person_name = '${req.body.old_name}'`
    );
  }
};
exports.forgotPasswordModel = async (req) => {
  const { userName } = req.body;

  const doesUserExist = await pool.query(
    `SELECT * from person WHERE person_name = '${userName}'`
  );

  if (doesUserExist.rows[0] === undefined)
    throw new Error("Please Check Entered User Name.");

  const resetToken = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await pool.query(
    `UPDATE person SET password_reset_token = '${passwordResetToken}' WHERE person_name = '${userName}'`
  );
  await pool.query(
    `UPDATE person SET password_reset_expires = '${passwordResetExpires}' WHERE person_name = '${userName}'`
  );

  return resetToken;
};

exports.resetPasswordModel = async (req) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await pool.query(
    `SELECT * FROM person WHERE password_reset_token = '${hashedToken}' `
  );

  if (user.rows[0] === undefined) throw new Error("User doesn't exisit.");

  if (!(+user.rows[0].password_reset_expires > Date.now()))
    throw new Error("Reset token has expired!");

  if (+user.rows[0].password_reset_expires > Date.now()) {
    const hashedPassword = await hash(req.body.password, 10);
    await pool.query(`UPDATE person SET password = '${hashedPassword}' 
  WHERE id_uid = '${user.rows[0].id_uid}'`);

    await pool.query(`UPDATE person SET password_reset_token = '' 
  WHERE id_uid = '${user.rows[0].id_uid}'`);
    await pool.query(`UPDATE person SET password_reset_expires = ${0} 
  WHERE id_uid = '${user.rows[0].id_uid}'`);
  }
};

exports.updateUserImageModel = async (req) => {
  const userId = isAuth(req);

  if (userId !== null) {
    await pool.query(
      `UPDATE person SET person_image = '${req.file.filename}' 
                WHERE id_uid = '${userId}'`
    );
  }
};

exports.deleteUserModel = async (req) => {
  const userId = isAuth(req);
  if (userId !== null) {
    await pool.query(`DELETE FROM person WHERE id_uid = '${userId}'`);
    await pool.query(`DELETE FROM show WHERE person_id = '${userId}'`);
    await pool.query(`DELETE FROM movie WHERE person_id = '${userId}'`);
    await pool.query(`DELETE FROM book WHERE person_id = '${userId}'`);
  }
};
