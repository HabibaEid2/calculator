import { toast } from "react-toastify";
import showInScreen from "./showInScreen";
import checkErrorsF from "./checkErrorsF";

export default function getNum(e , context) {

    //  check errors
    const checkErrors = checkErrorsF(e.target.value ,  context) ; 

    if (checkErrors.error) {
        toast.warning(checkErrors.message)
    }

    else {
        // get index of index element in the screen
    const indexNumber = context.displayOperations?.findIndex(ele => ele?.props?.value === 'index') ; 
    const value = showInScreen(e) ; 

    const xElementCount = context.displayOperations.slice(0 , indexNumber)
        .filter(ele => ele.props?.className?.includes('xElement') || ele.props?.className?.includes('yElement')).length ; 

    const separateCount = context.displayOperations.slice(0 , indexNumber)
        .filter(ele => ele.props?.className?.includes('separate')).length ;

    // Example : log ( 6 )
    const operationBracket = context.displayOperations.slice(0 , indexNumber)
        .filter(ele => ele.props?.className?.includes('closingOperation')).length ;

    context.setDisplayOperations(prev => {
        let arr = prev.slice(0 , indexNumber) ;
        let lastEleClass = arr[arr.length -1]?.props?.className ;  
        let theClass ; 
        
        if (lastEleClass?.includes('xElement')) {
            theClass = lastEleClass?.includes('factorialEle') ?  ' factorialEle' : 
                        lastEleClass?.includes('xPowerNOne') ?  ' xPowerNOne' :
                        lastEleClass?.includes('anonymousR') ?  ' anonymousR firstRootEle' :
                        lastEleClass?.includes('logEle') ?  ' logEle' :
                        lastEleClass?.includes('rootValue') ? ' rootValue firstRootEle' : '' ; 

            arr[arr.length -1] =  <div className= { `xValue${theClass}` }>
                {value[0]?.props?.children}</div> ; 
        }

        // X Log Y
        else if(lastEleClass?.includes('xValue logEle')) {
            arr.push(<span className="xValue logEle">{value[0]?.props?.children}</span>)
        }
        else if (lastEleClass?.includes('yElement logEle')) {
            arr[arr.length -1] = <span className='power yValue logEle'>{value[0]?.props?.children}</span> ;
        }
        else if (lastEleClass?.includes('yValue logEle')) {
            arr.push(<div className='power yValue logEle'>{value[0]?.props?.children}</div>) ;
        }

        // Anonymous Root
        else if (lastEleClass?.includes('xValue anonymousR')) {
            arr.push(<span className="xValue anonymousR">{value[0]?.props?.children}</span>)
        }
        else if (lastEleClass?.includes('yElement anonymousR')) {
            arr[arr.length -1] = <span className='power yValue anonymousR'>{value[0]?.props?.children}</span> ; 
        }
        else if (lastEleClass?.includes('yValue anonymousR')) {
            arr.push(<div className='power yValue anonymousR'>{value[0]?.props?.children}</div>) ;
        }

        // Square Root 
        else if (
            lastEleClass?.includes('xValue rootValue') ||
            (lastEleClass?.includes('xValue rootValue') && prev[indexNumber + 1]?.props?.className?.includes('xValue rootValue')) 
        ) {
            arr.push(<span className="xValue rootValue">{value[0]?.props?.children}</span>)
        }

        // Factorial and X Power -1
        else if (lastEleClass?.includes('factorialEle') || lastEleClass?.includes('xPowerNOne') ) {
            const operation = lastEleClass?.includes('factorialEle') ? 'factorialEle' : 'xPowerNOne' 
            // to put the exclamation icon or -1 after the last number of factorial
            const prevEle = arr[arr.length -1]?.props?.children ; 
            arr.splice(arr.length -1 , 1 ,[
                <span>{prevEle}</span> , 
                <div className={`xValue ${operation}`}>{value[value.length -1]?.props?.children}</div>
            ])
        }

        // Powert The Ten
        else if (lastEleClass?.includes('yElement powerTheTen')) {
            arr[arr.length -1] = <span className='power yValue powerTheTen'>{value[0]?.props?.children}</span> ;
        }
        else if (lastEleClass?.includes('yValue powerTheTen')) {
            arr.push(<div className='power yValue powerTheTen'>{value[0]?.props?.children}</div>) ;
        }

        // X Power Y
        else if (lastEleClass?.includes('xValue')) {
            arr.splice(
                arr.length -1 , 1 , <span>{arr[arr.length -1]?.props?.children}</span> ,
                <span className="xValue">{value[0]?.props?.children}</span>
            )
        }
        else if (lastEleClass?.includes('yElement')) {
            arr[arr.length -1] = <span className='power yValue'>{value[0]}</span> ; 
        }
        else if (lastEleClass?.includes('yValue')) {
            arr.push(<div className='power yValue'>{value[value.length -1]?.props?.children}</div>) ;
        }
        else if (lastEleClass === 'bracketOperation') {
            arr.push(
            <span className="bracketOperationValue">{value[value.length -1]?.props?.children}</span> , 
            <span className="closingOperation">)</span>
            )
        }
        else if (lastEleClass?.includes('bracketOperationValue')) {
            arr.push(<span className="bracketOperationValue">{value[value.length -1]?.props?.children}</span>)
        }
        else arr.push(value) ;
        
        prev = [arr.flat() ,  prev.slice(indexNumber) ].flat()

        return prev; 
    }) ; 

    context.setOperation_content(prev => {
        let arr = prev.split(' ').map(ele => {
            if (!isNaN(ele)) return ele = [...ele] ; 
            else return ele ; 
        }).flat() ; 

        const prevEle = context.displayOperations[indexNumber -1]?.props ;
        let additionalCount = 0 ; 
        if (
            context.displayOperations.slice(0 , indexNumber).filter(ele => ele.props?.className === 'xElement').length > 0 ||
            context.displayOperations.slice(0 , indexNumber).filter(ele => ele.props?.className === 'xValue').length > 0 
        ) 
            additionalCount += 3 ; 

        if (context.displayOperations.slice(0 , indexNumber).filter(ele => ele.props?.className?.includes('rootValue')).length > 0) 
            additionalCount += 3 ; 

        if (context.displayOperations.slice(0 , indexNumber).filter(ele => ele.props?.className?.includes('anonymousR')).length > 0)
            additionalCount += 5 ; 

        if (context.displayOperations.slice(0 , indexNumber).filter(ele => ele.props?.className?.includes('logEle')).length > 0)
            additionalCount += 4 ; 

        if ( context.displayOperations.slice(0 , indexNumber).filter(ele => ele.props?.className?.includes('ten')).length > 0 )
            additionalCount += 2 ;
        
        if (context.displayOperations.slice(0 , indexNumber).filter(ele => ele.props?.className?.includes('bracketOperation')).length > 0)
            additionalCount += 2 ; 

        if (context.displayOperations.slice(0 , indexNumber).filter(ele => ele.props?.className?.includes('factorialEle')).length > 0)
            additionalCount += 1 ;

        if (context.displayOperations.slice(0 , indexNumber).filter(ele => ele.props?.className?.includes('xPowerNOne')).length > 0 )
            additionalCount += 1 ; 

        if (e.target.value === ' pi ') e.target.value = '3.14'
        if (e.target.value === ' anonymous-root ' || e.target.value === ' xLogY ') {
            arr.splice((indexNumber + additionalCount - (separateCount + xElementCount + operationBracket)) , 0 , `( ) ${e.target.value} ( )`)
        }
        else if(
            e.target.value === ' square-root ' || e.target.value === ' xPowerY ' || e.target.value === ' tenPower ' ||
            e.target.value === ' sin ' || e.target.value === ' cos ' || e.target.value === ' tan ' ||
            e.target.value === ' ln ' || e.target.value === ' log '
        ) {
            arr.splice((indexNumber + additionalCount - (separateCount + xElementCount + operationBracket)) ,0 , `${e.target.value.trimEnd()} ( )`) ; 
        }

        // Square Root
        else if (prevEle?.className?.includes('xElement rootValue') || prevEle?.className?.includes('xValue rootValue')) {
            const equation = (indexNumber -1) + additionalCount - (+xElementCount + +separateCount + operationBracket)
            arr.splice( equation , 0 , e.target.value)
        }

        // Ten Power
        else if(prevEle?.className?.includes('powerTheTen')) {
            const equation = (indexNumber -1) + additionalCount - (+xElementCount + +separateCount + operationBracket)
            arr.splice( equation , 0 , e.target.value)
        }

        // Anonymous Root
        else if (prevEle?.className?.includes('xElement anonymousR') || prevEle?.className?.includes('xValue anonymousR')) {
            const equation = (indexNumber -1) + additionalCount - (+xElementCount + +separateCount + operationBracket)
            arr.splice( equation , 0 , e.target.value)
        }
        else if (prevEle?.className?.includes('yElement anonymousR') || prevEle?.className?.includes('yValue anonymousR')) {
            const equation = (indexNumber -1) + additionalCount - 3 - (+xElementCount + +separateCount + operationBracket)
            arr.splice(equation , 0, e.target.value)
        }
        
        // X Log Y
        else if (prevEle?.className?.includes('xElement logEle') || prevEle?.className?.includes('xValue logEle')) {
            const equation = (indexNumber -1) + additionalCount  - (+xElementCount + +separateCount + operationBracket)
            arr.splice(equation , 0, e.target.value)
        }
        else if (prevEle?.className?.includes('yElement logEle') || prevEle?.className?.includes('yValue logEle') ) {
            const equation = (indexNumber -1) + additionalCount - 3  - (+xElementCount + +separateCount + operationBracket)
            arr.splice(equation , 0, e.target.value)
        }

        // Factorial and X Power -1
        else if(prevEle?.className?.includes('factorialEle') || prevEle?.className?.includes('xPowerNOne')) {
            const equation = (indexNumber -1) + additionalCount - (+xElementCount + +separateCount + operationBracket)
            arr.splice(equation , 0, e.target.value)
        }

        // X Power Y
        else if (prevEle?.className?.includes('xElement') || prevEle?.className?.includes('xValue')) {
            const equation = (indexNumber -1) + additionalCount - 2  - (+xElementCount + +separateCount + operationBracket)
            arr.splice(equation , 0, e.target.value)
        }
        else if(prevEle?.className?.includes('yElement') || prevEle?.className?.includes('yValue')) {
            const equation = (indexNumber -1) + additionalCount - (+xElementCount + +separateCount + operationBracket)
            arr.splice(equation , 0, e.target.value)
        }

        // Bracket Operations
        else if (prevEle?.className?.includes('bracketOperation') || prevEle?.className?.includes('bracketOperationValue')) {
            const equation = (indexNumber -1) + additionalCount - (+xElementCount + +separateCount + operationBracket)
            arr.splice(equation , 0, e.target.value)
        }
        else if (e.target.value === '(-)') {
            const equation = (indexNumber -1) + additionalCount + 1 - (xElementCount + separateCount + operationBracket) 
            arr.splice(equation , 0 , '-')
        }
        else {
            const equation = (indexNumber -1) + additionalCount + 1 - (xElementCount + separateCount + operationBracket) 
            arr.splice(equation ,0 , e.target.value) ; 
        }

        arr = arr.map(ele => {
            if (isNaN(ele) && (ele !== '.' && ele !== '-')) return ` ${ele} `
            else return ele ; 
        })
        return arr.join('') ; 
    })    
    }
}
