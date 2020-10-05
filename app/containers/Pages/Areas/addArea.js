import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import history from '../../../utils/history';
import styles from './areas-jss';
import SectorConfigService from '../../Services/SectorConfigService';
import ClientService from '../../Services/ClientService';
import '../Configurations/map/app.css';

const areaTypes = ['Primary', 'Secondary', 'Third'];

const filter = createFilterOptions();
class AddArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      code: '',
      type: '',
      parent: ''
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

  handleSubmitArea = () => {
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

  render() {
    const title = brand.name + ' - Areas';
    const { desc } = brand;
    const { classes } = this.props;
    const {
      name, code, type, parent
    } = this.state;
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
          title="New Area"
          desc="Please, Fill in the all field"
          icon="ios-person"
        >
          <Grid
            container
            spacing={6}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              md={7}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                value={name}
                style={{ width: '48%' }}
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                id="outlined-basic"
                label="code"
                variant="outlined"
                name="code"
                value={code}
                style={{ width: '48%' }}
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={
                type === 'Primary' || type === ''
                  ? { display: 'flex', justifyContent: 'center' }
                  : { display: 'flex', justifyContent: 'space-between' }
              }
            >
              <FormControl
                className={classes.formControl}
                style={{ width: '48%' }}
                required
              >
                <InputLabel>Type</InputLabel>
                <Select name="type" value={type} onChange={this.handleChange}>
                  {areaTypes.map(tp => (
                    <MenuItem key={tp} value={tp}>
                      {tp}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {type === 'Primary' || type === '' ? (
                <div />
              ) : (
                <FormControl
                  className={classes.formControl}
                  style={{ width: '48%' }}
                  required
                >
                  <InputLabel>Parent</InputLabel>
                  <Select
                    name="parent"
                    value={type}
                    onChange={this.handleChange}
                  >
                    <MenuItem key="parent" value="parent">
                      {'parent'}
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
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
                onClick={this.handleSubmitArea}
              >
                Save Area
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}
AddArea.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AddArea);
