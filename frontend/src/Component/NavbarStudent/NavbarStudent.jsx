import React, { useState } from 'react';
import "./NavbarStudent.css";
import { FiMenu } from "react-icons/fi";
import { GiSpellBook } from "react-icons/gi";

function NavbarStudent({student_id}) {
    const [clicked, setClicked] = useState(false);

    return (
        <div className='nav'>
            <a
                id='dd'
                className={clicked ? "dd active" : "dd"}
                onClick={() => setClicked(!clicked)} 
            >
                <FiMenu />
            </a>
            <div className='logo'>
                <h4>Code4Dad</h4>  <div className='Book'><GiSpellBook /></div>
            </div>

            <div className='navbar'>
                <ul id='drop' className={clicked ? "active" : ""}>
                    <li><a href="#">Homepage</a></li>
                    <li> <a href='#'> Enroll</a></li>
                    <li> <a href='#'> Change</a></li>
                    <li> <a href='#'> Drop</a></li>
                    <li> <a href='#'> Score</a></li>
                    <li> <a href='#'> Transcript</a></li>
                </ul>
                <ul id='navbar'>
                    <li> <a href='data'>{student_id}</a> </li>
                    <li> <a href='/'>Logout</a> </li>
                </ul>
            </div>
        </div>
    );
}

export default NavbarStudent;
