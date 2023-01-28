const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Acess Denied" });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Invalid Token" });
  }
};

module.exports = checkToken;
