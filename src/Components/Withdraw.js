import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import TransactionEmployee from './TransactionEmployee';
import WithdrawImg from "./Withdraw.jpg";
import NavBarEmployee from './NavBarEmployee';
import './DWTForms.css';
import randomColor from "randomcolor";
import { v4 as uuid } from 'uuid';

function Withdraw (){
    const navigate=useNavigate();
    const id=uuid();
    const clientList = JSON.parse(localStorage.getItem('clientList'));
    const [firstName, setfirstName]=useState('');
    const [lastName, setlastName]=useState('');
    const [withdrawalAmount, setWithdrawalAmount]=useState('');

    const prevtransaction=JSON.parse(localStorage.getItem('transactions')) || [];
    const [transactions,setTransactions] = useState(prevtransaction);

    useEffect(() => {
        if(withdrawalAmount < 0 || isNaN(withdrawalAmount)){
        console.log('call useEffect');
        document.getElementById("invalidAmount").classList.remove('hidden');
        }else{
            document.getElementById("invalidAmount").classList.add('hidden');
        }

    });

    const closeModal = () => {
        document.getElementById("existErrorModal").classList.add('hidden');
        document.getElementById("invalidAmountModal").classList.add('hidden');
    }

    const closeModalS = () => {
        document.getElementById("withdrawSuccessModal").classList.add('hidden');
        return navigate("/ManageAcct");
    }

    const handleInputChange=(event)=> {
        const {id, value} = event.target;
        if(id==="firstName"){
            setfirstName(value);
        }
        if(id==="lastName"){
            setlastName(value);
        }
        if(id==='withdrawalAmount'){
            setWithdrawalAmount(value);
        }
    }

    const handleSubmitEvent=()=> {
        const clientData = {
            firstname: firstName,
            lastname: lastName,
            withdrawalAmount: withdrawalAmount,
        };
        console.log(clientData);
        const userindexFW=clientList.findIndex(event => event.firstname === firstName);
        const currentbalance= parseInt(clientList[userindexFW].balance)
        if(withdrawalAmount<0 && currentbalance<=withdrawalAmount){
            // alert('Invalid Amount');
            document.getElementById("invalidAmountModal").classList.remove('hidden');
        } else {
            const newClientList = clientList.map(object => {
                if (object.firstname.toLowerCase() === firstName.toLowerCase() && object.lastname.toLowerCase() === lastName.toLowerCase()) {
                    const initialBalance = object.balance;
                    const newBalance = +initialBalance - +withdrawalAmount;
                    return {...object, balance: newBalance};
               } 
                return object;
            });

            if(JSON.stringify(newClientList) === JSON.stringify(clientList)){
                // alert("This account does not exist. Please Make sure the details are correct.");
                document.getElementById("existErrorModal").classList.remove('hidden');
                return navigate("/Withdraw");
            } else{

                const clientFNindex=clientList.findIndex(event => event.firstname === firstName);
                const clientLNindex=clientList.findIndex(event => event.lastname === lastName);
    
                if(clientFNindex===clientLNindex) {
                    const email=clientList[clientFNindex].email;
                    
                    const bankData = {
                        id: id,
                        email: email,
                        name: 'Bank Withdrawal',
                        cost: withdrawalAmount,
                        fill: randomColor()
                    }
    
                    transactions.push(bankData);
                    localStorage.setItem('transactions',JSON.stringify(transactions));
                    setTransactions(transactions);
                }
                    

                localStorage.setItem('clientList',JSON.stringify(newClientList));
                // alert("Withdraw Successful!")
                document.getElementById("withdrawSuccessModal").classList.remove('hidden');
                // return navigate("/ManageAcct");
            }

            
        }
    }

    const withdrawRegForm = (
        <div className='TransactionEmployee-container'>
        <div className='DW-container-container-container'>
        <div className='DW-container-container'>
        <div className='DW-container'>
            <div className='WithdrawLeft'>
                <div className='DWTForm-container'>
                    <div><span className='logoBlackM'>WITHDRAW</span></div>
                    <div><label className='NewAcctLabel'>First Name: </label><input id='firstName' value={firstName} onChange={(event)=>handleInputChange(event)} type='text' placeholder='Enter your first name' /></div>
                    <div><label className='NewAcctLabel'>Last Name: </label><input id='lastName' value={lastName} onChange={(event)=>handleInputChange(event)} type='text' placeholder='Enter your last name' /></div>
                    <div><label className='NewAcctLabel'>Amount: </label><input id='withdrawalAmount' value={withdrawalAmount} onChange={(event)=>handleInputChange(event)} type='number' placeholder='Enter your withdrawal amount'/></div>
                    <div id="invalidAmount" class="redError hidden"><p style={{color: "red"}}>Invalid Amount. Value should be positive.</p></div>
                    <div className='NewAcctBtn-container'><input id='NewAcctBtn' disabled={!firstName || !lastName || !withdrawalAmount || withdrawalAmount<0} type="submit" value='Withdraw' onClick={()=>handleSubmitEvent()}/></div>
                </div>
            </div>
        </div>
        </div>
        </div>
            <div><div className='TransactionImg'><img src={WithdrawImg} id='Wimg' alt='withdrawImg'/></div></div>
        </div>
    )

    return (
        <div className="DBE-container">
            <div><NavBarEmployee/></div>
            <div>
                <div><TransactionEmployee/></div>
                <div className="withdrawRegForm-container">{withdrawRegForm} </div>
            </div>

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

            <div id="withdrawSuccessModal" class="modal hidden">
                <div class="modal-content">
                    <span class="close" onClick={closeModalS}>&times;</span>
                    <p>Withdraw Successful!</p>
                </div>
            </div>
        </div>
    );
}
export default Withdraw;