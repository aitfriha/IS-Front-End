import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import CommuteIcon from '@material-ui/icons/Commute';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import HelpIcon from '@material-ui/icons/Help';
import MaterialTable, { MTableToolbar } from 'material-table';

import {
  Grid,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Select,
  Card,
  CardContent,
  Typography,
  Menu,
  IconButton,
  MenuItem,
  Modal,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Box
} from '@material-ui/core';


import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
import localizationMaterialTable from '../../../../api/localizationMaterialUI/localizationMaterialTable';
import HelmetCustom from '../../../../components/HelmetCustom/HelmetCustom';
import Loading from '../../../../components/Loading/index';
import notification from '../../../../components/Notification/Notification';
import { Confirmation } from '../Travels/Confirmation';

import { getAllCountry } from '../../../../redux/country/actions';

import {
  getStaffExpensesTypes,
} from '../../../../redux/staffExpenseType/actions';

import {
  getAllPersonTypes
} from '../../../../redux/personType/actions';

import {
  getAllVoucherTypes
} from '../../../../redux/voucherType/actions';

import {
  getExpenses,
  exportExpenses,
  changeStatusExpense,
  downloadDocumentOfExpense
} from '../../../../redux/expense/actions';

import {
  getCurrencyTypes,
} from '../../../../redux/currencyType/actions';

import {
  getDataByCurrencyType,
  getDataAssociatedWithCurrencyTypes
} from '../../../../redux/currency/actions';


let self = null;

const styles = {};

const ITEM_HEIGHT = 40;

const today = new Date();
const minimunDate = new Date('1990-01-01');

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
}

