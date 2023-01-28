const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const checkToken = require("../middleware/Authorization");

//Public Route
router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/api/auth/register", userController.register);
router.post("/api/auth/login", userController.login);

//Private Route
router.get("/api/user/:id", checkToken, userController.getUser);

module.exports = router;
