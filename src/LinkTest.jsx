import React from 'react'
import { Link } from 'react-router-dom'

function LinkTest() {
    return (
        <div>
            <ul className='grid gap-3 grid-cols-5 p-5'>
                <li><Link to='/receipt'>Receipt Page</Link></li>
                <li><Link to='/opd-services'>OPD Services</Link></li>
                <li><Link to='/consultant-timing'>Consultant Timing</Link></li>
                <li><Link to='/consultant-appointment'>Consultant Appointment</Link></li>
                <li><Link to='/doctor-registration'>Doctor Registration</Link></li>
                </ul>
        </div>
    )
}

export default LinkTest
