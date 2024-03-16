import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import { getUsername, getRole, Logout } from '../Authentication';
import DropdownDate from '../Component/DropdownDateOption/DropdownDate';
import './HomePageStudent.css';
import { CURRENT_SEMESTER , CURRENT_YEAR } from '../DateTime';
import { IoMdSearch } from "react-icons/io";
import { url } from '../URL';

function HomePageStudent() {
  if (getRole() != 'student') {
    Logout();
  }

  const [selectedDate, setSelectedDate] = useState({ 'semester' :  CURRENT_SEMESTER, 'year' : CURRENT_YEAR });
  const [data_table, setData_table] = useState([]);
  const student_id = getUsername();
  const [click_view, setClick_view] = useState(false);
  const TOKEN = document.cookie.split('=')[1];
  const [total_credit, setTotal_credit] = useState(0);
  const [student_data , setStudent_data] = useState({});

  const handleDateChange = (new_semester, new_year) => {
    setSelectedDate({ 'semester' : new_semester , 'year' : new_year });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data_api = await axios.get(url + `/get_student_by_student_id/${student_id}`);
        if (data_api.status === 200) {
          setStudent_data({
            'student_id' : data_api.data.student_id,
            'name' : data_api.data.name,
            'email' : data_api.data.email,
            'faculty' : data_api.data.faculty,
            'major' : data_api.data.major,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Data Not Found');
      }
    }
    fetchData();
  }
  , []);

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
      width: '30%',
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
      name : 'Location',
      selector: row => row.location,
      width: '15%',
    },
    {
      name: 'Schedule',
      selector: row => row.schedule,
      sortable: true,
      width: '20%',
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: 'darkviolet',
        color: 'white',
      },
    },
    rows: {
      style: {
        color: 'black',
      },
    },
  };

  if (!TOKEN) {
    window.location.href = '/';
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const URL = url + `/get_student_transcript_by_semester_and_year/${student_id}/${selectedDate.semester}/${selectedDate.year}`;
        const data_api = await axios.get(URL);
        if (data_api.status === 200) {
          console.log(data_api.data.enrollments)
          setData_table(data_api.data.enrollments);
          setTotal_credit(0);
          for (let i = 0; i < data_api.data.enrollments.length; i++) {
            setTotal_credit(total_credit => total_credit + data_api.data.enrollments[i].credit);
          }

          console.log('TOTAL CREDIt' , total_credit);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Data Not Found');
      }
    }
    fetchData();
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
    <div className='bgstd'>
      <NavbarStudent student_id={student_id} />
      <div className='stdcontainer'>
        <div className='stdtopic'>
          <h1 className='stdtext'>EnrollmentSystem</h1>
        </div>

        <div className='stdinfo'>
          <b>Student ID : </b> {student_data.student_id}   
          <b>Name :</b> {student_data.name} 
          <b>Email :</b> {student_data.email}
        </div>
        <div className='stdinfo'>
          <b>Faculty :</b> {student_data.faculty}   
          <b>Major :</b> {student_data.major}
        </div>

        <div className='stddropdd'>
          <div>
            <h3 className='stdheadtb01'>Class Schedule | Credit : {total_credit} / 27</h3>
          </div>
          <div>
            <DropdownDate onDateChange={handleDateChange} />
            <button className='stdviewdd' onClick={() => setClick_view(!click_view)}> <IoMdSearch/> </button>
          </div>
        </div>

        <div className='stdtable'>
          <DataTable
            columns={columns} 
            data={data_table}
            customStyles={customStyles}
            className="customHighlight"
            highlightOnHover
          />
        </div>

        <div className='stdbtn'>
          <button className='stdinteracbtn' onClick={redirect_to_enroll}>Enroll</button>
          <button className='stdinteracbtn' onClick={redirect_to_change}>Change</button>
          <button className='stdinteracbtn' onClick={redirect_to_drop}>Drop</button>
        </div>
      </div>
    </div>
  );
}

export default HomePageStudent;
