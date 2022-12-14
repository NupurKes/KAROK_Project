import React from 'react';
import './Profile.css';
import ProfileCard from '../../components/profileCard/ProfileCard' ;


const Profile = () => {
  return (
   <div className="Profile">
       <div className="Profile-center">
            <ProfileCard/>
       </div>
   </div>
  )
}

export default Profile;