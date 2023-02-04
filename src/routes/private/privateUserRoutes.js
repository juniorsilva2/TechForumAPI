const express = require("express");
const router = express.Router();
const checkToken = require("../../middleware/Authorization");
const uploadAvatar = require("../../middleware/uploadImage");
const userController = require("../../controllers/userController");

router.get("/api/user/:userID", checkToken, userController.getUser);
router.get("/api/users", checkToken, userController.getUsers);
router.put("/api/user/:userID", checkToken, userController.updateUser);
router.put("/api/user/avatar/:userID", checkToken, uploadAvatar.single('image'), userController.updateAvatar);
router.delete("/api/user/:userID", checkToken, userController.deleteUser);
router.get("/api/logout", checkToken, userController.logout);

module.exports = router;
