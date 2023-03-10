const dotenv = require("dotenv");
const connectToDatabase = require("./database/mongodb");
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const publicUserRoutes = require("./routes/public/publicUserRoutes");
const privateUserRoutes = require("./routes/private/privateUserRoutes");
const privateTopicRoutes = require("./routes/private/privateTopicRoutes");
const privatePostRoutes = require("./routes/private/privatePostRoutes");
const privateCommentRoutes = require("./routes/private/privateCommentRoutes");

dotenv.config();
connectToDatabase();
app.use(express.json());
app.use(express.static(path.join(__dirname, "src/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(publicUserRoutes);
app.use(privateUserRoutes);
app.use(privateTopicRoutes);
app.use(privatePostRoutes);
app.use(privateCommentRoutes);

// Express Deployment 
app.listen(process.env.EXPRESS_PORT, () => console.log(`Running at: ${process.env.EXPRESS_HOST}`));


// Express Local
// app.listen(process.env.EXPRESS_PORT, () => console.log(`Running at: http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`));

module.exports = app;
