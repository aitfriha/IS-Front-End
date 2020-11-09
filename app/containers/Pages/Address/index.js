import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './address-jss';
import { getAllCountry } from '../../../redux/country/actions';
import { getAllStateByCountry } from '../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../redux/city/actions';

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
    // eslint-disable-next-line no-shadow
    const { getAllCountry } = this.props;
    getAllCountry();
  }

  handleChangeCountry = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllStateByCountry, onChangeInput } = this.props;
    getAllStateByCountry(value.countryId);
    const target = {
      target: {
        name: 'adCountry',
        value
      }
    };
    onChangeInput(target);
  };

  handleChangeState = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCityByState, onChangeInput } = this.props;
    getAllCityByState(value.stateCountryId);
    const target = {
      target: {
        name: 'state',
        value
      }
    };
    onChangeInput(target);
  };

  handleChangeCity = (ev, value) => {
    const { onChangeInput } = this.props;
    this.setState({ cityId: value.cityId });
    const target = {
      target: {
        name: 'city',
        value
      }
    };
    onChangeInput(target);
  };

  handleChange = ev => {
    const { onChangeInput } = this.props;
    if (ev.target.name === 'phone') {
      this.setState({ phone: ev.target.value });
    }
    onChangeInput(ev);
  };

  /*  handleChangeCountry = (ev, value) => {
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
  }; */

  /*  handleChangeState = (ev, value) => {
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
  }; */

  /*  handleChangeCity = (ev, value) => {
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
  }; */

  render() {
    const {
      classes,
      type,
      allCountrys,
      allStateCountrys,
      allCitys
    } = this.props;
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
    console.log(this.state);
    return (
      <div>
        <Autocomplete
          id="combo-box-demo"
          options={allCountrys}
          getOptionLabel={option => (option ? option.countryName : '')}
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
          options={allStateCountrys}
          getOptionLabel={option => (option ? option.stateName : '')}
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
          options={allCitys}
          getOptionLabel={option => (option ? option.cityName : '')}
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
          name="fullAddress"
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
  type: PropTypes.bool.isRequired,
  // add: PropTypes.func.isRequired,
  getAllCountry: PropTypes.func.isRequired,
  allCountrys: PropTypes.array.isRequired,
  allStateCountrys: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  allCountrys: state.getIn(['countries']).allCountrys,
  countryResponse: state.getIn(['countries']).countryResponse,
  isLoading: state.getIn(['countries']).isLoading,
  errors: state.getIn(['countries']).errors,
  // state
  allStateCountrys: state.getIn(['stateCountries']).allStateCountrys,
  stateCountryResponse: state.getIn(['stateCountries']).stateCountryResponse,
  isLoadingState: state.getIn(['stateCountries']).isLoading,
  errorsState: state.getIn(['stateCountries']).errors,
  // city
  allCitys: state.getIn(['cities']).allCitys,
  cityResponse: state.getIn(['cities']).cityResponse,
  isLoadingCity: state.getIn(['cities']).isLoading,
  errorsCity: state.getIn(['cities']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAllCountry,
    getAllStateByCountry,
    getAllCityByState
  },
  dispatch
);

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddressBlock)
);
