import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import NavBarEmployee from './NavBarEmployee';
import TransactionEmployee from './TransactionEmployee';
import TransferImg from "./Transfer.jpg";
import './DWTForms.css';
import randomColor from "randomcolor";
import { v4 as uuid } from 'uuid';

function Transfer (){
    const navigate=useNavigate();
    const id=uuid();
    const clientList = JSON.parse(localStorage.getItem('clientList'));
    const [firstNameD, setfirstNameD]=useState('');
    const [lastNameD, setlastNameD]=useState('');
    const [firstNameW, setfirstNameW]=useState('');
    const [lastNameW, setlastNameW]=useState('');
    const [transferAmount, setTransferAmount]=useState('');

    const prevtransaction=JSON.parse(localStorage.getItem('transactions')) || [];
    const [transactions,setTransactions] = useState(prevtransaction);

    useEffect(() => {
        if(transferAmount < 0 || isNaN(transferAmount)){
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
        document.getElementById("transferSuccessModal").classList.add('hidden');
        return navigate("/ManageAcct");
    }

    const handleInputChange=(event)=> {
        const {id, value} = event.target;
        if(id==="firstNameW"){
            setfirstNameW(value);
        }
        if(id==="lastNameW"){
            setlastNameW(value);
        }
        if(id==="firstNameD"){
            setfirstNameD(value);
        }
        if(id==="lastNameD"){
            setlastNameD(value);
        }
        if(id==='transferAmount'){
            setTransferAmount(value);
        }
    }

    const handleSubmitEvent=()=> {
        const clientData = {
            firstnameW: firstNameW,
            lastnameW: lastNameW,
            firstnameD: firstNameD,
            lastnameD: lastNameD,
            transferAmount: transferAmount,
        };


        const userindexFW=clientList.findIndex(event => event.firstname.toLowerCase() === firstNameW.toLowerCase());
        const userindexLW=clientList.findIndex(event => event.lastname.toLowerCase() === lastNameW.toLowerCase());
        const userindexFD=clientList.findIndex(event => event.firstname.toLowerCase() === firstNameD.toLowerCase());
        const userindexLD=clientList.findIndex(event => event.lastname.toLowerCase() === lastNameD.toLowerCase());
        
        if (userindexFW===-1 || userindexLW===-1 || userindexFD===-1 || userindexLD===-1 ){
            // alert('Invalid User. Please Make sure the details are correct.');
            document.getElementById("existErrorModal").classList.remove('hidden');
        } else {
            const currentbalance= parseInt(clientList[userindexFW].balance);
            if (transferAmount<0 || transferAmount>currentbalance) {
                // alert('Invalid Amount. The source Account has insufficient funds to make this transfer.');
                document.getElementById("invalidAmountModal").classList.remove('hidden');
            } else {
                const newClientList = clientList.map(object => {
                    if (object.firstname.toLowerCase() === firstNameW.toLowerCase() && object.lastname.toLowerCase() === lastNameW.toLowerCase()) {
                        const initialBalance = object.balance;
                        const newBalance = +initialBalance - +transferAmount;
                        return {...object, balance: newBalance};
                    } 
                    if (object.firstname.toLowerCase() === firstNameD.toLowerCase() && object.lastname.toLowerCase() === lastNameD.toLowerCase()) {
                        const initialBalance = object.balance;
                        const newBalance = +initialBalance + +transferAmount;
    
                        return {...object, balance: newBalance};
                    } 
                    return object;
                });

                const clientFNWindex=clientList.findIndex(event => event.firstname === firstNameW);
                const clientLNWindex=clientList.findIndex(event => event.lastname === lastNameW);
                const clientFNDindex=clientList.findIndex(event => event.firstname === firstNameD);
                const clientLNDindex=clientList.findIndex(event => event.lastname === lastNameD)
    
                if(clientFNWindex===clientLNWindex) {
                    const email=clientList[clientFNWindex].email;
                    
                    const bankData = {
                        id:id,
                        email: email,
                        name: 'Money Transferred',
                        cost: transferAmount,
                        fill: randomColor()
                    }
    
                    transactions.push(bankData);
                    localStorage.setItem('transactions',JSON.stringify(transactions));
                    setTransactions(transactions);
                }
                
                if (clientFNDindex===clientLNDindex){
                        const email=clientList[clientFNDindex].email;
                        
                        const bankData = {
                            email: email,
                            name: 'Money Received',
                            cost: transferAmount,
                            fill: randomColor()
                        }
        
                        transactions.push(bankData);
                        localStorage.setItem('transactions',JSON.stringify(transactions));
                        setTransactions(transactions);
                    }

                if(JSON.stringify(newClientList) === JSON.stringify(clientList)){
                    // alert("One or both of these accounts do not exist. Please Make sure the details are correct.");
                    document.getElementById("existErrorModal").classList.remove('hidden');
                    return navigate ("/Transfer");
                } else{
                    localStorage.setItem('clientList',JSON.stringify(newClientList));
                    // alert("Transfer Successful!")
                    document.getElementById("transferSuccessModal").classList.remove('hidden');
                    // return navigate("/ManageAcct");
                }
            }
         }
            
    }

    const transferRegForm = (
        <div className='TransactionEmployee-container'>
        <div className='T-container-container-container'>
        <div className='T-container-container'>
        <div className='T-container'>
            <div className='TransferLeft'>
                <div className='DWTForm-container'>
                <p><span className='logoBlackM'>TRANSFER</span></p>
                <div>
                    <p>From:</p>
                    <div><label className='NewAcctLabel'>First Name: </label><input id='firstNameW' value={firstNameW} onChange={(event)=>handleInputChange(event)} type='text' placeholder='Enter first name' /></div>
                    <div><label className='NewAcctLabel'>Last Name: </label><input id='lastNameW' value={lastNameW} onChange={(event)=>handleInputChange(event)} type='text' placeholder='Enter last name' /></div>
                </div>
                <div>
                    <p>To:</p>
                    <div><label className='NewAcctLabel'>First Name: </label><input id='firstNameD' value={firstNameD} onChange={(event)=>handleInputChange(event)} type='text' placeholder='Enter first name' /></div>
                    <div><label className='NewAcctLabel'>Last Name: </label><input id='lastNameD' value={lastNameD} onChange={(event)=>handleInputChange(event)} type='text' placeholder='Enter last name' /></div>
                </div>
                <div>
                    <p></p>
                    <div><label className='NewAcctLabel'>Amount: </label><input id='transferAmount' value={transferAmount} onChange={(event)=>handleInputChange(event)} type='number' placeholder='Enter transfer amount'/></div>
                </div>
                <div id="invalidAmount" class="redError hidden"><p style={{color: "red"}}>Invalid Amount. Value should be positive.</p></div>
                <div className='NewAcctBtn-container'><input id='NewAcctBtn' disabled={!firstNameW || !lastNameW || !firstNameD || !lastNameD || !transferAmount || transferAmount<0} type="submit" value='Transfer' onClick={()=>handleSubmitEvent()}/></div>
                </div>
            </div>  
        </div>
    </div>
    </div>
    <div><div className='TransactionImg'><img src={TransferImg} id='Timg'/></div></div>
    </div>
        
    )

    return (
        <div className="DBE-container">
            <div><NavBarEmployee/></div>
            <div>
                <div><TransactionEmployee/></div>
                <div className='TransactionEmployee-container'>
                <div className='transferRegForm-container'>{transferRegForm}</div>
                </div>
            </div>

            <div id="invalidAmountModal" class="modal hidden">
                <div class="modal-content">
                    <span class="close" onClick={closeModal}>&times;</span>
                    <p>Invalid Amount. The source Account has insufficient funds to make this transfer.</p>
                </div>
            </div>
  
            <div id="existErrorModal" class="modal hidden">
                <div class="modal-content">
                    <span class="close" onClick={closeModal}>&times;</span>
                    <p>One or both of these accounts do not exist. Please Make sure the details are correct.</p>
                </div>
            </div>

            <div id="transferSuccessModal" class="modal hidden">
                <div class="modal-content">
                    <span class="close" onClick={closeModalS}>&times;</span>
                    <p>Transfer Successful!</p>
                </div>
            </div>
        </div>
    );
}
export default Transfer;