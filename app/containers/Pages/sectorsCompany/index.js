import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button, Grid, TextField, Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import { isString } from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MUIDataTable from 'mui-datatables';
import styles from './sectors-jss';
import SectorsBlock from './SectorsBlock';
import AddSector from './addSector';

import {
  addSectorCompany, deleteSectorCompany,
  getAllChildSectorCompany,
  getAllPrimarySectorCompany,
  getAllSectorCompany
} from '../../../redux/sectorsCompany/actions';
import AutoComplete from '../../../components/AutoComplete';
import SectorConfigService from '../../Services/SectorConfigService';
import notification from '../../../components/Notification/Notification';
import { getAllClient } from '../../../redux/client/actions';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';

class sector extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      description1: '',
      description2: '',
      description3: '',
      thirdSectorName: '',
      isDisabled: true,
      columns: [
        {
          name: 'firstSectorName',
          label: 'Primary Sector',
          options: {
            filter: true
          }
        },
        {
          label: 'Secondary Sector',
          name: 'secondSectorName',
          options: {
            filter: true
          }
        },
        {
          label: 'Third Sector',
          name: 'thirdSectorName',
          options: {
            filter: true
          }
        },
/*        {
          label: 'Client',
          name: 'client',
          options: {
            customBodyRender: (value) => (
              <React.Fragment>
                {/!*  <TableCell align="right">{value.name}</TableCell> *!/}
              </React.Fragment>
            )
          }
        },*/
        {
          label: ' ',
          name: ' ',
          options: {
            customBodyRender: (value, data) => (
              <React.Fragment>
                <IconButton onClick={() => console.log('eee')}>
                  <EditIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => this.delete(data.rowData[0], data.rowData[1], data.rowData[2])}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

  // eslint-disable-next-line react/sort-comp
  delete = (a, b, c) => {
    const { deleteSectorCompany,getAllSectorCompany,getAllPrimarySectorCompany } = this.props;
    if (b === undefined) { b = null; }
    if (c === undefined) { c = null; }
    if (c === '') { c = null; }
    const promise = new Promise((resolve) => {
      deleteSectorCompany(a, b, c);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        notification('success', result);
        getAllSectorCompany();
        getAllPrimarySectorCompany();
      } else {
        notification('danger', result);
      }
    });
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const {
      getAllSectorCompany, allSectorComapnys, allSectorPimaryComapnys, getAllPrimarySectorCompany
    } = this.props;
    getAllSectorCompany();
    getAllPrimarySectorCompany();
  }


  handleValueChange1 = (ev, value) => {
    const { getAllChildSectorCompany } = this.props;
    this.setState({ description1: 'description sector1' });
    this.setState({ firstSectorName: value.firstSectorName });
    this.setState({ isDisabled: false });
    getAllChildSectorCompany(value.firstSectorName);
  };

  handleinputChange1 = (ev, value) => {
    console.log('oui input first ', value);
    this.setState({ firstSectorName: value });
    this.setState({ isDisabled: false });
  };


  handleValueChange2 = (ev, value) => {
    console.log('oui change second');
    this.setState({ secondSectorName: value.secondSectorName });
  };

  handleinputChange2 = (ev, value) => {
    console.log('oui input second');
    this.setState({ secondSectorName: value });
  };

  handleValueChange3 = ev => {
    console.log(ev.target.value);
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSubmitSector = () => {
    const {
      firstSectorName, secondSectorName, thirdSectorName, description1, description2, description3
    } = this.state;
    const { addSectorCompany, getAllSectorCompany, getAllPrimarySectorCompany } = this.props;
    const sect = {
      firstSectorName,
      firstSectorDescription: description1,
      secondSectorName,
      secondSectorDescription: description2,
      thirdSectorName,
      thirdSectorDescription: description3
    };
    const promise = new Promise((resolve) => {
      addSectorCompany(sect);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        notification('success', result);
        getAllSectorCompany();
        getAllPrimarySectorCompany();
      } else {
        notification('danger', result);
      }
    });
  };

  render() {
    const title = brand.name + ' - Sectors';
    const description = brand.desc;
    const {
      description1, description2, description3, thirdSectorName, isDisabled, columns
    } = this.state;
    const {
      // eslint-disable-next-line no-shadow
      errors, isLoading, sectorComapnyResponse, allSectorComapnys, allSectorPimaryComapnys, deleteSectorCompany
    } = this.props;
    (!isLoading && sectorComapnyResponse) && this.editingPromiseResolve(sectorComapnyResponse);
    (!isLoading && !sectorComapnyResponse) && this.editingPromiseResolve(errors);
    let {
      allSectorChildComapnys
    } = this.props;
    if (allSectorChildComapnys === undefined) {
      allSectorChildComapnys = [{ secondSectorName: '' }];
      console.log(allSectorChildComapnys);
    } else {
      console.log('allSectorChildComapnys ', allSectorChildComapnys);
    }

    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allSectorComapnys}
          url="/app/gestion-commercial/sectors/create-sector"
          tooltip="add new Sector"
        />
      )
    };
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
        <PapperBlock title="Sectors" icon="ios-person" noMargin>
          {/* xxxxxxxxxxxxx */}
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
                <Typography variant="subtitle2" color="primary" style={{ width: '12%' }}>First Sector</Typography>
                <div style={{ width: '35%' }}>
                  {/*  <AutoComplete value={this.handleValueChange} placeholder="First Sector Name" data={sectors1} type="sector1" /> */}
                  <Autocomplete
                    id="combo-box-demo"
                    name="firstSector"
                    freeSolo
                    options={allSectorPimaryComapnys}
                    getOptionLabel={option => option.firstSectorName}
                    onChange={this.handleValueChange1}
                    onInputChange={this.handleinputChange1}
                    style={{ marginTop: 15 }}
                    renderInput={params => (
                      <TextField
                        fullWidth
                        {...params}
                        label="First Sector"
                        variant="outlined"
                      />
                    )}
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
                  /* className={classes.textField} */
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
                <Typography variant="subtitle2" color="primary" style={{ width: '12%' }}>Second Sector</Typography>
                <div style={{ width: '35%' }}>
                  <Autocomplete
                    id="combo-box-demo"
                    freeSolo
                    name="secondSector"
                    disabled={isDisabled}
                    options={allSectorChildComapnys && allSectorChildComapnys}
                    getOptionLabel={option => option.secondSectorName}
                    onChange={this.handleValueChange2}
                    onInputChange={this.handleinputChange2}
                    style={{ marginTop: 15 }}
                    renderInput={params => (
                      <TextField
                        fullWidth
                        {...params}
                        label="Second Sector"
                        variant="outlined"
                      />
                    )}
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
                  /* className={classes.textField} */
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
                <Typography variant="subtitle2" color="primary" style={{ width: '12%' }}>Third Sector</Typography>
                <div style={{ width: '35%' }}>
                  <TextField
                    id="outlined-basic"
                    label="Third Secor"
                    variant="outlined"
                    name="thirdSectorName"
                    value={thirdSectorName}
                    style={{ width: '100%' }}
                    required
                    /*  className={classes.textField} */
                    onChange={this.handleValueChange3}
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
                  /*  className={classes.textField} */
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  size="medium"
                  onClick={this.handleSubmitSector}
                  /*   disabled={!sector2 || !sector1 || !sector3} */
                >
                  Save Sector
                </Button>
              </Grid>
            </Grid>
          </div>
          {/* xxxxxxxxxxxxx */}
          <div>
            <MUIDataTable
              title="The Sectors List"
              data={allSectorComapnys}
              columns={columns}
              options={options}
            />
          </div>
        </PapperBlock>
      </div>
    );
  }
}
sector.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllSectorCompany: PropTypes.func.isRequired,
  allSectorComapnys: PropTypes.array.isRequired,
  sectorComapnyResponse: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  addSectorCompany: PropTypes.func.isRequired,

  getAllPrimarySectorCompany: PropTypes.func.isRequired,
  allSectorPimaryComapnys: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  allSectorComapnys: state.getIn(['sectorCompany']).allSectorComapnys,
  allSectorChildComapnys: state.getIn(['sectorCompany']).allSectorChildComapnys,
  sectorComapnyResponse: state.getIn(['sectorCompany']).sectorComapnyResponse,
  isLoading: state.getIn(['sectorCompany']).isLoading,
  errors: state.getIn(['sectorCompany']).errors,

  allSectorPimaryComapnys: state.getIn(['sectorCompany']).allSectorPimaryComapnys,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addSectorCompany,
  getAllSectorCompany,
  getAllChildSectorCompany,
  getAllPrimarySectorCompany,
  deleteSectorCompany
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(sector));
