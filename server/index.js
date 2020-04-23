require("dotenv/config");
const express = require("express");
const fetch = require("node-fetch");
const uuid_generate = require("uuid");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const pool = require("./database-connection/db.js");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const { isAuth } = require("./src/isAuth.js");
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("./src/tokens.js");

const NodeCache = require("node-cache");
const Cache = new NodeCache();

const server = express();

// Use express middleware for easier cookie handling
server.use(cookieParser());

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Needed to be able to read body data
server.use(express.json()); // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

////////////////////////////////////////////////////////////////////////////

// 1. Register a user
// 2. Login a user
// 3. Logout a user
// 4. Get a new accesstoken with a refresh token

// 1. Register a user
server.post("/register", async (req, res) => {
  const { person_name, password } = req.body;

  try {
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
    res.send({ message: "User Created" });
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// 2. Login a user
server.post("/login", async (req, res) => {
  const { person_name, password } = req.body;

  try {
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
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// 3. Logout a user
server.post("/logout", async (_req, res) => {
  res.clearCookie("refreshtoken", { path: "/refresh_token" });

  // Logic here for to also remove refreshtoken from dataBase
  const { person_name } = _req.body;
  await pool.query(
    `UPDATE person SET refreshtoken = '' WHERE person_name = '${person_name}'`
  );

  return res.send({
    message: "Logged out",
  });
});

// 4. Get a new access token with a refresh token
server.post("/refresh_token", async (req, res) => {
  const token = req.cookies.refreshtoken;

  // If we don't have a token in our request ask to relogin I think
  if (!token) return res.send({ error: "token doesn't exist" });
  // We have a token, let's verify it!
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ error: err });
  }

  try {
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

    return res.send({ accesstoken });
  } catch (err) {
    return res.send(err);
  }
});

//Sending Client's UserName
server.get("/userName", async (req, res, next) => {
  const userId = isAuth(req);

  if (userId !== null) {
    try {
      const exists = Cache.has(`${userId}`);

      if (exists) {
        res.json({ name: Cache.get(`${userId}`) });
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

//////////////////////////////////////////////SETTINGS///////////////////////////////////////////////////

server.post("/settings/changePassword", async (req, res) => {
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

server.post("/settings/changeName", async (req, res) => {
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

server.post("/deleteUser", async (req, res) => {
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

////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////// TVSHOWS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////UTILS///////////////////////////////////////////////
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
server.post("/", async (req, res, next) => {
  saveShow(req, res, next);
});

//Saving a searched Show
server.post("/search/saveShow", async (req, res, next) => {
  saveShow(req, res, next);
});

//Getting saved Shows
server.get("/MyShows", async (req, res) => {
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
server.post("/MyShows/Delete", async (req, res) => {
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

/////////////////////////////////////////////////// TV SHOWS API CALLS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//SEARCH DATA

server.post("/search", async (req, res) => {
  const tvShowsFirstApi = `https://api.tvmaze.com/search/shows?q=${req.body.search_text}&embed=seasons`;
  const tvShowsSecondApi = `https://tastedive.com/api/similar?q=${req.body.search_text}&type=shows&info=1&verbose=1&k=341314-MusicApp-1I2LKOB1`;

  try {
    const exists = Cache.has(`${req.body.search_text}`);
    if (exists) {
      res.json({ data: Cache.get(`${req.body.search_text}`) });
    } else {
      const firstResult = await (await fetch(tvShowsFirstApi)).json();
      const secondResult = await (await fetch(tvShowsSecondApi)).json();
      const finalResult = [firstResult, secondResult];
      Cache.set(`${req.body.search_text}`, finalResult, 691200);
      res.json({ data: finalResult });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//FETCH DATA
const apiData = "https://api.tvmaze.com/shows";
server.get("/apiData", async (req, res) => {
  try {
    const exists = Cache.has("apiData");

    if (exists) {
      res.json({ data: Cache.get("apiData") });
    } else {
      const result = await (await fetch(apiData)).json();
      Cache.set("apiData", result, 691200);
      res.json({ data: result });
    }
  } catch (error) {
    res.json({ error: error });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////// MOVIES \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////////////////////////////////////////////////////////////////// UTILS ///////////////////////////////////

//SAVING A MOVIE
async function saveMovie(req, res, next) {
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
          res.json({ message: "Movie Saved" });
        }
      );
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}

//Saving a Searched Movie
server.post("/search/saveMovie", async (req, res, next) => {
  saveMovie(req, res, next);
});

/////////////////////////////////////////////////////////////////API CALLS///////////////////////////////////
//FETCH MOVIE DATA
const movieApi1 =
  "https://www.omdbapi.com/?t=Bohemian Rhapsody&apikey=728de06e";
const movieApi2 = "https://www.omdbapi.com/?t=A Star Is Born&apikey=728de06e";
const movieApi3 =
  "https://www.omdbapi.com/?t=Fantastic Beasts: The Crimes Of Grindelwald&apikey=728de06e";
const movieApi4 =
  "https://www.omdbapi.com/?t=Jurassic World: Fallen Kingdom&apikey=728de06e";
server.get("/movieData", async (req, res) => {
  try {
    const exists = Cache.has("movieData");

    if (exists) {
      res.json({ data: Cache.get("movieData") });
    } else {
      const result1 = await (await fetch(movieApi1)).json();
      const result2 = await (await fetch(movieApi2)).json();
      const result3 = await (await fetch(movieApi3)).json();
      const result4 = await (await fetch(movieApi4)).json();
      finalResult = [result1, result2, result3, result4];
      Cache.set("movieData", finalResult, 691200);
      res.json({ data: finalResult });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

///// MOVIE SEARCH
server.post("/movieSearch", async (req, res) => {
  const moviesFirstApiCall = `https://www.omdbapi.com/?t=${req.body.search_text}&apikey=728de06e`;
  const moviesSecondApiCall = `https://tastedive.com/api/similar?q=${req.body.search_text}&type=movies&info=1&limit=1&verbose=1&k=341314-MusicApp-1I2LKOB1`;

  try {
    const exists = Cache.has(`${req.body.search_text}`);
    if (exists) {
      res.json({ data: Cache.get(`${req.body.search_text}`) });
    } else {
      const firstResult = await (await fetch(moviesFirstApiCall)).json();
      const secondResult = await (await fetch(moviesSecondApiCall)).json();
      const finalResult = [firstResult, secondResult];
      Cache.set(`${req.body.search_text}`, finalResult, 691200);
      res.json({ data: finalResult });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

///FETCHING SAVED Movies
server.get("/MyMovies", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      const movies = await pool.query(
        `SELECT * FROM movie WHERE person_id = '${userId}'`
      );
      res.send({
        data: movies.rows,
      });
    }
  } catch (err) {
    res.redirect("http://localhost:4020/login");
  }
});

//DELETING SAVED MOVIES
server.post("/MyMovies/Delete", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      await pool.query(
        `DELETE FROM movie WHERE movie_key = '${req.body.movie_key}'
           AND person_id = '${userId}'`
      );

      res.json({ message: `${req.body.movie_title} Deleted.` });
    }
  } catch (error) {
    res.json({ error: "Movie Not Deleted." });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
