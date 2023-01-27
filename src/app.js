const dotenv = require("dotenv");
const connectToDatabase = require("./database/mongodb");
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

dotenv.config();
connectToDatabase();
app.use(express.json());
app.use(express.static(path.join(__dirname, "src/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(process.env.EXPRESS_PORT, () =>
  console.log(
    `Rodando na URL: http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`
  )
);

module.exports = app;
