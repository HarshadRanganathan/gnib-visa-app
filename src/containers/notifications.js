import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { withStyles, Card, CardContent, Typography, Switch, FormControlLabel } from '@material-ui/core';

const styles = theme => ({
    card: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2
    },
    noteTextPos: {
        marginTop: theme.spacing.unit * 2
    }
});

class Notifications extends Component {
    componentDidMount() {
        firebase.initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_DB_URL,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
        });
    }

    renderSubscriptionOptions(classes) {
        if(!('serviceWorker' in navigator) && !('PushManager' in window)) {
            return(
                <Typography className={classes.noteTextPos}>
                    Notification feature is supported only in:<br/>
                    Chrome Desktop and Mobile (version 50+)<br/>
                    Firefox Desktop and Mobile (version 44+)<br/>
                    Opera on Mobile (version 37+)
                </Typography>
            );
        } else {
            return (
                <Fragment>
                    <FormControlLabel 
                        control={<Switch />}
                        label="Enable/Disable Appointment Notifications"
                    />
                    <Typography>If you enable above option in your desktop browser you will only receive notifications in that platform. To receive notifications in your mobile as well, please enable the option by visiting the site in your mobile browser.</Typography>
                    <Typography className={classes.noteTextPos}>
                        If you had previously blocked notifications from the site in your browser settings then you need to unblock it. Check out <a href="https://support.google.com/chrome/answer/3220216">Turn notifications on or off for Chrome.</a>
                    </Typography>
                </Fragment>
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Card className={classes.card}>
                    <CardContent>
                        {this.renderSubscriptionOptions(classes)}
                    </CardContent>
                </Card>
            </Fragment>
        );
    }
}

Notifications.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notifications);