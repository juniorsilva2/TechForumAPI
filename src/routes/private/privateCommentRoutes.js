const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const commentController = require("../../controllers/commentController");

router.post("/api/comment/:userID/:postID", checkToken, commentController.createComment);
router.get("/api/comment/:commentID", checkToken, commentController.getComment);
router.get("/api/comments", checkToken, commentController.getComments);
router.put("/api/comment/:commentID", checkToken, commentController.updateComment);
router.delete("/api/comment/:commentID", checkToken, commentController.deleteComment);

module.exports = router;
