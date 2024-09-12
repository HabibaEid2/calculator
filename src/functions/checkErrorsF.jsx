export default function checkErrorsF (value , context) {

    const indexNumber = context.displayOperations?.findIndex(ele => ele?.props?.value === 'index') ;
    const operations = context.operation_content ; 
    const display = context.displayOperations ; 
    let error = false ; 
    let message ; 
    // length > 1 to ignore brackets ( OR ) and numbers
    const checkMultiOperations = operations.includes(value) && value.length > 1 &&
        !value.includes('plus') && !value.includes('minus') && 
        !value.includes('multiplication') && !value.includes('division') && 
        !value.includes('pi') 
    

    if (checkMultiOperations) {
        error = checkMultiOperations ; 
        message = "can't use the same operation twice!"
    }

    if (
        (display[indexNumber -1]?.props?.className?.includes('Value') || 
        display[indexNumber +1]?.props?.className?.includes('Value') ||
        display[indexNumber -1]?.props?.className?.includes('Element') || 
        display[indexNumber +1]?.props?.className?.includes('Element') ||
        display[indexNumber -1]?.props?.className?.includes('bracketOperation') || 
        display[indexNumber +1]?.props?.className?.includes('bracketOperation')) &&
        (
            value.length > 1 && (
                !value.includes('plus') &&
                !value.includes('minus') &&
                !value.includes('multiplication') &&
                !value.includes('division') &&
                !value.includes('pi') 
            )
        )
    ) {
        error = true ; 
        message = "can't create big operation inside another big operation!"
    }
    return {error  , message} ; 
}