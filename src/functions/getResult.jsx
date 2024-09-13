import { toast } from "react-toastify";

export default function getResult(problem) {

    let result ; 

    for(let i = 0 ; i < problem.length ; i++) {

        if (i === 0 && !isNaN(problem[i])) {
            result = +problem[0] ; 
        }
        else {
            switch(problem[i]) {
                case 'multiplication' : 
                    result *= +problem[i + 1]
                    break ; 
                case 'plus' : 
                    result += +problem[i + 1] ; 
                    break ; 
                case 'minus' : 
                    result -= +problem[i + 1] ; 
                    break ; 
                case 'division' :  
                    result /= +problem[i + 1] ; 
                    break ; 
                case 'xPowerY' : 
                    result = Math.pow(result , problem[i + 1])
                    break ;
                case 'factorial' : 
                    result = +problem[i - 1]; 
                    for(let i = result-1 ; i >= 1 ; i--) {
                        result *= i ; 
                    }
                    break ; 
                case 'tenPower' : 
                    result = Math.pow(10 , +problem[i + 1]) ; 
                    break ; 
                case 'xPowerNOne' : 
                    result = Math.pow(+problem[i - 1] , -1) ; 
                    break ; 
                case 'square-root' : 
                    result = Math.sqrt(+problem[i + 1]) ; 
                    break ; 
                case 'anonymous-root' : 
                    result = Math.pow(+problem[i +1] , (1/+problem[i -1])) ; 
                    break ;
                case 'sin' : 
                    // make the equation Math.PI * (+problem[i + 1]/180) to make the number read as a degree not a radian
                    result = Math.sin(Math.PI * (+problem[i + 1]/180)).toFixed(2) ; 
                    break ; 
                case 'cos' : 
                    result = Math.cos(Math.PI * (+problem[i + 1]/180)).toFixed(2) ; 
                    break ; 
                case 'tan' : 
                    result = Math.tan(Math.PI * (+problem[i + 1]/180)).toFixed(2) ; 
                    break ;
                case 'ln' : 
                    result = Math.log(+problem[i + 1]).toFixed(2) ; 
                    break ; 
                case 'log' : 
                    result = Math.log10(+problem[i + 1]).toFixed(2) ; 
                    break ; 
                case 'pi' : 
                    result = 3.14 ; 
                    break ;
                case 'xLogY' : 
                    // the formula of finding the log of specific base is (Math.log(number) / Math.log(base))
                    result = (Math.log(+problem[i + 1]) / Math.log(+problem[i - 1])).toFixed(3) ; 
                    break ; 
            }
        }
    }

    if (isNaN(result)) {
        toast.error('write equation correctly!') ; 
        return 'NaN'
    }
    else return ` ${Number.isInteger(+result) ? result : (result).toFixed(3)} ` ; 
}