import PostModel from "../../Models/postModel.js";

// Like/Dislike
export const likePost = async (req, res) => {
  const id = req.params.id;
  const {userId} = req.body;
  
  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({
        $push: {likes: userId}
      });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({
        $pull: {likes: userId}
      });
      res.status(200).json("Post unliked");
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
}

