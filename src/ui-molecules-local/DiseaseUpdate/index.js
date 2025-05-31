import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Button,
} from '@material-ui/core';
import { diseases } from "../../ui-config/screens/specs/blood/data/data.js";
import Icon from '@material-ui/core/Icon';
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
    card: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        margin: '15px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        borderRadius: 8,
    },
    media: {
        height: 180,
    },
    content: {
        padding: theme.spacing.unit * 2,
    },
    section: {
        marginTop: theme.spacing.unit * 5,
    },
    video: {
        width: '100%',
        height: 315,
        marginTop: theme.spacing.unit * 2,
    },
    externalLink: {
        color: '#3f51b5',
        textDecoration: 'none',
        fontWeight: 500,
    },
});

class DiseaseUpdatePage extends Component {
    renderDiseaseCard(disease, index) {
        const { classes } = this.props;
        return (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={disease.image}
                        title={disease.name}
                    />
                    <CardContent className={classes.content}>
                        <Typography variant="h6" gutterBottom><strong>{disease.name}</strong></Typography>
                        <Typography variant="body2" color="textSecondary">
                            {disease.description}
                        </Typography>
                        <Divider style={{ margin: '12px 0' }} />
                        <Typography variant="subtitle2" color="primary">Precaution Tips</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {disease.precaution}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;
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
                <Typography variant="display1" gutterBottom className={classes.title}>Disease Updates That Affect Blood Donation</Typography>

                <Grid container spacing={4}>
                    {diseases.map((disease, idx) => this.renderDiseaseCard(disease, idx))}
                </Grid>

                <div className={classes.section}>
                    <Typography variant="h6" gutterBottom>Recent Videos from Health Authorities</Typography>
                    <iframe className={classes.video}
                        src="https://www.youtube-nocookie.com/embed/ER-63nPxQ78?si=6fwc0cxGXCoC01Oh"
                        title="Disease Prevention Video"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen></iframe>
                    <iframe className={classes.video}
                        src="https://www.youtube-nocookie.com/embed/edI9oVEvmcE?si=s6tlAJ5y9_wkZNMK"
                        title="Disease Prevention Video"
                        ameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>

                    </iframe>
                </div>

                <div className={classes.section}>
                    <Typography variant="h6" gutterBottom>WHO Guidelines & Alerts</Typography>
                    <Typography variant="body2">
                        For up-to-date international disease and donation eligibility guidelines, visit:
                        <br />
                        <a
                            href="https://www.who.int/news-room"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.externalLink}
                        >
                            https://www.who.int/news-room
                        </a>
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DiseaseUpdatePage);
