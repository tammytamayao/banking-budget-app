import React, { useEffect, useState, useRef } from "react";

function ToDoList () {

    const currentUser=JSON.parse(localStorage.getItem('logInUser'));

    const [todoInput,setTodoInput]=useState('');
    
    const handleInputChange=(event)=> {
        /*const {id,value} = event.target;
        if(id==='todoInput'){
        setTodoInput(value);
        }*/
    }

    const [successAddExpense,setSuccessAddExpense]=useState(false);

    const prevTodo=JSON.parse(localStorage.getItem('todoList')) || [];
    const [todo,setTodo]=useState(prevTodo);

    
    const handleSubmitEvent=(event)=> {

        event.preventDefault();
        const todoData = {
            email: currentUser[0].email,
            name: todoInput,
            isChecked: false
        }
    
        todo.push(todoData);
        setTodo(todo);
        localStorage.setItem('todoList',JSON.stringify(todo));
        setTodo(todo);
        setSuccessAddExpense(true);
        
    }
    
    const ref = useRef(null);

    const handleDeleteEvent =(event)=> {
        const className=event.target.className;
        const userindex=todo.findIndex(e => e.name === className);
        
        todo.splice(userindex, 1);
        console.log(todo);
        localStorage.setItem('todoList', JSON.stringify(todo));

       /* {todo.map((task) => {const { name } = task;
        return (
            <li className="todoList" key={name}>
                <span className="taskname" onClick={handleCheck}>{name}</span>
                <span className="deleteBtn"><a ref={ref} className={name} onClick={(event)=>handleDeleteEvent(event)}> X </a></span>
            </li>
        );
    })}*/

        }
        
        useEffect(()=> {
            if(successAddExpense){
                setTodoInput('');
        }
        setSuccessAddExpense(false)
        }, [successAddExpense])
 
        
    const handleCheck = (event) => {
        
            if (event.target.style.textDecoration) {
              event.target.style.removeProperty('text-decoration');
            } else {
              event.target.style.setProperty('text-decoration', 'line-through');
            }
          };
    
    return (
        <div>
        <div className="todoList-container">
        <div className="myprofile-title">Deliverables</div>
            <div className='todo-input-container'>
                    <span className="todoInput-container"><input id='todoInput' value={todoInput} onChange={(event)=>handleInputChange(event)}  type='text' placeholder='Enter Task' /></span>
                    <span className="todobtn-container"><input className="todobtn" disabled={!todoInput}  type="submit" value='+' onClick={(event)=>handleSubmitEvent(event)} /></span>
            </div>   
        <ul>
       {/*{todo.map((task) => {const { name,index} = task;
        return (
            <li className="todoList" key={index}>
                <span className="taskname" onClick={handleCheck}>{name}</span>
                <span className="deleteBtn"><a ref={ref} className={name} onClick={(event)=>handleDeleteEvent(event)}> X </a></span>
            </li>
        );
    })}*/}
        </ul>
        </div>
        </div>
    );
}

export default ToDoList;

