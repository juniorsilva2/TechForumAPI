const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const commentController = require("../../controllers/commentController");

router.post("/api/comment/:id", checkToken, commentController.createComment);
router.get("/api/comment/:id", checkToken, commentController.getComment);
router.put("/api/comment/:id", checkToken, commentController.updateComment);
router.delete("/api/comment/:id", checkToken, commentController.deleteComment);

module.exports = router;
