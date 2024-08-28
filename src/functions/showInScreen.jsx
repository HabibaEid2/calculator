export default function showInScreen(e) {
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
                <span className="xElement"></span> ,
                <span className="power yElement"></span> ,
                <span className='separate'></span> 
            )
            break ; 
        case ' factorial ' : 
            value.push( 
                <span className='xElement display-factorial'></span> , 
                <span className='separate'></span>
            ) 
            break ; 
        case ' tenPower ' : 
            value.push(
                <span>10</span> , 
                <span className='power yElement'></span> , 
                <span className='separate'></span>
            )
            break ;
        case ' xPowerN1 ' : 
            value.push(
                <span className="xElement power_1"></span> ,
                <span className='separate'></span> 
            )
            break ; 
        case ' square-root ' : 
            value.push(
                <span className="xElement rootValue"></span> , 
                <span className='separate'></span>
            )
            break ;
        case ' anonymous-root ' : 
            value.push( 
                <span className="power yElement exponent"></span> , 
                <span className="xElement rootValue"></span> ,
                <span className="separate"></span>
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

    return value ; 
}