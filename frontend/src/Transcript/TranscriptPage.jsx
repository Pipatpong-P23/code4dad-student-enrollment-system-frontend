import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import { getUsername, Logout, getRole} from '../Authentication';
import axios from 'axios';
import './TranscriptPage.css';
import { url } from '../URL';

function TranscriptPage() {
  if (getRole() != 'student') {
    Logout();
  }
  const student_id = getUsername();
  const TOKEN = document.cookie.split('=')[1]; // Assuming you are using this TOKEN somewhere for your requests
  const [gps , setGps] = useState(0);

  const [data_table, setData_table] = useState([]);

  const columns = [
    {
      name: 'Course ID',
      selector: row => row.course_id,
      sortable: true,
      width: '15%',
    },
    {
      name: 'Course Name',
      selector: row => row.course_name,
      sortable: true,
      width: '45%',
    },
    {
      name: 'Credit',
      selector: row => row.credit,
      sortable: true,
      width: '20%',
    },
    {
      name: 'Grade',
      selector: row => row.grade,
      sortable: true,
      width: '20%',
    }
  ];

  function ParseFloat(num, precision) {
    if (num == 'N/A') return num;
    return parseFloat(num).toFixed(precision);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const URL = url + `/get_all_student_transcripts/${student_id}`;
        const response = await axios.get(URL);
        if (response.status === 200) {
          console.log('Data fetched:', response.data);
          setData_table(response.data);

        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [student_id]); // Added dependency on student_id for re-fetching if it changes

  return (
    <div className='bgstd'>
      <NavbarStudent student_id={student_id}/>

      <div className='transcontainer'>
        <div>
          {data_table.map((transcript, index) => (
            <div key={index}>
              <h3 className='headTran'>{`Transcript: Semester ${transcript.semester}, Year ${transcript.year}, GPS: ${ParseFloat(transcript.gps, 2)}`}</h3>
              <div className="std-transtb">
                <DataTable
                  columns={columns}
                  data={transcript.enrollments}
                  noHeader
                  defaultSortField="id"
                  defaultSortAsc={false}
                  highlightOnHover
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TranscriptPage;
