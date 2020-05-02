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

const app = express();

// Use express middleware for easier cookie handling
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Needed to be able to read body data
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(userSetUpRouter);
app.use(settingsRouter);
app.use(tvShowsUtilsRouter);
app.use(tvShowsApiRouter);
app.use(tvShowsSearchRouter);
app.use(moviesUtilsRouter);
app.use(moviesApiRouter);
app.use(moviesSearchRouter);

module.exports = app;
