import React from 'react'
import './Dropdown.css'
import { IoMdArrowDropdown } from "react-icons/io";

function Dropdown() {
  return (
    <div>
        <div className='dropdown'>
            <button className='topicdropdown'>Course type <IoMdArrowDropdown /></button>
            <div className='content'>
                <a href=''>Curriculum</a>
                <a href=''>Faculty</a>
                <a href=''>Gen-Ed</a>
            </div>
        </div>
    </div>
  )
}

export default Dropdown