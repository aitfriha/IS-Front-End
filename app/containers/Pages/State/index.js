import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import StateBlock from './StateBlock';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CountryService from '../../Services/CountryService';
import StateService from '../../Services/StateCountryService';

class StateCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: {},
      stateName: '',
      countries: [],
      stateCountryId: '',
      createOrUpdate: true,
      states: []
    }
  }

  componentDidMount() {
    CountryService.getCountries().then(({ data }) => {
      this.setState({ countries: data });
    });
    StateService.getStates().then(({ data }) => {
      this.setState({ states: data });
    });
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitState = () => {
    const { country, stateName, createOrUpdate, stateCountryId } = this.state;
    const state = {
      country,
      stateName
    };
    if (createOrUpdate) {
      StateService.saveState(state).then(({ data }) => {
        StateService.getStates().then(({ data }) => {
          this.setState({ states: data, country: {}, stateName: '' });
        });
      });
    } else {
      StateService.updateState(stateCountryId, state).then(({ data }) => {
        StateService.getStates().then(({ data }) => {
          this.setState({ states: data, country: {}, stateName: '', createOrUpdate: true });
        });
      });
    }
  };

  handleChangeCountry = (ev, value) => {
    this.setState({ country: value });
  };

  handleCancel = () => {
    this.setState({ createOrUpdate: true, country: {}, stateName: '' });
  }

  handleChangeSelectedSate = (stateCountry) => {
    this.setState(
      {
        stateName: stateCountry.stateName,
        country: stateCountry.country,
        stateCountryId: stateCountry.stateCountryId,
        createOrUpdate: false
      });
  };

  render() {
    const title = brand.name + ' - State Country';
    const description = brand.desc;
    const {
      countries, country, createOrUpdate, stateName,
      states
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
        <PapperBlock title="States" noMargin>
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
              <Typography variant="subtitle2" color="primary" style={{ width: '15%' }}>State</Typography>
              <div style={{ width: '80%' }}>
                <TextField
                  id="outlined-basic"
                  label="State Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={stateName}
                  name="stateName"
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
              <Typography variant="subtitle2" color="primary" style={{ width: '15%' }}>Country</Typography>
              <div style={{ width: '80%' }}>
                <Autocomplete
                  id="combo-box-demo"
                  value={country}
                  options={countries}
                  getOptionLabel={option => option.countryName}
                  onChange={this.handleChangeCountry}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Select the country"
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
                onClick={this.handleSubmitState}
              >
                {
                  createOrUpdate ? 'Save state' : 'Update State'
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
          <StateBlock  onSelected={this.handleChangeSelectedSate} states={states} />
        </PapperBlock>
      </div>
    );
  }
}
export default (StateCountry);
