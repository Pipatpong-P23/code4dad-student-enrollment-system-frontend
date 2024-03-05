// Footer.js
import React, { useState } from 'react';
import './Footer.css';

function Footer({ onInputChange }) {
  const [courseId, setCourseId] = useState('');
  const [sectionId, setSectionId] = useState('');

  const handleCourseIdChange = (event) => {
    setCourseId(event.target.value);
    onInputChange('courseId', event.target.value);
  };

  const handleSectionIdChange = (event) => {
    setSectionId(event.target.value);
    onInputChange('sectionId', event.target.value);
  };

  return (
    <div>
      <footer className='footer'>
        <input type="text" placeholder='course id' className='inputcourse' value={courseId} onChange={handleCourseIdChange} />
        <input type="text" placeholder='section id' className='inputsec' value={sectionId} onChange={handleSectionIdChange} />
      </footer>
    </div>
  );
}

export default Footer;
