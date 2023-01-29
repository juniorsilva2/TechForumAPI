const PostModel = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const getPost = async (req, res) => {
  try {
    res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const getPosts = async (req, res) => {
  try {
    res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const updatePost = async (req, res) => {
  try {
    res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const deletePost = async (req, res) => {
  try {
    res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

module.exports = {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
};
