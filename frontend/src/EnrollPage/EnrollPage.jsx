import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import Dropdown from './Dropdown/Dropdown';
import DropdownDate from '../Component/DropdownDateOption/DropdownDate';
import axios from 'axios';
import Footer from '../Component/Footer/Footer';
import { getUsername } from '../Authentication';
import './EnrollPage.css';

function EnrollPage() {
  const [selectedDate, setSelectedDate] = useState({ semester: '1', year: '2024' });
  const [data_table, setData_table] = useState([]);
  const student_id = getUsername();
  const [course_id, setCourse_id] = useState('');
  const [section_number, setSection_number] = useState(0);

  const TOKEN = document.cookie.split('=')[1];

  const columns = [
    {
      name: 'Course ID',
      selector: row => row.course_id,
      sortable: true,
    },
    {
      name: 'Course',
      selector: row => row.course_name,
      sortable: true,
    },
    {
      name: 'Section Number',
      selector: row => row.section_number,
      sortable: true,
    },
    {
      name: 'Teacher',
      selector: row => row.teacher,
      sortable: true,
    },
    {
      name: 'Number of Students',
      selector: row => row.number_of_student,
      sortable: true,
    },
    {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
    },
    {
      name: 'Schedule',
      selector: row => row.schedule,
      sortable: true,
    },
    {
      name: 'Semester',
      selector: row => row.semester,
      sortable: true,
    },
    {
      name: 'Year',
      selector: row => row.year,
      sortable: true,
    },
  ];

  useEffect(() => {
    axios.get(`http://oop.okusann.online:8088/get_all_section_by_semester_and_year/${selectedDate.semester}/${selectedDate.year}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setData_table(res.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again later.');
      });
  }, [selectedDate]);


  const enroll = (course, section) => {
 
    const headers = { "TOKEN": TOKEN };

    const body = {
      "student_id": student_id,
      "course_id": course,
      "section_number": section
    };
    console.log(body);


    try {
      axios.post('http://oop.okusann.online:8088/enroll', body, { headers: headers })
        .then((res => {
          console.log(res);
          if (res.status === 200) {
            console.log('Enroll Success');
            alert('Enroll Success');
          }
        }))
    } catch {
      alert('Enroll Failed');
      console.log('Enroll Failed')
    }
  }

  const handleInputChange = (inputType, value) => {
    if (inputType === 'courseId') {
      setCourse_id(value);
    } else if (inputType === 'sectionId') {
      setSection_number(value);
      console.log(value);
    }
  };

  return (
    <div className='backgroundenroll'>
      <NavbarStudent />
      <Dropdown />
      <DropdownDate className="dropdowndate_enroll" onDateChange={setSelectedDate} />
      <div className='button view'>
        view
      </div>
      <div className='container'>
        <DataTable className='DataTable' title="Course" columns={columns} data={data_table} />
      </div>
      <Footer onInputChange={handleInputChange} />
      <button className='enrollbutton' onClick={() => enroll(course_id, section_number)}>Enroll</button>
    </div>
  );
}

export default EnrollPage;
