export default function deleteOneEle(context) {
    
    const indexNumber = context.displayOperations?.findIndex(ele => ele?.props?.value === 'index') ; 

    context.setDisplayOperations(prev => {

        if ( 
            prev[indexNumber -1]?.props?.className?.includes('xValue') && 
            !prev[indexNumber -2]?.props?.className?.includes('xValue')
        ) {

            prev = prev.map((ele , index) => {
                if (index === indexNumber -1) {
                    return <span className='xElement'></span>; 
                }
                else return ele ; 
            })
        }

        else if (
            (
                prev[indexNumber -1]?.props?.className?.includes('yValue') ||
                prev[indexNumber -1]?.props?.className ==='separate'
            )
            && 
            !prev[indexNumber -2]?.props?.className?.includes('yValue')
        ) {

            prev = prev.map((ele , index) => {
                
                if (index === indexNumber -1) {
                    if (prev[indexNumber + 1]?.props?.className?.includes('rootValue')) {
                        return <span className='power yElement exponent'></span>; 
                    }
                    if (prev[indexNumber + 1]?.props?.className?.includes('logValue')) {
                        return <span className='power yElement down'></span>; 
                    }
                    else return <span className='power yElement'></span>; 
                }
                else return ele ; 
            })
        }
        // else if(prev[indexNumber -1]?.props?.className?.includes('yElement')) {

        // }
        else if (
            (
                prev[indexNumber -1]?.props?.className  ===  'display-factorial' ||
                prev[indexNumber -1]?.props?.className  ===  'power_1'

            )  &&
            (isNaN(+prev[indexNumber -2]?.props?.children) || indexNumber === 1)
        ) {
            
            let classIs = prev[indexNumber -1]?.props?.className ; 
            prev = prev.map((ele , index) => {
                if (index === indexNumber -1) {
                    return <span className={`${classIs} xElement`}></span>;  
                }
                else return ele ; 
            })
        }

        else if (
            (
                prev[indexNumber -1]?.props?.className  ===  'display-factorial' ||
                prev[indexNumber -1]?.props?.className  ===  'power_1'

            ) &&
            (!isNaN(+prev[indexNumber -2]?.props?.children))
        ) {
            let classIs = prev[indexNumber -1]?.props?.className ;
            prev = prev.map((ele , index) => {
                if (index === indexNumber -1) {
                    return ;
                }
                else if (index === indexNumber -2) {
                    return <span className={`${classIs}`}>{ele?.props?.children}</span>
                }
                else return ele ; 
            })
        }
        else if (
            prev[indexNumber -1]?.props?.className === 'rootValue' && 
            prev[indexNumber -2]?.props?.className !== 'rootValue'
        ) {
            prev = prev.map((ele , index) => {
                if (index === indexNumber -1) {
                    return <span className='xElement rootValue'></span>; 
                }
                else return ele ; 
            })
        }

        else prev = prev.filter((ele , i) => i !== indexNumber -1) ; 

        
        return prev.filter(ele => ele !== undefined) ; 

    }) ; 

    context.setOperation_content(prev => {

        const modifiedArr  = prev.split(' ').map(ele => {
            if (!(isNaN(+ele)) && ele.length > 1) {
                return ele.split('') ; 
            } else if(ele !== '') {
                return ele ; 
            }
        })

        let arr = modifiedArr.filter(ele => ele !== undefined).flat() ; 
        let prevEle = context.displayOperations[indexNumber -1]?.props?.className

        if ( 
            (prevEle?.includes('power') && !(context.displayOperations[indexNumber +1]?.props?.className?.includes('rootValue'))) || 
            prevEle?.includes('display-factorial') ||
            prevEle?.includes('power_1')
        ) {
            let checkPrevValue = false ;
            for(let i = indexNumber -1 ; i >= 0 ; i--) {
                if (
                    context.displayOperations[i]?.props?.className?.includes('yValue') &&
                    context.displayOperations[i -1]?.props?.className?.includes('xValue') 
                ) {
                    checkPrevValue = true ; 
                    break ; 
                } 
            }
            if (prevEle?.includes('display-factorial') || prevEle?.includes('power_1')) checkPrevValue = true ; 

            if (checkPrevValue) arr = arr.filter((ele , index) => index !== indexNumber) ; 
            else arr = arr.filter((ele , index) => index !== indexNumber -1) ; 

        } 
        
        // anonymous root
        else if (prevEle?.includes('power') || prevEle?.includes('rootValue')) {

            if (prevEle?.includes('power')) {
                arr = arr.filter((ele , index) => index != indexNumber - 1) ; 
            }
            else {
                let checkPrevValue = false ;
                for(let i = indexNumber -1 ; i >= 0 ; i--) {
                    if (
                        context.displayOperations[i]?.props?.className?.includes('rootValue') &&
                        context.displayOperations[i -1]?.props?.className?.includes('yValue') 
                    ) {
                        checkPrevValue = true ; 
                        break ; 
                    } 
                }

                if (checkPrevValue) arr = arr.filter((ele , index) => index !== indexNumber) ; 
                else arr = arr.filter((ele , index) => index !== indexNumber -1) ; 
            }

        }
        else arr = arr.filter((ele , index) => index !== indexNumber -1)  

        return arr.join(' ')  ;

    }) 
}