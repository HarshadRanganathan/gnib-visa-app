import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchVisaAppointmentAvailDts } from '../actions/visa';
import CircleProgressBar from '../component/progressbar';

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

    renderType(type) {
        const { slots, empty } = type
        if(slots) {
            return (
                <div>
                    <table className="table">
                        <tbody>
                            {this.renderDts(slots)}
                        </tbody>
                    </table>
                </div>
            );
        } if(empty) {
            return (
                <div>
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
    }

    renderAppointments(visa) { 
        return Object.keys(visa).map(type => {
            return (
                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={visa[type]._id}>
                    <div className="d-flex w-100 justify-content-between bg-dark text-white p-2">
                        <h5 className="mb-1">{type}</h5>
                    </div><br />
                    {this.renderType(visa[type])}
                </a>
            );
        });
    }

    render() {
        const { visa } = this.props; 
        if(_.isEmpty(visa)) {
            return <CircleProgressBar />;
        } else {
            return (
                <div>
                    <div className="list-group">{this.renderAppointments(visa)}</div><br />
                </div>
            );
        }
    }
}

function mapStateToProps({ visa }) {
    return { visa };
}

export default connect(mapStateToProps, { fetchVisaAppointmentAvailDts })(VISAAppointments);