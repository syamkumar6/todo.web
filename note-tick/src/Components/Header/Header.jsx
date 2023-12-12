import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import userIcon from "../../assets/User.svg"
import userIcon2 from "../../assets/User2.svg"
import CloseIcon from "../../assets/NavClose.svg"
import MenuIcon from "../../assets/Menu.svg"
import axios from 'axios'


function Header() {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth.authStatus)
  const user = useSelector((state) => state.auth.user)
  const baseURL = import.meta.env.VITE_BASE_URL

  const logout = () => {
    axios.post(`${baseURL}/users/logout`)
      .then(res => {
        if (res.data.Status === 'Success') {
          navigate('/login');
          window.location.reload(true);
        } else {
          console.error('Logout failed:', res.data);
        }
      })
      .catch(err => console.error('Error during logout:', err));
  };
        
  useEffect(() => {
  if (auth && user) {
    navigate('/todos');
  }
  }, [auth, user]);

  return (<div className='relative'>
    <div className={`fixed top-0 right-0 w-3/4 h-full bg-white z-40 transition-all duration-300 ${drawerVisible? 'translate-x-0': 'translate-x-full'}`} >
      <button onClick={()=>{setDrawerVisible(false)}} className='w-12 absolute top-6 right-6'>
        <img src={CloseIcon} alt="" className='w-full ' />
      </button>
       <nav>
        <ul className='h-screen flex flex-col justify-center  items-center gap-6'>

          <li className='p-3'>
            <Link to={'/'} onClick={()=>{setDrawerVisible(false)}}>
              Home
            </Link>
          </li>
          <li className='p-3'>
            <Link to={'#'} onClick={()=>{setDrawerVisible(false)}}>
              About
            </Link>
          </li>
          {
            auth?
            <>

            <li className='p-4'>
             <Link to={'/todos'} onClick={()=>{setDrawerVisible(false)}}>
              Todos
             </Link>
            </li>

            <Link to={'/todos'} className='flex flex-row gap-1 mb-1' onClick={()=>{setDrawerVisible(false)}}>
              <img src={userIcon2} alt="Profile Icon" />
              <span>{user.name}</span>
            </Link>

            <button onClick={logout} className='text-white bg-red-500  px-2 rounded hover:bg-white hover:text-red-500'>
             log out
            </button>

            </>
            :
            <Link to={'/login'}>
              Login
            </Link>
          }

        </ul>
       </nav>
    </div>
    
    <header className='h-20 flex flex-row justify-between items-center px-8 shadow-lg fixed top-0 w-screen z-30 bg-purple-600'>
      <span className='text-3xl font-bold text-white pl-6'>Note Tick</span>

      <nav className='hidden lg:block'>
        <ul className='flex flex-row gap-6  font-bold text-slate-100 pr-6'>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'#'}>About</Link>
          </li>
          {
            auth?
            <>
            <li>
             <Link to={'/todos'}>Todos</Link>
            </li>
            <Link to={'/todos'} className='flex flex-row gap-1 '>
              <img src={userIcon} alt="Profile Icon" />
              <span>{user.name}</span>
            </Link>
            <button onClick={logout} className='text-white border px-2 rounded hover:bg-white hover:text-purple-500'>
             log out
            </button>
            </>
            :
            <Link to={'/login'}>
              Login
            </Link>
          }
        </ul>
      </nav>

      <button onClick={()=>{setDrawerVisible(true)}} className='w-10 lg:hidden'>
        <img src={MenuIcon} alt="Menu icon image" className='w-full'/>
      </button>

     </header>
  </div>
    
  )
}

export default Header
