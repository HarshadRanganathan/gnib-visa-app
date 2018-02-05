import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppointmentAvailDts } from '../actions/gnib';

class ToolBar extends Component {
    componentWillMount() {
        this.refreshData = this.refreshData.bind(this);
    }

    refreshData() {
        this.props.fetchAppointmentAvailDts();
    }

    render() {
        const { time } = this.props.lastUpdate; 
        return (
            <div>
                <p>Last Updated: {time}</p>
                <button type="button" className="btn btn-link float-right" onClick={this.refreshData}>
                    <i className="fa fa-refresh fa-lg"></i>
                </button>
            </div>
        );
    }
}

function mapStateToProps({ lastUpdate }) {    
    return { lastUpdate };
}

export default connect(mapStateToProps, {fetchAppointmentAvailDts})(ToolBar);