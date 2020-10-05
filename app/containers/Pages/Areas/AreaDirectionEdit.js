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

const filter = createFilterOptions();
class AreaDirectionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryArea: '',
      secondaryArea: '',
      thirdArea: '',
      direction: ''
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
              primaryArea: dat.primaryArea,
              secondaryArea: dat.secondaryArea,
              thirdArea: dat.thirdArea,
              direction: dat.direction.name
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
      countrydirection: country.direction.name,
      sectordirection: sectorConfigChoose.direction,
      sector1: sectorConfigChoose.primaryArea,
      sector2: sectorConfigChoose.secondaryArea,
      sector3: sectorConfigChoose.thirdArea
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
      primaryArea, secondaryArea, thirdArea, direction
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
          title="Edit Area direction"
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
                <InputLabel>Primary area</InputLabel>
                <Select
                  name="primaryArea"
                  value={primaryArea}
                  onChange={this.handleChange}
                >
                  <MenuItem key="primary" value="primary">
                    {'primary'}
                  </MenuItem>
                </Select>
              </FormControl>
              {primaryArea === '' ? (
                <div />
              ) : (
                <FormControl className={classes.formControl} fullWidth required>
                  <InputLabel>Secondary area</InputLabel>
                  <Select
                    name="secondaryArea"
                    value={secondaryArea}
                    onChange={this.handleChange}
                  >
                    <MenuItem key="secondary" value="secondary">
                      {'secondary'}
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              {secondaryArea === '' ? (
                <div />
              ) : (
                <FormControl className={classes.formControl} fullWidth required>
                  <InputLabel>Third area</InputLabel>
                  <Select
                    name="thirdArea"
                    value={thirdArea}
                    onChange={this.handleChange}
                  >
                    <MenuItem key="third" value="third">
                      {'third'}
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              {thirdArea === '' ? (
                <div />
              ) : (
                <FormControl className={classes.formControl} fullWidth required>
                  <InputLabel>direction</InputLabel>
                  <Select
                    name="direction"
                    value={direction}
                    onChange={this.handleChange}
                  >
                    <MenuItem key="direction" value="direction">
                      {'direction'}
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  color="primary"
                  variant="contained"
                  size="medium"
                  onClick={this.handleSubmitSector}
                  disabled={direction === ''}
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
AreaDirectionEdit.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AreaDirectionEdit);
