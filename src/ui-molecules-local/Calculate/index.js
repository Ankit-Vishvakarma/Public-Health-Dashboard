import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    TextField,
    Button,
    Grid,
    MenuItem,
    Card,
    CardContent,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import { genders } from "../../ui-config/screens/specs/blood/data/data.js";

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
    },
    panelDetails: {
        display: 'block',
    },
    formControl: {
        marginBottom: theme.spacing.unit * 2,
    },
    resultCard: {
        marginTop: theme.spacing.unit * 2,
        backgroundColor: '#e8f5e9',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    resultText: {
        fontWeight: 500,
    },
});

class CalculatePage extends Component {
    state = {
        lastDonationDate: '',
        nextEligibleDate: '',
        age: '',
        weightEc: '',
        weightBve: '',
        weight: '',
        gender: '',
        genderEc: '',
        eligible: '',
        height: '',
        heightCm: '',
        bloodVolume: '',
        bmi: '',
        bmiCategory: '',
        ironSupplements: '',
        diet: '',
        ironRecoveryDays: '',
        donarId: '',
        donorName: '',
        mobileNumber: '',
        donationData: null,
    };

    calculateNextDonationDate = () => {
        const { lastDonationDate } = this.state;
        if (!lastDonationDate) return;
        const date = new Date(lastDonationDate);
        date.setDate(date.getDate() + 56);
        this.setState({ nextEligibleDate: date.toDateString() });
    };

    checkEligibility = () => {
        const { age, weightEc } = this.state;
        const isEligible = age >= 18 && weightEc >= 50;
        this.setState({ eligible: isEligible ? 'Eligible' : 'Not Eligible' });
    };

    calculateBloodVolume = () => {
        const { height, weightBve, gender } = this.state;
        const h = parseFloat(height);
        const w = parseFloat(weightBve);
        let bv = 0;
        if (gender === 'Male') {
            bv = 0.3669 * h * h * h + 0.03219 * w + 0.6041;
        } else if (gender === 'Female') {
            bv = 0.3561 * h * h * h + 0.03308 * w + 0.1833;
        }
        this.setState({ bloodVolume: `${bv.toFixed(2)} liters` });
    };

