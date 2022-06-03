const mongoose = require("mongoose");

const userSchema = {
  fullname: String,
  email: String,
  password: String,
  cpassword: String,
};

module.exports = mongoose.model("User", userSchema);
