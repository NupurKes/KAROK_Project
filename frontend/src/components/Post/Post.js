import React, {useEffect, useState} from 'react';
import './Post.css';
import Comment from '../../img/comment.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import Comments from "../Comment/Comments";
import {useDispatch, useSelector} from "react-redux";
import {getAllPosts, likePost} from "../../API/PostRequest";
import {deleteCommentsPost, getCommentsPost} from "../../Actions/CommentAction";
import {UilX} from "@iconscout/react-unicons";
import DropDownButton from "../DropDownButton/DropDownButton";
import Button from "react-bootstrap/Button";
import {updatePost} from "../../Actions/postAction";


const Post = ({deletePost, data}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.authReducer.authData);
  
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  
  const [comments, setComments] = useState(data.comments)
  const [changingPost, setChangingPost] = useState(false);
  const [updatedPost, setUpdatedPost] = useState('')


  useEffect(() => {
    dispatch(getCommentsPost(data.postId))
  }, []);
  
  const likeHandler = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1)
      : setLikes((prev) => prev + 1);
  };
  
  const [enableComment, setEnableComment] = useState(false);
  
  const enableCommentHandler = () => {
    setEnableComment((prev) => !prev);
  }
  
  const addCommentHandler = (newComment) => {
    setComments([...comments, newComment]);
  }
  
  const deleteCommentHandler = (commentId, e) => {
    e.preventDefault();
    
    dispatch(deleteCommentsPost(data.postId, commentId, user._id));
    setComments(comments.filter(comment => comment.commentId !== commentId));
  };
  
  const changingPostHandler = () => {
    setChangingPost((prev) => !prev);
  }
  
  const updatePostHandler = () => {
    const updateData = {
      ...data,
      desc: updatedPost,
    }
    dispatch(updatePost(data.postId, updateData))
  }
  
  return (
    <div className='Post'>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image
          : ''}
        alt=""
      />
      <div className='postReact'>
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{cursor: "pointer"}}
          onClick={likeHandler}
        />
        <img
          src={Comment}
          alt=""
          style={{cursor: "pointer"}}
          onClick={enableCommentHandler}
        />
        {user._id === data.userId || user.isAdmin?
          <DropDownButton
            deletePost={deletePost}
            updatePost={updatePost}
            changingComment={changingPostHandler}
            data={data}
          /> : ''
        }
      </div>
      <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes}likes</span>
      <div className='detail'>
        {changingPost ?
          <form style={{textAlign:'right'}}>
            <textarea style={{width: '100%'}} defaultValue={data.desc} onChange={e => {
              e.preventDefault();
              setUpdatedPost(e.target.value);
            }}/>
            <Button onClick={updatePostHandler} className='btn'>Update</Button>
          </form>
          : <span> {data.desc}</span>
        }
      </div>
      {comments.map((comment, id) => {
        return <div key={id} className='Comment'>
          <div style={{flex: 1, fontStyle: 'italic', fontWeight: 'bold'}}>{comment.username}</div>
          <div style={{flex: 5}}>{comment.comment}</div>
          {user._id === comment.userId ?
            <div
              className='s-icon'
              onClick={(e) => {
                deleteCommentHandler(comment.commentId, e)
              }}>
              <UilX/>
            </div>
            : ''}
        </div>
      })}
      <div>
        {enableComment ?
          <Comments
            enableCommentHadler={enableCommentHandler}
            addCommentHandler={addCommentHandler}
            data={data}
          />
          : ''}
      </div>
    </div>
  );
}

export default Post;