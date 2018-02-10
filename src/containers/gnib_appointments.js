import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppointmentAvailDts } from '../actions/gnib';

class GNIBAppointments extends Component {
    componentDidMount() {
        this.props.fetchAppointmentAvailDts();
        this.interval = setInterval(this.props.fetchAppointmentAvailDts, 900000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderDts(slots) {
        return _.map(slots, (slot) => {
            return (
                <tr key={slot.id}>
                    <td><span className="mb-1 text-success">{slot.time}</span></td>
                    <td><button type="button" className="btn btn-primary btn-sm float-right">Book</button></td>
                </tr>
            );
        });
    }

    renderTypes(types) {
        return Object.keys(types).map(type => {
            const { slots, empty } = types[type]
            if(slots) {
                return (
                    <div key={types[type]._id}>
                        <h6 className="mb-1 p-2">{type}</h6>
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
                    <div key={types[type]._id}>
                        <h6 className="mb-1 p-2">{type}</h6>
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

    renderAppointments() { 
        const { gnib } = this.props; 
        if(!gnib) {
           return <div>Loading...</div>;
        }
        return Object.keys(gnib).map(cat => {
            return (
                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={gnib[cat]._id}>
                    <div className="d-flex w-100 justify-content-between bg-secondary text-white p-2">
                        <h5 className="mb-1">{cat}</h5>
                    </div><br />
                    {this.renderTypes(gnib[cat])}
                </a>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="list-group">{this.renderAppointments()}</div><br />
            </div>
        );
    }
}

function mapStateToProps({ gnib }) {
    return { gnib };
}

export default connect(mapStateToProps, { fetchAppointmentAvailDts })(GNIBAppointments);