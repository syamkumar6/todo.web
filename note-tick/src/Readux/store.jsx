import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './Features/AuthSlice'
import todosReducer from './Features/todosSlice'
import thunk from 'redux-thunk'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    todo: todosReducer
  },
  middleware: [thunk],
})