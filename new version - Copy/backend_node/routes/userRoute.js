const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

const { addCode, getAllCodes, getSingleCode, deleteCode } = require("../controllers/saveCodeController");

//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

//POST || SAVE CODE
router.post("/addcode", addCode);

//GET || GET ALL CODES
router.get("/getallcode", getAllCodes);

//GET || GET SINGLE CODE
router.get("/getsinglecode/:id", getSingleCode);

//DELETE || DELETE CODE
router.delete("/deletecode/:id", deleteCode);

module.exports = router;
