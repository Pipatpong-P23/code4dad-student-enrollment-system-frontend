import React, { useState, useEffect } from 'react';
import './Footer.css';

function Footer({ onInputChange, course_id, section_id }) {
  const [courseId, setCourseId] = useState('');
  const [sectionId, setSectionId] = useState('');

  useEffect(() => {
    setCourseId(course_id);
    setSectionId(section_id);
  }, [course_id, section_id]);

  const handleCourseIdChange = (event) => {
    const { value } = event.target;
    setCourseId(value);
    onInputChange('courseId', value);
  };

  const handleSectionIdChange = (event) => {
    const { value } = event.target;
    setSectionId(value);
    onInputChange('sectionId', value);
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
