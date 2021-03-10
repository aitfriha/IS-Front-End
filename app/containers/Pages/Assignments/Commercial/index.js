import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../Configurations/map/app.css';
import {
  withStyles,
  Typography,
  TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MaterialTable, { MTableToolbar } from 'material-table';
import { isString } from 'lodash';
import { CSVReader } from 'react-papaparse';
import CloudUploadIcon from '@material-ui/core/SvgIcon/SvgIcon';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { addClient } from '../../../../redux/actions/clientActions';
import CommercialService from '../../../Services/CommercialService';
import AssignmentService from '../../../Services/AssignmentService';
import AddressService from '../../../Services/AddressService';
import styles from '../assignment-jss';
import CountryService from '../../../Services/CountryService';
import ClientService from '../../../Services/ClientService';
import CommercialAssignmentsMapped from './assignmentBlock';
import ClientBlockMapped from '../../Clients/ClientBlock';
import history from '../../../../utils/history';
import {
  addClientCommercial, deleteClient, getAllClient, getAllClientByCountry, importClientCommercial, updateClient
} from '../../../../redux/client/actions';
// eslint-disable-next-line import/named
import notification from '../../../../components/Notification/Notification';
import { getAllStaff } from '../../../../redux/staff/actions';
import { addAssignment, deleteAssignment } from '../../../../redux/assignment/actions';

import axios from "axios";
import { API } from '../../../../config/apiUrl';
import moment from 'moment';

var Nuxeo = require('nuxeo');
var path = require('path');
var fs = require('fs');

let documentManagerConfig = {};

const buttonRef = React.createRef();
class Commercial extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.editingPromiseResolveImport = () => {
    };
    this.state = {
      display: 'flex',
      openPopUpImport: false,
      openPopUpDelete: false,
      staff: '',
      listClientToUpdate: [],
      clientNames: [],
      typeResponsible: '',
      clientIdToDelete: '',
      openPopUp: false,
      addresses: [],
      startDate: '',
      endDate: '',
      commercials: [],
      responsibleAssignments: [],
      assistantAssignments: [],
      responsibleAssignment: {},
      commercial: {},
      type: 'country',
      countries: [],
      country: '',
      clients: [],
      notifMessage: '',
      client: '',
      columns: [
        {
          // eslint-disable-next-line no-useless-concat
          title: 'Name' + '*',
          field: 'name',
          /* cellStyle: { width: 100, maxWidth: 100 },
          headerStyle: { width: 130, maxWidth: 130 } */
        },
        {
          // eslint-disable-next-line no-useless-concat
          title: 'sector1',
          field: 'sector1',
          /* cellStyle: { width: 100, maxWidth: 100 },
          headerStyle: { width: 130, maxWidth: 130 } */
        },
        {
          // eslint-disable-next-line no-useless-concat
          title: 'sector2',
          field: 'sector2'
          /* cellStyle: { width: 155, maxWidth: 155 },
          headerStyle: { width: 180, maxWidth: 180 } */
        },
        {
          title: 'sector3',
          field: 'sector3',
          /* cellStyle: { width: 155, maxWidth: 155 },
          headerStyle: { width: 100, maxWidth: 180 } */
        },
        {
          title: 'Responsible Commercial',
          field: 'responsibleCommercial',
          options: {
            filter: true,
          }
        },
        {
          title: 'Assistant Commercial',
          field: 'assistantCommercial',
          options: {
            filter: true,
          }
        }
      ]
    };
  }


  componentDidMount() {
    if (history.location.state) {
      this.setState({ type: history.location.state.type });
    }

    /// carga en esta variable los datos de configuración ////
    axios.get(`${API}/documentManagerConfig/all`).then(res => {
      documentManagerConfig = res.data.payload;
    });

    this.getCommercials();
    CountryService.getCountries().then(({ data }) => {
      const countries = [];
      data.forEach(country => countries.push(country.countryName));
      this.setState({ countries });
    });

    const { getAllStaff } = this.props;
    getAllStaff();
  }

  getClientAddresses = () => {
    const { client } = this.props;
    AddressService.getClientAddresses(client.clientId).then(({ data }) => {
      this.setState({ addresses: data || [] });
    });
  };

  closeNotif = () => {
    this.setState({
      notifMessage: ''
    });
  };

  handleClient = (ev, value) => {
    this.setState({ client: value });
  };

  handleStaff = (ev, value) => {
    console.log(value);
    this.setState({ staff: value });
  };

  openNotif = message => {
    this.setState({
      notifMessage: message
    });
  };

  handleClients = () => {
    const { country } = this.state;
    const { getAllClientByCountry } = this.props;
    ClientService.getClientsByCountry(country).then((res) => {
      console.log(res);
      if (res.data.length > 0) {
        const clients = [];
        res.data.forEach(client => clients.push(client.code + '~' + client.name));
        this.setState({ clients, type: 'clients' });
      } else {
        this.openNotif('No Clients in this country');
      }
    });
    getAllClientByCountry(country);
  };

  getClientAssignment = () => {
    const { client } = this.props;
    AssignmentService.getClientAssignment(client.clientId).then(({ data }) => {
      const assignments = data;
      const responsibleAssignments = [];
      const assistantAssignments = [];
      assignments.forEach((assignment) => {
        if (assignment.type === 'Responsible Commercial') {
          responsibleAssignments.push(assignment);
        } else {
          assistantAssignments.push(assignment);
        }
      });
      this.setState({ responsibleAssignments, assistantAssignments });
    });
  };

  getCommercials = () => {
    CommercialService.getCommercials().then(({ data }) => {
      console.log('getCommercialsgetCommercialsgetCommercialsgetCommercialsgetCommercials', data);
      this.setState({ commercials: data });
    });
  };

  /* ************************************ */
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  }

  handleOnFileLoad = (data) => {
    const {
      // eslint-disable-next-line no-shadow
      importClientCommercial, getAllClientByCountry
    } = this.props;
    const {
      country
    } = this.state;
    // country
    const newData = [];
    data.forEach(
      (val) => {
        console.log(val.data[0]);
        if (val.data[0] !== '') {
          newData.push(Object.assign(
            { name: val.data[0] },
            { phone: val.data[1] },
            { postCode: val.data[2] },
            { addressName: val.data[3] },
            { city: val.data[4] },
            { isActive: val.data[5] },
            { multinational: val.data[6] },
            { type: val.data[7] },
            { email: val.data[8] },
            { webSite: val.data[9] },
            { sector1: val.data[10] },
            { sector2: val.data[11] },
            { sector3: val.data[12] },
            { assistantCommercial: val.data[13] },
            { startDateResponsibleCommercial: new Date(val.data[14]) },
            { endDateResponsibleCommercial: new Date(val.data[15]) },
            { responsibleCommercial: val.data[16] },
            { startDateAssistantCommercial: new Date(val.data[17]) },
            { endDateAssistantCommercial: new Date(val.data[18]) },
          ));
        }
      }
    );
    console.log(newData);
    const promise = new Promise((resolve) => {
      importClientCommercial(newData.slice(1));
      this.editingPromiseResolveImport = resolve;
    });
    promise.then((result) => {
      console.log(result);
      if (result.message === 'staff not exist in our data base !') {
        notification('danger', result);
      }
      if (result.message === 'staff is not assigned to a commercial level !') {
        notification('danger', result);
      }
      if (result === 'imported') {
        notification('success', result);
        getAllClientByCountry(country);
      }
    });
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  }

  handleOnRemoveFile = (data) => {
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  }

  /** ************************************** */
  handleCountry = (ev, value) => {
    this.setState({ country: value });
  };

  handleBack = (type) => {
    this.setState({ type });
  };

  handleClientInfo = () => {
    const { client } = this.state;
    const { addClient } = this.props;
    const code = client.split('~')[0];
    ClientService.getClientsByCode(code).then(res => {
      addClient(res.data);
      this.setState({ type: 'assignment' });
    });
  };

  selectedRowsInTable = (rows) => {
    console.log(rows.length);
    if (rows.length > 0) {
      this.setState({ display: 'none' });
    } else {
      this.setState({ display: 'flex' });
    }
  };

  selectedRows = (rows) => {
    const listClientToUpdate = rows.map((row) => row.clientId);
    const clientNames = rows.map((row) => row.name);
    this.setState({ listClientToUpdate });
    this.setState({ clientNames });
    this.setState({ openPopUp: true });
    this.setState({ display: 'none' });
  };

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };


  assineStaffToClient = () => {
    const {
      typeResponsible, staff, listClientToUpdate, country, clientNames } = this.state;
    const { addAssignment, getAllClientByCountry } = this.props;
    const assignment = {
      typeStaff: typeResponsible,
      staffId: staff.staffId,
      clientIds: listClientToUpdate,
      startDate: new Date(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()),
      endDate: null
    };
    const promise = new Promise((resolve) => {
      // get client information
      addAssignment(assignment);
      this.editingPromiseResolve = resolve;
      this.setState({ openPopUp: false });
    });
    this.setState({ display: 'flex' });
    promise.then((result) => {
      if (isString(result)) {
        //Assign permission over clientName section in DocumentManager
        var nuxeo = new Nuxeo({
          baseURL: documentManagerConfig.nuxeourl,
          auth: {
            method: 'basic',
            username: documentManagerConfig.user,
            password: documentManagerConfig.password
          }
        });
        let errors = 0;
        clientNames.forEach(name => {
          nuxeo.operation('Document.FetchByProperty')
            .params({ "property": "dc:title", "values": name })
            .execute()
            .then(function (docs) {
              docs.entries.forEach(doc => {
                if (doc.type === 'Section') {
                  nuxeo.operation('Document.AddPermission')
                    .enrichers({ document: ['favorites', 'breadcrumb', 'userVisiblePermissions', 'acls', 'publications', 'tags'] })
                    .input(doc.path)
                    .params({
                      permission: "ReadWrite",
                      //users:[], Esto es para cuando hay varios usuarios, este no lo he probado //
                      username: staff.companyEmail,
                      acl: "local",
                      begin: moment()
                    })
                    .execute()
                    .then(function (response) {
                    }).catch(function (error) {
                      errors++;
                    });
                }
              });
            });
        });
        if (errors === 0) {
          notification('success', result);
          this.selectedRowsInTable(0);
          getAllClientByCountry(country);
        }
      } else {
        notification('danger', result);
      }
    });
  };

  deleteAssignement = (event, rowData) => {
    this.setState({ openPopUpDelete: true });
    this.setState({ clientIdToDelete: rowData[0].clientId });
  };

  handleCloseDelete = () => {
    this.setState({ openPopUpDelete: false });
  };

  deleteConfirmeAssignement = () => {
    this.setState({ display: 'flex' });
    const { deleteAssignment, getAllClientByCountry } = this.props;
    const { clientIdToDelete, country } = this.state;
    const promise = new Promise((resolve) => {
      // get client information
      deleteAssignment(clientIdToDelete);
      this.editingPromiseResolve = resolve;
      this.setState({ openPopUpDelete: false });
    });
    promise.then((result) => {
      if (isString(result)) {

        //Delete permission over clientName section

        notification('success', result);
        getAllClientByCountry(country);
      } else {
        notification('danger', result);
      }
    });
  };

  render() {
    const title = brand.name + ' - Assignments';
    const description = brand.desc;
    const {
      classes, allClients, allStaffs, isLoadingAssignment, assignmentResponse, errorsAssignment, clientResponse, isLoading, errors, logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    const {
      addresses,
      responsibleAssignments,
      assistantAssignments,
      commercials,
      openPopUpDelete,
      type, countries, country,
      notifMessage, client, clients,
      columns, openPopUp, typeResponsible, staff, openPopUpImport
    } = this.state;
    let { display } = this.state;
    (!isLoadingAssignment && assignmentResponse) && this.editingPromiseResolve(assignmentResponse);
    (!isLoadingAssignment && !assignmentResponse) && this.editingPromiseResolve(errorsAssignment);
    (!isLoading && clientResponse === 'imported') && this.editingPromiseResolveImport(clientResponse);
    (!isLoading && clientResponse === 'imported') && this.editingPromiseResolveImport(clientResponse);
    /* (!isLoadingAssignment && !assignmentResponse) && this.editingPromiseResolveImport(errorsAssignment); */
    (!isLoading && clientResponse === '') && this.editingPromiseResolveImport(errors);
    let exporte = false; let deleteAction = false; let assign = false;
    if (thelogedUser.userRoles[0].actionsNames.commercial_commercialAssignments_export == false) {
      exporte = true;
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_commercialAssignments_delete == false) {
      deleteAction = true;
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_commercialAssignments_create == false) {
      assign = true;
    }
    if (thelogedUser.userRoles[0].actionsNames.commercial_commercialAssignments_import == false) {
      display = 'none';
    }

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
        <PapperBlock title="Assignment" desc="" icon="ios-more">
          <Slide
            direction="right"
            in={type === 'country'}
            style={{ transitionDelay: type === 'country' ? '500ms' : '0ms' }}
            mountOnEnter
            unmountOnExit
          >
            <Grid container spacing={3} justify="center">
              <Grid item sm={6} lg={6} xs={6} md={6}>
                <Typography variant="subtitle2" component="h2" color="primary" gutterBottom>
                  Please, select the country
                </Typography>
                <Autocomplete
                  id="free-solo-demo"
                  value={country}
                  onChange={(event, value) => this.handleCountry(event, value)}
                  options={countries.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      margin="normal"
                      name="country"
                      variant="outlined"
                    />
                  )}
                />
                <Button color="primary" variant="contained" endIcon={<SearchIcon />} onClick={this.handleClients}>
                  Clients
                </Button>
              </Grid>
            </Grid>
          </Slide>
          <Slide
            direction="right"
            in={type === 'clients'}
            style={{ transitionDelay: type === 'clients' ? '500ms' : '0ms' }}
            mountOnEnter
            unmountOnExit
          >
            <Grid container spacing={3} justify="center">
              <Grid item sm={6} lg={6} xs={6} md={6}>
                <Button color="default" size="small" variant="text" startIcon={<KeyboardBackspaceIcon />} onClick={() => this.handleBack('country')}>
                  Back
                </Button>
                <Typography variant="subtitle2" component="h2" color="primary" gutterBottom align="center">
                  Please, select Client
                </Typography>
                <Autocomplete
                  id="free-solo-demo"
                  value={client}
                  onChange={(event, value) => this.handleClient(event, value)}
                  options={clients.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Client"
                      margin="normal"
                      name="clients"
                      variant="outlined"
                    />
                  )}
                />
                <Button color="primary" variant="contained" endIcon={<AssignmentIcon />} onClick={this.handleClientInfo}>
                  Client
                </Button>
              </Grid>
              <Grid item sm={12} lg={12} xs={12} md={12}>
                <Typography variant="subtitle2" component="h2" color="primary" gutterBottom align="center">
                  check clients to assign responsible or commercial
                </Typography>
                <MaterialTable
                  title=""
                  columns={columns}
                  data={allClients && allClients}
                  options={{
                    exportFileName: 'Commercial Operation List',
                    // filtering: true,
                    // draggable: true,
                    exportButton: false,
                    selection: true,
                    pageSize: 10,
                    // grouping: true,
                    actionsCellStyle: {
                      //  paddingLeft: 30,
                      // width: 120,
                      //   maxWidth: 120,
                    },
                    actionsColumnIndex: -1
                  }}
                  onSelectionChange={(rows) => this.selectedRowsInTable(rows)}
                  actions={[
                    {
                      icon: 'delete',
                      tooltip: 'Delete User',
                      disabled: deleteAction,
                      onClick: (event, rowData) => this.deleteAssignement(event, rowData)
                    },
                    {
                      tooltip: 'Assign',
                      icon: 'assignment_ind',
                      disabled: assign,
                      onClick: (evt, data) => this.selectedRows(data)
                    },
                    {
                      icon: 'save_alt',
                      tooltip: 'Export excel',
                      isFreeAction: true,
                      disabled: exporte,
                      onClick: () => {
                        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                        const fileExtension = '.xlsx';
                        let myprop = allClients;
                        myprop = myprop.filter((props) => {
                          delete props.countryId;
                          delete props.stateId;
                          return true;
                        });
                        myprop.forEach((v) => { delete v.clientId; delete v.tableData; });
                        console.log(myprop);
                        const ws = XLSX.utils.json_to_sheet(myprop);
                        ws.F1 = '';
                        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
                        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                        const data1 = new Blob([excelBuffer], { type: fileType });
                        FileSaver.saveAs(data1, 'Client Assignement' + fileExtension);
                      }
                    }
                  ]}
                  components={{
                    Toolbar: props => (
                      <div>
                        <MTableToolbar {...props} />
                        <div style={{
                          padding: '-50px 50px', marginTop: '-42px', marginLeft: '20px', marginBottom: '20px', width: '50%'
                        }}
                        >
                          <CSVReader
                            ref={buttonRef}
                            onFileLoad={this.handleOnFileLoad}
                            noClick
                            noDrag
                            onRemoveFile={this.handleOnRemoveFile}
                          >
                            {({ file }) => (
                              <aside
                                style={{
                                  display: `${display}`,
                                  flexDirection: 'row',
                                  marginBottom: 10,
                                }}
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                  className={classes.heightImport}
                                  startIcon={<CloudUploadIcon />}
                                  onClick={this.handleOpenDialog}
                                  style={{
                                    marginRight: 10
                                  }}
                                >

                                  Import

                                </Button>
                                <div
                                  style={{
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    borderColor: '#ccc',
                                    height: 36,
                                    lineHeight: 1.5,
                                    marginTop: 1,
                                    marginBottom: 5,
                                    paddingLeft: 13,
                                    paddingTop: 3,
                                    width: '60%'
                                  }}
                                >
                                  {file && file.name}
                                </div>
                                <Button
                                  style={{
                                    borderRadius: 0,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    paddingLeft: 20,
                                    paddingRight: 20
                                  }}
                                  type="button"
                                  className={classes.heightImport}
                                  onClick={this.handleRemoveFile}
                                >
                                  remove
                                </Button>
                                {/*                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                    className={classes.heightImport}
                                    startIcon={<CloudUploadIcon />}
                                    onClick={this.handlesave}
                                    style={{
                                      marginRight: 10
                                    }}
                                >

                                  save

                                </Button> */}
                              </aside>
                            )}
                          </CSVReader>
                        </div>
                      </div>
                    ),
                  }}
                />
                <Dialog
                  open={openPopUpDelete}
                  keepMounted
                  scroll="body"
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                  fullWidth=""
                  maxWidth=""
                >
                  <DialogTitle id="alert-dialog-slide-title"> Delete Assignment </DialogTitle>
                  <DialogContent dividers>
                    Are you sure you want to delete ?
                  </DialogContent>
                  <DialogActions>
                    <Button color="secondary" onClick={this.handleCloseDelete}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.deleteConfirmeAssignement}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={openPopUpImport}
                  keepMounted
                  scroll="body"
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                  fullWidth=""
                  maxWidth=""
                >
                  <DialogTitle id="alert-dialog-slide-title"> Import  </DialogTitle>
                  <DialogContent dividers>
                    hhh
                  </DialogContent>
                  <DialogActions>
                    <Button color="secondary" onClick={this.handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.deleteConfirme}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
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
                  <DialogTitle id="alert-dialog-slide-title"> Assign responsible and assistant</DialogTitle>
                  <DialogContent dividers>
                    <Grid item xs={12} md={12}>
                      <Autocomplete
                        id="free-solo-demo"
                        onChange={(event, value) => this.handleStaff(event, value)}
                        options={allStaffs && allStaffs}
                        getOptionLabel={option => option.fatherFamilyName}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Shoose staff"
                            margin="normal"
                            name="staffs"
                            variant="outlined"
                          />
                        )}
                      />
                      <FormControl fullWidth required>
                        <InputLabel>Type of assignment</InputLabel>
                        <Select
                          name="typeResponsible"
                          value={typeResponsible}
                          onChange={this.handleChange}
                        >
                          <MenuItem key="1" value="Responsible Commercial">
                            Responsible Commercial
                          </MenuItem>
                          <MenuItem key="2" value="Assistant Commercial">
                            Assistant Commercial
                          </MenuItem>
                          <MenuItem key="3" value="Geographical">
                            Geographical Commercial
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button color="secondary" onClick={this.handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.assineStaffToClient}
                    >
                      Update
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Slide>
          <Slide
            direction="right"
            in={type === 'assignment'}
            style={{ transitionDelay: type === 'assignment' ? '500ms' : '0ms' }}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <CommercialAssignmentsMapped back={this.handleBack} />
            </div>
          </Slide>
          <Slide
            direction="right"
            in={type === 'all'}
            style={{ transitionDelay: type === 'all' ? '500ms' : '0ms' }}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <Button color="default" size="small" variant="text" startIcon={<KeyboardBackspaceIcon />} onClick={() => this.handleBack('assignment')}>
                Back
              </Button>
              <ClientBlockMapped back={this.handleBack} />
            </div>
          </Slide>

          {/* <Notification message={notifMessage} close={this.closeNotif} /> */}
        </PapperBlock>
      </div>
    );
  }
}
Commercial.propTypes = {
  classes: PropTypes.object.isRequired,
  // add: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  allClients: state.getIn(['clients']).allClients,
  clientResponse: state.getIn(['clients']).clientResponse,
  isLoading: state.getIn(['clients']).isLoading,
  errors: state.getIn(['clients']).errors,
  // all staff
  allStaffs: state.getIn(['staffs']).allStaff,
  staffResponse: state.getIn(['staffs']).staffResponse,
  isLoadingStaff: state.getIn(['staffs']).isLoading,
  errorsStaff: state.getIn(['staffs']).errors,
  // assignment
  allAssignments: state.getIn(['assignments']).allAssignments,
  assignmentResponse: state.getIn(['assignments']).assignmentResponse,
  isLoadingAssignment: state.getIn(['assignments']).isLoading,
  errorsAssignment: state.getIn(['assignments']).errors,
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addClient,
  updateClient,
  getAllClient,
  getAllClientByCountry,
  getAllStaff,
  addAssignment,
  importClientCommercial,
  deleteAssignment
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Commercial));
