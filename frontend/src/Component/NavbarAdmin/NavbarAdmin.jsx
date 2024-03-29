import React, { useState } from 'react';
import "./NavbarAdmin.css";
import { FiMenu } from "react-icons/fi";
import { GiSpellBook } from "react-icons/gi";

function NavbarAdmin({admin_id}) {
    const [clicked, setClicked] = useState(false);

    function logout(){
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/';
    }

    function HomePageAdmin(){
        window.location.href = '/homepageadmin';
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
                <h4><a className='code44dad' onClick={HomePageAdmin}>Code4Dad</a></h4>  <div className='Book'><GiSpellBook /></div>
            </div>

            <div className='navbar'>
                <ul id='drop' className={clicked ? "active" : ""}>
                    <li><a href="/homepageadmin">Homepage</a></li>
                    <li> <a href='/add user'>Add User</a></li>
                    <li> <a href='/add course'>Create Course</a></li>
                    <li> <a href='/add section'>Add Teacher in Section</a></li>
                    <li> <a href='/detail student'>Detail Student</a></li>
                    <li> <a href='/detail course'>Detail Course</a></li>
                </ul>
                <ul id='navbar'>
                    <li> <a href=''>{admin_id}</a> </li>
                    <li> <a onClick={logout}>Logout</a> </li>
                </ul>
            </div>
        </div>
    );
}

export default NavbarAdmin;