    calculateBMI = () => {
        const { heightCm, weight } = this.state;
        const h = parseFloat(heightCm) / 100;
        const w = parseFloat(weight);
        if (!h || !w) return;
        const bmi = w / (h * h);
        let category = '';
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi < 24.9) {
            category = 'Normal';
        } else if (bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }
        this.setState({ bmi: bmi.toFixed(1), bmiCategory: category });
    };

    handleChange = field => e => {
        this.setState({ [field]: e.target.value });
    };

    estimateIronRecovery = () => {
        const { gender, diet, ironSupplements } = this.state;
        let baseDays = gender === 'Female' ? 60 : 45;
        if (diet === 'Veg') baseDays += 10;
        if (ironSupplements === 'Yes') baseDays -= 15;
        this.setState({ ironRecoveryDays: baseDays });
    };

    handleSearchDonationHistory = () => {
        const { donorName, mobileNumber, donarId } = this.state;

        // Simulated data fetch (in real case, you’d use an API call)
        if (donorName && mobileNumber && donarId) {
            this.setState({
                donarId:donarId,
                donationData: {
                    count: 6,
                    avgInterval: 65,
                    lastDonation: 'March 15, 2025',
                },
            });
        }
    };

    render() {
        const { classes } = this.props;
        const {
            lastDonationDate, nextEligibleDate,
            age, weight, gender, eligible,
            height, bloodVolume, bmi, bmiCategory, heightCm,
            weightEc, weightBve, genderEc,
            diet, ironSupplements, ironRecoveryDays,
            donationData, donorName, mobileNumber, donarId
        } = this.state;
        const options = ['Yes', 'No'];
        const veOoptions = ['Veg', 'Non-Veg'];
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
                <Typography variant="display1" gutterBottom className={classes.title}>Calculate</Typography>

                {/* Donation History Summary with Search */}
                <ExpansionPanel className={classes.panel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.sectionTitle}>Donation History Summary</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <Grid container spacing={16}>
                            <Grid item xs={4}>
                                <TextField label="Donor Name" required value={donorName} onChange={this.handleChange('donorName')} fullWidth />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="Mobile Number" required value={mobileNumber} onChange={this.handleChange('mobileNumber')} fullWidth />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="Enter Donar Registered Id" required value={donarId} onChange={this.handleChange('donarId')} fullWidth />
                            </Grid>
                        </Grid>
                        <Button onClick={this.handleSearchDonationHistory} color="primary" variant="contained">
                            Search History
                        </Button>
                        {donationData && (
                            <Card className={classes.resultCard}>
                                <CardContent>
                                    <Typography className={classes.resultText}>Donar Registered Id : <strong>{donarId}</strong></Typography>
                                    <Typography className={classes.resultText}>Total Donations: <strong>{donationData.count}</strong></Typography>
                                    <Typography className={classes.resultText}>Average Interval: <strong>{donationData.avgInterval} days</strong></Typography>
                                    <Typography className={classes.resultText}>Last Donation: <strong>{donationData.lastDonation}</strong></Typography>
                                </CardContent>
                            </Card>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                {/* Next Eligible Donation Date */}
                <ExpansionPanel className={classes.panel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.sectionTitle}>Next Eligible Donation Date</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <TextField
                            label="Last Donation Date"
                            type="date"
                            required
                            value={lastDonationDate}
                            onChange={this.handleChange('lastDonationDate')}
                            className={classes.formControl}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <Button onClick={this.calculateNextDonationDate} color="primary" variant="contained">
                            Check Next Eligibility Date
                        </Button>
                        {nextEligibleDate && (
                            <Card className={classes.resultCard}>
                                <CardContent>
                                    <Typography className={classes.resultText}>Next eligible date: <strong>{nextEligibleDate}</strong></Typography>
                                </CardContent>
                            </Card>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* Eligibility Checker */}
                <ExpansionPanel className={classes.panel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.sectionTitle}>Eligibility Checker</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <Grid container spacing={16}>
                            <Grid item xs={4}>
                                <TextField label="Age" required value={age} onChange={this.handleChange('age')} fullWidth />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="Weight (kg)" required value={weightEc} onChange={this.handleChange('weightEc')} fullWidth />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="gender"
                                    select
                                    label="Gender (male/female)"
                                    fullWidth
                                    required
                                    value={genderEc}
                                    onChange={this.handleChange('genderEc')}
                                >
                                    {genders.map(gender => (
                                        <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Button onClick={this.checkEligibility} color="primary" variant="contained">
                            Check
                        </Button>
                        {eligible && (
                            <Card className={classes.resultCard}>
                                <CardContent>
                                    <Typography className={classes.resultText}>You are: <strong>{eligible}</strong></Typography>
                                </CardContent>
                            </Card>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* Blood Volume Estimator */}
                <ExpansionPanel className={classes.panel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.sectionTitle}>Blood Volume Estimator</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <Grid container spacing={16}>
                            <Grid item xs={4}>
                                <TextField label="Height (m)" required value={height} onChange={this.handleChange('height')} fullWidth className={classes.formControl} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="Weight (kg)" required value={weightBve} onChange={this.handleChange('weightBve')} fullWidth className={classes.formControl} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="gender"
                                    select
                                    label="Gender (male/female)"
                                    fullWidth
                                    required
                                    value={gender}
                                    onChange={this.handleChange('gender')}
                                >
                                    {genders.map(gender => (
                                        <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Button onClick={this.calculateBloodVolume} color="primary" variant="contained">
                            Estimate
                        </Button>
                        {bloodVolume && (
                            <Card className={classes.resultCard}>
                                <CardContent>
                                    <Typography className={classes.resultText}>Estimated Blood Volume: <strong>{bloodVolume}</strong></Typography>
                                </CardContent>
                            </Card>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                {/* BMI Calculator */}
                <ExpansionPanel className={classes.panel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.sectionTitle}>BMI Calculator</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <Grid container spacing={16}>
                            <Grid item xs={6}>
                                <TextField label="Height (cm)" required value={heightCm} onChange={this.handleChange('heightCm')} fullWidth className={classes.formControl} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label="Weight (kg)" required value={weight} onChange={this.handleChange('weight')} fullWidth className={classes.formControl} />
                            </Grid>
                        </Grid>


                        <Button onClick={this.calculateBMI} color="primary" variant="contained">
                            Calculate BMI
                        </Button>
                        {bmi && (
                            <Card className={classes.resultCard}>
                                <CardContent>
                                    <Typography className={classes.resultText}>Your BMI: <strong>{bmi}, ({bmiCategory})</strong></Typography>
                                </CardContent>
                            </Card>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                {/* Iron Recovery Estimator */}
                <ExpansionPanel className={classes.panel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.sectionTitle}>Iron Recovery Estimator</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.panelDetails}>
                        <Grid container spacing={16}>
                            <Grid item xs={4}>
                                <TextField
                                    name="gender"
                                    select
                                    label="Gender (male/female)"
                                    fullWidth
                                    required
                                    value={gender}
                                    onChange={this.handleChange('gender')}
                                >
                                    {genders.map(gender => (
                                        <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="diet"
                                    select
                                    label="Diet (Veg/Non-Veg)"
                                    fullWidth
                                    required
                                    value={diet}
                                    onChange={this.handleChange('diet')}
                                >
                                    {veOoptions.map(option => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name="ironSupplements"
                                    select
                                    label="Iron Supplements (Yes/No)"
                                    fullWidth
                                    required
                                    value={ironSupplements}
                                    onChange={this.handleChange('ironSupplements')}
                                >
                                    {options.map(option => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Button onClick={this.estimateIronRecovery} color="primary" variant="contained">
                            Estimate Recovery
                        </Button>
                        {ironRecoveryDays && (
                            <Card className={classes.resultCard}>
                                <CardContent>
                                    <Typography className={classes.resultText}>
                                        Estimated iron recovery time: <strong>{ironRecoveryDays} days</strong>
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(CalculatePage);
