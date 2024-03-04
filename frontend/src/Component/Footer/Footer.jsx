import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div>
        <footer className='footer'>
            <input type="text" placeholder='course id' className='inputcourse'/>
            <input type="text" placeholder='section id' className='inputsec'/>
        </footer>
    </div>
  )
}

export default Footer