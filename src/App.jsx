import './constant/css/all.min.css'
import './App.css'
import Calc from './components/Calc'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // const notify = () => toast.warning("This is a toast notification !");
	// return (
	// <div>
  //       <button onClick={notify}>Notify !</button>
  //       <ToastContainer position='top-center' />
  //     </div>
  //   )

  return (
    <Calc/>
  )
}

export default App
