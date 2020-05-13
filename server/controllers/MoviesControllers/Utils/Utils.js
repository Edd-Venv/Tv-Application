const Model = require("../../../models/MovieModels/Utils/Utils.js");

exports.saveMovie = async (req, res, next) => {
  try {
    await Model.saveMovieModel(req, res, next);
    res.status(200).json({ message: "Movie Saved" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getMyMovies = async (req, res) => {
  try {
    const movies = await Model.getMyMoviesModel(req, res);
    res.status(200).json({ status: "success", data: movies });
  } catch (err) {
    const url = `${req.protocol}://${req.get("host")}/login`;
    res.redirect(url);
  }
};

exports.deleteSavedMovie = async (req, res) => {
  try {
    await Model.deleteSavedMovieModel(req);
    res.status(202).json({
      status: "success",
      message: `${req.body.movie_title} Deleted.`,
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: "Movie Not Deleted." });
  }
};
