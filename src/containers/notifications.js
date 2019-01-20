import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardContent, Typography, Switch, FormControlLabel, Snackbar } from '@material-ui/core';
import axios from 'axios';
import { messaging } from '../component/firebase';

const ROOT_URL = 'notification-proxy';
const INSTANCE_TOKEN = 'instanceToken';
const GNIB_APPT_NOTIFICATION_SUBSCRIBED = 'gnibApptNotificationSubscribed';
const GNIB_APPT_NOTIFICATIONS_TOPIC = 'gnibApptNotifications';
const SUBSCRIBE = 'subscribe';
const UNSUBSCRIBE = 'unsubscribe';

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
        this.state = { gnibApptSubscriptionToggleSwitch: false, snackbar: false, snackbarMessage: '' };
        this.gnibApptSubscriptionToggle = this.gnibApptSubscriptionToggle.bind(this);
        this.subscribeGnibApptNotifications = this.subscribeGnibApptNotifications.bind(this);
        this.unsubscribeGnibApptNotifications = this.unsubscribeGnibApptNotifications.bind(this);
        this.notificationPermission = this.notificationPermission.bind(this);
        this.displayMessage = this.displayMessage.bind(this);
    }

    componentDidMount() {
        localStorage.getItem(GNIB_APPT_NOTIFICATION_SUBSCRIBED) === "TRUE" ? this.setState({ gnibApptSubscriptionToggleSwitch: true }) : this.setState({ gnibApptSubscriptionToggleSwitch: false });
    }

    displayMessage(message) {
        this.setState({ snackbar: true, snackbarMessage: message });
    }

    /**
     * Store app instance tokens in firestore
     * @param {*} token 
     */
    async sendTokenToDb(token) {
        try {
            await axios.post(`${ROOT_URL}/storetoken`, { token });
        } catch(error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error: ', error.message);
            }
        }
    }

    /**
     * If there are no active subscriptions then we delete the token from firestore
     */
    async deleteTokenFromDb() {
        try {
            if(localStorage.getItem(GNIB_APPT_NOTIFICATION_SUBSCRIBED) === null) {
                const token = localStorage.getItem(INSTANCE_TOKEN);
                await axios.delete(`${ROOT_URL}/deletetoken`, { data: { token } });
                localStorage.removeItem(INSTANCE_TOKEN);
            }            
        } catch(err) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error: ', error.message);
            }
        }        
    }

    /**
     * Check if user has already given permission for sending notifications
     * If not, request permission from user, generate instance token and store it in firestore
     */
    async notificationPermission() {
        let permissionGranted = false;
        try {
            /* request permission if not granted */
            if(Notification.permission !== 'granted') {
                await messaging.requestPermission(); 
            }
            /* get instance token if not available */
            if(localStorage.getItem(INSTANCE_TOKEN) !== null) {
                permissionGranted = true;
            } else {
                const token = await messaging.getToken(); // returns the same token on every invocation until refreshed by browser
                await this.sendTokenToDb(token); 
                localStorage.setItem(INSTANCE_TOKEN, token);
                permissionGranted = true;            
            }       
        } catch(err) {
            console.log(err);
            if(err.hasOwnProperty('code') && err.code === 'messaging/permission-default') this.displayMessage(<span>You need to allow the site to send notifications</span>);
            else if(err.hasOwnProperty('code') && err.code === 'messaging/permission-blocked') this.displayMessage(<span>Currently, the site is blocked from sending notifications. Please unblock the same in your browser settings.</span>);
            else this.displayMessage(<span>Unable to subscribe you to notifications</span>);
        } finally {
            return permissionGranted;
        }
    }

    async subscriptionActions(mode, token, topic) {
        try {
            return await axios.post(`${ROOT_URL}/${mode}`, { token, topic });
        } catch(error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error: ', error.message);
            }
            return null;
        }
    }

    /**
     * Subscribe app instance to notification topic if user permissions given
     */
    async subscribeGnibApptNotifications() {
        const notificationPermission = await this.notificationPermission();
        if(notificationPermission) {
            const isSubscribed = await this.subscriptionActions(SUBSCRIBE, localStorage.getItem(INSTANCE_TOKEN), GNIB_APPT_NOTIFICATIONS_TOPIC);
            if(isSubscribed) {
                localStorage.setItem(GNIB_APPT_NOTIFICATION_SUBSCRIBED, "TRUE");
                this.setState({ gnibApptSubscriptionToggleSwitch: true });
                this.displayMessage(<span>GNIB(IRP) appointment notifications have been enabled for your device</span>);
            } else {
                this.displayMessage(<span>Unable to subscribe you to notifications</span>);
            }
        }
    }

    /**
     * Unsubscribe app instance from notification topic
     */
    async unsubscribeGnibApptNotifications() {
        const isUnSubscribed = await this.subscriptionActions(UNSUBSCRIBE, localStorage.getItem(INSTANCE_TOKEN), GNIB_APPT_NOTIFICATIONS_TOPIC);
        if(isUnSubscribed) {
            localStorage.removeItem(GNIB_APPT_NOTIFICATION_SUBSCRIBED);
            await this.deleteTokenFromDb();
            this.setState({ gnibApptSubscriptionToggleSwitch: false });
            this.displayMessage(<span>You have been unsubscribed from notifications</span>);
        } else {
            this.displayMessage(<span>Unsubscribe failed</span>);   
        }
    }

    /**
     * Subscribe/UnSubscribe appointment notifications
     * @param {*} event 
     * @param {*} checked If true, the component is checked.
     */
    gnibApptSubscriptionToggle(event ,checked) {
        if(checked) this.subscribeGnibApptNotifications();
        else this.unsubscribeGnibApptNotifications();
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
                        label="Enable/Disable GNIB(IRP) Appointment Notifications"
                        onChange={this.gnibApptSubscriptionToggle}
                        checked={this.state.gnibApptSubscriptionToggleSwitch}
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
                        <Snackbar 
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            open={this.state.snackbar}
                            autoHideDuration={5000}
                            onClose={() => this.setState({ snackbar: false, snackbarMessage: '' })}
                            message={this.state.snackbarMessage}
                        />
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