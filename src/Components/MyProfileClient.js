import React from "react";
import MyProfileIcon from './My-Profile-Icon.png';
import './MyProfileClient.css';
import MastercardIcon from './Mastercard-Icon.png';
import AtmChipIcon from './Atm-Chip-Icon.png';
import { useNavigate } from "react-router-dom";

function MyProfile () {

    const currentUser = JSON.parse(localStorage.getItem('logInUser'));
    const firstName=currentUser[currentUser.length-1].firstname;
    const lastName=currentUser[currentUser.length-1].lastname;
    const email=currentUser[currentUser.length-1].email;
    const navigate=useNavigate();

    const handleSubmitEvent =()=> {
        navigate('/TransactionTracker');
    }

    return (
    <div className='rightDBC-container'>
        <div className="mycard-profile-container">
        <div className="mycard-profile">
            <div className="MCP-label"><span className="MCP-name">{firstName} {Array.from(lastName)[0]}.</span><span className="MCP-email">{email}</span></div>
            <div className="MCP-img"><img className="MPCIcon" src={MyProfileIcon} alt='ProfileIcon'/></div>   
        </div>
        </div>
        <div className="mycard-title">BankOK CARD</div>
        <div className="mycard-container">
        <div className="mycard">
            <div className="chip-container"> <img className="chipIcon" src={AtmChipIcon} alt='ATMIcon'/></div>
            <div className="cardnumber-container"><span className="cardnumber">6574 4242 1446 7657</span></div>
            <div className="cardname-container">
                <div>
                    <div className="validthru-container"><span id="validthrulabel">VALID THRU </span><span id="validthrudate">12/22</span></div>
                    <div className="cardname"><span> {firstName.toUpperCase()} {lastName.toUpperCase()}</span></div>
                </div>
                <span><img className="DBEicon" src={MastercardIcon} alt='MCIcon'/></span>
            </div>
        </div>
        </div>
        <div className="mycardinfo-title">General Information</div>
        <ul>
            <li className="mycardinfo-label"><span>Status: </span><span className="MCI-desc">Active</span></li>
            <li className="mycardinfo-label"><span>Card Type: </span><span className="MCI-desc">MasterCard</span></li>
            <li className="mycardinfo-label"><span>Currency: </span><span className="MCI-desc">PH Peso</span></li>
        </ul>
        <div className="mycardbtn"><button onClick={()=>handleSubmitEvent()}>Go to Transactions</button></div>
    </div>
    );
}

export default MyProfile;