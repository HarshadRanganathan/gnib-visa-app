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
    titlePos: {
        marginBottom: theme.spacing.unit * 2
    }
});

const Faq = ({ classes }) => {
    return (
        <Fragment>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="h2" className={classes.titlePos}>GNIB (IRP)</Typography>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                My GNIB is expiring soon but I have got an appointment only for a later date. Will that constitute an illegal stay ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                As received from <a href="mailto:burghquayregoffice@justice.ie">burghquayregoffice@justice.ie</a>, please note that the ensuing gap between the expiration of the current permission and the booked appointment should not create a period of illegal status in the State.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                Can I pay the registration fees using my forex card ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Yes, forex card is acceptable for payment.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                Can I pay the registration fees using cash ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                No, only card payments are accepted.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                I forgot to bring a supporting document for my appointment. Will I be sent back and asked to book another appointment ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                You will be provided with a "BURGH QUAY REGISTRATION OFFICE RETURN NOTICE" specifying the date and time at which you can return to the office to complete the registration with the required documents.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                To what address will my IRP card be posted ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                You will be asked to fill up an address form before going to the registration booth to which your IRP card will be posted.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                How many days will it take to receive my IRP card ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Your card will be posted to you and should arrive within 10 working days.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                I haven't received my IRP card by post even after 10 working days. What should I do ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                If your card hasn't arrived, please email <a href="mailto:burghquayregoffice@justice.ie?subject=IRP%20card%20not%20received">burghquayregoffice@justice.ie</a> with a subject line 'IRP card not received'
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                I haven't received my IRP card and I suspect that it might have been sent to an incorrect address. What should I do ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                If your card hasn't arrived, please email <a href="mailto:burghquayregoffice@justice.ie?subject=IRP%20card%20not%20received">burghquayregoffice@justice.ie</a> with a subject line 'IRP card not received'. Incase, it was sent to an invalid address, it will get returned back to the registration office.<br /><br />
                                You will then be asked to come and collect the card at counter 1 in the office.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                I'm currently on Stamp 1 and I haven't received my Stamp 4 support letter yet. My GNIB/IRP is going to expire soon. What should I do ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                If in case, you haven't got your Stamp 4 support letter before your appointment, you can show the acknowledgement receipt that was sent to your email by EPMS (Employment Permits Section) for your 'Request for a Stamp 4 Support Letter' to get a temporary extension.<br /><br />
                                You don't have to pay for this temporary extension.<br /><br />
                                Depending upon when you might get your Stamp 4 letter, your temporary extension shall vary from 1 week to 4 months.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                I accidentally cancelled my appointment. What should I do ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                You can either email <a href="mailto:burghquayregoffice@justice.ie">burghquayregoffice@justice.ie</a> (or) on the day of your appointment approach counter 1 to state your case.<br /><br />
                                They will then give you a token for the next slot to complete your registation.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                I haven't been able to get an appointment and my GNIB/IRP is going to expire soon. What are my options ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                As received from <a href="mailto:burghquayregoffice@justice.ie">burghquayregoffice@justice.ie</a>, please note that the ensuing gap between the expiration of the current permission and the booked appointment should not create a period of illegal status in the State.<br /><br />
                                So, you can try to book an appointment for a later date post your registration expiry. However, it will be considered an immigration gap which you need to deduct in case you are applying for your naturalisation in the future.<br /><br />
                                You can also try to book an appointment in any category (Work/Other) as it won't be checked.<br /><br />
                                Other option is to approach counter 1 and state your case. But recently, they are very strict and are not providing any direct appointments at the counter.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </CardContent>
            </Card>
            <Ads />
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="h2" className={classes.titlePos}>Re-Entry Visa</Typography>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                Do I need a re-entry visa ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                            The Minister for Justice and Equality, Charlie Flanagan TD, has today (12/04/2019) announced the abolition of Ireland’s re-entry visa system with effect from 13 May 2019. Under this system, visa required nationals who live in Ireland, and who wish to travel to and from the country, have been obliged to apply for a re-entry visa in advance of travel. From 13 May, such individuals will be exempt from the requirement to hold a visa if they have registered for an Irish Residence Permit (IRP) or GNIB card.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                Can I travel to UK without a tourist visa ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                If your Irish visa has <a href="https://www.dfa.ie/media/embassychina/visas/BIVS-information-note-EN.pdf">BIVS stamp</a>, then you can travel to UK without the need for a separate tourist visa.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </CardContent>
            </Card>
            <Ads />
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="h2" className={classes.titlePos}>Stamp 4 Support Letter</Typography>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                Will I receive an acknowledgement after I send my support letter request form with required documents ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                You will receive an email from EPMS DJEI (Employment Permits Section) acknowledging the receipt of your Request for a Stamp 4 Support Letter.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                                Can I track the current processing dates for stamp 4 support letter ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                You can either track it via <a href="https://dbei.gov.ie/en/What-We-Do/Workplace-and-Skills/Employment-Permits/Current-Application-Processing-Dates/Current-Processing-Dates-for-Employment-Permits.html">Current-Processing-Dates-for-Employment-Permits</a> (or) subscribe for <a href="https://m.me/dbei-bot">messenger notifications</a> 
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subtitle1">
                            I haven't received my support letter even though it has been issued. What should I do ?
                            </Typography>
                            <i class="material-icons">arrow_drop_down</i>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                You can email <a href="mailto:employmentpermits@dbei.gov.ie">employmentpermits@dbei.gov.ie</a> to check if the letter has been posted to the correct address.<br /><br />
                                If the address is wrong, then you can ask them to re-issue the letter to the correct address.<br /><br />
                                You can also reach out to <a href="mailto:info@dbei.gov.ie">info@dbei.gov.ie</a> to escalate if you don't receive a response from Employment Permits team.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </CardContent>
            </Card>
        </Fragment>
    );
}

Faq.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Faq);