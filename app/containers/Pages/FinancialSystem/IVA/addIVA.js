import React from 'react';
import { Helmet } from 'react-helmet';
import {
  FormControl,
  Grid, InputLabel, MenuItem, Select, TextField, Typography
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import history from '../../../../utils/history';
import styles from '../../Companies/companies-jss';
import IvaService from '../../../Services/IvaService';

class AddIVA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ivaCode: '',
      country: '',
      state: '',
      value: '',
      startingDate: '',
      endingDate: '',
      electronicInvoice: false
    };
  }

    handleSubmit = () => {
      const {
        ivaCode, country, state, value, startingDate, endingDate, electronicInvoice
      } = this.state;
      const Iva = {
        ivaCode, country, state, value, startingDate, endingDate, electronicInvoice
      };
      IvaService.saveIva(Iva).then(result => {
        console.log(result);
      });
      history.push('/app/gestion-financial/IVA');
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/IVA');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleCheck = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.electronicInvoice;
      this.setState({ electronicInvoice: ok });
    }

    render() {
      const states = [
        {
          value: 'Madrid',
          label: 'Madrid',
        },
        {
          value: 'Barcelona',
          label: 'Barcelona',
        },
        {
          value: 'Malaga',
          label: 'Malaga',
        }];
      const countries = [
        {
          value: 'Spain',
          label: 'Spain',
        },
        {
          value: 'UK',
          label: 'UK',
        },
        {
          value: 'Russia',
          label: 'Russia',
        },
        {
          value: 'France',
          label: 'France',
        },
        {
          value: 'Italie',
          label: 'Italie',
        }];
      console.log(this.state);
      const title = brand.name + ' - Add I.V.A';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        country, state, value, startingDate, endingDate, electronicInvoice, ivaCode
      } = this.state;
      const { classes } = this.props;
      return (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={desc} />
          </Helmet>
          <PapperBlock
            title="New I.V.A Taxe"
            desc="Please, Fill in the all field"
            icon="ios-add-circle"
          >
            <Grid container spacing={1}>
              <Grid item xs={11} />
              <Grid item xs={1}>
                <IconButton onClick={() => this.handleGoBack()}>
                  <KeyboardBackspaceIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={12} sm={12}>
                <Typography variant="subtitle2" component="h2" color="primary">
                I.V.A Information
                </Typography>
              </Grid>
              <Grid item xs={12} md={2} sm={2}>
                <TextField
                  id="ivaCode"
                  label="I.V.A Code"
                  variant="outlined"
                  name="ivaCode"
                  value={ivaCode}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
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
                <FormControl fullWidth required>
                  <InputLabel>Select the State</InputLabel>
                  <Select
                    name="state"
                    value={state}
                    onChange={this.handleChange}
                  >
                    {
                      states.map((clt) => (
                        <MenuItem key={clt.value} value={clt.value}>
                          {clt.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2} sm={2}>
                <TextField
                  id="value"
                  label="I.V.A Value %"
                  variant="outlined"
                  name="value"
                  value={value}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  id="electronicInvoice"
                  name="electronicInvoice"
                  value={electronicInvoice}
                  control={<Checkbox color="primary" onChange={this.handleCheck} />}
                  label="Electronic Invoice"
                  labelPlacement="end"
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
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <div align="center">
              <br />
              <br />
              <Button size="small" color="inherit" onClick={this.handleGoBack}>Cancel</Button>
              <Button variant="contained" color="primary" type="button" onClick={this.handleSubmit}>
                            Save
              </Button>
            </div>
          </PapperBlock>
        </div>
      );
    }
}
AddIVA.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AddIVA);
