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
  const [realscore , setRealscore] = useState({});
  const [grade, setGrade] = useState({});
  const [columns, setColumns] = useState([]);
  const [student_id_score_worng, setStudent_id_score_worng] = useState([]);

  const [text_edit, setText_edit] = useState('Edit');
  const [totalScore, setTotalScore] = useState(0); // State for total score
  const [dataCourse , setDataCourse] = useState({
    'course_id': '',
    'course_name': '',
    'credit': '',
    'section_number': '',
    'semester': '',
    'year': '',
  });
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
          setRealscore(response.data.reduce((acc, student) => {
            acc[student.student_id] = student.score;
            return acc;
          }
          , {}));
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
        width: '12.5%',
      },
      {
        name: 'Student Name',
        selector: row => row.name,
        sortable: true,
        width: '12.5%',
      },
      {
        name: 'Faculty',
        selector: row => row.faculty,
        sortable: true,
        width: '12.5%',
      },
      {
        name: 'Major',
        selector: row => row.major,
        sortable: true,
        width: '12.5%',
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
          width : '10%',
        },
        {
          name: 'Score Part 2',
          cell: row => <input type='text' className='enterscore' defaultValue={row.score.score_2} onChange={(e) => handleScoreChange(row.student_id, 'score_2', e.target.value)} />,
          width : '10%',
        },
        {
          name: 'Score Part 3',
          cell: row => <input type='text' className='enterscore' defaultValue={row.score.score_3} onChange={(e) => handleScoreChange(row.student_id, 'score_3', e.target.value)} />,
          width : '10%',
        },
        {
          name: 'Score Part 4',
          cell: row => <input type='text' className='enterscore' defaultValue={row.score.score_4} onChange={(e) => handleScoreChange(row.student_id, 'score_4', e.target.value)} />,
          width : '10%',
        },
        {
          name: 'Total Score',
          cell: row => calculateTotalScore(row),
        },
        {
          name: 'Grade',
          cell: row => renderGradeDropdown(row, grade, handleGradeChange, GradeType),
          width: '10%',
        }
      );
    } else {
      updatedColumns.push(
        {
          name: 'Score Part 1',
          selector: row => row.score.score_1,
          width: '8.3%',
        },
        {
          name: 'Score Part 2',
          selector: row => row.score.score_2,
          width: '8.3%',
        },
        {
          name: 'Score Part 3',
          selector: row => row.score.score_3,
          width: '8.3%',
        },
        {
          name: 'Score Part 4',
          selector: row => row.score.score_4,
          width: '8.3%',
        },
        {
          name: 'Total Score',
          selector: row => calculateTotalScore(row),
          width: '8.3%',
        },
        {
          name: 'Grade',
          selector: row => row.grade,
          width: '8.3%',
        }
      );
    }

    setColumns(updatedColumns);
  }, [isEdit]);

  const click_edit = () => {
    if (isEdit) {
      setIsEdit(!isEdit);
      setText_edit('Edit');
      setDataStudentList(dataStudentList.map((student, index) => {
        return {
          ...student,
          score: realscore[student.student_id],
        };
      }));
    }
    else {
      setIsEdit(!isEdit);
      setText_edit('Cancel');
    }
  }

  const validateScore = (score) => {
    if (isNaN(score.score_1) || isNaN(score.score_2) || isNaN(score.score_3) || isNaN(score.score_4)) {
      return false;
    }
    if (score.score_1 < 0 || score.score_2 < 0 || score.score_3 < 0 || score.score_4 < 0) {
      return false;
    }
    return true;
  };  

  const handleScoreChange = (studentId, part, value) => {

    setDataStudentList(currentData =>
        currentData.map(student => {
            if (student.student_id === studentId) {
                return {
                    ...student,
                    score: {
                        ...student.score,
                        [part]: value,
                    },
                };
            }
            return student;
          }));
        setScore(prevScore => ({
            ...prevScore,
            [studentId]: {
                ...prevScore[studentId],
                [part]: value,
            },
        }));
     
    };


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
          alert('Update Score and Grade Success');
          setIsEdit(false);
          setText_edit('Edit');
          window.location.reload();
        }
      } catch (error) {
        alert(error.response.data.detail); 
        window.location.reload();
      }
      return;
    }

    if ( validateScore(score) === false ) {
      for (let student_id in score) {
        if (isNaN(score[student_id].score_1) || isNaN(score[student_id].score_2) || isNaN(score[student_id].score_3) || isNaN(score[student_id].score_4)) {
          student_id_score_worng.push(student_id);
        }
        if (score[student_id].score_1 < 0 || score[student_id].score_2 < 0 || score[student_id].score_3 < 0 || score[student_id].score_4 < 0) {
          student_id_score_worng.push(student_id);
        }
      }
      console.log('student_id_score_worng', student_id_score_worng);
      if (student_id_score_worng.length === 0) {
        console.log("OKOKOKOKOK")
        updateScoreAndGrade();
      }
      else{
        alert('Score of student ID ' + student_id_score_worng + ' is worng. Please enter the correct score.');
        setStudent_id_score_worng([]);
        return;
      }
    }
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
            <button className='tcbtn-1' onClick={() => click_edit()}>{text_edit}</button>
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
