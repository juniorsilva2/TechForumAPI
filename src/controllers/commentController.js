const CommentModel = require("../models/commentModel");
const UserModel = require("../models/userModel");
const PostModel = require("../models/postModel");

const createComment = async (req, res) => {
  try {
    const { userID, postID } = req.params;
    const userIDExist = await UserModel.findById(userID, { password: 0 });
    const postIDExist = await PostModel.findById(postID);
    if (!userIDExist || !postIDExist) return res.status(404).json({ message: "User or Post not found." });
    
    const { content } = req.body;
    if (!content) return res.status(404).json({ message: "Fields missing" });

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

    const comment = await CommentModel.create({
      post: postID,
      user: userID,
      content,
      date: formatDate(new Date()),
    });

    res.status(200).json({ message: "Comment sucessfully created", comment });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentID);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(comment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    if (comments.length === 0)
      return res.status(404).json({ message: "No comment found" });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentID);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Fields missing" });
    
    const commentUpdated = await CommentModel.findByIdAndUpdate(req.params.commentID, req.body);
    res.status(200).json({ message: "Comment successfully updated", commentUpdated });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentID);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    await CommentModel.findByIdAndDelete(req.params.commentID);
    res.status(200).json({ message: "Comment successfully deleted", comment });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

module.exports = {
  createComment,
  getComment,
  getComments,
  updateComment,
  deleteComment,
};
