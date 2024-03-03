import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div>
        <footer className='footer'>
            <input type="text" placeholder='course id'/>
            <button className='button'>Section 1</button>
            <button className='button'>Section 2</button>
            <button className='button'>Section 3</button>
            <button className='button enroll-button'>Enroll</button>
        </footer>
    </div>
  )
}

export default Footer