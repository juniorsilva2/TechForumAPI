const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postID: {
    type: String,
    required: true,
  },
  authorEmail: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = {
  commentSchema,
  CommentModel,
};
