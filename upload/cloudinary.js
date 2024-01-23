require('dotenv').config();
const express = require("express");
const Router = express.Router();
const multer = require("multer")

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const opts = {
  overwrite: true,
  invalidate: true,
  // resource_type: auto
}

module.exports = (image) => { //image is base64 
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url){
        console.log(result.secure_url);
        return resolve(result.secure_url)
      }
      console.log(error.message);
      return reject({ message: error.message});
    })
  })
}