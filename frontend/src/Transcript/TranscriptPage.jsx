import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import NavbarStudent from '../Component/NavbarStudent/NavbarStudent';
import { getUsername } from '../Authentication';
import axios from 'axios';
import './TranscriptPage.css';

function TranscriptPage() {
  const student_id = getUsername();
  const TOKEN = document.cookie.split('=')[1];

  const [data_table, setData_table] = useState([]);

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
      name: 'Credit',
      selector: row => row.credit,
      sortable: true,
    },
    {
      name: 'Grade',
      selector: row => row.grade,
      sortable: true,
    }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://oop.okusann.online:8088/get_all_student_transcripts/${student_id}`);
        if (response.status === 200) {
          setData_table(response.data);
          console.log(response.data);
        } else {
          console.error('Failed to fetch test_table data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching test_table data:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <div className='backgroundtrans'>
      <NavbarStudent />
      <div className='transcontainer'>
        <div className='topictrans'>
          {data_table.map((transcript, index) => (
            <div key={index}>
              <h3>{`semester : ${transcript.semester}, year : ${transcript.year} `}</h3>
              <DataTable
                columns={columns}
                data={transcript.enrollments}
              />
            </div>
          ))}
        </div>
        <div className='transtable'> 
          {/* Additional content or tables can be placed here if needed */}
        </div>
      </div>
    </div>
  );
}

export default TranscriptPage;
