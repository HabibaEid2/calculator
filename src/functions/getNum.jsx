import showInScreen from "./showInScreen";

export default function getNum(e , context) {

    // get index of index element in screen
    const indexNumber = context.displayOperations?.findIndex(ele => ele?.props?.value === 'index') ; 
    let value = showInScreen(e) ; 
    context.setDisplayOperations(prev => {

        let arr = prev.slice(0 , indexNumber) ;
        let lastEleClass = arr[arr.length -1]?.props?.className ;  
        let theClass ; 
        
        if (lastEleClass?.includes('xElement')) {
            theClass = lastEleClass?.includes('display-factorial') ?  'display-factorial' : 
                        lastEleClass?.includes('power_1') ?  'power_1' :
                        lastEleClass?.includes('rootValue') ?  'rootValue' :
                        lastEleClass?.includes('logValue') ?  'logValue' : 'xValue'

            arr[arr.length -1] =  <div className= { theClass }> {e.target.value}</div> ; 
        }
        else if(lastEleClass?.includes('logValue')) {
            arr.push(<span className="logValue">{value[0]?.props?.children}</span>)
        }

        else if (lastEleClass?.includes('xValue')) {
            arr.splice(
                arr.length -1 , 1 , <span>{arr[arr.length -1]?.props?.children}</span> ,
                <span className="xValue">{value[0]?.props?.children}</span>
            )
        }
        else if (lastEleClass?.includes('yElement')) {
            if(lastEleClass?.includes('exponent')) {
                arr[arr.length -1] = <span className='power yValue exponent'>{arr[arr.length -1]?.props?.children}</span> ; 
            }
            else if (lastEleClass?.includes('down')) {
                arr[arr.length -1] = <span className='power yValue down'>{e.target.value}</span> ;
            }
            else arr[arr.length -1] = <span className='power yValue'>{value[0]}</span> ; 
        }
        else if (lastEleClass?.includes('yValue')) {
            if (lastEleClass?.includes('down')) arr.push(<div className='power yValue down'>{value[0]?.props?.children}</div>) ; 
            else arr.push(<span className='power yValue'>{value[value.length -1]?.props?.children}</span>) ; 
        }
        else if (lastEleClass?.includes('display-factorial')) {

            // to put the exclamation icon after the last number of factorial
            const prevEle = arr[arr.length -1]?.props?.children ; 
            arr.splice(arr.length -1 , 1 ,[
                <span>{prevEle}</span> , 
                <div className='display-factorial'>{value[value.length -1]?.props?.children}</div>
            ])
        }
        else if (lastEleClass?.includes('rootValue')) {
            arr.push(<span className="rootValue">{value[0]?.props?.children}</span>)
        }
        else if (lastEleClass?.includes('power_1')) {
            const prevEle = arr[arr.length -1]?.props?.children ; 
            arr.splice(arr.length -1 , 1 ,[
                <span>{prevEle}</span> , 
                <div className='power_1'>{value[0]?.props?.children}</div>
            ])
        }
        else if (
            (
                lastEleClass?.includes('sin') || lastEleClass?.includes('cos') ||
                lastEleClass?.includes('tan') || lastEleClass?.includes('ln') || lastEleClass?.includes('log') 
            )
                &&
            (isNaN(context.displayOperations[indexNumber + 1]?.props?.children) && context.displayOperations[indexNumber + 1]?.props?.children !==')' )
        ) {
            arr.push(
            <span>{e.target.value}</span> , 
            <span>)</span>
            )
        }
        else arr.push(value) ;
        
        prev = [arr.flat() ,  prev.slice(indexNumber) ].flat()

        return prev; 
    }) ; 

    context.setOperation_content(prev => {
        let arr = prev.split(' ').map(ele => {
            if (!isNaN(ele)) return ele = [...ele] ; 
            else return ele ; 
        }).flat() 

        const value = context.displayOperations[indexNumber -1]?.props ;
        
        if(e.target.value === ' square-root ' || e.target.value === ' tenPower ') {
            arr.splice(indexNumber ,0 , `${e.target.value.trimEnd()}(`) ; 
        }
        else if (
            arr.includes('xPowerY')  ||  arr.includes('square-root(') || 
            arr.includes('anonymous-root') || arr.includes('xLogY') || arr.includes('tenPower(')
        ) {
            if(arr.includes('square-root(')) {
                if ( arr[indexNumber -1] === 'square-root(' && isNaN(arr[indexNumber]))
                {
                    arr.splice(indexNumber ,0 , e.target.value , ')') ; 
                }
                else {
                    const indexOfTheOperation = arr.indexOf('square-root(') ; 
                    arr.splice(indexOfTheOperation == indexNumber ? indexNumber  : indexNumber + 1,0 , e.target.value) ;
                }
            }
            else if(arr.includes('tenPower(')) {
                if ( 
                    arr[indexNumber -2] === 'tenPower(' && isNaN(arr[indexNumber -1]) &&
                    !context.displayOperations[indexNumber + 1]?.props?.className.includes('power')
                )
                {
                    arr.splice(indexNumber -1 ,0 , e.target.value , ')') ; 
                }
                else if (arr[indexNumber -2] === 'tenPower(' && context.displayOperations[indexNumber + 1]?.props?.className.includes('power')){
                    arr.splice(indexNumber -1 , 0 , e.target.value ) ; 
                }
                else arr.splice(indexNumber , 0 , e.target.value ) ; 
                
            }
            else if (arr.includes('xPowerY') || arr.includes('anonymous-root') || arr.includes('xLogY')) {

                const type = arr.includes('xPowerY') ? 'xPowerY' : arr.includes('anonymous-root') ? 'anonymous-root' : 'xLogY' ; 
                const operationIndex = arr.filter(ele => ele !== '').findIndex(ele => ele === type) ; 


                if (value?.className?.includes('rootValue')) {

                    if (isNaN(arr[operationIndex -1]) && arr[operationIndex -1] !== ')') {
                        if (value?.className.includes('xElement')) {
                            arr.splice(operationIndex + 1 ,0 ,'(' , e.target.value , ')') ; 
                        }
                        else arr.splice(indexNumber + 1  ,0 ,  e.target.value ) ;
                    }
                    else {
                        if (value?.className.includes('xElement')) {
                            arr.splice(indexNumber + 2  ,0 ,'(' , e.target.value , ')') ; 
                        }
                        else arr.splice(indexNumber + 4 ,0 , e.target.value) ;
                    }
                }
                else if (value?.className?.includes('exponent')) {
                    if(value?.className?.includes('yElement')) {
                        arr.splice(operationIndex== 0? operationIndex : operationIndex - 1 , 0 , '(',e.target.value , ')') ; 
                    }
                    else if (value?.className?.includes('yValue')) {
                        arr.splice(operationIndex - 1 ,0 , e.target.value) ; 
                    }
                }
                else if (value?.className?.includes('logValue')) {
                    if (isNaN(arr[operationIndex -1]) && arr[operationIndex -1] !== ')') {
                        if (value?.className.includes('xElement')) {
                            arr.splice(operationIndex + 1 ,0 ,'(' , e.target.value , ')') ; 
                        }
                        else arr.splice(indexNumber  ,0 ,  e.target.value ) ;
                    }
                    else {
                        if (value?.className.includes('xElement')) {
                            arr.splice(indexNumber + 2  ,0 ,'(' , e.target.value , ')') ; 
                        }
                        else arr.splice(indexNumber + 3 ,0 , e.target.value) ;
                    }
                }
                else if (value?.className?.includes('down')) {
                    if (value?.className?.includes('yElement') && arr[arr.indexOf('xLogY') -1] !== ')') {
                        arr.splice(operationIndex , 0 , '(' , e.target.value , ')') ; 
                    }
                    else arr.splice(operationIndex -1 , 0 , e.target.value) ; 
                }
                else if (value?.className?.includes('xElement')) {
                    arr.splice(operationIndex , 0 , e.target.value) ; 
                }

                else if(value?.className?.includes('yElement')) {
                    if (context.displayOperations[indexNumber + 1]?.props?.className.includes('power') || arr[index + 2] === ')') {
                        arr.splice(operationIndex + 2 , 0 , e.target.value ) ; 
                    }
                    else {
                        arr.splice(operationIndex + 2 , 0 ,  '(',e.target.value ,')') ; 
                    }
                }
                else if (value?.className?.includes('yValue')) {
                    arr.splice(
                        (isNaN(arr[operationIndex - 1]) || operationIndex === 0) ?
                        indexNumber + 1 : indexNumber + 2 ,0 , e.target.value
                    ) ; 
                }
                else  {
                    let newPlace = type === 'anonymous-root' ? indexNumber + 4 : indexNumber + 2 ; 
                    arr.splice(operationIndex >= indexNumber ? indexNumber  : newPlace , 0 , e.target.value) ; 
                }
            }
            else arr.splice(indexNumber ,0 , e.target.value) ; 
        }
        else if(arr.includes('factorial') || arr.includes('xPowerN1') ) {
            let index = arr.indexOf('xPowerN1') || arr.indexOf('factorial') ; 
            arr.splice(isNaN(arr[index -1] && indexNumber > 0) ? indexNumber -1 : indexNumber , 0 , e.target.value)
        }
        else if (
            e.target.value === ' sin ' || e.target.value === ' cos ' || e.target.value === ' tan ' ||
            e.target.value === ' ln ' || e.target.value === ' log '

        ) {
            arr.splice(indexNumber ,0 , `${e.target.value.trimEnd()}(`) ; 
        }
        else if (
            arr.includes('sin(') || arr.includes('cos(') || arr.includes('tan(') ||
            arr.includes('ln(') || arr.includes('log(')
        ) {
            const getValue = arr.includes('sin(') ? 'sin(' :  arr.includes('cos(') ? 'cos(' :  arr.includes('tan(') ? 'tan(' : 
            arr.includes('ln(') ? 'ln(' : 'log(' ; 
            if (
                arr[indexNumber -1] === getValue && 
                (isNaN(context.displayOperations[indexNumber + 1]?.props?.children) && context.displayOperations[indexNumber + 1]?.props?.children !== ')')
            ) 
            {
                arr.splice(indexNumber ,0 , e.target.value , ')') ; 
            }
            else arr.splice(indexNumber ,0 , e.target.value) ;
        }
        else if (e.target.value === '(-)') {
            arr.splice(indexNumber , 0 , '-')
        }
        else arr.splice(indexNumber ,0 , e.target.value) ; 

        arr = arr.map(ele => {
            if (isNaN(ele) && (ele !== '.' && ele !== '-')) return ` ${ele} `
            else return ele ; 
        })
        return arr.join('') ; 
    })
}

// 234

// 288