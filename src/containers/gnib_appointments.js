import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Card, CardContent, Typography, LinearProgress, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Responsive from 'react-responsive';
import { PAGE_KEY, getPageKey, fetchGnibAppointmentAvailDts } from '../actions/gnib';

const APPT_TITLE = "Available Appointments";
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const styles = theme => ({
    card: {
        overflowX: 'auto',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 6
    },
    titlePos: {
        marginBottom: theme.spacing.unit * 2
    },
    noteTextPos: {
        marginTop: theme.spacing.unit * 2
    },
    textError: {
        color: '#f00'
    },
    textSuccess: {
        color: '#006400'
    },
    table: {
        minWidth: 340,
    }, 
    tableCell: {
        padding: '4px 0px 4px 4px'
    },
    refreshBtn: {
        float: 'right'
    },
    label: {
        display: 'inline-block',
        lineHeight: 1,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'baseline',
        padding: '4px 8px',
        borderRadius: '2px',
        borderWidth: '1px',
        borderStyle: 'solid',
        color: '#2196F3',
        marginTop: '4px',
        marginBottom: '4px'
    }
});

class GNIBAppointments extends Component {
    async componentDidMount() {
        try {
            const pageKey = await getPageKey();
            sessionStorage.setItem(PAGE_KEY, pageKey);
        } catch(err) {
            console.log(err);
        }
        this.props.fetchGnibAppointmentAvailDts();
        this.interval = setInterval(this.props.fetchGnibAppointmentAvailDts, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderSlots(classes, { slots }) {
        if(!_.isEmpty(slots) && !_.includes(slots, "empty")) {
            return(
                <TableCell>
                    {
                        _.map(slots, (slot) => {
                            return (
                                <Typography key={slot.id} className={classes.textSuccess}>{slot.time}</Typography>
                            );
                        })
                    }
                </TableCell>
            );
        } else {
            return(<TableCell className={classes.textError}>No Appointments Available</TableCell>);
        }
    }

    renderMobileSlots(classes, category, { slots }) {
        if(!_.isEmpty(slots) && !_.includes(slots, "empty")) {
            return(
                <TableCell className={classes.tableCell}>
                    <Typography className={classes.label}>{category}</Typography>
                    {
                        _.map(slots, (slot) => {
                            return (
                                <Typography key={slot.id} className={classes.textSuccess}>{slot.time}</Typography>
                            );
                        })
                    }
                </TableCell>
            );
        } else {
            return(
                <TableCell>
                    <Typography className={classes.label}>{category}</Typography>
                    <Typography className={classes.textError}>Not Available</Typography>
                </TableCell>
            );
        }
    }

    renderAppointments(classes, gnib) { 
        if(_.isEmpty(gnib)) {
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" component="h2" className={classes.titlePos}>{APPT_TITLE}</Typography>
                        <LinearProgress variant="determinate" value={this.props.progress.percent/100} />
                    </CardContent>
                </Card>
            );
        } else if(gnib.error) {
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" component="h2" className={classes.titlePos}>{APPT_TITLE}</Typography>
                        <Typography className={classes.textError} align="center">{gnib.error}</Typography>
                    </CardContent>
                </Card>
            );
        } else {
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" component="h2" className={classes.titlePos}>{APPT_TITLE}</Typography>
                        <Typography className={classes.titlePos}>Last Updated: {this.props.lastUpdate.time}</Typography>
                        <Default>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Category</TableCell>
                                        <TableCell>New</TableCell>
                                        <TableCell>Renewal</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Object.keys(gnib).map(cat => {
                                            return (
                                                <TableRow key={cat}>
                                                    <TableCell component="th" scope="row">{cat}</TableCell>
                                                    {this.renderSlots(classes, gnib[cat]['New'])}
                                                    {this.renderSlots(classes, gnib[cat]['Renewal'])}
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Default>
                        <Mobile>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>New</TableCell>
                                        <TableCell>Renewal</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Object.keys(gnib).map(cat => {
                                            return (
                                                <TableRow key={cat}>
                                                    {this.renderMobileSlots(classes, cat, gnib[cat]['New'])}
                                                    {this.renderMobileSlots(classes, cat, gnib[cat]['Renewal'])}
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Mobile>
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
                        New appointments are added for dates 9 weeks into the future every weekday at 10am. Keep checking the appointment system at 10am everyday until you find one.
                    </Typography>
                    <Typography component="p" className={classes.noteTextPos}>
                        If you need an appointment within the next 2-3 weeks, check at 2:30pm every day.
                    </Typography>
                    <Typography component="p" className={classes.noteTextPos}>
                        A small number of extra near-term appointments are released every afternoon.
                    </Typography>
                    <Typography component="p" className={classes.noteTextPos}>
                        If you do not find a near-term appointment straightaway, keep trying. It may take you 2 or 3 days to find one.
                    </Typography>
                    <Typography component="p" className={classes.noteTextPos}>
                        Extra appointments are also released for some weekday evenings to help.
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    render() {
        const { classes, gnib } = this.props;
        return (
            <Fragment>
                {this.renderAppointments(classes, gnib)}
                {this.renderNotes(classes)}
            </Fragment>
        );
    }
}

function mapStateToProps({ progress, lastUpdate, gnib }) {
    return { progress, lastUpdate, gnib };
}

GNIBAppointments.propTypes = {
    classes: PropTypes.object.isRequired
};

const GNIBAppointmentsWithStyles = withStyles(styles)(GNIBAppointments);
export default connect(mapStateToProps, { fetchGnibAppointmentAvailDts })(GNIBAppointmentsWithStyles);