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
import MaterialTable from 'material-table';
import { isString } from 'lodash';
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
  addClientCommercial, deleteClient, getAllClient, updateClient
} from '../../../../redux/client/actions';
// eslint-disable-next-line import/named
import notification from '../../../../components/Notification/Notification';
import { getAllStaff } from '../../../../redux/staff/actions';
import { addAssignment } from '../../../../redux/assignment/actions';


class Commercial extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      staff: '',
      listClientToUpdate: [],
      typeResponsible: '',
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
          title: 'Email',
          field: 'email',
          /* cellStyle: { width: 100, maxWidth: 100 },
          headerStyle: { width: 130, maxWidth: 130 } */
        },
        {
          // eslint-disable-next-line no-useless-concat
          title: 'Phone',
          field: 'phone'
          /* cellStyle: { width: 155, maxWidth: 155 },
          headerStyle: { width: 180, maxWidth: 180 } */
        },
        {
          title: 'Description',
          field: 'description',
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
    this.getCommercials();
    CountryService.getCountries().then(({ data }) => {
      const countries = [];
      data.forEach(country => countries.push(country.countryName));
      this.setState({ countries });
    });

    const { getAllClient, getAllStaff } = this.props;
    getAllClient();
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
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
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

  selectedRows = (rows) => {
    console.log(rows);
    const listClientToUpdate = rows.map((row) => row.clientId);
    this.setState({ listClientToUpdate });
    this.setState({ openPopUp: true });
  };

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  assineStaffToClient = () => {
    const { typeResponsible, staff, listClientToUpdate } = this.state;
    const { addAssignment,getAllClient } = this.props;
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
    promise.then((result) => {
      if (isString(result)) {
        notification('success', result);
        getAllClient();
      } else {
        notification('danger', result);
      }
    });
  };

  render() {
    const title = brand.name + ' - Assignments';
    const description = brand.desc;
    const { classes, allClients, allStaffs, isLoadingAssignment, assignmentResponse, errorsAssignment  } = this.props;
    const {
      addresses,
      responsibleAssignments,
      assistantAssignments,
      commercials,
      type, countries, country,
      notifMessage, client, clients,
      columns, openPopUp, typeResponsible, staff
    } = this.state;
    (!isLoadingAssignment && assignmentResponse) && this.editingPromiseResolve(assignmentResponse);
    (!isLoadingAssignment && !assignmentResponse) && this.editingPromiseResolve(errorsAssignment);
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
                    exportButton: true,
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
                  /* onSelectionChange={(rows) => this.selectedRows(rows)} */
                  actions={[
                    {
                      tooltip: 'Assigne',
                      icon: 'assignment_ind',
                      onClick: (evt, data) => this.selectedRows(data)
                    }
                  ]}
                  editable={{
                    onRowAdd: newData => new Promise((resolve) => {
                      // add measurement unit action
                      addCommercialOperationStatus(newData);
                      this.editingPromiseResolve = resolve;
                    }).then((result) => {
                      if (isString(result)) {
                        // Fetch data
                        getAllCommercialOperationStatus();
                        notification('success', result);
                      } else {
                        notification('danger', result);
                      }
                    }),
                    onRowUpdate: (newData) => new Promise((resolve) => {
                      // update CommercialOperationStatus unit action
                      updateCommercialOperationStatus(newData);
                      this.editingPromiseResolve = resolve;
                    }).then((result) => {
                      if (isString(result)) {
                        // Fetch data
                        getAllCommercialOperationStatus();
                        notification('success', result);
                      } else {
                        notification('danger', result);
                      }
                    }),
                    onRowDelete: oldData => new Promise((resolve) => {
                      // delete CommercialOperationStatus action
                      deleteCommercialOperationStatus(oldData.commercialOperationStatusId);
                      this.editingPromiseResolve = resolve;
                    }).then((result) => {
                      if (isString(result)) {
                        // Fetch data
                        getAllCommercialOperationStatus();
                        notification('success', result);
                      } else {
                        notification('danger', result);
                      }
                    }),
                  }}
                />
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
                        options={allStaffs}
                        getOptionLabel={option => option.firstName}
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
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addClient,
  updateClient,
  getAllClient,
  getAllStaff,
  addAssignment
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Commercial));
