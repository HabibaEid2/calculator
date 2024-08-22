// display operations on screen

export default function getNum(e , context) {

    // get index of index element in screen
    const indexNumber = context.displayOperations?.findIndex(ele => ele?.props?.value === 'index') ; 
    
    let value = [] ; 
    switch(e.target.value) {
        case ' plus ' :
            value.push(<span>+</span>)
            break ; 
        case ' minus ' : 
            value.push(<span>-</span>)
            break ; 
        case ' multiplication ' : 
            value.push(
                <div>
                    <i className="fa-solid fa-x"></i>
                </div>
            )
            break ; 
        case ' divition ' : 
            value.push(
                <div>
                    <i className="bold fa-solid fa-divide"></i>
                </div>
            )
            break ;
        case ' xPowerY ' : 
            value.push( 
                <div className="xElement"></div> ,
                <div className="power yElement"></div> ,
                <div className='separate'></div> 
            )
            break ; 
        case ' factorial ' : 
            value.push( 
            <div className='xElement display-factorial'></div> , 
            <div className='separate'></div>) 
            break ; 
        case ' tenPower ' : 
            value.push(
                <span>10</span> , 
                <span className='power yElement'></span> , 
                <div className='separate'></div>
            )
            break ;
        case ' xPowerN1 ' : 
            value.push(
            <div className="xElement power_1"></div> ,
            <div className='separate'></div> 
            )
            break ; 
        case ' square-root ' : 
            value.push(
            
            <div className="xElement rootValue"></div> , 
            <div className='separate'></div>
            )
            break ;
        case ' anonymous-root ' : 
            value.push( 
            <div className="power yElement exponent"></div> , 
            // <img className='display-square-root' src={displayRootImg} alt=''/> , 
            <span className="xElement rootValue"></span> ,
            <div className="separate"></div>
        )
            break ; 
        case ' pi ' : 
            value.push(
                <div>
                    <img src={piIcon} alt="" />
                </div>
            )
            break ; 
        case ' sin ' :
            value.push( <span className='sin'>sin(</span> ) 
            break ;
        case ' cos ' :
            value.push( <span className='cos'>cos(</span> ) 
            break ; 
        case ' tan ' :
            value.push( <span className='tan'>tan(</span> ) 
            break ;
        case ' ln ' :
            value.push( <span className='tan'>ln(</span> ) 
            break ; 
        case ' log ' :
            value.push( <span className='tan'>log(</span> ) 
            break ;
        case ' xLogY ' : 
            value.push(
                <span>log(</span> , 
                <span className='power yElement down'></span> , 
                <span className='xElement logValue'></span> , 
                <span>)</span>
            )
            break ; 
        default :
            value.push(<span>{e.target.value.trim()}</span>) 
            break ;
    }
    context.setDisplayOperations(prev => {

        let arr = prev.slice(0 , indexNumber) ;
        
        let lastEleClass = arr[arr.length -1]?.props?.className
        
        if (lastEleClass?.includes('xElement')) {
            if (lastEleClass?.includes('display-factorial')) {
                arr[arr.length -1] =  <div className='display-factorial'>{e.target.value}</div> ; 
            }
            else if (lastEleClass?.includes('power_1')) {
                arr[arr.length -1] =  <div className='power_1'>{e.target.value}</div> ; 
            }
            else if(lastEleClass?.includes('rootValue')) {
                arr[arr.length -1] =  <span className='rootValue'>{e.target.value}</span> ; 
            }
            else if (lastEleClass?.includes('logValue')) {
                arr[arr.length -1] =  <span className='logValue'>{e.target.value}</span> ; 
            }
            else arr[arr.length -1] =  <span className='xValue'>{e.target.value}</span> ; 
        }
        else if (lastEleClass?.includes('xValue')) {
            // arr.push(<span className='xValue'>{e.target.value}</span>) ; 
            arr.push(value[value.length -1]) ; 
        }
        else if (lastEleClass?.includes('yElement')) {
            if(lastEleClass?.includes('exponent')) {
                arr[arr.length -1] = <span className='power yValue exponent'>{arr[arr.length -1]?.props?.children}</span> ; 
            }
            else if (lastEleClass?.includes('down')) {
                arr[arr.length -1] = <span className='power yValue down'>{e.target.value}</span> ;
            }
            else arr[arr.length -1] = <span className='power yValue'>{arr[arr.length -1]?.props?.children}</span> ; 
        }
        else if (lastEleClass?.includes('yValue')) {
            if (lastEleClass?.includes('down')) arr.push(<span className='power yValue down'>{e.target.value}</span>) ; 
            else arr.push(<span className='power yValue'>{e.target.value}</span>) ; 
        }
        else if (lastEleClass?.includes('display-factorial')) {

            // to put the exclamation icon after the last number of factorial
            const prevEle = arr[arr.length -1]?.props?.children ; 
            arr.splice(arr.length -1 , 1 ,[
                <span>{prevEle}</span> , 
                <div className='display-factorial'>{e.target.value}</div>
            ])
        }
        else if (lastEleClass?.includes('rootValue')) {
            arr.push(<span className='rootValue'>{e.target.value}</span>)
        }
        else if (lastEleClass?.includes('power_1')) {

            // to put the exclamation icon after the last number of factorial
            const prevEle = arr[arr.length -1]?.props?.children ; 
            arr.splice(arr.length -1 , 1 ,[
                <span>{prevEle}</span> , 
                <div className='power_1'>{e.target.value}</div>
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

        if (
            arr.includes('xPowerY') || arr.includes('factorial') ||
            arr.includes('xPowerN1') || arr.includes('square-root') || 
            arr.includes('anonymous-root') || arr.includes('xLogY')
        ) {

            if(value?.className?.includes('display-factorial') || arr.includes('xPowerN1') || arr.includes('square-root')) {
                arr.splice(indexNumber + 1 , 0 , e.target.value) ; 
            }
            else if (arr.includes('xPowerY') || arr.includes('anonymous-root') || arr.includes('xLogY')) {
                const type = arr.includes('xPowerY') ? 'xPowerY' : arr.includes('anonymous-root') ? 'anonymous-root' : 'xLogY' ; 
                const index = arr.filter(ele => ele !== '').findIndex(ele => ele === type) ; 


                if (value?.className?.includes('rootValue')) {
                    if (isNaN(arr[index -1])) {
                        arr.splice(indexNumber , 0 , e.target.value) ; 
                    }

                    else arr.splice(indexNumber + 1 , 0 , e.target.value) ; 
                }
                else if (value?.className?.includes('exponent')) {
                    if(value?.className?.includes('yElement')) {
                        arr.splice(index== 0? index : index - 1 , 0 , e.target.value) ; 
                    }
                    else if (value?.className?.includes('yValue')) {
                        arr.splice(indexNumber - 1 ,0 , e.target.value) ; 
                    }
                }
                else if (value?.className?.includes('logValue')) {
                    if (isNaN(arr[index -1])) {
                        if (value?.className.includes('xElement')) {
                            arr.splice(indexNumber - 2 ,0 , e.target.value) ; 
                        }
                        else {
                            arr.splice(indexNumber - 1 ,0 , e.target.value) ; 
                        }
                    }
                    else {
                        if (value?.className.includes('xElement')) {
                            arr.splice(indexNumber - 1 ,0 , e.target.value) ; 
                        }
                        else {
                            arr.splice(indexNumber ,0 , e.target.value) ; 
                        }
                    }
                }
                else if (value?.className?.includes('down')) {
                    arr.splice(index , 0 , e.target.value) ; 
                }
                else if (value?.className?.includes('xElement')) {
                    arr.splice(index , 0 , e.target.value) ; 
                }

                else if(value?.className?.includes('yElement')) {
                    arr.splice(index + 1 , 0 , e.target.value) ; 
                }
                else if (value?.className?.includes('yValue')) {
                    arr.splice(indexNumber + 1 ,0 , e.target.value) ; 
                }
                else arr.splice(indexNumber ,0 , e.target.value) ; 
            }
            else arr.splice(indexNumber ,0 , e.target.value) ; 
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