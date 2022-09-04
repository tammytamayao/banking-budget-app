import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import NavBar from "./NavBar";
import './LoginForm.css';
  
function LoginForm() {
  
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [logInUser,setLogInUser]=useState([]);
const navigate=useNavigate();

const closeModal = () => {
  document.getElementById("existErrorModal").classList.add('hidden');
}

const closeModalS = () => {
  document.getElementById("loginSuccessModal").classList.add('hidden');
  // return navigate("/ManageAcct");
}
  
const handleInputChange=(event)=> {
  const {id,value} = event.target;
    if(id==='email'){
      setEmail(value);
    }
    if(id==='password'){
      setPassword(value);
    }
  }
  
  const prevClientList=JSON.parse(localStorage.getItem('clientList')) || [];
  const [clientList,setClientList]=useState(prevClientList);

  const handleSubmit=(event)=> {
  const database=JSON.parse(localStorage.getItem('accountList'));
  event.preventDefault();
  
  const userlogin=database.find(id =>
    id.email===email && id.password===password
  );

  if(userlogin===undefined){
    // alert("Account Does Not Exist!");
    document.getElementById("existErrorModal").classList.remove('hidden');
  }else {
    alert('Successfully Logged-In');
    //document.getElementById("loginSuccessModal").classList.remove('hidden');
    const userindex=database.findIndex(event => event.email === email);
    const clientindex=clientList.findIndex(event => event.email === email);
    if(database[userindex].usertype==='employee'){
      logInUser.push(database[userindex]);
      setLogInUser(logInUser);
      localStorage.setItem('logInUser',JSON.stringify(logInUser));
      return navigate("/DashBoardEmployee");
    } else {
      logInUser.push(clientList[clientindex]);
      setLogInUser(logInUser);
      localStorage.setItem('logInUser',JSON.stringify(logInUser));
      return navigate("/DashBoardClient");
    }
  }
  }
  
  const renderForm = (
  <div className="renderForm-container">
    <div className='LogInLeft'>
    <div className='LogInLeft-container'> 
      <div><span className='header'>SIGN IN</span></div>
      <div><label className='LogInLabel'>Email </label><input type="email" id="email" placeholder= "Enter your e-mail" value={email} onChange={(event)=>handleInputChange(event)} required /></div>
      <div><label className='LogInLabel'>Password </label><input type="password" id="password" placeholder= "Enter your password" value={password} onChange={(event)=>handleInputChange(event)} required /></div>
      <div className='LogInBtn-container'><input id='LogInBtn' type="submit" disabled={!email || !password} onClick={handleSubmit} value='Log In' /></div>
    </div>
    </div>
    <div className='LogInRight'>
    </div>
  </div>
  );
  
  return (
  <div className="LoginForm">
    <NavBar />
        {renderForm}

    <div id="loginSuccessModal" class="modal hidden">
          <div class="modal-content">
          <span class="close" onClick={closeModalS}>&times;</span>
          <p>You have successfully logged in!</p>
          </div>
    </div>
  
    <div id="existErrorModal" className="modal hidden">
          <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <p>Your email or password is incorrect!</p>
          </div>
    </div>
  </div>
  );
  }

export default LoginForm;
  
