import React from "react";
import NavBarClient from "./NavBarClient";
import MyProfileClient from "./MyProfileClient";
import ExpenseForm from "./ExpenseForm";

function ExpenseTracker () {

    return (
        <div className="DBE-container">
            <div><NavBarClient/></div>
            <div className="Expense-container"><ExpenseForm/></div>
            <div><MyProfileClient/></div>
        </div>
    );
}

export default ExpenseTracker;