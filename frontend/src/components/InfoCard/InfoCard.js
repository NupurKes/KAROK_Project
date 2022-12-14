import React, {useEffect} from 'react';
import './InfoCard.css';
import {UilPen} from '@iconscout/react-unicons';
import {useState} from 'react';
import ProfileModal from '../ProfileModal/ProfileModal.js';
import {useSelector} from "react-redux";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const {user} = useSelector((state) => state.authReducer.authData);
  return (
    <div className="InfoCard">
      <div className='infoHead'>
        <h4>Your Information</h4>
        <div>
          <UilPen width='2rem' height='1.2rem' onClick={() => setModalOpened(true)}/>
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data={user}
          />
        </div>
      </div>
      <div className='info'>
        <span><b>Status </b></span>
        <span>{user.relationship}</span>
      </div>
      <div className='info'>
        <span><b>Lives in </b></span>
        <span>{user.livesIn}</span>
      </div>
      <div className='info'>
        <span><b>Works at </b></span>
        <span>{user.worksAt}</span>
      </div>
    </div>
  )
}
export default InfoCard;