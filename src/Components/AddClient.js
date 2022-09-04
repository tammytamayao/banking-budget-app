import React from "react";
import NavBarEmployee from "./NavBarEmployee";
import './ManageAcct.css';
import MyProfile from "./MyProfile";
import AddClientForm from './AddClientForm';


const ManageAcct = () =>{

  return (
    <div className="DBE-container">
      <div><NavBarEmployee/></div>
      <div className="AddClientForm"><AddClientForm/></div>
      <div className="myprofile"><MyProfile/></div>
    </div>
  );
};

export default ManageAcct;