import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ManageAcct.css';


const ManageAcctTable = () =>{
  const prevClientList=JSON.parse(localStorage.getItem('clientList')) || [];
  const [clientList,setClientList] = useState(prevClientList);
  const navigate=useNavigate();

const handleDelete = (event) => {
  event.preventDefault();
  return navigate ('/DeleteClient');
}

  return (
    <div>
      <div className="MA-body-container">
        <div className="MA-title-container">
        <span className="MA-title"><span>Manage Accounts</span><button onClick={handleDelete}>Delete Account</button></span>
        </div>
        <table className="MA-table-container">
        <tr className="MA-table-headers">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Balance</th>
        </tr>
        {clientList.map((client) => {
          const { firstname, lastname, email, balance } = client;
          return (
            <tr className="MA-table-data">
              <td>{firstname}</td>
              <td>{lastname}</td>
              <td>{email}</td>
              <td>PHP {balance}</td>
            </tr>
          );
        })}
        </table>
      </div>
    </div>
  );
};

export default ManageAcctTable;