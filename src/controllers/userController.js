const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/userModel");

const login = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const register = async (req, res) => {
  try {
    const { realName, userName, email, password, confirmPassword } = req.body;
    const userExist = await UserModel.findOne({ email });
    if (!realName || !userName || !email || !password || !confirmPassword)
      res.status(400).json({ message: "Fields missing" });
    else if (password !== confirmPassword)
      res.status(400).json({ message: "Passwords do not match" });
    else if (userExist)
      res
        .status(422)
        .json({ message: "User already registered, try using another email" });
    else {
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_SALT)
      );

      await UserModel.create({
        realName,
        userName,
        email,
        password: hashedPassword,
        reputation: 0,
        profilePic: `${process.env.DEFAULT_PROFILE_PIC}`,
      });

      res.status(201).json("User successfully registered");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server side error ocurred" });
  }
};

const getUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  login,
  register,
  getUser,
  updateUser,
  deleteUser,
};
