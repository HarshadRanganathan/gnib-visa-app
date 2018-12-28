import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDisqusComments from 'react-disqus-comments';
import { withStyles, Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2
    }
});

const Disqus = ({ classes }) => {
    return (
        <Fragment>
            <Paper className={classes.root}>
                <ReactDisqusComments
                    shortname="gnib-visa-app"
                    identifier="gnib-visa-app"/>
            </Paper>
        </Fragment>
    );
}

Disqus.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Disqus);