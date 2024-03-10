import React, { useEffect, useState } from 'react';
import './DetailSection.css';
import NavbarTeacher from '../Component/NavbarTeacher/NavbarTeacher';
import { getUsername } from '../Authentication';
import DataTable from 'react-data-table-component';
import axios from 'axios';

function DetailSection() {
  const teacher_id = getUsername();
  const [isAssignGrade, setIsAssignGrade] = useState(false);
  const [isAssignScore, setIsAssignScore] = useState(false);
  const [dataStudentList, setDataStudentList] = useState([]);
  const [score, setScore] = useState({ part1: 0, part2: 0, part3: 0, part4: 0 });
  const [grade, setGrade] = useState('');

  const CourseID = new URLSearchParams(window.location.search).get('courseId');
  const SectionNumber = new URLSearchParams(window.location.search).get('sectionNumber');

  useEffect(() => {
    console.log(CourseID, SectionNumber);
    async function getDataStudentList() {
      try {
        const response = await axios.get(`http://oop.okusann.online:8088/get_detail_student_in_section/${CourseID}/${SectionNumber}`);
        if (response.status === 200) {
          console.log(response.data);
          setDataStudentList(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getDataStudentList();
  }, []);

  let columns = [
    {
      name: 'Student ID',
      selector: row => row.student_id,
      sortable: true,
      width : '110px',
    },
    {
      name: 'Student Name',
      selector: row => row.name,
      sortable: true,
      width : '200px',
    },
    {
      name: 'Faculty',
      selector: row => row.faculty,
      sortable: true,
      width : '200px',
    },
    {
      name: 'Major',
      selector: row => row.major,
      sortable: true,
      width : '200px',
    },
  ];

  if (isAssignScore) {
    columns.push(
      {
      name: 'Score Part 1',
      cell: row => < input type='text' className='inputscore' onChange={(e) => handleScoreChange(row.student_id, 'part1', e.target.value)} />, 
      width : '100px',
      },
      {
      name: 'Score Part 2',
      cell: row => <input type='text' className='inputscore' onChange={(e) => handleScoreChange(row.student_id, 'part2', e.target.value)}  />,
      width : '100px',
      },
      {
      name: 'Score Part 3',
      cell: row => <input type='text' className='inputscore' onChange={(e) => handleScoreChange(row.student_id, 'part3', e.target.value)}  />,
      width : '100px',
      },
      {
      name: 'Score Part 4',
      cell: row => <input type='text' className='inputscore' onChange={(e) => handleScoreChange(row.student_id, 'part4', e.target.value)}  />,
      width : '100px',
      }
    );
  }

  if (isAssignGrade) {
    columns.push(
      {
        name : 'Score Part 1',
        selector: row => row.score_1,
      },
      {
        name : 'Score Part 2',
        selector: row => row.score_2,
      },
      {
        name : 'Score Part 3',
        selector: row => row.score_3,
      },
      {
        name : 'Score Part 4',
        selector: row => row.score_4,
      },
      {
      name: 'Grade',
      cell: row => <input type='text' className='inputgrade' onChange={(e) => handleGradeChange(row.student_id, e.target.value) }/>,
      }
    );
  }

  const clickAssignGrade = () => {
    setIsAssignGrade(!isAssignGrade);
    setIsAssignScore(false);

  }

  const clickAssignScore = () => {
    setIsAssignScore(!isAssignScore);
    setIsAssignGrade(false);
  }

 const clickDone = () => {
    if (isAssignGrade) {
      window.confirm('Are you sure to assign grade?');
      PostGrade();
    }
    else if (isAssignScore) {
      window.confirm('Are you sure to assign score?');
      PostScore();
    }
    setIsAssignGrade(false);
    setIsAssignScore(false);
  }

  const handleScoreChange = (studentId, part, value) => {
    setScore(prevScore => ({
      ...prevScore,
      [studentId]: {
        ...prevScore[studentId],
        [part]: value,
      },
    }));
    console.log(score)
  };
  
  const handleGradeChange = (studentId, value) => {
    setGrade(prevGrade => ({
      ...prevGrade,
      [studentId]: value,
    }));
    console.log(grade)
  }

  const PostScore = () => {
    console.log("Score" , score)
  };

  const PostGrade = () => {
    console.log("Grade" , grade)
  };

  return (
    <div className='bgtc'>
      <NavbarTeacher teacher_id={teacher_id} />
      <div className="tccontainer">

        <div className='tctable-stdlist'>
          <DataTable
            name='student list in section'
            columns={columns}
            data={dataStudentList}
          />
        </div>
        <div className="tcbtn">
          <div>
            <button className='tcbtn-1' onClick={() => clickAssignGrade() }>Assign Grade</button>
            <button className='tcbtn-1' onClick={() => clickAssignScore() }>Assign Score</button>
          </div>
          <div className='tcbtn-done'>
            { (isAssignGrade || isAssignScore) && <button className='tcbtn-2' onClick={clickDone}>Done</button>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DetailSection;
