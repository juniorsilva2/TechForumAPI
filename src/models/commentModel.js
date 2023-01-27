const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
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
