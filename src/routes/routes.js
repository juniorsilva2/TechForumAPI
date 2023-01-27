const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

// router.get("/", async (req, res) => {
//   res.render("home");
// });

router.post("/api/auth/register", userController.register);
router.post("/api/auth/login", userController.login);

module.exports = router;
