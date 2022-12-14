import React, {useEffect, useState} from 'react';
import './Posts.css';
import Post from '../Post/Post';
import {useDispatch, useSelector} from "react-redux";
import {deletePost, getAllPosts, getTimelinePosts} from "../../Actions/postAction";
import {getAllUser} from "../../API/UserRequests";

const Posts = (props) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.authReducer.authData);
  const {loading} = useSelector((state) => state.postReducer);
  const {posts} = useSelector((state) => state.postReducer);
  const [allPosts, setAllPosts] = useState(posts)

  useEffect(() => {
    user.isAdmin ?
      dispatch(getAllPosts()) :
      dispatch(getTimelinePosts(user._id));

    if (user.isAdmin)
      setAllPosts(posts);
  }, []);


  if (allPosts !== posts || !allPosts) {
    setAllPosts(posts);
    console.log(allPosts)
  }

  const deletePostHandler = (postId, event) => {
    event.preventDefault();
    dispatch(deletePost(postId, user));

    props.setCurrentPost(props.currentPost.filter(post => post.postId !== postId));
  };
  
  return (
    <div className="Posts">
      {loading ? "Fetching posts..."
               : !user.isAdmin?   props.currentPost.map((post, id) => {
          return <Post
            deletePost={deletePostHandler}
            key={id}
            data={post}
            id={id}
          />
        }) : allPosts.map((post, id) => {
              return <Post
                deletePost={deletePostHandler}
                data={post}
                key={id}
                id={id}
              />
            })}
    </div>
  )
}
export default Posts;