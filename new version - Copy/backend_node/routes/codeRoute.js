const express = require('express');
const Code = require('../models/code');
const multer = require('multer');
const router = express.Router();
const path = require('path'); // Import the 'path' module
const fs = require('fs');   // Import the 'fs' module

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../SPM/public/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `file-${Date.now()}.${file.originalname}`);
  },
});

const isJavaFile = (req, file, callback) => {
  if (file.originalname.endsWith('.java')) {
    callback(null, true);
  } else {
    callback(new Error('Only Java files (.java) are allowed.'));
  }
};

const upload = multer({
  storage: fileStorage,
  fileFilter: isJavaFile,
});

router.post('/oitem/save', upload.single('file'), (req, res) => {
  const date = req?.body?.date;
  const file = req.file?.filename;

  const newCode = new Code({
    date,
    file,
  });

  newCode.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
    return res.status(200).json({
      success: 'File Saved!!',
    });
  });
});

router.route("/").get((req,res) => {
  Code.find().then((codes) => {
      res.json(codes)
  }).catch((err) => {
      console.log(err);
  })
})

router.delete("/oitem/delete/:id", async (req, res) => {
  let result = await Code.deleteOne({ _id: req.params.id })
  res.send(result)
});

router.get("/oitem/download/:fileName", (req, res) => {
  const filePath = path.join(__dirname, "../../SPM/public/uploads", req.params.fileName);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

module.exports = router;
