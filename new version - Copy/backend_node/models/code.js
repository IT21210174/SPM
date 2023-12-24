const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("File", fileSchema);
