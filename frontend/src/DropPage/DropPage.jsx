import React, { useEffect, useState } from 'react';
import './DropPage.css';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import { getUsername } from '../Authentication';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function DropPage() {
  const student_id = getUsername();
  const [data_table, setData_table] = useState([]);
  const current_semester = 1;
  const current_year = 2024;
  const [section_number, setSection_number] = useState(0);
  const [course_id, setCourse_id] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const TOKEN = document.cookie.split('=')[1];

  const columns = [
    {
      name: 'Course ID',
      selector: row => row.course_id,
      sortable: true,
    },
    {
      name: 'Course Name',
      selector: row => row.course_name,
      sortable: true,
    },
    {
      name: 'Credit',
      selector: row => row.credit,
      sortable: true,
    },
    {
      name: 'Section Number',
      selector: row => row.section_number,
      sortable: true,
    },
    {
      name: 'Schedule',
      selector: row => row.schedule,
      sortable: true,
    },
  ];

  if (!TOKEN) {
    window.location.href = '/';
  }

  useEffect(() => {
    axios.get(`http://oop.okusann.online:8088/get_student_enrolled_courses/${student_id}/${current_semester}/${current_year}`)
      .then((res) => {
        if (res.status === 200) {
          setData_table(res.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Error Data Fetching');
      });
  }, []);

  const drop = () => {
    
    const URL = 'http://oop.okusann.online:8088/drop';

    const headers = {
      'TOKEN': TOKEN,
    };

    const selectedSectionNumber = data_table.find((row) => row.course_id === course_id).section_number;
    setSection_number(selectedSectionNumber);


    const body = {
      'student_id': student_id,
      'course_id': course_id,
      'section_number': section_number,
    };

    console.log(body);
    
    try{
      async function drop() {
        const response = await axios.post(URL, body, {headers: headers});
        if (response.status === 200) {
          alert('Drop Success');
          window.location.reload();
        }
      } 
      drop();
    }
    catch (error) {
      console.error('Error:', error);
      alert('Drop Failed');
    }
  };

  const handleCourseIdChange = (event) => {
    setCourse_id(event.target.value);
  };

  const handleInputChangeTable = (rows) => {
    setSelectedRows(rows.selectedRows);
    if (rows.selectedRows.length > 0) {
      setCourse_id(rows.selectedRows[0].course_id);
      setSection_number(rows.selectedRows[0].section_number);
    }
  }


  return (
    <div className='backgroundchange'>
      <NavbarStudent student_id={student_id} />
      <div className='container'>
        <DataTable 
        title='Your Course' 
        columns={columns} 
        data={data_table} 
        selectableRows
        selectableRowsSingle
        onSelectedRowsChange={handleInputChangeTable}
        clearSelectedRows={true}
        />
      </div>
      <div className='dropfoot'>
        <footer className='dropfooter'>
          <input
            type='text'
            placeholder='Course ID'
            className='inputcourse'
            value={course_id}
            onChange={handleCourseIdChange}
          />
          <button className='changebutton' onClick={drop}>Drop</button>
        </footer>
      </div>
    </div>
  );
}

export default DropPage;
