import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  FormLabel,
  Avatar
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Image } from '@material-ui/icons';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import '../Configurations/map/app.css';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
import SectorBlock from '../Sector';
import history from '../../../utils/history';
import styles from './clients-jss';
import ClientService from '../../Services/ClientService';
import { getAllCountry } from '../../../redux/country/actions';
import { getAllStateByCountry } from '../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../redux/city/actions';
import { addClientCommercial, getAllClient } from '../../../redux/client/actions';
import notification from '../../../components/Notification/Notification';

import axios from "axios";
import { API } from '../../../config/apiUrl';

var Nuxeo = require('nuxeo');
var path = require('path');
var fs = require('fs');

let documentManagerConfig = {};

const filter = createFilterOptions();
class AddClient extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      name: { title: '' },
      city: '',
      cityId: '',
      multinational: false,
      isActive: true,
      country: {},
      adCountry: {},
      countries: [],
      open: false,
      sectors: [],
      sector: {},
      sector1: {},
      sectorConfig: [],
      sectorConfigChoose: null,
      type: 'new',
      logo: '',
      clients: [],
      sectorsConfig: {},
      address: '',
      state: '',
      postCode: '',
      adCity: '',
      email: '',
      phone: '',
      webSite: ''
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllCountry } = this.props;
    getAllCountry();

    /// carga en esta variable los datos de configuración ////
    axios.get(`${API}/documentManagerConfig/all`).then(res => {
      documentManagerConfig = res.data.payload;
    });

  }

  handleChange = (ev) => {
    console.log(ev.target.name);
    if (ev.target.name === 'adCountry') {
      this.setState({ phone: ev.target.value.phonePrefix });
    }
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleCheckClient = (ev) => {
    this.setState({ [ev.target.name]: ev.target.checked });
  };

  handleSubmitClient = () => {
    const { addClientCommercial } = this.props;
    const {
      name,
      email,
      phone,
      webSite,
      cityId,
      type,
      logo,
      isActive,
      postCode,
      multinational,
      address,
      sector
    } = this.state;
    const client = {
      name: name.title,
      email,
      phone,
      webSite,
      logo,
      multinational: multinational ? 'Yes' : 'No',
      isActive: isActive ? 'Yes' : 'No',
      type,
      cityId,
      addressName: address,
      postCode,
      // countryLeader: country.leader.name,
      //sectorLeader: sectorsConfig.leader,
      sector1: sector.firstSectorName,
      sector2: sector.secondSectorName,
      sector3: sector.thirdSectorName
    };
    console.log(client);
    /** */
    const promise = new Promise((resolve) => {
      // get client information
      addClientCommercial(client);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {

        //Create a section inside of both Commercial and Presale parent sections with the given client name
        var nuxeo = new Nuxeo({
          baseURL: documentManagerConfig.nuxeourl,
          auth: {
            method: 'basic',
            username: documentManagerConfig.user,
            password: documentManagerConfig.password
          }
        });
        let url = "/" + documentManagerConfig.dominio + '/sections/';
        let folderName = client.name;
        nuxeo.operation('Document.FetchByProperty')
          .params({ "property": "dc:title", "values": folderName })
          .execute()
          .then(function (docs) {
            let exists = false;
            docs.entries.forEach(element => {
              if (element.type === 'Section') {
                exists = true;
              }
            });
            if (docs.entries.length == 0 || !exists) {
              var newDocument = {
                'entity-type': 'document',
                name: folderName,
                type: 'Section',
                properties: {
                  'dc:title': folderName,
                  'dc:description': ''
                }
              }
              nuxeo.repository()
                .create(url + 'Comercial', newDocument)
                .then(function (doc) {
                  nuxeo.repository()
                    .create(url + 'Mabel', newDocument)
                    .then(function (doc) {
                      notification('success', result);
                      getAllClient();
                    }).catch(function (error) {
                      notification('danger', error);
                    });
                }).catch(function (error) {
                  notification('danger', error);
                });
            }
          });
      } else {
        notification('danger', result);
      }
    });
    /** */
    /* ClientService.saveClient(client).then(({ data }) => {
      console.log(data);
      history.push('/app/configurations/assignments/commercial-assignment', { type: 'assignment' });
    }); */
  };

  handleCheck = (sector) => {
    console.log('sector : ', sector);
    this.setState({ sector });
  };

  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.files);
      reader.onload = function (ev) {
        this.setState({ logo: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleChangeLogo = (e) => {
    this.readURI(e);
  };

  handleChangeCountry = (ev, value) => {
    const { getAllStateByCountry } = this.props;
    getAllStateByCountry(value.countryId);
  };

  handleChangeState = (ev, value) => {
    const { getAllCityByState } = this.props;
    getAllCityByState(value.stateCountryId);
  };

  handleChangeCity = (ev, value) => {
    this.setState({ cityId: value.cityId });
  };

  handleChange = (ev, value) => {
    console.log(ev.target.name);
    this.setState({ [ev.target.name]: ev.target.value });
  };

  render() {
    const title = brand.name + ' - Clients';
    const description = brand.desc;
    const {
      classes, allCountrys, allStateCountrys, allCitys, clientResponse, isLoadingClient, errorsClient
    } = this.props;
    const {
      multinational, isActive, country,
      countries,
      name, webSite, type, logo, clients,
      phone, email
    } = this.state;
    (!isLoadingClient && clientResponse) && this.editingPromiseResolve(clientResponse);
    (!isLoadingClient && !clientResponse) && this.editingPromiseResolve(errorsClient);
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
        <PapperBlock title="New Client" desc="Please, Fill in the all field" icon="ios-person">
          <Grid
            container
            spacing={10}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={3}>
              <Chip label="General Information" avatar={<Avatar>G</Avatar>} color="primary" />
              <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
              <Autocomplete
                value={name}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    this.setState({
                      name: {
                        title: newValue,
                      }
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    this.setState({
                      name: {
                        title: newValue.inputValue,
                      }
                    });
                  } else {
                    this.setState({ name: newValue });
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  // Suggest the creation of a new value
                  if (params.inputValue !== '') {
                    filtered.push({
                      inputValue: params.inputValue,
                      title: `Add "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={clients}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === 'string') {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.title;
                }}
                renderOption={(option) => option.title}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Name" variant="outlined" />
                )}
              />
              <TextField
                id="outlined-basic"
                label="General Email"
                variant="outlined"
                name="email"
                fullWidth
                value={email}
                onChange={this.handleChange}
                required
                className={classes.textField}
              />
              <TextField
                id="outlined-basic"
                label="General Phone"
                variant="outlined"
                name="phone"
                fullWidth
                value={phone}
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Web Site"
                variant="outlined"
                name="webSite"
                value={webSite}
                fullWidth
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
              <FormControl fullWidth required>
                <InputLabel>Type of client</InputLabel>
                <Select
                  name="type"
                  value={type}
                  onChange={this.handleChange}
                >
                  <MenuItem key="new" value="new">
                    New
                  </MenuItem>
                  <MenuItem key="old" value="Old">
                    Old
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.textField}>
                <input
                  style={{ display: 'none' }}
                  id="outlined-button-file-2"
                  type="file"
                  onChange={this.handleChangeLogo.bind(this)}
                />
                <FormLabel htmlFor="outlined-button-file-2">
                  <Button
                    fullWidth
                    variant="outlined"
                    component="span"
                    startIcon={<Image color="primary" />}
                  >
                    Logo
                  </Button>
                </FormLabel>
              </FormControl>
              {
                logo ? (
                  <Avatar alt="User Name" src={logo} className={classes.large} />
                ) : (<div />)
              }
              <FormGroup row>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={isActive}
                      color="primary"
                      name="isActive"
                      onChange={this.handleCheckClient}
                    />
                  )}
                  label="is Active ?"
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={multinational}
                      name="multinational"
                      color="primary"
                      onChange={this.handleCheckClient}
                    />
                  )}
                  label="Multinational ?"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={3}>
              <Chip label="Clients Address" avatar={<Avatar>S</Avatar>} color="primary" />
              <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
              <Autocomplete
                id="combo-box-demo"
                options={allCountrys}
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
                options={allStateCountrys}
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
                options={allCitys}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Chip label="Client Sectors" avatar={<Avatar>A</Avatar>} color="primary" />
              <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
              <SectorBlock sectorsConfig={this.handleCheck} />
            </Grid>
            <div className={classes.btnCenter}>
              <Button color="primary" variant="contained" size="small" onClick={this.handleSubmitClient}>Save Client</Button>
            </div>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}
AddClient.propTypes = {
  classes: PropTypes.object.isRequired,
  //add: PropTypes.func.isRequired,
  getAllCountry: PropTypes.func.isRequired,
  allCountrys: PropTypes.array.isRequired,
  allStateCountrys: PropTypes.array.isRequired,
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
  errorsCity: state.getIn(['cities']).errors,
  // client
  allClients: state.getIn(['clients']).allClients,
  clientResponse: state.getIn(['clients']).clientResponse,
  isLoadingClient: state.getIn(['clients']).isLoading,
  errorsClient: state.getIn(['clients']).errors

});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCountry,
  getAllStateByCountry,
  getAllCityByState,
  addClientCommercial,
  getAllClient
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClient));
