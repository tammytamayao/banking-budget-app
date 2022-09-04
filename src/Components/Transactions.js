import React from "react";
import './Transactions.css';
import ScrollBars from 'react-scrollbar';



const Transactions = () =>{
  const scrollBarStyle = {
    border: "none",
    width: '99%',
    height: '245px',
  };
  const currentUser=JSON.parse(localStorage.getItem('logInUser'));
  const transactions=JSON.parse(localStorage.getItem('transactions'));

return (
  <div className="transactionList-container">
    <div><span className="subheader">Transaction Summary</span></div>
    <ScrollBars horizontal autoHide={false} style={scrollBarStyle}>
    <div>
      <ul>
        {transactions.filter(e => e.email === currentUser[0].email).map((transaction) => {const { name,cost } = transaction;
          return (<li className="transactionData"><span className="description">{name}</span><span className="description transactionCost"> PHP {cost}</span></li>);
        })}
      </ul>
    </div>
    </ScrollBars>
  </div>
);
};

export default Transactions;