import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles } from '@material-ui/core';
import Ads from '../containers/ads';

const styles = theme => ({
    card: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2
    },
    center: {
        textAlign: 'center'
    }
});

const Faq = ({ classes }) => {
    return (
        <Fragment>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="subtitle1" className={classes.center}>Your immigration, visa and work permit queries answered by the community at <a target="_blank" href="https://ireland-immigration.rharshad.com/">https://ireland-immigration.rharshad.com/</a></Typography>
                </CardContent>
            </Card>
            <Ads />
        </Fragment>
    );
}

Faq.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Faq);