const pool = require("../../../database-connection/db.js");
const { isAuth } = require("../../../src/isAuth.js");
const express = require("express");
const router = express.Router();

async function saveShow(req, res, next) {
  const userId = isAuth(req);
  if (userId !== null) {
    try {
      //Check If Show is Already Saved
      const checkDB = await pool.query(
        `SELECT * FROM show WHERE show_key = '${req.body.show_key}'
               AND person_id = '${userId}'`
      );

      const doesShowExist = checkDB.rows[0];

      if (doesShowExist !== undefined)
        throw new Error(`" ${req.body.show_title} " is Already Saved.`);

      const values = [
        userId,
        req.body.show_key,
        req.body.show_title,
        req.body.show_runtime,
        req.body.show_status,
        req.body.show_premiered,
        req.body.show_genre,
        req.body.show_rating,
        req.body.show_image,
        req.body.show_summary,
      ];

      pool.query(
        `INSERT INTO show (person_id, show_key, show_title, show_runtime,
                show_status,
                show_premiered,
                show_genre,
                show_rating,
                show_image, show_summary) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        values,
        (q_err, q_res) => {
          if (q_err) return next(q_err);
          res.json({ message: "Show Saved" });
        }
      );
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}

//Saving a show after the user authentication
router.post("/", async (req, res, next) => {
  saveShow(req, res, next);
});

//Saving a searched Show
router.post("/search/saveShow", async (req, res, next) => {
  saveShow(req, res, next);
});

//Getting saved Shows
router.get("/MyShows", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const shows = await pool.query(
        `SELECT * FROM show WHERE person_id = '${userId}'`
      );
      res.send({
        data: shows.rows,
      });
    }
  } catch (err) {
    res.redirect("http://18.222.115.53:4010/login");
  }
});

//Delete saved Shows
router.post("/MyShows/Delete", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      await pool.query(
        `DELETE FROM show WHERE show_key = '${req.body.show_key}'
             AND person_id = '${userId}'`
      );

      res.json({ message: `${req.body.show_title} Deleted.` });
    }
  } catch (error) {
    res.json({ error: "Show Not Deleted." });
  }
});

module.exports = router;
