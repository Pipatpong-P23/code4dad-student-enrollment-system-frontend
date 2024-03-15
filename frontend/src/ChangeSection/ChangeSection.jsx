import React, { useState, useEffect } from 'react';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import Footer from '../Component/Footer/Footer';
import './ChangeSection.css';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { getUsername, getRole, Logout } from '../Authentication';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '../DateTime';
import { url } from '../URL';

function ChangeSection() {
  if (getRole() != 'student') {
    Logout();
  }
  
  const student_id = getUsername();
  const current_semester = CURRENT_SEMESTER;
  const current_year = CURRENT_YEAR;
  const [course_id, setCourse_id] = useState('');
  const [old_section, setOld_section] = useState(0);
  const [new_section, setNew_section] = useState(0);
  
  const [sectionCourses, setSectionCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [isTableSectionActive, setIsTableSectionActive] = useState(false);

  const TOKEN = document.cookie.split('=')[1];
  const columns_section =[
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
      width: '20%',
    },
    {
      name: 'Section Number',
      selector: row => row.section_number,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Teacher',
      selector: row => row.teacher,
      sortable: true,
      width: '15%',
    },
    {
      name: 'Number of Students',
      selector: row => row.number_of_student,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Datetime',
      selector: row => row.schedule,
      sortable: true,
      width: '15%',
    },
    {
      name: 'Change Section',
      cell: row => <button className = "btnc" onClick={() => changeSection(row.section_number)}>Change</button>,
      width: '10%',
    }
  ]

  const columns_enrolled = [
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
      width: '40%',
    },
    {
      name: 'Credit',
      selector: row => row.credit,
      sortable: true,
      width: '15%',
    },
    {
      name: 'Section Number',
      selector: row => row.section_number,
      sortable: true,
      width: '15%',

    },
    {
      name: 'Datetime',
      selector: row => row.schedule,
      sortable: true,
      width: '15%',
    },
  ];

  const getsectiondata = async (courseID) => {
  
    // const URL = `http://oop.okusann.online:8088/get_all_sections_by_course_id/${courseID}`;

    const URL = url + `/get_all_sections_by_course_id/${courseID}`;
    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        console.log(response);
        setSectionCourses(response.data);
        setIsTableSectionActive(true);
      }
    } catch (error) {
      console.error('Error fetching section courses:', error);
      setIsTableSectionActive(false);
      alert('Cannot get section courses');
    }
  };

  
  
  useEffect(() => {
    // const URL = `http://oop.okusann.online:8088/get_student_transcript_by_semester_and_year/${student_id}/${current_semester}/${current_year}`;
    const URL = url + `/get_student_transcript_by_semester_and_year/${student_id}/${current_semester}/${current_year}`;
    async function getEnrollCourse() {
      try {
        const response = await axios.get(URL);
        if (response.status === 200) {
          setEnrolledCourses(response.data.enrollments); 
        }
      } catch (error) {
        alert('Cannot get enrolled courses');
      }
    }
    getEnrollCourse();
  }, []);

  const handleInputChangeTable = (rows) => {
    if (rows.selectedCount == 1) {
      const selected = rows.selectedRows[0];
      setOld_section(selected.section_number);
      setCourse_id(selected.course_id);
      getsectiondata(selected.course_id);
    }
    else{
      setIsTableSectionActive(false);
    }
  }

  const handleCourseIdChange = (event) => {
    const {value} = event.target;
    setCourse_id(value);
    if (course_id.length == 8) {getsectiondata(value);}
    else{setIsTableSectionActive(false);}
  };

  async function changeSection(new_section){
    // const URL = 'url + /change_section';
    const URL = url + `/change_section`;
    const headers = {
      "TOKEN" : TOKEN
    }
    console.log(student_id, course_id, old_section, new_section)

    const body = {
      "student_id": student_id,
      "course_id": course_id,
      "old_section_number": old_section,
      "new_section_number": new_section
    }
    console.log(body);
    try {
      const response = await axios.post(URL, body, {headers: headers});
      if (response.status === 200) {
        alert('Change Section Success');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.detail);
    }
  }

  return (
    <div className='bgstd'>
      <NavbarStudent student_id={student_id} />
      <div className='stdchcontainer'>
        <div className='stdheadtb'>
          <h3>Change Section</h3>
        </div>

        <div className='chtable'>
          <DataTable 
            name='my section enrolled'
            data={enrolledCourses} 
            columns={columns_enrolled}
            selectableRows
            selectableRowsSingle 
            onSelectedRowsChange={handleInputChangeTable}
            clearSelectedRows={true}
          />
        </div>
        <div className='sectionchtable'>
          { isTableSectionActive && <DataTable
          name = 'section to change'
          data={sectionCourses}
          columns={columns_section}

          />}
        </div>
      </div>

{/* -----------------ไม่ใช้---------------- */}
      {/* <div className='enrollfoot'>
        <footer className='FooterChangePage'> 
          <input type="text" placeholder='course id' className='inputnoused' 
                  value={course_id} onChange={handleCourseIdChange} 
                  />
        </footer>
      </div> */}
    </div>
  );
}

export default ChangeSection;
