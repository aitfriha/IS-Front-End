import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './sector-jss';
import SectorConfigService from '../../Services/SectorConfigService';
import SectorService from '../../Services/SectorService';

class SectorBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectors: [],
      countryName: '',
      sector1: {},
      sectorConfig: []
    }
  }

  componentDidMount() {
    SectorService.getSectorsType('primary').then(({ data }) => {
      this.setState({ sectors: data, open: true });
    });
  }

  handleChange = (ev) => {
    if (ev.target.name === 'sector1') {
      SectorConfigService.getConfigSectorsPrimary(ev.target.value.name).then(({ data }) => {
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
      });
    }
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleCheck = (ev, id) => {
    const { sectorConfig } = this.state;
    const newSectorConfig = sectorConfig;
    newSectorConfig.forEach(config => {
      if (config.sectorConfigId === id) {
        config.choose = ev.target.checked;
        const { sectorsConfig } = this.props;
        if (config.choose) {
          sectorsConfig(config);
        } else {
          sectorsConfig({});
        }
      } else {
        config.choose = false
      }
    });
    this.setState({ sectorConfig: newSectorConfig });
  };

  render() {
    const { classes } = this.props;
    const { sectors, sector1, sectorConfig } = this.state;
    return (
      <div>
        <Typography variant="subtitle2" component="h2">
          Please, choose the primary sector
        </Typography>
        <FormControl className={classes.textField} fullWidth required>
          <InputLabel>Primary Sector</InputLabel>
          <Select
            name="sector1"
            value={sector1}
            onChange={this.handleChange}
          >
            {
              sectors.map((sect) => (
                <MenuItem key={sect.sectorId} value={sect}>
                  {sect.name}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Primary Sector</TableCell>
                <TableCell align="right">Secondary Sector</TableCell>
                <TableCell align="right">Third Sector</TableCell>
                <TableCell align="right">Sector Leader</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sectorConfig.map((row) => (
                <TableRow key={row.sectorConfigId}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={row.choose}
                      color="primary"
                      onChange={event => this.handleCheck(event, row.sectorConfigId)
                      }
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.primarySector}
                  </TableCell>
                  <TableCell align="right">{row.secondarySector}</TableCell>
                  <TableCell align="right">{row.thirdSector}</TableCell>
                  <TableCell align="right">{row.leader}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
SectorBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  sectorsConfig: PropTypes.func.isRequired
};
export default withStyles(styles)(SectorBlock);
