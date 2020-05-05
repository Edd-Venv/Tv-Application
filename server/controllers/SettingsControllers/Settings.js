const Model = require("../../models/SettingsModel/Settings.js");

exports.changeUserPassWord = async (req, res) => {
  try {
    await Model.changeUserPasswordModel(req);
    res.status(201).json({ status: "success", message: "Password Changed." });
  } catch (error) {
    res.status(404).json({ status: "error", error: "Password Not Changed." });
  }
};

exports.changeUserName = async (req, res) => {
  try {
    await Model.changeUserNameModel(req);
    res.status(201).json({ status: "success", message: "User Name Updated" });
  } catch (error) {
    res
      .status(404)
      .json({ status: "error", error: "User Name Already Taken." });
  }
};
exports.updateUserImage = async (req, res) => {
  try {
    await Model.updateUserImageModel(req, res);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await Model.deleteUserModel(req);
    res.status(204).json({ status: "success", message: "User Deleted." });
  } catch (error) {
    res.status(404).json({ status: "error", error: "User Not Deleted." });
  }
};
