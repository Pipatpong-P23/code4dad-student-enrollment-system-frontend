import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin';
import DataTable from 'react-data-table-component';
import './AddUser.css';
import axios from 'axios';

function AddUser() {
  const [isTableStudent, setIsTableStudent] = useState(true);
  const [isTableTeacher, setIsTableTeacher] = useState(false);
  const [TableUSer, setTableUser] = useState('Add Student');

  const [dataInputStudent, setDataInputStudent] = useState({
    'Student ID': '',
    'Student Name': '',
    'Email': '',
    'Citizen ID': '',
    'Faculty': '',
    'Major': '',
    'Password': ''
  });

  const [dataInputTeacher, setDataInputTeacher] = useState({
    'Teacher ID': '',
    'Teacher Name': '',
    'Email': '',
    'Citizen ID': '',
    'Password': ''
  });


  const handleInputChangeStudent = (title, value) => {
    console.log(title,':', value);
    setDataInputStudent({
      ...dataInputStudent,
      [title]: value,
    });
    console.log(dataInputStudent);
  };

  const handleInputChangeTeacher = (title, value) => {
    console.log(title,':', value);
    setDataInputTeacher({
      ...dataInputTeacher,
      [title]: value,
    });
    console.log(dataInputTeacher);
  };

  const columns_student = [
    {
      name: 'Title',
      selector: row => row['Data'],
    },
    {
      name: 'Input Data',
      cell: row => <input type='text' className='inputdata' onChange={ (e) => handleInputChangeStudent(row.Data, e.target.value )} />,
    },
  ];

  const columns_teacher = [
    {
      name: 'Title',
      selector: row => row['Data'],
    },
    {
      name: 'Input Data',
      cell: row => <input type='text' className='inputdata' onChange={ (e) => handleInputChangeTeacher(row.Data, e.target.value )} />,
    }
  ];

  
  const dataTableStudent = [
    { Data: 'Student ID' },
    { Data: 'Student Name' },
    { Data: 'Email'},
    { Data: 'Citizen ID' },
    { Data: 'Faculty'},
    { Data: 'Major' },
    { Data: 'Password'}
  ];

  const dataTableTeacher = [
    { Data: 'Teacher ID' },
    { Data: 'Teacher Name' },
    { Data: 'Email'},
    { Data: 'Citizen ID' },
    { Data: 'Password'}
  ];
  
  const show_table_student = () => {
    setIsTableStudent(true);
    setIsTableTeacher(false);
    setTableUser('Add Student');
  };

  const show_table_teacher = () => {
    setIsTableTeacher(true);
    setIsTableStudent(false);
    setTableUser('Add Teacher');
  };

  const addStudent = (detail) => {
    async function add_student() {
      console.log('xxsssxxx' , detail)
      try{
        const headers = {};
        const body = {
          "student_id": detail["Student ID"] , 
          "password": detail[ "Password"] ,
          "email": detail["Email"],
          "name": detail["Student Name"],
          "citizen_id": detail["Citizen ID"] ,
          "major": detail["Major"],
          "faculty": detail["Faculty"] 
        };
        console.log('xxxxx' , body)
        const response = await axios.post('http://oop.okusann.online:8088/add_student', body, {headers: headers});
        if (response.status == 200) {
          alert('Add Student Success');
          return ;
        }
      }catch (error) {
        alert('Add Student Failed');
        return ;
      }
    }
    add_student();
  };

  const addTeacher = (detail) => {
    async function add_teacher() {
      try{
        const headers = {};
        const body = {
          "teacher_id": detail["Teacher ID"],
          "password": detail["Password"] ,
          "email": detail["Email"],
          "name": detail["Teacher Name"],
          "citizen_id": detail["Citizen ID"] 
        };

        const response = await axios.post('http://oop.okusann.online:8088/add_teacher', body, {headers: headers});
        if (response.status == 200) {
          alert('Add Teacher Success');
          return ;
        }
      }catch (error) {
        alert('Add Teacher Failed');
        console.log(error);
        return ;
      }
    }
    add_teacher();
  };

  const clickDone = () => {
    window.confirm('Please confirm to add user');
    if (isTableStudent) {
      console.log('Student', dataInputStudent);
      addStudent(dataInputStudent);
    }
    else if (isTableTeacher) {
      console.log('Teacher', dataInputTeacher);
      addTeacher(dataInputTeacher);
    }
  }

  return (
    <div>
      <NavbarAdmin admin_id={'Admin'} />
      <div className='title_table'>
        <h1>{TableUSer}</h1>
      </div>

      <div className='btn_done'>
        <button className='button_admin' onClick={clickDone}>Done</button>
      </div>

      <div className='TableTable'> 
      {
        isTableStudent &&
        <DataTable
          name='Student'
          columns={columns_student}
          data={dataTableStudent}
        />
      }
      {
        isTableTeacher &&
        <DataTable
          name='Teacher'
          columns={columns_teacher}
          data={dataTableTeacher}
        />
      }
      </div>
      <div className='btn-add-user'>
        <button className='buttonadmin' onClick={show_table_student}>
          Add Student
        </button>
        <button className='buttonadmin' onClick={show_table_teacher}>
          Add Teacher
        </button>
      </div>
    </div>
  );
}

export default AddUser;
