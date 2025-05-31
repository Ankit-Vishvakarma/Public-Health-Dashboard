import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Card,
    CardContent,
    Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import Icon from '@material-ui/core/Icon';
const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 4,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box',
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing.unit * 3,
    },
    sectionTitle: {
        fontWeight: 'bold',
    },
    panel: {
        marginBottom: theme.spacing.unit * 2,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        padding: theme.spacing.unit,
    },
    panelDetails: {
        display: 'block',
    },
    sectionIcon: {
        verticalAlign: 'middle',
        marginRight: theme.spacing.unit,
    },
    videoContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.unit * 2,
    },
    iframe: {
        width: '100%',
        height: '315px',
        border: 'none',
        marginBottom: "15px",
    },
    card: {
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        borderRadius: 8,
        backgroundColor: '#e8f5e9',
        marginBottom: theme.spacing.unit * 2,
    },
    cardContent: {
        padding: theme.spacing.unit * 2,
    },
});

class ThingsToKnowPage extends Component {
    renderSection(title, content) {
        const { classes } = this.props;
        return (
            <ExpansionPanel className={classes.panel}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.sectionTitle}><InfoIcon className={classes.sectionIcon} />{title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panelDetails}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography>{content}</Typography>
                        </CardContent>
                    </Card>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

    renderVideoSection() {
        const { classes } = this.props;
        return (
            <ExpansionPanel className={classes.panel}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.sectionTitle}><InfoIcon className={classes.sectionIcon} />Watch & Learn</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panelDetails}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <div className={classes.videoContainer}>
                                <iframe
                                    className={classes.iframe}
                                    src="https://www.youtube-nocookie.com/embed/FXmkVg8a2Mo?si=BS6ryWpJAD2geXGN"
                                    title="What to Expect During Blood Donation"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerpolicy="strict-origin-when-cross-origin"
                                    allowfullscreen>

                                </iframe>
                                <iframe
                                    className={classes.iframe}
                                    src="https://www.youtube-nocookie.com/embed/70e6ZOz-NFo?si=itC8tn8ucRtq3MwX"
                                    title="Tips Before Donating Blood"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerpolicy="strict-origin-when-cross-origin"
                                    allowfullscreen>
                                </iframe>
                            </div>
                        </CardContent>
                    </Card>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

    render() {
        const { classes } = this.props;
        const sections = [
            {
                title: 'Who Can Donate?',
                content: 'Donors must be 18–65 years old, weigh at least 50 kg, and be in good health.'
            },
            {
                title: 'Who Cannot Donate?',
                content: 'Individuals with recent illnesses, surgeries, or chronic conditions may be temporarily or permanently deferred.'
            },
            {
                title: 'Before Donation',
                content: 'Eat a healthy meal, stay hydrated, and get a good night’s sleep. Bring ID.'
            },
            {
                title: 'During Donation',
                content: 'The process takes about 30 minutes. You’ll be seated or lying down comfortably.'
            },
            {
                title: 'After Donation',
                content: 'Rest briefly, drink fluids, and avoid heavy lifting for the day.'
            },
            {
                title: 'Common Myths & Facts',
                content: 'Donating does not make you weak or sick. It’s safe and helps save lives.'
            },
            {
                title: 'Donation Frequency',
                content: 'Whole blood: every 3 months. Platelets: every 2 weeks. Plasma: every 2 weeks.'
            },
            {
                title: 'Benefits of Donating Blood',
                content: 'Helps others, gives you a free health checkup, and may reduce iron overload.'
            },
            {
                title: 'Types of Blood Donations',
                content: 'Whole blood, plasma, platelets, and double red cells are used for different medical needs.'
            },
            {
                title: 'Blood Group Compatibility',
                content: 'O- is universal donor. AB+ is universal plasma donor. Know your type.'
            },
            {
                title: 'Iron and Nutritional Tips',
                content: 'Eat iron-rich foods like spinach, red meat, and legumes before and after donation.'
            },
            {
                title: 'For First-Time Donors',
                content: 'Stay calm, follow instructions, and ask questions. It’s quick and rewarding.'
            },
            {
                title: 'COVID-19 and Blood Donation',
                content: 'If unwell, wait until recovery. Follow all hygiene protocols during your visit.'
            },
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
                <Typography variant="display1" gutterBottom className={classes.title}>Things You Need to Know</Typography>
                {sections.map((section, idx) => this.renderSection(section.title, section.content))}
                {this.renderVideoSection()}
            </div>
        );
    }
}

export default withStyles(styles)(ThingsToKnowPage);
