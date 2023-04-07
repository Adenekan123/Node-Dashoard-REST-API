const express = require("express");
const { validateUser } = require("../utils/utils");
const multer = require("multer");
const Imagekit = require('imagekit');



const storage = multer.memoryStorage();

const imagekit = new Imagekit({
  publicKey : process.env.IMAGEKIT_PUBLIC,
  privateKey : process.env.IMAGEKIT_PRIVATE,
  urlEndpoint : process.env.IMAGEKIT_URL
});

const uploadToImageKit = async (req,res,next) =>{
  const file = req.file
  
  try{
    const response = await imagekit.upload({
      file : file.buffer.toString('base64'), //required
      fileName : file.originalname,   //required
      extensions: [
          {
              name: "google-auto-tagging",
              maxTags: 5,
              minConfidence: 95
          }
      ]
  });
  req.cvUrl = response.url;
  next();
  }catch(err){
    console.log(err)
    res.json(err.message);
  }
}

const upload = multer({ storage });

const {
  addCv,
  getCvs,
  getCv,
  deleteCv,
} = require("../controllers/careerController");

const Router = express.Router();

Router.post("/", upload.single("cv"),uploadToImageKit,addCv);
Router.get("/", getCvs);
Router.get("/:id", getCv);
Router.delete("/:id", validateUser, deleteCv);

module.exports = Router;
