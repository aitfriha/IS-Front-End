import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, FormControl, TextField, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import { Image } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import history from '../../../utils/history';
import styles from './companies-jss';
import SectorConfigService from '../../Services/SectorConfigService';
import ClientService from '../../Services/ClientService';
import SectorService from '../../Services/SectorService';
import '../Configurations/map/app.css';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import AddressBlock from '../Address';

const filter = createFilterOptions();
class AddCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      address: '',
      postCode: '',
      state: '',
      city: '',
      open: false,
      logo: ''
    };
  }

  componentDidMount() {}

  handleChange = ev => {
    if (ev.target.name === 'sector1') {
      SectorConfigService.getConfigSectorsPrimary(ev.target.value.name).then(
        ({ data }) => {
          const datas = [];
          data.forEach(da => {
            const dat = da;
            const newSect = {
              sectorConfigId: dat.sectorConfigId,
              choose: false,
              primarySector: dat.primarySector,
              secondarySector: dat.secondarySector,
              thirdSector: dat.thirdSector,
              leader: dat.leader.name
            };
            datas.push(newSect);
          });
          this.setState({ sectorConfig: datas });
        }
      );
    }
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitClient = () => {
    const {
      multinational,
      isActive,
      country,
      name,
      city,
      sectorConfigChoose,
      type,
      logo
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
      sectorLeader: sectorConfigChoose.leader,
      sector1: sectorConfigChoose.primarySector,
      sector2: sectorConfigChoose.secondarySector,
      sector3: sectorConfigChoose.thirdSector
    };
    ClientService.saveClient(client).then(({ data }) => {
      history.push('/app/gestion-commercial/clients');
    });
  };

  handleOpenSectors = () => {
    SectorService.getSectorsType('primary').then(({ data }) => {
      this.setState({ sectors: data, open: true });
    });
  };

  handleCloseSectors = () => {
    this.setState({ open: false });
  };

  handleCheck = (ev, id) => {
    const { sectorConfig } = this.state;
    const newSectorConfig = sectorConfig;
    newSectorConfig.forEach(config => {
      if (config.sectorConfigId === id) {
        config.choose = ev.target.checked;
      }
    });
    this.setState({ sectorConfig: newSectorConfig });
  };

  handleSubmit = () => {
    const { sectorConfig } = this.state;
    const sectorConfigChoose = sectorConfig.find(sectorC => sectorC.choose);
    this.setState({ sectorConfigChoose, sectorConfig: [] });
    this.handleCloseSectors();
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

  handleChangeLogo = e => {
    this.readURI(e);
  };

  render() {
    const title = brand.name + ' - Companies';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      open,
      name,
      email,
      phone,
      address,
      postCode,
      state,
      city,
      logo
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
        <PapperBlock
          title="New Company"
          desc="Please, Fill in the all field"
          icon="ios-person"
        >
          <Grid
            container
            spacing={10}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={4}>
              <Chip label="General Information" avatar={<Avatar>G</Avatar>} color="primary" />
              <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                value={name}
                required
                fullWidth
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                value={email}
                required
                fullWidth
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                name="phone"
                value={phone}
                required
                fullWidth
                className={classes.textField}
                onChange={this.handleChange}
              />
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
                    Photo
                  </Button>
                </FormLabel>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Chip label="Company Address" avatar={<Avatar>A</Avatar>} color="primary" />
              <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
              <AddressBlock onChangeInput={this.handleChange} />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                color="primary"
                variant="contained"
                size="medium"
                onClick={this.handleSubmitClient}
              >
                Save Company
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}
AddCompany.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AddCompany);
