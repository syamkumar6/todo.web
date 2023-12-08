import { useEffect }  from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { addAuth, addUser } from '../Readux/Features/AuthSlice';
import { useDispatch } from 'react-redux';



const initialValues = {
    email: "",
    password: ""
}
const SignInSchema = Yup.object({
    email: Yup.string().email().required("Please Enter Your Email"),
    password: Yup.string().min(6).required("Please Enter Your Password")
})

function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_BASE_URL

    axios.defaults.withCredentials = true
      useEffect(() => {
          axios.post(`${baseURL}/users/verify`)
          .then(res => {
              if(res.data.Status === "Verify-Success") {
                dispatch(addAuth(true))
                dispatch(addUser(res.data.user))
              }else{
                alert(res.data.Meassage)
              }
          })
      }, [])

    const Formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignInSchema,
        onSubmit:(values) => {
           axios.defaults.withCredentials = true
           axios.post(`${baseURL}/users/login`,({values}),{ timeout: 5000 })
           .then(res => {
            if(res.data.Status === "success"){
                navigate('/todos'); 
                toast.success("Wellcome back!")
            }else{
                console.log(res.data.Message)
            }
           })
           .catch(err => {
            console.log(err)
            toast.error("Login failed. Please check your details")
           })
        }
    })

  return (
    <main className='relative'>
        <section className='absolute top-0 left-0 w-full h-full'>
            <div className='flex flex-col gap-8 lg:grid grid-cols-2 place-content-center m-8 shadow-2xl border border-gray-200 rounded-md h-4/5'>
            <div className='h- flex flex-col justify-center items-center '>
            <form onSubmit={Formik.handleSubmit} className='flex flex-col gap-4'>
            <h2 className='text-xl text-center font-semibold text-slate-500'>Login</h2>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='uppercase text-sm font-semibold text-slate-500'>Email</label>
                    <input type="email" name='email' id='email' className='w-100 p-1 rounded outline-none border-2 border-purple-100'
                    required
                    value={Formik.values.email}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                    {Formik.errors.email && Formik.touched.email ? (
                    <p p className='text-sm text-red-500 font-semibold'>{Formik.errors.email}</p>) : null}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="password" className='uppercase text-sm font-semibold text-slate-500'>Password</label>
                    <input type="password" name='password' id='password' className='w-100 p-1 rounded outline-none border-2 border-purple-100'
                    required
                    value={Formik.values.password}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}/>
                    {Formik.errors.password && Formik.touched.password ? (
                    <p className='text-sm text-red-500 font-semibold'>{Formik.errors.password}</p>) : null}
                </div>
                <Link to={'#'} className='text-xs self-end text-blue-400'>Forgot your password?</Link>
                <button type='submit' className='bg-purple-600 py-1 px-2 rounded text-white font-semibold hover:bg-purple-500'>Login</button>
            </form>
            </div>
            <div className='flex flex-col justify-center items-center gap-4 mr-8'>
                <div className='flex flex-col'>
                   <span className='text-2xl font-semibold text-slate-500 mb-2'>or Create an account</span>
                   <Link to={'/sign-up'} className='bg-purple-600 p-2 rounded text-white font-semibold hover:bg-purple-500 self-start'>Sign up free</Link>  
                </div>
                <img src="https://app.merlincdn.com/static/media/login-page-image.3d91b0d9.png" alt="Sign up page image" className='w-64 lg:w-100 max-w-sm'/>
            </div>
            </div>
            
        </section>
    </main>
  )
}

export default LoginPage