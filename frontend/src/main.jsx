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
import AssignGrade from './AssignGradePage/AssignGrade.jsx'
import AddCourse from './AddCoursePage/AddCourse.jsx'
import AddSection from './AddSectionPage/AddSection.jsx'
import DetailSection from './DetailSection/DetailSection.jsx'

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
    path: '/assign grade',
    element: <AssignGrade/>
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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
