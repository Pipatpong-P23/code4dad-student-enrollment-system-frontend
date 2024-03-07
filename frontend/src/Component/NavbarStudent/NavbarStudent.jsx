import React, { useState } from 'react';
import "./NavbarStudent.css";
import { FiMenu } from "react-icons/fi";
import { GiSpellBook } from "react-icons/gi";
import HomePageStudent from '../../HomePageStudent/HomePageStudent';

function NavbarStudent({student_id}) {
    const [clicked, setClicked] = useState(false);

    function logout(){
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/';
    }

    function HomePageStudent(){
        window.location.href = '/homepagestudent';
    }

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
                <h4><a onClick={HomePageStudent}>Code4Dad</a></h4>  <div className='Book'><GiSpellBook /></div>
            </div>

            <div className='navbar'>
                <ul id='drop' className={clicked ? "active" : ""}>
                    <li><a href="/homepagestudent">Homepage</a></li>
                    <li> <a href='/enroll'> Enroll</a></li>
                    <li> <a href='/change'> Change</a></li>
                    <li> <a href='/drop'> Drop</a></li>
                    <li> <a href='/score'> Score</a></li>
                    <li> <a href='/transcript'> Transcript</a></li>
                </ul>
                <ul id='navbar'>
                    <li> <a href='data'>{student_id}</a> </li>
                    <li> <a onClick={logout}>Logout</a> </li>
                </ul>
            </div>
        </div>
    );
}

export default NavbarStudent;
