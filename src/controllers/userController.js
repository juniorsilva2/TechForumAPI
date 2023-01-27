const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/userModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Fields missing" });

    const user = await UserModel.findOne(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(401).json({ message: "Password is incorrect" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const register = async (req, res) => {
  const { realName, userName, email, password, confirmPassword } = req.body;
  if (!realName || !userName || !email || !password || !confirmPassword)
    return res.status(400).json({ message: "Fields missing" });
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  const userExist = await UserModel.findOne({ email });
  if (userExist)
    return res
      .status(422)
      .json({ message: "User already registered, try using another email" });

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SECRET)
  );
  try {
    await UserModel.create({
      realName,
      userName,
      email,
      password: hashedPassword,
      reputation: 0,
      profilePic: `${process.env.DEFAULT_PROFILE_PIC}`,
    });

    res.status(201).json("User successfully registered");
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
