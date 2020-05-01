const pool = require("../../../database-connection/db.js");
const { isAuth } = require("../../../src/isAuth.js");

exports.saveMovie = async (req, res, next) => {
  const userId = isAuth(req);
  if (userId !== null) {
    try {
      //Check If Book is Already Saved
      const checkDB = await pool.query(
        `SELECT * FROM movie WHERE movie_key = '${req.body.movie_key}'
                 AND person_id = '${userId}'`
      );

      const doesMovieExist = checkDB.rows[0];
      if (doesMovieExist !== undefined)
        throw new Error(`" ${req.body.movie_title} " is Already Saved.`);

      const values = [
        userId,
        req.body.movie_image,
        req.body.movie_title,
        req.body.movie_summary,
        req.body.movie_genre,
        req.body.movie_release,
        req.body.movie_runtime,
        req.body.movie_rating,
        req.body.movie_key,
        req.body.movie_trailer,
      ];

      pool.query(
        `INSERT INTO movie (person_id, movie_image, movie_title, movie_summary,
              movie_genre,
              movie_release,
              movie_runtime,
              movie_rating,
              movie_key, movie_trailer) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        values,
        (q_err, q_res) => {
          if (q_err) return next(q_err);
          res.status(200).json({ message: "Movie Saved" });
        }
      );
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};

exports.getMyMovies = async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const movies = await pool.query(
        `SELECT * FROM movie WHERE person_id = '${userId}'`
      );
      res.status(200).json({ status: "success", data: movies.rows });
    }
  } catch (err) {
    res.redirect("http://18.222.115.53:4010/login");
  }
};

exports.deleteSavedMovie = async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      await pool.query(
        `DELETE FROM movie WHERE movie_key = '${req.body.movie_key}'
                 AND person_id = '${userId}'`
      );

      res.status(200).json({
        status: "success",
        message: `${req.body.movie_title} Deleted.`,
      });
    }
  } catch (error) {
    res.status(404).json({ status: "error", error: "Movie Not Deleted." });
  }
};
