import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StateService from '../../Services/StateCountryService';
import CityBlock from './CityBlock';
import CityService from '../../Services/CityService';

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: {},
      cityName: '',
      cities: [],
      cityId: '',
      createOrUpdate: true,
      states: []
    }
  }

  componentDidMount() {
    StateService.getStates().then(({ data }) => {
      this.setState({ states: data });
    });
    CityService.getCities().then(({ data }) => {
      this.setState({ cities: data });
    });
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitCity = () => {
    const { state, cityName, createOrUpdate, cityId } = this.state;
    const city = {
      stateCountry: state,
      cityName
    };
    if (createOrUpdate) {
      CityService.saveCity(city).then(() => {
        CityService.getCities().then(({ data }) => {
          this.setState({ cities: data, state: {}, cityName: '' });
        });
      });
    } else {
      CityService.updateCity(cityId, city).then(() => {
        CityService.getCities().then(({ data }) => {
          this.setState({ cities: data, state: {}, cityName: '', createOrUpdate: true });
        });
      });
    }
  };

  handleChangeState = (ev, value) => {
    this.setState({ state: value });
  };

  handleCancel = () => {
    this.setState({ createOrUpdate: true, state: {}, cityName: '' });
  }

  handleChangeSelectedSate = (city) => {
    this.setState(
      {
        cityName: city.cityName,
        state: city.stateCountry,
        cityId: city.cityId,
        createOrUpdate: false
      });
  };

  render() {
    const title = brand.name + ' - State Country';
    const description = brand.desc;
    const {
      state, states, createOrUpdate, cityName,
      cities
    } = this.state;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Cities" noMargin>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              md={5}
              style={{ display: 'flex', justifyContent: 'space-between' }}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="primary" style={{ width: '15%' }}>City</Typography>
              <div style={{ width: '80%' }}>
                <TextField
                  id="outlined-basic"
                  label="City Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={cityName}
                  name="cityName"
                  onChange={this.handleChange}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              style={{ display: 'flex', justifyContent: 'space-between' }}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="primary" style={{ width: '15%' }}>State</Typography>
              <div style={{ width: '80%' }}>
                <Autocomplete
                  id="combo-box-demo"
                  value={state}
                  options={states}
                  getOptionLabel={option => option.stateName}
                  onChange={this.handleChangeState}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Select the state"
                      variant="outlined"
                    />
                  )}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}
            >
              <Button
                color="primary"
                variant="contained"
                size="medium"
                onClick={this.handleSubmitCity}
              >
                {
                  createOrUpdate ? 'Save City' : 'Update City'
                }
              </Button>
              {
                !createOrUpdate ? (
                  <Button
                    color="secondary"
                    variant="contained"
                    size="medium"
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                ) : (<div />)
              }
            </Grid>
          </Grid>
          <CityBlock  onSelected={this.handleChangeSelectedSate} cities={cities} />
        </PapperBlock>
      </div>
    );
  }
}
export default (City);
