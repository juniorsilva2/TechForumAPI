const mongoose = require("mongoose");

export const commentSchema = new mongoose.Schema({
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

module.exports = CommentModel;
