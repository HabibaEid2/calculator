import './calc.css'
import sigma from './../assets/sigma.png'
import piIcon from './../assets/pi.png'
import squareRoot from './../assets/square-root.png'
import { useState } from 'react';
import { useRef } from 'react';
export default function Calc() {
    const [result , setResult] = useState(null) ;
    const [displayOperations , setDisplayOperations] = useState([]) ; 
    const [operation_content , setOperation_content] = useState('') ; 
    const [checkEqual , setCheckEqual] = useState(false) ; 

    const displayRef = useRef() ; 

    function getNum(e) {
        let value ; 
        switch(e.target.value) {
            case ' plus ' :
                value = <span>+</span>
                break ; 
            case ' minus ' : 
                value = <span>-</span>
                break ; 
            case ' multiplication ' : 
                value = 
                <div>
                    <i className="fa-solid fa-x"></i>
                </div>
                break ; 
            case ' divition ' : 
                value = 
                <div>
                    <i className="bold fa-solid fa-divide"></i>
                </div>
                break ; 
            case ' factorial ' : 
                value = 
                <div>
                    <i className="fa-solid fa-x"></i>!
                </div>
                break ; 
            case ' pi ' : 
                value = 
                <div>
                    <img src={piIcon} alt="" />
                </div>
                break ; 
            case ' sin ' : 
                value = <span>sin</span>; 
                break ; 
            case ' cos ' : 
                value = <span>cos</span> ; 
                break ; 
            case ' tan ' : 
                value = <span>tan</span> ; 
                break ;
            default :value = <span>{e.target.value}</span> ; 
                break ; 
        }
        setDisplayOperations(prev => [...prev , value]) ; 
        getOperation(e)
    }
    
    function getOperation(e) {
        setOperation_content(prev => prev + e.target.value) ; 
    }



    function check () {

    }

    console.log(check('2 multiplication 3 plus (2 plus 6) minus 6')) 
    //  2 * 3 + ( 2 + 6 ) - 6 ==> false : 8 , true ==>  
    function deleteOne() {
        setDisplayOperations(prev => prev.slice(0 , prev.length -1)) ; 
        setOperation_content(prev => {
            const arr = prev.split(' ') ; 
            for(let i of arr) {
                if (!isNaN(+i)) {
                    i = i.slice(0 , i.length -1)
                }
                else arr.pop() ; 
            }

            return arr.join(' ') ; 
        })

    }
    function deleteAll() {
        setCheckEqual(false)
        setDisplayOperations([]) ; 
        setOperation_content('') ; 
    }


    function getResult(string) {
        setCheckEqual(true) ; 
        let result ; 
        const arr = string.split(' ') ;
        for(let i = 0 ; i < arr.length ; i++) {
            if (i === 0 ) {
                result = +arr[0] ; 
            }
            else {
                switch(arr[i]) {
                    case 'multiplication' : 
                        result *= +arr[i + 1]
                        break ; 
                    case 'plus' : 
                        result += +arr[i + 1] ; 
                        break ; 
                    case 'minus' : 
                        result -= +arr[i + 1] ; 
                        break ; 
                    case 'divition' :  
                        result /= +arr[i + 1] ; 
                        break ; 
                }
            }
        }
        setResult(result) ; 
    }

    return (
        <div className="calculator">
            <div className="container">

                <div className="display">
                    <div ref={displayRef} className="display-operations">
                        {displayOperations}
                    </div>
                    <div className="result"> {result} = </div>
                </div>
                <div className="buttons">

                    {/* operations */}
                    <div className="operation">
                        <button className="ex">
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <button>10</button>
                        <button>
                            <img src={sigma} alt="" />
                        </button>
                        <button 
                        value=' factorial ' 
                        onClick={getNum} 
                        className='factorial'>
                            <i className="fa-solid fa-x"></i> !
                        </button>
                        <button 
                        value = ' ex-1 ' 
                        onClick={getNum} 
                        className='ex-1'>
                            <i className="fa-solid fa-x"></i>
                            <sup>-1</sup>
                        </button>
                        <button 
                        value=' log ' 
                        onClick={getNum} >log</button>
                        <button className='logarithm'>
                            log<sub>x</sub>y
                        </button>
                        <button 
                        value=' pi '
                        onClick={getNum} >
                            <img src={piIcon} alt="" />
                        </button>
                        <button 
                        value=' square-root ' 
                        onClick={getNum} 
                        className='root'>
                            <img src={squareRoot} alt="" />
                        </button>
                        <button 
                        value=' anonymous-root ' 
                        onClick={getNum} 
                        className='root with-y-number'>
                            <img src={squareRoot} alt="" />
                        </button>
                        <button>(-)</button>
                        <button value=' sin ' onClick={getNum} >sin</button>
                        <button value=' cos ' onClick={getNum} >cos</button>
                        <button value=' tan ' onClick={getNum} >tan</button>
                        <button value=' ln ' onClick={getNum}>ln</button>

                    </div>

                    {/* numbers and deletion*/}
                    <div className="numbers">
                        <button value='7' onClick={getNum}>7</button>
                        <button value='8' onClick={getNum}>8</button>
                        <button value='9' onClick={getNum}>9</button>
                        <button onClick={getNum}>(</button>
                        <button onClick={getNum}>)</button>
                        <button value='4' onClick={getNum}>4</button>
                        <button value='5' onClick={getNum}>5</button>
                        <button value='6' onClick={getNum}>6</button>
                        <button value=' multiplication ' onClick={getNum}>
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <button value=' divition ' onClick={getNum}>
                            <i className="bold fa-solid fa-divide"></i>
                        </button>
                        <button value='1' onClick={getNum}>1</button>
                        <button value='2' onClick={getNum}>2</button>
                        <button value='3' onClick={getNum}>3</button>
                        <button value=' plus ' onClick={getNum}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        <button value=' minus ' onClick={getNum}>
                            <i className=" bold fa-solid fa-minus"></i>
                        </button>
                        <button value='0' onClick={getNum}>0</button>
                        <button value='.' onClick={getNum}>.</button>
                        <button onClick={deleteOne} className='delete'>
                            <i className="bold fa-solid fa-delete-left"></i>
                        </button>
                        <button onClick={deleteAll} className='delete'>
                            AC
                        </button>
                        <button onClick={() => getResult(operation_content)}>=</button>
                    </div>
                </div>

            </div>
        </div>
    )
}