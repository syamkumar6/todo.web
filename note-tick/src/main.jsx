import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import store from './Readux/store'
import { Provider } from 'react-redux'

import RootRouter from './Routes/RootRouter';
import ErrorPage from './ErrorPage';
import LoginPage from './Routes/LoginPage';
import SignUpPage from './Routes/SignUpPage';
import HomePage from './Routes/HomePage';
import TodosPage, {loader as todosloader} from './Routes/TodosPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRouter/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path:'/',
        element: <HomePage/>
      },
      {
        path:'/sign-up',
        element: <SignUpPage/>
      },
      {
        path:'/login',
        element: <LoginPage/>
      },
      {
        path:'/todos',
        element: <TodosPage/>,
        loader: todosloader
      },
     
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
