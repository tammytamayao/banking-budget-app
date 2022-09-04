import React from 'react';
import NavBar from "./NavBar";
import contactUsImg from "../contactUsImg.png";
import './ContactUs.css';

function ContactUs (){
    return (
        <div className='contactUsContainer'>
            <NavBar />
            <div className='contactUs-container'>
                <div className='contactUsLeft'>
                    <div className='contactUsImage'><img src={contactUsImg} id='CUimg' alt='HPIcon'></img></div>
                </div>
                <div className='contactUsRight-container'>
                <div className='contactUsRight'>
                    <span className='header'>CONTACT US</span>
                    <div><label className="contactUslabel">NAME </label><br/><input id='contactUsName' type='text' placeholder='Enter your name' required /></div>
                    <div><label className="contactUslabel">E-MAIL </label><br/><input id='contactUsEmail' type='email' placeholder='Enter your email' required /></div>
                    <div><label className="contactUslabel">MESSAGE </label><br/><textarea id="contactUsMsg" rows='8'></textarea></div>
                    <div className='contactUssubmit-container'><button className='contactUssubmit'>SEND US A MESSAGE</button></div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;