const fs = require("fs");
const fsPromises = fs.promises;
const multer = require("multer");
const path = require ("path");

const testPath = path.join(process.cwd(),'images');
console.log(testPath);

const fetchAllImages = async (req, res) => {
  try {
    const images = await fsPromises.readdir(testPath);
    res.status(200).json([...images]);
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error: error});
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, testPath);
  },
  filename: function (req, file, callback) {
    const fname = `${new Date().getSeconds()}_${file.originalname}`;
    callback(null, fname);
  },
});

const upload = multer({ storage }).single("file");

const uploadImage = async (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: "Error in uploading", error: err });
      }
      return res.status(200).json(req.file.filename);
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error });
  }
};

module.exports = { fetchAllImages, uploadImage };
