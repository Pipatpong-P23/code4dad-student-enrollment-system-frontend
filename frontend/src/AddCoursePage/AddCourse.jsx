import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin'; 
import { getUsername } from '../Authentication';
import axios from 'axios';
import './AddCourse.css';
import DataTable from 'react-data-table-component';

function AddCourse() {

  const [dataInput, setDataInput] = useState({
    'Course ID': '',
    'Course Name': '',
    'Credit': '',
    'Course Type': '',
    'Grading Type': '',
  });
  const TOKEN = document.cookie.split('=')[1];

  const courseTypeOptions = ["Gen-Ed", "Faculty", "Curriculum"];
  const gradingTypeOptions = ["Grade ", "Pass/Fail"];

  const CodeType = {
    "Gen-Ed": 0 ,
    "Faculty": 1,
    "Curriculum": 2,
    "Grade": 0,
    "Pass/Fail": 1
  }

  const decodeType = (data, value) => {
    return Object.keys(data).find(key => data[key] === value);
  };

  const handleInputChange = (field, value) => {
    setDataInput({ ...dataInput, [field]: value });
  };

  const columns = [
    {
      name: 'Title',
      selector: row => row.Data,
    },
    {
      name: 'Input Data',
      cell: (row) => {
        if (row.Data === 'Course Type') {
          return (
            <select
              className='inputdata'
              onChange={(e) => handleInputChange(row.Data, e.target.value)}
              value={dataInput['Course Type']}
            >
              {courseTypeOptions.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          );
        } else if (row.Data === 'Grading Type') {
          return (
            <select
              className='inputdata'
              onChange={(e) => handleInputChange(row.Data, e.target.value)}
              value={dataInput['Grading Type']}
            >
              {gradingTypeOptions.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          );
        } else {
          return (
            <input
              type='text'
              className='inputdata'
              onChange={(e) => handleInputChange(row.Data, e.target.value)}
              value={dataInput[row.Data]}
            />
          );
        }
      },
    },
  ];

  const dataTable = [
    { Data: 'Course ID' },
    { Data: 'Course Name' },
    { Data: 'Credit' },
    { Data: 'Course Type' },
    { Data: 'Grading Type' },
  ];

  const admin_id = getUsername();

  const addCourse = () => {
    async function addCourse() {
      try {
        const URL = `http://oop.okusann.online:8088/add_course`;

        const headers = {
          "TOKEN" : TOKEN
        }
        const body = {
          "course_id": dataInput['Course ID'],
          "course_name": dataInput['Course Name'],
          "credit": dataInput['Credit'],
          "course_type": CodeType[dataInput['Course Type']],
          "grading_type": CodeType[dataInput['Grading Type']],
        };

        const response = await axios.post(URL, body, {headers: headers});
        if (response.status === 200) {
          alert('Add course success');
          window.location.reload();
        } else {
          alert(response.data.detail);
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);
        alert(error.response.data.detail);
      }
    }
    addCourse();
  }

  return (
    <div>
      <NavbarAdmin admin_id={admin_id} />
      <div className='TableAddCourse'>
        <DataTable
          name='Add Course Table'
          columns={columns}
          data={dataTable}
          noHeader
          persistTableHead
        />
      </div>
      <button onClick={addCourse}> Done </button>
    </div>
  );
}

export default AddCourse;
