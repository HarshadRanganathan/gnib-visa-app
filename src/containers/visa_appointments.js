import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchVisaAppointmentAvailDts, INDIVIDUAL, FAMILY } from '../actions/visa';
import CircleProgressBar from '../component/progress_bar';
import Slots from '../component/slots';

const RE_ENTRY_VISA_URL = 'https://reentryvisa.inis.gov.ie/website/INISOA/IOA.nsf/AppointmentSelection?OpenForm';

class VISAAppointments extends Component {
    componentDidMount() {
       this.props.fetchVisaAppointmentAvailDts();
       this.interval = setInterval(this.props.fetchVisaAppointmentAvailDts, 900000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderTypeIndividual({ appts }) {
        if(_.some(appts, 'slots')) {
            return _.map(appts, ({ date, slots, empty }) => {
                if(slots) {
                    return (
                        <Slots key={date} data={slots} link={RE_ENTRY_VISA_URL} />
                    );
                }
            });
        } else {
            return (
                <tr>
                    <td><p className="text-danger text-center">No Appointments Available</p></td>
                </tr>
            );
        }
    }

    renderMembersAppts(familyMembers) {
        return _.map(familyMembers, ({ num, slots, empty }) => {
            if(slots) {
                return (
                    <tr key={num}>
                        <td>{num}</td>
                        <td className="display-linebreak">
                            <span className="mb-1 text-success">{_.map(slots, 'time').join("\n")}</span>
                        </td>
                        <td><a href={RE_ENTRY_VISA_URL} target="_blank" className="btn btn-dark btn-sm float-right">Book</a></td>
                    </tr>
                );
            }
        });
    }

    renderTypeFamily({ appts }) {
        return _.map(appts, ({ date, familyMembers }) => {
            if(!_.some(familyMembers, 'slots')) {
              return (
                <table key={date} className="table">
                    <tbody>
                        <tr>
                            <td><p className="text-danger text-center">No Appointments Available</p></td>
                        </tr>
                    </tbody>
                </table>
              );  
            } else {
                return (
                    <div key={date}>
                        <h6 className="mb-1 p-2">{date}</h6>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col"># of Applicants</th>
                                        <th scope="col">Slot</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderMembersAppts(familyMembers)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            }
        });
    }

    renderAppointments(visa) { 
        return Object.keys(visa).map(type => {
            if(type == INDIVIDUAL) {
                return (
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={visa[type]}>
                        <div className="d-flex w-100 justify-content-between bg-dark text-white p-2">
                            <h5 className="mb-1">{type}</h5>
                        </div><br />
                        <div>
                            <table className="table">
                                <tbody>
                                    {this.renderTypeIndividual(visa[type])}
                                </tbody>
                            </table>
                        </div>
                    </a>
                );
            } else if(type == FAMILY) {
                return (
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={visa[type]}>
                        <div className="d-flex w-100 justify-content-between bg-dark text-white p-2">
                            <h5 className="mb-1">{type}</h5>
                        </div><br />
                        {this.renderTypeFamily(visa[type])}
                    </a>
                );
            }
        });
    }

    render() {
        const { visa } = this.props; 
        if(_.isEmpty(visa)) {
            return <CircleProgressBar text={this.props.progress.percent} progress={this.props.progress.percent/100}/>;
        } else if(visa.error) {
            return (<div className="mt-5 alert alert-danger" role="alert">{visa.error}</div>);
        } else {
            return (
                <React.Fragment>
                    <div className="list-group">
                        {this.renderAppointments(visa)}
                    </div><br />
                    <div class="alert alert-info" role="alert">
                        Emergency appointment slots to be directly checked at <a href={RE_ENTRY_VISA_URL} target="_blank">reentryvisa.inis.gov.ie</a>
                    </div>
                </React.Fragment>
            );
        }
    }
}

function mapStateToProps({ progress, visa }) {
    return { progress, visa };
}

export default connect(mapStateToProps, { fetchVisaAppointmentAvailDts })(VISAAppointments);