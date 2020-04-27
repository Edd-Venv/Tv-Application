const pool = require("../../database-connection/db.js");
const { isAuth } = require("../../src/isAuth.js");
const { hash, compare } = require("bcryptjs");
const NodeCache = require("node-cache");
const express = require("express");
const router = express.Router();
const Cache = new NodeCache();

router.post("/settings/changePassword", async (req, res) => {
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
    res.json({ message: "Password Changed." });
  } catch (error) {
    res.json({ error: "Password Not Changed." });
  }
});

router.post("/settings/changeName", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      await pool.query(
        `UPDATE person SET person_name = '${req.body.new_name}' 
            WHERE id_uid = '${userId}' AND person_name = '${req.body.old_name}'`
      );
    }
    Cache.set(`${userId}`, req.body.new_name, 691200);
    res.json({ message: "User Name Updated" });
  } catch (error) {
    res.json({ error: "User Name Already Taken." });
  }
});

router.post("/deleteUser", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      await pool.query(`DELETE FROM person WHERE id_uid = '${userId}'`);
      await pool.query(`DELETE FROM show WHERE person_id = '${userId}'`);
      await pool.query(`DELETE FROM movie WHERE person_id = '${userId}'`);
      await pool.query(`DELETE FROM book WHERE person_id = '${userId}'`);

      res.json({ message: "User Deleted." });
    }
  } catch (error) {
    res.send({ error: "User Not Deleted." });
  }
});

module.exports = router;
