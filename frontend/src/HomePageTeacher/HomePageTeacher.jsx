import React , {useState , useEffect} from 'react'
import { IoMdSearch } from "react-icons/io";
import NavbarTeacher from '../Component/NavbarTeacher/NavbarTeacher'
import { getUsername, Logout, getRole  } from '../Authentication'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import DropdownDate from '../Component/DropdownDateOption/DropdownDate'
import './HomePageTeacher.css'
import { CURRENT_SEMESTER, CURRENT_YEAR } from '../DateTime';
import { url } from '../URL';

function HomePageTeacher() {
    if (getRole() != 'teacher') {
        Logout();
    }

    const teacher_name = getUsername();
    const [selectedDate, setSelectedDate] = useState({ semester: CURRENT_SEMESTER, year: CURRENT_YEAR });
    const [isview, setIsview] = useState(false);
    const [dataSection , setDataSection] = useState([]);
    
    const handleDateChange = (semester, year) => {
        setSelectedDate({ semester, year });
    };

    const view_section = () => {
        setIsview(!isview);
    }
    const columns_section = [
        {
            name : 'Course ID',
            selector : row => row.course_id,
            sortable : true,
            width: '10%',
        },
        {
            name : 'Course Name',
            selector : row => row.course_name,
            sortable : true,
            width: '20%',
        },
        {
            name : 'Section Number',
            selector : row => row.section_number,
            sortable : true,
            width: '15%',
        },
        {
            name : 'Number of Students',
            selector : row => row.number_of_student,
            sortable : true,
            width: '15%',

        },
        {
            name : 'Location',
            selector : row => row.location,
            sortable : true,
            width: '15%',

        },
        {
            name : 'Datetime',
            selector : row => row.schedule,
            sortable : true,
            width: '15%',

        },
        {
            name : 'Detail',
            cell : row => <button className='detailbtn' onClick={() => ClickDetail(row.course_id, row.section_number, row.grading_type)}>detail</button>,
            width: '10%',
        }
    ]

    const ClickDetail = (course_id, section_number, grade_type) => {
        window.location.href = `/detail section?courseId=${course_id}&sectionNumber=${section_number}&semester=${selectedDate.semester}&year=${selectedDate.year}&gradeType=${grade_type}`;
    }

    useEffect(() => {
        async function get_all_section() {
            try{
                const URL = url + `/get_all_sections_taught_by_teacher_id/${teacher_name}/${selectedDate.semester}/${selectedDate.year}`;
                const response = await axios.get(URL);
                if (response.status == 200) {
                    console.log("OoK", response.data);
                    if (response.data.length > 0) {
                        console.log(response.data);
                        setDataSection(response.data);
                    }
                    else if (response.data.length == 0){
                        alert("data not found");
                    }
                }
                else{
                    alert("Something went wrong");
                }
                }catch (error) {
                    console.log("Error", error);
                    return 
        }
    }
    get_all_section();
    }, [isview]);

    return (
        <div className='bgtc'>
            <NavbarTeacher teacher_id={teacher_name} />
            <div className='tccontainer'>
                <div className='tcdropdd'>
                    <div className='tctopic'>
                        <h3>Class Schedule</h3>
                    </div>
                    <div>
                        <DropdownDate  onDateChange={handleDateChange}/>
                        <button className ='tcviewbutton' onClick={view_section}><IoMdSearch/></button>
                    </div>
                </div> 

                <div className="tctable">
                    <DataTable
                    name = "Section Table"
                    columns = {columns_section}
                    data = {dataSection}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePageTeacher
