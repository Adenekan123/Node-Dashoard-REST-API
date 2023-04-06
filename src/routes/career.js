const express = require("express");
const path = require("path");
const { validateUser } = require("../utils/utils");
const multer = require("multer");
const Imagekit = require('imagekit');


// const imagekit = new Imagekit({
//   publicKey : process.env.IMAGEKIT_PUBLIC,
//   privateKey : process.env.IMAGEKIT_PRIVATE,
//   urlEndpoint : process.env.IMAGEKIT_URL
// })

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "..", "cvs"));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // 5 MB
//   },
// });

const upload = multer({ storage });

const uploadFile = (req,res,next) =>{
  console.log(req.files);
//   imagekit.upload({
//     file : req.body.cv,
//     fileName : "my_file_name.jpg",   //required
//     extensions: [
//         {
//             name: "google-auto-tagging",
//             maxTags: 5,
//             minConfidence: 95
//         }
//     ]
// }).then(response => {
//     console.log(response);
// }).catch(error => {
//     console.log(error);
// });
next();
}

const {
  addCv,
  getCvs,
  getCv,
  deleteCv,
} = require("../controllers/careerController");

const Router = express.Router();

Router.post("/", uploadFile, addCv);
Router.get("/", getCvs);
Router.get("/:id", getCv);
Router.delete("/:id", validateUser, deleteCv);

module.exports = Router;
