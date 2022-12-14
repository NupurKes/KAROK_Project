import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './DropDownButton.css'
import {useSelector} from "react-redux";

const DropDownButton = (props) => {
  
  const {user} = useSelector((state) => state.authReducer.authData);
  
  const deletePostHandler = (event) => {
    event.preventDefault();
    
    if (user._id === props.data.userId || user.isAdmin) {
      props.deletePost(props.data.postId, event);
    }
  }
  
  const updatePostHandler = (event) => {
    event.preventDefault();
    props.changingComment();
  }
  
  return (
    <Dropdown style={{margin: '0 0 0 auto'}}>
      <Dropdown.Toggle className='dropdown-btn' id="dropdown-basic">
        ...
      </Dropdown.Toggle>
    
      <Dropdown.Menu>
        <Dropdown.Item onClick={updatePostHandler}>Update</Dropdown.Item>
        <Dropdown.Item onClick={deletePostHandler}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownButton;