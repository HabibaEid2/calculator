import getResult from "./getResult";

// to arrange operations ( * | / ) from left and right and then ( + | - ) from left and right
export default function arrangeOperations (string , context) {
        
    // to remove brackets from values like (9 + 2) or (18)
    if (string.includes('(')) string.replace('(' , '') ; 
    if (string.includes(')')) string.replace(')' , '') ; 

    const arr = string.split(' ').filter(ele => ele !== '') ;

    let index ;
    let slice ; 
    let result ;

    if (arr.includes('xPowerY') ) {
        index = arr.indexOf('xPowerY')
        slice = arr.slice(index - 1 , index + 2)
        result = getResult(slice) ; 

        // toggle the operation with its result
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }
    else if (arr.includes('factorial')) {
        index = arr.indexOf('factorial')
        slice = arr.slice(index , index + 2)
        result = getResult(slice) ; 

        // toggle the operation with its result
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }
    else if (arr.includes('tenPower')) {
        index = arr.indexOf('tenPower')
        slice = arr.slice(index , index + 2)
        result = getResult(slice) ; 

        // toggle the operation with its result
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }
    else if (arr.includes('xPowerN1')) {
        index = arr.indexOf('xPowerN1')
        slice = arr.slice(index , index + 2)
        result = getResult(slice) ; 

        // toggle the operation with its result
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }
    else if (arr.includes('square-root')) {
        index = arr.indexOf('square-root')
        slice = arr.slice(index , index + 2)
        result = getResult(slice) ; 

        // toggle the operation with its result
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }
    else if (arr.includes('anonymous-root')) {
        index = arr.indexOf('anonymous-root')
        slice = arr.slice(index-1 , index + 2)
        result = getResult(slice) ; 

        // toggle the operation with its result
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }
    else if (
        arr.includes('sin') || arr.includes('cos') || arr.includes('tan') ||
        arr.includes('ln') || arr.includes('log')
    ) {
        const theValue = arr.includes('sin') ? 'sin' : arr.includes('cos') ? 'cos' : arr.includes('tan') ? 'tan' : 
                        arr.includes('ln') ?  'ln' : 'log' ; 

        index = arr.indexOf(theValue)
        slice = arr.slice(index , index + 2)
        result = getResult(slice) ; 

        // toggle the operation with its result
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }
    else if (arr.includes('xLogY')) {
        index = arr.indexOf('xLogY')
        slice = arr.slice(index-1 , index + 2)
        result = getResult(slice) ; 

        // toggle the operation with its result
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
    }
    else if (arr.includes('multiplication') || arr.includes('divition')) {

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
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)
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
        return arrangeOperations(arr.join(' ').replace(slice.join(' ') , result) , context)

    }
    else {
        context.setResult(string) ; 
        return string ; 
    }
}
