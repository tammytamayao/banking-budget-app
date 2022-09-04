import React from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import HomeIcon from "./Home-Icon.png";
import ManageAcctIcon from "./Manage-Account-Icon.jpg";
import TransactionIcon from "./Transaction-Icon.png";
import DocumentsIcon from "./Documents-Icon.png";
import LogOutIcon from "./LogOut-Icon.png";
import './NavBarEmployee.css';

function NavBarEmployee () {
    const navigate=useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('logInUser'));
    const handleSubmit=(event)=> {
        event.preventDefault();
        alert('Successfully Logged Out!');
        currentUser.pop();
        localStorage.removeItem("logInUser");
        navigate("/");
    }

    return (
        <div className='NavBarEmployee-container'>
        <div className='NavBarEmployee'>
            <div></div>
            <div>
            <li><Link to="/DashBoardEmployee"><img className="NBEicon" src={HomeIcon} id='HIimg' alt='Menu Icon'/></Link></li>
            <li><Link to="/ManageAcct"><img className="NBEicon" src={ManageAcctIcon} id='MAIimg' alt='Menu Icon'/></Link></li>
            <li><Link to="/Deposit"><img className="NBEicon" src={TransactionIcon} id='TIimg' alt='Menu Icon'/></Link></li>
            <li><Link to="/AddClient"><img className="NBEicon" src={DocumentsIcon} id='DIimg' alt='Menu Icon'/></Link></li>
            <li><a type="submit" onClick={handleSubmit}><img className="NBEicon" src={LogOutIcon} id='LOIImg' alt='Menu Icon'/></a></li>
            </div>
            <div></div>
        </div>
        </div>
    );
}

export default NavBarEmployee;