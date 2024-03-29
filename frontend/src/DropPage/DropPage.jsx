import React, { useEffect, useState } from 'react';
import './DropPage.css';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import { getUsername, getRole, Logout } from '../Authentication';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '../DateTime';
import { url } from '../URL';

function DropPage() {
  if (getRole() != 'student') {
    Logout();
  }
  
  const student_id = getUsername();
  const [data_table, setData_table] = useState([]);
  const current_semester = CURRENT_SEMESTER;
  const current_year = CURRENT_YEAR;
  const [section_number, setSection_number] = useState(0);
  const [course_id, setCourse_id] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const TOKEN = document.cookie.split('=')[1];

  const columns = [
    {
      name: 'Course ID',
      selector: row => row.course_id,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Course Name',
      selector: row => row.course_name,
      sortable: true,
      width: '45%',
    },
    {
      name: 'Credit',
      selector: row => row.credit,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Section Number',
      selector: row => row.section_number,
      sortable: true,
      width: '15%',
    },
    {
      name: 'Schedule',
      selector: row => row.schedule,
      sortable: true,
      width: '15%',
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: 'violet',
        color: 'white',
      },
    },
    rows: {
      style: {
        color: 'black',
      },
    },
    selectableRows: {
      style: {
        backgroundColor: 'pink',
        color: 'pink'
      },
    },
  }
  

  if (!TOKEN) {
    window.location.href = '/';
  }

  useEffect(() => {
    const URL = url + '/get_student_transcript_by_semester_and_year/' + student_id + '/2/2023';
    axios.get(URL)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          setData_table(res.data.enrollments);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Error Data Fetching');
      });
  }, []);

  const drop = () => {
    
    const URL = url + '/drop';
    // const URL = 'http://oop.okusann.online:8088/drop';

    const headers = {
      'TOKEN': TOKEN,
    };

    if (selectedRows.length === 0) {
      alert('Please select a course');
      return;
    }

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
  };

  const SureToDrop = () => {
    if (selectedRows.length === 0) {
      alert('Please select a course');
      return;
    }
    if (window.confirm('Are you sure to drop in course ' + course_id + '?')) {
      drop();
    }
  }


  return (
    <div className='bgstd'>
      <NavbarStudent student_id={student_id} />
      <div className='stdcontainer'>

        <div className='stdheadtb'>
          <h3>Your Course</h3>
        </div>

        <div className='stdtable'>
          <DataTable 
          columns={columns} 
          data={data_table} 
          selectableRows={customStyles}
          selectableRowsSingle
          onSelectedRowsChange={handleInputChangeTable}
          clearSelectedRows={true}
          // customStyles={customStyles}
        />
        </div>
      </div>

      <div className='dropft'>
        <footer className='dpfter'>
          <input
            type='text'
            placeholder='Course ID'
            className='inputcourse'
            value={course_id}
            onChange={handleCourseIdChange}
          />
          <button className='dpbtn' onClick={SureToDrop}>Drop</button>
        </footer>
      </div>
    </div>
  );
}

export default DropPage;
