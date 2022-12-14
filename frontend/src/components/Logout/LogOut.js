import React from 'react';
import Button from "react-bootstrap/Button";
import {logout} from "../../Actions/AuthActions";
import {useDispatch} from "react-redux";



const LogOut = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    console.log("Log out handler")
    dispatch(logout())
  }

  return (
    <div>
      <Button className="logout" style={{cursor: "pointer"}} onClick={handleLogOut}>Log Out</Button>
    </div>
  );
};

export default LogOut;