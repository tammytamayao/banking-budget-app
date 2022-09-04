import React from "react";
import NavBarClient from "./NavBarClient";
import MyProfileClient from "./MyProfileClient";
import AnalyticsClient from "./AnalyticsClient";


function DashBoardClient () {

    return (
    <div className="DBE-container">
        <div><NavBarClient/></div>
        <div><AnalyticsClient/></div>
        <div><MyProfileClient/></div>
    </div>
    );
}

export default DashBoardClient;