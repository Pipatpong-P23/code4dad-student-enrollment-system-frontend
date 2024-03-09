import React from 'react'
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin'; 
import { getUsername } from '../Authentication'

function AddCourse() {
  
  return (
    <div>
      <NavbarAdmin admin_id={'Admin'} />
    </div>
  )
}

export default AddCourse