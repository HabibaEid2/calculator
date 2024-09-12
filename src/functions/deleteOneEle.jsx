export default function deleteOneEle(context) {
    
    const indexNumber = context.displayOperations?.findIndex(ele => ele?.props?.value === 'index') ; 
    let prevEle = context.displayOperations[indexNumber -1]?.props?.className ; 
    const xElementCount = context.displayOperations.slice(0 , indexNumber)
        .filter(ele => ele.props?.className?.includes('xElement') || ele.props?.className?.includes('yElement') ).length ;
        
    const separateCount = context.displayOperations.slice(0 , indexNumber)
        .filter(ele => ele.props?.className?.includes('separate')).length ;

    // Example : log ( 6 )
    const operationBracket = context.displayOperations.slice(0 , indexNumber)
        .filter(ele => ele.props?.className?.includes('closingOperation')).length ;

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

    context.setOperation_content(prev => {
        let arr = prev.split(' ')
        .map(ele => (!(isNaN(+ele)) && ele.length > 1) ? ele.split('') : ele !== '' ? ele : undefined)
        .filter(ele => ele !== undefined).flat() ; 
        let operationIndex ;

        // xLogY and anonymousR
        if(
            prevEle?.includes('xElement logEle') || prevEle?.includes('yElement logEle') ||
            prevEle?.includes('xElement anonymousR') || prevEle?.includes('yElement anonymousR') ||
            (context.displayOperations[indexNumber -1]?.props?.children === 'log(' &&
            context.displayOperations[indexNumber + 1]?.props?.className?.includes('logEle'))
        ) {
            operationIndex = prevEle?.includes('anonymousR') ? arr.indexOf('anonymous-root') : arr.indexOf('xLogY') ; 
            const closingBracket = arr.indexOf(')' , operationIndex) ; 
            const openingBracket = arr.slice(0 , operationIndex).lastIndexOf('(') ; 
            arr = arr.filter((ele , index) => !(index >= openingBracket && index <= closingBracket)) ; 
        }
        else if (prevEle?.includes('xValue logEle')) {
            arr = arr.filter((ele , index) => 
                index !== ((indexNumber - 1) + additionalCount - 1 - (separateCount + xElementCount + operationBracket))) ;
        }
        else if (prevEle?.includes('yValue logEle')) {
            arr = arr.filter((ele , index) => 
                index !== ((indexNumber - 1) + additionalCount - 4 - (separateCount + xElementCount + operationBracket))) ;
        }
        else if(prevEle?.includes('yValue anonymous')) {
            arr = arr.filter((ele, index) => 
                index !== ((indexNumber -1) + additionalCount - 4 - (separateCount + xElementCount + operationBracket)))
        }

        // Ten Power and (sin , cos , tan , ln , log)
        else if (prevEle?.includes('ten') || prevEle === 'bracketOperation') {
            const equation = (indexNumber -1) + additionalCount - 2 - (xElementCount + separateCount + operationBracket) ;
            const closingBracket = arr.indexOf(')' , equation) ; 
            arr = arr.filter((ele , index) => !(index >= equation && index <= closingBracket))
        }
        else if (
            prevEle?.includes('yValue powerTheTen') || prevEle?.includes('bracketOperationValue') ||
            prevEle?.includes('xValue anonymous') || prevEle?.includes("xValue rootValue") ||
            prevEle?.includes('yValue')
        ) {
            arr = arr.filter((ele , index) => 
                index !== (indexNumber -1) + additionalCount -1 - (xElementCount + separateCount + operationBracket)) ; 
        }
        else if (prevEle?.includes('yElement powerTheTen')) {
            operationIndex = arr.indexOf('tenPower') ;
            arr = arr.filter((ele , index) => index !== operationIndex  && index !== operationIndex +1 && index !== operationIndex +2)
        }

        // Factorial and X Power -1
        else if (
            (prevEle?.includes('xValue factorialEle')  || prevEle?.includes('xValue xPowerNOne'))) {
            const operation = prevEle?.includes('factorialEle') ? 'factorial' : 'xPowerNOne' ; 
            operationIndex = arr.indexOf(operation) ; 
            if (arr[operationIndex -1] === ')') {
                const openingBracket = arr.slice(0 , operationIndex).lastIndexOf('(') ; 
                arr = arr.filter((ele, index) => !(index >= openingBracket && index < operationIndex))
            }
            else arr = arr.filter((ele , index) => 
                index !== ((indexNumber - 1) + additionalCount - 1 - (separateCount + xElementCount + operationBracket))); 
        }

        // Square Root
        else if (prevEle?.includes('xElement rootValue')) {
            operationIndex = arr.indexOf('square-root')
            arr = arr.filter((ele, index) => index !== operationIndex && index !== operationIndex + 1 && index !== operationIndex + 2)
        }

        // X Power Y
        else if (prevEle?.includes('xElement') && !prevEle?.includes('factorialEle') && !prevEle?.includes('xPowerNOne')) {
            operationIndex = arr.indexOf('xPowerY') ; 
            const bracketIndex = arr.indexOf(')' , operationIndex)
            arr = arr.filter((ele , index) => (index < operationIndex || index > bracketIndex))
        }
        else if (prevEle?.includes('xValue') && !prevEle?.includes('factorialEle') && !prevEle?.includes('xPowerNOne')) {
            arr = arr.filter((ele ,index) => 
                index !== (indexNumber - 1) + additionalCount - 3 - (xElementCount + separateCount + operationBracket))
        }
        else if (prevEle?.includes('yElement')) {
            operationIndex = arr.indexOf('xPowerY') ; 
            let openingBracket ; 
            let closingBracket ; 
            if (arr[operationIndex -1] === ')') openingBracket = arr.slice(0 , operationIndex).lastIndexOf('(') ; 
            if (arr[operationIndex + 1] === '(') closingBracket = arr.indexOf(')' , operationIndex) ; 

            arr = arr.filter((ele , index) => 
                (openingBracket !== undefined && closingBracket !== undefined) ? !(index >= openingBracket && index <= closingBracket) : 
                openingBracket ? !(index >= openingBracket && index <= operationIndex ) :
                closingBracket ? !(index >= operationIndex && index <= closingBracket) : index !== operationIndex 
            )
        }
        
        // separate 
        else if (prevEle?.includes('separate')) arr = arr ; 

        // contain bracket
        else if (
            context.displayOperations[indexNumber -1]?.props?.children === ')' && 
            context.displayOperations[indexNumber -2]?.props?.className?.includes('logEle')
        ) {
            operationIndex = arr.slice(0 , indexNumber).lastIndexOf('xLogY') ; 
            const openingBracket = arr.slice(0 , operationIndex).lastIndexOf('(') ; 
            const closingBracket = arr.indexOf(')' , operationIndex) ;  
            arr = arr.filter((ele , index) => !(index >= openingBracket && index <= closingBracket))
        }
        else if (context.displayOperations[indexNumber -1]?.props?.children === ')' && prevEle?.includes('closingOperation')) {
            const equation = (indexNumber -1) + additionalCount - (xElementCount + separateCount + operationBracket)
            const operationIndex = arr.slice(0 , equation ).findLastIndex(ele => ele?.includes('(')) ; 
            arr = arr.filter((ele , index) => !(index >= operationIndex -1 && index <= equation) )
        }
        else  arr = arr.filter((ele, index) => index !== (indexNumber -1) + additionalCount - (xElementCount + separateCount + operationBracket)) ;

        arr = arr.join(' ').split('') ; 
        arr = arr.filter((ele, index) =>  
            !(ele === ' ' && !isNaN(arr[index - 1]) && !isNaN(arr[index + 1]))).join('')

        return arr ;
    })

    context.setDisplayOperations(prev => {

        // xLogY
        if (prevEle?.includes('xValue logEle')) {
            prev = prev.map((ele , index) => {
                if (
                    index === indexNumber -1 &&
                    !prev[indexNumber -2]?.props?.className?.includes('xValue') &&
                    !prev[indexNumber + 1]?.props?.className?.includes('xValue')
                ) {
                    return <span className="xElement logEle"></span>
                }
                else if (index !== indexNumber -1) return ele ; 
            })
        }
        else if(prevEle?.includes('xElement logEle') || prevEle?.includes('yElement logEle')) {
            const operation = prev.slice(0 , indexNumber).findLastIndex(ele => ele.props?.children === 'log(') ; 
            const closingBracket = prev.findIndex(ele => ele.props?.children === ')' , indexNumber) ;
            prev = prev.filter((ele , index) => !(index >= operation && index <= closingBracket) || index === indexNumber)
        }
        else if (prevEle?.includes('yValue logEle')) {
            if (
                !prev[indexNumber + 1]?.props?.className?.includes('yValue') &&
                !prev[indexNumber - 2 ]?.props?.className?.includes('yValue')
            ) {
                prev = prev.map((ele , index) => {
                    if (index === indexNumber -1) return <span className="power yElement logEle"></span> ; 
                    else return ele ; 
                }) 
            }
            else {
                prev = prev.filter((ele , index) => index !== indexNumber -1)
            }
        }
        else if (prev[indexNumber -1]?.props?.children === 'log(' && prev[indexNumber + 1]?.props?.className?.includes('logEle')) {
            const closingBracket = prev.findIndex((ele, index) => 
                ele .props?.className?.includes('closingOperation') && index > indexNumber
            )
            prev = prev.filter((ele, index) => 
                !(index >= indexNumber -1 && index <= closingBracket) || index === indexNumber
            )
        }
        
        // tenPower 

        else if (prevEle?.includes('ten')) {
            const separateIndex = prev.findIndex((ele , index) => ele.props?.className === 'separate' && index > indexNumber) ; 
            prev = prev.filter((ele , index) => !(index >= indexNumber -1 && index <= separateIndex ) || index === indexNumber)
        }
        else if (prevEle?.includes('yValue powerTheTen')) {
            if (
                !prev[indexNumber + 1]?.props?.className?.includes('yValue') &&
                !prev[indexNumber - 2 ]?.props?.className?.includes('yValue')
            ) {
                prev = prev.map((ele , index) => {
                    if (index === indexNumber -1) return <span className="power yElement powerTheTen"></span> ; 
                    else return ele ; 
                }) 
            }
            else {
                prev = prev.filter((ele , index) => index !== indexNumber -1)
            }
        }
        else if (prevEle?.includes('yElement powerTheTen')) {
            prev = prev.filter((ele , index) => {
                return index !== indexNumber -1 && index !== indexNumber -2 && index !== indexNumber + 1
            })
        }

        // Factorial and X Power -1
        else if (prevEle?.includes('xValue factorialEle') || prevEle?.includes('xValue xPowerNOne')) {
            const operation = prevEle?.includes('factorialEle') ? 'factorialEle' : 'xPowerNOne' ;  
            let openingBracket;
            if (prev[indexNumber -1]?.props?.children?.includes(')')) {
                openingBracket = prev.slice(0 , indexNumber).findLastIndex(ele => ele.props?.children.includes('(')) ; 
            }

            prev = prev.map((ele , index) => {
                if ( (openingBracket === undefined && index === indexNumber -1) ||  (openingBracket !== undefined && ele.props?.children?.includes('('))) {
                    return <span className= {`xElement ${operation}`} ></span>;  
                } 
                else if (openingBracket !== undefined && index >= openingBracket && index <= indexNumber -1) return ; 
                else return ele ; 
            })
        }
        else if (prevEle?.includes('xElement factorialEle') || prevEle?.includes('xElement xPowerNOne')) {
            prev = prev.filter((ele , index) => index !== indexNumber -1)
        }
        
        // anonymous-root 
        else if (prevEle?.includes('xElement anonymousR')) { 
            const firstPowerEle = prev.slice(0 , indexNumber).findLastIndex((ele , index) => 
                ele.props?.className?.includes('yElement anonymousR') || ele.props?.className?.includes('yValue anonymousR')); 
            prev = prev.filter((ele, index) => !(index >= firstPowerEle && index <= indexNumber + 1) || index === indexNumber) ; 
        }
        else if (prevEle?.includes('anonymousR firstRootEle') && !prev[indexNumber + 1]?.props?.className?.includes('anonymousR')) {
            prev = prev.map((ele , index) => {
                if (index === indexNumber -1) return <span className="xElement anonymousR"></span> ; 
                else return ele ; 
            })
        }
        else if (prevEle?.includes('anonymousR firstRootEle') && prev[indexNumber + 1]?.props?.className?.includes('anonymousR')) {
            prev = prev.map((ele , index) => {
                if (index === indexNumber + 1 && ele?.props?.className.includes('anonymousR')) {
                    return <div className= 'xValue anonymousR firstRootEle'>{ele?.props?.children}</div>
                }
                else if (index !== indexNumber -1) return ele ; 
            })
        }
        else if (prevEle?.includes('yElement anonymousR')) {
            const lastAnonyEle = prev.findIndex((ele, index) => 
                index > indexNumber && ele.props?.className?.includes('anonymousR') && prev[index + 1]?.props?.className === 'separate'
            )

            prev = prev.filter((ele, index) => !(index >= indexNumber -1 && index <= lastAnonyEle + 1) || index === indexNumber)
        }

        // square-root
        else if (prevEle?.includes('firstRootEle') && !prev[indexNumber + 1]?.props?.className?.includes('rootValue')) {
            prev = prev.map((ele , index) => {
                if (index === indexNumber -1) return <span className="xElement rootValue"></span> ; 
                else return ele ; 
            })
        }
        else if (prevEle?.includes('firstRootEle') && prev[indexNumber + 1]?.props?.className?.includes('rootValue')) {
            prev = prev.map((ele , index) => {
                if (index === indexNumber + 1 && ele?.props?.className.includes('rootValue')) {
                    return <div className= 'xValue rootValue firstRootEle'>{ele?.props?.children}</div>
                }
                else if (index !== indexNumber -1) return ele ; 
            })
        }
        else if (prevEle?.includes('rootValue')) {
            prev = prev.filter((ele , index) => index !== indexNumber -1)
        }
        
        // sin , cos , tan , ln , log
        else if (prevEle === 'bracketOperation') {
            if (prev[indexNumber + 1]?.props?.children === ')') {
                prev = prev.filter((ele , index) => index !== indexNumber -1 && index !== indexNumber + 1)
            }
            else prev = prev.filter((ele , index) => index !== indexNumber -1 )
        }

        // xPowerY
        else if (prevEle?.includes('xValue') && !prevEle?.includes('anonymous')) {
            let openingBracket ; 
            if (prev[indexNumber -1]?.props?.children === ')') {
                openingBracket = prev.slice(0 , indexNumber).findLastIndex(ele => ele.props?.children === '(') ; 
            }
            prev = prev.map((ele, index) => {
                if (index === openingBracket || (index === indexNumber -1 && !openingBracket)) return <span className="xElement"></span> ; 
                else if (!(index > openingBracket && index <= indexNumber -1)) return ele ; 
            })
        }
        else if (prevEle?.includes('xElement')) {
            prev = prev.filter((ele , index) => index !== indexNumber -1 && index !== indexNumber + 1 && index !== indexNumber + 2)
        }
        else if (prevEle?.includes('yValue')) {
            const isAnonymousPower = prev[indexNumber + 1]?.props?.className.includes('anonymousR') ; 
            if (
                !prev[indexNumber + 1]?.props?.className?.includes('yValue') && 
                !prev[indexNumber - 2 ]?.props?.className?.includes('yValue')
            ) {
                prev = prev.map((ele , index) => {
                    if (index === indexNumber -1) return <span className={`power yElement ${isAnonymousPower && 'anonymousR'}`}></span> ; 
                    else return ele ; 
                }) 
            }
            else {
                prev = prev.filter((ele , index) => index !== indexNumber -1)
            }
        }
        else if (prevEle?.includes('yElement')) {

            prev = prev.filter((ele, index) => index !== indexNumber + 1)
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
        // contain bracket
        else if(prev[indexNumber -1]?.props?.children === ')' && prevEle?.includes('closingOperation')) {
            const operationIndex = prev.slice(0 , indexNumber ).findLastIndex(ele => ele.props?.children?.includes('(')) ; 
            prev = prev.filter((ele , index) => !(index >= operationIndex && index < indexNumber) )
        }
        else prev = prev.filter((ele ,index) => index !== indexNumber -1) ; 

        return prev.filter(ele => ele !== undefined) ; 

    })
}