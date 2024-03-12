import React , {useState, useEffect} from 'react'
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin'
import { getUsername, getRole, Logout } from '../Authentication'
import axios from 'axios'
import './AddSection.css'
import DataTable from 'react-data-table-component'
import { CURRENT_YEAR } from '../DateTime'

function AddSection() {
    if (getRole() != 'admin') {
        Logout();
    }
    
    const admin_id = getUsername();
    const TOKEN = document.cookie.split('=')[1];

    const dataInput ={
        'Course ID': '',
        'Section Number': '',
        'Techer ID': '',
        'Max Student': '',
        'location': '',
        'Datetime': '',
        'Semester': '',
        'Year': '',
    }

    const dataTable = [
        {Data: 'Course ID'},
        {Data: 'Section Number'},
        {Data: 'Techer ID'},
        {Data: 'Max Student'},
        {Data: 'location'},
        {Data: 'Datetime'},
        {Data: 'Semester'},
        {Data: 'Year'},
    ];

    const handleInputChange = (field, value) => {
        dataInput[field] = value;
        console.log(dataInput)
    }

    const coulums = [
        {
            name : 'Title',
            selector: row => row.Data,
        },
        {
            name : 'Input Data',
            cell: row => {
                if (row.Data === 'Datetime') {
                    return (
                        <input type="text" placeholder='Ex. Mon 09:00 - 12:00' className="inputdata" onChange={ (e) => handleInputChange(row.Data, e.target.value) } />
                    )
                }
                else if ( row.Data == 'Semester') {
                    return (
                        <select className='inputdata' onChange={ (e) => handleInputChange(row.Data, e.target.value) }>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    )
                }
                else if ( row.Data == 'Year') {
                    return (
                        <input type="text" defaultValue={CURRENT_YEAR} className="inputdata" onChange={ (e) => handleInputChange(row.Data, e.target.value) } />
                    )
                }
                else {
                    return (
                        <input type="text" className="inputdata" onChange={ (e) => handleInputChange(row.Data, e.target.value) } />
                    )
                
                }
            }
        }
    ];

    const handleDone = () => {
        console.log(dataInput)
        const URL = 'http://oop.okusann.online:8088/add_section';
        
        const headers = {
            "TOKEN": TOKEN,
        }

        const body = {
            "course_id": dataInput['Course ID'],
            "section_number": dataInput['Section Number'],
            "teacher_id": dataInput['Techer ID'],
            "max_student": dataInput['Max Student'],
            "location": dataInput['location'],
            "schedule": dataInput['Datetime'],
            "semester": dataInput['Semester'],
            "year": dataInput['Year'],
          }

        async function addSection(){
            try {
                const response = await axios.post(URL, body, {headers: headers});
                if (response.status === 200) {
                    alert('Add Section Success');
                }
                else {
                    alert('Add Section Fail');
                }

            } catch (error) {
                console.error(error);
                alert('Add Section Fail');
            }
        }
        addSection();
    }

    return (
        <div className='bgAd'>
            <NavbarAdmin admin_id={admin_id} />
            <div className="Adcontainer">

                <div className='stdheadtb'>
                    <h3>Add Teacher</h3>
                </div>
                
                <div className="Adtable">
                    <DataTable
                    name = "Table for input section"
                    columns = {coulums}
                    data = {dataTable}
                    />
                </div>

                <div className="btn-done">
                    <button className='btn-admin' onClick={ () => handleDone() }>Done</button>
                </div>
            </div>

        </div>
    )
}

export default AddSection