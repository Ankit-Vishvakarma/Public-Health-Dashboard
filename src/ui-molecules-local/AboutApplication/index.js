import React, { Component } from 'react';
import {
  withStyles,
  Typography,
  Grid,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InfoIcon from '@material-ui/icons/Info';
import BuildIcon from '@material-ui/icons/Build';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';

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
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 3,
  },
  panel: {
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  sectionIcon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing.unit,
  },
  backButton: {
    marginBottom: theme.spacing.unit * 3,
  },
  panelDetails: {
    display: 'block',
  }
});

class AboutApplication extends Component {
  renderPanel(title, icon, items) {
    const { classes } = this.props;
    return (
      <ExpansionPanel className={classes.panel} defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            {icon} {title}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          {items.map((item, index) => (
            <Typography key={index} variant="body1" gutterBottom>
              {item.label ? (
                <span>
                  <strong>{item.label}</strong> {item.text}
                </span>
              ) : (
                item.text
              )}
            </Typography>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
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
          href="/landing/dashboard"
        >
          Back to Dashboard
        </Button>

        <Grid container style={{ width: '100%' }}>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.title}>
              About the Application
            </Typography>

            {this.renderPanel(
              'Overview',
              <InfoIcon className={classes.sectionIcon} />, [
                {
                  text: 'This Blood Donation Web Application is built to simplify the process of finding blood donors and managing donor-related activities. It provides a user-friendly platform where individuals can register, search for donors, and access critical information about blood donation.',
                },
              ])}

            {this.renderPanel(
              'Key Features',
              <BuildIcon className={classes.sectionIcon} />, [
                { label: 'Search Donor:', text: 'Find blood donors by group and location.' },
                { label: 'Registration:', text: 'Register as a new donor or user.' },
                { label: 'Blood Donation Process:', text: 'Step-by-step guidance on how to donate.' },
                { label: 'Things to Know:', text: 'Tips and requirements for safe donation.' },
                { label: 'Disease Update:', text: 'Latest information on blood-related diseases.' },
                { label: 'Calculator:', text: 'Tools like BMI calculator for health assessment.' },
                { label: 'App History:', text: 'Track your donation history and interactions.' },
              ])}

            {this.renderPanel(
              'Technology Stack',
              <BuildIcon className={classes.sectionIcon} />, [
                { label: 'Frontend:', text: 'React.js, Mihy UI Framework' },
                { label: 'Backend:', text: 'e.g., Node.js, Java Spring Boot' },
                { label: 'Database:', text: 'e.g., MongoDB, MySQL' },
                { label: 'Hosting:', text: 'e.g., Netlify, Azure, Localhost' },
              ])}

            {this.renderPanel(
              'Purpose',
              <FavoriteIcon className={classes.sectionIcon} />, [
                { text: 'Promote awareness and ease of blood donation' },
                { text: 'Connect donors with patients in need' },
                { text: 'Provide centralized donor and health information' },
                { text: 'Support emergency services with quick donor matching' },
              ])}

            {this.renderPanel(
              'Developer Info',
              <PersonIcon className={classes.sectionIcon} />, [
                { label: 'Developer:', text: '[Your Name]' },
                { label: 'Role:', text: 'Frontend Developer' },
                { label: 'Project Type:', text: 'e.g., Sujog – Odisha Govt., Academic Project' },
                { label: 'Duration:', text: '[Start Date] – [End Date]' },
              ])}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AboutApplication);
