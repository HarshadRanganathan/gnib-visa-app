import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGnibAppointmentAvailDts } from '../actions/gnib';
import CircleProgressBar from '../component/progress_bar';

class GNIBAppointments extends Component {
    componentDidMount() {
        this.props.fetchGnibAppointmentAvailDts();
        this.interval = setInterval(this.props.fetchGnibAppointmentAvailDts, 900000);
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

    renderAppointments(gnib) { 
        return Object.keys(gnib).map(cat => {
            return (
                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={gnib[cat]._id}>
                    <div className="d-flex w-100 justify-content-between bg-dark text-white p-2">
                        <h5 className="mb-1">{cat}</h5>
                    </div><br />
                    {this.renderTypes(gnib[cat])}
                </a>
            );
        });
    }

    render() {
        const { gnib } = this.props;
        if(_.isEmpty(gnib)) {
            return <CircleProgressBar text={this.props.progress.percent} progress={this.props.progress.percent/100}/>;
        } else {
            return (
                <div>
                    <div className="list-group">{this.renderAppointments(gnib)}</div><br />
                </div>
            );
        }
    }
}

function mapStateToProps({ progress, gnib }) {
    return { progress, gnib };
}

export default connect(mapStateToProps, { fetchGnibAppointmentAvailDts })(GNIBAppointments);