class ExpensesManagement extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      searchComplete: true,
      anchorEl: null,
      openMenu: false,
      period: 'month',
      startDate: null,
      endDate: null,
      confirmation: {
        openConfirm: false,
        titleConfirm: '',
        textConfirm: '',
      },
      rowData: null,
      status: '',
      selectedTab: 0,
      columns: [
        {
          title: 'Status', // intl.formatMessage({ id: 'connection.id' }),
          field: 'status',
          minWidth: 110,
          maxWidth: 150,
          export: true,
          render: rowData => {
            const value = rowData.expenseStatusName;
            switch (rowData.expenseStatusMasterValue) {
              case 'PAID': {
                return (<Chip label={value} color="primary" style={{ backgroundColor: '#F1C40F' }} />);
              }
              case 'PENDING APPROVAL': {
                return (<Chip label={value} color="primary" style={{ backgroundColor: '#0A79DF' }} />);
              }
              case 'APPROVED': {
                return (<Chip label={value} color="primary" style={{ backgroundColor: '#27AE60' }} />);
              }
              default: {
                return (<Chip label={value} color="primary" style={{ backgroundColor: '#CB4335' }} />);
              }
            }
          }
        },
        {
          title: 'Employee Name', // intl.formatMessage({ id: 'connection.id' }),
          field: '',
          searchable: false,
          export: true,
          minWidth: 150,
          render: rowData => `${rowData.staffName} ${rowData.staffFatherFamilyName} ${rowData.staffMotherFamilyName}`
        },
        {
          title: 'Company Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'staffCompany',
          searchable: false,
          export: true,
          minWidth: 150
        },
        {
          title: 'Expense Date', // intl.formatMessage({ id: 'connection.id' }),
          field: 'expenseDate',
          searchable: false,
          export: true,
          minWidth: 120,
          width: 120,
          maxWidth: 120,
          render: rowData => new Date(rowData.expenseDate).toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        },
        {
          title: 'Euro Amount', // intl.formatMessage({ id: 'connection.id' }),
          field: 'euroAmount',
          searchable: true,
          export: true,
          minWidth: 130,
          width: 130,
          maxWidth: 130,
          render: rowData => `${this.toCommas((rowData.euroAmount).toFixed(2))}`
        }
      ],
      components: {
        Toolbar: props => (
          <div>
            <MTableToolbar {...props} />
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6} md={6} style={{ marginTop: 5 }}>
                <Box display="flex" justifyContent="flex-start">
                  <Chip label={`€ ${(this.getSubtotal('PAID')).toFixed(2)}`} color="primary" style={{ backgroundColor: '#F1C40F', marginLeft: 20 }} />
                </Box>
              </Grid>
              <Grid item xs={6} md={6} style={{ marginTop: 5 }}>
                <Box display="flex" justifyContent="flex-end" style={{ marginRight: 20 }}>
                  <Chip label={`€ ${(this.getSubtotal('ALL')).toFixed(2)}`} color="primary" style={{ backgroundColor: '#27AE60', marginLeft: 20 }} />
                </Box>
              </Grid>
            </Grid>

          </div>
        )
      },
      openDialog: false,
      dataDialog: null
    };
  }


  componentDidMount() {
    const {
      getCurrencyTypes, getDataAssociatedWithCurrencyTypes, getAllCountry, getStaffExpensesTypes, getAllPersonTypes, getAllVoucherTypes, getExpenses
    } = this.props;
    getStaffExpensesTypes();
    getAllCountry();
    getAllPersonTypes();
    getAllVoucherTypes();
    const data = {
      period: 'month',
      startDate: null,
      endDate: null
    };
    getExpenses(data);

    getCurrencyTypes();
    getDataAssociatedWithCurrencyTypes();
  }


  componentWillUnmount() {
    this.setState({
      anchorEl: null,
      openMenu: false,
      openDialog: false,
      dataDialog: null
    });
  }

  handleSelectedTab(evt, newTab) {
    this.setState({
      selectedTab: newTab
    });
  }

  getWeekOfYear = (dt) => {
    const tdt = new Date(dt.valueOf());
    const dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    const firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
  }

  toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getExpenseSubtypeBy(rowData) {
    let subtype = null;
    const { staffExpensesTypes } = this.props;
    const index = staffExpensesTypes.findIndex(obj => obj.masterValue === rowData.expenseTypeMasterValue);
    if (index > -1) {
      const subtypeIndex = staffExpensesTypes[index].subtypes.findIndex(obj => obj.id === rowData.expenseSubtypeId);
      subtype = subtypeIndex > -1 ? staffExpensesTypes[index].subtypes[subtypeIndex] : null;
    }
    return subtype;
  }

  getSubtotal(option) {
    const { expenses } = this.props;
    const data = this.state.selectedTab === 0 ? expenses.filter(expense => expense.expenseTypeMasterValue === 'SUPPORT')
      : this.state.selectedTab === 1 ? expenses.filter(expense => expense.expenseTypeMasterValue === 'TRANSPORT')
        : this.state.selectedTab === 2 ? expenses.filter(expense => expense.expenseTypeMasterValue === 'LODGING')
          : this.state.selectedTab === 3 ? expenses.filter(expense => expense.expenseTypeMasterValue === 'KMS')
            : expenses.filter(expense => expense.expenseTypeMasterValue === 'OTHERS');

    let subtotalPaid = 0;
    let subtotalAmount = 0;
    data.forEach(expense => {
      if (expense.expenseStatusMasterValue === 'PAID') {
        subtotalPaid += expense.euroAmount;
      } else {
        subtotalAmount += expense.euroAmount;
      }
    });
    return option === 'PAID' ? subtotalPaid : subtotalAmount;
  }


  //----------------------------------------------------------------------------------------------

  // HANDLE ACTIONS

  handleFilterData = (e) => {
    this.setState({
      searchComplete: true,
    });
    const { getExpenses } = this.props;
    const data = {
      period: this.state.period,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    getExpenses(data);
  }

  handleClearDates = (e) => {
    this.setState({
      startDate: null,
      endDate: null
    });
  }

  handlePeriodChange = (e) => {
    const newValue = e.target.value;
    this.setState({
      period: newValue,
      searchComplete: false
    });
    if (newValue !== 'another') {
      this.setState({
        startDate: null,
        endDate: null
      });
    }
  }

  handleDateChange = (date, option) => {
    this.setState({
      startDate: option === 'startDate' ? date : this.state.startDate,
      endDate: option === 'endDate' ? date : this.state.endDate
    });
  }

  handleNoConfirm() {
    self.setState({
      confirmation: {
        openConfirm: false,
        titleConfirm: '',
        textConfirm: '',
      },
      rowData: null
    });
  }

  handleClose = (afterSaveAction) => {
    this.setState({
      openDialog: false,
      dataDialog: null,
      period: afterSaveAction ? 'month' : this.state.period
    });
  }

  handleOpenMenu(event) {
    self.setState({
      anchorEl: event.currentTarget,
      openMenu: true
    });
  }

  handleCloseMenu() {
    self.setState({
      anchorEl: null,
      openMenu: false
    });
  }

  getMonthInLetter(month) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
  }


  handleExportCSV(event) {
    const { exportExpenses } = this.props;
    new Promise((resolve) => {
      const params = {
        fileType: 'excel',
        period: this.state.period,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      };
      exportExpenses(params);
      this.editingPromiseResolve = resolve;
    }).then((result) => {
      this.setState({
        searchComplete: true,
        anchorEl: null,
        openMenu: false,
      });
      const url = window.URL.createObjectURL(new Blob([result]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'EXPENSES.xlsx');
      document.body.appendChild(link);
      link.click();
    });
  }

  handleExportPDF(event) {
    const { exportExpenses } = this.props;
    new Promise((resolve) => {
      const params = {
        fileType: 'pdf',
        period: this.state.period,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      };
      exportExpenses(params);
      this.editingPromiseResolve = resolve;
    }).then((result) => {
      this.setState({
        searchComplete: true,
        anchorEl: null,
        openMenu: false,
      });

      const url = window.URL.createObjectURL(new Blob([result]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'EXPENSES.pdf');
      document.body.appendChild(link);
      link.click();
    });
  }

  handleDownloadDocument(event, rowData) {
    const { downloadDocumentOfExpense } = this.props;
    new Promise((resolve) => {
      downloadDocumentOfExpense(rowData.id);
      this.editingPromiseResolve = resolve;
    }).then((result) => {
      const url = window.URL.createObjectURL(new Blob([result]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', rowData.document.name);
      document.body.appendChild(link);
      link.click();
    });
  }


  //-------------------------------------------------------------------------------------------------------

  render() {
    const {
      intl, location, isLoading, errors, changeStatusExpense, expenses, getExpenses, expenseResponse
    } = this.props;
    const { columns } = this.state;

    (!isLoading && expenseResponse) && this.editingPromiseResolve(expenseResponse);
    (!isLoading && !expenseResponse) && this.editingPromiseResolve(errors);

    const tabTitle = this.state.selectedTab === 0 ? 'Support expenses history'
      : this.state.selectedTab === 1 ? 'Transport expenses history'
        : this.state.selectedTab === 2 ? 'Lodging expenses history'
          : this.state.selectedTab === 3 ? 'Kms expenses history'
            : 'History of others expenses';

    const data = this.state.selectedTab === 0 ? expenses.filter(expense => expense.expenseTypeMasterValue === 'SUPPORT')
      : this.state.selectedTab === 1 ? expenses.filter(expense => expense.expenseTypeMasterValue === 'TRANSPORT')
        : this.state.selectedTab === 2 ? expenses.filter(expense => expense.expenseTypeMasterValue === 'LODGING')
          : this.state.selectedTab === 3 ? expenses.filter(expense => expense.expenseTypeMasterValue === 'KMS')
            : expenses.filter(expense => expense.expenseTypeMasterValue === 'OTHERS');

    let totalPaid = 0;
    let totalAmount = 0;
    expenses.forEach(expense => {
      if (expense.expenseStatusMasterValue === 'PAID') {
        totalPaid += expense.euroAmount;
      } else {
        totalAmount += expense.euroAmount;
      }
    });

    return (
      <div>
        <HelmetCustom location={location} />
        <Card>
          <CardContent>
            <Grid container direction="row" spacing={2} style={{ marginLeft: 20, marginBottom: 25 }}>
              <Grid item md={2}>
                <FormControl style={{
                  minWidth: 140, width: 140, maxWidth: 140, marginTop: 16
                }}
                >
                  <InputLabel htmlFor="combo-priod-management">Filter by period</InputLabel>
                  <Select
                    id="combo-priod-management"
                    value={this.state.period}
                    onChange={(e) => this.handlePeriodChange(e)}
                  >
                    <MenuItem value="month">Current month</MenuItem>
                    <MenuItem value="year">Current year</MenuItem>
                    <MenuItem value="another">Another period</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {this.state.period === 'another'
                ? (
                  <React.Fragment>
                    <Grid item md={2}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="start-date-picker-management"
                          label="Start date"
                          value={this.state.startDate}
                          onChange={(date) => this.handleDateChange(date, 'startDate')}
                          style={{ minWidth: 140, width: 140, maxWidth: 140 }}
                          autoOk
                          minDate={minimunDate}
                          maxDate={this.state.endDate ? this.state.endDate : today}
                          disableFuture
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item md={2}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline-management"
                          label="End date"
                          value={this.state.endDate}
                          onChange={(date) => this.handleDateChange(date, 'endDate')}
                          style={{ minWidth: 140, width: 140, maxWidth: 140 }}
                          autoOk
                          minDate={this.state.startDate ? this.state.startDate : minimunDate}
                          maxDate={today}
                          disableFuture
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </React.Fragment>
                ) : null}

              <Grid item md={2} style={{ marginTop: 20 }}>
                <IconButton
                  disabled={this.state.period === 'another' && !this.state.startDate && !this.state.endDate}
                  onClick={(e) => this.handleFilterData(e)}
                >
                  <SearchIcon />
                </IconButton>
                {this.state.period === 'another'
                  ? (
                    <IconButton
                      disabled={this.state.period === 'another' && !this.state.startDate && !this.state.endDate}
                      onClick={(e) => this.handleClearDates(e)}
                    >
                      <ClearIcon />
                    </IconButton>
                  )
                  : null}
              </Grid>
            </Grid>

            <Tabs
              value={this.state.selectedTab}
              onChange={(e, newValue) => this.handleSelectedTab(e, newValue)}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Support" icon={<FastfoodIcon />} />
              <Tab label="Transport" icon={<CommuteIcon />} />
              <Tab label="Lodging" icon={<HotelIcon />} />
              <Tab label="Kms" icon={<LocalGasStationIcon />} />
              <Tab label="Others" icon={<HelpIcon />} />
            </Tabs>
            <TabContainer>
              <MaterialTable
                title={tabTitle}
                columns={columns}
                data={data}
                components={this.state.components}
                actions={
                  [
                    rowData => ({
                      disabled: rowData.voucherTypeMasterValue === 'DONT EXIST',
                      icon: () => <CloudDownloadIcon variant="outlined" name="download" />,
                      tooltip: 'Download',
                      onClick: (e) => this.handleDownloadDocument(e, rowData)
                    }),
                    rowData => ({
                      disabled: rowData.expenseStatusMasterValue !== 'PENDING APPROVAL',
                      icon: () => <CloseIcon variant="outlined" name="cancel" />,
                      tooltip: 'Reject', // intl.formatMessage({ id: 'table.column.actions.edit' }),
                      onClick: (e) => {
                        this.setState({
                          confirmation: {
                            openConfirm: true,
                            titleConfirm: 'Confirmation dialog',
                            textConfirm: 'Are you sure you want to REJECT this expense ?'
                          },
                          rowData,
                          status: 'REJECTED'
                        });
                      }
                    }),
                    rowData => ({
                      disabled: rowData.expenseStatusMasterValue !== 'PENDING APPROVAL',
                      icon: () => <DoneIcon variant="outlined" name="approve" />,
                      tooltip: 'Approve', // intl.formatMessage({ id: 'table.column.actions.edit' }),
                      onClick: (e) => {
                        this.setState({
                          confirmation: {
                            openConfirm: true,
                            titleConfirm: 'Confirmation dialog',
                            textConfirm: 'Are you sure you want to APPROVE this expense ?'
                          },
                          rowData,
                          status: 'APPROVED'
                        });
                      }
                    }),
                    {
                      icon: 'save_alt',
                      tooltip: 'Export',
                      disabled: !this.state.searchComplete || (this.state.period === 'another' && !this.state.startDate && !this.state.endDate) || data.length === 0,
                      isFreeAction: true,
                      onClick: (event) => this.handleOpenMenu(event)
                    },
                  ]
                }
                options={{
                  actionsColumnIndex: -1,
                  // rowStyle: rowData => ({
                  //   backgroundColor: (rowData.expenseStatusMasterValue === 'PENDING APPROVAL' && rowData.voucherTypeMasterValue === 'DONT EXIST') ? '#FFCDD2' : '#FFFFFF'
                  // })
                }}
                detailPanel={rowData => (
                  <Card className="info-content">
                    <CardContent>
                      <Grid container direction="row" style={{ marginBottom: 5 }}>
                        <Grid item xs={12} md={4}>
                          <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                              Voucher Type:
                          </Typography>
                          <Typography component="span" color="textSecondary">
                            {rowData.voucherTypeName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                              Local Currency Type:
                          </Typography>
                          <Typography component="span" color="textSecondary">
                            {rowData.localCurrencyTypeName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                              Local Currency Amount:
                          </Typography>
                          <Typography component="span" color="textSecondary">
                            {this.toCommas(parseFloat(rowData.localCurrencyAmount).toFixed(2))}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" style={{ marginBottom: 5 }}>
                        <Grid item xs={12} md={4}>
                          <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                              Register Date:
                          </Typography>
                          <Typography component="span" color="textSecondary">
                            {new Date(rowData.registerDate).toLocaleString('es-ES', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour12: true,
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Typography>
                        </Grid>
                        {rowData.expenseTypeAllowSubtypes
                          ? (
                            <Grid item xs={12} md={4}>
                              <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                Expense Subtype:
                              </Typography>
                              <Typography component="span" color="textSecondary">
                                {this.getExpenseSubtypeBy(rowData).name}
                              </Typography>
                            </Grid>
                          ) : null
                        }
                        {rowData.expenseStatusMasterValue === 'PAID'
                          ? (
                            <Grid item xs={12} md={4}>
                              <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                Payment Date:
                              </Typography>
                              <Typography component="span" color="textSecondary">
                                {rowData.paymentDate ? rowData.paymentDate : ''}
                              </Typography>
                            </Grid>
                          )
                          : null}
                      </Grid>
                      {(rowData.expenseTypeMasterValue === 'SUPPORT' || rowData.expenseTypeMasterValue === 'LODGING' || rowData.expenseTypeMasterValue === 'OTHERS')
                        ? (
                          <React.Fragment>
                            <Grid container direction="row">
                              <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                                <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                  Expense City:
                                </Typography>
                                <Typography component="span" color="textSecondary">
                                  {rowData.expenseCityName}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                                <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                  Expense State:
                                </Typography>
                                <Typography component="span" color="textSecondary">
                                  {rowData.expenseStateName}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                                <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                  Expense Country:
                                </Typography>
                                <Typography component="span" color="textSecondary">
                                  {rowData.expenseCountryName}
                                </Typography>
                              </Grid>
                            </Grid>
                            {rowData.expenseTypeMasterValue === 'LODGING'
                              ? (
                                <React.Fragment>
                                  <Grid container direction="row">
                                    <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                                      <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                      Arrival Date:
                                      </Typography>
                                      <Typography component="span" color="textSecondary">
                                        {new Date(rowData.arrivalDate).toLocaleString('es-ES', {
                                          year: 'numeric',
                                          month: '2-digit',
                                          day: '2-digit',
                                          hour12: true,
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                                      <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                      Departure Date:
                                      </Typography>
                                      <Typography component="span" color="textSecondary">
                                        {new Date(rowData.departureDate).toLocaleString('es-ES', {
                                          year: 'numeric',
                                          month: '2-digit',
                                          day: '2-digit',
                                          hour12: true,
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </React.Fragment>
                              )
                              : rowData.expenseTypeMasterValue === 'OTHERS'
                                ? (
                                  <React.Fragment>
                                    <Grid item xs={12} md={12} style={{ marginBottom: 5 }}>
                                      <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                      Description:
                                      </Typography>
                                      <Typography component="span" color="textSecondary">
                                        {rowData.description}
                                      </Typography>
                                    </Grid>
                                  </React.Fragment>
                                )
                                : null
                            }
                          </React.Fragment>
                        )
                        : ((rowData.expenseTypeMasterValue === 'TRANSPORT' || rowData.expenseTypeMasterValue === 'KMS') && rowData.persons.length > 0)
                          ? (
                            <React.Fragment>
                              <Grid container direction="row">
                                <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                                  <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                    From City:
                                  </Typography>
                                  <Typography component="span" color="textSecondary">
                                    {rowData.fromCityName}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                                  <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                    From State:
                                  </Typography>
                                  <Typography component="span" color="textSecondary">
                                    {rowData.fromStateName}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                                  <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                    From Country:
                                  </Typography>
                                  <Typography component="span" color="textSecondary">
                                    {rowData.fromCountryName}
                                  </Typography>
                                </Grid>
                              </Grid>

                              <Grid container direction="row">
                                <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                                  <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                    To City:
                                  </Typography>
                                  <Typography component="span" color="textSecondary">
                                    {rowData.toCityName}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                                  <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                    To State:
                                  </Typography>
                                  <Typography component="span" color="textSecondary">
                                    {rowData.toStateName}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                                  <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                    To Country:
                                  </Typography>
                                  <Typography component="span" color="textSecondary">
                                    {rowData.toCountryName}
                                  </Typography>
                                </Grid>
                              </Grid>

                              {rowData.expenseTypeMasterValue === 'KMS'
                                ? (
                                  <Grid item xs={12} md={12} style={{ marginBottom: 5 }}>
                                    <Typography component="span" variant="subtitle2" gutterBottom style={{ marginRight: '5px' }}>
                                    Kms:
                                    </Typography>
                                    <Typography component="span" color="textSecondary">
                                      {rowData.kms}
                                    </Typography>
                                  </Grid>
                                )
                                : null}
                            </React.Fragment>
                          )
                          : null
                      }
                      {rowData.expenseTypeMasterValue === 'SUPPORT' || rowData.expenseTypeMasterValue === 'TRANSPORT' || rowData.expenseTypeMasterValue === 'KMS'
                        ? (
                          <Grid item xs={12} md={12} style={{ marginTop: 10 }}>
                            <Typography component="span" variant="subtitle2" gutterBottom>
                              {rowData.expenseTypeMasterValue === 'SUPPORT' ? 'Associated people' : 'Persons to vivit'}
                            </Typography>
                            <Box margin={1}>
                              <Table size="small" aria-label="persons-table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Person Type</TableCell>
                                    <TableCell>Company Name</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Father Family Name</TableCell>
                                    <TableCell>Mother Family Name</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rowData.persons.map((person, index) => (
                                    <TableRow key={index}>
                                      <TableCell style={{ minWidth: 150, width: 150, maxWidth: 150 }}>{person.personTypeName}</TableCell>
                                      <TableCell>{person.companyName}</TableCell>
                                      <TableCell>{person.name}</TableCell>
                                      <TableCell>{person.fatherFamilyName}</TableCell>
                                      <TableCell>{person.motherFamilyName}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Grid>
                        )
                        : null}
                    </CardContent>
                  </Card>
                )}
              />
            </TabContainer>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6} md={6}>
                <Typography variant="h5" align="left" gutterBottom style={{ color: '#F1C40F', marginLeft: 15 }}>
                  {`€ ${this.toCommas((totalPaid).toFixed(2))}`}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5" align="right" gutterBottom style={{ color: '#27AE60', marginRight: 15 }}>
                  {`€ ${this.toCommas((totalAmount).toFixed(2))}`}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {this.state.openMenu
          ? (
            <React.Fragment>
              <Menu
                id="expense-management-export-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={this.state.openMenu}
                onClose={this.handleCloseMenu}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 150
                  },
                }}
              >
                <MenuItem key="csv" onClick={(event) => this.handleExportCSV(event)} value="csv">
                Export as CSV
                </MenuItem>
                <MenuItem key="pdf" onClick={(event) => this.handleExportPDF(event)} value="pdf">
                Export as PDF
                </MenuItem>
              </Menu>
            </React.Fragment>
          )
          : null
        }
        <Confirmation
          openConfirm={this.state.confirmation.openConfirm}
          options={{
            title: this.state.confirmation.titleConfirm,
            text: this.state.confirmation.textConfirm,
            rowData: this.state.rowData,
            status: this.state.status,
            case: 'EXPENSE'
          }}
          data={{
            period: this.state.period,
            startDate: this.state.startDate,
            endDate: this.state.endDate
          }}
          handleNoConfirm={this.handleNoConfirm}
          isLoading={isLoading}
          errors={errors}
          expenseResponse={expenseResponse}
          changeStatusExpense={changeStatusExpense}
          getExpenses={getExpenses}
        />
      </div>
    );
  }
}

ExpensesManagement.propTypes = {
  location: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  expenseResponse: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  allCountrys: state.getIn(['countries']).allCountrys,
  countryResponse: state.getIn(['countries']).countryResponse,

  personTypes: state.getIn(['personType']).personTypes,
  personTypeResponse: state.getIn(['personType']).personTypeResponse,

  voucherTypes: state.getIn(['voucherType']).voucherTypes,
  voucherTypeResponse: state.getIn(['voucherType']).voucherTypeResponse,

  staffExpensesTypes: state.getIn(['staffExpenseType']).staffExpensesTypes,
  staffExpenseTypeResponse: state.getIn(['staffExpenseType']).staffExpenseTypeResponse,

  currencyTypes: state.getIn(['currencyType']).currencyTypes,
  currencyTypeResponse: state.getIn(['currencyType']).currencyTypeResponse,

  currencyData: state.getIn(['currency']).currencyData,
  currencyResponse: state.getIn(['currency']).currencyResponse,

  expenses: state.getIn(['expense']).expenses,
  expenseResponse: state.getIn(['expense']).expenseResponse,

  isLoading: state.getIn(['expense']).isLoading,
  errors: state.getIn(['expense']).errors,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCountry,
  getStaffExpensesTypes,
  getAllPersonTypes,
  getAllVoucherTypes,
  getExpenses,
  changeStatusExpense,
  exportExpenses,
  downloadDocumentOfExpense,
  getCurrencyTypes,
  getDataByCurrencyType,
  getDataAssociatedWithCurrencyTypes
}, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ExpensesManagement)));
