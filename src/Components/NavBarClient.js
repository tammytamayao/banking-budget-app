import React from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import HomeIcon from "./Home-Icon.png";
import WalletIcon from "./Wallet-Icon.png";
import MoneyStashIcon from "./Money-Stash-Icon.png";
import DocumentsIcon from "./Documents-Icon.png";
import LogOutIcon from "./LogOut-Icon.png";
import './NavBarClient.css';

function NavBarClient () {
    const navigate=useNavigate();
    
    const handleSubmit=(event)=> {
        event.preventDefault();
        alert('Successfully Logged Out!');
        localStorage.removeItem("totalExpense");
        localStorage.removeItem("totalIncome");
        localStorage.removeItem("logInUser");
        navigate("/");
    }

    return (
        <div className='NavBarClient-container'>
        <div className='NavBarClient'>
            <div></div>
            <div>
            <li><Link to="/DashBoardClient"><img className="NBCicon" src={HomeIcon} alt='Menu Icon'/></Link></li>
            <li><Link to="/ExpenseTracker"><img className="NBCicon" src={WalletIcon} alt='Menu Icon'/></Link></li>
            <li><Link to="/IncomeTracker"><img className="NBCicon" src={MoneyStashIcon} alt='Menu Icon'/></Link></li>
            <li><Link to="/TransactionTracker"><img className="NBCicon" src={DocumentsIcon} alt='Menu Icon'/></Link></li>
            <li><a type="submit" onClick={handleSubmit}><img className="NBCicon" src={LogOutIcon} alt='Menu Icon'/></a></li>
            </div>
            <div></div>
        </div>
        </div>
    );
}

export default NavBarClient;