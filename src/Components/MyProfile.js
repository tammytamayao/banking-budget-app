import MyProfileIcon from './My-Profile-Icon.png';
import './MyProfile.css';
import {useNavigate} from 'react-router-dom';
import React from "react";
import ToDoList from './ToDoList';

function MyProfile () {

    const currentUser = JSON.parse(localStorage.getItem('logInUser'));
    const firstName=currentUser[0].firstname;
    const lastName=currentUser[0].lastname;
    const email=currentUser[0].email;
    const department='Finance';
    const number='09123456789';

    const navigate = useNavigate();

    const handleNewAcct = (event) => {
        event.preventDefault();
        return navigate ('/AddClient');
    }

    return (
<div className='rightDBE-container'>
    <div className="employee-profile-container">
        <div className="employee-profile">
            <div className="MCP-label"><span className="MCP-name">{firstName} {Array.from(lastName)[0]}.</span><span className="MCP-email">{email}</span></div>
            <div className="MCP-img"><img className="MPCIcon" src={MyProfileIcon} alt='ProfileIcon'/></div>   
        </div>
    </div>
    <div className="myprofile-title">General Information</div>
    <ul>
        <li className="myprofileinfo-label"><span>Name: </span><span className="MCI-desc">{firstName} {lastName}</span></li>
        <li className="myprofileinfo-label"><span>Email: </span><span className="MCI-desc">{email}</span></li>
        <li className="myprofileinfo-label"><span>Team: </span><span className="MCI-desc">{department}</span></li>
        <li className="myprofileinfo-label"><span>Number: </span><span className="MCI-desc">{number}</span></li>
    </ul>
    <div className="AddClientBtn-container"><button className="AddClientBtn" onClick={handleNewAcct}>Add New Client</button></div>
    <div className="td-container"><ToDoList/></div>  
</div>
    );
}

export default MyProfile;