import piIcon from './../assets/pi.png'
export default function showInScreen(e) {
    let value = [] ; 

    switch(e.currentTarget.value) {
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
        case ' division ' : 
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
                <span className='xElement factorialEle'></span> , 
                <span className='separate'></span>
            ) 
            break ; 
        case ' tenPower ' : 
            value.push(
                <span className="ten">10</span> , 
                <span className='power yElement powerTheTen'></span> , 
                <span className='separate'></span>
            )
            break ;
        case ' xPowerNOne ' : 
            value.push(
                <span className="xElement xPowerNOne"></span> ,
                <span className='separate'></span> 
            )
            break ; 
        case ' square-root ' : 
            value.push(
                <div className="xElement rootValue"></div> , 
                <span className='separate'></span>
            )
            break ;
        case ' anonymous-root ' : 
            value.push( 
                <span className="power yElement anonymousR"></span> , 
                <div className="xElement anonymousR"></div> ,
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
            value.push( <span className='bracketOperation'>sin(</span> ) 
            break ;
        case ' cos ' :
            value.push( <span className='bracketOperation'>cos(</span> ) 
            break ; 
        case ' tan ' :
            value.push( <span className='bracketOperation'>tan(</span> ) 
            break ;
        case ' ln ' :
            value.push( <span className='bracketOperation'>ln(</span> ) 
            break ; 
        case ' log ' :
            value.push( <span className='bracketOperation'>log(</span> ) 
            break ;
        case ' xLogY ' : 
            value.push(
                <span>log(</span> , 
                <span className='power yElement logEle'></span> , 
                <span className='xElement logEle'></span> , 
                <span className="closingOperation">)</span>
            )
            break ; 
        default :
            value.push(<span>{e.currentTarget.value.trim()}</span>) 
            break ;
    }

    return value ; 
}