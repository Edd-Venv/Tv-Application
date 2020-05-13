const Model = require("../../../models/TvShowsModels/Utils/Utils.js");

exports.saveShow = async (req, res, next) => {
  try {
    await Model.saveShowModel(req, res, next);
    res.status(200).json({ status: "success", message: "Show Saved" });
  } catch (err) {
    res.status(404).json({ status: "error", message: err.message });
  }
};

exports.getMyShows = async (req, res) => {
  try {
    const shows = await Model.getMyShowsModel(req);
    res.status(200).json({
      status: "success",
      data: shows,
    });
  } catch (err) {
    const url = `${req.protocol}://${req.get("host")}/login`;
    res.redirect(url);
  }
};

exports.deleteSavedShow = async (req, res) => {
  try {
    await Model.deleteSavedShowModel(req);

    res.status(200).json({
      status: "success",
      message: `${req.body.show_title} Deleted.`,
    });
  } catch (error) {
    res.status(404).json({ status: "error", error: "Show Not Deleted." });
  }
};
