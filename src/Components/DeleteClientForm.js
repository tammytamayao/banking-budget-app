import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import DateTime from "./DateTime";

function AddClient (){
    const navigate=useNavigate();
    const [email,setEmail]=useState('');

    const closeModal = () => {
        document.getElementById("existErrorModal").classList.add('hidden');
    }

    const closeModalS = () => {
        document.getElementById("deleteClientSuccessModal").classList.add('hidden');
        return navigate("/ManageAcct");
    }

    const handleInputChange=(event)=> {
        const {id, value} = event.target;
          if(id==='email'){
            setEmail(value);
          }
        }

        const prevAccountList = JSON.parse(localStorage.getItem('accountList')) || [];
        const prevClientList = JSON.parse(localStorage.getItem('clientList')) || [];
        const [successDeleteAcct,setSuccessDeleteAcct]=useState(false);
        const [accountList,setAccountList]=useState(prevAccountList);
        const [clientList,setClientList]=useState(prevClientList);


    const handleSubmitEvent=()=> {
          
        const userlogin=clientList.find(id =>
          id.email===email
        );

        if(userlogin===undefined){
          document.getElementById("existErrorModal").classList.remove('hidden');
        } else {
            const clientindex=clientList.findIndex(event => event.email === email);
            const accountindex=accountList.findIndex(event => event.email === email);
            clientList.splice(clientindex,1);
            accountList.splice(accountindex,1);
            setAccountList(accountList);
            setClientList(clientList);

            localStorage.setItem('accountList',JSON.stringify(accountList));
            localStorage.setItem('clientList',JSON.stringify(clientList));
            document.getElementById("deleteClientSuccessModal").classList.remove('hidden');
            setSuccessDeleteAcct(true);
        }
    }

    useEffect(()=>{
        if(successDeleteAcct){
          setEmail('');
        }
        setSuccessDeleteAcct(false);
      },[successDeleteAcct])

    const regForm = (
        <div>
        <div className='DT-container'><div><DateTime/></div></div>
            <div className='AddClientRight-container'>
            <div className='DeleteClientRight'>
            <div><span className='logoBlackS'>DELETE CLIENT<span className='logoGoldS'> FORM </span></span></div>
              <div><label className='NewAcctLabel'>E-MAIL </label><br/><input id='email' value={email} onChange={(event)=>handleInputChange(event)} type='email' placeholder='Enter your email'/></div>
              <div className='NewAcctBtn-container'><input id='NewAcctBtn' disabled={!email} type="submit" value='Delete' onClick={()=>handleSubmitEvent()}/></div>
            </div>
            </div>       
        </div>
    )

    return (
        <div>
          <div>{regForm}</div>
        
        <div id="existErrorModal" class="modal hidden">
          <div class="modal-content">
          <span class="close" onClick={closeModal}>&times;</span>
          <p>Account does not exist!</p>
          </div>
        </div>

        <div id="deleteClientSuccessModal" class="modal hidden">
          <div class="modal-content">
          <span class="close" onClick={closeModalS}>&times;</span>
          <p>Account successfully deleted!</p>
          </div>
        </div>
        </div>  
    );
}
export default AddClient