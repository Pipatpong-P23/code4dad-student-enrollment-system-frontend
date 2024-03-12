import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'

import './index.css'
import HomePageStudent from './HomePageStudent/HomePageStudent.jsx'
import DropPage from './DropPage/DropPage.jsx'
import ChangeSection from './ChangeSection/ChangeSection.jsx'
import EnrollPage from './EnrollPage/EnrollPage.jsx'
import LoginPage from './LoginPage/Login.jsx'
import ScorePage from './ScorePage/ScorePage.jsx'
import TranscriptPage from './Transcript/TranscriptPage.jsx'
import HomePageTeacher from './HomePageTeacher/HomePageTeacher.jsx'
import AddCourse from './AddCoursePage/AddCourse.jsx'
import AddSection from './AddSectionPage/AddSection.jsx'
import DetailSection from './DetailSection/DetailSection.jsx'
import HomePageAdmin from './HomePageAdmin/HomePageAdmin.jsx'
import AddUser from './AddUserPage/AddUser.jsx'
import DetailStudent from './DetailStudentPage/DetailStudent.jsx'
import DetailCourse from './DetailCourse/DetailCourse.jsx'

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
  },
  {
    path: '/score',
    element: <ScorePage/>
  },
  {
    path: '/transcript',
    element: <TranscriptPage/>
  },
  {
    path: '/homepageteacher',
    element: <HomePageTeacher/>
  },
  {
    path: '/add course',
    element: <AddCourse/>
  },
  {
    path: '/add section',
    element: <AddSection/>
  },
  {
    path: '/detail section',
    element: <DetailSection/>
  },
  {
    path : '/homepageadmin',
    element : <HomePageAdmin/>
  },
  {
    path : '/add user',
    element : <AddUser/>
  },
  {
    path : '/detail student',
    element : <DetailStudent/>
  },
  {
    path : '/detail course',
    element : <DetailCourse/> 
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
