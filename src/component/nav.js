import React from 'react';
import GNIBAppointments from '../containers/gnib_appointments';

const Nav = () => {
    return (
        <div className="card text-center">
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">GNIB</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Re-Entry Visa</a>
                    </li>
                </ul>
            </div>
            <div className="card-body">
                <GNIBAppointments />
            </div>
        </div>
    );
}

export default Nav;