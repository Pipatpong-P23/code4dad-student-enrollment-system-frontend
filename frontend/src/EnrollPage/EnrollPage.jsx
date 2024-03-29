import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import Dropdown from './Dropdown/Dropdown';
import DropdownDate from '../Component/DropdownDateOption/DropdownDate';
import axios from 'axios';
import Footer from '../Component/Footer/Footer';
import { getUsername, getRole, Logout } from '../Authentication';
import './EnrollPage.css';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '../DateTime';
import { url } from '../URL';

function EnrollPage() {
  if (getRole() != 'student') {
    Logout();
  }
  const [data_table, setData_table] = useState([]);
  const student_id = getUsername();
  const [course_id, setCourse_id] = useState('');
  const [section_number, setSection_number] = useState();
  const current_semester = CURRENT_SEMESTER;
  const current_year = CURRENT_YEAR;
  const [selected, setSelected] = useState({});
  const [value, setValue] = useState({ courseId: '', sectionId: '' });
  const TOKEN = document.cookie.split('=')[1];
  const [searchText, setSearchText] = useState('');
  const [realData, setRealData] = useState([]);

  const columns = [
    {
      name: 'Course ID',
      selector: row => row.course_id,
      sortable: true,
      width: '10%',
    },
    {
      name: 'Course',
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
      width: '20%',
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
      width: '11%',
    },
    {
      name: 'Schedule',
      selector: row => row.schedule,
      sortable: true,
      width: '14%',
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
    async function fetchData() {
      try {
        const URL = url + `/get_all_section_by_semester_and_year/${current_semester}/${current_year}`;
        const data_api = await axios.get(URL);
        if (data_api.status === 200) {
          console.log(data_api.data, 'data')
          setData_table(data_api.data);
          setRealData(data_api.data);
        } 
      } catch (error) {
        console.error('Error fetching data:', error);
        alert(error.response.data.detail);
      }
    }
    fetchData();  
  }, []);

  const enroll = () => {
    const headers = {
      "TOKEN": TOKEN
    }
    
    const body = {
      "student_id": student_id,
      "course_id": course_id,
      "section_number": section_number
    }
    async function PostData() {
      try {
        const URL = url + '/enroll';
        const data_api = await axios.post(URL, body, {headers: headers});
        if (data_api.status === 200) {
          alert('Enroll Success');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert(error.response.data.detail);
      }
    }
    PostData();
  }
  
  const handleInputChange = (inputType, value) => {
    if (inputType === 'courseId') {
      setCourse_id(value);
    } else if (inputType === 'sectionId') {
      setSection_number(value);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);

    const filteredData = realData.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(e.target.value.toLowerCase())
      );
    });

    setData_table(filteredData);
  };

  const handleInputChangeTable = (rows) => {
    setSelected(rows.selectedRows);
    if (rows.selectedRows.length === 1) {
      const { course_id, section_number } = rows.selectedRows[0];
      setCourse_id(course_id);
      setSection_number(section_number);
      setValue({ courseId: course_id, sectionId: section_number });
      console.log(course_id, section_number)
    } 
  }

  return (
    <div className='bgstd'>
      <NavbarStudent student_id={student_id}/>
      <div className='stdcontainer'>

        <div className='stddropdd01'>
          <div className='stdheadtb02'>
            <h3>Course</h3>
          </div>
          <div>
            <input className='searchbar' type="text" placeholder='Search by anything...' value={searchText} onChange={handleSearch}/>
          </div>
        </div>

        <div className='stdtable'>
          <DataTable
            className='DataTable'
            columns={columns} 
            data={data_table}
            selectableRows
            selectableRowsSingle
            onSelectedRowsChange={handleInputChangeTable}
            clearSelectedRows={true}
            // customStyles={customStyles}
          />
        </div>
          
      </div>
      <div className='enrollfoot'>
        <Footer onInputChange={handleInputChange} course_id={course_id} section_id={section_number} />
        <button className='enrollbtn' onClick={enroll}>Enroll</button>

      </div>
    </div>
  );
}

export default EnrollPage;