import React, { useEffect, useState } from 'react';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import Footer from '../Component/Footer/Footer';
import './HomePageStudent.css';
import DataTable from 'react-data-table-component';
import axios from 'axios';

function HomePageStudent() {
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Gender',
      selector: row => row.gender,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    }
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://gorest.co.in/public/v2/users')
      .then(res => {
        setData(res.data);
        console.log('data', data , "res", res);
      })
      .catch(error => console.error(error));
  }, []);


  return (
    <div className='backgroundhomepage'>
      <NavbarStudent />
      <div className='container'>
        <div className='topicenroll'>
          <p className='entext'>หน้าเว็บสุดเท่</p>
        </div>
        <div className='table'>
          <DataTable columns={columns} data={data}/>
        </div>
        
        <div className='activebutton'>
          <button className='interactbutton'>Enroll</button>
          <button className='interactbutton'>Change</button>
          <button className='interactbutton'>Drop</button>
        </div>
      </div>
    </div>
  );
}

export default HomePageStudent;
