import  React, { useState , useEffect } from 'react'

export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    });

    return(
           <span> Time : <span className='DateTimevalue'>{date.toLocaleTimeString()}</span> Date : <span className='DateTimevalue'>{date.toLocaleDateString()}</span></span>
    )
}

export default DateTime