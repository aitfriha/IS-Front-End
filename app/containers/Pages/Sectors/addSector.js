import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, TextField, Button, Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './sectors-jss';
import SectorConfigService from '../../Services/SectorConfigService';
import '../Configurations/map/app.css';
import AutoComplete from '../../../components/AutoComplete';
import SectorService from '../../Services/SectorService';
import { bindActionCreators } from 'redux';
import { addSectorConfig } from '../../../redux/actions/sectorConfigActions';
import { connect } from 'react-redux';

class AddSector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description1: '',
      description2: '',
      description3: '',
      type: '',
      parent: '',
      sector1: '',
      sector2: '',
      sector3: '',
      sectors1: [],
      sectors2: [],
      sectors3: []
    };
  }

  componentDidMount() {
    SectorService.getSectors().then(({ data }) => {
      const sectors1 = data.filter(sect => sect.type === 'primary');
      const sectors2 = data.filter(sect => sect.type === 'secondary');
      const sectors3 = data.filter(sect => sect.type === 'third');
      this.setState({ sectors3, sectors2, sectors1 });
    });
  }

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
    const { sector1, sector2, sector3 } = this.state;
    const { addNew, newAdd } = this.props;
    if (sector1 && sector3 && sector2) {
      const sect = {
        primarySector: sector1,
        secondarySector: sector2,
        thirdSector: sector3,
        leader: {
          name: '-'
        }
      };
      addNew(sect);
      newAdd();
    }
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

  handleValueChange = (value, type) => {
    console.log(value, type);
    this.setState({ [type]: value });
  };

  render() {
    const { classes, sectorsConfig } = this.props;
    console.log(sectorsConfig);
    const {
      description1,
      sectors1,
      sectors2,
      sectors3,
      sector1,
      sector2,
      sector3,
      description2,
      description3
    } = this.state;
    return (
      <div>
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
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              color="primary"
              style={{ width: '12%' }}
            >
              First Sector
            </Typography>
            <div style={{ width: '35%' }}>
              <AutoComplete
                value={this.handleValueChange}
                placeholder="First Sector Name"
                data={sectors1}
                type="sector1"
                attribute="name"
              />
            </div>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description1"
              value={description1}
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
            style={{ display: 'flex', justifyContent: 'space-between' }}
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              color="primary"
              style={{ width: '12%' }}
            >
              Second Sector
            </Typography>
            <div style={{ width: '35%' }}>
              <AutoComplete
                value={this.handleValueChange}
                placeholder="Second Sector Name"
                data={sectors2}
                type="sector2"
                attribute="name"
              />
            </div>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description2"
              value={description2}
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
            style={{ display: 'flex', justifyContent: 'space-between' }}
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Typography
              variant="subtitle2"
              color="primary"
              style={{ width: '12%' }}
            >
              Third Sector
            </Typography>
            <div style={{ width: '35%' }}>
              <AutoComplete
                value={this.handleValueChange}
                placeholder="Third Sector Name"
                data={sectors3}
                type="sector3"
                attribute="name"
              />
            </div>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description3"
              value={description3}
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
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 12
            }}
          >
            <Button
              color="primary"
              variant="contained"
              size="medium"
              onClick={this.handleSubmitSector}
              disabled={!sector2 || !sector1 || !sector3}
            >
              Save Sector
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
AddSector.propTypes = {
  classes: PropTypes.object.isRequired,
  addNew: PropTypes.func.isRequired,
  newAdd: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  sectorsConfig: state.get('SectorConfigModule').toJS().sectorsConfig
});
const mapDispatchToProps = dispatch => ({
  addNew: bindActionCreators(addSectorConfig, dispatch)
});
const AddSectorMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSector);
export default withStyles(styles)(AddSectorMapped);
