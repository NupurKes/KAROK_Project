import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    userId: {
      type    : String,
      required: true,
    },
    desc  : String,
    likes : [],
    comments : [{
      userId: String,
      username: String,
      comment: String,
      commentId: String
    }],
    image : String,
    postId : String,
  },
  {
    timestamps: true,
  });

const PostModel = mongoose.model('Posts', postSchema);
export default PostModel;

