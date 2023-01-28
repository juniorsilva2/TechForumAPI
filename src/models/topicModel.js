const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const TopicModel = mongoose.model("topic", topicSchema);

module.exports = TopicModel;
