import React, { useState, useEffect } from 'react';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import Footer from '../Component/Footer/Footer';
import './ChangeSection.css';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { getUsername } from '../Authentication';

function ChangeSection() {
  const [data_table, setData_table] = useState([]);
  const [data_table_course, setData_table_course] = useState([]);

  const student_id = getUsername();
  const TOKEN = document.cookie.split('=')[1];
  const current_semester = 1;
  const current_year = 2024;

  const [course_id, setCourse_id] = useState('');
  const [section_number, setSection_number] = useState(0);
  const [new_section_number, setNew_section_number] = useState(0);
  
  const columns_course = [
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
    axios.get(`http://oop.okusann.online:8088/get_all_section_by_semester_and_year/${current_semester}/${current_year}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setData_table_course(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Error Data Fetching');
      });

    axios.get(`http://oop.okusann.online:8088/get_student_enrolled_courses/${student_id}/${current_semester}/${current_year}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setData_table(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Error Data Fetching');
      });
  }, []);

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (name === 'course_id') {
      setCourse_id(value);
    } else if (name === 'section_number') {
      setSection_number(value);
    } else if (name === 'new_section_number') {
      setNew_section_number(value);
    }
  };

  const change = () => {
    const headers = {
      "TOKEN": TOKEN
    };

    const body = {
      "student_id": student_id,
      "course_id": course_id,
      "old_section_number": section_number,
      "new_section_number": new_section_number
    };

    axios.post('http://oop.okusann.online:8088/change_section', body, { headers: headers })
      .then((res => {
        console.log(res);
        if (res.status === 200) {
          alert('Change Section Success');
        }
      }))
      .catch((error) => {
        console.log(error);
        alert('Error Data Fetching');
      });

  };

  return (
    <div className='backgroundchange'>
      <NavbarStudent student_id={student_id} />
      <div className='container'>
        <div className='topicenroll'>
          <p className='entext'>Change Section</p>
        </div>

        <div className='table'>
          <DataTable
            className='changetable'
            title='Course'
            data={data_table_course}
            columns={columns_course}
          />
          <DataTable
            className='changetable'
            title='Your Course'
            data={data_table}
            columns={columns}
          />
        </div>

      </div>

      <div className='enrollfoot'>
        <Footer onInputChange={handleInputChange} />
        <button className='enrollbutton' onClick={change}>Change</button>
      </div>

    </div>
  );
}

export default ChangeSection;
