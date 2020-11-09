import 'date-fns';
import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography, withStyles
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { isString } from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Contact from './contact';
import Transition from '../../../components/Transition/transition';
import Converter from '../../../components/CurrencyConverter/Converter';
import history from '../../../utils/history';
import AutoCompleteMultiLine from '../../../components/AutoCompleteMultiline';
import {
  addClientCommercial, deleteClient, getAllClient, updateClient
} from '../../../redux/client/actions';
import { getAllStateByCountry } from '../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../redux/city/actions';
import styles from './operation-jss';
import { getAllCommercialOperationStatus } from '../../../redux/commercialOperationStatus/actions';
import notification from '../../../components/Notification/Notification';
import { addCommercialOperation } from '../../../redux/commercialOperation/actions';
import { getAllCommercialServiceType } from '../../../redux/serviceType/actions';

class AddCommercialOperation extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      client: '',
      statusOperation: '',
      country: '',
      serviceType: '',
      nameOperation: '',
      Description: '',
      descriptionOperation: '',
      plannedDateQ: '',
      commercialFlowQ: '',
      countryName: '',
      // paymentDate: new Date('2014-08-18T21:11:54'),
      paymentDate: new Date(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()),
      documentationDate: new Date(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()),
      contractDate: new Date(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()),
      estimatedTradeVolume: 0,
      estimatedTradeVolumeInEuro: 0,
      devise: '',
      tradeCurruncy: '',
      contractVolume: 0,
      contractCurruncy: '',
      managementContact: '',
      administrativeContact: '',
      legalAreaMainContact: '',
      commercialResponsible: '',
      commercialResponsibleAssistant: '',
      progress: 0,
      open: false,
      contactType: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllClient, getAllCommercialOperationStatus, getAllCommercialServiceType } = this.props;
    getAllClient(); getAllCommercialOperationStatus();
    getAllCommercialServiceType();
  }

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleChangeClient = (ev) => {
    const { allClients } = this.props;
    this.setState({ [ev.target.name]: ev.target.value });
    for (const key in allClients) {
      console.log('allClients[key].countryId ', allClients[key].countryId);
      console.log('ev.target.value ', ev.target.value);
      if (allClients[key].clientId === ev.target.value) {
        this.setState({ countryName: allClients[key].country });
        break;
      }
    }
  };

    handleDocumentationDateChange = documentationDate => {
      this.setState({ documentationDate });
    };

    handlePaymentDateChange = paymentDate => {
      this.setState({ paymentDate });
    };

    handleContactDateChange = contractDate => {
      this.setState({ contractDate });
    };

  handleChangeMultiple = (event, value) => {
    const serviceType = [];
    for (const key in value) {
      serviceType.push(value[key].serviceTypeId);
    }
    console.log(serviceType);
    this.setState({ serviceTypeId: serviceType });
  };

    handleCreate = () => {
      const { addCommercialOperation } = this.props;
      const {
        client,
        nameOperation,
        statusOperation,
        descriptionOperation,
        serviceTypeId,
        plannedDateQ,
        commercialFlowQ,
        paymentDate,
        documentationDate,
        contractDate,
        amount,
        estimatedTradeVolume,
        devise,
        estimatedTradeVolumeInEuro

      } = this.state;
      const operation = {
        clientId: client,
        name: nameOperation,
        stateId: statusOperation,
        description: descriptionOperation,
        serviceTypeId,
        plannedDateQ,
        commercialFlowQ,
        paymentDate,
        documentationDate,
        contractDate,
        amount,
        estimatedTradeVolume,
        devise,
        estimatedTradeVolumeInEuro
      };
      console.log(operation);
      /** */
      const promise = new Promise((resolve) => {
        addCommercialOperation(operation);
        this.editingPromiseResolve = resolve;
      });
      promise.then((result) => {
        if (isString(result)) {
          notification('success', result);
          getAllClient();
        } else {
          notification('danger', result);
        }
      });
      // history.push('/app/gestion-commercial/Commercial-Operations');
    }

  handleGoBack = () => {
    history.push('/app/gestion-commercial/Commercial-Operations');
  }

  handleOpen = (type) => {
    this.setState({ contactType: type, open: true });
  }

  handleCloseContact = () => {
    this.setState({ open: false });
  }

  myCallback = (estimatedTradeVolume, devise, estimatedTradeVolumeInEuro) => {
    this.setState({ estimatedTradeVolume });
    this.setState({ devise });
    this.setState({ estimatedTradeVolumeInEuro });
    console.log(estimatedTradeVolume);
    console.log(devise);
    console.log(estimatedTradeVolumeInEuro);
  }

  render() {
    const contracts = [
      {
        value: '1',
        label: 'Q1-2020',
      },
      {
        value: '2',
        label: 'Q2-2020',
      },
      {
        value: '3',
        label: 'Q3-2020',
      },
      {
        value: '4',
        label: 'Q4-2020',
      },
      {
        value: '5',
        label: 'Q1-2021',
      },
      {
        value: '6',
        label: 'Q2-2021',
      },
      {
        value: '7',
        label: 'Q3-2021',
      },
      {
        value: '8',
        label: 'Q4-2021',
      },
    ];
    const contacts = [
      {
        value: '1',
        label: ' Mr. Antonio Chaves',
      },
      {
        value: '2',
        label: 'M. Flora Ricio',
      },
      {
        value: '3',
        label: 'Mr. Aymen Souiat',
      }];
    const {
      client, statusOperation, countryName, serviceType,
      nameOperation, descriptionOperation, plannedDateQ,
      commercialFlowQ, documentationDate, paymentDate,
      contractDate, estimatedTradeVolume, contractVolume,
      managementContact, administrativeContact, legalAreaMainContact,
      commercialResponsible, commercialResponsibleAssistant,
      open
    } = this.state;
    const title = brand.name + ' - Blank Page';
    const description = brand.desc;
    const {
      // eslint-disable-next-line no-shadow
      classes, allClients, allCommercialOperationStatuss, errorsCommercialOperation, isLoadingCommercialOperation, commercialOperationResponse, allCommercialServiceType
    } = this.props;
    (!isLoadingCommercialOperation && commercialOperationResponse) && this.editingPromiseResolve(commercialOperationResponse);
    (!isLoadingCommercialOperation && !commercialOperationResponse) && this.editingPromiseResolve(errorsCommercialOperation);
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
        <PapperBlock title="Commercial Operation" desc="Create new commercial operation process" icon="ios-add-circle-outline">
          <Grid container spacing={1}>
            <Grid item xs={11} />
            <Grid item xs={1}>
              <IconButton onClick={() => this.handleGoBack()}>
                <KeyboardBackspaceIcon color="secondary" />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="subtitle2" component="h2" color="primary">
              Location Of The Commercial Operation
          </Typography>
          <br />
          <div>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="space-around"
            >
              <Grid item xs={12} md={4} sm={4} style={{ display: 'flex', justifyContent: 'space-between' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '10%' }} component="h2" color="primary">
                    Client
                </Typography>
                <FormControl fullWidth required style={{ width: '90%' }}>
                  <InputLabel>Select the client</InputLabel>
                  <Select
                    name="client"
                    value={client}
                    onChange={this.handleChangeClient}
                  >
                    {
                      allClients.map((clt) => (
                        <MenuItem key={clt.clientId} value={clt.clientId}>
                          {clt.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5} sm={5} style={{ display: 'flex', justifyContent: 'space-between' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '15%' }} component="h2" color="primary">
                    Operation
                </Typography>
                <TextField
                  style={{ width: '85%' }}
                  id="nameOperation"
                  label="Operation Name"
                  name="nameOperation"
                  value={nameOperation}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={3} sm={3} style={{ display: 'flex', justifyContent: 'space-between' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '15%' }} component="h2" color="primary">
                    Status
                </Typography>
                <FormControl fullWidth required style={{ width: '90%' }}>
                  <InputLabel>Select the client</InputLabel>
                  <Select
                    name="statusOperation"
                    value={statusOperation}
                    onChange={this.handleChange}
                  >
                    {
                      allCommercialOperationStatuss.map((clt) => (
                        <MenuItem key={clt.commercialOperationStatusId} value={clt.commercialOperationStatusId}>
                          {clt.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} sm={12} style={{ display: 'flex', justifyContent: 'space-between' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '15%' }} component="h2" color="primary">
                    Commercial Activity Type
                </Typography>
                <div style={{ width: '85%' }}>
                  <Autocomplete
                    multiple
                    fullWidth
                    className="auto-complete-multiline"
                    options={allCommercialServiceType}
                    getOptionLabel={(option) => option.name}
                    onChange={this.handleChangeMultiple}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Service Type" />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6} sm={6} style={{ display: 'flex', justifyContent: 'space-between' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '15%' }} component="h2" color="primary">
                    Country
                </Typography>
                <TextField
                  style={{ width: '85%' }}
                  id="country"
                  label="Country Name"
                  name="countryName"
                  value={countryName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6} sm={6} style={{ display: 'flex', justifyContent: 'space-between' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '15%' }} component="h2" color="primary">
                    Description
                </Typography>
                <TextField
                  style={{ width: '85%' }}
                  id="descriptionOperation"
                  label="Description"
                  name="descriptionOperation"
                  value={descriptionOperation}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
              Dates Of Operation Interest
          </Typography>
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid item xs={12} md={6} sm={6} style={{ display: 'flex', justifyContent: 'space-between' }} alignContent="center" alignItems="center">
              <Typography variant="subtitle2" style={{ width: '20%' }} component="h2" color="primary">
                  Q Planned Date
              </Typography>
              <FormControl fullWidth required style={{ width: '80%' }}>
                <InputLabel>Select Q Planned Date </InputLabel>
                <Select
                  name="plannedDateQ"
                  value={plannedDateQ}
                  onChange={this.handleChange}
                >
                  {
                    contracts.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sm={6} style={{ display: 'flex', justifyContent: 'space-between' }} alignContent="center" alignItems="center">
              <Typography variant="subtitle2" style={{ width: '20%' }} component="h2" color="primary">
                  Q Commercial Flow
              </Typography>
              <FormControl style={{ width: '80%' }} fullWidth required>
                <InputLabel>Select Q commercial follow</InputLabel>
                <Select
                  name="commercialFlowQ"
                  value={commercialFlowQ}
                  onChange={this.handleChange}
                >
                  {
                    contracts.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Documentation Date *"
                    value={documentationDate}
                    name="documentationDate"
                    onChange={this.handleDocumentationDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="contract Date*"
                    value={contractDate}
                    onChange={this.handleContactDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="P.O Date *"
                    value={paymentDate}
                    onChange={this.handlePaymentDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
              Economic Value Of The Operation
          </Typography>
          <br />
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid>
              <Converter Title="Estimated Trade Volume " callbackFromParent={this.myCallback} />
            </Grid>
            <Grid>
              <Converter Title="Contract Volume " />
            </Grid>
          </Grid>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
              Suppliers Area
          </Typography>
          <br />
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={4}
              sm={4}
            >
              <Typography variant="subtitle2" component="h2" color="primary">
                  Qualification Process Contacts
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth required>
                  <InputLabel>contact of the the decision - maker</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth required>
                  <InputLabel>contact the technical leader</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth required>
                  <InputLabel>contact of the person close to the decision - maker</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth>
                  <InputLabel>Other Contact 1</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth>
                  <InputLabel>Other Contact 2</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth>
                  <InputLabel>Other Contact 3</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sm={4}
            >
              <Typography variant="subtitle2" component="h2" color="primary">
                  Procurement Department Contacts
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth>
                  <InputLabel>Contact 1</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth>
                  <InputLabel>Contact 2</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth>
                  <InputLabel>Contact 3</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sm={4}
            >
              <Typography variant="subtitle2" component="h2" color="primary">
                  Legal Area Contact
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth>
                  <InputLabel>Contact 1</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton className={classes.btnHover} color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth>
                  <InputLabel>Contact 2</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton className={classes.btnHover} color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl fullWidth>
                  <InputLabel>Contact 3</InputLabel>
                  <Select
                    name="administrativeContact"
                    value={administrativeContact}
                    onChange={this.handleChange}
                  >
                    {
                      contacts.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
          <br />
          <br />
          <div align="center">
            <Button variant="contained" color="primary" type="button" onClick={this.handleCreate}>
                Save Operation
            </Button>
          </div>
        </PapperBlock>
        <React.Fragment>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleCloseContact}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title">New Contact</DialogTitle>
            <DialogContent>
              <Contact />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleCloseContact}>
                  Cancel
              </Button>
              <Button color="primary" onClick={this.handleSubmit}>
                  save
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
    );
  }
}

AddCommercialOperation.propTypes = {
  classes: PropTypes.object.isRequired,
  // add: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  addClientCommercial: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  getAllClient: PropTypes.func.isRequired,
  allClients: PropTypes.array.isRequired,

  getAllCommercialOperationStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  allClients: state.getIn(['clients']).allClients,
  clientResponse: state.getIn(['clients']).clientResponse,
  isLoading: state.getIn(['clients']).isLoading,
  errors: state.getIn(['clients']).errors,

  // state
  allStateCountrys: state.getIn(['stateCountries']).allStateCountrys,
  stateCountryResponse: state.getIn(['stateCountries']).stateCountryResponse,
  isLoadingState: state.getIn(['stateCountries']).isLoading,
  errorsState: state.getIn(['stateCountries']).errors,

  // city
  allCitys: state.getIn(['cities']).allCitys,
  cityResponse: state.getIn(['cities']).cityResponse,
  isLoadingCity: state.getIn(['cities']).isLoading,
  errorsCity: state.getIn(['cities']).errors,

  allCommercialOperationStatuss: state.getIn(['commercialOperationStatus']).allCommercialOperationStatuss,

  // commercialOperation
  allCommercialOperations: state.getIn(['commercialOperation']).allCommercialOperations,
  commercialOperationResponse: state.getIn(['commercialOperation']).commercialOperationResponse,
  isLoadingCommercialOperation: state.getIn(['commercialOperation']).isLoading,
  errorsCommercialOperation: state.getIn(['commercialOperation']).errors,

  // service type
  allCommercialServiceType: state.getIn(['commercialServiceType']).allCommercialServiceType,

});
const mapDispatchToProps = dispatch => bindActionCreators({
  addClientCommercial,
  updateClient,
  deleteClient,
  getAllClient,
  getAllStateByCountry,
  getAllCityByState,
  getAllCommercialOperationStatus,
  addCommercialOperation,
  getAllCommercialServiceType,
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommercialOperation));
