const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/userModel");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Fields missing" });

  const user = await UserModel.findOne({ email: email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword)
    return res.status(401).json({ message: "Password is incorrect" });

  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res
      .status(200)
      .json({ message: "Authentication performed successfully", token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
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

    res.status(201).json({ message: "User successfully registered" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { realName, password, confirmPassword, profilePic } = req.body;
    if (!realName || !password || !confirmPassword)
      return res.status(400).json({ message: "Fields missing" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SECRET)
    );

    await UserModel.findByIdAndUpdate(req.params.id, {
      realName,
      password: hashedPassword,
      profilePic,
    });

    const userUpdated = await UserModel.findById(req.params.id, "-password");
    res.status(200).json({ message: "User successfully updated", userUpdated });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

module.exports = {
  login,
  register,
  getUser,
  updateUser,
  deleteUser,
};
