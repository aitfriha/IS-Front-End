import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import brand from 'dan-api/dummy/brand';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import { isString } from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MUIDataTable from 'mui-datatables';
import Divider from '@material-ui/core/Divider';
import styles from './sectors-jss';
import SectorsBlock from './SectorsBlock';
import AddSector from './addSector';

import {
  addSectorCompany, deleteConfirmationSectorCompany, deleteSectorCompany,
  getAllChildSectorCompany,
  getAllPrimarySectorCompany,
  getAllSectorCompany
} from '../../../redux/sectorsCompany/actions';
import AutoComplete from '../../../components/AutoComplete';
import SectorConfigService from '../../Services/SectorConfigService';
import notification from '../../../components/Notification/Notification';
import { getAllClient } from '../../../redux/client/actions';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import EditClient from '../Clients/EditClient';
import { ThemeContext } from '../../App/ThemeWrapper';
const useStyles = makeStyles();
class sector extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      description1: '',
      description2: '',
      description3: '',
      thirdSectorName: '',
      openPopUp: false,
      message: '',
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
        }, */
        {
          label: 'actions',
          name: ' ',
          options: {
            customBodyRender: (value, data) => (
              <React.Fragment>
                {/*              <IconButton onClick={() => console.log('eee')}>
                  <EditIcon color="secondary" />
                </IconButton> */}
                {thelogedUser.userRoles[0].actionsNames.commercial_sectorsCompany_delete
                  ? (
                    <IconButton onClick={() => this.delete(data.rowData[0], data.rowData[1], data.rowData[2])}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  ) : null
                }
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

  /* componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('2');
    console.log(this.state.message);
  } */

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  // eslint-disable-next-line react/sort-comp
  delete = (a, b, c) => {
    this.setState({ sector1: a });
    this.setState({ sector2: b });
    this.setState({ sector3: c });

    this.setState({ openPopUp: true });
    const { deleteSectorCompany, getAllSectorCompany, getAllPrimarySectorCompany } = this.props;
    if (b === undefined) { b = null; }
    if (c === undefined) { c = null; }
    if (c === '') { c = null; }
    const promise = new Promise((resolve) => {
      deleteSectorCompany(a, b, c);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        // this.setState({ message: result.message });
        this.setState({ message: 'Are you sure you want to delete ?' });
        // notification('success', result);
        // getAllSectorCompany();
      //  getAllPrimarySectorCompany();
      } else {
        this.setState({ message: result.message });
      //  notification('danger', result);
      }
    });
  };

  deleteConfirmation = () => {
    let { sector1, sector2, sector3 } = this.state;
    const { deleteConfirmationSectorCompany, getAllSectorCompany, getAllPrimarySectorCompany } = this.props;
    if (sector2 === undefined) { sector2 = null; }
    if (sector3 === undefined) { sector3 = null; }
    if (sector3 === '') { sector3 = null; }
    const promise = new Promise((resolve) => {
      deleteConfirmationSectorCompany(sector1, sector2, sector3);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        this.setState({ message: result });
        this.setState({ openPopUp: false });
        notification('success', result);
        getAllSectorCompany();
        getAllPrimarySectorCompany();
      } else {
        this.setState({ openPopUp: false });
        notification('danger', result);
      }
    });
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const {
      getAllSectorCompany, allSectorComapnys, allSectorPimaryComapnys, getAllPrimarySectorCompany, changeTheme
    } = this.props;
    changeTheme('redTheme');
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
      description1, description2, description3, thirdSectorName, isDisabled, openPopUp, message
    } = this.state;
    const {
      // eslint-disable-next-line no-shadow
      errors, isLoading, sectorComapnyResponse, allSectorComapnys, allSectorPimaryComapnys, deleteSectorCompany, logedUser
    } = this.props;
    (!isLoading && sectorComapnyResponse) && this.editingPromiseResolve(sectorComapnyResponse);
    (!isLoading && !sectorComapnyResponse) && this.editingPromiseResolve(errors);
    let {
      allSectorChildComapnys
    } = this.props;
    if (allSectorChildComapnys === undefined) {
      allSectorChildComapnys = [{ secondSectorName: '' }];
    } else {
      console.log('allSectorChildComapnys ', allSectorChildComapnys);
    }
    const thelogedUser = JSON.parse(logedUser);
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.commercial_sectorsCompany_export) {
      exportButton = true;
    }
    const { columns } = this.state;
    if (!thelogedUser.userRoles[0].actionsNames.commercial_sectorsCompany_modify && !thelogedUser.userRoles[0].actionsNames.commercial_sectorsCompany_delete) {
      columns[3] = '';
    }
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      download: exportButton,
      print: exportButton,
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allSectorComapnys}
          url="/app/gestion-commercial/sectors/create-sector"
          tooltip="add new Sector"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.commercial_sectorsCompany_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.commercial_sectorsCompany_export}
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
          {thelogedUser.userRoles[0].actionsNames.commercial_sectorsCompany_create ? (
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
          ) : null
          }
          <div>
            <MUIDataTable
              title="The Sectors List"
              data={allSectorComapnys}
              columns={columns}
              options={options}
            />
          </div>
        </PapperBlock>
        <Dialog
          open={openPopUp}
          keepMounted
          scroll="body"
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth=""
          maxWidth=""
        >
          <DialogTitle id="alert-dialog-slide-title"> Delete Sector </DialogTitle>
          <DialogContent dividers>
            {message !== 'Are you sure you want to delete ?' ? (
              <p style={{ color: 'red' }}>{message}</p>
            ) : (
              <p>{message}</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.deleteConfirmation}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
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
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addSectorCompany,
  getAllSectorCompany,
  getAllChildSectorCompany,
  getAllPrimarySectorCompany,
  deleteSectorCompany,
  deleteConfirmationSectorCompany
}, dispatch);

const SectorsMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(sector);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <SectorsMapped changeTheme={changeTheme} classes={classes} />;
};
