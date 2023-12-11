import axios from 'axios'
import { useEffect, useState } from 'react'
import { addAuth, addUser } from '../Readux/Features/AuthSlice'
import { addTodos, addSingleTodo, deleteTodo } from '../Readux/Features/todosSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import toast from 'react-hot-toast';
import ClosingIcon from "../assets/Closing.svg"
import NoteIcon from "../assets/Note.svg"


export async function loader() {
  axios.defaults.withCredentials = true
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/todos`)
  const data = res.data
  return {data}
}

function TodosPage() {
  const {data} = useLoaderData()
  const [todoForm, setTodoForm] = useState(false)
  const todos = useSelector((state) => state.todo.todos)
  const dispatch = useDispatch()
  const baseURL = import.meta.env.VITE_BASE_URL
  console.log(data)


      axios.defaults.withCredentials = true
      useEffect(() => {
        axios.post(`${baseURL}/users/verify`)
          .then(res => {
              if(res.data.Status === "Verify-Success") {
                dispatch(addAuth(true))
                dispatch(addUser(res.data.user))
                dispatch(addTodos(data.todos))
              }else{
                alert(res.data.Meassage)
              }
          })
         
      }, [])

  function handleSubmit(e){
    e.preventDefault()
    const form = e.target 
    const title = form['title'].value
    const description = form['description'].value
    const payload = {
      title: title,
      description: description
    }
    axios.defaults.withCredentials = true
    axios.post(`${baseURL}/todos`, payload )
    .then(data => {
      dispatch(addSingleTodo(data.data))
      setTodoForm(false)
      toast.success('Todo added Successfully!')
    })
    .catch(err => {
      console.log(err)
      setTodoForm(false)
    })
  }

  function handleDeleteTodo(todoId){
    dispatch(deleteTodo(todoId));
    axios.defaults.withCredentials = true
    axios.delete(`${baseURL}/todos`+todoId)
    .then(res =>{
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
      <main>
           <section className='relative'>
            {
              todoForm&&
              <>
              <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'> &nbsp;</div>
              <div className='fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center z-50'>
              <button onClick={() => {setTodoForm(false)}} className='fixed top-0 right-0 p-4 w-14 h-14'>
                <img src={ClosingIcon} alt="" className='w-full h-full' />
              </button>
                <form onSubmit={handleSubmit} className='flex flex-col w-96 md:w-full max-w-xl bg-white p-8 rounded-md'>
                  <label htmlFor="title" className='font-semibold mb-2'>
                    Title
                  </label>
                  <input type="text" id='title' className='mb-6 p-2 border border-purple-400 outline-none' />
                  <label htmlFor="description" className='font-semibold mb-2'>
                    Description
                  </label>
                  <textarea type="text" id='description' rows="10" className='p-2 border border-purple-400 outline-none' />
                  <button type='submit' className='bg-purple-500 mt-3 py-2 rounded font-semibold hover:bg-purple-400'>Add todo</button>
                </form>
             </div>
             </>
              }
          <div className='h-36 shadow-xl rounded flex flex-col gap-3 justify-center items-center m-6'>
            <h1 className='text-4xl font-bold text-slate-500'>Your todos</h1>
            <div className='flex justify-center m-2'>
              <button onClick={() => {setTodoForm(true)}} className='bg-purple-500 p-2 rounded text-xs text-white font-semibold hover:bg-purple-400'>
                Add Todo
              </button>
            </div>
          </div>

          <div className='m-8'>
            {
              todos.length === 0 ? (
                <div className='w-screen flex justify-center'>
                  <div className=' h-2/4 flex flex-col justify-center items-center p-5 rounded-md'>
                  <span className='text-5xl font-bold  pt-3 text-neutral-300'>Empty</span>
                  <img src={NoteIcon} alt="Note image" className='w-56 opacity-20' />
                  </div>
                </div>
              )
              :
              ("")
            }
            <ul className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-4 pb-3'>
              {
                todos.map((todo, index) => {
                  return (<li key={index} className='flex flex-col justify-between p-4 h-28  lg:h-44 border rounded-md shadow-xl mt-1 '>
                     <div>
                     <h3 className='text-lg font-semibold'>{todo.title}</h3>
                     <p className='text-gray-500'>{todo.description}</p>
                     </div>
                     
                     <button onClick={() => {handleDeleteTodo(todo._id)}} className='self-end text-xs  py-1 px-2 rounded bg-purple-500 text-white font-semibold hover:bg-purple-400'>
                      Delete
                    </button>
                    </li>)
                })
              }
            </ul>
          </div>
        </section>
    </main>
  )
}

export default TodosPage
