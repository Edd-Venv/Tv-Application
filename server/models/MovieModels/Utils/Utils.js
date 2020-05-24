const pool = require("../../../database-connection/db.js");
const { isAuth } = require("../../../src/isAuth.js");

exports.saveMovieModel = async (req, res, next) => {
  const userId = isAuth(req);
  if (userId !== null) {
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
      (qErr) => {
        if (qErr) return next(qErr);
      }
    );
  }
};

exports.getMyMoviesModel = async (req) => {
  const userId = isAuth(req);
  if (userId !== null) {
    const movies = await pool.query(
      `SELECT * FROM movie WHERE person_id = '${userId}'`
    );

    const sortedMovieTitles = movies.rows
      .map((movie) => {
        return movie.movie_title;
      })
      .sort();

    const sortedMovies = [];

    sortedMovieTitles.forEach((title) => {
      sortedMovies.push(
        ...movies.rows.filter((movie) => {
          if (movie.movie_title.toLowerCase() === title.toLowerCase())
            return movie;
        })
      );
    });

    return sortedMovies;
  }
};
