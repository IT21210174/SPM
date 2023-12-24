const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDb = require("./config/connectDb");
// config dot env file
dotenv.config();

//databse call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());





//routes
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/users", require("./routes/userRoute"));
const codeRoutes = require('./routes/codeRoute');
app.use(codeRoutes);
app.use("/uploads",express.static("./uploads"));

// app.use("/api/v1/code", require("./routes/codeRoute"));

//port
const PORT = 6000 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
///

