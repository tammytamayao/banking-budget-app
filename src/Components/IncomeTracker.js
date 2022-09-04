import React from "react";
import NavBarClient from "./NavBarClient";
import MyProfileClient from "./MyProfileClient";
import IncomeForm from "./IncomeForm";

function IncomeTracker () {

    return (
        <div className="DBE-container">
            <div><NavBarClient/></div>
            <div className="Income-container"><IncomeForm/></div>
            <div><MyProfileClient/></div>
        </div>
    );
}

export default IncomeTracker;