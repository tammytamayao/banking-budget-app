import React from "react";
import NavBarEmployee from "./NavBarEmployee";
import './ManageAcct.css';
import MyProfile from "./MyProfile";
import DeleteClientForm from './DeleteClientForm';


const DeleteClient = () =>{

  return (
    <div className="DBE-container">
      <div><NavBarEmployee/></div>
      <div className="DeleteClientForm"><DeleteClientForm/></div>
      <div className="myprofile"><MyProfile/></div>
    </div>
  );
};

export default DeleteClient;