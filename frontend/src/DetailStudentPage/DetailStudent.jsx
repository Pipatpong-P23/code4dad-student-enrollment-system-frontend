import React, {useEffect, useState} from 'react'
import './DetailStudent.css'
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin'
import axios from 'axios'
import { getUsername, getRole, Logout } from '../Authentication'
import DataTable from 'react-data-table-component'
import { IoMdSearch } from "react-icons/io";
import { url } from '../URL'

function DetailStudent() {
    if (getRole() != 'admin') {
        Logout();
    }
    
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');

    const [data_student, setData_student] = useState([]);
    const adminID = getUsername();
    const TOKEN = document.cookie.split('=')[1];
    const [FacultyOption, setFacultyOption] = useState([]);
    const [MajorOption, setMajorOption] = useState([{faculty: '', major: []}]);
    
    useEffect(() => {
        async function get_all_faculty_and_major() {
            try {
                const URL = url + '/get_all_faculties';
                const response = await axios.get(URL);
                if (response.status === 200) {
                    const faculties = response.data.map(fac => fac.faculty_name);
                    const majors = response.data.map(fac => ({
                        faculty: fac.faculty_name,
                        major: fac.major_list,
                    }));
    
                    setFacultyOption(faculties);
                    setMajorOption(majors);
                } else {
                    console.error('Failed to fetch faculty and major data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching faculty and major data:', error);
            }
        }
        get_all_faculty_and_major();
        
    }, []);
    

    const confirmDelete = (student_id) => {
        if (window.confirm('Are you sure you want to delete ' + student_id + ' ?')) {
            handleDelete(student_id);
        }
    }

    const handleDelete = (student_id) => {
        async function delete_student() {
            try {
                const URL = url + `/delete_user_by_username/${student_id}`;
                const response = await axios.delete(URL);
                if (response.status === 200) {
                    console.log(response.data);
                    alert('Delete Success');
                    getStudentList();
                }
            } catch (error) {
                console.error(error);
                alert('Delete Failed');
            }
        }
        delete_student();
    }

    const columns = [
        {
            name : 'Student ID',
            selector: row => row.student_id,
            width : '10%',
        },
        {
            name : 'Student Name',
            selector: row => row.name,
            width : '15%',
        },
        {
            name : 'Email',
            selector: row => row.email,
            width : '15%',
        },
        {
            name : 'Citizen ID',
            selector: row => row.citizen_id,
            width : '12.5%',
        },
        {
            name : 'Faculty',
            selector: row => row.faculty,
            width : '12.5%',
        },
        {
            name : 'Major',
            selector: row => row.major,
            width : '15%',
        },
        {
            name : 'Year entered',
            selector: row => row.year_entered,
            width : '10%',
        },
        {
            name : 'Delete',
            cell : row => <button className='btn-delete' onClick={ () => confirmDelete(row.student_id) }>Delete</button>,
            width : '10%',
        }
    ]

    const getStudentList = () => {
        async function get_student_list() {
            try {
                const URL = url + `/get_all_student_in_major/${selectedFaculty}/${selectedMajor}`;
                const response = await axios.get(URL);
                if (response.status === 200) {
                    console.log(response.data);
                    setData_student(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        get_student_list();
    }

    return (
    <div className='bgAd'>
        <NavbarAdmin admin_id={adminID}/>
        <div className="Adcontainer">

            <div className="options">
                <select value={selectedFaculty} onChange={e => setSelectedFaculty(e.target.value)}>
                    <option className='op-sl' value="">Select Faculty</option>
                    {FacultyOption.map((faculty, index) => (
                    <option key={index} value={faculty}>{faculty}</option>
                    ))}
                </select>
                <select value={selectedMajor} onChange={e => setSelectedMajor(e.target.value)} disabled={!selectedFaculty}>
                    <option className='op-sl' value="">Select Major</option>
                    {selectedFaculty && MajorOption
                    .filter(({faculty}) => faculty === selectedFaculty)[0]
                    .major.map((major, index) => (
                    <option key={index} value={major}>{major}</option>
                    ))}
                </select>
        
                <div>
                    <button className='btnfilter' onClick={ getStudentList }><IoMdSearch/></button>
                </div>

            </div>

            <div className='stdheadtb'>
                <h3>Detail Student</h3>
            </div>

            <div className="Adtable">
                <DataTable
                name = "Student Data"
                columns={columns}
                data={data_student}
                />
            </div>
        </div>

    </div>
     )
}

export default DetailStudent