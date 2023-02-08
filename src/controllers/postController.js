const PostModel = require("../models/postModel");
const UserModel = require("../models/userModel");
const TopicModel = require("../models/topicModel");
const CommentModel = require("../models/commentModel");

const createPost = async (req, res) => {
  try {
    const { userID, topicID } = req.params;
    const userIDExist = await UserModel.findById(userID, { password: 0 });
    const topicIDExist = await TopicModel.findById(topicID);
    if (!userIDExist || !topicIDExist) return res.status(404).json({ message: "User or Topic not found." });
    
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: "Fields missing" });

    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    
    function formatDate(date) {
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('/');
    }

    const post = await PostModel.create({
      topic: topicID,
      user: userIDExist._id,
      title,
      content,
      date: formatDate(new Date()),
    });

    const reputationUpdated = Number(userIDExist.reputation) + 10;
    await UserModel.findByIdAndUpdate({ _id: userIDExist._id }, { reputation: reputationUpdated });
    res.status(200).json({ message: "Post successfully created", post });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postID);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    if (posts.length === 0)
      return res.status(404).json({ message: "No post found" });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postID);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: "Fields missing" });
    
    const postUpdated = await PostModel.findByIdAndUpdate(req.params.postID, req.body);
    res.status(200).json({ message: "Post successfully updated", postUpdated });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postID);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const comments = await CommentModel.deleteMany({ post: req.params.postID });
    await PostModel.findByIdAndDelete(req.params.postID);
    res.status(200).json({ message: "Post and comments successfully deleted", post, comments });
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
