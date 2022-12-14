import React, {useState} from "react";
import Cover from "../../img/cover2.jpg";
import Profile from "../../img/profileImg.jpeg";
import "./ProfileCard.css";
import InfoCard from "../InfoCard/InfoCard";
import {useSelector} from "react-redux";

const ProfileCard = () => {
  const {user} = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) =>state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const ProfilePage = true;
  const [isProfileClick, setIsProfileClick] = useState(true);
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={
          user.coverPicture
            ? serverPublic + user.coverPicture
            : serverPublic + "../../img/cover2.jpg"
        } alt="CoverImage" />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post)=>post.userId === user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
         )} 
        </div>
        <hr />
      </div>
      <span onClick={()=>setIsProfileClick((prev)=>!prev)}>My Profile</span>
      {
        isProfileClick
        ?<InfoCard/>
          :''
      }

    </div>
  );
};

export default ProfileCard;