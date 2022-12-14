import React, {useState, useRef, Fragment} from "react";
import ProfileImage from "../../img/profileImg.jpeg";
import "./PostShare.css";
import {UilEnter, UilFileUpload, UilScenery} from "@iconscout/react-unicons";
import {UilTimes} from "@iconscout/react-unicons";

// images uploading
import {useDispatch, useSelector} from "react-redux";
import {uploadImage, uploadPost} from "../../Actions/uploadAction";
import {Textarea} from "@mantine/core";

const PostShare = (props) => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // images uploading
  const {user} = useSelector((state) => state.authReducer.authData)
  const desc = useRef();
  const [focus, setFocus] = useState(false);
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.postReducer.uploading)
  
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
    
  };
  
  const submitHandler = (event) => {
    event.preventDefault();
    
    if (!image && !desc.current.value) {
      desc.current.focus();
      return;
    }
    
    const newPost = {
      userId  : user._id,
      desc    : desc.current.value,
      likes   : [],
      comments: [],
      images  : '',
      postId  : Math.random().toString(16).slice(2),
    }
    
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      
      newPost.image = filename;
      console.log(newPost);
      
      try {
        dispatch(uploadImage(data));
      } catch (e) {
        console.log(e)
      }
      
    }
    dispatch(uploadPost(newPost));
    props.setCurrentPost([...props.currentPost, newPost]);
    reset();
  }
  
  const reset = () => {
    setImage(null);
    desc.current.value = '';
  }
  
  return (
    <div className="PostShare">
      <div>
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : ProfileImage
          }
          alt="ProfileImage"
        />
        <input
          type='text'
          placeholder="What's happening"
          style={focus ? {border: '2px solid', borderColor: 'red'} : {}}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          ref={desc}
        />
        <div className="postOptions">
          <div style={{color: "var(--photo)"}}
               onClick={() => imageRef.current.click()}>
            <UilScenery/>
          </div>
          <div
            onClick={submitHandler}
            style={{color: "var(--schedule)"}
            }>
            {uploading ? <UilFileUpload/> : <UilEnter/>}
          </div>
          <div style={{display: "none"}}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
      </div>
      <div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)}/>
            <img src={URL.createObjectURL(image)} alt=""/>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;