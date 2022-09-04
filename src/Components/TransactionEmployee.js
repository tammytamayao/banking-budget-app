import React from 'react';
import {Link} from "react-router-dom";
import './NavBar.css';

const NavBar = () =>{
  return (
  <div className="container">
  <div className='TransactionEmployee'>
      <li className='TnavComp'><Link to="/Deposit" className='navCompLink'>Deposit</Link></li>
      <li className='TnavComp'><Link to="/Withdraw" className='navCompLink'>Withdraw</Link></li>
      <li className='TnavComp'><Link to="/Transfer" className='navCompLink'>Transfer</Link></li>
  </div>
  </div>
  );
}
export default NavBar;