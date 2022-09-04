import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import TransactionEmployee from './TransactionEmployee';
import NavBarEmployee from './NavBarEmployee';
import DepositImg from './Deposit.jpg';
import randomColor from "randomcolor";
import { v4 as uuid } from 'uuid';
import './DWTForms.css';

function Deposit (){
    const navigate=useNavigate();
    const id=uuid();
    const clientList = JSON.parse(localStorage.getItem('clientList'));
    const [firstName, setfirstName]=useState('');
    const [lastName, setlastName]=useState('');
    const [depositAmount, setDepositAmount]=useState('');
    const prevtransaction=JSON.parse(localStorage.getItem('transactions')) || [];
    const [transactions,setTransactions] = useState(prevtransaction);

    const closeModal = () => {
        document.getElementById("existErrorModal").classList.add('hidden');
        document.getElementById("invalidAmountModal").classList.add('hidden');
    }

    const closeModalS = () => {
        document.getElementById("depositSuccessModal").classList.add('hidden');
        return navigate("/ManageAcct");
    }

    useEffect(() => {
        if(depositAmount < 0 || isNaN(depositAmount)){
        console.log('call useEffect');
        document.getElementById("invalidAmount").classList.remove('hidden');
        }else{
            document.getElementById("invalidAmount").classList.add('hidden');
        }

    });

    const handleInputChange=(event)=> {
        const {id, value} = event.target;
        if(id==="firstName"){
            setfirstName(value);
        }
        if(id==="lastName"){
            setlastName(value);
        }
        if(id==='depositAmount'){
            setDepositAmount(value);
        }
    }

    const handleSubmitEvent=()=> {
        const clientData = {
            firstname: firstName,
            lastname: lastName,
            depositAmount: depositAmount,
        };
        console.log(clientData);

        if(depositAmount<0){
            // alert('Invalid Amount');
            document.getElementById("invalidAmountModal").classList.remove('hidden');
        } else {
            const newClientList = clientList.map(object => {
                if (object.firstname.toLowerCase() === firstName.toLowerCase() && object.lastname.toLowerCase() === lastName.toLowerCase()) {
                    const initialBalance = object.balance;
                    const newBalance = +initialBalance + +depositAmount;
                    return {...object, balance: newBalance};
                } 
                return object;
            });
    
            if(JSON.stringify(newClientList) === JSON.stringify(clientList)){
                // alert("This account does not exist. Please Make sure the details are correct.");
                document.getElementById("existErrorModal").classList.remove('hidden');
                return navigate ("/Deposit");
            } else{

            const clientFNindex=clientList.findIndex(event => event.firstname === firstName);
            const clientLNindex=clientList.findIndex(event => event.lastname === lastName);

            if(clientFNindex===clientLNindex) {
                const email=clientList[clientFNindex].email;
                
                const bankData = {
                    id:id,
                    email: email,
                    name: 'Bank Deposit',
                    cost: depositAmount,
                    fill: randomColor()
                }

                transactions.push(bankData);
                localStorage.setItem('transactions',JSON.stringify(transactions));
                setTransactions(transactions);
            }
                

                localStorage.setItem('clientList',JSON.stringify(newClientList));
                // alert("Deposit Successful!")
                document.getElementById("depositSuccessModal").classList.remove('hidden');
                // return navigate("/ManageAcct");
            }

        }
    }

    const depositRegForm = (
        <div className='TransactionEmployee-container'>
        <div className='DW-container-container-container'>
        <div className='DW-container-container'>
        <div className='DW-container'>
            <div className='DepositLeft'>
                <div className='DWTForm-container'>
                    <div><span className='logoBlackM'>DEPOSIT</span></div>
                    <div><label className='NewAcctLabel'>First Name: </label><input id='firstName' value={firstName} onChange={(event)=>handleInputChange(event)} type='text' placeholder='Enter your first name' /></div>
                    <div><label className='NewAcctLabel'>Last Name: </label><input id='lastName' value={lastName} onChange={(event)=>handleInputChange(event)} type='text' placeholder='Enter your last name' /></div>
                    <div><label className='NewAcctLabel'>Amount: </label><input id='depositAmount' value={depositAmount} onChange={(event)=>handleInputChange(event)} type='number' placeholder='Enter your deposit amount'/></div>
                    <div id="invalidAmount" class="redError hidden"><p style={{color: "red"}}>Invalid Amount. Value should be positive.</p></div>
                    <div className='NewAcctBtn-container'><input id='NewAcctBtn' disabled={!firstName || !lastName || !depositAmount || depositAmount<0} type="submit" value='Deposit' onClick={()=>handleSubmitEvent()}/></div>
                </div>
            </div>
        </div>
        </div>
        </div>
        <div><div className='TransactionImg'><img src={DepositImg} id='Dimg' alt='DepositImg'/></div></div>
        
        <div id="invalidAmountModal" class="modal hidden">
          <div class="modal-content">
          <span class="close" onClick={closeModal}>&times;</span>
          <p>Invalid Amount. This Account has insufficient balance to make this withdrawal.</p>
          </div>
        </div>
  
        <div id="existErrorModal" class="modal hidden">
          <div class="modal-content">
          <span class="close" onClick={closeModal}>&times;</span>
          <p>Account does not exist!</p>
          </div>
        </div>

        <div id="depositSuccessModal" class="modal hidden">
          <div class="modal-content">
          <span class="close" onClick={closeModalS}>&times;</span>
          <p>Deposit Successful!</p>
          </div>
        </div>
    </div>
    )

    return (
        <div className="DBE-container">
            <div><NavBarEmployee/></div>
        <div>
            <div><TransactionEmployee/></div>
            <div className="depositRegForm-container">{depositRegForm}</div>
        </div>
        </div>
    );
}
export default Deposit;