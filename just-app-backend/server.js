const connectDB = require("./config/db.js");
const express = require("express");
//const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const userRoute = require("./routes/user.routes.js");
app.use("/user", userRoute);

connectDB(); // connect to mongodb

app.listen(port, (req, res) => {
  console.log("RUNNING");
});
