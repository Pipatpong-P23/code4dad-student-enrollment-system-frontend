import React , {useState, useEffect} from 'react'
import NavbarAdmin from '../Component/NavbarAdmin/NavbarAdmin'
import { getUsername } from '../Authentication'

function AddSection() {

    return (
        <div>
            <NavbarAdmin admin_id={'Admin'} />
        </div>
    )
}

export default AddSection