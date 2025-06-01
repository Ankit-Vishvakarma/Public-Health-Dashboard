import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Grid,
    Card,
    CardContent,
    Chip,
    Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HealingIcon from '@material-ui/icons/Healing';
import DescriptionIcon from '@material-ui/icons/Description';
import Icon from '@material-ui/core/Icon';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 4,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        boxSizing: 'border-box',
    },
    title: {
        // fontWeight: 600,
        textAlign: 'center',
        marginBottom: theme.spacing.unit * 4,
    },
    panel: {
        marginBottom: theme.spacing.unit * 2,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        marginBottom: theme.spacing.unit * 2,
    },
    icon: {
        verticalAlign: 'middle',
        marginRight: 8,
    },
    chip: {
        marginTop: theme.spacing.unit,
    },
    backButton: {
        marginBottom: theme.spacing.unit * 3,
    },
});

class AppHistoryPage extends Component {
    renderCard(icon, title, subtitle, timestamp, status) {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="subtitle1">
                        {icon} {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {subtitle}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        <AccessTimeIcon className={classes.icon} fontSize="small" />{timestamp}
                    </Typography>
                    {status && <Chip label={status} color="primary" className={classes.chip} size="small" />}
                </CardContent>
            </Card>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    className={classes.backButton}
                    href="/landing/mihy-ui-framework/blood/dashboard"
                >
                    <Icon>arrow_back</Icon> Back to Dashboard
                </Button>
                <Typography variant="display1" gutterBottom className={classes.title}>Application Activity History</Typography>

                {/* Donor Interaction Logs */}
                <ExpansionPanel className={classes.panel} defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><PersonIcon className={classes.icon} />Donor Interaction Logs</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {this.renderCard(
                                    <PersonIcon className={classes.icon} />,
                                    'Donor Registered: Rajesh Nayak',
                                    'Blood Group: B+ | Mobile: 9876543210',
                                    '2025-05-29 10:32 AM',
                                    'Registered')}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {this.renderCard(
                                    <EventAvailableIcon className={classes.icon} />,
                                    'Donation Scheduled for Anjali Verma',
                                    'Date: 2025-06-05 | Time: 11:00 AM',
                                    '2025-05-30 09:45 AM',
                                    'Scheduled')}
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* Appointment Management */}
                <ExpansionPanel className={classes.panel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><EventAvailableIcon className={classes.icon} />Appointment Management</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {this.renderCard(
                                    <EventAvailableIcon className={classes.icon} />,
                                    'Appointment Rescheduled: Ravi Kumar',
                                    'New Date: 2025-06-10 | Time: 02:00 PM',
                                    '2025-05-30 01:12 PM',
                                    'Rescheduled')}
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* Health Calculations */}
                <ExpansionPanel className={classes.panel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><HealingIcon className={classes.icon} />Health Parameter Checks</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {this.renderCard(
                                    <HealingIcon className={classes.icon} />,
                                    'BMI Calculated for Suman Das',
                                    'Height: 160 cm | Weight: 55 kg | BMI: 21.5 (Normal)',
                                    '2025-05-29 04:45 PM')}
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* Report Generation */}
                <ExpansionPanel className={classes.panel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><DescriptionIcon className={classes.icon} />Report Generation</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {this.renderCard(
                                    <DescriptionIcon className={classes.icon} />,
                                    'Eligibility Report Generated',
                                    'Donor: Abhinav Roy | Blood Group: A-',
                                    '2025-05-28 12:22 PM')}
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(AppHistoryPage);
