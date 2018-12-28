import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';

const styles = {
    textEffect: {
        opacity: 0.5
    }
};

const Footer = ({classes}) => {
    return(
        <Fragment>
           <Typography variant="subtitle1" component="p" align="center" className={classes.textEffect}>Developed by <a href="https://rharshad.com" target="_blank">Harshad Ranganathan</a></Typography>
        </Fragment>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);