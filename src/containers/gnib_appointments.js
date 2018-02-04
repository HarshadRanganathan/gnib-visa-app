import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppointmentAvailDts } from '../actions/gnib';

class GNIBAppointments extends Component {
    componentDidMount() {
        this.props.fetchAppointmentAvailDts('Other', 'New');
    }

    renderAppointments() { 
        const { gnib } = this.props; 
        if(!gnib) {
           return <div>Loading...</div>;
        }
        return _.map(gnib.slots, (slot) => {
            return (
                <p key={slot.id}>{slot.time}</p>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderAppointments()}
            </div>
        );
    }
}

function mapStateToProps({ gnib }) {
    return { gnib };
}

export default connect(mapStateToProps, { fetchAppointmentAvailDts })(GNIBAppointments);