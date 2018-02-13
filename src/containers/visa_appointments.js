import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchVisaAppointmentAvailDts, INDIVIDUAL, FAMILY } from '../actions/visa';
import CircleProgressBar from '../component/progress_bar';

class VISAAppointments extends Component {
    componentDidMount() {
       this.props.fetchVisaAppointmentAvailDts();
       this.interval = setInterval(this.props.fetchVisaAppointmentAvailDts, 900000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderDts(slots) {
        return _.map(slots, (slot) => {
            return (
                <tr key={slot.id}>
                    <td><span className="mb-1 text-success">{slot.time}</span></td>
                    <td><button type="button" className="btn btn-dark btn-sm float-right">Book</button></td>
                </tr>
            );
        });
    }

    renderTypeIndividual({ appts }) {
        if(_.some(appts, 'slots')) {
            return _.map(appts, ({ date, slots, empty }) => {
                if(slots) {
                    return (
                        <tbody>
                            {this.renderDts(slots)}
                        </tbody>
                    );
                }
            });
        } else {
            return (
                <tbody>
                    <tr>
                        <td><p className="text-danger text-center">No Appointments Available</p></td>
                    </tr>
                </tbody>
            );
        }
    }

    renderTypeFamily(members) {
        return Object.keys(members).map(count => {
            const { slots, empty } = members[count];
            if(slots) {
                return (
                    <div>
                        <h6 className="mb-1 p-2">{count}</h6>
                        <div>
                            <table className="table">
                                <tbody>
                                    {this.renderDts(slots)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            } if(empty) {
                return (
                    <div>
                        <h6 className="mb-1 p-2">{count}</h6>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><p className="text-danger text-center">No Appointments Available</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            }
        });
    }

    renderAppointments(visa) { 
        return Object.keys(visa).map(type => {
            if(type == INDIVIDUAL) {
                return (
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={visa[type]._id}>
                        <div className="d-flex w-100 justify-content-between bg-dark text-white p-2">
                            <h5 className="mb-1">{type}</h5>
                        </div><br />
                        <div>
                            <table className="table">
                                {this.renderTypeIndividual(visa[type])}
                            </table>
                        </div>
                    </a>
                );
            } else if(type == FAMILY) {
                return (
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={visa[type]._id}>
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
        } else {
            return (
                <div>
                    <div className="list-group">{this.renderAppointments(visa)}</div><br />
                </div>
            );
        }
    }
}

function mapStateToProps({ progress, visa }) {
    return { progress, visa };
}

export default connect(mapStateToProps, { fetchVisaAppointmentAvailDts })(VISAAppointments);