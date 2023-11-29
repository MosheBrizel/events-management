import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: 'dtxw74exv', 
  api_key: '491613322521228',
  api_secret: process.env.api_secret_cloudinary,
});
          

async function uploadImagecloudinary(image) {
    
  if (!image) {
    return "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";
  }
  try {
    console.log(image);
    const responseCloudinary = await cloudinary.uploader.upload(
      "routers/uploads/" + image.filename,
      {
        folder: "samples",
        resource_type: "image",
      }
    );
    fs.unlink(image.path, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        } else {
          console.log('File deleted successfully');
        }
      });
    return responseCloudinary.url;
  } catch (error) {
    return "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";
    console.log(error);
  }
}

export default uploadImagecloudinary;
