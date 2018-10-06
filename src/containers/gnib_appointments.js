import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PAGE_KEY, getPageKey, fetchGnibAppointmentAvailDts } from '../actions/gnib';
import CircleProgressBar from '../component/progress_bar';
import Slots from '../component/slots';

const GNIB_URL = 'https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm';

class GNIBAppointments extends Component {
    async componentDidMount() {
        const pageKey = await getPageKey();
        sessionStorage.setItem(PAGE_KEY, pageKey);

        this.props.fetchGnibAppointmentAvailDts();
        this.interval = setInterval(this.props.fetchGnibAppointmentAvailDts, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderTypes(types) {
        return Object.keys(types).map(type => {
            const { slots } = types[type]
            if(!_.isEmpty(slots) && !_.includes(slots, "empty")) {
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
            } else {
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
                    <div className="alert alert-info" role="alert">
                        New appointments are added for dates 9 weeks into the future every weekday at 10am. Keep checking the appointment system at 10am everyday until you find one.
                    </div>
                    <div className="alert alert-info" role="alert">
                        <b>Extra appointments</b><br />
                        If you need an appointment within the next 2-3 weeks, check at 2:30pm every day.<br />
                        A small number of extra near-term appointments are released every afternoon. <br />
                        If you do not find a near-term appointment straightaway, keep trying. It may take you 2 or 3 days to find one.<br />
                        Extra appointments are also released for some weekday evenings to help.
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps({ progress, gnib }) {
    return { progress, gnib };
}

export default connect(mapStateToProps, { fetchGnibAppointmentAvailDts })(GNIBAppointments);