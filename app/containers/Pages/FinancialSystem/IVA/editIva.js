import React from 'react';
import {
  FormControl,
  Grid, InputLabel, MenuItem, Select,
  TextField, Typography,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../../Companies/companies-jss';

class EditIVA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      ivaValue: '',
      startingDate: '',
      endingDate: '',
      electronicInvoice: false
    };
  }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      const countries = [
        {
          value: '1',
          label: 'Spain',
        },
        {
          value: '2',
          label: 'UK',
        },
        {
          value: '2',
          label: 'Russia',
        },
        {
          value: '2',
          label: 'France',
        },
        {
          value: '3',
          label: 'Itali',
        }];
      console.log(this.state);
      const { classes } = this.props;
      const {
        country,
        ivaValue,
        startingDate,
        endingDate,
        electronicInvoice
      } = this.state;
      return (
        <div>
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={12} sm={12}>
              <Typography variant="subtitle2" component="h2" color="primary">
                        I.V.A Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Select the Country</InputLabel>
                <Select
                  name="country"
                  value={country}
                  onChange={this.handleChange}
                >
                  {
                    countries.map((clt) => (
                      <MenuItem key={clt.value} value={clt.value}>
                        {clt.label}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} sm={4}>
              <TextField
                id="ivaValue"
                label="I.V.A Value %"
                variant="outlined"
                name="ivaValue"
                value={ivaValue}
                required
                fullWidth
                onChange={this.handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <br />
              <FormControlLabel
                id="electronicInvoice"
                name="electronicInvoice"
                value={electronicInvoice}
                control={<Checkbox color="primary" onChange={this.handleCheck} />}
                label="Electronic Invoice"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={12} md={12} sm={12}>
              <br />
              <Typography variant="subtitle2" component="h2" color="primary">
                        I.V.A Dates
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                id="startingDate"
                label="Starting Date "
                type="date"
                variant="outlined"
                name="startingDate"
                value={startingDate}
                required
                fullWidth
                onChange={this.handleChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                id="endingDate"
                label="Ending Date "
                type="date"
                variant="outlined"
                name="endingDate"
                value={endingDate}
                required
                fullWidth
                onChange={this.handleChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </div>
      );
    }
}
EditIVA.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EditIVA);
