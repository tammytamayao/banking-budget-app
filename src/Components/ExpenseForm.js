import React, { useEffect, useState} from "react";
import randomColor from "randomcolor";
import './ExpenseForm.css';
import {useNavigate} from "react-router-dom";
import { v4 as uuid } from 'uuid';

function ExpenseForm ()  {
    const navigate=useNavigate();
    const id=uuid();
    const currentUser=JSON.parse(localStorage.getItem('logInUser'));
    const clientList=JSON.parse(localStorage.getItem('clientList'));

    const [expenseName,setExpenseName]=useState('');
    const [expenseCost,setExpenseCost]=useState('');


    useEffect(() => {
        if(expenseCost < 0 || isNaN(expenseCost)){
        console.log('call useEffect');
        document.getElementById("invalidAmount").classList.remove('hidden');
        }else{
            document.getElementById("invalidAmount").classList.add('hidden');
        }

    });

    const closeModalS = () => {
        document.getElementById("expenseSuccessModal").classList.add('hidden');
        return navigate("/ExpenseTracker");
    }


    const handleInputChange=(event)=> {
        const {id,value} = event.target;
        if(id==='expenseName'){
        setExpenseName(value);
        }
        if(id==='expenseCost'){
        setExpenseCost(value);
        }
    }

    const [successAddExpense,setSuccessAddExpense]=useState(false);
    const [userBalance,setUserBalance]=useState(currentUser[0].balance);

    const prevExpense=JSON.parse(localStorage.getItem('expense')) || [];
    const [expense,setExpense]=useState(prevExpense);


    const prevTotalExpense=currentUser[0].totalExpense || 0;
    const [totalExpense,setTotalExpense]=useState(prevTotalExpense);

    const prevtransaction=JSON.parse(localStorage.getItem('transactions')) || [];
    const [transactions,setTransactions] = useState(prevtransaction);

    const handleSubmitEvent=(event)=> {

        event.preventDefault();
        const expenseData = {
            id: id.slice(0,5),
            email: currentUser[0].email,
            name: expenseName,
            cost: expenseCost,
            fill: randomColor()
        }

    if(expenseCost>=0 && expenseCost<=userBalance) {
        // alert('Added Expense Item');
        document.getElementById("expenseSuccessModal").classList.remove('hidden');
        expense.push(expenseData);
        localStorage.setItem('expense',JSON.stringify(expense));
        localStorage.setItem('totalExpense',JSON.stringify(totalExpense));
        setExpense(expense);
        setSuccessAddExpense(true);

        transactions.push(expenseData);
        localStorage.setItem('transactions',JSON.stringify(transactions));
        setTransactions(transactions);

        const newtotalExp = totalExpense + +expenseCost;
        const newBalance = +userBalance - +expenseCost;

        setUserBalance(newBalance);
        setTotalExpense(newtotalExp);
        localStorage.setItem('totalExpense',JSON.stringify(newtotalExp));

        const updatedUserBalance = {...currentUser[0],balance: newBalance, totalExpense: newtotalExp};
        currentUser.pop();
        currentUser.push(updatedUserBalance);
        localStorage.setItem('logInUser',JSON.stringify(currentUser));
        
        const email = currentUser[0].email;
        const userindex=clientList.findIndex(event => event.email === email);
        clientList.splice(userindex,1);
        clientList.push(updatedUserBalance);
        localStorage.setItem('clientList',JSON.stringify(clientList));
        
    } else {
        alert('Insufficient Balance');
    }
    }

const handleDeleteEvent =(event)=> {

  window.location.reload();
  const keyId=event.target.id
  console.log("This button is clicked with id:", {keyId});
  const userindex=expense.findIndex(e => e.id === keyId);
  const expenseCost=expense[userindex].cost;

  const newtotalExp = totalExpense - +expenseCost;
  const newBalance = +userBalance + +expenseCost;

  setUserBalance(newBalance);
  setTotalExpense(newtotalExp);
  localStorage.setItem('totalExpense',JSON.stringify(newtotalExp));

  const updatedUserBalance = {...currentUser[0],balance: newBalance, totalExpense: newtotalExp};
  currentUser.pop();
  currentUser.push(updatedUserBalance);
  localStorage.setItem('logInUser',JSON.stringify(currentUser));

  const email = currentUser[0].email;
  const clientindex=clientList.findIndex(event => event.email === email);
  clientList.splice(clientindex,1);
  clientList.push(updatedUserBalance);
  localStorage.setItem('clientList',JSON.stringify(clientList));

  expense.splice(userindex,1);
  localStorage.setItem('expense', JSON.stringify(expense));

  const transactionindex=transactions.findIndex(e => e.id === keyId);
  transactions.splice(transactionindex,1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

    useEffect(()=> {
        if(successAddExpense){
            setExpenseName('');
            setExpenseCost('');
    }
    setSuccessAddExpense(false)
}, [successAddExpense])

useEffect(()=>{
setExpense(expense);
},[])

return (
    <div className="expenseForm">
    <div className="expenseLeft">
    <div className="expense-header">
        <div className='expenseStatus-container'>
            <span className='expenseStatus'>Expense Tracker</span>
            <span className='expenseStatus'>Total Expenses: <span>PHP {totalExpense}</span></span>
        </div>
        <div className='input-container'>
            <div className='expenseInput-container'>
                <span className="expenseInput"><label>Item Name: </label><input id='expenseName' value={expenseName} onChange={(event)=>handleInputChange(event)}  type='text' placeholder='Enter Expense' maxLength={10} /></span>
                <span className="expenseInput"><label>Cost: </label><input id='expenseCost' value={expenseCost} onChange={(event)=>handleInputChange(event)}  type='number' placeholder='Enter Cost'/></span>
                <span className="expenseInput-btn"><input className="addBtn" disabled={!expenseName || !expenseCost || expenseCost<0}  type="submit" value='Add Item' onClick={(event)=>handleSubmitEvent(event)} /></span>
            </div>              
        </div>
        <div id="invalidAmount" className="redError hidden"><p>Invalid Amount. Value should be positive.</p></div>
    </div>
    <div className="expenseForm-container">
             {<ul>
                {expense.filter(e => e.email === currentUser[0].email).map((expenses) => {const {name,cost,id} = expenses;
                    return (
                        <li className="expenseList" key={id}>
                        <span>{name}</span><span className="cost-expense"> - PHP {cost}</span>
                        <span className="deleteBtn"><a id={id} onClick={(event)=>handleDeleteEvent(event)}> X </a></span>
                        </li>
                    );
                })}
            </ul>}
    </div>
    <div id="expenseSuccessModal" className="modal hidden">
          <div className="modal-content">
          <span className="close" onClick={closeModalS}>&times;</span>
          <p>Expense Successfully Added!</p>
          </div>
        </div>
    </div>
</div>
);
}

export default ExpenseForm;