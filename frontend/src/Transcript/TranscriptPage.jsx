import React from 'react'
import './TranscriptPage.css'
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent'

function TranscriptPage() {
  return (
    <div className='backgroundtrans'>
        <NavbarStudent />
        <div className='transcontainer'>
            <div className='topictrans'>
                <p className='entext'>Transcript</p>
            </div>
            <div className='transtable'>
              
            </div>

        </div>

    </div>
  )
}

export default TranscriptPage