import React, {useState} from 'react';
import './Auth.css';
import KAROK from '../../img/KAROK.png';
import {useNavigate} from "react-router-dom";
import {useDispatch}  from "react-redux";
import {logIn, signUp} from "../../Actions/AuthActions";


const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(initialState);
  const [data, setData] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [limitPassword, setLimitPassword] = useState(false);
  const resetForm = () => {
    setData(initialState);
    setConfirmPassword(confirmPassword)
    setLimitPassword(limitPassword)
  }

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }


  const handleSubmit = (e) => {
    setConfirmPassword(true);
    setLimitPassword(false);
    e.preventDefault();
    if (isSignUp) {
      if (data.password.length < 8) {
        setLimitPassword(true);
      } else if (data.password !== data.confirmPassword) {
        setConfirmPassword(false);
      } else {
        dispatch(signUp(data, navigate))
      }

    } else {
      dispatch(logIn(data, navigate));
    }
  };

  return (
    <div className="Auth">
      <div className='a-left'>
        <img src={KAROK} alt=""/>
        <div className='Webname'>
          <h1>Karokify</h1>
          <h5>Join Karokify and explore Thoughts. </h5>
        </div>
      </div>
      <div className='a-right'>
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div style={{marginBottom: '2px'}}>
              <input type="text"
                     placeholder="First Name"
                     className="infoInput"
                     name='firstname'
                     value={data.firstname}
                     onChange={handleChange}/>
              <input type="text"
                     placeholder="Last Name"
                     className="infoInput"
                     name='lastname'
                     value={data.lastname}
                     onChange={handleChange}/>
            </div>
          )}


          <div style={{marginBottom: '2px'}}>
            <input type="text"
                   placeholder="Username"
                   className="infoInput"
                   name='username'
                   value={data.username}
                   onChange={handleChange}/>
          </div>

          <div style={{marginBottom: '2px'}}>
            <input type="password"
                   placeholder="Password"
                   className="infoInput"
                   name='password'
                   value={data.password}
                   onChange={handleChange}/>

            {isSignUp && (
              <input type="password"
                     placeholder="Confirm Password"
                     className="infoInput"
                     name='confirmPassword'
                     value={data.confirmPassword}
                     onChange={handleChange}/>
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "fixed-end",
              margin: "5px",
              display: confirmPassword ? "none" : "block",
            }}>
            *Confirm Password does not match!
          </span>

          {isSignUp && (<span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "fixed-end",
              margin: "5px",
              display: !limitPassword ? "none" : "block",
            }}>
            *Password must be more than 8 characters!
            </span>)}


          <div>
            <span
              style={{
                fontSize: '12px',
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev)
              }}>
              {
                isSignUp
                  ? "Already have an account Login!"
                  : "Do not have an account Sign Up"
              }
              </span>

            <button className="button infoButton" type="Submit">      {isSignUp ? "SignUp" : "Login"}     </button>

          </div>
        </form>
      </div>
    </div>
  )
}


export default Auth;