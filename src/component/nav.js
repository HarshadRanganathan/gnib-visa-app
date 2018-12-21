import React from 'react';
import GNIBAppointments from '../containers/gnib_appointments';
import VisaAppointments from '../containers/visa_appointments';
import Faq from './faq';
import ToolBar from '../containers/tool_bar';

const Nav = () => {
    return (
        <div>
            <ToolBar />
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="gnib-tab" data-toggle="tab" href="#gnib" role="tab" aria-controls="gnib" aria-selected="true">GNIB (IRP)</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="visa-tab" data-toggle="tab" href="#visa" role="tab" aria-controls="visa" aria-selected="false">Re-Entry Visa</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="faq-tab" data-toggle="tab" href="#faq" role="tab" aria-controls="faq" aria-selected="false">FAQ</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="gnib" role="tabpanel" aria-labelledby="gnib-tab">
                    <GNIBAppointments />
                </div>
                <div className="tab-pane fade" id="visa" role="tabpanel" aria-labelledby="visa-tab">
                    <VisaAppointments />
                </div>
                <div className="tab-pane fade" id="faq" role="tabpanel" aria-labelledby="faq-tab">
                    <Faq />
                </div>
            </div><br />
        </div>
    );
}

export default Nav;