import React, { useEffect, useState } from 'react';
import './DetailSection.css';
import NavbarTeacher from '../Component/NavbarTeacher/NavbarTeacher';
import { getUsername, getRole, Logout } from '../Authentication';
import DataTable from 'react-data-table-component';
import axios from 'axios';

function DetailSection() {
  if (getRole() !== 'teacher') {
    Logout();
  }

  const teacher_id = getUsername();
  const [isEdit, setIsEdit] = useState(false);
  const GradeTypeOptions = ['N/A', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
  const GradePass_FailOptions = ['S', 'U'];
  const [dataStudentList, setDataStudentList] = useState([]);
  const [score, setScore] = useState({});
  const [grade, setGrade] = useState({});
  const [columns, setColumns] = useState([]);
  const [totalScore, setTotalScore] = useState(0); // State for total score

  const CourseID = new URLSearchParams(window.location.search).get('courseId');
  const SectionNumber = new URLSearchParams(window.location.search).get('sectionNumber');
  const Semester = new URLSearchParams(window.location.search).get('semester');
  const Year = new URLSearchParams(window.location.search).get('year');
  const GradeType = new URLSearchParams(window.location.search).get('gradeType');

  const calculateTotalScore = (row) => {
    const { score_1, score_2, score_3, score_4 } = row.score;
    const totalScore = Number(score_1) + Number(score_2) + Number(score_3) + Number(score_4);
    return totalScore;
  };

  useEffect(() => {
    async function getDataStudentList() {
      try {
        const response = await axios.get(`http://oop.okusann.online:8088/get_detail_student_in_section/${CourseID}/${SectionNumber}/${Semester}/${Year}`);
        if (response.status === 200) {
          setDataStudentList(response.data);
          setScore(response.data.reduce((acc, student) => {
            acc[student.student_id] = student.score;
            return acc;
          }, {}));
          setGrade(response.data.reduce((acc, student) => {
            acc[student.student_id] = student.grade;
            return acc;
          }, {}));
        }
      } catch (error) {
        console.error(error);
      }
    }
    getDataStudentList();
  }, []);

  useEffect(() => {
    const updatedColumns = [
      {
        name: 'Student ID',
        selector: row => row.student_id,
        sortable: true,
        width: '120px',
      },
      {
        name: 'Student Name',
        selector: row => row.name,
        sortable: true,
        width: '170px',
      },
      {
        name: 'Faculty',
        selector: row => row.faculty,
        sortable: true,
        width: '125px',
      },
      {
        name: 'Major',
        selector: row => row.major,
        sortable: true,
        width: '180px',
      },
    ];

    const renderGradeDropdown = (row, grade, handleGradeChange, GradeType) => {
      const options = GradeType === "grade" ? GradeTypeOptions : GradePass_FailOptions;
      return (
        <select
          className='inputgrade'
          defaultValue={row.grade}
          onChange={(e) => handleGradeChange(row.student_id, e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    };

    if (isEdit) {
      updatedColumns.push(
        {
          name: 'Score Part 1',
          cell: row => <input type='text' className='enterscore' defaultValue={row.score.score_1} onChange={(e) => handleScoreChange(row.student_id, 'score_1', e.target.value)} />,
        },
        {
          name: 'Score Part 2',
          cell: row => <input type='text' className='enterscore' defaultValue={row.score.score_2} onChange={(e) => handleScoreChange(row.student_id, 'score_2', e.target.value)} />,
        },
        {
          name: 'Score Part 3',
          cell: row => <input type='text' className='enterscore' defaultValue={row.score.score_3} onChange={(e) => handleScoreChange(row.student_id, 'score_3', e.target.value)} />,
        },
        {
          name: 'Score Part 4',
          cell: row => <input type='text' className='enterscore' defaultValue={row.score.score_4} onChange={(e) => handleScoreChange(row.student_id, 'score_4', e.target.value)} />,
        },
        {
          name: 'Grade',
          cell: row => renderGradeDropdown(row, grade, handleGradeChange, GradeType),
          width: '100px',
        }
      );
    } else {
      updatedColumns.push(
        {
          name: 'Score Part 1',
          selector: row => row.score.score_1,
        },
        {
          name: 'Score Part 2',
          selector: row => row.score.score_2,
        },
        {
          name: 'Score Part 3',
          selector: row => row.score.score_3,
        },
        {
          name: 'Score Part 4',
          selector: row => row.score.score_4,
        },
        {
          name: 'Total Score',
          selector: row => calculateTotalScore(row),
        },
        {
          name: 'Grade',
          selector: row => row.grade,
          width: '100px',
        }
      );
    }

    setColumns(updatedColumns);
  }, [isEdit]);

  const click_edit = () => {
    setIsEdit(!isEdit);
  }

  const handleScoreChange = (studentId, part, value) => {
    setScore(prevScore => ({
      ...prevScore,
      [studentId]: {
        ...prevScore[studentId],
        [part]: value,
      },
    }));

    const updatedTotalScore = dataStudentList.reduce((total, student) => {
      if (student.student_id === studentId) {
        total += Number(value);
      } else {
        total += calculateTotalScore(student);
      }
      return total;
    }, 0);
    setTotalScore(updatedTotalScore);
  }

  const handleGradeChange = (studentId, value) => {
    setGrade(prevGrade => ({
      ...prevGrade,
      [studentId]: value,
    }));
  }

  const Score_and_Grade_to_dict = () => {
    const dict_score_and_grade = {
      'course_id': CourseID,
      'section_number': SectionNumber,
      'semester': Semester,
      'year': Year,
      'grade_and_score_dict': {}
    };

    dataStudentList.forEach(student => {
      dict_score_and_grade.grade_and_score_dict[student.student_id] = {
        'grade': grade[student.student_id],
        'score': {
          'score_1': Number(score[student.student_id].score_1),
          'score_2': Number(score[student.student_id].score_2),
          'score_3': Number(score[student.student_id].score_3),
          'score_4': Number(score[student.student_id].score_4)
        }
      };
    });

    return dict_score_and_grade;
  };

  const clickDone = () => {
    setIsEdit(false);
    async function updateScoreAndGrade() {
      const URL = 'http://oop.okusann.online:8088/assign_grade_and_score_to_multiple_student';
      const headers = {
        'TOKEN': teacher_id,
      };
      const body = Score_and_Grade_to_dict();
      console.log('body', body);

      try {
        const response = await axios.post(URL, body, { headers: headers });
        if (response.status === 200) {
          alert('Update Success');
          window.location.reload();
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Update Failed');
        window.location.reload();
      }
    }
    updateScoreAndGrade();
  }

  return (
    <div className='bgtc'>
      <NavbarTeacher teacher_id={teacher_id} />
      <div className="tccontainer02">

        <div className='tctable-stdlist'>
          <DataTable
            name='student list in section'
            columns={columns}
            data={dataStudentList}
          />
        </div>
        <div className="tcbtn">
          <div>
            <button className='tcbtn-1' onClick={() => click_edit()}>Edit</button>
          </div>
          <div className='tcbtn-done'>
            {isEdit && <button className='tcbtn-2' onClick={clickDone}>Done</button>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DetailSection;
