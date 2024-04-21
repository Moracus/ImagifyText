import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllposts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error.message || error?.message
      )
    );
  }
};

//create posts
export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl?.secure_url,
    });
    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error.message || error?.message
      )
    );
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const findCurrentPost = await Post.findByIdAndDelete(postId);
    console.log(findCurrentPost);
    if (!findCurrentPost) {
      return res.status(404).json({ message: "post not found" });
    }
    return res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
