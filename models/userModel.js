const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },

    email: {
      type: String,
      unique: [true, "Email must be unique"],
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: {
      type: String,
      required: true,
    },

    watchlist: [
      {
        type: String,
        uppercase: true,
        match: /^[A-Z]{1,5}$/,
        required: true,
      },
    ],
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);