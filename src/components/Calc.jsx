import './calc.css'
import piIcon from './../assets/pi.png'
import squareRoot from './../assets/square-root.png'
import { useContext, useEffect, useRef, useState  } from 'react';
import { data } from '../context/Context';
import getNum from '../functions/getNum';
import deleteOneEle from '../functions/deleteOneEle';
import arrangeOperations from '../functions/arrangeOperations';
import deleteAllEles from '../functions/deleteAllEles';

export default function Calc() {
    const displayRef = useRef() ; 
    const context = useContext(data) ; 
    const [displayInScreen , setDisplayInScreen] = useState(null) ; 
    const indexNumber = context.displayOperations?.findIndex(ele => ele?.props?.value === 'index') ; 

    
    // check operation contain brackets or not and excute it first
    function checkBrackets(value) {

        let getBrackets = value.match(/[(][^\[^()\]]*[)]/ig) || [] ; 

        for(let i of getBrackets) {
            value = value.replace(i , arrangeOperations(i.slice(1 , i.length -1) , context)) ; 
        }
        if(value.includes('(') && !isNaN(value[value.indexOf('(') + 1])) checkBrackets(value) ; 
        else arrangeOperations(value , context) ; 
    }

    function goLeft() {

        context.setDisplayOperations(prev => {

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
        context.setDisplayOperations(prev => {
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

    useEffect(() => {
        if (
            context.displayOperations[indexNumber -1]?.props.className?.includes('power ') &&
            !context.displayOperations[indexNumber]?.props.className.includes('modify')
        ) {

            console.log('yes one')
            if (context.displayOperations[indexNumber -1]?.props.className?.includes('down')) {
                context.setDisplayOperations(prev => {
                    prev.splice(indexNumber , 1 , <div value = "index" className='index modify logBase'></div>) ; 
                    return prev ; 
                })
            }
    
            else context.setDisplayOperations(prev => {
                prev.splice(indexNumber , 1 , <div value = "index" className='index modify indexAfterPower'></div>) ; 

                return prev ; 
            })
        }
        else if (
            !context.displayOperations[indexNumber -1]?.props.className?.includes('power') &&
            context.displayOperations[indexNumber]?.props.className !== 'index'
        )  {
            console.log('yes two')
            context.setDisplayOperations(prev => {
                prev.splice(indexNumber , 1 , <div value = "index" className='index'></div>) ; 
                return prev ; 
            })
        }
        

        setDisplayInScreen(context.displayOperations)
    } , [context]) ; 


    return (
        <div className="calculator">
            <div className="container">

                <div className="display">
                    <div ref={displayRef} className="display-operations">
                        {displayInScreen}
                    </div>
                    <div className="result"> {context.result} = </div>
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
                        <button value=' xPowerY ' className="xPowerY" onClick={(e) => getNum(e , context)}>
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <button value=' tenPower ' className='tenPower' onClick={(e) => getNum(e , context)}>10</button>
                        <button 
                            value=' factorial ' 
                            onClick={(e) => getNum(e , context)} 
                            className='factorial'>
                            <i className="fa-solid fa-x"></i> !
                        </button>
                        <button 
                            value = ' xPowerN1 ' 
                            onClick={(e) => getNum(e , context)} 
                            className='xPowerN1'>
                            <i className="fa-solid fa-x"></i>
                            <sup>-1</sup>
                        </button>
                        <button value=' log ' onClick={(e) => getNum(e , context)} >log</button>
                        <button value=' xLogY ' className='logarithm' onClick={(e) => getNum(e , context)}>
                            log<sub>x</sub>y
                        </button>
                        <button 
                            value=' pi '
                            onClick={(e) => getNum(e , context)} >
                            <img src={piIcon} alt="" />
                        </button>
                        <button 
                            value=' square-root ' 
                            onClick={(e) => getNum(e , context)} 
                            className='root'>
                            <img src={squareRoot} alt="" />
                        </button>
                        <button 
                            value=' anonymous-root ' 
                            onClick={(e) => getNum(e , context)} 
                            className='root with-y-number'>
                            <img src={squareRoot} alt="" />
                        </button>
                        <button value=' ln ' onClick={(e) => getNum(e , context)}>ln</button>
                        <button value=' sin ' onClick={(e) => getNum(e , context)} >sin</button>
                        <button value=' cos ' onClick={(e) => getNum(e , context)} >cos</button>
                        <button value=' tan ' onClick={(e) => getNum(e , context)} >tan</button>
                        <button value='(-)' onClick={(e) => getNum(e , context)} >(-)</button>


                        <button onClick={() => checkBrackets(context.operation_content)}>=</button>


                    </div>

                    {/* numbers and deletion*/}
                    <div className="numbers">
                        <button value='7' onClick={(e) => getNum(e , context)}>7</button>
                        <button value='8' onClick={(e) => getNum(e , context)}>8</button>
                        <button value='9' onClick={(e) => getNum(e , context)}>9</button>
                        <button value = '(' onClick={(e) => getNum(e , context)}>(</button>
                        <button value = ')' onClick={(e) => getNum(e , context)}>)</button>
                        <button value='4' onClick={(e) => getNum(e , context)}>4</button>
                        <button value='5' onClick={(e) => getNum(e , context)}>5</button>
                        <button value='6' onClick={(e) => getNum(e , context)}>6</button>
                        <button value=' multiplication ' onClick={(e) => getNum(e , context)}>
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <button value=' divition ' onClick={(e) => getNum(e , context)}>
                            <i className="bold fa-solid fa-divide"></i>
                        </button>
                        <button value='1' onClick={(e) => getNum(e , context)}>1</button>
                        <button value='2' onClick={(e) => getNum(e , context)}>2</button>
                        <button value='3' onClick={(e) => getNum(e , context)}>3</button>
                        <button value=' plus ' onClick={(e) => getNum(e , context)}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        <button value=' minus ' onClick={(e) => getNum(e , context)}>
                            <i className=" bold fa-solid fa-minus"></i>
                        </button>
                        <button value='0' onClick={(e) => getNum(e , context)}>0</button>
                        <button value='.' onClick={(e) => getNum(e , context)}>.</button>
                        <button onClick={() => deleteAllEles(context)} className='deleteAll'>
                            AC
                        </button>
                        <button onClick={() => deleteOneEle(context)} className='deleteOne'>
                            <i className="bold fa-solid fa-delete-left"></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

// 856