import getResult from "./getResult";

// to arrange operations ( * | / ) from left and right and then ( + | - ) from left and right
export default function arrangeOperations (string , context) {

    let operationName ; 
    // to remove brackets from values like (9 + 2) or (18)
    if (string.includes('(')) string.replace('(' , '') ; 
    if (string.includes(')')) string.replace(')' , '') ; 

    let arr = string.split(' ').filter(ele => ele !== '') ;

    let index ;
    let slice ; 
    let result ;

    if (arr.includes('xPowerY') || arr.includes('anonymous-root') || arr.includes('xLogY')) {
        operationName = arr.filter(
            ele => ele === 'xPowerY' || ele ==='anonymous-root' || ele === 'xLogY'
        )[0] ; 

        index = arr.indexOf(operationName) ; 
        slice = arr.slice(index - 1 , index + 2)
        result = getResult(slice) ; 

        // toggle the operation with its result
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }
    else if (
        arr.includes('tenPower')  || arr.includes('square-root') ||
        arr.includes('sin') || arr.includes('cos') || arr.includes('tan') ||
        arr.includes('ln') || arr.includes('log')
    ) {
        operationName = arr.filter(
            ele =>  ele === 'tenPower' || ele === 'square-root' ||
            ele === 'sin' || ele === 'cos' || ele === 'tan' || 
            ele === 'ln' || ele === 'log'
        )[0] ; 

        index = arr.indexOf(operationName)
        slice = arr.slice(index , index + 2)
        result = getResult(slice) ; 
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }
    else if (arr.includes('factorial') || arr.includes('xPowerNOne')) {
        index = arr.indexOf(arr.includes('xPowerNOne') ? 'xPowerNOne' : 'factorial')
        slice = arr.slice(index -1, index + 1) ; 
        result = getResult(slice) ; 

        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }
    else if (arr.includes('multiplication') || arr.includes('division')) {

        // excute which on left first

        if (arr.includes('multiplication') && arr.includes('division')) {
            if (arr.indexOf('multiplication') < arr.indexOf('division')) {
                index = arr.indexOf('multiplication') ; 
            }
            else {
                index = arr.indexOf('division') ; 
            }
        }
        else if (arr.includes('multiplication')) index = arr.indexOf('multiplication') ; 
        else index = arr.indexOf('division')

        // get the single operations and get the result of them one by one
        slice = arr.slice(index - 1 , index + 2) ; 
        result = getResult(slice) ; 

        // toggle the operation with its result
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }

    else if (arr.includes('plus') || arr.includes('minus')) {
        if (arr.includes('plus') && arr.includes('minus')) {
            if (arr.indexOf('plus') > arr.indexOf('minus')) {
                index = arr.indexOf('minus') ; 
            }
            else {
                index = arr.indexOf('plus') ; 
            }
        }
        else if (arr.includes('plus')) index = arr.indexOf('plus') ; 
        else index = arr.indexOf('minus')
        
        slice = arr.slice(index - 1 , index + 2) ; 
        result = getResult(slice) ; 
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)

    }
    else {
        // put result direct in the screen
        context.setResult(string.includes('pi')? 3.14 : string) ; 
        return string ; 
    }
}

// 127