const mongoose = require("mongoose");

//schema design
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    firstName: {
      type: String,
      required: [false, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [false, "lastName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required and should be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    city: {
      type: String,
      required: [false, "city is required"],
    },
    country: {
      type: String,
      required: [false, "country is required"],
    },
    postalCode: {
      type: Number,
      required: [false, "postalCode is required"],
    },
    about: {
      type: String,
      required: [false, "about is required"],
    },
  },
  { timestamps: true }
);

//export
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
