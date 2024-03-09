import React , {useState, useEffect} from 'react'
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin'
import { getUsername } from '../Authentication'

function AddSection() {
    
    const admin_id = getUsername();
    return (
        <div>
            <NavbarAdmin admin_id={admin_id} />
        </div>
    )
}

export default AddSection