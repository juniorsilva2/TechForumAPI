const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const postController = require("../../controllers/postController");

router.post("/api/:topic/post", checkToken, postController.createPost);
router.get("/api/post/:id", checkToken, postController.getPost);
router.put("/api/post/:id", checkToken, postController.updatePost);
router.delete("/api/post/:id", checkToken, postController.deletePost);

module.exports = router;
