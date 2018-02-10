import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGnibAppointmentAvailDts } from '../actions/gnib';
import { fetchVisaAppointmentAvailDts } from '../actions/visa';

class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {refresh: false, gnib_data_refresh: false, visa_data_refresh: false};
        this.refreshData = this.refreshData.bind(this);
    }

    refreshData() {
        this.setState({refresh: true});
        this.props.fetchGnibAppointmentAvailDts(() => {
            this.setState({gnib_data_refresh: true});
            this.refreshComplete();
        });
        this.props.fetchVisaAppointmentAvailDts(() => {
            this.setState({visa_data_refresh: true});
            this.refreshComplete();
        });
    }

    refreshComplete() {
        if(this.state.gnib_data_refresh && this.state.visa_data_refresh) {
            this.setState({refresh: false, gnib_data_refresh: false, visa_data_refresh: false});
        }
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

export default connect(mapStateToProps, { fetchGnibAppointmentAvailDts, fetchVisaAppointmentAvailDts })(ToolBar);