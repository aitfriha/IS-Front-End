import React from 'react';
import {
  FormControl,
  Grid, InputLabel, MenuItem, Select, TextField, withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './operation-jss';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={3} justify="space-between" alignContent="space-between">
          <Grid item md={12} justify="space-between" alignContent="space-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              required
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Father Name"
              variant="outlined"
              name="fatherName"
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Mother Name"
              variant="outlined"
              name="motherName"
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item md={12} justify="space-between" alignContent="space-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label="Department"
              variant="outlined"
              name="department"
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Position"
              variant="outlined"
              name="position"
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item md={12} justify="space-between" alignContent="space-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label="Company Email"
              variant="outlined"
              name="CompanyEmail"
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Personal Email"
              variant="outlined"
              name="personalEmail"
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item md={12} justify="space-between " alignContent="space-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label="Company Phone"
              variant="outlined"
              name="companyPhone"
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Personal Phone"
              variant="outlined"
              name="personalPhone"
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item md={12} justify="space-between" alignContent="space-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label="Company Mobile Phone"
              variant="outlined"
              name="companyMobilePhone"
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Personal Mobile Phone"
              variant="outlined"
              name="PersonalMobilePhone"
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item md={12} justify="space-between" alignContent="space-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label="Company address"
              variant="outlined"
              name="companyAddress"
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Skype"
              variant="outlined"
              name="skype"
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
Contact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Contact);
