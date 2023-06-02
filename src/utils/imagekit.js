require("dotenv").config();
const Imagekit = require("imagekit");
const Post = require("../model/post");

const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC,
  privateKey: process.env.IMAGEKIT_PRIVATE,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

const uploadFile = async (file) => {
    if(!file || !file.buffer) return;
    return await imagekit.upload({
      file: file.buffer.toString("base64"), //required
      fileName: file.originalname, //required
      extensions: [
        {
          name: "google-auto-tagging",
          maxTags: 5,
          minConfidence: 95,
        },
      ],
    });
};

const deleteFromImageKit = async (fileId) => {
    return await imagekit.deleteFile(fileId);
};

const uploadToImageKit = async (req, res, next) => {
    try {
        if(req.file){
            const response = await uploadFile(req.file);
            req.body['file'] = {url:response.url,id:response.fileId};
        } 
        else if(req.files){
          const files = req.files;
          await Promise.all(Object.keys(files).map(async (key) => {
              const file = files[key][0];
              const response = await uploadFile(file);
              if(response.url) req.body[key] = {url:response.url,id:response.fileId};
          }));
        }
        next();
    } catch (error) {
        console.log(err);
        res.json(err.message);
    }
  
};




module.exports = {uploadToImageKit,deleteFromImageKit};
