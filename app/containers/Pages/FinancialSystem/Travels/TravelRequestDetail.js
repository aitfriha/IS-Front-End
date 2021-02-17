import React from 'react';
import {
  Grid,
  Chip,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  IconButton,
  Button,
  Box,
  FormHelperText,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import MaterialTable from 'material-table';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import { isString } from 'lodash';
import notification from '../../../../components/Notification/Notification';


let self = null;

const styles = {};

export class TravelRequestDetail extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      columns: [
        {
          title: 'Journey Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'journeyOrder',
          minWidth: 150,
          searchable: true,
          render: rowData => `Journey No. ${rowData.journeyOrder}`
        },
        {
          title: 'Customer Code', // intl.formatMessage({ id: 'connection.id' }),
          field: 'customerCode',
          minWidth: 130,
          searchable: true
        },
        {
          title: 'Customer Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'customerName',
          minWidth: 150,
          searchable: true
        },
        {
          title: 'Operation Code', // intl.formatMessage({ id: 'connection.id' }),
          field: 'operationCode',
          minWidth: 130,
          searchable: true
        },
        {
          title: 'Operation Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'operationName',
          minWidth: 150,
          searchable: true
        }
      ],
      transportTypes: [],
      lodgingTypes: [],
      customerList: [],
      journey: '',
      customer: '',
      operation: '',
      journeys: []
    };
  }

  componentDidMount() {
    const { businessExpensesTypes, customerContracts, obj } = this.props;
    let transportList = [];
    let lodgingList = [];
    const customerList = [];
    // Load business expenses subtypes
    businessExpensesTypes.forEach(type => {
      if (type.masterValue === 'TRANSPORT') {
        transportList = type.subtypes;
      }
      if (type.masterValue === 'LODGING') {
        lodgingList = type.subtypes;
      }
    });

    // Load customer contracts
    customerContracts.forEach(contract => {
      const index = customerList.findIndex(obj => obj.id === contract.customerId);
      if (index === -1) {
        const customer = {
          id: contract.customerId,
          code: contract.customerCode,
          name: contract.customerName,
          operations: [{
            id: contract.operationId,
            code: contract.operationCode,
            name: contract.operationName,
          }]
        };
        customerList.push(customer);
      } else {
        const customer = customerList[index];
        customer.operations.push({
          id: contract.operationId,
          code: contract.operationCode,
          name: contract.operationName,
        });
      }
    });
    this.setState({
      journey: '',
      customer: '',
      operation: '',
      journeys: obj.hasOwnProperty('journeys') ? obj.journeys : [],
      transportTypes: transportList,
      lodgingTypes: lodgingList,
      customerList
    });
  }

  componentWillUnmount() {
  }

  loadList(objName, journey, option) {
    const countryId = option === 'from' ? journey.fromCountryId : journey.toCountryId;
    const stateId = option === 'from' ? journey.fromStateId : journey.toStateId;
    const { countries } = this.props;
    let resultList = [];
    const countryIndex = countries.findIndex(obj => obj.id === countryId);
    if (countryIndex > -1) {
      resultList = countries[countryIndex].stateCountryList;
    }
    if (objName === 'state') {
      if (countryIndex > -1) {
        const stateIndex = resultList.findIndex(obj => obj.id === stateId);
        if (stateIndex > -1) {
          resultList = resultList[stateIndex].cities;
        }
      }
    }
    return resultList;
  }

  loadOperations() {
    let resultList = [];
    const index = this.state.customerList.findIndex(obj => obj.id === this.state.customer);
    if (index > -1) {
      resultList = this.state.customerList[index].operations;
    }
    return resultList;
  }

  loadVisits() {
    const journeyList = this.state.journeys;
    const visits = [];
    journeyList.forEach(journey => {
      journey.visits.forEach(visit => {
        visit.journeyOrder = journey.order;
        visits.push(visit);
      });
    });
    return visits;
  }

  getCustomerContractByCustomerAndOperation(customerId, operationId) {
    const { customerContracts } = this.props;
    const index = customerContracts.findIndex(obj => obj.customerId === customerId && obj.operationId === operationId);
    return index > -1 ? customerContracts[index] : null;
  }

  //----------------------------------------------------------------------------------------------

  // HANDLE ACTIONS

  handleAddRow(e) {
    const journeyList = this.state.journeys;
    const newDataRow = {
      order: journeyList.length + 1,
      fromCountryId: 'none',
      fromCountryCode: '',
      fromCountryName: '',
      fromStateId: 'none',
      fromStateName: '',
      fromCityId: 'none',
      fromCityName: '',
      departureDate: null,
      toCountryId: 'none',
      toCountryCode: '',
      toCountryName: '',
      toStateId: 'none',
      toStateName: '',
      toCityId: 'none',
      toCityName: '',
      arrivalDate: null,
      lodgingTypeId: 'none',
      lodgingTypeName: '',
      transportTypeId: 'none',
      transportTypeName: '',
      address: '',
      visits: []
    };
    journeyList.push(newDataRow);
    this.setState({
      journeys: journeyList
    });
    console.log(journeyList);
  }

  handleDeleteRow(e, index) {
    const journeyList = this.state.journeys;
    journeyList.splice(index, 1);
    this.setState({
      journeys: journeyList
    });
  }

  handleChangePlaceSelects(e, index) {
    const { countries } = this.props;
    const { name } = e.target;
    const { value } = e.target;
    const journeyList = this.state.journeys;

    if (name === 'fromCountry' || name === 'toCountry') {
      const oldId = name === 'fromCountry' ? journeyList[index].fromCountryId : journeyList[index].toCountryId;
      const countryIndex = countries.findIndex(obj => obj.countryId === value);
      const countryObject = countryIndex > -1 ? countries[countryIndex] : null;

      name === 'fromCountry' ? journeyList[index].fromCountryId = countryObject ? countryObject.countryId : 'none' : journeyList[index].toCountryId = countryObject ? countryObject.countryId : 'none';
      name === 'fromCountry' ? journeyList[index].fromCountryCode = countryObject ? countryObject.countryCode : '' : journeyList[index].toCountryCode = countryObject ? countryObject.countryCode : '';
      name === 'fromCountry' ? journeyList[index].fromCountryName = countryObject ? countryObject.countryName : '' : journeyList[index].toCountryName = countryObject ? countryObject.countryName : '';

      if (oldId !== value || value === 'none') {
        name === 'fromCountry' ? journeyList[index].fromStateId = 'none' : journeyList[index].toStateId = 'none';
        name === 'fromCountry' ? journeyList[index].fromStateName = '' : journeyList[index].toStateName = '';

        name === 'fromCountry' ? journeyList[index].fromCityId = 'none' : journeyList[index].toCityId = 'none';
        name === 'fromCountry' ? journeyList[index].fromCityName = '' : journeyList[index].toCityName = '';
      }
    } else if (name === 'fromState' || name === 'toState') {
      const oldId = name === 'fromState' ? journeyList[index].fromStateId : journeyList[index].toStateId;
      const countryId = name === 'fromState' ? journeyList[index].fromCountryId : journeyList[index].toCountryId;
      const countryIndex = countries.findIndex(obj => obj.countryId === countryId);
      const countryObject = countryIndex > -1 ? countries[countryIndex] : null;
      if (countryObject !== null) {
        const stateIndex = countryObject.stateCountryList.findIndex(obj => obj.stateCountryId === value);
        const stateObject = stateIndex > -1 ? countryObject.stateCountryList[stateIndex] : null;

        name === 'fromState' ? journeyList[index].fromStateId = stateObject ? stateObject.stateCountryId : 'none' : journeyList[index].toStateId = stateObject ? stateObject.stateCountryId : 'none';
        name === 'fromState' ? journeyList[index].fromStateName = stateObject ? stateObject.stateName : '' : journeyList[index].toStateName = stateObject ? stateObject.stateName : '';
      }

      if (oldId !== value || value === 'none') {
        name === 'fromState' ? journeyList[index].fromCityId = 'none' : journeyList[index].toCityId = 'none';
        name === 'fromState' ? journeyList[index].fromCityName = '' : journeyList[index].toCityName = '';
      }
    } else if (name === 'fromCity' || name === 'toCity') {
      const countryId = name === 'fromCity' ? journeyList[index].fromCountryId : journeyList[index].toCountryId;
      const countryIndex = countries.findIndex(obj => obj.countryId === countryId);
      const countryObject = countryIndex > -1 ? countries[countryIndex] : null;
      if (countryObject !== null) {
        const stateId = name === 'fromCity' ? journeyList[index].fromStateId : journeyList[index].toStateId;
        const stateIndex = countryObject.stateCountryList.findIndex(obj => obj.stateCountryId === stateId);
        const stateObject = stateIndex > -1 ? countryObject.stateCountryList[stateIndex] : null;
        if (stateObject !== null) {
          const cityIndex = stateObject.cities.findIndex(obj => obj.id === value);
          const cityObject = cityIndex > -1 ? stateObject.cities[cityIndex] : null;
          name === 'fromCity' ? journeyList[index].fromCityId = cityObject ? cityObject.cityId : 'none' : journeyList[index].toCityId = cityObject ? cityObject.cityId : 'none';
          name === 'fromCity' ? journeyList[index].fromCityName = cityObject ? cityObject.cityName : '' : journeyList[index].toCityName = cityObject ? cityObject.cityName : '';
        }
      }
    }
    this.setState({
      journeys: journeyList
    });
  }


  handleChangeVisitFields(e) {
    const { name } = e.target;
    const { value } = e.target;
    if (this.state[name].value !== value || value === 'none') {
      switch (name) {
        case 'journey': {
          this.setState({
            [name]: value,
            customer: 'none',
            operation: 'none'
          });
          break;
        }
        case 'customer': {
          this.setState({
            [name]: value,
            operation: 'none'
          });
          break;
        }
        case 'operation': {
          this.setState({
            [name]: value
          });
          break;
        }
        default: {
          break;
        }
      }
    }
  }


  handleDateChange(value, index, option) {
    const journeyList = self.state.journeys;
    option === 'departure' ? journeyList[index].departureDate = value : journeyList[index].arrivalDate = value;
    self.setState({
      journeys: journeyList
    });
  }

  handleChange(e, index) {
    const { name } = e.target;
    const { value } = e.target;

    const journeyList = self.state.journeys;
    switch (name) {
      case 'transportType': {
        const transportIndex = self.state.transportTypes.findIndex(obj => obj.id === value);
        const transportTypeObject = transportIndex > -1 ? self.state.transportTypes[transportIndex] : null;
        journeyList[index].transportTypeId = value;
        journeyList[index].transportTypeName = transportTypeObject ? transportTypeObject.name : '';
        break;
      }
      case 'lodgingType': {
        const lodgingIndex = self.state.lodgingTypes.findIndex(obj => obj.id === value);
        const lodgingTypeObject = lodgingIndex > -1 ? self.state.lodgingTypes[lodgingIndex] : null;
        journeyList[index].lodgingTypeId = value;
        journeyList[index].lodgingTypeName = lodgingTypeObject ? lodgingTypeObject.name : '';
        break;
      }
      case 'address': {
        journeyList[index].address = value;
        break;
      }
      default: {
        break;
      }
    }
    this.setState({
      journeys: journeyList
    });
  }

  handleAddCustomerAndOperation(e) {
    const journeyList = this.state.journeys;
    const index = journeyList.findIndex(obj => obj.order === this.state.journey);
    const journeyObject = journeyList[index];
    if (journeyObject !== null) {
      const foundIndex = journeyObject.visits.findIndex(obj => obj.operationId === this.state.operation);
      if (foundIndex === -1) {
        const contract = this.getCustomerContractByCustomerAndOperation(this.state.customer, this.state.operation);
        journeyObject.visits.push({
          customerId: contract.customerId,
          customerCode: contract.customerCode,
          customerName: contract.customerName,
          operationId: contract.operationId,
          operationCode: contract.operationCode,
          operationName: contract.operationName
        });
      } else {
        notification('warning', 'The selected customer and operation already exists');
      }
      this.setState({
        journeys: journeyList,
        journey: '',
        customer: '',
        operation: ''
      });
    }
  }

  handleDeleteVisit(e, rowData) {
    const journeyList = this.state.journeys;
    const journeyIndex = journeyList.findIndex(obj => obj.order === rowData.journeyOrder);
    const deleteIndex = journeyList[journeyIndex].visits.findIndex(obj => obj.customerId === rowData.customerId && obj.operationId === rowData.operationId);
    if (deleteIndex > -1) {
      journeyList[journeyIndex].visits.splice(deleteIndex, 1);
    }
    this.setState({
      journeys: journeyList
    });
  }

  validRequestTravel() {
    let emptyVisitsCount = 0;
    let fromCountryCount = 0;
    let fromStateCount = 0;
    let fromCityCount = 0;
    let toCountryCount = 0;
    let toStateCount = 0;
    let toCityCount = 0;
    let departureCount = 0;
    let arrivalCount = 0;
    let transportTypeCount = 0;
    let lodgingTypeCount = 0;
    this.state.journeys.forEach(journey => {
      (journey.fromCountryId === '' || journey.fromCountryId === 'none') ? fromCountryCount++ : fromCountryCount;
      (journey.fromStateId === '' || journey.fromStateId === 'none') ? fromStateCount++ : fromStateCount;
      (journey.fromCityId === '' || journey.fromCityId === 'none') ? fromCityCount++ : fromCityCount;
      (journey.toCountryId === '' || journey.toCountryId === 'none') ? toCountryCount++ : toCountryCount;
      (journey.toStateId === '' || journey.toStateId === 'none') ? toStateCount++ : toStateCount;
      (journey.toCityId === '' || journey.toCityId === 'none') ? toCityCount++ : toCityCount;
      journey.departureDate === null ? departureCount++ : departureCount;
      journey.arrivalDate === null ? arrivalCount++ : arrivalCount;
      (journey.transportTypeId === '' || journey.transportTypeId === 'none') ? transportTypeCount++ : transportTypeCount;
      (journey.lodgingTypeId === '' || journey.lodgingTypeId === 'none') ? lodgingTypeCount++ : lodgingTypeCount;
      journey.visits.length === 0 ? emptyVisitsCount++ : emptyVisitsCount;
    });
    return fromCountryCount === 0 && fromStateCount === 0 && fromCityCount === 0 && toCountryCount === 0 && toStateCount === 0 && toCityCount === 0 && departureCount === 0 && arrivalCount === 0 && transportTypeCount === 0 && lodgingTypeCount === 0 && this.state.journeys.length > 0 && emptyVisitsCount === 0;
  }


  handleSave(e) {
    const {
      obj, handleClose, addTravelRequest, updateTravelRequest, getTravelRequests
    } = this.props;
    const valid = this.validRequestTravel();
    if (valid) {
      // Call to add/update redux function
      const data = {
        id: obj.hasOwnProperty('id') ? obj.id : '',
        code: obj.code,
        requesterId: obj.requesterId,
        requestDate: obj.hasOwnProperty('requestDate') ? obj.requestDate : new Date(),
        journeys: this.state.journeys,
        requestStatusId: obj.hasOwnProperty('requestStatusId') ? obj.requestStatusId : '',
      };
      new Promise((resolve) => {
        if (data.id === '') {
          addTravelRequest(data);
        } else {
          updateTravelRequest(data);
        }
        this.editingPromiseResolve = resolve;
      }).then((result) => {
        if (isString(result)) {
          handleClose(true);
          const params = {
            requesterId: obj.requesterId,
            period: 'month',
            startDate: null,
            endDate: null
          };
          getTravelRequests(params);
          notification('success', result);
        } else {
          notification('danger', result);
        }
      });
    }
  }

  render() {
    const {
      obj, handleClose, countries, isLoading, errors, travelRequestResponse
    } = this.props;
    const { columns, journeys } = this.state;

    (!isLoading && travelRequestResponse) && this.editingPromiseResolve(travelRequestResponse);
    (!isLoading && !travelRequestResponse) && this.editingPromiseResolve(errors);

    return (
      <div>
        <Card>
          <CardContent>
            <div id="employee-info">
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Chip label="Requester information" color="secondary" style={{ marginTop: '10px', marginBottom: '10px' }} />
                  <Grid item>
                    <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                      Personal Number:
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      {obj.requesterPersonalNumber}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                      Name:
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      {obj.requesterName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                      Father Family Name:
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      {obj.requesterFatherFamilyName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                      Mother Family Name:
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      {obj.requesterMotherFamilyName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                      Company Name:
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      {obj.requesterCompany}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  {obj.hasOwnProperty('id')
                    ? (
                      <React.Fragment>
                        <Typography component="span" color="textSecondary" display="block" align="center">
                          Request Code
                        </Typography>
                        <Typography component="span" variant="h4" display="block" align="center">
                          {obj.code}
                        </Typography>
                      </React.Fragment>
                    )
                    : null}
                </Grid>
              </Grid>
            </div>

            <Divider style={{ marginTop: '10px', marginBottom: '15px' }} />

            <div>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={1} md={1} style={{ marginRight: '10px', maxWidth: '50px' }}>
                  <Tooltip title="Add journey">
                    <span>
                      <IconButton onClick={(e) => this.handleAddRow(e)}>
                        <AddBoxIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item xs={5} md={11} style={{ marginTop: '13px' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Journey List
                  </Typography>
                </Grid>
              </Grid>

              {journeys.map((journey, index) => (
                <Grid container key={'parent-grid' + index}>

                  <Grid container direction="row" spacing={2} key={'delete-grid' + index} style={{ marginTop: '2px', marginBottom: '2px' }}>
                    <Grid item xs={6} md={6} key={'chip-grid' + index}>
                      <Box display="flex" justifyContent="flex-start">
                        <Chip label={`No. ${index + 1}`} key={'chip' + index} color="secondary" style={{ marginTop: '8px' }} />
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={6} key={'delete-btn-grid' + index}>
                      <Box display="flex" justifyContent="flex-end">
                        <IconButton key={'delete-icon-button' + index} onClick={(e) => this.handleDeleteRow(e, index)}>
                          <DeleteIcon key={'delete-btn' + index} />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" spacing={2} key={'from-grid' + index}>
                    <Grid item xs={12} md={3} key={'from-country-grid' + index}>
                      <FormControl variant="outlined" key={'from-country-formcontrol' + index} fullWidth size="small">
                        <InputLabel htmlFor={`outlined-from-country-${index}`}>From country</InputLabel>
                        <Select
                          id={`from-country-select- ${index}`}
                          name="fromCountry"
                          value={journey.fromCountryId || 'none'}
                          onChange={(e) => this.handleChangePlaceSelects(e, index)}
                          input={(
                            <OutlinedInput
                              labelWidth={100}
                              name="from-country"
                              id={`outlined-from-country-${index}`}
                            />
                          )}
                          required
                          error={journey.fromCountryId === 'none'}
                        >
                          <MenuItem value="none">
                            <em>Empty</em>
                          </MenuItem>
                          {countries.map(country => <MenuItem key={country.countryId} value={country.countryId}>{country.countryName}</MenuItem>)}
                        </Select>
                        {journey.fromCountryId === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3} key={'from-state-grid' + index}>
                      <FormControl variant="outlined" key={'from-state-formcontrol' + index} fullWidth size="small">
                        <InputLabel htmlFor={`outlined-from-state-${index}`}>From state</InputLabel>
                        <Select
                          id={`from-state-select- ${index}`}
                          name="fromState"
                          value={journey.fromStateId || 'none'}
                          onChange={(e) => this.handleChangePlaceSelects(e, index)}
                          input={(
                            <OutlinedInput
                              labelWidth={80}
                              name="from-state"
                              id={`outlined-from-state-${index}`}
                            />
                          )}
                          required
                          error={journey.fromStateId === 'none'}
                        >
                          <MenuItem value="none">
                            <em>Empty</em>
                          </MenuItem>
                          {journey.fromCountryId !== 'none' ? this.loadList('country', journey, 'from').map(state => <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>) : null}
                        </Select>
                        {journey.fromStateId === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3} key={'from-city-grid' + index}>
                      <FormControl variant="outlined" key={'from-city-formcontrol' + index} fullWidth size="small">
                        <InputLabel htmlFor={`outlined-from-city-${index}`}>From city</InputLabel>
                        <Select
                          id={`from-city-select- ${index}`}
                          name="fromCity"
                          value={journey.fromCityId || 'none'}
                          onChange={(e) => this.handleChangePlaceSelects(e, index)}
                          input={(
                            <OutlinedInput
                              labelWidth={70}
                              name="from-city"
                              id={`outlined-from-city-${index}`}
                            />
                          )}
                          required
                          error={journey.fromCityId === 'none'}
                        >
                          <MenuItem value="none">
                            <em>Empty</em>
                          </MenuItem>
                          {journey.fromStateId !== 'none' ? this.loadList('state', journey, 'from').map(city => <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>) : null}
                        </Select>
                        {journey.fromCityId === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3} key={'departure-date-grid' + index}>
                      <FormControl key={'departure-date-formcontrol' + index} fullWidth>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDateTimePicker
                            id={`departure-datetimepicker-${index}`}
                            inputVariant="outlined"
                            name="departureDate"
                            size="small"
                            fullWidth
                            ampm
                            label="Departure date"
                            value={journey.departureDate || null}
                            onChange={(e) => this.handleDateChange(e, index, 'departure')}
                            showTodayButton
                            disablePast
                            format="yyyy/MM/dd hh:mm a"
                            disabled={journeys.length > 1 && index > 0 ? journeys[index - 1].arrivalDate === null : false}
                            error={journey.departureDate === null}
                          />
                        </MuiPickersUtilsProvider>
                        {journey.departureDate === null ? <FormHelperText error>This field is required</FormHelperText> : null}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" spacing={2} key={'to-grid' + index} style={{ marginTop: '5px' }}>
                    <Grid item xs={12} md={3} key={'to-country-grid' + index}>
                      <FormControl variant="outlined" key={'to-country-formcontrol' + index} fullWidth size="small">
                        <InputLabel htmlFor={`outlined-to-country-${index}`}>To country</InputLabel>
                        <Select
                          id={`to-country-select-${index}`}
                          name="toCountry"
                          value={journey.toCountryId || 'none'}
                          onChange={(e) => this.handleChangePlaceSelects(e, index)}
                          input={(
                            <OutlinedInput
                              labelWidth={80}
                              name="toCountry"
                              id={`outlined-to-country-${index}`}
                            />
                          )}
                          required
                          error={journey.toCountryId === 'none'}
                        >
                          <MenuItem value="none">
                            <em>Empty</em>
                          </MenuItem>
                          {countries.map(country => <MenuItem key={country.countryId} value={country.countryId}>{country.countryName}</MenuItem>)}
                        </Select>
                        {journey.toCountryId === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3} key={'to-state-grid' + index}>
                      <FormControl variant="outlined" key={'to-state-formcontrol' + index} fullWidth size="small">
                        <InputLabel htmlFor={`outlined-to-state-${index}`}>To state</InputLabel>
                        <Select
                          id={`to-state-select-${index}`}
                          name="toState"
                          value={journey.toStateId || 'none'}
                          onChange={(e) => this.handleChangePlaceSelects(e, index)}
                          input={(
                            <OutlinedInput
                              labelWidth={60}
                              name="to-state"
                              id={`outlined-to-state-${index}`}
                            />
                          )}
                          required
                          error={journey.toStateId === 'none'}
                        >
                          <MenuItem value="none">
                            <em>Empty</em>
                          </MenuItem>
                          {journey.toCountryId !== 'none' ? this.loadList('country', journey, 'to').map(state => <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>) : null}
                        </Select>
                        {journey.toStateId === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3} key={'to-city-grid' + index}>
                      <FormControl variant="outlined" key={'to-city-formcontrol' + index} fullWidth size="small">
                        <InputLabel htmlFor={`outlined-to-city-${index}`}>To city</InputLabel>
                        <Select
                          id={`to-city-select-${index}`}
                          name="toCity"
                          value={journey.toCityId || 'none'}
                          onChange={(e) => this.handleChangePlaceSelects(e, index)}
                          input={(
                            <OutlinedInput
                              labelWidth={50}
                              name="to-city"
                              id={`outlined-to-city-${index}`}
                            />
                          )}
                          required
                          error={journey.toCityId === 'none'}
                        >
                          <MenuItem value="none">
                            <em>Empty</em>
                          </MenuItem>
                          {journey.toStateId !== 'none' ? this.loadList('state', journey, 'to').map(city => <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>) : null}
                        </Select>
                        {journey.toCityId === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3} key={'arrival-date-grid' + index}>
                      <FormControl key={'arrival-date-formcontrol' + index} fullWidth>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDateTimePicker
                            id={`arrival-datetimepicker-${index}`}
                            inputVariant="outlined"
                            name="arrivalDate"
                            size="small"
                            fullWidth
                            ampm
                            minDate={journey.departureDate ? journey.departureDate : new Date()}
                            label="Arrival date"
                            value={journey.arrivalDate || null}
                            onChange={(e) => this.handleDateChange(e, index, 'arrival')}
                            showTodayButton
                            disablePast
                            disabled={journey.departureDate === null}
                            format="yyyy/MM/dd hh:mm a"
                            error={journey.arrivalDate === null}
                          />
                        </MuiPickersUtilsProvider>
                        {journey.arrivalDate === null ? <FormHelperText error>This field is required</FormHelperText> : null}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" spacing={2} key={'other-info-grid' + index} style={{ marginTop: '5px' }}>
                    <Grid item xs={12} md={3} key={'transport-grid' + index}>
                      <FormControl variant="outlined" key={'transport-formcontrol' + index} fullWidth size="small">
                        <InputLabel htmlFor={`outlined-transport-${index}`}>Transport type</InputLabel>
                        <Select
                          id={`transport-select-${index}`}
                          name="transportType"
                          value={journey.transportTypeId || 'none'}
                          onChange={(e) => this.handleChange(e, index)}
                          input={(
                            <OutlinedInput
                              labelWidth={110}
                              name="transport-input"
                              id={`outlined-transport-${index}`}
                            />
                          )}
                          required
                          error={journey.transportTypeId === 'none'}
                        >
                          <MenuItem value="none">
                            <em>Empty</em>
                          </MenuItem>
                          {this.state.transportTypes.map(transportType => <MenuItem key={transportType.id} value={transportType.id}>{transportType.name}</MenuItem>)}
                        </Select>
                        {journey.transportTypeId === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3} key={'lodging-grid' + index}>
                      <FormControl variant="outlined" key={'lodging-formcontrol' + index} fullWidth size="small">
                        <InputLabel htmlFor={`outlined-lodging-${index}`}>Lodging type</InputLabel>
                        <Select
                          id={`lodging-select-${index}`}
                          name="lodgingType"
                          value={journey.lodgingTypeId || 'none'}
                          onChange={(e) => this.handleChange(e, index)}
                          input={(
                            <OutlinedInput
                              labelWidth={100}
                              name="lodging-input"
                              id={`outlined-lodging-${index}`}
                            />
                          )}
                          required
                          error={journey.lodgingTypeId === 'none'}
                        >
                          <MenuItem value="none">
                            <em>Empty</em>
                          </MenuItem>
                          {this.state.lodgingTypes.map(lodgingType => <MenuItem key={lodgingType.id} value={lodgingType.id}>{lodgingType.name}</MenuItem>)}
                        </Select>
                        {journey.lodgingTypeId === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} key={'address-grid' + index}>
                      <FormControl fullWidth key={'address-formcontrol' + index}>
                        <TextField
                          id={`outlined-multiline-flexible-${index}`}
                          label="Nearest address to the customer"
                          name="address"
                          multiline
                          rowsMax={4}
                          value={journey.address}
                          onChange={(e) => this.handleChange(e, index)}
                          size="small"
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                </Grid>
              ))}

              {journeys.length > 0
                ? (
                  <div style={{ marginTop: '20px', marginBottom: '5px' }}>
                    <Typography component="span" variant="subtitle2" gutterBottom>
                      Customers and operations to visit
                    </Typography>
                    <Grid container spacing={2} style={{ marginBottom: '5px' }}>
                      <Grid item xs={12} md={3}>
                        <FormControl variant="outlined" style={{ marginTop: '8px' }} fullWidth size="small">
                          <InputLabel htmlFor="outlined-journey">Journey name</InputLabel>
                          <Select
                            id="journey-select"
                            name="journey"
                            value={this.state.journey || 'none'}
                            onChange={(e) => this.handleChangeVisitFields(e)}
                            input={(
                              <OutlinedInput
                                labelWidth={100}
                                name="journey-input"
                                id="outlined-journey"
                              />
                            )}
                          >
                            <MenuItem value="none">
                              <em>Empty</em>
                            </MenuItem>
                            {this.state.journeys.map(journey => <MenuItem key={journey.id} value={journey.order}>{`Journey No. ${journey.order}`}</MenuItem>)}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl variant="outlined" style={{ marginTop: '8px' }} fullWidth size="small">
                          <InputLabel htmlFor="outlined-customer">Customer</InputLabel>
                          <Select
                            id="customer-select"
                            name="customer"
                            value={this.state.customer || 'none'}
                            onChange={(e) => this.handleChangeVisitFields(e)}
                            input={(
                              <OutlinedInput
                                labelWidth={80}
                                name="customer-input"
                                id="outlined-customer"
                              />
                            )}
                          >
                            <MenuItem value="none">
                              <em>Empty</em>
                            </MenuItem>
                            {(this.state.journey !== '' && this.state.journey !== 'none') ? this.state.customerList.map(customer => <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>) : null}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <FormControl variant="outlined" style={{ marginTop: '8px' }} fullWidth size="small">
                          <InputLabel htmlFor="outlined-operation">Operation</InputLabel>
                          <Select
                            id="operation-select"
                            name="operation"
                            value={this.state.operation || 'none'}
                            onChange={(e) => this.handleChangeVisitFields(e)}
                            input={(
                              <OutlinedInput
                                labelWidth={80}
                                name="operation-input"
                                id="outlined-operation"
                              />
                            )}
                          >
                            <MenuItem value="none">
                              <em>Empty</em>
                            </MenuItem>
                            {(this.state.customer !== '' && this.state.customer !== 'none') ? this.loadOperations().map(operation => <MenuItem key={operation.id} value={operation.id}>{operation.name}</MenuItem>) : null}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item style={{ marginTop: '5px' }}>
                        <Tooltip title="Add">
                          <span>
                            <IconButton aria-label="Add" disabled={this.state.operation === '' || this.state.operation === 'none'} onClick={(e) => this.handleAddCustomerAndOperation(e)}>
                              <AddBoxIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <MaterialTable
                      title=""
                      columns={columns}
                      data={this.loadVisits()}
                      actions={[
                        rowData => ({
                          icon: () => <DeleteIcon variant="outlined" name="delete" />,
                          tooltip: 'Delete', // intl.formatMessage({ id: 'table.column.actions.edit' }),
                          onClick: (e) => this.handleDeleteVisit(e, rowData)
                        }),
                      ]}
                      options={{
                        actionsColumnIndex: -1,
                        actionsCellStyle: {
                          paddingLeft: 20,
                          minWidth: 80,
                          width: 80,
                          maxWidth: 80
                        }
                      }}
                    />
                  </div>
                )
                : null}

            </div>

          </CardContent>
          <CardActions style={{ marginLeft: '10px' }}>
            <Button variant="contained" size="small" color="default" onClick={(e) => handleClose(false)}>
              Cancel
              {/* {intl.formatMessage({ id: 'connection.row.body.no' })} */}
            </Button>
            <Button
              disabled={!this.validRequestTravel()}
              variant="contained"
              size="small"
              color="primary"
              onClick={(e) => this.handleSave(e)}
            >
              Save Travel Request
              {/* } {intl.formatMessage({ id: 'connection.row.body.yes' })} */}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
