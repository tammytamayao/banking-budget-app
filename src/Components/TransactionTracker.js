import React from "react";
import NavBarClient from "./NavBarClient";
import MyProfileClient from "./MyProfileClient";
import Transactions from "./Transactions";
import BarGraphSample from "./BarGraphSample";

function ExpenseTracker () {

    return (
        <div className="DBE-container">
            <div><NavBarClient/></div>
            <div className='Transaction-container'>
                <div className="Bargraph-container"><BarGraphSample/></div>
                <div><Transactions/></div>
            </div>
            <div><MyProfileClient/></div>
        </div>
    );
}

export default ExpenseTracker;