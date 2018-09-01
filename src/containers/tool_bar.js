import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGnibAppointmentAvailDts } from '../actions/gnib';

class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {refresh: false, gnib_data_refresh: false};
        this.refreshData = this.refreshData.bind(this);
    }

    refreshData() {
        this.setState({refresh: true});
        this.props.fetchGnibAppointmentAvailDts(() => {
            this.setState({gnib_data_refresh: true});
            this.refreshComplete();
        });
    }

    refreshComplete() {
        if(this.state.gnib_data_refresh) {
            this.setState({refresh: false, gnib_data_refresh: false});
        }
    }

    render() {
        const { time } = this.props.lastUpdate;
        const refresh = this.state.refresh; 
        return (
            <div>
                <p>Last Updated: {time} (Auto refresh every minute)</p>
                <button type="button" className="btn btn-link float-right" onClick={this.refreshData} >
                    <i className={`fas fa-sync-alt ${refresh? 'rotate': ''}`}></i>
                </button>
            </div>
        );
    }
}

function mapStateToProps({ lastUpdate }) {    
    return { lastUpdate };
}

export default connect(mapStateToProps, { fetchGnibAppointmentAvailDts })(ToolBar);