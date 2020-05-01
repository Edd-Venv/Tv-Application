require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userSetUpRouter = require("./routes/UserSetUp/UserSetUp.js");
const settingsRouter = require("./routes/Settings/Settings.js");
const tvShowsUtilsRouter = require("./routes/TvShowsRoutes/Utils/Utils.js");
const tvShowsApiRouter = require("./routes/TvShowsRoutes/ApiCalls/ApiCalls.js");
const tvShowsSearchRouter = require("./routes/TvShowsRoutes/Search/Search.js");
const moviesUtilsRouter = require("./routes/MoviesRoutes/Utils/Utils.js");
const moviesApiRouter = require("./routes/MoviesRoutes/ApiCalls/ApiCalls.js");
const moviesSearchRouter = require("./routes/MoviesRoutes/Search/Search.js");

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
server.use(userSetUpRouter);
server.use(settingsRouter);
server.use(tvShowsUtilsRouter);
server.use(tvShowsApiRouter);
server.use(tvShowsSearchRouter);
server.use(moviesUtilsRouter);
server.use(moviesApiRouter);
server.use(moviesSearchRouter);

server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
