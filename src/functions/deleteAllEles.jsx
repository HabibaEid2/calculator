export default function deleteAllEles(context) {
    context.setResult('0')
    context.setDisplayOperations(prev => prev.filter(ele => ele.props.value === 'index')) ; 
    context.setOperation_content('') ; 
}