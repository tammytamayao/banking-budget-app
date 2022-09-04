import React from "react";
import NavBarEmployee from "./NavBarEmployee";
import './ManageAcct.css';
import MyProfile from "./MyProfile";
import ManageAcctTable from "./ManageAcctTable";


const ManageAcct = () =>{

  return (
    <div className="DBE-container">
      <div><NavBarEmployee/></div>
      <div className="ManageAcct-container"><ManageAcctTable/></div>
      <div className="myprofile"><MyProfile/></div>
    </div>
  );
};

export default ManageAcct;