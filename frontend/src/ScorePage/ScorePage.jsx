import React , {useState, useEffect} from 'react'
import './ScorePage.css'
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent'
import DropdownDate from '../Component/DropdownDateOption/DropdownDate'
import axios from 'axios'
import { getRole, getUsername } from '../Authentication'
import { CURRENT_SEMESTER, CURRENT_YEAR } from '../DateTime'
import DataTable from 'react-data-table-component'
import { IoMdSearch } from "react-icons/io";


function ScorePage() {
  if (getRole() !== 'student') {
    window.location.href = '/';
  }

  const stundet_id = getUsername()
  const [dataTable , setDataTable] = useState([])
  const [selectedDate, setSelectedDate] = useState({ semester: CURRENT_SEMESTER, year: CURRENT_YEAR });
  const [isview, setIsview] = useState(false);
  const columns = [
  {
    name : 'Course ID',
    selector : row => row.course_id,
    width: '10%',
  },
  {
    name : 'Course Name',
    selector : row => row.course_name,
    width: '20%',
  },
  {
    name : 'Section',
    selector : row => row.section_number,
    width: '10%',
  },
  {
    name : 'Credit',
    selector : row => row.credit,
    width: '10%',
  },
  {
    name : 'Score Part 1',
    selector : row => row.score.score_1,
    width: '10%',
  },
  {
    name : 'Score Part 2',
    selector : row => row.score.score_2,
    width: '10%',
  },
  {
    name : 'Score Part 3',
    selector : row => row.score.score_3,
    width: '10%',
  },
  {
    name : 'Score Part 4',
    selector : row => row.score.score_4,
    width: '10%',
  },
  {
    name : 'Grade',
    selector : row => row.grade,
    width: '10%',
  }
  ]

  useEffect(() => {
    async function getScore() {
      try {
        const response = await axios.get(`http://oop.okusann.online:8088/get_student_transcript_by_semester_and_year/${stundet_id}/${selectedDate.semester}/${selectedDate.year}`);
        if (response.status === 200) {
          console.log("DATA" , response.data.enrollments);
          setDataTable(response.data.enrollments);
        }
        else {
          alert('Failed to fetch score data:');
        }
      } catch (error) {
        alert('Error fetching score data:');
      }
    }
    getScore();
  }, [isview]);

  const clickView = () => {
    setIsview(!isview);
  }

  const handleDateChange = (semester, year) => {
    setSelectedDate({ semester, year });
  }
  return (
    <div className='bgstd'>
      <NavbarStudent student_id={stundet_id}/>
      <div className='stdcontainer'>

        <div className='stdtopic'>
          <h1 className='stdtext'>Score Information</h1>
        </div>

        <div className='stddropdd'>
          <div className='stdheadtb01'>
            <h3>Your Score</h3>
          </div>
          <div>
            <DropdownDate  onDateChange={handleDateChange}  /> 
            <button className='stdviewdd' onClick={clickView}><IoMdSearch/></button>
          </div>
        </div>

        <div className='stdtable'>
          <DataTable
          name = 'score'
          columns={columns}
          data={dataTable}
          />
        </div>
         
      </div>
      
    </div>
  )
}

export default ScorePage