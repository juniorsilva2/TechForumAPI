const CommentModel = require("../models/commentModel");

const createComment = async (req, res) => {
  try {
    res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const getComment = async (req, res) => {
  try {
    res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const updateComment = async (req, res) => {
  try {
    res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const deleteComment = async (req, res) => {
  try {
    res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
