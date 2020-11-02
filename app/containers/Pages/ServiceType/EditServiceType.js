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
import styles from '../Clients/clients-jss';
import ClientService from '../../Services/ClientService';
import { getAllCountry } from '../../../redux/country/actions';
import { getAllStateByCountry } from '../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../redux/city/actions';
import { addClientCommercial, getAllClient, updateClient } from '../../../redux/client/actions';
import notification from '../../../components/Notification/Notification';
const changed = 'non';
const filter = createFilterOptions();

class EditServiceType extends React.Component {
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
      keyCity: {}
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {


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
    const { updateClient, getAllClient } = this.props;
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
      classes,
    } = this.props;


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
        <Grid item xs={12} md={12}>
          <TextField
            id="outlined-basic"
            label="Commercial Operation related"
            variant="outlined"
            name="name"
            fullWidth
            value={description}
            onChange={this.handleChange}
            required
            className={classes.textField}
          />
          <TextField
            id="outlined-basic"
            label="ServiceTypoe"
            variant="outlined"
            name="serviceTypoe"
            fullWidth
            value={description}
            onChange={this.handleChange}
            required
            className={classes.textField}
          />
        </Grid>
      </div>
    );
  }
}
EditServiceType.propTypes = {
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
)(EditServiceType));
