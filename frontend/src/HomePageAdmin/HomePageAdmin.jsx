import React from 'react'
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin'
import './HomePageAdmin.css'
import { getUsername, getRole, Logout } from '../Authentication'

function HomePageAdmin() {
  if (getRole() != 'admin') {
    Logout();
  }
  const AdminId = getUsername();
  return (
    <div className='bgAd'>
      <NavbarAdmin admin_id= {AdminId}/>
        <div className="Adcontainer">

          <div className='Adtopic'>
            <h1 className='Adtext'>Admin</h1>
          </div>
        
          <div className='Adbtn'>
            <div>
              <button className='Adbtninteract-AU' onClick={() => { window.location.href = '/add user'}}>Add User</button>
            </div>
            <div>
              <button className='Adbtninteract-CC' onClick={() => { window.location.href = '/add course'}}>Create Course</button>
            </div>
            <div>
              <button className='Adbtninteract-ATS' onClick={() => { window.location.href = '/add section'}}>Add Teacher in Section</button>
            </div>
          </div>

        </div>
    </div>
  )
}

export default HomePageAdmin