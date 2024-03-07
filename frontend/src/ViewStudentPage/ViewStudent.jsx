import React from 'react'
import NavbarTeacher from '../Component/NavbarTeacher/NavbarTeacher'
import { getUsername } from '../Authentication'

function ViewStudent() {
    const teacher_name = getUsername();

  return (
    <div>
      <NavbarTeacher teacher_id={teacher_name} />
    </div>
    )
}

export default ViewStudent