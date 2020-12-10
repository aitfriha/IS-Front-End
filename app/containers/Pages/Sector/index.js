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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './sector-jss';
import SectorConfigService from '../../Services/SectorConfigService';
import SectorService from '../../Services/SectorService';
import { getAllPrimarySectorCompany, getAllSubChildSectorCompany } from '../../../redux/sectorsCompany/actions';

class SectorBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectors: [],
      countryName: '',
      sector1: {},
      sectorConfig: [],
      idSector: ''
    };
  }

  componentDidMount() {
    const { getAllPrimarySectorCompany } = this.props;
    SectorService.getSectorsType('primary').then(({ data }) => {
      this.setState({ sectors: data, open: true });
    });
    getAllPrimarySectorCompany();
  }

  handleChange = (ev) => {
    const { getAllSubChildSectorCompany } = this.props;
    console.log('hhhhhhhhhhhhhhhh ', (ev.target.value).firstSectorName);
    getAllSubChildSectorCompany((ev.target.value).firstSectorName);
    /*
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
    }); */
    // get sub secteur of primarySector
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleCheck = (ev, selctedrow) => {
    const { sectorsConfig } = this.props;
    console.log('check');
    console.log(selctedrow);
    if (selctedrow.thirdSectorId !== '') {
      sectorsConfig(selctedrow);
    } else if (selctedrow) {
      sectorsConfig(selctedrow.secondSectorId);
    } else {
      sectorsConfig(selctedrow);
    }
  };

  render() {
    const { classes, allSectorComapnys, allSubSectorChildComapnys } = this.props;
    const { sectors, sector1, sectorConfig } = this.state;
    console.log('allSubSectorChildComapnys ', allSubSectorChildComapnys);
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
              allSectorComapnys && allSectorComapnys.map((sect) => (
                <MenuItem key={sect.firstSectorId} value={sect}>
                  {sect.firstSectorName}
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
                {/* <TableCell align="right">Sector Leader</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {allSubSectorChildComapnys && allSubSectorChildComapnys.map((row) => (
                <TableRow key={row.thirdSectorId}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={row.choosez}
                      color="primary"
                      onChange={event => this.handleCheck(event, row)
                      }
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.firstSectorName}
                  </TableCell>
                  <TableCell align="right">{row.secondSectorName}</TableCell>
                  <TableCell align="right">{row.thirdSectorName}</TableCell>
                  {/* <TableCell align="right">***</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  // primarySectors
  allSectorComapnys: state.getIn(['sectorCompany']).allSectorPimaryComapnys,
  sectorComapnyResponse: state.getIn(['sectorCompany']).sectorComapnyResponse,
  isLoading: state.getIn(['sectorCompany']).isLoading,
  errors: state.getIn(['sectorCompany']).errors,
  // allsubsectorof selected parent sector
  allSubSectorChildComapnys: state.getIn(['sectorCompany']).allSubSectorChildComapnys,
  subsectorComapnyResponse: state.getIn(['sectorCompany']).subsectorComapnyResponse,
  isLoadingSubSector: state.getIn(['sectorCompany']).isLoading,
  errorsSubSector: state.getIn(['sectorCompany']).errors,

});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllPrimarySectorCompany,
  getAllSubChildSectorCompany
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(SectorBlock));
