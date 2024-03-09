import './Login.css';
import React , {useState, useEffect} from 'react';
import { RiUser5Fill } from "react-icons/ri";   
import { FaUnlockAlt } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { GiBookmarklet } from "react-icons/gi";
import axios from 'axios';
import { getRole } from '../Authentication';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const redirect = (role) => {
    if(role === 'student'){
      window.location.href = '/homepagestudent';
    }else if(role === 'teacher'){
      window.location.href = '/homepageteacher';
    }else if(role === 'admin'){
      window.location.href = '/homepageadmin';
    }
  }

  const submit = (e) => {
    URL = 'http://oop.okusann.online:8088/login';
    e.preventDefault();

    const headers = {};

    const body = {
      "username": username,
      "password": password
    };

    try{
      axios.post(URL, body, {headers: headers})
      .then((res => {
        console.log(res);
        if(res.status == 200){
          const token = res.data;
          document.cookie = `token=${token}`;
          console.log('Login Success');
          console.log(getRole());
          redirect(getRole());
        }
        
      })).catch((error) => {
        alert('Login Failed');
        console.log('Login Failed');
      });

    } catch (error) {
      alert('Login Failed');
      console.log('Login Failed')
    }

  }
  return (
    <div className='background'>

      <div className='wrapper'>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className='boxlogo'>
          <div className='mainlogo'><GiBookmarklet /></div>
        </div>
        <div className='loginlogo'>Login<LuLogIn /></div>
        <form onSubmit={submit}>
          <h1>Code4Dad</h1>
          <div className='input-box'>
              <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder='Username' required/>
              <RiUser5Fill className='icon' />
          </div>
          <div className='input-box'>
              <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' required/>
              <FaUnlockAlt className='icon' />
          </div>
              
          <button type="submit" className='loginbutton'>Login</button>
        </form>
      </div>

    </div>
  );
}

export default Login;