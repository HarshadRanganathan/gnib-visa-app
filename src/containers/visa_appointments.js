import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchAppointmentAvailDts } from '../actions/visa';

class VISAAppointments extends Component {
    componentDidMount() {
       this.props.fetchAppointmentAvailDts();
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default connect(null, { fetchAppointmentAvailDts })(VISAAppointments);