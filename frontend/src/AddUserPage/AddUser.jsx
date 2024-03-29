import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin';
import DataTable from 'react-data-table-component';
import './AddUser.css';
import axios from 'axios';
import { getUsername, getRole, Logout } from '../Authentication';
import { url } from '../URL';

function AddUser() {
  if (getRole() != 'admin') {
    Logout();
  }
  
  const [isTableStudent, setIsTableStudent] = useState(true);
  const [isTableTeacher, setIsTableTeacher] = useState(false);
  const [TableUSer, setTableUser] = useState('Add Student');
  const [FacultyOption, setFacultyOption] = useState([]); 
  const [MajorOption, setMajorOption] = useState([{faculty: '', major: []}]);

  const admin_id = getUsername();
  const TOKEN = document.cookie.split('=')[1];

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

  useEffect(() => {
    async function get_all_faculty_and_major() {
        try {

            const response = await axios.get(url + '/get_all_faculties');
            if (response.status === 200) {
                const faculties = response.data.map(fac => fac.faculty_name);
                const majors = response.data.map(fac => ({
                    faculty: fac.faculty_name,
                    major: fac.major_list,
                }));

                setFacultyOption(faculties);
                setMajorOption(majors);
            } else {
                console.error('Failed to fetch faculty and major data');
            }
        } catch (error) {
            console.error('Error fetching faculty and major data');
        }
    }
    get_all_faculty_and_major();
    console.log(FacultyOption);
    console.log(MajorOption);
}, []);


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
      cell: row => {
        if (row.Data === 'Email') {
          return (
            <input placeholder='Ex.ppohZa@kmitl.ac.th' type='text' className='inputdata' onChange={ (e) => handleInputChangeStudent(row.Data, e.target.value )} />
          )
        }
        else if (row.Data === 'Password') {
          return (
            <input type='password' className='inputdata' onChange={ (e) => handleInputChangeStudent(row.Data, e.target.value )} />
          )
        }
        else if(row.Data === 'Faculty') {
          return (
            <select className='inputdata' onChange={ (e) => handleInputChangeStudent(row.Data, e.target.value )}>
              <option value=''>Select Faculty</option>
              {FacultyOption.map((fac) => (
                <option key={fac} value={fac}>{fac}</option>
              ))}
            </select>
          )
        }
        else if(row.Data === 'Major') {
          return (
            <select className='inputdata' onChange={(e) => handleInputChangeStudent(row.Data, e.target.value)}>
              <option value=''>Select Major</option>
              {MajorOption.map((fac) => {
                if (fac.faculty === dataInputStudent.Faculty) {
                  return fac.major.map((major) => (
                    <option key={major} value={major}>{major}</option>
                  ));
                }
                return null;
              })}
            </select>
          )          
        }
        else {
          return (
            <input type='text' className='inputdata' onChange={ (e) => handleInputChangeStudent(row.Data, e.target.value )} />
          )
        }
      }
    },
  ];

  const columns_teacher = [
    {
      name: 'Title',
      selector: row => row['Data'],
    },
    {
      name: 'Input Data',
      cell: row => {
        if (row.Data === 'Email') {
          return (
            <input placeholder='Ex.SakchailuvCal@kmitl.ac.th' type='text' className='inputdata' onChange={ (e) => handleInputChangeTeacher(row.Data, e.target.value )} />
          )
        }
        else if (row.Data === 'Password') {
          return (
            <input type='password' className='inputdata' onChange={ (e) => handleInputChangeTeacher(row.Data, e.target.value )} />
          )
        }
        else {
          return (
            <input type='text' className='inputdata' onChange={ (e) => handleInputChangeTeacher(row.Data, e.target.value )} />
          )
        }
      }
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
        const headers = {
          "TOKEN" : TOKEN
        };
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
        const response = await axios.post(url + '/add_student', body, {headers: headers});
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
        const headers = {
          "TOKEN" : TOKEN
        };
        const body = {
          "teacher_id": detail["Teacher ID"],
          "password": detail["Password"] ,
          "email": detail["Email"],
          "name": detail["Teacher Name"],
          "citizen_id": detail["Citizen ID"] 
        };

        const response = await axios.post(url + '/add_teacher', body, {headers: headers});
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

    <div className='bgAd'>
      <NavbarAdmin admin_id={admin_id} />
      <div className="Adcontainer">

        <div className='Addtopic'>
          <h1 className='Addtext'>{TableUSer}</h1>
        </div>

        <div className='btn-add-user'>
          <button className='btn-Add' onClick={show_table_student}>
            Add Student
          </button>
          <button className='btn-Add' onClick={show_table_teacher}>
            Add Teacher
          </button>
        </div>

        <div className='Adtable'> 
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

        <div className='btn-done'>
          <button className='btn-admin' onClick={clickDone}>Done</button>
        </div>

      </div>
      
    </div>
  );
}

export default AddUser;
