import React from "react";
import NavBarEmployee from "./NavBarEmployee";
import MyProfile from "./MyProfile";
import AnalyticsEmployee from "./AnalyticsEmployee";
import './DashBoardEmployee.css';

function DashBoardEmployee () {
    
return (
    <div className="DBE-container">
        <div><NavBarEmployee/></div>
        <div><AnalyticsEmployee/></div>
        <div className="myprofile"><MyProfile/></div>
    </div>
    );
}

export default DashBoardEmployee;