const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./db/userModel");
const { request } = require("express");
require("./db/configdb");
const PORT = 4000;
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  const { fullname, email, password, cpassword } = req.body;
  if (!fullname || !email || !password || !cpassword) {
    return res.send("fill the input field properly");
  }

  try {
    /* const userExist = User.findOne({ email: email });
    if (userExist) {
     return res.status(422).json({ message: "email already exists" });
    }*/
    const newUser = new User({
      fullname,
      email,
      password,
      cpassword,
    });

    let result = await newUser.save();
    result = result.toObject();
    delete result.password;
    delete result.cpassword;
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send("fill the input field properly!");
  }
  try {
    let user = await User.findOne(req.body)
      .select("-password")
      .select("-cpassword");
    if (!user) {
      return res.send({ message: "user doesnt exist" });
    } else {
      return res.send(user);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/users/:userArticle", async (req, res) => {
  const user = User.findOne(
    { _id: req.params.userArticle },
    (err, foundArticle) => {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No users matching that name was found.");
      }
    }
  );
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log("server 4000 started");
  } else {
    console.log("connection failed");
  }
});
