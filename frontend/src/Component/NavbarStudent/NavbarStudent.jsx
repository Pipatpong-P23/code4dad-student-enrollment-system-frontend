import React, { useState } from 'react';
import "./NavbarStudent.css";
import { FiMenu } from "react-icons/fi";
import { GiSpellBook } from "react-icons/gi";

function NavbarStudent() {
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
                Code4Dad  <div className='Book'><GiSpellBook /></div>
            </div>

            <div className='navbar'>
                <ul id='drop' className={clicked ? "active" : ""}>
                    <li> <a href='#'> Enroll</a></li>
                    <li> <a href='#'> Change</a></li>
                    <li> <a href='#'> Drop</a></li>
                    <li> <a href='#'> Profile</a></li>
                    <li> <a href='#'> Password</a></li>
                </ul>
                <ul id='navbar'>
                    <li> <a href='data'>66010572</a> </li>
                    <li> <a href='logout'>Logout</a> </li>
                </ul>
            </div>
        </div>
    );
}

export default NavbarStudent;
