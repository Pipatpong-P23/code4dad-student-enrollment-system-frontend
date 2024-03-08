import React , {useState , useEffect} from 'react'
import NavbarTeacher from '../Component/NavbarTeacher/NavbarTeacher'
import { getUsername } from '../Authentication'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import DropdownDate from '../Component/DropdownDateOption/DropdownDate'
import './HomePageTeacher.css'

function HomePageTeacher() {
    const teacher_name = getUsername();
    const [selectedDate, setSelectedDate] = useState({ semester: '1', year: '2024' });
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
            sortable : true
        },
        {
            name : 'Course Name',
            selector : row => row.course_name,
            sortable : true
        },
        {
            name : 'Section Number',
            selector : row => row.section_number,
            sortable : true
        },
        {
            name : 'Number of Students',
            selector : row => row.number_of_student,
            sortable : true
        },
        {
            name : 'Location',
            selector : row => row.location,
            sortable : true
        },
        {
            name : 'Datetime',
            selector : row => row.schedule,
            sortable : true
        },
        {
            name : 'Detail',
            cell : row => <button onClick={() => { window.location.href = '/detail section'}}>detail</button>
        }
    ]

    useEffect(() => {
        async function get_all_section() {
            try{
                const response = await axios.get(`http://oop.okusann.online:8088/get_all_sections_taught_by_teacher_id/${teacher_name}/${selectedDate.semester}/${selectedDate.year}`);
                if (response.status == 200) {
                    console.log("OK", response.data);
                    if (response.data.length > 0) {
                        console.log(response.data);
                        setDataSection(response.data);
                    }
                    else if (response.data.length == 0){
                        alert("No data found");
                    }
                }
                else{
                    alert("Something went wrong");
                }
                }catch (error) {
                    alert("No data found");
                    return 
        }
    }
    get_all_section();
    }, [isview]);

    return (
        <div>
            <NavbarTeacher teacher_id={teacher_name} />
            <div className='dropdowndate'>
                <DropdownDate  onDateChange={handleDateChange}/>
                <button className =' viewbutton' onClick={view_section}> view </button>
            </div>
            <div className="sectiontable">
                <DataTable
                name = "Section Table"
                columns = {columns_section}
                data = {dataSection}
                />
            </div>
            <div className="button">
                <button onClick={ () => { window.location.href = '/add section'}}> Add Section </button>
                <button onClick={ () => { window.location.href = '/add course'}}> Add Course </button>
            </div>
        </div>
    )
}

export default HomePageTeacher