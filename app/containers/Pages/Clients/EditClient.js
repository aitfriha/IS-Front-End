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
import { addClientCommercial, getAllClient, updateClient } from '../../../redux/client/actions';
import notification from '../../../components/Notification/Notification';
const changed = 'non';
const filter = createFilterOptions();
class EditClient extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.editingPromiseResolve2 = () => {
    };
    this.state = {
      name: '',
      city: '',
      cityId: '',
      multinational: false,
      isActive: true,
      country: {},
      adCountry: {},
      countries: [],
      open: false,
      sectors: [],
      sector1: {},
      sectorConfig: [],
      sectorConfigChoose: null,
      type: 'new',
      logo: '',
      clients: [],
      sectorsConfig: {},
      addressName: '',
      state: '',
      postCode: '',
      adCity: '',
      email: '',
      phone: '',
      webSite: '',
      keyCountry: {},
      keyState: {},
      keyCity:{}
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllCountry, selectedClient, getAllStateByCountry } = this.props;
    getAllCountry();
    getAllStateByCountry(selectedClient[21]);
  }

  componentWillReceiveProps(newProps) {

    this.setState({name: newProps.selectedClient[1]});
    this.setState({ clientId: newProps.selectedClient[23] });
    this.setState({ email: newProps.selectedClient[2] });
    this.setState({ phone: newProps.selectedClient[3] });
    this.setState({ webSite: newProps.selectedClient[4] });
    if (newProps.selectedClient[5] === 'Yes') {
      this.setState({ isActive: true });
    } else {
      this.setState({ isActive: false });
    }
    if (newProps.selectedClient[17] === 'Yes') {
      this.setState({ multinational: true });
    } else {
      this.setState({ multinational: false });
    }
    this.setState({ addressName: newProps.selectedClient[7] });
    this.setState({ postCode: newProps.selectedClient[8] });
    this.setState({ type: newProps.selectedClient[20] });
    if (newProps.selectedClient !== this.props.selectedClient) {
      // console.log(newProps.selectedClient);
      for (const key in newProps.allCountrys) {
        if (newProps.allCountrys[key].countryName === newProps.selectedClient[18]) {
          this.setState({ keyCountry: newProps.allCountrys[key] });
          break;
        }
      }
    }
    for (const key in newProps.allStateCountrys) {
      if (newProps.allStateCountrys[key].stateCountryId === newProps.selectedClient[22]) {
        this.setState({ keyState: newProps.allStateCountrys[key] });
        break;
      }
    }
    for (const key in newProps.allCitys) {
      if (newProps.allCitys[key].cityName === newProps.selectedClient[17]) {
        this.setState({ keyCity: newProps.allCitys[key] });
        this.setState({ cityId: newProps.allCitys[key].cityId });
        break;
      }
    }

  }


  /* static getDerivedStateFromProps(props, state) {
    let a={};
    console.log('bbb ', JSON.stringify(props.allStateCountrys) == JSON.stringify(state.allStateCountrys));
    for (const key in props.allCountrys) {
      for (const key in props.allCountrys) {
        if (props.allCountrys[key].countryName === props.selectedClient[18]) {
          a= props.allCountrys[key];
          break;
        }
      }

      return {
        name: props.selectedClient[1],
        isActive:(props.selectedClient[5] === 'Yes') ? true:false,
        multinational:(props.selectedClient[17] === 'Yes') ? true:false,
        addressName: props.selectedClient[7],
        postCode: props.selectedClient[8],
        type: props.selectedClient[20],
        email: props.selectedClient[2],
        phone: props.selectedClient[3],
        webSite: props.selectedClient[4],
        //allStateCountrys: props.allStateCountrys,
        keyCountry:a,
      };
    }
  } */

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
    const { updateClient,getAllClient } = this.props;
    const {
      clientId,
      name,
      email,
      phone,
      webSite,
      cityId,
      sectorsConfig,
      type,
      logo,
      isActive,
      postCode,
      multinational,
      addressName
    } = this.state;
    const client = {
      clientId,
      name,
      email,
      phone,
      webSite,
      logo,
      multinational: multinational ? 'Yes' : 'No',
      isActive,
      type,
      cityId,
      addressName,
      postCode,
      // countryLeader: country.leader.name,
      sectorLeader: sectorsConfig.leader,
      sector1: sectorsConfig.primarySector,
      sector2: sectorsConfig.secondarySector,
      sector3: sectorsConfig.thirdSector
    };
    console.log(client);
    /** */
    const promise = new Promise((resolve) => {
      // get client information
      updateClient(client);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        notification('success', result);
        getAllClient();
      } else {
        notification('danger', result);
      }
    });
  };

  handleCheck = (sectorsConfig) => {
    this.setState({ sectorsConfig });
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
    this.setState({ keyCountry: value });
  };

  handleChangeState = (ev, value) => {
    const { getAllCityByState } = this.props;
    getAllCityByState(value.stateCountryId);
    this.setState({ keyState: value });
  };

  handleChangeCity = (ev, value) => {
    this.setState({ cityId: value.cityId });
    this.setState({ keyCity: value });
  };

  handleChange= (ev, value) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  render() {
    const title = brand.name + ' - Clients';
    const description = brand.desc;
    const {
      classes, allCountrys, allCitys, clientResponse, isLoadingClient, errorsClient, selectedClient, allStateCountrys,
      isLoadingState, stateCountryResponse, errorsState
    } = this.props;
    const {
      multinational, isActive, country,
      countries,
      name, webSite, type, logo, clients, addressName, postCode, keyCountry, keyState, keyCity,
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
        <PapperBlock title="update Client" desc="Please, Fill in the all field" icon="ios-person">
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
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                fullWidth
                value={name}
                onChange={this.handleChange}
                required
                className={classes.textField}
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
                  <MenuItem key="old" value="old">
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
                value={allCountrys.find(v => v.countryName === keyCountry.countryName) || ''}
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
                value={allStateCountrys.find(v => v.stateName === keyState.stateName) || ''}
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
                value={allCitys.find(v => v.cityName === keyCity.cityName) || ''}
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
                name="addressName"
                fullWidth
                required
                value={addressName}
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
                value={postCode}
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
              <Button color="primary" variant="contained" size="small" onClick={this.handleSubmitClient}>Update Client</Button>
            </div>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}
EditClient.propTypes = {
  classes: PropTypes.object.isRequired,
  // add: PropTypes.func.isRequired,
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
  getAllClient,
  updateClient
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditClient));
