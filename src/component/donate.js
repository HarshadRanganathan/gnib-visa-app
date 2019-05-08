import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
	    alignItems: 'center', 
        justifyContent: 'center',
        padding: 20
    },
    btnEffect: {
        border: 0,
        height: 36
    },
    textEffect: {
        padding: 10
    }
});

const Donate = ({ classes }) => {
    return (
        <div className={classes.root}>
            <Typography variant="h6" component="h6" className={classes.textEffect}>Love the app ?</Typography>
            <a href='https://ko-fi.com/M4M7V51A' target='_blank'>
                <img height='36' className={classes.btnEffect} src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' />
            </a>
        </div>
    );
}

Donate.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Donate);