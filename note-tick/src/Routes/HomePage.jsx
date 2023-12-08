
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BG from '../assets/homeBG.jpg'
import arrow from '../assets/arrowR.svg'

function HomePage() {
  const auth = useSelector((state) => state.auth.authStatus)
  return (
    <main className='flex justify-center items-center lg:grid grid-cols-2'>
      <div className='h-full  flex flex-col justify-center items-center gap-8 lg:gap-0 pl-8 px-2 bg-cover bg-center'>
        <h1 className='text-7xl font-bold text-slate-700  opacity-90'>See what you can achieve!</h1>
        <p className='text-2xl font-semibold text-gray-500 my-4 '>Task management, time tracking and billing for freelancers, consultants and teams.</p>
        {
          auth?
          ""
          :
          <Link to={'/sign-up'} className='relative bg-purple-600 px-4 py-2 rounded text-white text-xl font-semibold hover:bg-purple-500 m-6 self-start flex items-center'>
            GET START 
            <img src={arrow} alt="" className='pl-2'/>
          </Link>
        }
        
        
      </div>
      <div className='hidden lg:flex h-full items-center justify-center '>
        <img src={BG} alt="" className='w-full max-w-md'/>
      </div>
    </main>
  )
}

export default HomePage