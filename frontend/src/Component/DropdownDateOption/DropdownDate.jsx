import React from 'react'
import './DropdownDate.css'

function DropdownDate() {
  return (
    <div className='drop-container'>
        <div className='drop-1'>
            <button className='drop-semester'>Semester</button>
            <div className='semester-content'>
                <a href=''>1</a>
                <a href=''>2</a>
            </div>
        </div>
        <div className='drop-2'>
            <button className='drop-year'>Year</button>
            <div className='year-content'>
                <a href=''>2566</a>
                <a href=''>2565</a>
                <a href=''>2564</a>
            </div>
        </div>
    </div>
  )
}

export default DropdownDate