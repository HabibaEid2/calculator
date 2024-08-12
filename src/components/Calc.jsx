import './calc.css'
import sigma from './../assets/sigma.png'
import piIcon from './../assets/pi.png'
import squareRoot from './../assets/square-root.png'
import { useEffect, useState } from 'react';
import { useRef } from 'react';
export default function Calc() {
    const [result , setResult] = useState('0') ;
    const [displayOperations , setDisplayOperations] = useState([
        <div value = "index" className='index'></div>
    ]) ; 
    // const [operation_content , setOperation_content] = useState('') ; 
    const [operation_content , setOperation_content] = useState('') ; 
    const displayRef = useRef() ; 


    const indexNumber = displayOperations.findIndex(ele => ele.props.value === 'index') ; 

    // display operations on screen
    function getNum(e) {
        const index = displayOperations[displayOperations.length -1] ; 
        const displayWithoutIndex = displayOperations.slice(0 , displayOperations.length-1) ;
    
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
            case ' xPowerY ' : 
                <div className='xPowerY-display'>

                </div>
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
        // setDisplayOperations(prev => [...displayWithoutIndex , value , index]) ; 
        setDisplayOperations(prev => {
            // displayOperations.splice(indexNumber , 0 , value) ; 

            let arr = prev.slice(0 , indexNumber) ; 
            arr.push(value) ; 


            prev = [arr ,  prev.slice(indexNumber) ].flat()

            // return prev ; 
            return prev ; 
        }) ; 
        // setOperation_content(prev => prev + e.target.value)
        setOperation_content(prev =>{
            let arr = prev.split(' ').map((ele , index) => {
                if (!isNaN(ele)) return ele = [...ele] ; 
                else return ele ; 
            }).flat()

            arr.splice(indexNumber ,0 , e.target.value)
            arr = arr.map(ele => {
                if (isNaN(ele)) return ` ${ele} `
                else return ele ; 
            }).join('')
            return arr ; 
        })
    }

    console.log('operation is : ' , operation_content.split(' '))

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

        const arr = string.split(' ').filter(ele => ele !== '') ;

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
        setDisplayOperations(prev => prev.filter((ele , index) => index !== indexNumber -1)) ; 

        setOperation_content(prev => {
            const modifiedArr  = prev.split(' ').map(ele => {
                if (!(isNaN(+ele)) && ele.length > 1) {
                    return ele.split('') ; 
                } else if(ele !== '') {
                    return ele ; 
               }
            })

            

            let arr = modifiedArr.filter(ele => ele !== undefined).flat().map((ele , index) => {
                if (isNaN(ele) && index !== indexNumber -1) {
                    return ` ${ele} `
                }
                else if (index !== indexNumber -1) {
                    return ele ; 
                } 
                else return; 
            }) ;

            return arr.join('')  ;

        }) 
    }

    function deleteAll() {
        setResult('0')
        setDisplayOperations(prev => prev.filter(ele => ele.props.value === 'index')) ; 
        setOperation_content('') ; 
    }


    function goLeft() {

        setDisplayOperations(prev => {

            let arr = prev.map((ele , index) => {
                if (indexNumber === 0) return ele ; 
                if (index === indexNumber && indexNumber !== 0) {
                    return prev[indexNumber -1]
                } 
                else if (index === indexNumber -1 && indexNumber !== 0) {
                    return prev[indexNumber]
                } 
                else return ele ; 
            })

            return arr ; 

        })
    }

    function goRight() {
        setDisplayOperations(prev => {
            let arr = prev.map((ele , index) => {
                if (index === indexNumber && indexNumber !== prev.length -1) {
                    return prev[indexNumber +1]
                } 
                else if (index === indexNumber +1 && indexNumber !== prev.length -1) {
                    return prev[indexNumber]
                } 
                else return ele ; 
            })

            return arr ; 

        })
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

                    {/* directions */}
                    <div className="directions">
                        <button onClick={goLeft}>
                            <i className="fa-solid fa-caret-left"></i>
                        </button>

                        <button onClick={goRight}>
                            <i className="fa-solid fa-caret-right"></i>
                        </button>
                    </div>

                    {/* operations */}
                    <div className="operation">
                        <button value=' xPowerY ' className="xPowerY" onClick={getNum}>
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <button value=' tenPower ' className='tenPower' onClick={getNum}>10</button>
                        <button value=' summition ' onClick={getNum}>
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
                        <button value=' logWithX_Y' className='logarithm' onClick={getNum}>
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

// 375