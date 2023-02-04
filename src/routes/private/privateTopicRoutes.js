const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const topicController = require("../../controllers/topicController");

router.post("/api/topic", checkToken, topicController.createTopic);
router.get("/api/topic/:topicID", checkToken, topicController.getTopic);
router.get("/api/topics", checkToken, topicController.getTopics);
router.put("/api/topic/:topicID", checkToken, topicController.updateTopic);
router.delete("/api/topic/:topicID", checkToken, topicController.deleteTopic);

module.exports = router;
