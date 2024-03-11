import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import './DropdownDate.css';
import { CURRENT_SEMESTER , CURRENT_YEAR } from '../../DateTime';

function DropdownDate({ onDateChange }) {
  const [semester, setSemester] = useState(CURRENT_SEMESTER); 
  const [year, setYear] = useState(CURRENT_YEAR); 
  const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  
  const toggleSemesterDropdown = () => setSemesterDropdownOpen(!semesterDropdownOpen);
  const toggleYearDropdown = () => setYearDropdownOpen(!yearDropdownOpen);

  const selectSemester = (selectedSemester) => {
    setSemester(selectedSemester);
    setSemesterDropdownOpen(false);
    onDateChange(selectedSemester, year); 
  };

  const selectYear = (selectedYear) => {
    setYear(selectedYear);
    setYearDropdownOpen(false);
    onDateChange(semester, selectedYear);
  };

  return (
    <div className='drop-container'>
        <div className='drop-1'>
            <button className='drop-semester' onClick={toggleSemesterDropdown}><IoMdArrowDropdown/>Semester {semester}</button>
            {semesterDropdownOpen && (
              <div className='semester-content'>
                  <a href="#" onClick={(e) => {e.preventDefault(); selectSemester('1');}}>1</a>
                  <a href="#" onClick={(e) => {e.preventDefault(); selectSemester('2');}}>2</a>
              </div>
            )}
        </div>
        <div className='drop-2'>
            <button className='drop-year' onClick={toggleYearDropdown}><IoMdArrowDropdown/>Year {year}</button>
            {yearDropdownOpen && (
              <div className='year-content'>
                  <a href="#" onClick={(e) => {e.preventDefault(); selectYear(CURRENT_YEAR);}}>{CURRENT_YEAR}</a>
                  <a href="#" onClick={(e) => {e.preventDefault(); selectYear(CURRENT_YEAR -1 );}}>{CURRENT_YEAR - 1 }</a>
                  <a href="#" onClick={(e) => {e.preventDefault(); selectYear(CURRENT_YEAR -2);}}>{CURRENT_YEAR - 2}</a>
              </div>
            )}
        </div>
    </div>
  );
}

export default DropdownDate;
