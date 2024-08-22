import { createContext, useState } from "react";

export const data = createContext(null) ; 
export default function Context({children}) {

    const [displayOperations , setDisplayOperations] = useState([<div value = "index" className='index'></div>]) ; 
    const [operation_content , setOperation_content] = useState('') ; 
    const [result , setResult] = useState('0') ;

    return( 
    <data.Provider value={{
            displayOperations , setDisplayOperations ,
            operation_content ,setOperation_content ,
            result , setResult 
        }}>
            {children}
    </data.Provider>)
}