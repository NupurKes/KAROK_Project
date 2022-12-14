import React, {useEffect, useState} from 'react'
import './FollowersCard.css'
import KAROK from '../../img/KAROK.png';
import {UilSearch} from '@iconscout/react-unicons'; // icon library
import {useSelector} from "react-redux";
import {getAllUser} from "../../API/UserRequests";
import User from "../User/User";

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const {user} = useSelector((state) => state.authReducer.authData);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  const onChange = (e) => {
    console.log(user)
    setSearch(e.target.value);
    persons.map(user => {
      if (user.username.includes(search)) {
        console.log("find", user.username);
      }
    });
  }
  return (
    <div className="FollowersCard">
      <div className="LogoSearch">
        <img className='logoPic' src={KAROK} alt=""/>
        <div className="Search">
          <input type="text" placeholder='Find your friend' onChange={onChange} value={search}/>
          <div className="s-icon">
            <UilSearch/>
          </div>
        </div>

      </div>

      {persons.map((person, id) => {
        if(person.username.includes(search) && person._id !== user._id && !user.isAdmin )
          return (person.isAdmin? '' : <User person={person} key={id} />)
      })}
    </div>
  )
}

export default FollowersCard;

