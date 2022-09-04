import React from "react";
import DateTime from "./DateTime";
import './AnalyticsClient.css';
import ChartSampleExpense from "./ChartSampleExpense";
import ChartSampleIncome from "./ChartSampleIncome";

function AnalyticsClient () {
    const currentUser = JSON.parse(localStorage.getItem('logInUser'));
    const firstName=currentUser[currentUser.length-1].firstname;
    const totalExpense=JSON.parse(localStorage.getItem('totalExpense'));
    const totalIncome=JSON.parse(localStorage.getItem('totalIncome'));
    const balance=currentUser[0].balance;

return (
<div className="AnalyticsClient-container-container">
    <div className="AnalyticsClient-container">
    <div className="greeting-container">
        <div>
            <div className="DateTime-container"><DateTime/></div>
            <span className="subheader"> Welcome to BankOK<span>, {firstName}!</span></span>
        </div>
    </div>
        <div className="graph-container">
            <div className="expense-container">
                <span className="graph-title">Expenses Summary</span>
                <div className="graph-subtitle">Total Expenses: {totalExpense} </div>
                <span><ChartSampleExpense/></span>
            </div>
            <div className="income-container">
                <span className="graph-title">Income Summary</span>
                <div className="graph-subtitle">Total Income: {totalIncome} </div>
                <span><ChartSampleIncome/></span>
            </div>
        </div>
        <div className="balance-container">
                <span className="balance-label">Remaining Balance: </span><br></br>
                <span className="balance-title">PHP {balance} </span>
        </div>
    </div>
</div>
    );

}

export default AnalyticsClient;