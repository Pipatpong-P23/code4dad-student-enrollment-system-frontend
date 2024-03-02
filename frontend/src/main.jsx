import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'

import './index.css'
import HomePageStudent from './HomePageStudent/HomePageStudent.jsx'
import DropPage from './DropPage/DropPage.jsx'
import ChangeSection from './ChangeSection/ChangeSection.jsx'
import EnrollPage from './EnrollPage/EnrollPage.jsx'
import LoginPage from './LoginPage/Login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element : <LoginPage/>
  },
  {
    path: '/homepagestudent',
    element: <HomePageStudent/>
  },
  {
    path: '/drop',
    element: <DropPage/>
  },
  {
    path: '/change',
    element: <ChangeSection/>
  },
  {
    path: '/enroll',
    element: <EnrollPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
