import React, { Component } from 'react';
import SyncIcon from '@material-ui/icons/Sync';
import {
    withStyles,
    Typography,
    Button
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 4,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box',
    },
    card: {
        Width: "100%",
        padding: theme.spacing.unit * 2,
        margin: '0 auto',
        backgroundColor: '#ffffff',
        // borderLeft: '6px solid #f44336',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    },
    iconContainer: {
        backgroundColor: '#f44336',
        width: 60,
        height: 60,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        marginBottom: theme.spacing.unit * 2,
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing.unit * 3,
    },
    sectionTitle: {
        fontWeight: 'bold',
    },
    backButton: {
        marginBottom: theme.spacing.unit * 3,
    },
    videoContainer: {
        margin: `${theme.spacing.unit * 2}px 0`,
    },
    ctaContainer: {
        marginTop: theme.spacing.unit * 4,
        textAlign: 'center',
    },
    faqQuestion: {
        fontWeight: 'bold',
        marginTop: theme.spacing.unit * 2,
    },
    panel: {
        marginBottom: theme.spacing.unit * 2,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    panelDetails: {
        display: 'block',
    }
});


class BloodDonationProcess extends Component {
    render() {
        const { classes } = this.props;
        const steps = [
            '1. Registration',
            '2. Health Check-up',
            '3. Donation',
            '4. Rest & Refreshment',
            '5. Receive Certificate'
        ];

        const faqs = [
            {
                question: 'Is blood donation safe?',
                answer: 'Yes, all equipment used is sterile and discarded after use.'
            },
            {
                question: 'How often can I donate blood?',
                answer: 'Every 3 months for men and every 4 months for women.'
            },
            {
                question: 'Will I feel weak after donation?',
                answer: 'Most people feel fine; just rest and hydrate afterward.'
            }
        ];

        return (
            <div className={classes.root}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.backButton}
                    href="/landing/mihy-ui-framework/blood/dashboard"
                >
                    <Icon>arrow_back</Icon> Back to Dashboard
                </Button>
                <Typography variant="display1" gutterBottom className={classes.title} >
                    Blood Donation Process
                </Typography>
                {/* Steps Section */}
                <ExpansionPanel className={classes.panel} defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<SyncIcon />}>
                        <Typography className={classes.sectionTitle}>Steps Involved</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <ul>
                            {steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* Eligibility Criteria */}
                <ExpansionPanel className={classes.panel} defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<SyncIcon />}>
                        <Typography className={classes.sectionTitle}>Eligibility Criteria</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <ul>
                            <li>Age between 18 to 65 years</li>
                            <li>Weight above 50 kg</li>
                            <li>No major illness or infection</li>
                            <li>Gap of at least 3 months since last donation</li>
                        </ul>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* Do’s and Don’ts */}
                <ExpansionPanel className={classes.panel} defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<SyncIcon />}>
                        <Typography className={classes.sectionTitle}>Do’s and Don’ts</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <Typography type="body1"><strong>Do’s:</strong></Typography>
                        <ul>
                            <li>Eat a healthy meal before donation</li>
                            <li>Stay hydrated</li>
                            <li>Rest after donation</li>
                        </ul>
                        <Typography type="body1"><strong>Don’ts:</strong></Typography>
                        <ul>
                            <li>Don’t donate on an empty stomach</li>
                            <li>Avoid alcohol before donation</li>
                            <li>Don’t lift heavy items afterward</li>
                        </ul>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* FAQs */}
                <ExpansionPanel className={classes.panel} defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<SyncIcon />}>
                        <Typography className={classes.sectionTitle}>FAQs</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        {faqs.map((faq, index) => (
                            <div key={index}>
                                <Typography type="body1" className={classes.faqQuestion}>{faq.question}</Typography>
                                <Typography type="body1">{faq.answer}</Typography>
                            </div>
                        ))}
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* Video */}
                <ExpansionPanel className={classes.panel} defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<SyncIcon />}>
                        <Typography className={classes.sectionTitle}>Learn More (Video)</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <div className={classes.videoContainer}>
                            <iframe 
                            width="100%" 
                            height="450" 
                            src="https://www.youtube-nocookie.com/embed/jmhiHKsEUXU?si=ZKiCrddqFXyusO19" 
                            title="Blood Donation Process" 
                            frameborder="0" 
                            llow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* CTA */}
                <div className={classes.ctaContainer}>
                    <Button variant="raised" color="accent" href="/landing/mihy-ui-framework/blood/registration-donar">
                        Register to Donate
                    </Button>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(BloodDonationProcess);

