import React, { useEffect, useState } from 'react';
import "./NavbarTeacher.css";
import { FiMenu } from "react-icons/fi";
import { GiSpellBook } from "react-icons/gi";
import axios from 'axios';

function NavbarTeacher({teacher_id}) {
    const [clicked, setClicked] = useState(false);
    const [teacher_name , setTeacherName] = useState('');

    useEffect(() => {
        async function get_teacher_data() {
            try{
                const response = await axios.get(`http://oop.okusann.online:8088/get_teacher_by_teacher_id/${teacher_id}`);
        
                if (response.status == 200) {
                    console.log("OK", response.data.name);
                    setTeacherName(response.data.name);
                    return ;
                }

            }catch (error) {
                console.error(error);
                return 
        }
    }
    get_teacher_data();
    console.log(teacher_name);
    }, [teacher_id]);

    function logout(){
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/';
    }

    function HomePageTeacher(){
        window.location.href = '/homepageteacher';
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
                <h4><a className='code4dad' onClick={HomePageTeacher}>Code4Dad</a></h4>  
                <div className='Book'><GiSpellBook /></div>
            </div>

            <div className='navbar'>
                <ul id='drop' className={clicked ? "active" : ""}>
                    <li><a href="/homepageteacher">Homepage</a></li>
                    <li> <a href='/assign grade'>Assign Grade</a></li>
                    <li> <a href='/add course'>Add Course</a></li>
                    <li> <a href='/add section'>Add Section</a></li>
                    <li> <a href='/view student'>View Student</a></li>
                </ul>
                <ul id='navbar'>
                    <li> <a href=''>{teacher_name}</a> </li>
                    <li> <a onClick={logout}>Logout</a> </li>
                </ul>
            </div>
        </div>
    );
}

export default NavbarTeacher;
