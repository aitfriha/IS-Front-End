import React from 'react';
import { Helmet } from 'react-helmet';
import {
  FormControl,
  Grid, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import history from '../../../../utils/history';
import styles from '../../Companies/companies-jss';
import CurrencyService from '../../../Services/CurrencyService';

class AddCurrency extends React.Component {
  constructor(props) {
    super(props);
    const year = (new Date()).getFullYear();
    this.years = Array.from(new Array(20), (val, index) => index + year);
    this.state = {
      currencyCode: '',
      currencyName: '',
      year: '',
      month: '',
      changeFactor: '',
    };
  }

    handleSubmit = () => {
      let {
        currencyName, currencyCode
      } = this.state;
      const {
        year, month, changeFactor
      } = this.state;
      currencyName = currencyName.toUpperCase();
      currencyCode = currencyCode.toUpperCase();
      const Currency = {
        currencyName, currencyCode, year, month, changeFactor
      };
      console.log(currencyCode.toString());
      const code = currencyCode.toString();
      console.log(code.length);
      if (code.length < 3) {
        CurrencyService.saveCurrency(Currency).then(result => {
          console.log(result);
          history.push('/app/gestion-financial/Currency-Management');
        });
      }
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Currency-Management');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      const months = [
        {
          value: 1,
          label: 'January ',
        },
        {
          value: 2,
          label: 'February ',
        },
        {
          value: 3,
          label: 'March ',
        },
        {
          value: 4,
          label: 'April ',
        },
        {
          value: 5,
          label: 'May ',
        },
        {
          value: 6,
          label: 'June ',
        },
        {
          value: 7,
          label: 'July ',
        },
        {
          value: 8,
          label: 'August ',
        },

        {
          value: 9,
          label: 'September ',
        },
        {
          value: 10,
          label: 'October ',
        },
        {
          value: 11,
          label: 'November ',
        },
        {
          value: 12,
          label: 'December ',
        }];
      console.log(this.state);
      const title = brand.name + ' - Add New Currency';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        currencyName, currencyCode, year, month, changeFactor
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
            title="New Currency "
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
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={10} md={4}>
                <TextField
                  id="currencyName"
                  label="Currency Name"
                  variant="outlined"
                  name="currencyName"
                  value={currencyName}
                  required
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={10} md={4}>
                <TextField
                  id="currencyCode"
                  label="Currency Code"
                  variant="outlined"
                  name="currencyCode"
                  value={currencyCode}
                  required
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={10} md={4}>
                <TextField
                  id="changeFactor"
                  label=" Change Factor "
                  variant="outlined"
                  name="changeFactor"
                  type="number"
                  value={changeFactor}
                  required
                  fullWidth
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={10} md={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Year</InputLabel>
                  <Select
                    name="year"
                    value={year}
                    onChange={this.handleChange}
                  >
                    {
                      this.years.map((clt) => (
                        <MenuItem key={clt} value={clt}>
                          {clt}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={10} md={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Month</InputLabel>
                  <Select
                    name="month"
                    value={month}
                    onChange={this.handleChange}
                  >
                    {
                      months.map((clt) => (
                        <MenuItem key={clt.value} value={clt.value}>
                          {clt.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
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
AddCurrency.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AddCurrency);
