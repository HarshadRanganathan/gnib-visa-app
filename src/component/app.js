import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../containers/nav';
import Disqus from '../component/disqus';
import { AppBar, Toolbar, Typography, Button, withStyles, IconButton } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    }
};

const App = ({classes}) => {
    return(
        <React.Fragment>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.grow}>GNIB (IRP) &amp; Re-Entry Visa Appointments</Typography>
                        <Button color="inherit" href="https://m.me/dbei-bot" target="_blank">Stamp 4 Messenger Notification</Button>
                        <Button color="inherit" href="https://www.paypal.me/harshadranganathan" target="_blank">Donate</Button>
                    </Toolbar>
                </AppBar>
                <Nav />
            </div>
        </React.Fragment>
    );
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);