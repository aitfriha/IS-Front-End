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
import FormLabel from '@material-ui/core/FormLabel';
import DeleteIcon from '@material-ui/icons/Delete';
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
import { getAllContact } from '../../../redux/contact/actions';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import EditContact from '../Contact/editContact';
import AddContact from '../Contact/addContact';
const qpcListAdd = [];
const pdcListAdd = [];
const lacListAdd = [];
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
      decisionMakers: [],
      technicalLeaders: [],
      administrativeContactTechnicalLeader: '',
      closeDecisionMakers: [],

      qpcOthercontacts: [1],
      qpcOthercontact: [],
      qpcListAddOtherOperation: [],

      pdcOthercontacts: [1],
      pdcListAddOtherOperation: [],
      pdcOthercontact: [],

      lacOthercontacts: [1],
      lacListAddOtherOperation: [],
      lacOthercontact: [],

      openPopUp: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const {
      getAllClient, getAllCommercialOperationStatus, getAllCommercialServiceType, getAllContact
    } = this.props;
    getAllClient(); getAllCommercialOperationStatus();
    getAllCommercialServiceType();
    getAllClient();
    getAllContact();
  }

  handleOpenDoc3 = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.qpcOthercontacts.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.qpcOthercontacts.push(newElement);
    this.setState({ openDoc: true });
  }

  handleOpenDocpdc = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.pdcOthercontacts.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.pdcOthercontacts.push(newElement);
    this.setState({ openDoc: true });
  }

  handleOpenDoclac = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.lacOthercontacts.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.lacOthercontacts.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeleteConcept = (row) => {
    const { qpcListAddOtherOperation, qpcOthercontacts } = this.state;
    const index = qpcListAddOtherOperation.indexOf(qpcListAddOtherOperation[row - 1]);
    if (index !== -1) {
      qpcListAddOtherOperation.splice(index, 1);
    }
    console.log(qpcListAddOtherOperation);
    this.setState({ qpcListAddOtherOperation: qpcListAdd });
    if (qpcOthercontacts.length > 1) {
      const newDocs = qpcOthercontacts.filter(rows => rows !== row);
      this.setState({
        qpcOthercontacts: newDocs
      });
    }
  }

  handleDeleteConceptpdc = (row) => {
    const { pdcListAddOtherOperation, pdcOthercontacts } = this.state;
    const index = pdcListAddOtherOperation.indexOf(pdcListAddOtherOperation[row - 1]);
    if (index !== -1) {
      pdcListAddOtherOperation.splice(index, 1);
    }
    this.setState({ pdcListAddOtherOperation: pdcListAdd });
    if (pdcOthercontacts.length > 1) {
      const newDocs = pdcOthercontacts.filter(rows => rows !== row);
      this.setState({
        pdcOthercontacts: newDocs
      });
    }
  }

  handleDeleteConceptlac = (row) => {
    const { lacListAddOtherOperation, lacOthercontacts } = this.state;
    const index = lacListAddOtherOperation.indexOf(lacListAddOtherOperation[row - 1]);
    if (index !== -1) {
      lacListAddOtherOperation.splice(index, 1);
    }
    this.setState({ pdcListAddOtherOperation: lacListAdd });
    if (lacOthercontacts.length > 1) {
      const newDocs = lacOthercontacts.filter(rows => rows !== row);
      this.setState({
        lacOthercontacts: newDocs
      });
    }
  }


  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleChangeOtheter= (ev) => {
    qpcListAdd.push(ev.target.value);
    this.setState({ qpcListAddOtherOperation: qpcListAdd });
    console.log(qpcListAdd);
  };


  handleChangeMaker = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleChangeClient = (ev) => {
    const { allClients } = this.props;
    this.setState({ [ev.target.name]: ev.target.value });

    for (const key in allClients) {
      if (allClients[key].clientId === ev.target.value) {
        this.setState({ countryName: allClients[key].country });
        break;
      }
    }

    const { allContacts } = this.props;
    const { decisionMakers } = this.state;
    /** ************************* */
    const decisionMakersVar = [];
    for (const key in allContacts) {
      if (allContacts[key].position === 'maker') {
        decisionMakersVar.push(allContacts[key]);
        this.setState({ decisionMakers: decisionMakersVar });
      }
    }
    /** ************************* */
    const technicalLeadersList = [];
    for (const key in allContacts) {
      if (allContacts[key].position === 'technical leader') {
        technicalLeadersList.push(allContacts[key]);
        this.setState({ technicalLeaders: technicalLeadersList });
      }
    }
    /** ************************* */
    const closeDecisionMakersList = [];
    for (const key in allContacts) {
      if (allContacts[key].position === 'close decision maker') {
        closeDecisionMakersList.push(allContacts[key]);
        this.setState({ closeDecisionMakers: closeDecisionMakersList });
      }
    }
    /** ************************* */
    const spcOtherContactList = [];
    for (const key in allContacts) {
      if (allContacts[key].position === 'qpcOther') {
        spcOtherContactList.push(allContacts[key]);
        this.setState({ qpcOthercontact: spcOtherContactList });
      }
    }
    /** ************************* */
    const pdcOtherContactList = [];
    for (const key in allContacts) {
      if (allContacts[key].position === 'pdcOther') {
        pdcOtherContactList.push(allContacts[key]);
        this.setState({ pdcOthercontact: pdcOtherContactList });
      }
    }
    /** ************************* */
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
    this.setState({ openPopUp: true });
  }

  handleCloseContact = () => {
    this.setState({ openPopUp: false });
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
      open, decisionMakers, technicalLeaders, administrativeContactTechnicalLeader, closeDecisionMakers, closeDecisionMaker, qpcOthercontacts, qpcOthercontact, pdcOthercontacts, pdcOthercontact,
      lacOthercontacts, lacOthercontact, openPopUp
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
                    onChange={this.handleChangeMaker}
                  >
                    {
                      decisionMakers && decisionMakers.map((type) => (
                        <MenuItem key={type.contactId} value={type.contactId}>
                          {type.firstName}
                          {' '}
                          {type.fatherFamilyName}
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
                    name="administrativeContactTechnicalLeader"
                    value={administrativeContactTechnicalLeader}
                    onChange={this.handleChange}
                  >
                    {
                      technicalLeaders && technicalLeaders.map((type) => (
                        <MenuItem key={type.contactId} value={type.contactId}>
                          {type.firstName}
                          {' '}
                          {type.fatherFamilyName}
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
                    name="closeDecisionMaker"
                    value={closeDecisionMaker}
                    onChange={this.handleChange}
                  >
                    {
                      closeDecisionMakers && closeDecisionMakers.map((type) => (
                        <MenuItem key={type.contactId} value={type.contactId}>
                          {type.firstName}
                          {' '}
                          {type.fatherFamilyName}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Administrative Contact')}>
                  <AddIcon />
                </IconButton>
              </div>
              {qpcOthercontacts.map((row) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormControl fullWidth>
                    <InputLabel>Other Contact 1</InputLabel>
                    <Select
                      name="administrativeContact"
                      value={administrativeContact[row]}
                      onChange={this.handleChangeOtheter}
                    >
                      {
                        qpcOthercontact && qpcOthercontact.map((type) => (
                          <MenuItem key={type.contactId} value={type.contactId}>
                            {type.firstName}
                            {' '}
                            {type.fatherFamilyName}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <IconButton size="medium" color="primary" onClick={() => this.handleOpenDoc3()}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => this.handleDeleteConcept(row)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
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
              <div align="center">
                <Button variant="contained" color="primary" type="button" onClick={this.handleOpen}>
                  {/* <CustomToolbar  url="/app/gestion-commercial/Add-Operation" tooltip="add new Operation" /> */}
                  {' '}
Add Contact
                </Button>
              </div>
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
                <DialogTitle id="alert-dialog-slide-title"> Add contact</DialogTitle>
                <DialogContent dividers>
                  <AddContact handleClose={this.handleClose} />
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleCloseContact}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleClose}
                  >
                    Add Contact
                  </Button>
                </DialogActions>
              </Dialog>
              {pdcOthercontacts.map((row) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormControl fullWidth>
                    <InputLabel>Other Contact 1</InputLabel>
                    <Select
                      name="administrativeContact"
                      value={administrativeContact[row]}
                      onChange={this.handleChangeOtheter}
                    >
                      {
                        pdcOthercontact && pdcOthercontact.map((type) => (
                          <MenuItem key={type.contactId} value={type.contactId}>
                            {type.firstName}
                            {' '}
                            {type.fatherFamilyName}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <IconButton size="medium" color="primary" onClick={() => this.handleOpenDocpdc()}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => this.handleDeleteConceptpdc(row)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
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
              {lacOthercontacts.map((row) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormControl fullWidth>
                    <InputLabel>Other Contact 1</InputLabel>
                    <Select
                      name="administrativeContact"
                      value={administrativeContact[row]}
                      onChange={this.handleChangeOtheter}
                    >
                      {
                        lacOthercontact && lacOthercontact.map((type) => (
                          <MenuItem key={type.contactId} value={type.contactId}>
                            {type.firstName}
                            {' '}
                            {type.fatherFamilyName}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <IconButton size="medium" color="primary" onClick={() => this.handleOpenDoclac()}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => this.handleDeleteConceptlac(row)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
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
        {/* <React.Fragment>
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
        </React.Fragment> */}
      </div>
    );
  }
}

AddCommercialOperation.propTypes = {
  classes: PropTypes.object.isRequired,
  // add: PropTypes.func.isRequired,
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
  // contacts
  allContacts: state.getIn(['contacts']).allContacts,
  contactResponse: state.getIn(['contacts']).contactResponse,
  isLoadingContact: state.getIn(['contacts']).isLoading,
  errorsContact: state.getIn(['contacts']).errors,
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
  getAllContact,
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommercialOperation));
