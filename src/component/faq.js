import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
    card: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 6
    },
    titlePos: {
        marginBottom: theme.spacing.unit * 2
    }
});

const Faq = ({ classes }) => {
    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="title" component="h2" className={classes.titlePos}>GNIB (IRP)</Typography>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                My GNIB is expiring soon but I have got an appointment only for a later date. Will that constitute an illegal stay ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                As received from <a href="mailto:burghquayregoffice@justice.ie">burghquayregoffice@justice.ie</a>, please note that the ensuing gap between the expiration of the current permission and the booked appointment should not create a period of illegal status in the State.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                Can I pay the registration fees using my forex card ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Yes, forex card is acceptable for payment.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                Can I pay the registration fees using cash ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                No, only card payments are accepted.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                I forgot to bring a supporting document for my appointment. Will I be sent back and asked to book another appointment ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                You will be provided with a "BURGH QUAY REGISTRATION OFFICE RETURN NOTICE" specifying the date and time at which you can return to the office to complete the registration with the required documents.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                To what address will my IRP card be posted ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                You will be asked to fill up an address form before going to the registration booth to which your IRP card will be posted.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                How many days will it take to receive my IRP card ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Your card will be posted to you and should arrive within 10 working days.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                I haven't received my IRP card by post even after 10 working days. What should I do ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                If your card hasn't arrived, please email <a href="mailto:burghquayregoffice@justice.ie?subject=IRP%20card%20not%20received">burghquayregoffice@justice.ie</a> with a subject line 'IRP card not received'
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                I haven't received my IRP card and I suspect that it might have been sent to an incorrect address. What should I do ?
                            </Typography>
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
                            <Typography variant="subheading">
                                I'm currently on Stamp 1 and I haven't received my Stamp 4 support letter yet. My GNIB/IRP is going to expire soon. What should I do ?
                            </Typography>
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
                            <Typography variant="subheading">
                                I accidentally cancelled my appointment. What should I do ?
                            </Typography>
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
                            <Typography variant="subheading">
                                I haven't been able to get an appointment and my GNIB/IRP is going to expire soon. What are my options ?
                            </Typography>
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
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                I recently applied for a stamp change. Should I renew my re entry visa ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Re-entry visa is valid till it's own expiry regardless of stamp change.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="title" component="h2" className={classes.titlePos}>Re-Entry Visa</Typography>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                I haven't got my IRP card by post. Can I apply for a re-entry visa ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Yes, the registration stamp in your passport is evidence of your immigration status in the State. This stamp is sufficient for applying for a Re Entry visa and, if appropriate, for taking up employment.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                I'm waiting for my IRP card and have a valid re-entry visa. Can I travel to another country and return to Ireland before my visa expiry ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Yes, the registration stamp in your passport is evidence of your immigration status in the State. You can show the stamp to the immigration officer and mention that you are waiting for your IRP card.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                How soon will I receive a decision ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                It can take up to 15 - 20 working days to process a re-entry visa application submitted by post.<br /><br />
                                To estimate when your visa (if approved) will be ready, you should also include extra time for weekends, public holidays and postal transit.<br /><br />
                                Processing times also vary based on the number of applications we receive. In general, we are busiest before Christmas and during the summer.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                How are the documents and visa returned back to me ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Documents and visas (if approved) are now being returned to applicants by registered post. You can track the same via <a href="https://track.anpost.ie/">Anpost</a>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                Can I travel to UK without a tourist visa ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                If your Irish visa has <a href="https://www.dfa.ie/media/embassychina/visas/BIVS-information-note-EN.pdf">BIVS stamp</a>, then you can travel to UK without the need for a separate tourist visa.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                Can I send documents for my family together ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                If you are making applications for more than 1 person (eg a family), submit them together. To do so:<br/><br/>
                                1. Place each person's application documents into separate ordinary envelopes<br/><br/>
                                2. Write the name of each applicant on each envelope<br/><br/>
                                3. Then place each envelope into a larger (padded) envelope<br/><br/>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                Can I get multi entry visa during my emergency appointment ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                In some circumstances you can by paying 200 EUR.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="title" component="h2" className={classes.titlePos}>Stamp 4 Support Letter</Typography>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                Will I receive an acknowledgement after I send my support letter request form with required documents ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                You will receive an email from EPMS DJEI (Employment Permits Section) acknowledging the receipt of your Request for a Stamp 4 Support Letter.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                                Can I track the current processing dates for stamp 4 support letter ?
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                You can either track it via <a href="https://dbei.gov.ie/en/What-We-Do/Workplace-and-Skills/Employment-Permits/Current-Application-Processing-Dates/Current-Processing-Dates-for-Employment-Permits.html">Current-Processing-Dates-for-Employment-Permits</a> (or) subscribe for <a href="https://m.me/dbei-bot">messenger notifications</a> 
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography variant="subheading">
                            I haven't received my support letter even though it has been issued. What should I do ?
                            </Typography>
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
        </React.Fragment>
    );
}

Faq.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Faq);