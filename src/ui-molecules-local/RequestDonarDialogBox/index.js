import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Avatar,
  Grid
} from '@material-ui/core';

class DonorRequestDialog extends Component {
  render() {
    const { open, onClose, onSend, donor, message, onMessageChange } = this.props;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            width: '80%',
            maxWidth: '90%',
          },
        }}
      >
        <DialogTitle>Send Blood Request</DialogTitle>
        <DialogContent>
          {donor && (
            <Grid container spacing={2} alignItems="center">
              {/* Avatar on the left */}
              <Grid item>
                <Avatar style={{ width: 56, height: 56, marginRight: 15 }}>
                  {donor.name ? donor.name.charAt(0) : '?'}
                </Avatar>
              </Grid>

              {/* Donor Details on the right */}
              <Grid item xs>
                <Typography variant="subtitle1" style={{ fontWeight: 500, fontFamily:"Roboto", fontSize:"20px", color:"#d81b60" }}>
                  {donor.name}
                </Typography>
                <Typography variant="body2"><strong>Blood Group:</strong> {donor.bloodGroup}</Typography>
                <Typography variant="body2"><strong>State:</strong> {donor.stateName}</Typography>
                <Typography variant="body2"><strong>Location:</strong> {donor.location}</Typography>
                <Typography variant="body2"><strong>Contact:</strong> {donor.contact}</Typography>
              </Grid>
            </Grid>
          )}
          <TextField
            label="Custom Message (Hospital Name and Address, Patients Details, Contact Person Details etc.) "
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={message}
            onChange={onMessageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={onSend} color="primary" variant="contained">
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DonorRequestDialog;
