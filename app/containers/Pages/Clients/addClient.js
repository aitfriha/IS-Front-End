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
import AddressBlock from '../Address';
import SectorBlock from '../Sector';
import { addClient } from '../../../redux/actions/clientActions';
import history from '../../../utils/history';
import styles from './clients-jss';
import CountryConfigService from '../../Services/CountryConfigService';
import ClientService from '../../Services/ClientService';

const filter = createFilterOptions();
class AddClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { title: '' },
      city: '',
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
    CountryConfigService.getCountryConfig().then(({ data }) => {
      this.setState({ countries: data });
    });
    ClientService.getClients().then(({ data }) => {
      const clients = [];
      data.forEach(client => clients.push({ title: client.name }));
      this.setState({ clients });
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
    const {
      multinational,
      isActive,
      country,
      name,
      city,
      sectorsConfig,
      type,
      logo,
      adCountry,
      postCode,
      address,
      adCity,
      state,
      email,
      phone
    } = this.state;
    const client = {
      multinational: multinational ? 'Yes' : 'No',
      isActive: isActive ? 'Yes' : 'No',
      city,
      name: name.title,
      logo,
      type,
      country: country.country.countryName,
      countryLeader: country.leader.name,
      sectorLeader: sectorsConfig.leader,
      sector1: sectorsConfig.primarySector,
      sector2: sectorsConfig.secondarySector,
      sector3: sectorsConfig.thirdSector,
      address: {
        country: adCountry,
        address,
        postCode,
        state,
        city: adCity
      },
      email,
      phone
    };
    console.log(client);
    ClientService.saveClient(client).then(({ data }) => {
      console.log(data);
      history.push('/app/configurations/assignments/commercial-assignment', { type: 'assignment' });
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

  render() {
    const title = brand.name + ' - Clients';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      multinational, isActive, country,
      countries,
      name, webSite, type, logo, clients,
      phone, email
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
              <AddressBlock onChangeInput={this.handleChange} />
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
  add: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
  add: bindActionCreators(addClient, dispatch),
});

const AddClientMapped = connect(
  null,
  mapDispatchToProps
)(AddClient);
export default withStyles(styles)(AddClientMapped);
