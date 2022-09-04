import randomColor from "randomcolor";
import React, { useEffect, useState} from "react";
import ChartSampleIncome from "./ChartSampleIncome";
import './IncomeForm.css';
import {useNavigate} from "react-router-dom";
import { v4 as uuid } from 'uuid';

function IncomeForm ()  {
    const navigate=useNavigate();
    const id=uuid();
    const currentUser=JSON.parse(localStorage.getItem('logInUser'));
    const clientList=JSON.parse(localStorage.getItem('clientList'));

    const [incomeName,setIncomeName]=useState('');
    const [incomeCost,setIncomeCost]=useState('');

    useEffect(() => {
        if(incomeCost < 0 || isNaN(incomeCost)){
        console.log('call useEffect');
        document.getElementById("invalidAmount").classList.remove('hidden');
        }else{
            document.getElementById("invalidAmount").classList.add('hidden');
        }

    });

    useEffect(()=>{
        setIncome(income);
        },[])

    const handleInputChange=(event)=> {
        const {id,value} = event.target;
        if(id==='incomeName'){
        setIncomeName(value);
        }
        if(id==='incomeCost'){
        setIncomeCost(value);
        }
    }

    const [successAddIncome,setSuccessAddIncome]=useState(false);
    const [userBalance,setUserBalance]=useState(currentUser[0].balance);

    const prevIncome=JSON.parse(localStorage.getItem('income')) || [];
    const [income,setIncome]=useState(prevIncome);

    const prevTotalIncome=currentUser[0].totalInc || 0;
    const [totalIncome,setTotalIncome]=useState(prevTotalIncome);

    const prevtransaction=JSON.parse(localStorage.getItem('transactions')) || [];
    const [transactions,setTransactions] = useState(prevtransaction);

    const closeModalS = () => {
        document.getElementById("incomeSuccessModal").classList.add('hidden');
        return navigate("/IncomeTracker");
    }


    const handleSubmitEvent=(event)=> {

        event.preventDefault();
        const incomeData = {
            id: id.slice(0,5),
            email: currentUser[0].email,
            name: incomeName,
            cost: incomeCost,
            fill: randomColor()
        }

    if(incomeCost>=0) {
        // alert('Added Income Item');
        document.getElementById("incomeSuccessModal").classList.remove('hidden');
        income.push(incomeData);
        localStorage.setItem('income',JSON.stringify(income));
        setIncome(income);
        setSuccessAddIncome(true);

        transactions.push(incomeData);
        localStorage.setItem('transactions',JSON.stringify(transactions));
        setTransactions(transactions);

        const newtotalInc = totalIncome + +incomeCost;
        const newBalance = +userBalance + +incomeCost;
        setUserBalance(newBalance);
        setTotalIncome(newtotalInc);
        localStorage.setItem('totalIncome',JSON.stringify(newtotalInc));

        const updatedUserBalance = {...currentUser[0],balance: newBalance, totalInc: newtotalInc}
        currentUser.pop();
        currentUser.push(updatedUserBalance);
        localStorage.setItem('logInUser',JSON.stringify(currentUser));
        
        const email = currentUser[0].email;
        const userindex=clientList.findIndex(event => event.email === email);
        clientList.splice(userindex,1);
        clientList.push(updatedUserBalance);
        localStorage.setItem('clientList',JSON.stringify(clientList));
        
    } else {
        alert('Invalid Income Cost');
    }
    }

const handleDeleteEvent =(event)=> {
    window.location.reload();
    const keyId=event.target.id
    console.log("This button is clicked with id:", {keyId});
    const userindex=income.findIndex(e => e.id === keyId);
  const incomeCost=income[userindex].cost;

  if (incomeCost<=userBalance) {
    const newtotalInc = totalIncome - +incomeCost;
  const newBalance = +userBalance - +incomeCost;
  setUserBalance(newBalance);
  setTotalIncome(newtotalInc);
  localStorage.setItem('totalIncome',JSON.stringify(newtotalInc));

  const updatedUserBalance = {...currentUser[0],balance: newBalance, totalInc: newtotalInc};
  currentUser.pop();
  currentUser.push(updatedUserBalance);
  localStorage.setItem('logInUser',JSON.stringify(currentUser));

  const email = currentUser[0].email;
  const clientindex=clientList.findIndex(event => event.email === email);
  clientList.splice(clientindex,1);
  clientList.push(updatedUserBalance);
  localStorage.setItem('clientList',JSON.stringify(clientList));

  income.splice(userindex,1);
  localStorage.setItem('income', JSON.stringify(income));

  const transactionindex=transactions.findIndex(e => e.name === incomeName);
  transactions.splice(transactionindex,1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  } else {
    alert("Cannot be deleted due to remaining balance");
  }
}

    useEffect(()=> {
        if(successAddIncome){
            setIncomeName('');
            setIncomeCost('');
    }
    setSuccessAddIncome(false)
}, [successAddIncome])


return (
    <div className="incomeForm">
    <div className="incomeLeft">
        <div className="income-header">
            <div className='incomeStatus-container'>
                <span className='incomeStatus'>Income Tracker</span>
                <span className='incomeStatus'>Total Income: <span>PHP {totalIncome}</span></span>
            </div>
            <div className='input-container'>
                <div className='expenseInput-container'>
                    <span className="incomeInput"><label>Item Name: </label><input id='incomeName' value={incomeName} onChange={(event)=>handleInputChange(event)}  type='text' placeholder='Enter Income' maxLength={10} /></span>
                    <span className="incomeInput"><label>Cost: </label><input id='incomeCost' value={incomeCost} onChange={(event)=>handleInputChange(event)}  type='number' placeholder='Enter Cost'/></span>
                    <span className="incomeInput-btn"><input className="addBtn" disabled={!incomeName || !incomeCost || incomeCost<0}  type="submit" value='Add Item' onClick={(event)=>handleSubmitEvent(event)} /></span>
                </div>
            </div>
            <div id="invalidAmount" className="redError hidden"><p>Invalid Amount. Value should be positive.</p></div>
        </div>
        <div className="incomeForm-container">
            <div><ul>
                {income.filter(e => e.email === currentUser[0].email).map((incomes) => { const {name,cost,id} = incomes;
                    return (
                        <li className="incomeList" key={id}>
                            <span>{name}</span><span className="cost-income"> + PHP {cost}</span>
                            <span className="deleteBtn"><a id={id}onClick={(event)=>handleDeleteEvent(event)}> X </a></span>
                        </li>
                    );
                })}
            </ul></div>
        </div>
    </div>

    <div id="incomeSuccessModal" className="modal hidden">
          <div className="modal-content">
          <span className="close" onClick={closeModalS}>&times;</span>
          <p>Income Successfully Added!</p>
          </div>
        </div>
    </div>
);
}

export default IncomeForm;