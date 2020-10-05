import React from 'react';
import { Helmet } from 'react-helmet';
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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import history from '../../../utils/history';
import styles from './sectors-jss';
import SectorConfigService from '../../Services/SectorConfigService';
import ClientService from '../../Services/ClientService';
import '../Configurations/map/app.css';

const filter = createFilterOptions();
class SectorLeaderEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primarySector: '',
      secondarySector: '',
      thirdSector: '',
      leader: '',
      startDate: new Date()
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

  handleSubmitSector = () => {
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
    const title = brand.name + ' - Sectors';
    const { desc } = brand;
    const { classes } = this.props;
    const {
      primarySector,
      secondarySector,
      thirdSector,
      leader,
      startDate
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
          title="Edit Sector Leader"
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
            <Grid item xs={12} md={5}>
              <FormControl className={classes.formControl} fullWidth required>
                <InputLabel>Primary sector</InputLabel>
                <Select
                  name="primarySector"
                  value={primarySector}
                  onChange={this.handleChange}
                >
                  <MenuItem key="primary" value="primary">
                    {'primary'}
                  </MenuItem>
                </Select>
              </FormControl>
              {primarySector === '' ? (
                <div />
              ) : (
                <FormControl className={classes.formControl} fullWidth required>
                  <InputLabel>Secondary sector</InputLabel>
                  <Select
                    name="secondarySector"
                    value={secondarySector}
                    onChange={this.handleChange}
                  >
                    <MenuItem key="secondary" value="secondary">
                      {'secondary'}
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              {secondarySector === '' ? (
                <div />
              ) : (
                <FormControl className={classes.formControl} fullWidth required>
                  <InputLabel>Third sector</InputLabel>
                  <Select
                    name="thirdSector"
                    value={thirdSector}
                    onChange={this.handleChange}
                  >
                    <MenuItem key="third" value="third">
                      {'third'}
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              {thirdSector === '' ? (
                <div />
              ) : (
                <div>
                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    required
                  >
                    <InputLabel>Leader</InputLabel>
                    <Select
                      name="leader"
                      value={leader}
                      onChange={this.handleChange}
                    >
                      <MenuItem key="leader" value="leader">
                        {'leader'}
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Choose date"
                      value={startDate}
                      onChange={this.handleChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  color="primary"
                  variant="contained"
                  size="medium"
                  onClick={this.handleSubmitSector}
                  disabled={leader === ''}
                  style={{ marginTop: 20 }}
                >
                  Save
                </Button>
              </div>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}
SectorLeaderEdit.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SectorLeaderEdit);
