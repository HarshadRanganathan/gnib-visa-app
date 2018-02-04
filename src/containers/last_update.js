import React, { Component } from 'react';
import { connect } from 'react-redux';

class LastUpdate extends Component {
    render() {
        const { time } = this.props.lastUpdate; 
        return (
            <div>
                <p>Last Updated: {time}</p>
            </div>
        );
    }
}

function mapStateToProps({ lastUpdate }) {    
    return { lastUpdate };
}

export default connect(mapStateToProps)(LastUpdate);