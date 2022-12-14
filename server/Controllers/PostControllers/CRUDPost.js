import PostModel from "../../Models/postModel.js";
import {getALlTimelinePosts} from "./TimelinePost.js";
import UserModel from "../../Models/userModel.js";
import mongoose from "mongoose";
import {compare} from "bcrypt";

// Create
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err)
  }
}
export const getAllPosts = async (req, res) =>{
  try{
    const post = await PostModel.find();
    console.log('getAllPosts : ' + post)
    res.status(200).json(post);
  }catch (e){
    res.status(500).json(e)
  }
}



// Get
export const getPost = async (req, res) => {
  const id = req.params.id;
  
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post)
    
  } catch (err) {
    res.status(500).json(err);
    
  }
}

// Update
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const {userId} = req.body;
  try {
    const post = await PostModel.findOneAndUpdate({postId:postId}, {$set: {desc: req.body.desc}});
    if (post) {
      await getALlTimelinePosts(userId, res);
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// Delete
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const {isAdmin} = req.body

  try {
    const post = await PostModel.findOne({postId: id});
    const userId = post.userId;
    if (post) {
      await post.deleteOne();
      isAdmin ?
        await getAllPosts(req, res) :
        await getALlTimelinePosts(userId, res);
    } else {
      res.status(404).json("Post not founded");
    }
    
  } catch (err) {
    res.status(500).json(err);
    
  }
}
