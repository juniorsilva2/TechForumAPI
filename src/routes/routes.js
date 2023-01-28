const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const topicController = require("../controllers/topicController");
const checkToken = require("../middleware/Authorization");

//Public Routes
router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/api/auth/register", userController.register);
router.post("/api/auth/login", userController.login);

//Private Routes

//User
router.get("/api/user/:id", checkToken, userController.getUser);
router.put("/api/user/:id", checkToken, userController.updateUser);
router.delete("/api/user/:id", checkToken, userController.deleteUser);

//Post
router.post("/api/:topic/post", checkToken, postController.createPost);
router.get("/api/post/:id", checkToken, postController.getPost);
router.put("/api/post/:id", checkToken, postController.updatePost);
router.delete("/api/post/:id", checkToken, postController.deletePost);

//Comment
router.post("/api/comment/:id", checkToken, commentController.createComment);
router.get("/api/comment/:id", checkToken, commentController.getComment);
router.put("/api/comment/:id", checkToken, commentController.updateComment);
router.delete("/api/comment/:id", checkToken, commentController.deleteComment);

//Topic
router.post("/api/topic/:id", checkToken, topicController.createTopic);
router.get("/api/topic/:id", checkToken, topicController.getTopic);
router.put("/api/topic/:id", checkToken, topicController.updateTopic);
router.delete("/api/topic/:id", checkToken, topicController.deleteTopic);

module.exports = router;
