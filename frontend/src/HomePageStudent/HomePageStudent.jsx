import './HomePageStudent.css';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import { getUsername } from '../Authentication';
import DropdownDate from '../Component/DropdownDateOption/DropdownDate';

function HomePageStudent() {

  const [data_student, setData_student] = useState('');
  const student_id = getUsername();

  useEffect(() => {
    axios.get(`http://oop.okusann.online:8088/get_student_by_student_id/${student_id}`)
      .then(res => {
        console.log(res);
        setData_student(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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

  const [data_table, setData_table] = useState([]);


  return (
    <div className='backgroundhomepage'>
      <NavbarStudent student_id={student_id}/>
      <div className='container'>

        <div className='topicenroll'>
          <p className='entext'>EnrollmentSystem</p>
        </div>
        <div className='dropdd'>
          <DropdownDate/> <button className='viewdd'>view</button>
        </div>
        <div className='table'>
          <DataTable columns={columns} data={data_table}/>
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
