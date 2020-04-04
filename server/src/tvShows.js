const { isAuth } = require("./isAuth.js");
const pool = require("../database-connection/db.js");
const express = require("express");
const NodeCache = require("node-cache");
const Cache = new NodeCache();
const server = express();

//Sending Client's UserName
server.get("/userName", async (req, res, next) => {
  const userId = isAuth(req);

  if (userId !== null) {
    try {
      const exists = Cache.has(`${userId}`);
      if (exists) {
        res.json({ data: Cache.get(`${userId}`) });
      } else {
        const user = await pool.query(
          `SELECT person_name FROM person WHERE id_uid = '${userId}'`
        );
        Cache.set(`${userId}`, user.rows[0].person_name, 691200);
        res.send({ name: user.rows[0].person_name });
      }
    } catch (error) {
      res.json({ error: error });
    }
  }
});
