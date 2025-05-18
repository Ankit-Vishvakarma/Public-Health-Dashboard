import React, { Component } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    Typography,
    Grid,
    FormControlLabel,
    Checkbox,
    Snackbar,
    Paper,
    withStyles
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { bloodGroups, indianStates, genders } from "../../ui-config/screens/specs/blood/data/data.js";
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
    centerText: {
        textAlign: "center",
    },
    centerTextAndMargin: {
        textAlign: "center",
        marginTop: "5px"
    }
});
class DonorRegistrationPage extends Component {
    state = {
        donor: {
            name: '',
            bloodGroup: '',
            age: '',
            gender: '',
            state: '',
            location: '',
            contact: '',
            email: '',
            lastDonationDate: '',
            healthConditions: '',
            imageUrl: null,
            agreement: false
        },
        errors: {},
        submitted: false,
        previewUrl: '',
    };

    handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        this.setState(prevState => ({
            donor: {
                ...prevState.donor,
                [name]: newValue
            }
        }));
    };
    handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxSize = 2 * 1024 * 1024; // 2MB
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image.");
                return;
            }
            if (file.size > maxSize) {
                alert("Image size should be under 2MB.");
                return;
            }

            const previewUrl = URL.createObjectURL(file);
            this.setState(prevState => ({
                donor: {
                    ...prevState.donor,
                    imageUrl: file
                },
                previewUrl
            }));
        }
    };

    validate = () => {
        const { donor } = this.state;
        const errors = {};
        if (!donor.name.trim()) errors.name = 'Name is required';
        if (!donor.bloodGroup) errors.bloodGroup = 'Blood group is required';
        if (!donor.age || isNaN(donor.age)) errors.age = 'Valid age is required';
        if (!donor.gender) errors.gender = 'Gender is required';
        if (!donor.state.trim()) errors.state = 'State is required';
        if (!donor.location.trim()) errors.location = 'Location is required';
        if (!donor.contact.trim()) errors.contact = 'Contact number is required';
        if (!donor.agreement) errors.agreement = 'You must agree to the terms';
        if (!donor.imageUrl) errors.imageUrl = 'Donor photo is required';

        return errors;
    };

    handleSubmitRegistrationDonar = (e) => {
        e.preventDefault();
        const errors = this.validate();
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        // Simulate API call
        console.log('Donor registered:', this.state.donor);

        // Reset form and show success message
        this.setState({
            donor: {
                name: '',
                bloodGroup: '',
                age: '',
                gender: '',
                state: '',
                location: '',
                contact: '',
                email: '',
                lastDonationDate: '',
                healthConditions: '',
                agreement: false,
                imageUrl: null
            },
            previewUrl: '',
            errors: {},
            submitted: true
        });
    };
    handleClearRegistrationDonar = (e) => {
        e.preventDefault();
        this.setState({
            donor: {
                name: '',
                bloodGroup: '',
                age: '',
                gender: '',
                state: '',
                location: '',
                contact: '',
                email: '',
                lastDonationDate: '',
                healthConditions: '',
                agreement: false,
                imageUrl: null
            },
            previewUrl: '',
            errors: {},
            submitted: false
        });

    };

    handleCloseSnackbar = () => {
        this.setState({ submitted: false });
    };

    render() {
        const { donor, errors, submitted } = this.state;
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
                <Typography variant="display1" gutterBottom className={classes.centerText}>
                    Donor Registration
                </Typography>
                <div style={{ width: "100%", margin: '30px auto' }}>
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="h5" gutterBottom>
                            Donor Registration
                        </Typography>

                        <form noValidate onSubmit={this.handleSubmit}>
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <Grid container direction="column" alignItems="center" spacing={2}>
                                        {this.state.previewUrl && (
                                            <Grid item>
                                                <img
                                                    src={this.state.previewUrl}
                                                    alt="Donor Preview"
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                        objectFit: 'cover',
                                                        borderRadius: '50%',
                                                        marginTop: 10,
                                                        boxShadow: '0 0 6px rgba(0,0,0,0.2)'
                                                    }}
                                                />
                                            </Grid>
                                        )}
                                        <Grid item>
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                type="file"
                                                onChange={this.handleImageChange}
                                            />
                                            <label htmlFor="raised-button-file">
                                                <Button variant="outlined" color="secondary" component="span">
                                                    Upload Donor Photo
                                                </Button>
                                            </label>
                                            {errors.imageUrl && (
                                                <Typography variant="caption" color="error" className={classes.centerTextAndMargin}>
                                                    {errors.imageUrl}
                                                </Typography>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        label="Full Name"
                                        fullWidth
                                        value={donor.name}
                                        onChange={this.handleChange}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="bloodGroup"
                                        select
                                        label="Blood Group"
                                        fullWidth
                                        value={donor.bloodGroup}
                                        onChange={this.handleChange}
                                        error={!!errors.bloodGroup}
                                        helperText={errors.bloodGroup}
                                    >
                                        {bloodGroups.map(group => (
                                            <MenuItem key={group} value={group}>{group}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="age"
                                        label="Age"
                                        fullWidth
                                        value={donor.age}
                                        onChange={this.handleChange}
                                        error={!!errors.age}
                                        helperText={errors.age}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        name="gender"
                                        select
                                        label="Gender"
                                        fullWidth
                                        value={donor.gender}
                                        onChange={this.handleChange}
                                        error={!!errors.gender}
                                        helperText={errors.gender}
                                    >
                                        {genders.map(gender => (
                                            <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="state"
                                        select
                                        label="Select State"
                                        fullWidth
                                        value={donor.state}
                                        onChange={this.handleChange}
                                        error={!!errors.state}
                                        helperText={errors.state}
                                    >
                                        {indianStates.map(gender => (
                                            <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="location"
                                        label="City/Location"
                                        fullWidth
                                        value={donor.location}
                                        onChange={this.handleChange}
                                        error={!!errors.location}
                                        helperText={errors.location}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="contact"
                                        label="Contact Number"
                                        fullWidth
                                        value={donor.contact}
                                        onChange={this.handleChange}
                                        error={!!errors.contact}
                                        helperText={errors.contact}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="email"
                                        label="Email (optional)"
                                        fullWidth
                                        value={donor.email}
                                        onChange={this.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        name="lastDonationDate"
                                        label="Last Donation Date (optional)"
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={donor.lastDonationDate}
                                        onChange={this.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        name="healthConditions"
                                        label="Any health conditions?"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        value={donor.healthConditions}
                                        onChange={this.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="agreement"
                                                checked={donor.agreement}
                                                onChange={this.handleChange}
                                                color="primary"
                                            />
                                        }
                                        label="I confirm that I am eligible to donate blood"
                                    />
                                    {errors.agreement && (
                                        <Typography variant="caption" color="error">
                                            {errors.agreement}
                                        </Typography>
                                    )}
                                </Grid>

                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    <Grid container spacing={2} justify="center">

                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={this.handleClearRegistrationDonar}
                                            >
                                                Clear
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                type='submit'
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleSubmitRegistrationDonar}
                                                style={{ marginLeft: 16 }}
                                            >
                                                Submit Registration
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>

                    <Snackbar
                        open={submitted}
                        autoHideDuration={4000}
                        onClose={this.handleCloseSnackbar}
                        message="Donor Registered Successfully!"
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DonorRegistrationPage);
