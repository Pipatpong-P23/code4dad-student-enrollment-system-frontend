import React, { useState } from 'react';
import './DetailSection.css';
import NavbarTeacher from '../Component/NavbarTeacher/NavbarTeacher';
import { getUsername } from '../Authentication';
import DataTable from 'react-data-table-component';

function DetailSection() {
  const teacher_id = getUsername();
  const [isAssignGrade, setIsAssignGrade] = useState(false);
  const [isAssignScore, setIsAssignScore] = useState(false);

  const [dataStudentList, setDataStudentList] = useState([]);
  const [score, setScore] = useState({ part1: 0, part2: 0, part3: 0, part4: 0 });
  const [grade, setGrade] = useState('');

  const test_data = [
    { name: 'A', student_id: '10111', faculty: 'IT', major: 'CS' },
    { name: 'B', student_id: '22022', faculty: 'IT', major: 'CS' },
    { name: 'C', student_id: '30003', faculty: 'IT', major: 'CS' },
    { name: 'D', student_id: '44440', faculty: 'IT', major: 'CS' },
    { name: 'E', student_id: '50505', faculty: 'IT', major: 'CS' },
    { name: 'F', student_id: '66000', faculty: 'IT', major: 'CS' },
  ];

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
    columns.push({
      name: 'Grade',
      cell: row => <input type='text' className='inputgrade' onChange={(e) => handleGradeChange(row.student_id, e.target.value) }/>,
    });
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
    <div>
      <NavbarTeacher teacher_id={teacher_id} />
      <div className='TableStudent'>
        <DataTable
          name='student list in section'
          columns={columns}
          data={test_data}
        />
      </div>
      <div className='ButtonAssign'>
        <button onClick={() => clickAssignGrade() }>Assign Grade</button>
        <button onClick={() => clickAssignScore() }>Assign Score</button>
      </div>
      <div className='ButtonDone'>
        { (isAssignGrade || isAssignScore) && <button onClick={clickDone}> Done </button>}
      </div>
    </div>
  );
}

export default DetailSection;
