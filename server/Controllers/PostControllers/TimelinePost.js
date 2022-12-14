import PostModel from "../../Models/postModel.js";
import UserModel from "../../Models/userModel.js";
import mongoose from "mongoose";

// Get Timeline Post
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  await getALlTimelinePosts(userId, res);
}

export const getALlTimelinePosts = async (userId, res) => {
  
  try {
    const currentUserPosts = await PostModel.find({userId: userId});
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        }
      },
      {
        $lookup: {
          from        : "posts",
          localField  : "following",
          foreignField: "userId",
          as          : "followingPosts",
        }
      },
      {
        $project: {
          followingPosts: 1,
          _id           : 0,
        }
      },
    ]);
    
    res.status(200)
    .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
    );
  } catch (err) {
    res.status(500).json(err);
  }
};