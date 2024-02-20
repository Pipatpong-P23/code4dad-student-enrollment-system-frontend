import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [student_id, setStudentId] = useState('');
  const [newStudent, setNewStudent] = useState('');
  const [editedStudentId, setEditedStudentId] = useState('');
  const [deletedStudentId, setDeletedStudentId] = useState('');

  useEffect(() => {
    fetch('/get_all_student')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  const handleGetStudent = () => {
    axios.get(`http://127.0.0.1:8000/get_student/${student_id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error('Error fetching student:', error);
      });
  };
  

  const handleAddStudent = () => {
    // Add new student (use newStudent state)
    // Update students state
  };

  const handleEditStudentId = () => {
    // Edit student ID (use editedStudentId state)
    // Update students state
  };

  const handleDeleteStudent = () => {
    // Delete student by ID (use deletedStudentId state)
    // Update students state
  };

  return (
    <div className="App">
      <h1>Student</h1>
      <input
        type="text"
        placeholder="Enter student ID"
        value={student_id}
        onChange={e => setStudentId(e.target.value)}
      />
      <button onClick={handleGetStudent}>Get Student</button>

      <input
        type="text"
        placeholder="Enter new student name"
        value={newStudent}
        onChange={e => setNewStudent(e.target.value)}
      />
      <button onClick={handleAddStudent}>Add Student</button>

      <input
        type="text"
        placeholder="Enter student ID to edit"
        value={editedStudentId}
        onChange={e => setEditedStudentId(e.target.value)}
      />
      <button onClick={handleEditStudentId}>Edit Student ID</button>

      <input
        type="text"
        placeholder="Enter student ID to delete"
        value={deletedStudentId}
        onChange={e => setDeletedStudentId(e.target.value)}
      />
      <button onClick={handleDeleteStudent}>Delete Student</button>

      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} ({student.id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
