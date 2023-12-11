import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios';
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: ""
}
const SignInSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please Enter Your Email"),
  password: Yup.string().min(6).required("Please Enter Your Password"),
  confirm_password: Yup.string().required().oneOf([Yup.ref('password'),null], "Password must match"),
})

function SignUpPage() {
  const baseURL = import.meta.env.VITE_BASE_URL
  const navigate = useNavigate()
  const Formik = useFormik({
      initialValues: initialValues,
      validationSchema: SignInSchema,
      onSubmit: (values) => {
         axios.defaults.withCredentials = true
         axios.post(`${baseURL}/users/sign-up`,({values}))
         .then(res => {
          if(res.data.Status === "Sign-Up Success"){
              toast.success("Sign-Up Success")
              navigate('/login')
          }else{
              toast.error(res.data.Message)
          }
          REACT_APP_STRIPE_KEY
          STRIPE_KEY  "pk_test_51OAAOASFQwpcGAJ8SpwclfoIvL35iOygiV4zpqBR9iJdHlcFwcCDY4tijf1mVaSKdVfKG1wp25hEQz0tEb8Wis5c005COTxi15"
         })
      }
  })
  return (
    <main className='relative'>
      <section className='absolute top-0 left-0 w-full h-full'>
        <div className='flex flex-col gap-8 lg:grid grid-cols-2 place-content-center m-8 shadow-2xl border border-gray-200 rounded-md h-4/5'>
        <div className=' flex flex-col justify-center items-center '>
            <form onSubmit={Formik.handleSubmit} className='flex flex-col gap-4 w-64 '>
              <h2 className='text-xl text-center font-semibold text-slate-500'>Sign up free</h2>
                <div className='flex flex-col'>
                    <label htmlFor="name" className='uppercase text-sm font-semibold text-slate-500'>Name</label>
                    <input type="text" name='name' id='name' className='w-100 p-1 rounded outline-none border-2 border-purple-100'
                    required
                    value={Formik.values.name}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                    {Formik.errors.name && Formik.touched.name ? (
                    <p className='text-sm text-red-500 font-semibold'>{Formik.errors.name}</p>) : null}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='uppercase text-sm font-semibold text-slate-500'>Email</label>
                    <input type="email" name='email' id='email' className='w-100 p-1 rounded outline-none border-2 border-purple-100'
                    required
                    value={Formik.values.email}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                    {Formik.errors.email && Formik.touched.email ? (
                    <p className='text-sm text-red-500 font-semibold'>{Formik.errors.email}</p>) : null}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className='uppercase text-sm font-semibold text-slate-500'>Password</label>
                    <input type="password" name='password' id='password' className='w-100 p-1 rounded outline-none border-2 border-purple-100'
                    required
                    value={Formik.values.password}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}/>
                    {Formik.errors.password && Formik.touched.password ? (
                    <p className='text-sm text-red-500 font-semibold'>{Formik.errors.password}</p>) : null}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="confirm_password" className='uppercase text-sm font-semibold text-slate-500'>Confirm Password</label>
                    <input type="password" name='confirm_password' id='confirm_password' className='w-100 p-1 rounded outline-none border-2 border-purple-100'
                    required
                    value={Formik.values.confirm_password}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}/>
                    {Formik.errors.confirm_password && Formik.touched.confirm_password ? (
                    <p className='text-sm text-red-500 font-semibold'>{Formik.errors.confirm_password}</p>) : null}
                </div>
                <button type='submit' className='bg-purple-600 p-2 rounded text-white font-semibold hover:bg-purple-500'>Submit</button>
            </form>
        </div>
        <div className='flex flex-col justify-center items-center gap-4 mr-8'>
          <div className='flex flex-col '>
          <span className='text-2xl font-semibold text-slate-500 mb-2'>Already have an account ?</span>
          <Link to={'/login'} className='bg-purple-600 py-1 px-2 rounded text-white font-semibold hover:bg-purple-500 mr-8 self-start'>Login</Link>
          </div>
          
          <img src="https://app.merlincdn.com/static/media/login-page-image.3d91b0d9.png" alt="Sign up page image" className='w-64 lg:w-100 max-w-sm'/>
        </div>
        </div>
        
      </section>
      
    </main>
  )
}

export default SignUpPage