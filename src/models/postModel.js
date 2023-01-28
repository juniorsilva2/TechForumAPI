const mongoose = require("mongoose");
const { commentSchema } = require("./commentModel");

const postSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  authorEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comments: [commentSchema],
});

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
