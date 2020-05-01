const pool = require("../../database-connection/db.js");
const { isAuth } = require("../../src/isAuth.js");
const { hash, compare } = require("bcryptjs");
const NodeCache = require("node-cache");
const Cache = new NodeCache();

exports.changeUserPassWord = async (req, res) => {
  try {
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
    res.status(201).json({ status: "success", message: "Password Changed." });
  } catch (error) {
    res.status(404).json({ status: "error", error: "Password Not Changed." });
  }
};

exports.changeUserName = async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      await pool.query(
        `UPDATE person SET person_name = '${req.body.new_name}' 
                WHERE id_uid = '${userId}' AND person_name = '${req.body.old_name}'`
      );
    }
    Cache.set(`${userId}`, req.body.new_name, 691200);
    res.status(201).json({ status: "success", message: "User Name Updated" });
  } catch (error) {
    res
      .status(404)
      .json({ status: "error", error: "User Name Already Taken." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      await pool.query(`DELETE FROM person WHERE id_uid = '${userId}'`);
      await pool.query(`DELETE FROM show WHERE person_id = '${userId}'`);
      await pool.query(`DELETE FROM movie WHERE person_id = '${userId}'`);
      await pool.query(`DELETE FROM book WHERE person_id = '${userId}'`);

      res.status(200).json({ status: "success", message: "User Deleted." });
    }
  } catch (error) {
    res.status(404).send({ status: "error", error: "User Not Deleted." });
  }
};
