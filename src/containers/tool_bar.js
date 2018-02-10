import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppointmentAvailDts } from '../actions/gnib';

class ToolBar extends Component {
    componentWillMount() {
        this.setState({refresh: false});
        this.refreshData = this.refreshData.bind(this);
    }

    refreshData() {
        this.setState({refresh: true});
        this.props.fetchAppointmentAvailDts(() => {
            this.setState({refresh: false});
        });
    }

    render() {
        const { time } = this.props.lastUpdate;
        const refresh = this.state.refresh; 
        return (
            <div>
                <p>Last Updated: {time}</p>
                <button type="button" className="btn btn-link float-right" onClick={this.refreshData} >
                    <i className={`fa fa-refresh fa-lg ${refresh? 'rotate': ''}`}></i>
                </button>
            </div>
        );
    }
}

function mapStateToProps({ lastUpdate }) {    
    return { lastUpdate };
}

export default connect(mapStateToProps, {fetchAppointmentAvailDts})(ToolBar);