import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Card, CardContent, Typography, Table, TableHead, TableBody, TableRow, TableCell, LinearProgress } from '@material-ui/core';
import { fetchVisaCurrentProcessingTimes } from '../actions/visa';
import { CURRENT_PROCESSING_TIMES } from '../reducers/reducer_visa';

const CPT_TITLE = 'Current Processing Times';
const RE_ENTRY_VISA_DOC_URL = 'http://www.inis.gov.ie/en/INIS/Pages/visas-reentry-apply';
const RE_ENTRY_VISA_APPT_URL = 'https://reentryvisa.inis.gov.ie/website/INISOA/IOA.nsf/AppointmentSelection?OpenForm';

const styles = theme => ({
    card: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2
    },
    titlePos: {
        marginBottom: theme.spacing.unit * 2
    },
    noteTextPos: {
        marginTop: theme.spacing.unit * 2
    },
    textError: {
        color: '#f00'
    }
});

class VisaAppointments extends Component {
    componentDidMount() {
        this.props.fetchVisaCurrentProcessingTimes();
    }

    renderCurrentProcessingTimes(classes, visa) {
        if(_.isEmpty(visa)) {
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" component="h2" className={classes.titlePos}>{CPT_TITLE}</Typography>
                        <LinearProgress variant="determinate" value={this.props.progress.percent/100} />
                    </CardContent>
                </Card>
            );
        } else if(visa.error) {
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" component="h2" className={classes.titlePos}>{CPT_TITLE}</Typography>
                        <Typography className={classes.textError} align="center">{visa.error}</Typography>
                    </CardContent>
                </Card>
            );
        } else {
            const cpts = visa[CURRENT_PROCESSING_TIMES];
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" component="h2" className={classes.titlePos}>{CPT_TITLE}</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Visa type</TableCell>
                                    <TableCell>Date applications received in Dublin</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.keys(cpts).map(type => {
                                        return (
                                            <TableRow key={type}>
                                                <TableCell>{type}</TableCell>
                                                <TableCell>{cpts[type]}</TableCell>
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            );
        }
    }

    renderNotes(classes) {
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography component="p" className={classes.noteTextPos}>
                    The Minister for Justice and Equality, Charlie Flanagan TD, has today (12/04/2019) announced the abolition of Ireland’s re-entry visa system with effect from 13 May 2019. Under this system, visa required nationals who live in Ireland, and who wish to travel to and from the country, have been obliged to apply for a re-entry visa in advance of travel. From 13 May, such individuals will be exempt from the requirement to hold a visa if they have registered for an Irish Residence Permit (IRP) or GNIB card.
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    render() {
        const { classes, visa } = this.props;
        return (
            <Fragment>
                {this.renderCurrentProcessingTimes(classes, visa)}
                {this.renderNotes(classes)}
            </Fragment>
        );   
    }
}

function mapStateToProps({ progress, visa }) {
    return { progress, visa };
}

VisaAppointments.propTypes = {
    classes: PropTypes.object.isRequired
};

const VisaAppointmentsWithStyles = withStyles(styles)(VisaAppointments);
export default connect(mapStateToProps, { fetchVisaCurrentProcessingTimes })(VisaAppointmentsWithStyles);