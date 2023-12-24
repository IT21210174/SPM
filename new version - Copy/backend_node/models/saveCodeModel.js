const mongoose = require("mongoose");

//schema design
const codeSchema = new mongoose.Schema(
  {
    codeName: {
      type: String,
      required: [true],
    },
    CodeData: {
      type: String,
      required: [true]
    }
  },
  { timestamps: true }
);

//export
const codeModel = mongoose.model("codes", codeSchema);
module.exports = codeModel;
