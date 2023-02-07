const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const userController = require("../../controllers/userController");

router.post("/api/register", checkToken, userController.register);
router.post("/api/login", checkToken, userController.login);

module.exports = router;
