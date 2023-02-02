const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/userModel");
const BlackListModel = require("../models/blackListModel");


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

const logout = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const tokenString = token.toString();
    await BlackListModel.create({token: tokenString});

    res.status(200).json({ message: "Logout successful" });
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
      avatar: "default.png",
    });
    const user = await UserModel.findOne({ email: email }, { password: 0 });
    res.status(201).json({ message: "User successfully registered", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id, { password: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users.length === 0)
      return res.status(404).json({ message: "No user found" });
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { realName, password, confirmPassword } = req.body;
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
    });

    const userUpdated = await UserModel.findById(req.params.id, {
      password: 0,
    });
    res.status(200).json({ message: "User successfully updated", userUpdated });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }
    
    await UserModel.findByIdAndUpdate(req.params.id, {
      avatar: req.file.filename,
    });
    const user = await UserModel.findById(req.params.id, { password: 0 });
    res.status(200).json({ message: "Avatar successfully updated", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await UserModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "User successfully deleted", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server side error ocurred" });
  }
};

module.exports = {
  login,
  logout,
  register,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  deleteUser,
};
