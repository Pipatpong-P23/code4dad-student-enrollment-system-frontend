import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import { getUsername } from '../Authentication';
import DropdownDate from '../Component/DropdownDateOption/DropdownDate';
import './HomePageStudent.css';

function HomePageStudent() {
  const [selectedDate, setSelectedDate] = useState({ semester: '1', year: '2024' });
  const [data_table, setData_table] = useState([]);
  const student_id = getUsername();

  const [click_view, setClick_view] = useState(false);

  const handleDateChange = (semester, year) => {
    setSelectedDate({ semester, year });
  };
  
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

  useEffect(() => {
    console.log(student_id, selectedDate.semester, selectedDate.year);
    if (click_view) {
      axios.get(`http://oop.okusann.online:8088/get_student_enrolled_courses/${student_id}/${selectedDate.semester}/${selectedDate.year}`)
        .then((res) => {
          if( res.status === 200 ){
            console.log(res);
            setData_table(res.data);
          }
        })
        .catch((error) => {
          alert('Error Data Fetching');
        });
    }
  }, [click_view]);
  
  const redirect_to_enroll = () => {
    window.location.href = '/enroll';
  };
  const redirect_to_change = () => {
    window.location.href = '/change';
  };
  const redirect_to_drop = () => {
    window.location.href = '/drop';
  };

  return (
    <div className='backgroundhomepage'>
      <NavbarStudent student_id={student_id} />
      <div className='container'>
        <div className='topicenroll'>
          <p className='entext'>EnrollmentSystem</p>
        </div>
        <div>
          <DropdownDate onDateChange={handleDateChange} />
          <button className='viewdd' onClick={() => setClick_view(!click_view)}>view</button>
        </div>
        <div className='table'>
          <DataTable title="Class Schedule" columns={columns} data={data_table} />
        </div>
        <div className='activebutton'>
          <button className='interactbutton' onClick={redirect_to_enroll}>Enroll</button>
          <button className='interactbutton' onClick={redirect_to_change}>Change</button>
          <button className='interactbutton' onClick={redirect_to_drop}>Drop</button>
        </div>
      </div>
    </div>
  );
}

export default HomePageStudent;
