import React from 'react';
import {
  Grid,
  Chip,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
  Fab,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  IconButton,
  Button,
  FormHelperText,
  InputAdornment,
  Box
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardDateTimePicker } from '@material-ui/pickers';
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import CommuteIcon from '@material-ui/icons/Commute';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import HelpIcon from '@material-ui/icons/Help';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { isThisISOWeek } from 'date-fns';
import notification from '../../../../components/Notification/Notification';


let self = null;

const styles = {};

export class ExpenseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      expenseDate: null,
      expenseType: null,
      subtype: 'none',
      voucherType: 'none',
      currencyType: 'none',
      currencyAmount: (0).toFixed(2),
      expenseCountry: 'none',
      expenseState: 'none',
      expenseCity: 'none',
      fromCountry: 'none',
      fromState: 'none',
      fromCity: 'none',
      toCountry: 'none',
      toState: 'none',
      toCity: 'none',
      arrivalDate: null,
      departureDate: null,
      kms: (0).toFixed(1),
      description: '',
      persons: [],
      euroTotalAmount: (0).toFixed(2),
      document: null,
      personType: '',
      documentUpdated: false,
      columns: [
        {
          title: 'Person Type', // intl.formatMessage({ id: 'connection.id' }),
          field: 'personTypeId',
          minWidth: 120,
          width: 120,
          maxWidth: 120,
          searchable: true,
          render: rowData => {
            const index = this.props.personTypes.findIndex(obj => obj.id === rowData.personTypeId);
            return index > -1 ? this.props.personTypes[index].name : '';
          },
          validate: rowData => (this.state.personType !== '' ? this.state.personType !== 'none' : (rowData.personTypeId !== '' && rowData.personTypeId !== 'none' && typeof (rowData.personTypeId) !== 'undefined')),
          editComponent: props => (
            <Select
              id="person-type-select"
              name="personType"
              value={this.state.personType || props.value || 'none'}
              onChange={(e) => this.changePersonValue(e)}
              error={this.state.personType !== '' ? this.state.personType === 'none' : (props.value === '' || props.value === 'none' || typeof (props.value) === 'undefined')}
            >
              <MenuItem value="none">
                <em>Empty</em>
              </MenuItem>
              {this.props.personTypes.map(personType => {
                const eligible = (this.props.obj.type === 'TRANSPORT' || this.props.obj.type === 'KMS') ? personType.masterValue !== 'INDIVIDUAL' : true;
                if (eligible) {
                  return <MenuItem key={personType.id} value={personType.id}>{personType.name}</MenuItem>;
                }
              })}
            </Select>
          )
        },
        {
          title: 'Company Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'companyName',
          minWidth: 150,
          width: 150,
          searchable: true,
          validate: rowData => rowData.companyName !== '' && typeof (rowData.companyName) !== 'undefined'
        },
        {
          title: 'Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'name',
          minWidth: 150,
          width: 150,
          searchable: true,
          validate: rowData => rowData.name !== '' && typeof (rowData.name) !== 'undefined'
        },
        {
          title: 'Father Family Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'fatherFamilyName',
          minWidth: 150,
          width: 150,
          searchable: true,
          validate: rowData => rowData.fatherFamilyName !== '' && typeof (rowData.fatherFamilyName) !== 'undefined'
        },
        {
          title: 'Mother Family Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'motherFamilyName',
          minWidth: 150,
          width: 150,
          searchable: true,
          validate: rowData => rowData.motherFamilyName !== '' && typeof (rowData.motherFamilyName) !== 'undefined'
        }
      ]
    };
  }

  componentDidMount() {
    const { obj, staffExpensesTypes } = this.props;
    console.log(staffExpensesTypes);
    const index = staffExpensesTypes.findIndex(el => el.masterValue === obj.type);
    this.setState({
      expenseDate: obj.hasOwnProperty('expenseDate') ? obj.expenseDate : null,
      expenseType: index > -1 ? staffExpensesTypes[index] : null,
      subtype: obj.hasOwnProperty('expenseSubtypeId') ? obj.expenseSubtypeId : 'none',
      voucherType: obj.hasOwnProperty('voucherTypeId') ? obj.voucherTypeId : 'none',
      currencyType: obj.hasOwnProperty('localCurrencyTypeId') ? obj.localCurrencyTypeId : 'none',
      currencyAmount: obj.hasOwnProperty('localCurrencyAmount') ? obj.localCurrencyAmount : (0).toFixed(2),
      expenseCountry: obj.hasOwnProperty('expenseCountryId') ? obj.expenseCountryId : 'none',
      expenseState: obj.hasOwnProperty('expenseStateId') ? obj.expenseStateId : 'none',
      expenseCity: obj.hasOwnProperty('expenseCityId') ? obj.expenseCityId : 'none',
      fromCountry: obj.hasOwnProperty('fromCountryId') ? obj.fromCountryId : 'none',
      fromState: obj.hasOwnProperty('fromStateId') ? obj.fromStateId : 'none',
      fromCity: obj.hasOwnProperty('fromCityId') ? obj.fromCityId : 'none',
      toCountry: obj.hasOwnProperty('toCountryId') ? obj.toCountryId : 'none',
      toState: obj.hasOwnProperty('toStateId') ? obj.toStateId : 'none',
      toCity: obj.hasOwnProperty('toCityId') ? obj.toCityId : 'none',
      arrivalDate: obj.hasOwnProperty('arrivalDate') ? obj.arrivalDate : null,
      departureDate: obj.hasOwnProperty('departureDate') ? obj.departureDate : null,
      kms: obj.hasOwnProperty('kms') ? obj.kms : (0).toFixed(2),
      description: obj.hasOwnProperty('description') ? obj.description : '',
      persons: obj.hasOwnProperty('persons') ? obj.persons : [],
      document: obj.hasOwnProperty('document') ? obj.document : null,
      documentUpdated: false
    });
  }

  componentWillUnmount() {
    this.setState({
      expenseType: null,
      expenseDate: null,
      subtype: 'none',
      voucherType: 'none',
      currencyType: 'none',
      currencyAmount: (0).toFixed(2),
      expenseCountry: 'none',
      expenseState: 'none',
      expenseCity: 'none',
      fromCountry: 'none',
      fromState: 'none',
      fromCity: 'none',
      toCountry: 'none',
      toState: 'none',
      toCity: 'none',
      arrivalDate: null,
      departureDate: null,
      kms: (0).toFixed(1),
      description: '',
      persons: [],
      euroTotalAmount: (0).toFixed(2),
      document: null,
      personType: 'none',
      documentUpdated: false,
    });
  }


  //----------------------------------------------------------------------------------------------

  // HANDLE ACTIONS
  handleChange(e) {
    const { obj } = this.props;
    const { name } = e.target;
    const { value } = e.target;
    this.setState({
      [name]: value
    });

    if (name === 'voucherType') {
      const oldId = obj.voucherTypeId;
      if (oldId !== value || value === 'none') {
        this.setState({
          document: null
        });
      }
    }

    if (name === 'expenseCountry' || name === 'expenseState') {
      if (name === 'expenseCountry') {
        const oldId = obj.expenseCountryId;
        if (oldId !== value || value === 'none') {
          this.setState({
            expenseState: 'none',
            expenseCity: 'none'
          });
        }
      }
      if (name === 'expenseState') {
        const oldId = obj.expenseStateId;
        if (oldId !== value || value === 'none') {
          this.setState({
            expenseCity: 'none'
          });
        }
      }
    } else if (name === 'fromCountry' || name === 'toCountry') {
      const oldId = name === 'fromCountry' ? obj.fromCountryId : obj.toCountryId;
      if (oldId !== value || value === 'none') {
        name === 'fromCountry'
          ? this.setState({
            fromState: 'none',
            fromCity: 'none'
          })
          : this.setState({
            toState: 'none',
            toCity: 'none'
          });
      }
    } else if (name === 'fromState' || name === 'toState') {
      const oldId = name === 'fromState' ? obj.fromStateId : obj.toStateId;
      if (oldId !== value || value === 'none') {
        name === 'fromState'
          ? this.setState({
            fromCity: 'none'
          })
          : this.setState({
            toCity: 'none'
          });
      }
    }
  }

  handleDateChange(newDate, option) {
    let name = 'expenseDate';
    switch (option) {
      case 'arrival': {
        name = 'arrivalDate';
        break;
      }
      case 'departure': {
        name = 'departureDate';
        break;
      }
      default:
        break;
    }
    this.setState({
      [name]: newDate
    });
  }

  loadList(objName, option) {
    const countryId = option === 'expense' ? this.state.expenseCountry : option === 'from' ? this.state.fromCountry : this.state.toCountry;
    const stateId = option === 'expense' ? this.state.expenseState : option === 'from' ? this.state.fromState : this.state.toState;
    const { countries } = this.props;
    let resultList = [];
    const countryIndex = countries.findIndex(obj => obj.countryId === countryId);
    if (countryIndex > -1) {
      resultList = countries[countryIndex].countryStateList;
    }
    if (objName === 'state') {
      if (countryIndex > -1) {
        const stateIndex = resultList.findIndex(obj => obj.stateCountryId === stateId);
        if (stateIndex > -1) {
          resultList = resultList[stateIndex].cities;
        }
      }
    }
    return resultList;
  }

  changePersonValue(evt) {
    this.setState({
      personType: evt.target.value
    });
  }

  getVoucherType() {
    const { voucherTypes, obj } = this.props;
    const index = voucherTypes ? voucherTypes.findIndex(obj => obj.id === this.state.voucherType) : -1;
    return index > -1 ? voucherTypes[index] : null;
  }

  getExpenseType() {
    const { staffExpensesTypes, obj } = this.props;
    const index = staffExpensesTypes ? staffExpensesTypes.findIndex(el => el.masterValue === obj.type) : -1;
    return index > -1 ? staffExpensesTypes[index] : null;
  }

  getPersonType() {
    const { personTypes } = this.props;
    const index = personTypes ? personTypes.findIndex(obj => obj.id === this.state.personType) : -1;
    return index > -1 ? personTypes[index] : null;
  }

  getEuroTotalAmount() {
    const { allCurrencyData } = this.props;
    let total = 0;
    const index = allCurrencyData.findIndex(obj => obj.currencyTypeId === this.state.currencyType);
    if (index > -1) {
      total = this.state.currencyAmount * allCurrencyData[index].currencyChangeFactor;
    }
    return this.toCommas(total.toFixed(2));
  }

  handleAddFile(e) {
    const file = e.target.files[0];
    let doc = this.state.document;
    if (file.type === 'application/pdf') {
      doc = file;
    }
    this.setState({
      document: doc,
      documentUpdated: true
    });
  }


  handleDeleteFile(e) {
    this.setState({
      document: null
    });
  }

  validData() {
    const { obj } = this.props;
    let errorCount = 0;

    if (((this.state.expenseType && this.state.expenseType.allowSubtypes) && this.state.subtype === 'none') || this.state.expenseDate === null || this.state.voucherType === 'none' || this.state.currencyType === 'none' || (this.state.currencyAmount === '' || isNaN(this.state.currencyAmount) || this.state.currencyAmount <= 0)) {
      errorCount++;
    } else if (this.getVoucherType().masterValue !== 'DONT EXIST' && this.state.document === null) {
      errorCount++;
    }

    switch (obj.type) {
      case 'SUPPORT': {
        if (this.state.expenseCountry === 'none' || this.state.expenseState === 'none' || this.state.expenseCity === 'none' || this.state.persons.length === 0) {
          errorCount++;
        }
        break;
      }
      case 'TRANSPORT': {
        if (this.state.fromCountry === 'none' || this.state.fromState === 'none' || this.state.fromCity === 'none'
                    || this.state.toCountry === 'none' || this.state.toState === 'none' || this.state.toCity === 'none'
                    || this.state.persons.length === 0) {
          errorCount++;
        }
        break;
      }
      case 'LODGING': {
        if (this.state.expenseCountry === 'none' || this.state.expenseState === 'none' || this.state.expenseCity === 'none'
                    || this.state.arrivalDate === null
                    || this.state.departureDate === null) {
          errorCount++;
        }
        break;
      }
      case 'KMS': {
        if (this.state.fromCountry === 'none' || this.state.fromState === 'none' || this.state.fromCity === 'none'
                    || this.state.toCountry === 'none' || this.state.toState === 'none' || this.state.toCity === 'none'
                    || this.state.persons.length === 0
                    || (this.state.kms === '' || isNaN(this.state.kms) || this.state.kms <= 0)) {
          errorCount++;
        }

        break;
      }
      default: {
        if (this.state.expenseCountry === 'none' || this.state.expenseState === 'none' || this.state.expenseCity === 'none'
                    || this.state.description === '') {
          errorCount++;
        }
        break;
      }
    }

    return errorCount === 0;
  }

  handleSave(e) {
    const {
      obj, handleClose, saveExpenseWithFile, saveExpense, getExpenses
    } = this.props;
    const valid = this.validData();
    if (valid) {
      const { type } = obj;
      const employeeId = obj.staffId;
      const expenseId = obj.hasOwnProperty('id') ? obj.id : '';
      const expenseDate = new Date(this.state.expenseDate).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      const voucherTypeId = this.state.voucherType;
      const status = obj.hasOwnProperty('id') ? obj.expenseStatusMasterValue : 'PENDING APPROVAL';
      const localCurrencyTypeId = this.state.currencyType;
      const localCurrencyAmount = String(this.state.currencyAmount);
      const subtypeId = this.getExpenseType().allowSubtypes ? this.state.subtype : '';
      const file = this.getVoucherType().masterValue !== 'DONT EXIST' ? this.state.document : null;
      const expenseCountryId = (obj.type === 'SUPPORT' || obj.type === 'LODGING' || obj.type === 'OTHERS') ? this.state.expenseCountry : '';
      const expenseStateId = (obj.type === 'SUPPORT' || obj.type === 'LODGING' || obj.type === 'OTHERS') ? this.state.expenseState : '';
      const expenseCityId = (obj.type === 'SUPPORT' || obj.type === 'LODGING' || obj.type === 'OTHERS') ? this.state.expenseCity : '';
      const arrivalDate = (obj.type === 'LODGING') ? new Date(this.state.arrivalDate).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }) : '';
      const departureDate = (obj.type === 'LODGING') ? new Date(this.state.departureDate).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }) : '';
      const description = (obj.type === 'OTHERS') ? this.state.description : '';
      const fromCountryId = (obj.type === 'TRANSPORT' || obj.type === 'KMS') ? this.state.fromCountry : '';
      const fromStateId = (obj.type === 'TRANSPORT' || obj.type === 'KMS') ? this.state.fromState : '';
      const fromCityId = (obj.type === 'TRANSPORT' || obj.type === 'KMS') ? this.state.fromCity : '';
      const toCountryId = (obj.type === 'TRANSPORT' || obj.type === 'KMS') ? this.state.toCountry : '';
      const toStateId = (obj.type === 'TRANSPORT' || obj.type === 'KMS') ? this.state.toState : '';
      const toCityId = (obj.type === 'TRANSPORT' || obj.type === 'KMS') ? this.state.toCity : '';
      const kms = (obj.type === 'KMS') ? String(this.state.kms) : '';

      const withDocument = this.getVoucherType().masterValue !== 'DONT EXIST' && this.state.documentUpdated;
      const data = withDocument ? new FormData() : {};
      if (withDocument) {
        const personTypeIds = [];
        const personCompanyNames = [];
        const personNames = [];
        const personFatherFamilyNames = [];
        const personMotherFamilyNames = [];
        if (this.state.persons.length > 0) {
          this.state.persons.forEach(person => {
            personTypeIds.push(person.personTypeId);
            personCompanyNames.push(person.companyName);
            personNames.push(person.name);
            personFatherFamilyNames.push(person.fatherFamilyName);
            personMotherFamilyNames.push(person.motherFamilyName);
          });
        }

        data.append('type', type);
        data.append('employeeId', employeeId);
        data.append('expenseId', expenseId);
        data.append('expenseDate', expenseDate);
        data.append('voucherTypeId', voucherTypeId);
        data.append('status', status);
        data.append('localCurrencyTypeId', localCurrencyTypeId);
        data.append('localCurrencyAmount', localCurrencyAmount);
        data.append('subtypeId', subtypeId);
        data.append('file', file);
        data.append('expenseCountryId', expenseCountryId);
        data.append('expenseStateId', expenseStateId);
        data.append('expenseCityId', expenseCityId);
        data.append('arrivalDate', arrivalDate);
        data.append('departureDate', departureDate);
        data.append('description', description);
        data.append('fromCountryId', fromCountryId);
        data.append('fromStateId', fromStateId);
        data.append('fromCityId', fromCityId);
        data.append('toCountryId', toCountryId);
        data.append('toStateId', toStateId);
        data.append('toCityId', toCityId);
        data.append('kms', kms);
        data.append('personTypeIds', personTypeIds);
        data.append('personCompanyNames', personCompanyNames);
        data.append('personNames', personNames);
        data.append('personFatherFamilyNames', personFatherFamilyNames);
        data.append('personMotherFamilyNames', personMotherFamilyNames);
      } else {
        data.type = type;
        data.employeeId = employeeId;
        data.expenseId = expenseId;
        data.expenseDate = expenseDate;
        data.voucherTypeId = voucherTypeId;
        data.status = status;
        data.localCurrencyTypeId = localCurrencyTypeId;
        data.localCurrencyAmount = localCurrencyAmount;
        data.subtypeId = subtypeId;
        data.expenseCountryId = expenseCountryId;
        data.expenseStateId = expenseStateId;
        data.expenseCityId = expenseCityId;
        data.arrivalDate = arrivalDate;
        data.departureDate = departureDate;
        data.description = description;
        data.fromCountryId = fromCountryId;
        data.fromStateId = fromStateId;
        data.fromCityId = fromCityId;
        data.toCountryId = toCountryId;
        data.toStateId = toStateId;
        data.toCityId = toCityId;
        data.kms = kms;
        if (this.state.persons.length > 0) {
          data.persons = this.state.persons;
        }
      }
      console.log(data);

      new Promise((resolve) => {
        if (withDocument) {
          saveExpenseWithFile(data);
        } else {
          saveExpense(data);
        }
        this.editingPromiseResolve = resolve;
      }).then((result) => {
        const notificationValue = Object.keys(result).length === 0 ? obj.hasOwnProperty('id') ? 'expense.updated' : 'expense.added' : result;
        if (Object.keys(result).length === 0 || isString(result)) {
          handleClose(true);
          const params = {
            employeeId: obj.staffId,
            period: 'month',
            startDate: null,
            endDate: null
          };
          getExpenses(params);
          notification('success', notificationValue);
        } else {
          notification('danger', notificationValue);
        }
      });
    }
  }


  toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    const {
      obj, handleClose, countries, staffExpensesTypes, personTypes, voucherTypes, currencyTypes, isLoading, errors, expenseResponse
    } = this.props;
    const { columns, persons } = this.state;

    (!isLoading && expenseResponse) && this.editingPromiseResolve(expenseResponse);
    (!isLoading && !expenseResponse) && this.editingPromiseResolve(errors);

    return (
      <div>
        <Card>
          <CardContent>
            <div id="employee-info">
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Chip label="Employee information" color="secondary" style={{ marginTop: '10px', marginBottom: '10px' }} />
                  <Grid item>
                    <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                            Personal Number:
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      {obj.staffPersonalNumber}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                            Name:
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      {obj.staffName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                            Father Family Name:
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      {obj.staffFatherFamilyName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                            Mother Family Name:
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      {obj.staffMotherFamilyName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                            Company Name:
                    </Typography>
                    <Typography component="span" color="textSecondary">
                      {obj.staffCompany}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box display="flex" justifyContent="center">
                    {obj.type === 'SUPPORT' ? <FastfoodIcon color="primary" style={{ fontSize: 100 }} />
                      : obj.type === 'TRANSPORT' ? <CommuteIcon color="primary" style={{ fontSize: 100 }} />
                        : obj.type === 'LODGING' ? <HotelIcon color="primary" style={{ fontSize: 100 }} />
                          : obj.type === 'KMS' ? <LocalGasStationIcon color="primary" style={{ fontSize: 100 }} />
                            : <HelpIcon color="primary" style={{ fontSize: 100 }} />}
                  </Box>
                  <Typography component="span" color="primary" variant="h5" display="block" align="center" style={{ marginTop: 5 }}>
                    {`${obj.type} EXPENSE`}
                  </Typography>
                </Grid>
              </Grid>
            </div>

            <Divider style={{ marginTop: '10px', marginBottom: '20px' }} />

            <div id="form">
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormControl key="expensedat-date-formcontrol" fullWidth size="small">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        id="expense-datetimepicker"
                        inputVariant="outlined"
                        name="expenseDate"
                        size="small"
                        fullWidth
                        label="Expense date"
                        value={this.state.expenseDate || null}
                        onChange={(newDate) => this.handleDateChange(newDate, 'expense')}
                        showTodayButton
                        disableFuture
                        format="yyyy/MM/dd"
                        error={this.state.expenseDate === null}
                      />
                    </MuiPickersUtilsProvider>
                    {this.state.expenseDate === null ? <FormHelperText error>This field is required</FormHelperText> : null}
                  </FormControl>
                </Grid>
                {this.getExpenseType().allowSubtypes
                  ? (
                    <Grid item xs={12} md={3}>
                      <FormControl variant="outlined" fullWidth size="small">
                        <InputLabel htmlFor="expense-subtype">Expense subtype</InputLabel>
                        <Select
                          id="expense-subtype-select"
                          name="subtype"
                          value={this.state.subtype || 'none'}
                          onChange={(e) => this.handleChange(e)}
                          input={(
                            <OutlinedInput
                              labelWidth={130}
                              name="expense-subtype"
                              id="expense-subtype"
                            />
                          )}
                          error={this.state.subtype === 'none'}
                        >
                          <MenuItem value="none">
                            <em>Empty</em>
                          </MenuItem>
                          {this.getExpenseType().subtypes.map(subtype => <MenuItem key={subtype.id} value={subtype.id}>{subtype.name}</MenuItem>)}
                        </Select>
                        {this.state.subtype === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                      </FormControl>
                    </Grid>
                  )
                  : null
                }
                <Grid item xs={12} md={3}>
                  <FormControl variant="outlined" fullWidth size="small">
                    <InputLabel htmlFor="voucher-type">Voucher type</InputLabel>
                    <Select
                      id="voucher-type-select"
                      name="voucherType"
                      value={this.state.voucherType || 'none'}
                      onChange={(e) => this.handleChange(e)}
                      input={(
                        <OutlinedInput
                          labelWidth={100}
                          name="voucher-type"
                          id="outlined-voucher-type"
                        />
                      )}
                      error={this.state.voucherType === 'none'}
                    >
                      <MenuItem value="none">
                        <em>Empty</em>
                      </MenuItem>
                      {voucherTypes.map(type => <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)}
                    </Select>
                    {this.state.voucherType === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                  </FormControl>
                </Grid>
                {obj.type === 'KMS'
                  ? (
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth>
                        <TextField
                          id="kms-field"
                          label="Kms traveled"
                          name="kms"
                          value={this.state.kms}
                          onChange={(e) => this.handleChange(e)}
                          size="small"
                          variant="outlined"
                          error={this.state.kms === '' || isNaN(this.state.kms) || this.state.kms <= 0}
                        />
                        {(this.state.kms === '' || isNaN(this.state.kms)) ? <FormHelperText error>Field format error</FormHelperText>
                          : this.state.kms <= 0 ? <FormHelperText error>Ilegal field value</FormHelperText> : null}
                      </FormControl>
                    </Grid>
                  )
                  : null}
              </Grid>
              <Grid container spacing={2} style={{ marginTop: 5 }}>
                <Grid item xs={12} md={3}>
                  <FormControl variant="outlined" fullWidth size="small">
                    <InputLabel htmlFor="currency-type">Currency type</InputLabel>
                    <Select
                      id="currency-type-select"
                      name="currencyType"
                      value={this.state.currencyType || 'none'}
                      onChange={(e) => this.handleChange(e)}
                      input={(
                        <OutlinedInput
                          labelWidth={100}
                          name="currency-type"
                          id="outlined-currency-type"
                        />
                      )}
                      error={this.state.currencyType === 'none'}
                    >
                      <MenuItem value="none">
                        <em>Empty</em>
                      </MenuItem>
                      {currencyTypes.map(type => <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)}
                    </Select>
                    {this.state.currencyType === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <TextField
                      id="currency-amount-field"
                      label="Local currency amount"
                      name="currencyAmount"
                      value={this.state.currencyAmount}
                      onChange={(e) => this.handleChange(e)}
                      size="small"
                      variant="outlined"
                      error={this.state.currencyAmount === '' || isNaN(this.state.currencyAmount) || this.state.currencyAmount <= 0}
                    />
                    {(this.state.currencyAmount === '' || isNaN(this.state.currencyAmount)) ? <FormHelperText error>Field format error</FormHelperText>
                      : this.state.currencyAmount <= 0 ? <FormHelperText error>Ilegal field value</FormHelperText> : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box display="flex" justifyContent="center">
                    <Typography component="span" variant="h4" align="center" gutterBottom color="primary" style={{ color: (this.state.currencyType !== 'none' && this.state.currencyAmount !== '' && !isNaN(this.state.currencyAmount) && this.state.currencyAmount > 0) ? '#27AE60' : '#CB4335' }}>
                      {(this.state.currencyType !== 'none' && this.state.currencyAmount !== '' && !isNaN(this.state.currencyAmount) && this.state.currencyAmount > 0) ? `€ ${this.getEuroTotalAmount()}` : `€ ${(0).toFixed(2)}`}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {(this.state.voucherType !== 'none' && this.getVoucherType().masterValue !== 'DONT EXIST')
                ? (
                  <Grid container spacing={2} style={{ marginBottom: 10 }}>
                    <React.Fragment>
                      {this.state.document === null ? <input id="attachInput" type="file" accept="application/pdf" ref={(ref) => this.attachInput = ref} style={{ display: 'none' }} onChange={(e) => this.handleAddFile(e)} /> : null}
                      <Grid item xs={1} md={1} style={{ maxWidth: 50 }}>
                        <Tooltip title={this.state.document === null ? 'Attach file' : 'Delete file'}>
                          <span>
                            <Fab size="small" color="default" aria-label="attach" onClick={(e) => (this.state.document === null ? this.attachInput.click(e) : this.handleDeleteFile(e))}>
                              {this.state.document === null ? <AttachFileIcon /> : <DeleteIcon />}
                            </Fab>
                          </span>
                        </Tooltip>
                      </Grid>
                    </React.Fragment>
                    <Grid item xs={8} md={8} style={{ marginLeft: 10, marginTop: 10 }}>
                      <Typography component="span" color="primary">
                        {this.state.document !== null ? this.state.document.name : null}
                      </Typography>
                    </Grid>
                  </Grid>
                )
                : null}

              {obj.type === 'SUPPORT' || obj.type === 'LODGING' || obj.type === 'OTHERS'
                ? (
                  <React.Fragment>
                    <Grid container spacing={2} style={{ marginTop: 5 }}>
                      <Grid item xs={12} md={3}>
                        <FormControl variant="outlined" fullWidth size="small">
                          <InputLabel htmlFor="outlined-expense-country"> Expense country</InputLabel>
                          <Select
                            id="expense-country-select"
                            name="expenseCountry"
                            value={this.state.expenseCountry || 'none'}
                            onChange={(e) => this.handleChange(e)}
                            input={(
                              <OutlinedInput
                                labelWidth={120}
                                name="expense-country"
                                id="outlined-expense-country"
                              />
                            )}
                            error={this.state.expenseCountry === 'none'}
                          >
                            <MenuItem value="none">
                              <em>Empty</em>
                            </MenuItem>
                            {countries.map(country => <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>)}
                          </Select>
                          {this.state.expenseCountry === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <FormControl variant="outlined" fullWidth size="small">
                          <InputLabel htmlFor="outlined-expense-state">Expense state</InputLabel>
                          <Select
                            id="expense-state-select"
                            name="expenseState"
                            value={this.state.expenseState || 'none'}
                            onChange={(e) => this.handleChange(e)}
                            input={(
                              <OutlinedInput
                                labelWidth={100}
                                name="expense-state"
                                id="outlined-expense-state"
                              />
                            )}
                            error={this.state.expenseState === 'none'}
                          >
                            <MenuItem value="none">
                              <em>Empty</em>
                            </MenuItem>
                            {this.state.expenseCountry !== 'none' ? this.loadList('country', 'expense').map(state => <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>) : null}
                          </Select>
                          {this.state.expenseState === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <FormControl variant="outlined" fullWidth size="small">
                          <InputLabel htmlFor="outlined-expense-city">Expense city</InputLabel>
                          <Select
                            id="expense-city-select"
                            name="expenseCity"
                            value={this.state.expenseCity || 'none'}
                            onChange={(e) => this.handleChange(e)}
                            input={(
                              <OutlinedInput
                                labelWidth={90}
                                name="expense-city"
                                id="outlined-expense-city"
                              />
                            )}
                            error={this.state.expenseCity === 'none'}
                          >
                            <MenuItem value="none">
                              <em>Empty</em>
                            </MenuItem>
                            {this.state.expenseState !== 'none' ? this.loadList('state', 'expense').map(city => <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>) : null}
                          </Select>
                          {this.state.expenseCity === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                        </FormControl>
                      </Grid>
                    </Grid>

                    {obj.type === 'LODGING'
                      ? (
                        <React.Fragment>
                          <Grid container spacing={2} style={{ marginTop: 5 }}>
                            <Grid item xs={12} md={3}>
                              <FormControl key="arrival-date-formcontrol" fullWidth size="small">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDateTimePicker
                                    id="arrival-datetimepicker"
                                    inputVariant="outlined"
                                    name="arrivalDate"
                                    size="small"
                                    fullWidth
                                    ampm
                                    label="Arrival date"
                                    value={this.state.arrivalDate || null}
                                    onChange={(newValue) => this.handleDateChange(newValue, 'arrival')}
                                    showTodayButton
                                    disableFuture
                                    format="yyyy/MM/dd hh:mm a"
                                    error={this.state.arrivalDate === null}
                                  />
                                </MuiPickersUtilsProvider>
                                {this.state.arrivalDate === null ? <FormHelperText error>This field is required</FormHelperText> : null}
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <FormControl key="departure-date-formcontrol" fullWidth size="small">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDateTimePicker
                                    id="departure-datetimepicker"
                                    inputVariant="outlined"
                                    name="departureDate"
                                    size="small"
                                    fullWidth
                                    ampm
                                    label="Departure date"
                                    value={this.state.departureDate || null}
                                    onChange={(newValue) => this.handleDateChange(newValue, 'departure')}
                                    showTodayButton
                                    disableFuture
                                    format="yyyy/MM/dd hh:mm a"
                                    error={this.state.departureDate === null}
                                  />
                                </MuiPickersUtilsProvider>
                                {this.state.departureDate === null ? <FormHelperText error>This field is required</FormHelperText> : null}
                              </FormControl>
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      )
                      : obj.type === 'OTHERS'
                        ? (
                          <React.Fragment>
                            <Grid container spacing={2} style={{ marginTop: 5 }}>
                              <Grid item xs={12} md={9}>
                                <FormControl fullWidth>
                                  <TextField
                                    id="description-field"
                                    label="Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={(e) => this.handleChange(e)}
                                    size="small"
                                    variant="outlined"
                                    error={this.state.description === ''}
                                  />
                                  {this.state.description === '' ? <FormHelperText error>This field is required</FormHelperText> : null}
                                </FormControl>
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        )
                        : null
                    }
                  </React.Fragment>
                )
                : obj.type === 'TRANSPORT' || obj.type === 'KMS'
                  ? (
                    <React.Fragment>
                      <Grid container spacing={2} style={{ marginTop: 5 }}>
                        <Grid item xs={12} md={3}>
                          <FormControl variant="outlined" fullWidth size="small">
                            <InputLabel htmlFor="outlined-from-country"> From country</InputLabel>
                            <Select
                              id="from-country-select"
                              name="fromCountry"
                              value={this.state.fromCountry || 'none'}
                              onChange={(e) => this.handleChange(e)}
                              input={(
                                <OutlinedInput
                                  labelWidth={120}
                                  name="from-country"
                                  id="outlined-from-country"
                                />
                              )}
                              error={this.state.fromCountry === 'none'}
                            >
                              <MenuItem value="none">
                                <em>Empty</em>
                              </MenuItem>
                              {countries.map(country => <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>)}
                            </Select>
                            {this.state.fromCountry === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <FormControl variant="outlined" fullWidth size="small">
                            <InputLabel htmlFor="outlined-from-state">From state</InputLabel>
                            <Select
                              id="from-state-select"
                              name="fromState"
                              value={this.state.fromState || 'none'}
                              onChange={(e) => this.handleChange(e)}
                              input={(
                                <OutlinedInput
                                  labelWidth={100}
                                  name="from-state"
                                  id="outlined-from-state"
                                />
                              )}
                              error={this.state.fromState === 'none'}
                            >
                              <MenuItem value="none">
                                <em>Empty</em>
                              </MenuItem>
                              {this.state.fromCountry !== 'none' ? this.loadList('country', 'from').map(state => <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>) : null}
                            </Select>
                            {this.state.fromState === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <FormControl variant="outlined" fullWidth size="small">
                            <InputLabel htmlFor="outlined-from-city">From city</InputLabel>
                            <Select
                              id="from-city-select"
                              name="fromCity"
                              value={this.state.fromCity || 'none'}
                              onChange={(e) => this.handleChange(e)}
                              input={(
                                <OutlinedInput
                                  labelWidth={90}
                                  name="from-city"
                                  id="outlined-from-city"
                                />
                              )}
                              error={this.state.fromCity === 'none'}
                            >
                              <MenuItem value="none">
                                <em>Empty</em>
                              </MenuItem>
                              {this.state.fromState !== 'none' ? this.loadList('state', 'from').map(city => <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>) : null}
                            </Select>
                            {this.state.fromCity === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} style={{ marginTop: 5 }}>
                        <Grid item xs={12} md={3}>
                          <FormControl variant="outlined" fullWidth size="small">
                            <InputLabel htmlFor="outlined-to-country"> To country</InputLabel>
                            <Select
                              id="to-country-select"
                              name="toCountry"
                              value={this.state.toCountry || 'none'}
                              onChange={(e) => this.handleChange(e)}
                              input={(
                                <OutlinedInput
                                  labelWidth={100}
                                  name="to-country"
                                  id="outlined-to-country"
                                />
                              )}
                              error={this.state.toCountry === 'none'}
                            >
                              <MenuItem value="none">
                                <em>Empty</em>
                              </MenuItem>
                              {countries.map(country => <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>)}
                            </Select>
                            {this.state.toCountry === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <FormControl variant="outlined" fullWidth size="small">
                            <InputLabel htmlFor="outlined-to-state">To state</InputLabel>
                            <Select
                              id="to-state-select"
                              name="toState"
                              value={this.state.toState || 'none'}
                              onChange={(e) => this.handleChange(e)}
                              input={(
                                <OutlinedInput
                                  labelWidth={80}
                                  name="to-state"
                                  id="outlined-to-state"
                                />
                              )}
                              error={this.state.toState === 'none'}
                            >
                              <MenuItem value="none">
                                <em>Empty</em>
                              </MenuItem>
                              {this.state.toCountry !== 'none' ? this.loadList('country', 'to').map(state => <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>) : null}
                            </Select>
                            {this.state.toState === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <FormControl variant="outlined" fullWidth size="small">
                            <InputLabel htmlFor="outlined-to-city">To city</InputLabel>
                            <Select
                              id="to-city-select"
                              name="toCity"
                              value={this.state.toCity || 'none'}
                              onChange={(e) => this.handleChange(e)}
                              input={(
                                <OutlinedInput
                                  labelWidth={70}
                                  name="to-city"
                                  id="outlined-to-city"
                                />
                              )}
                              error={this.state.toCity === 'none'}
                            >
                              <MenuItem value="none">
                                <em>Empty</em>
                              </MenuItem>
                              {this.state.toState !== 'none' ? this.loadList('state', 'to').map(city => <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>) : null}
                            </Select>
                            {this.state.toCity === 'none' ? <FormHelperText error>This field is required</FormHelperText> : null}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  )
                  : null
              }

              {obj.type === 'SUPPORT' || obj.type === 'TRANSPORT' || obj.type === 'KMS'
                ? (
                  <Grid item xs={12} md={12} style={{ marginTop: 15 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      {obj.type === 'SUPPORT' ? 'Associated people' : 'Persons to visit'}
                    </Typography>
                    <MaterialTable
                      title=""
                      columns={columns}
                      data={persons}
                      options={{
                        actionsColumnIndex: -1,
                        actionsCellStyle: {
                          paddingLeft: 20,
                          minWidth: 80,
                          width: 80,
                          maxWidth: 80
                        }
                      }}
                      editable={{
                        onRowAddCancelled: rowData => {
                          this.setState({
                            personType: ''
                          });
                        },
                        onRowUpdateCancelled: rowData => {
                          this.setState({
                            personType: ''
                          });
                        },
                        onRowAdd: (newData) => new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataUpdate = [...this.state.persons];
                            newData.personTypeId = this.state.personType;
                            dataUpdate.push(newData);
                            this.setState({
                              columns,
                              persons: dataUpdate,
                              personType: '',
                              documentUpdated: false
                            });
                            resolve();
                          }, 1000);
                        }),
                        onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataUpdate = [...this.state.persons];
                            const index = oldData.tableData.id;
                            newData.personTypeId = this.state.personType ? this.state.personType : oldData.personTypeId;
                            dataUpdate[index] = newData;
                            this.setState({
                              columns,
                              persons: dataUpdate,
                              personType: '',
                              documentUpdated: false
                            });
                            resolve();
                          }, 1000);
                        }),
                        onRowDelete: (oldData) => new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataUpdate = [...this.state.persons];
                            dataUpdate.splice(oldData.tableData.id, 1);
                            this.setState({
                              columns,
                              persons: dataUpdate
                            });
                            resolve();
                          }, 1000);
                        })
                      }}
                    />
                  </Grid>
                )
                : null
              }

            </div>

          </CardContent>
          <CardActions style={{ marginLeft: '10px' }}>
            <Button variant="contained" size="small" color="default" onClick={(e) => handleClose(false)}>
                            Cancel
              {/* {intl.formatMessage({ id: 'connection.row.body.no' })} */}
            </Button>
            <Button
              variant="contained"
              disabled={!this.validData()}
              size="small"
              color="primary"
              onClick={(e) => this.handleSave(e)}
            >
                            Save Expense
              {/* } {intl.formatMessage({ id: 'connection.row.body.yes' })} */}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
