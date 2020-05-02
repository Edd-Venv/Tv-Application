const pool = require("../../../database-connection/db.js");
const { isAuth } = require("../../../src/isAuth.js");

exports.saveShowModel = async (req, res, next) => {
  const userId = isAuth(req);
  if (userId !== null) {
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
      (qErr) => {
        if (qErr) return next(qErr);
      }
    );
  }
};

exports.getMyShowsModel = async (req) => {
  const userId = isAuth(req);
  if (userId !== null) {
    const shows = await pool.query(
      `SELECT * FROM show WHERE person_id = '${userId}'`
    );
    const sortedShowTitles = shows.rows
      .map((show) => {
        return show.show_title;
      })
      .sort();

    const sortedShows = [];

    sortedShowTitles.forEach((title) => {
      sortedShows.push(
        ...shows.rows.filter((show) => {
          if (show.show_title.toLowerCase() === title.toLowerCase())
            return show;
        })
      );
    });

    return sortedShows;
  }
};

exports.deleteSavedShowModel = async (req) => {
  const userId = isAuth(req);
  if (userId !== null) {
    await pool.query(
      `DELETE FROM show WHERE show_key = '${req.body.show_key}'
                   AND person_id = '${userId}'`
    );
  }
};
