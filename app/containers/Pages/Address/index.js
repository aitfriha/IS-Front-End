import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CountryService from '../../Services/CountryService';
import StateCountryService from '../../Services/StateCountryService';
import CityService from '../../Services/CityService';
import styles from './address-jss';

class AddressBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      states: [],
      cities: [],
      countryName: null,
      stateName: null,
      phone: ''
    };
  }

  componentDidMount() {
    CountryService.getCountries().then(({ data }) => {
      this.setState({ countries: data });
    });
  }

  handleChange = ev => {
    const { onChangeInput } = this.props;
    if (ev.target.name === 'phone') {
      this.setState({ phone: ev.target.value });
    }
    onChangeInput(ev);
  };

  handleChangeCountry = (ev, value) => {
    console.log(value);
    StateCountryService.getStatesByCountry(value.countryId).then(({ data }) => {
      console.log(data);
      const { onChangeInput } = this.props;
      const target = {
        target: {
          name: 'adCountry',
          value
        }
      };
      console.log(target);
      this.setState({
        phone: value.phonePrefix,
        countryName: value,
        states: data
      });
      onChangeInput(target);
    });
  };

  handleChangeState = (ev, value) => {
    console.log(value);
    CityService.getCitiesByState(value.stateCountryId).then(({ data }) => {
      const { onChangeInput } = this.props;
      const target = {
        target: {
          name: 'state',
          value
        }
      };
      console.log(target);
      this.setState({
        stateName: value,
        cities: data
      });
      onChangeInput(target);
    });
  };

  handleChangeCity = (ev, value) => {
    const { onChangeInput } = this.props;
    const target = {
      target: {
        name: 'city',
        value
      }
    };
    console.log(target);
    this.setState({
      cityName: value
    });
    onChangeInput(target);
  };

  render() {
    const { classes, type } = this.props;
    const {
      countryName,
      countries,
      stateName,
      states,
      cityName,
      cities,
      phone
    } = this.state;
    console.log('**************************');
    console.log(states);
    return (
      <div>
        <Autocomplete
          id="combo-box-demo"
          value={countryName}
          options={countries}
          getOptionLabel={option => option.countryName}
          onChange={this.handleChangeCountry}
          renderInput={params => (
            <TextField
              fullWidth
              {...params}
              label="Choose the country"
              variant="outlined"
            />
          )}
        />
        <Autocomplete
          id="combo-box-demo"
          value={stateName}
          options={states}
          getOptionLabel={option => option.stateName}
          onChange={this.handleChangeState}
          style={{ marginTop: 15 }}
          renderInput={params => (
            <TextField
              fullWidth
              {...params}
              label="Choose the state"
              variant="outlined"
            />
          )}
        />
        <Autocomplete
          id="combo-box-demo"
          value={cityName}
          options={cities}
          getOptionLabel={option => option.cityName}
          onChange={this.handleChangeCity}
          style={{ marginTop: 15 }}
          renderInput={params => (
            <TextField
              fullWidth
              {...params}
              label="Choose the city"
              variant="outlined"
            />
          )}
        />
        {type ? (
          <TextField
            id="outlined-basic"
            label="Your Phone number"
            variant="outlined"
            fullWidth
            name="phone"
            required
            className={classes.textField}
            value={phone}
            onChange={this.handleChange}
          />
        ) : (
          <div />
        )}
        <TextField
          id="outlined-basic"
          label="Name of address"
          variant="outlined"
          name="address"
          fullWidth
          required
          className={classes.textField}
          onChange={this.handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Post Code"
          variant="outlined"
          fullWidth
          required
          name="postCode"
          className={classes.textField}
          onChange={this.handleChange}
        />
        {type ? (
          <TextField
            id="outlined-basic"
            label="Your Phone number"
            variant="outlined"
            fullWidth
            name="phone"
            required
            className={classes.textField}
            value={phone}
            onChange={this.handleChange}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }
}
AddressBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  type: PropTypes.bool.isRequired
};
export default withStyles(styles)(AddressBlock);
