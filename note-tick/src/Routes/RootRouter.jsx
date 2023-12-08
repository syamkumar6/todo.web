import { Toaster } from 'react-hot-toast';
import Header from '../Components/Header/Header';
import { Outlet } from 'react-router-dom';

function RootRouter() {
  return (
    <>
     <Header/>
     <Outlet/>
     <footer className=' flex flex-row justify-between items-center p-4 bg-slate-200 text-xs'>
      <span>&copy;2023 Note-Tick</span>
      <span>Made by <span className='text-purple-600 font-semibold'>Team Note-Tick</span></span>
     </footer>
     <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default RootRouter