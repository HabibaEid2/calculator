export default function deleteOneEle(context) {
    
    const indexNumber = context.displayOperations?.findIndex(ele => ele?.props?.value === 'index') ; 
    let prevEle = context.displayOperations[indexNumber -1]?.props?.className ; 

    // context.setOperation_content(prev => {
    //     let arr = 
    //     prev.split(' ')
    //     .map(ele => (!(isNaN(+ele)) && ele.length > 1) ? ele.split('') : ele !== '' ? ele : undefined)
    //     .filter(ele => ele !== undefined).flat() ; 

    //     let prevEle = context.displayOperations[indexNumber -1]?.props?.className ; 
    //     if (
    //         prevEle?.includes('yElement') && context.displayOperations[indexNumber +1]?.props?.className?.includes('power')  &&
    //         !(context.displayOperations[indexNumber +1]?.props?.className?.includes('rootValue')) 
    //     ) arr = arr ; 
    //     else if (
    //         prevEle?.includes('xElement') || 
    //         (prevEle?.includes('yElement') && context.displayOperations[indexNumber +1]?.props?.className?.includes('separate'))
    //     ) {

    //         let secondeBracketIndex = 0 ; 
    //         for(let i = arr.indexOf('xPowerY') ; i < arr.length ; i++ ) {
    //             if (arr[i] === ')') {
    //                 secondeBracketIndex = i ; 
    //                 break ; 
    //             }
    //         }

    //         arr = arr.filter((ele , index) => index < arr.indexOf('xPowerY') || index > secondeBracketIndex) ; 
    //     }

    //     else if (prevEle?.includes('power') && !(context.displayOperations[indexNumber +1]?.props?.className?.includes('rootValue'))) {
    //         let checkPrevValue = false ;
    //         for(let i = indexNumber -1 ; i >= 0 ; i--) {
    //             if (
    //                 context.displayOperations[i]?.props?.className?.includes('yValue') &&
    //                 context.displayOperations[i -1]?.props?.className?.includes('xValue') 
    //             ) {
    //                 checkPrevValue = true ; 
    //                 break ; 
    //             } 
    //         }
    //         arr = arr.filter((ele , index) => index !== (checkPrevValue ? indexNumber + 1 : indexNumber) )
    //     }

    //     else if ( 
    //         prevEle?.includes('display-factorial') ||
    //         prevEle?.includes('power_1')
    //     ) {

    //         let checkPrevValue = false ;
    //         for(let i = indexNumber -1 ; i >= 0 ; i--) {
    //             if (
    //                 context.displayOperations[i]?.props?.className?.includes('yValue') &&
    //                 context.displayOperations[i -1]?.props?.className?.includes('xValue') 
    //             ) {
    //                 checkPrevValue = true ; 
    //                 break ; 
    //             } 
    //         }
    //         if (prevEle?.includes('display-factorial') || prevEle?.includes('power_1')) checkPrevValue = true ; 

    //         if (checkPrevValue) arr = arr.filter((ele , index) => index !== indexNumber) ; 
    //         else arr = arr.filter((ele , index) => index !== indexNumber -1) ; 

    //     } 
        
    //     // anonymous root
    //     else if (prevEle?.includes('power') || prevEle?.includes('rootValue')) {

    //         if (prevEle?.includes('power')) {
    //             arr = arr.filter((ele , index) => index != indexNumber - 1) ; 
    //         }
    //         else {
    //             let checkPrevValue = false ;
    //             for(let i = indexNumber -1 ; i >= 0 ; i--) {
    //                 if (
    //                     context.displayOperations[i]?.props?.className?.includes('rootValue') &&
    //                     context.displayOperations[i -1]?.props?.className?.includes('yValue') 
    //                 ) {
    //                     checkPrevValue = true ; 
    //                     break ; 
    //                 } 
    //             }

    //             if (checkPrevValue) arr = arr.filter((ele , index) => index !== indexNumber) ; 
    //             else arr = arr.filter((ele , index) => index !== indexNumber -1) ; 
    //         }

    //     }
    //     else arr = arr.filter((ele , index) => index !== indexNumber -1)  ;

    //     return arr.join(' ')  ;

    // }) 

    // context.setDisplayOperations(prev => {

    //     if (prev[indexNumber -1]?.props?.className?.includes('xElement')) {
    //         let separateIndex ; 
    //         for(let i = indexNumber -1 ; i < prev.length ; i++ ) {
    //             if (prev[i]?.props?.className === 'separate') {
    //                 separateIndex = i ; 
    //                 break ; 
    //             }
    //         }
    //         prev = prev.filter((ele , index) => index < indexNumber-1 || index > separateIndex) ; 
    //     }
    //     else if ( 
    //         prev[indexNumber -1]?.props?.className?.includes('xValue') && 
    //         !prev[indexNumber -2]?.props?.className?.includes('xValue')
    //     ) {

    //         prev = prev.map((ele , index) => {
    //             if (index === indexNumber -1) {
    //                 return <span className='xElement'></span>; 
    //             }
    //             else return ele ; 
    //         })
    //     }

    //     else if (prev[indexNumber -1]?.props?.className?.includes('yElement')) {
    //         const prevEleValue = prev[indexNumber -2]?.props?.children ; 
    //         if(prevEleValue) {
    //             prev.splice(indexNumber -2 , 2 , <span>{prevEleValue}</span> ) ; 
    //         }
    //         else { prev.splice(indexNumber -2 , 2)}
    //     }
    //     else if (
    //         (
    //             (prev[indexNumber -1]?.props?.className?.includes('yValue') &&
    //             !prev[indexNumber -2]?.props?.className?.includes('yValue')) ||
    //             prev[indexNumber -1]?.props?.className ==='separate'
    //         )
    //     ) {

    //         prev = prev.map((ele , index) => {
                
    //             if (index === indexNumber -1) {
    //                 if (prev[indexNumber + 1]?.props?.className?.includes('rootValue')) {
    //                     return <span className='power yElement exponent'></span>; 
    //                 }
    //                 if (prev[indexNumber + 1]?.props?.className?.includes('logValue')) {
    //                     return <span className='power yElement down'></span>; 
    //                 }
    //                 else return <span className='power yElement'></span>; 
    //             }
    //             else return ele ; 
    //         })
    //     }
    //     else if (
    //         (
    //             prev[indexNumber -1]?.props?.className  ===  'display-factorial' ||
    //             prev[indexNumber -1]?.props?.className  ===  'power_1'

    //         )  &&
    //         (isNaN(+prev[indexNumber -2]?.props?.children) || indexNumber === 1)
    //     ) {
            
    //         let classIs = prev[indexNumber -1]?.props?.className ; 
    //         prev = prev.map((ele , index) => {
    //             if (index === indexNumber -1) {
    //                 return <span className={`${classIs} xElement`}></span>;  
    //             }
    //             else return ele ; 
    //         })
    //     }

    //     else if (
    //         (
    //             prev[indexNumber -1]?.props?.className  ===  'display-factorial' ||
    //             prev[indexNumber -1]?.props?.className  ===  'power_1'

    //         ) &&
    //         (!isNaN(+prev[indexNumber -2]?.props?.children))
    //     ) {
    //         let classIs = prev[indexNumber -1]?.props?.className ;
    //         prev = prev.map((ele , index) => {
    //             if (index === indexNumber -1) {
    //                 return ;
    //             }
    //             else if (index === indexNumber -2) {
    //                 return <span className={`${classIs}`}>{ele?.props?.children}</span>
    //             }
    //             else return ele ; 
    //         })
    //     }
    //     else if (
    //         prev[indexNumber -1]?.props?.className === 'rootValue' && 
    //         prev[indexNumber -2]?.props?.className !== 'rootValue'
    //     ) {
    //         prev = prev.map((ele , index) => {
    //             if (index === indexNumber -1) {
    //                 return <span className='xElement rootValue'></span>; 
    //             }
    //             else return ele ; 
    //         })
    //     }

    //     else prev = prev.filter((ele , i) => i !== indexNumber -1) ; 

        
    //     return prev.filter(ele => ele !== undefined) ; 

    // }) ; 

    context.setOperation_content(prev => {
        let arr = 
        prev.split(' ')
        .map(ele => (!(isNaN(+ele)) && ele.length > 1) ? ele.split('') : ele !== '' ? ele : undefined)
        .filter(ele => ele !== undefined).flat() ; 

        let operationIndex ;

        // xLogY

        if (prevEle?.includes('yValue down')) {
            arr = arr.filter((ele , index) => index !== (indexNumber -1)) ; 
        }

        else if(prevEle?.includes('yElement down')) {
            operationIndex = arr.indexOf('xLogY') ; 
            let bracketIndex = arr.indexOf(')' , operationIndex) ; 
            if (arr[operationIndex -1] === ')') {
                arr = arr.filter((ele , index) => index > operationIndex -2 && index < bracketIndex) ; 
            }
            else arr = arr.filter((ele , index) => index > operationIndex && index < bracketIndex) ; 
        }

        // xPowerY
        else if (prevEle?.includes('xValue')) {
            operationIndex = arr.indexOf('xPowerY')
            arr = arr.filter((ele ,index) => index !== operationIndex -1)
        }
        else if (prevEle?.includes('xElement')) {
            operationIndex = arr.indexOf('xPowerY') ; 
            let bracketIndex ; 
            for(let i = 0 ; i < arr.length ; i++) {
                if (arr[i] === ')') {
                    bracketIndex = i ; 
                    break ; 
                }
            }
            
            arr = arr.filter((ele , index) => (index < operationIndex || index > bracketIndex))
        }
        else if (prevEle?.includes('yValue')) {
            operationIndex = arr.indexOf('xPowerY') ; 
            if (operationIndex > 0) arr = arr.filter((ele , index) => index !== indexNumber + 1) ; 
            else arr = arr.filter((ele , index) => index !== indexNumber) ; 
        }
        else if (prevEle?.includes('yElement')) {
            operationIndex = arr.indexOf('xPowerY') ; 
            arr.splice(operationIndex , 3) ; 
        }

        return arr.join(' ')  ;
    })

    context.setDisplayOperations(prev => {

        // xLogY
        if (prevEle?.includes('yValue down')) {
            if (
                !prev[indexNumber + 1]?.props?.className?.includes('yValue') &&
                !prev[indexNumber - 2 ]?.props?.className?.includes('yValue')
            ) {
                prev = prev.map((ele , index) => {
                    if (index === indexNumber -1) return <span className="power yElement down"></span> ; 
                    else return ele ; 
                }) 
            }
            else {
                prev = prev.filter((ele , index) => index !== indexNumber -1)
            }
        }
        else if (prevEle?.includes('yElement down')) {
            const bracketIndex = prev.findIndex(ele => ele.props?.children === ')') ;
            
            // don't cut from indexNumber -2 cause i will replace pre[indexNumber-2] by index Element in Calc.jsx file
            prev = prev.filter((ele , index) => index < indexNumber -1 || index > bracketIndex) ; 
        }

        // xPowerY
        else if (prevEle?.includes('xValue')) {
            prev = prev.map((ele , index) => {
                if (index === indexNumber -1) return <span className="xElement"></span> ; 
                else return ele ; 
            })
        }
        else if (prevEle?.includes('xElement')) {
            prev = prev.filter((ele , index) => index !== indexNumber -1 && index !== indexNumber + 1 && index !== indexNumber + 2)
        }
        else if (prevEle?.includes('yValue')) {
            if (!prev[indexNumber + 1]?.props?.className?.includes('yValue') && !prev[indexNumber - 2 ]?.props?.className?.includes('yValue')) {
                prev = prev.map((ele , index) => {
                    if (index === indexNumber -1) return <span className="power yElement"></span> ; 
                    else return ele ; 
                }) 
            }
            else {
                prev = prev.filter((ele , index) => index !== indexNumber -1)
            }
        }
        else if (prevEle?.includes('yElement')) {

            prev.splice(indexNumber + 1 , 1) ; 
            if (prev[indexNumber -2]?.props?.className?.includes('xValue')) {
                const prevEleValue = prev[indexNumber -2]?.props?.children ; 
                prev = prev.map((ele , index) => {
                    if (index === indexNumber -2) return <span>{prevEleValue}</span> ; 
                    else if (index !== indexNumber -1) return ele ; 
                })
            }
            else if (prev[indexNumber -2]?.props?.className?.includes('xElement')) {
                prev = prev.map((ele , index) => {
                    if ((index !== (indexNumber -2))  && (index !== (indexNumber -1))) return ele ; 
                    else return ; 
                })
            }
            else {
                prev = prev.filter((ele , index) => index !== indexNumber -1)
            }
        }
        else if (prevEle?.includes('separate')) {
            prev = prev.map((ele , index) => {
                if (index === indexNumber -1) return prev[indexNumber] ; 
                else if (index === indexNumber) return prev[indexNumber -1] ; 
                else return ele 
            })
        }
        else { prev = prev.filter((ele ,index) => index !== indexNumber -1)} ; 

        return prev.filter(ele => ele !== undefined) ; 

    })

}



// 166
// 207