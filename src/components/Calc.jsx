import './calc.css'
import sigma from './../assets/sigma.png'
import piIcon from './../assets/pi.png'
import squareRoot from './../assets/square-root.png'
import { useState } from 'react';
import { useRef } from 'react';
export default function Calc() {
    const [result , setResult] = useState('0') ;
    const [displayOperations , setDisplayOperations] = useState([]) ; 
    const [operation_content , setOperation_content] = useState('') ; 
    const displayRef = useRef() ; 

    // display operations on screen
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
        setOperation_content(prev => prev + e.target.value) ; 
    }

    // check operation contain brackets or not and excute it first
    function checkBrackets(value) {
        let getBrackets = value.match(/[(][^\[^()\]]*[)]/ig) || [] ; 

        for(let i of getBrackets) {
            value = value.replace(i , arrangeOperations(i.slice(1 , i.length -1))) ; 
        }

        if(value.includes('(')) checkBrackets(string) ; 
        else arrangeOperations(value)
    }

    // to arrange operations ( * | / ) from left and right and then ( + | - ) from left and right
    function arrangeOperations (string) {
        
        // to remove brackets from values like (9 + 2) or (18)
        if (string.includes('(')) string.replace('(' , '') ; 
        if (string.includes(')')) string.replace(')' , '') ; 

        const arr = string.split(' ') ;
        let index ;
        let slice ; 
        let result ;

        if (arr.includes('multiplication') || arr.includes('divition')) {

            // excute which on left first

            if (arr.lastIndexOf('multiplication') > arr.lastIndexOf('divition')) {
                index = arr.lastIndexOf('multiplication') ; 
            }
            else {
                index = arr.lastIndexOf('divition') ; 
            }

            // get the single operations and get the result of them one by one
            slice = arr.slice(index - 1 , index + 2) ; 
            result = getResult(slice) ; 

            // toggle the operation with its result
            return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result))
        }

        else if (arr.includes('plus') || arr.includes('minus')) {
            if (arr.lastIndexOf('plus') > arr.lastIndexOf('minus')) {
                index = arr.lastIndexOf('plus') ; 
            }
            else {
                index = arr.lastIndexOf('minus') ; 
            }
            slice = arr.slice(index - 1 , index + 2) ; 
            result = getResult(slice) ; 
            return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result))

        }
        else {
            setResult(string) ; 
            return string ; 
        }
    }

    function getResult(problem) {
        let result ; 

        for(let i = 0 ; i < problem.length ; i++) {
            if (i === 0 ) {
                result = +problem[0] ; 
            }
            else {
                switch(problem[i]) {
                    case 'multiplication' : 
                        result *= +problem[i + 1]
                        break ; 
                    case 'plus' : 
                        result += +problem[i + 1] ; 
                        break ; 
                    case 'minus' : 
                        result -= +problem[i + 1] ; 
                        break ; 
                    case 'divition' :  
                        result /= +problem[i + 1] ; 
                        break ; 
                }
            }
        }

        return result ; 
    }

    function deleteOne() {

        // delete from display screen
        setDisplayOperations(prev => prev.slice(0 , prev.length -1)) ; 

        // delete from the operation content that i get the result according to 
        setOperation_content(prev => {
            const arr = prev.split(' ').filter(ele => ele !==  '') ; 
            let lastElement = arr[arr.length -1] ; 
            if (!isNaN(+lastElement) && lastElement.length > 1) {

                lastElement = lastElement.slice(0 , lastElement[arr.length -1]) ; 
            }

            else {
                arr.pop() ; 

                // to make a space between the new number and operation name
                if (isNaN(+arr[arr.length -1])) arr[arr.length -1] = arr[arr.length -1] + ' ' ; 
            }

            return arr.join(' ') ; 
        }) 
    }
    function deleteAll() {
        setResult('0')
        setDisplayOperations([]) ; 
        setOperation_content('') ; 
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
                        <button value=' xPowerY ' className="xPowerY">
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <button value=' tenPower ' className='tenPower'>10</button>
                        <button value=' summition '>
                            <img src={sigma} alt="" />
                        </button>
                        <button 
                            value=' factorial ' 
                            onClick={getNum} 
                            className='factorial'>
                            <i className="fa-solid fa-x"></i> !
                        </button>
                        <button 
                            value = ' xPowerN1 ' 
                            onClick={getNum} 
                            className='xPowerN1'>
                            <i className="fa-solid fa-x"></i>
                            <sup>-1</sup>
                        </button>
                        <button value=' log ' onClick={getNum} >log</button>
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
                        <button value = '(' onClick={getNum}>(</button>
                        <button value = ')' onClick={getNum}>)</button>
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
                        <button onClick={() => checkBrackets(operation_content)}>=</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

// 326