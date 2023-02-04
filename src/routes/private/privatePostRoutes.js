const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const postController = require("../../controllers/postController");

router.post("/api/post/:userID/:topicID", checkToken, postController.createPost);
router.get("/api/post/:postID", checkToken, postController.getPost);
router.get("/api/posts", checkToken, postController.getPosts);
router.put("/api/post/:postID", checkToken, postController.updatePost);
router.delete("/api/post/:postID", checkToken, postController.deletePost);

module.exports = router;
