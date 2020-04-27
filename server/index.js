require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userSetUpRoutes = require("./routes/UserSetUp/UserSetUp.js");
const settingsRoutes = require("./routes/Settings/Settings.js");
const tvShowsRoutesUtils = require("./routes/TvShowsRoutes/Utils/Utils.js");
const tvShowsRoutesApiCalls = require("./routes/TvShowsRoutes/ApiCalls/ApiCalls.js");
const tvShowsRoutesSearch = require("./routes/TvShowsRoutes/Search/Search.js");
const moviesUtils = require("./routes/MoviesRoutes/Utils/Utils.js");
const moviesApiCalls = require("./routes/MoviesRoutes/ApiCalls/ApiCalls.js");
const moviesSearch = require("./routes/MoviesRoutes/Search/Search.js");

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
server.use(userSetUpRoutes);
server.use(settingsRoutes);
server.use(tvShowsRoutesUtils);
server.use(tvShowsRoutesApiCalls);
server.use(tvShowsRoutesSearch);
server.use(moviesUtils);
server.use(moviesApiCalls);
server.use(moviesSearch);

server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
