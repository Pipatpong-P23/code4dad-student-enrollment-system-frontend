import React, { useEffect, useState } from 'react';
import './DetailCourse.css';
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin';
import { getUsername, getRole, Logout } from '../Authentication';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '../DateTime';
import { GiColiseum } from 'react-icons/gi';
import { IoMdSearch } from "react-icons/io";


function DetailCourse() {
    const [dataTable, setDataTable] = useState([]);
    const [FacultyOption, setFacultyOption] = useState([]);
    const [MajorOption, setMajorOption] = useState([{ faculty: '', major: [] }]);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [isSearch , setIsSearch] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(CURRENT_SEMESTER);
    const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);

    const handleDelete = (course_id, section_number) => {
        async function deleteCourse() {
            try {
                const response = await axios.delete(`http://oop.okusann.online:8088/delete_section_from_course/${course_id}/${section_number}/${selectedSemester}/${selectedYear}`);
                if (response.status === 200) {
                    console.log(response.data);
                    alert('Delete Success');
                    setIsSearch(true);
                } else {
                    alert('Delete Failed');
                }
            } catch (error) {
                alert('Error deleting course');
            }
        }
        if (window.confirm(`Are you sure you want to delete ${course_id} section ${section_number} ?`)) {
            deleteCourse();
        }
    }

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
            name: 'Section Number',
            selector: row => row.section_number,
            sortable: true,
        },
        {
            name : 'Grading Type',
            selector: row => row.grading_type,
        },
        {
            name : 'Teacher',
            selector: row => row.teacher,
        },
        {
            name : 'Number of Student',
            selector: row => row.number_of_student,
            sortable: true,
        },
        {
            name : 'Location',
            selector: row => row.location,
        },
        {
            name : 'Schedule',
            selector: row => row.schedule,
        },
        {
            name : 'Delete',
            cell: row => <button className='btn-delete' onClick={() => handleDelete(row.course_id, row.section_number)}>Delete</button>,
        }
    ];

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
    }, []);

    const getCourseList = () => {
        async function getCourseList() {
            try {
                const response = await axios.get(`http://oop.okusann.online:8088/get_all_section_in_major_by_semester_and_year/${selectedFaculty}/${selectedMajor}/${selectedSemester}/${selectedYear}`);
                if (response.status === 200) {
                    console.log("Course ", response.data);
                    setDataTable(response.data);
                } else {
                    console.error('Failed to fetch course data');
                }
            } catch (error) {
                alert('Error fetching course data');
            }
        }
        getCourseList();
    };

    if (getRole() !== 'admin') {
        Logout();
    }
    
    if (isSearch) {
        getCourseList();
        setIsSearch(false);
    }

    const AdminId = getUsername();
    const SemesterOptions = ['1', '2'];
    const YearOptions = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

    console.log('selectedFaculty:', selectedFaculty);
    console.log('selectedMajor:', selectedMajor);

    return (
        <div className='bgAd'>
            <NavbarAdmin admin_id={AdminId} />
            
            <div className="Adcontainer">

                <div className="options">
                    <label htmlFor='faculty'>Faculty:</label>
                    <select
                        className='select'
                        id='faculty'
                        name='faculty'
                        value={selectedFaculty}
                        onChange={(e) => setSelectedFaculty(e.target.value)}
                    >
                        <option value="" disabled>Please select faculty</option>
                        {FacultyOption.map((faculty, index) => (
                            <option key={index} value={faculty}>{faculty}</option>
                        ))}
                    </select>

                    <label htmlFor='major'>Major:</label>
                    <select
                        className='select'
                        value={selectedMajor}
                        onChange={(e) => setSelectedMajor(e.target.value)}
                        disabled={!selectedFaculty}
                    >
                        <option className='op-sl' value="">Select Major</option>
                        {selectedFaculty &&
                            MajorOption.filter(({ faculty }) => faculty === selectedFaculty)[0]?.major.map((major, index) => (
                                <option key={index} value={major}>{major}</option>
                            ))}
                    </select>

                    <label htmlFor='semester'>Semester:</label>
                    <select
                        className='select'
                        id='semester'
                        name='semester'
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                    >
                        {SemesterOptions.map((semester, index) => (
                            <option key={index} value={semester}>{semester}</option>
                        ))}
                    </select>

                    <label htmlFor='year'>Year:</label>
                    <select
                        className='select'
                        id='year'
                        name='year'
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        {YearOptions.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>

                    <button className='btnfilter' onClick={() => setIsSearch(true)}><IoMdSearch/></button>
                </div>
                
                <div className='Adtable'>
                    {  dataTable.length === 0 ?
                        <div className='no-data'>
                            <GiColiseum />
                            <h3 className='Nodata'>No data</h3>
                        </div>
                        :
                        <DataTable
                            columns={columns}
                            data={dataTable}
                        />
                    }
                </div>

            </div>
            
        </div>
    );
}

export default DetailCourse;
