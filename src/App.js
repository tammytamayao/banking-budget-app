import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginForm from './Components/LoginForm';
import NewAcct from './Components/NewAcct';
import DashBoardEmployee from './Components/DashBoardEmployee';
import HomePage from './Components/HomePage';
import ContactUs from './Components/ContactUs';
import ManageAcct from './Components/ManageAcct';
import TransactionTracker from './Components/TransactionTracker';
import DashBoardClient from './Components/DashBoardClient';
import AddClient from './Components/AddClient';
import Withdraw from './Components/Withdraw';
import Deposit from './Components/Deposit';
import Transfer from './Components/Transfer';
import ExpenseTracker from './Components/ExpenseTracker';
import IncomeTracker from './Components/IncomeTracker';
import DeleteClient from './Components/DeleteClient';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/ContactUs" element={<ContactUs/>}/>
      <Route path="/LoginForm" element={<LoginForm/>}/>
      <Route path="/NewAcct" element={<NewAcct/>}/>
      <Route path="/DashBoardEmployee" element={<DashBoardEmployee/>}/>
      <Route path="/ManageAcct" element={<ManageAcct/>}/>
      <Route path="/TransactionTracker" element={<TransactionTracker/>}/>
      <Route path="/DashBoardClient" element={<DashBoardClient/>}/>
      <Route path="/AddClient" element={<AddClient/>}/>
      <Route path="/Withdraw" element={<Withdraw/>}/>
      <Route path="/Deposit" element={<Deposit/>}/>
      <Route path="/Transfer" element={<Transfer/>}/>
      <Route path="/ExpenseTracker" element={<ExpenseTracker/>}/>
      <Route path="/IncomeTracker" element={<IncomeTracker/>}/>
      <Route path="/DeleteClient" element={<DeleteClient/>}/>
    </Routes>
    </div>
  );
}

export default App;
