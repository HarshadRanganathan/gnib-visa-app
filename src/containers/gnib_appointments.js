import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGnibAppointmentAvailDts } from '../actions/gnib';
import CircleProgressBar from '../component/progress_bar';
import Slots from '../component/slots';

const GNIB_URL = 'https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm';

class GNIBAppointments extends Component {
    componentDidMount() {
        this.props.fetchGnibAppointmentAvailDts();
        this.interval = setInterval(this.props.fetchGnibAppointmentAvailDts, 900000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderTypes(types) {
        return Object.keys(types).map(type => {
            const { slots, empty } = types[type]
            if(slots) {
                return (
                    <div key={type}>
                        <h6 className="mb-1 p-2">{type}</h6>
                        <table className="table">
                            <tbody>
                                <Slots data={slots} link={GNIB_URL} />
                            </tbody>
                        </table>
                    </div>
                );
            } else if(empty) {
                return (
                    <div key={type}>
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
                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={cat}>
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
        } else if(gnib.error) {
            return (<div className="mt-5 alert alert-danger" role="alert">{gnib.error}</div>);
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