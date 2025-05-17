import React, { Component } from 'react';
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  withStyles
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { bloodGroups, indianStates, mockDonors } from "./data.js";
import { RequestDonarDialogBox } from "../index.js"

const styles = theme => ({
  root: {
    padding: 24,

  },
  searchContainer: {
    marginTop: theme.spacing.unit * 2,
  },
  card: {
    marginTop: theme.spacing.unit * 2,
  },
  backButton: {
    marginBottom: theme.spacing.unit * 3,
  },
  centerText:{
    textAlign: "center"
  }
});

class BloodDonorSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      customMessage: '',
      bloodGroup: '',
      stateName: "",
      location: '',
      results: [],
      requestedDonarObj: {}
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSearch = () => {
    const { bloodGroup, location, stateName } = this.state;

    const filtered = mockDonors.filter((donor) =>
      (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
      (stateName ? donor.stateName.toLowerCase().includes(stateName.toLowerCase()) : true) &&
      (location ? donor.location.toLowerCase().includes(location.toLowerCase()) : true)
    );

    this.setState({ results: filtered });
  };
  handleClearSearch = () => {
    this.setState({
      bloodGroup: '',
      stateName: "",
      location: '',
      results: [],
    });
  }
  handleRequestDonar = (donor) => {
    this.setState({ openDialog: true, requestedDonarObj: donor, customMessage: '' });
  }
  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  handleMessageChange = (e) => {
    this.setState({ customMessage: e.target.value });
  };
  handleSendRequest = () => {
    const { requestedDonarObj, customMessage } = this.state;
    console.log("Sending request to:", requestedDonarObj, "Message:", customMessage);
    this.handleCloseDialog();
  };
  renderResultDonar = (results) => {
    const { classes } = this.props;
    return results.map((donor, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={8} alignItems="center">
              <Grid item>
                <Avatar>{donor.name.charAt(0)}</Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="subheading">{donor.name}</Typography>
                <Typography variant="body1">Blood Group: {donor.bloodGroup}</Typography>
                <Typography variant="body1">State: {donor.stateName}</Typography>
                <Typography variant="body1">Location: {donor.location}</Typography>
                <Typography variant="body1">Contact: {donor.contact}</Typography>
              </Grid>
            </Grid>
            {/* Request button aligned to bottom right */}
            <Grid container justify="flex-end" style={{ marginTop: 16 }}>
              <Button
                size="small"
                color="secondary"
                variant="outlined"
                onClick={() => this.handleRequestDonar(donor)}
              >
                Request
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  render() {
    const { bloodGroup,
      location,
      results,
      stateName,
    } = this.state;
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
          Back to Dashboard
        </Button>
        {this.state.openDialog && (<RequestDonarDialogBox
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          onSend={this.handleSendRequest}
          donor={this.state.requestedDonarObj}
          message={this.state.customMessage}
          onMessageChange={this.handleMessageChange}
        />)}
        <Typography variant="display1" gutterBottom className={classes.centerText}>
          🔍 Search Blood Donors
        </Typography>

        <Grid container spacing={16} className={classes.searchContainer}>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Blood Group"
              name="bloodGroup"
              fullWidth
              value={bloodGroup}
              onChange={this.handleChange}
            >
              {bloodGroups.length > 0 && bloodGroups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="State"
              name="stateName"
              fullWidth
              value={stateName}
              onChange={this.handleChange}
            >
              {indianStates.map((st) => (
                <MenuItem key={st} value={st}>
                  {st}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Location"
              name="location"
              fullWidth
              value={location}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSearch}
                >
                  Search
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.handleClearSearch}
                  style={{ marginLeft: 16 }}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={16}>
          {results.length > 0 ? (
            this.renderResultDonar(results)
          ) : (
            <Typography variant="subheading" style={{ marginTop: 20 }}>
              No donors found. Try a different search.
            </Typography>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(BloodDonorSearch);
