import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin'; 
import { getUsername, getRole, Logout } from '../Authentication';
import axios from 'axios';
import './AddCourse.css';
import DataTable from 'react-data-table-component';

function AddCourse() {
  if (getRole() != 'admin') {
    Logout();
  }
  const [dataInput, setDataInput] = useState({
    'Course ID': '',
    'Section Number': '',
    'Course Name': '',
    'Credit': '',
    'Course Type': '',
    'Grading Type': '',
    'Faculty': '',
    'Major': '',
    'Course Group': '',
    'Pre-requisite Course ID': '',
    'Co-requisite Course ID': '',
    'Co-requisite Section Number': '',

  });

  const dataCo_requisite = [
    { Data: 'Course ID' },
    { Data: 'Section Number' },
    { Data: 'Co-requisite Course ID' },
    { Data: 'Co-requisite Section Number' },
  ];


  const dataCreate_Course = [
    { Data: 'Course ID' },
    { Data: 'Course Name' },
    { Data: 'Credit' },
    { Data: 'Course Type' },
    { Data: 'Grading Type' },
  ];

  const dataAdd_Course_to_Major = [
    { Data: 'Course ID' },
    { Data: 'Faculty' },
    { Data: 'Major' },
    { Data: 'Course Group' },
  ];

  const TOKEN = document.cookie.split('=')[1];

  const courseTypeOptions = ["Gen-Ed", "Faculty", "Curriculum"];
  const gradingTypeOptions = ["Grade ", "Pass/Fail"];
  const groupTypeOptions = ["Core Course", "Elective Course"];
  const [isAddPre, setAddPre] = useState(false);
  const [isCreateCourse, setCreateCourse] = useState(true);
  const [isAddCo, setAddCo] = useState(false);
  const [isAddCourse_to_Major, setAddCourse_to_Major] = useState(false);
  const [dataTable, setDataTable] = useState(dataCreate_Course);
  const [FacultyOption, setFacultyOption] = useState([]);
  const [MajorOption, setMajorOption] = useState([{faculty: '', major: []}]);


  useEffect(() => {
    async function get_all_faculty_and_major() {
        try {
            const response = await axios.get('http://oop.okusann.online:8088/get_all_faculties');
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

  const CodeType = {
    "Gen-Ed": 0 ,
    "Faculty": 1,
    "Curriculum": 2,
    "Grade ": 0,
    "Pass/Fail": 1
  }

  const decodeType = (data, value) => {
    return Object.keys(data).find(key => data[key] === value);
  };

  const handleInputChange = (field, value) => {
    setDataInput({ ...dataInput, [field]: value });
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: '62px',
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
      },
    },

  }

  const columns = [
    {
      name: 'Title',
      selector: row => row.Data,
      // width: '35%',
    },
    {
      name: 'Input Data',
      // width: '65%',
      cell: (row) => {
        if (row.Data === 'Course Type') {
          return (
            <select
              className='inputdata'
              onChange={(e) => handleInputChange(row.Data, e.target.value)}
              value={dataInput['Course Type']}
            >
            <option value="">Select Course Type</option>
               {courseTypeOptions.map((type) => (
            <option className='opselect' key={type} defaultValue={"Gen-Ed"} value={type}>{type}</option>
      ))}
    </select>
          );
        }
         else if (row.Data === 'Grading Type') {
          return (
            <select
              className='inputdata'
              onChange={(e) => handleInputChange(row.Data, e.target.value)}
              value={dataInput['Grading Type']}
            >
              <option className='opselect' value="Grade">Select Grading Type</option>
              {gradingTypeOptions.map((type) => (
                <option className='opselect' key={type} value={type}>{type}</option>
              ))}
            </select>
          );
        }
        
        else if (row.Data === 'Faculty') {
          return (
            <select
              className='inputdata'
              onChange={(e) => handleInputChange(row.Data, e.target.value)}
              value={dataInput['Faculty']}
            >
              <option value="">Select Faculty</option>
              {FacultyOption.map((faculty) => (
                <option className='opselect' key={faculty} value={faculty}>{faculty}</option>
              ))}
            </select>
          );
        }

        else if (row.Data === 'Major') {
          const filteredMajorOption = MajorOption.find(({ faculty }) => faculty === dataInput['Faculty']);
          const majorOptions = filteredMajorOption ? filteredMajorOption.major : [];
        
          return (
            <select
              className='inputdata'
              onChange={(e) => handleInputChange(row.Data, e.target.value)}
              value={dataInput['Major']}
            >
              <option className='opselect' defaultValue={''}>Select Major</option>
              {majorOptions.map((major) => (
                <option className='opselect' key={major} value={major}>{major}</option>
              ))}
            </select>
          );
        }
        else if (row.Data === 'Course Group') {
          return (
            <select
              className='inputdata'
              onChange={(e) => handleInputChange(row.Data, e.target.value)}
              value={dataInput['Course Group']}
            >
              <option value="">Select Course Group</option>
              {groupTypeOptions.map((type) => (
                <option className='opselect' key={type} value={type}>{type}</option>
              ))}
            </select>
          );
        }        
        else {
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

  const dataPre_requisite = [
    { Data: 'Course ID' },
    { Data: 'Pre-requisite Course ID' },
  ];

  const admin_id = getUsername();

  const addPre = () => {
    async function addPre() {
      try {
        const URL = `http://oop.okusann.online:8088/add_pre_requisite_to_course`;
        const headers = {
          "TOEKN": TOKEN,
        }
        const body = {
          "course_id": dataInput['Course ID'],
          "pre_requisite_course_id": dataInput['Pre-requisite Course ID'],
        };

        const response = await axios.post(URL, body, {headers: headers});
        if (response.status === 200) {
          alert('Add pre-requisite course success');
          window.location.reload();
        } else {
          alert('Add pre-requisite course failed');
        }
      }
      catch (error) {
        alert('Add pre-requisite course failed');
      }
    }
    addPre();
  }

  const addCourse_to_Major = () => {
    async function add_course_to_major() {
      try {
        const URL = `http://oop.okusann.online:8088/add_course_to_major`;
        const headers = {
          "TOEKN": TOKEN,
        }
        const body = {
          "faculty_name": dataInput['Faculty'],
          "major_name": dataInput['Major'],
          "course_id": dataInput['Course ID'],
          "course_group": dataInput['Course Group'],
        };

        console.log("BODY " ,body)

        const response = await axios.post(URL, body, {headers: headers});
        if (response.status === 200) {
          alert('Add course to major success');
          window.location.reload();
        } else {
          alert('Add course to major failed');
        }
      }
      catch (error) {
        alert(error.response.data.detail);
      }
    }
    add_course_to_major();
  }


  const addCo = () => {
    async function addCo() {
      try {
        const URL = `http://oop.okusann.online:8088/add_co_requisite_to_course_section`;
        const headers = {
          "TOEKN": TOKEN,
        }
        const body = {
          "course_id": dataInput['Course ID'],
          "section_number" : Number(dataInput['Section Number']),
          "co_requisite_course_id": dataInput['Co-requisite Course ID'],
          "co_requisite_section_number": Number(dataInput['Co-requisite Section Number']),
        };

        console.log("BODY " ,body);

        const response = await axios.post(URL, body, {headers: headers});
        if (response.status === 200) {
          alert('Add co-requisite course success');
          window.location.reload();
        } else {
          alert('Add co-requisite course failed');
        }
      }
      catch (error) {
        alert('Add co-requisite course failed');
      }
    }
    addCo();
  }

  const addCourse = () => {
    async function CreateCourse() {
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
        } else {
          alert('Add course failed');
        }
      }
      catch (error) {
        console.error('Error fetching data');
        alert('Add course failed');
      }
    }
    CreateCourse();
  }

  const clickDone = () => {
    console.log(dataInput);
    if (isCreateCourse && window.confirm('Are you sure you want to add this course?')) {
      addCourse();
    } else if (isAddPre && window.confirm('Are you sure you want to add this pre-requisite course?')) {
      addPre();
    } else if (isAddCo && window.confirm('Are you sure you want to add this co-requisite course?')) {
      addCo();
    }
    else if (isAddCourse_to_Major && window.confirm('Are you sure you want to add this course to major?')) {
      addCourse_to_Major();
    }
  }

  const clearInput = () => {
    setDataInput({
      'Course ID': '',
      'Section Number': '',
      'Course Name': '',
      'Credit': '',
      'Course Type': '',
      'Grading Type': '',
      'Faculty': '',
      'Major': '',
      'Course Group': '',
      'Pre-requisite Course ID': '',
      'Co-requisite Course ID': '',
      'Co-requisite Section Number': '',
    });
  }
  
  const click_create_course = () => {
    clearInput();
    setCreateCourse(true);
    setAddPre(false);
    setAddCo(false);
    setAddCourse_to_Major(false);
    setDataTable(dataCreate_Course);
  }

  const click_add_pre = () => {
    clearInput();
    setCreateCourse(false);
    setAddPre(true);
    setAddCo(false);
    setAddCourse_to_Major(false);
    setDataTable(dataPre_requisite);
  }

  const click_Co = () => {
    clearInput();
    setCreateCourse(false);
    setAddCo(true);
    setAddPre(false);
    setAddCourse_to_Major(false);
    setDataTable(dataCo_requisite);
  }

  const click_add_course_to_major = () => {
    clearInput();
    setCreateCourse(false);
    setAddCo(false);
    setAddPre(false);
    setAddCourse_to_Major(true);
    setDataTable(dataAdd_Course_to_Major);
  }
  
  return (
    <div className='bgAd'>
      <NavbarAdmin admin_id={admin_id} />

      <div className='Adcontainer'> 
        <div className="btn-add-user">
          <button className='btn-Add02' onClick={() => click_create_course() }>Create Course</button>
          <button className='btn-Add02'onClick={() => click_add_course_to_major() } >Add Course to Major</button>
          <button className='btn-Add02'onClick={() => click_add_pre() } >Add Pre-requisite Course</button>
          <button className='btn-Add02'onClick={() => click_Co() } >Add Co-requisite Course</button>
        </div>

        <div className="Adtable">
          <DataTable
            name='Add Course Table'
            columns={columns}
            data={dataTable}
            noHeader
            persistTableHead
            customStyles={customStyles}
          />
        </div>
        <div className='btn-done'>
          <button className='btn-admin' onClick={() => clickDone()}>Done</button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;