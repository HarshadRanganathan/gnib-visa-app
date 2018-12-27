import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GNIBAppointments from './gnib_appointments';
import VisaAppointments from './visa_appointments';
import Faq from '../component/faq';    
import { Paper, Tabs, Tab, withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 6,
        marginLeft: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 6
    }
});

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = { value: 'gnib' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
        this.setState({ value });
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <Tabs 
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab value="gnib" label="GNIB (IRP)" />
                        <Tab value="visa" label="Re-Entry Visa" />
                        <Tab value="faq" label="FAQ" />
                    </Tabs>
                </Paper>
                {this.state.value === 'gnib' && <GNIBAppointments />}
                {this.state.value === 'visa' && <VisaAppointments />}
                {this.state.value === 'faq' && <Faq />}
            </React.Fragment>
        );
    }
}

Nav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);