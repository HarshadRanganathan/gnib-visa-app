import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardContent, Typography, Switch, FormControlLabel, Snackbar } from '@material-ui/core';
import { firebase, messaging, firestore } from '../component/firebase';

const INSTANCE_TOKEN = 'instanceToken';
const FIRESTORE_TOKEN_COLLECTION = 'instance_tokens';

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

    constructor(props) {
        super(props);
        this.state = { subscriptionToggleSwitch: false, snackbar: false, snackbarMessage: '' };
        this.subscriptionToggle = this.subscriptionToggle.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
    }

    componentDidMount() {
        localStorage.getItem(INSTANCE_TOKEN) !== null ? this.setState({ subscriptionToggleSwitch: true }) : this.setState({ subscriptionToggleSwitch: false });
    }

    displayMessage(message) {
        this.setState({ snackbar: true, snackbarMessage: message });
    }

    async sendTokenToServer(curToken) {
        await firestore.collection(FIRESTORE_TOKEN_COLLECTION).add({ token: curToken, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    }

    async deleteTokenFromServer(curToken) {
        const deleteQuery = firestore.collection(FIRESTORE_TOKEN_COLLECTION).where('token', '==', curToken);
        const querySnapshot = await deleteQuery.get();
        _.forEach(querySnapshot.docs, async (doc) => {
            await doc.ref.delete();
        });
    }

    async subscribe() {
        try {
            await messaging.requestPermission();
            const curToken = await messaging.getToken();
            await this.sendTokenToServer(curToken);
            localStorage.setItem(INSTANCE_TOKEN, curToken);
            this.setState({ subscriptionToggleSwitch: true });
            this.displayMessage(<span>Notifications have been enabled for your device</span>);
        } catch(err) {
            console.log(err);
            if(err.hasOwnProperty('code') && err.code === 'messaging/permission-default') this.displayMessage(<span>You need to allow the site to send notifications</span>);
            else if(err.hasOwnProperty('code') && err.code === 'messaging/permission-blocked') this.displayMessage(<span>Currently, the site is blocked from sending notifications. Please unblock the same in your browser settings.</span>);
            else this.displayMessage(<span>Unable to subscribe you to notifications</span>);
        }
    }

    async unsubscribe() {
        try {
            await this.deleteTokenFromServer(localStorage.getItem(INSTANCE_TOKEN));
            localStorage.removeItem(INSTANCE_TOKEN);
            this.setState({ subscriptionToggleSwitch: false });
            this.displayMessage(<span>You have been unsubscribed from notifications</span>);
        } catch(err) {
            console.log(err);  
            this.displayMessage(<span>Unsubscribe failed</span>);          
        }
    }

    subscriptionToggle(event ,checked) {
        if(checked) this.subscribe();
        else this.unsubscribe();
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
                        onChange={this.subscriptionToggle}
                        checked={this.state.subscriptionToggleSwitch}
                    />
                    <Typography>If you enable above option in your desktop browser you will only receive notifications in that platform. To receive notifications in your mobile as well, please enable the option by visiting the site in your mobile browser.</Typography>
                    <Typography className={classes.noteTextPos}>
                        If you had previously blocked notifications from the site in your browser settings then you need to unblock it. Check out <a href="https://support.google.com/chrome/answer/3220216">Turn notifications on or off for Chrome.</a>
                    </Typography>
                    <Snackbar 
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        open={this.state.snackbar}
                        autoHideDuration={3000}
                        onClose={() => this.setState({ snackbar: false, snackbarMessage: '' })}
                        message={this.state.snackbarMessage}
                    />
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