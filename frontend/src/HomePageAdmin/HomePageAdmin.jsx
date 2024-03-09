import React from 'react'
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin'
import './HomePageAdmin.css'

function HomePageAdmin() {
  return (
    <div>
        <NavbarAdmin admin_id='Admin'/>
        <h1 id='textadmin'>Admin</h1>
        
        <div>
          <div>
            <button className='buttonadmin' onClick={() => { window.location.href = '/add user'}}>Add User</button>
          </div>
          <div>
            <button className='buttonadmin' onClick={() => { window.location.href = '/add course'}}>Create Course</button>
        </div>
        <div>
          <button className='buttonadmin' onClick={() => { window.location.href = '/add section'}}>Add Teacher in Section</button>
        </div>
        </div>
    </div>
  )
}

export default HomePageAdmin