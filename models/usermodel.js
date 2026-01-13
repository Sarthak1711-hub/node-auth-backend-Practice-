const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  secret_password: {
    type: String,
    required: true,
    select: false,
  },
  age: {
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
