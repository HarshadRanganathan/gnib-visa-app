import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Donate from '../component/donate';
import Nav from '../containers/nav';
import Disqus from '../component/disqus';
import Footer from '../component/footer';
import { AppBar, Toolbar, Typography, Button, withStyles } from '@material-ui/core';
import Responsive from 'react-responsive';

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

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
        <Fragment>
            <div className={classes.root}>
                <Default>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className={classes.grow}>GNIB (IRP) &amp; Re-Entry Visa Appointments</Typography>
                            <Button color="inherit" href="https://m.me/dbei-bot" target="_blank">Stamp 4 Messenger Notification</Button>
                        </Toolbar>
                    </AppBar>
                </Default>
                <Mobile>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography color="inherit" className={classes.grow}>GN...Appointments</Typography>
                        </Toolbar>
                    </AppBar>
                </Mobile>
                <Nav />
                <Donate />
                <Disqus />
                <Footer />
            </div>
        </Fragment>
    );
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);