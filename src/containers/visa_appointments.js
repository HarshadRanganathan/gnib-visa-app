import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircleProgressBar from '../component/progress_bar';
import { fetchVisaCurrentProcessingTimes } from '../actions/visa';
import { CURRENT_PROCESSING_TIMES, RE_ENTRY } from '../reducers/reducer_visa';

const RE_ENTRY_VISA_DOC_URL = 'http://www.inis.gov.ie/en/INIS/Pages/visas-reentry-apply';
const RE_ENTRY_VISA_APPT_URL = 'https://reentryvisa.inis.gov.ie/website/INISOA/IOA.nsf/AppointmentSelection?OpenForm';

class VisaAppointments extends Component {
    componentDidMount() {
        this.props.fetchVisaCurrentProcessingTimes();
    }

    renderCurrentProcessingTimes(visa) {
        if(_.isEmpty(visa)) {
            return <CircleProgressBar text={this.props.progress.percent} progress={this.props.progress.percent/100}/>;
        } else if(visa.error) {
            return (<div className="mt-5 alert alert-danger" role="alert">{visa.error}</div>);
        } else {
            return (
                <div key={CURRENT_PROCESSING_TIMES}>
                    <div className="d-flex w-100 mt-3 justify-content-between p-2">
                        <h5 className="mb-1">Current Processing Times</h5>
                    </div>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>{RE_ENTRY}</td>
                                <td>{visa[CURRENT_PROCESSING_TIMES][RE_ENTRY]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    render() {
        const { visa } = this.props;
        return (
            <div>
                <div className="list-group">{this.renderCurrentProcessingTimes(visa)}</div>
                <div className="justify-content-between mt-4">
                    <p>The On-Line Appointments service for customers seeking Re-entry Visas from Re-entry Division, Irish Naturalisation and Immigration Service has ceased from the Monday, 3 September, 2018 with the exception of emergency re-entry visa on-line appointments.</p>
                    <p>All applications for re-entry visas has to be sent through the registered post postal system. Customers are advised to submit their postal applications 5 to 6 weeks prior to travel.</p>
                    <p>Visit <a href={RE_ENTRY_VISA_DOC_URL} target="_blank">Apply for a re-entry visa</a> for more details on the documentation to be sent via post based on your stamp.</p>
                </div>
                <div className="alert alert-info mt-4" role="alert">
                    Emergency appointment slots to be checked at <a href={RE_ENTRY_VISA_APPT_URL} target="_blank">reentryvisa.inis.gov.ie</a>
                </div>
                <div className="alert alert-info mt-4" role="alert">
                    The stamp in your passport is your evidence of your immigration status in the State. This stamp is sufficient for applying for a Re Entry visa and, if appropriate, for taking up employment.
                </div>
            </div>
        );
        
    }
}

function mapStateToProps({ progress, visa }) {
    return { progress, visa };
}

export default connect(mapStateToProps, { fetchVisaCurrentProcessingTimes })(VisaAppointments);