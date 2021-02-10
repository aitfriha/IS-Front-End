import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import Edit from '@material-ui/icons/Edit';
import MaterialTable, { MTableToolbar } from 'material-table';

import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Fab,
  Tooltip,
  Select,
  Menu,
  IconButton,
  MenuItem,
  Button
} from '@material-ui/core';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { CsvBuilder } from 'filefy';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
import { WeeklyReportDetail } from './WeeklyReportDetail';
import notification from '../../../../components/Notification/Notification';

import {
  saveWeeklyReport,
  getSummarizedWeeklyReport,
  getExtendedWeeklyReport
} from '../../../../redux/weeklyReport/actions';

import {
  getAllCustomerContractsByEmployee,
  getAllOperationsByEmployeeAndCustomer
} from '../../../../redux/staffAssignment/actions';

import {
  getWeeklyReportConfig
} from '../../../../redux/weeklyReportConfig/actions';

import {
  getAllAssignmentTypes
} from '../../../../redux/assignmentType/actions';


import {
  getStaffByCompanyEmail
} from '../../../../redux/staff/actions';


let self = null;

const styles = {};

let logedUser = localStorage.getItem('logedUser');

let employeeId = '';

const ITEM_HEIGHT = 40;

const today = new Date();
const minimunDate = new Date('1990-01-01');

class WeeklyReport extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      searchComplete: true,
      anchorEl: null,
      openMenu: false,
      period: 'month',
      startDate: null,
      endDate: null,
      columns: [
        {
          title: 'Employee Id', // intl.formatMessage({ id: 'connection.id' }),
          field: 'employeeId',
          searchable: false,
          hidden: true,
          export: false
        },
        {
          title: 'Employee Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'employee',
          searchable: true,
          hidden: true, // SET TO FALSE WHEN THE USER BE A SUPERVISOR
          defaultGroupOrder: -1, // SET TO 0 WHEN THE USER BE A SUPERVISOR,
          export: true
        },
        {
          title: 'Company Email', // intl.formatMessage({ id: 'connection.id' }),
          field: 'companyEmail',
          searchable: false,
          hidden: true,
          export: false
        },
        {
          title: 'Year', // intl.formatMessage({ id: 'connection.id' }),
          field: 'year',
          searchable: false,
          hidden: true
        },
        {
          title: 'Week', // intl.formatMessage({ id: 'connection.id' }),
          field: 'week',
          searchable: false,
          hidden: true
        },
        {
          title: 'Year/Week', // intl.formatMessage({ id: 'connection.id' }),
          field: 'weekOfYear',
          searchable: true,
          defaultGroupOrder: 0, // SET TO 1 WHEN THE USER BE A SUPERVISOR,
          export: true
        },
        {
          title: 'Assigned Cost', // intl.formatMessage({ id: 'connection.name' }),
          field: 'assignedCost',
          searchable: true,
          minWidth: 180,
          width: 180,
          export: true
        },
        {
          title: 'Operation Name/ Absenses / Local Bank Holidays', // intl.formatMessage({ id: 'connection.database' }),
          field: 'concept',
          searchable: true,
          minWidth: 250,
          width: 250,
          export: true
        },
        {
          title: 'Deliverable', // intl.formatMessage({ id: 'connection.engine' }),
          field: 'deliverable',
          searchable: true,
          minWidth: 200,
          width: 200,
          export: true
        },
        {
          title: 'Assignment Type', // intl.formatMessage({ id: 'connection.server' }),
          field: 'assignmentType',
          searchable: true,
          minWidth: 135,
          width: 135,
          maxWidth: 135,
          export: true
        },
        {
          title: 'Days', // intl.formatMessage({ id: 'connection.server' }),
          field: 'days',
          searchable: true,
          minWidth: 90,
          width: 90,
          maxWidth: 90,
          export: true
        },
        /* {
          title: 'Register Date',//intl.formatMessage({ id: 'connection.server' }),
          field: 'registerDate',
          searchable: true,
          minWidth: 150,
          export: true,
          render: rowData => {
            return new Date(rowData.registerDate).toLocaleString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
          }
        } */
      ],
      components: {
        Toolbar: props => (
          <div>
            <MTableToolbar {...props} />
            <Tooltip title="Add weekly report">
              <span>
                <Fab size="small" color="primary" aria-label="add" style={{ marginBottom: '15px', marginLeft: '20px' }}>
                  <AddIcon onClick={evt => this.handleWeeklyReport(evt, null)} />
                </Fab>
              </span>
            </Tooltip>
            <Grid style={{ marginLeft: '20px', marginBottom: '15px' }}>
              <FormControl style={{ marginTop: '19px', minWidth: '14%', width: '14%' }} size="small">
                <InputLabel htmlFor="combo-priod">Filter by period</InputLabel>
                <Select
                  id="combo-priod"
                  value={this.state.period}
                  onChange={(e) => this.handlePeriodChange(e)}
                >
                  <MenuItem value="month">Current month</MenuItem>
                  <MenuItem value="year">Current year</MenuItem>
                  <MenuItem value="another">Another period</MenuItem>
                </Select>
              </FormControl>

              {this.state.period === 'another'
                ? (
                  <React.Fragment>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="start-date-picker"
                        label="Start date"
                        value={this.state.startDate}
                        onChange={(date) => this.handleDateChange(date, 'startDate')}
                        style={{ minWidth: '14%', width: '14%', marginLeft: '25px' }}
                        autoOk
                        minDate={minimunDate}
                        maxDate={this.state.endDate ? this.state.endDate : today}
                        disableFuture
                      />
                    </MuiPickersUtilsProvider>


                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="End date"
                        value={this.state.endDate}
                        onChange={(date) => this.handleDateChange(date, 'endDate')}
                        style={{ minWidth: '14%', width: '14%', marginLeft: '25px' }}
                        autoOk
                        minDate={this.state.startDate ? this.state.startDate : minimunDate}
                        maxDate={today}
                        disableFuture
                      />
                    </MuiPickersUtilsProvider>
                  </React.Fragment>
                ) : null}
              <IconButton
                disabled={this.state.period === 'another' && !this.state.startDate && !this.state.endDate}
                style={{ marginLeft: '10px', marginTop: '25px' }}
                onClick={(e) => this.handleFilterData(e)}
              >
                <SearchIcon />
              </IconButton>
              {this.state.period === 'another'
                ? (
                  <IconButton
                    disabled={this.state.period === 'another' && !this.state.startDate && !this.state.endDate}
                    style={{ marginTop: '25px' }}
                    onClick={(e) => this.handleClearDates(e)}
                  >
                    <ClearIcon />
                  </IconButton>
                )
                : null}
            </Grid>
          </div>
        )
      },
      openDialog: false,
      dataDialog: null
    };
  }


  validRow = (rowData) => {
    const { weeklyReportConfig } = this.props;

    const objDate = new Date(rowData.registerDate);
    objDate.setDate(objDate.getDate() + weeklyReportConfig.numberOfDays);
    objDate.setHours(0, 0, 0, 0);
    const actualDate = new Date();
    actualDate.setHours(0, 0, 0, 0);

    const valid = (objDate >= actualDate && companyEmail === rowData.companyEmail) || weeklyReportConfig.employees.includes(companyEmail);
    return valid;
  }


  componentDidMount() {
    const { getSummarizedWeeklyReport, getExtendedWeeklyReport, getAllCustomerContractsByEmployee, getWeeklyReportConfig, getAllAssignmentTypes, getStaffByCompanyEmail, staff } = this.props;

    let logedUserData = JSON.parse(logedUser);
    getStaffByCompanyEmail(logedUserData.userEmail);
  
    employeeId = staff.staffId;

    const data = {
      employeeId: employeeId,
      period: 'month',
      startDate: null,
      endDate: null
    };
    getSummarizedWeeklyReport(data);
    getWeeklyReportConfig();
    getAllAssignmentTypes();

    const params = {
      employeeId: employeeId
    };
    getExtendedWeeklyReport(params);
    getAllCustomerContractsByEmployee(employeeId);

  }

  componentWillUnmount() {
    this.setState({
      anchorEl: null,
      openMenu: false,
      openDialog: false,
      dataDialog: null
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


  //----------------------------------------------------------------------------------------------

  // HANDLE ACTIONS

  handleFilterData = (e) => {
    this.setState({
      searchComplete: true,
    });
    const { getSummarizedWeeklyReport } = this.props;
    const data = {
      employeeId,
      period: this.state.period,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    getSummarizedWeeklyReport(data);
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

  handleWeeklyReport = (e, rowData) => {
    const { getExtendedWeeklyReport, getAllCustomerContractsByEmployee } = this.props;
    const currentDate = new Date();
    const params = {
      employeeId: rowData ? rowData.employeeId : employeeId,
      year: rowData ? rowData.year : currentDate.getFullYear(),
      week: rowData ? rowData.week : this.getWeekOfYear(currentDate)
    };
    getAllCustomerContractsByEmployee(params.employeeId);
    getExtendedWeeklyReport(params);

    this.setState({
      openDialog: true,
      dataDialog: params
    });
  }


  handleClose(afterSaveAction) {
    self.setState({
      openDialog: false,
      dataDialog: null,
      period: afterSaveAction ? 'month' : self.state.period
    });
  }

  handleSave(evt) {

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
    const { summarizedWeeklyReport } = this.props;

    self.setState({
      anchorEl: null,
      openMenu: false
    });

    const finalColumns = self.state.columns.filter(col => col.field && (!col.hidden || (col.field === 'year' || col.field === 'week')) && col.export);

    summarizedWeeklyReport.sort((a, b) => ((a.year > b.year) ? 1 : (a.year === b.year) ? ((a.week > b.week) ? 1 : -1) : -1));

    const finalData = summarizedWeeklyReport.map(rowData => finalColumns.map(col => (col.field !== 'registerDate' ? rowData[col.field] : new Date(rowData[col.field]).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }))));

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = this.getMonthInLetter(today.getMonth());
    let period = '';
    switch (this.state.period) {
      case 'month': {
        period = currentMonth + ', ' + currentYear;
        break;
      }
      case 'year': {
        period = currentYear;
        break;
      }
      default: {
        if (this.state.startDate == null || this.state.endDate == null) {
          if (this.state.startDate != null) {
            period = `from ${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.state.startDate)}-${new Intl.DateTimeFormat('en', { month: 'short' }).format(this.state.startDate)}-${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.state.startDate)}`;
          } else {
            period = `until ${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.state.endDate)}-${new Intl.DateTimeFormat('en', { month: 'short' }).format(this.state.endDate)}-${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.state.endDate)}`;
          }
        } else {
          period = `${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.state.startDate)}-${new Intl.DateTimeFormat('en', { month: 'short' }).format(this.state.startDate)}-${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.state.startDate)} to ${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.state.endDate)}-${new Intl.DateTimeFormat('en', { month: 'short' }).format(this.state.endDate)}-${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.state.endDate)}`;
        }
        break;
      }
    }
    const builder = new CsvBuilder('Weekly report history - (' + period + ').csv');
    builder
      .setDelimeter(',')
      .setColumns(finalColumns.map(column => column.title))
      .addRows(finalData)
      .exportFile();
  }

  handleExportPDF(event) {
    const { summarizedWeeklyReport } = this.props;

    self.setState({
      anchorEl: null,
      openMenu: false
    });

    const filterColumns = self.state.columns.filter(col => col.field && (!col.hidden || (col.field === 'year' || col.field === 'week')) && col.export);

    const finalColumns = filterColumns.map(col => col.title);

    summarizedWeeklyReport.sort((a, b) => ((a.year > b.year) ? 1 : (a.year === b.year) ? ((a.week > b.week) ? 1 : -1) : -1));

    const finalData = summarizedWeeklyReport.map(rowData => filterColumns.map(col => (col.field !== 'registerDate' ? rowData[col.field] : new Date(rowData[col.field]).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }))));

    const pdf = new jsPDF('portrait', 'pt', 'A4');
    pdf.setDrawColor('#82E0AA');
    pdf.setFillColor(255, 0, 0);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Weekly report history', 250, 25);
    pdf.setFontSize(10);
    pdf.text(fullName, 40, 50);
    pdf.autoTable({
      theme: 'striped',
      headStyles: {
        fillColor: '#82E0AA',
        textColor: '#000000'
      },
      startY: 55,
      head: [finalColumns],
      body: finalData,
    });

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = this.getMonthInLetter(today.getMonth());
    let period = '';
    switch (this.state.period) {
      case 'month': {
        period = currentMonth + ', ' + currentYear;
        break;
      }
      case 'year': {
        period = currentYear;
        break;
      }
      default: {
        if (this.state.startDate == null || this.state.endDate == null) {
          if (this.state.startDate != null) {
            period = `from ${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.state.startDate)}-${new Intl.DateTimeFormat('en', { month: 'short' }).format(this.state.startDate)}-${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.state.startDate)}`;
          } else {
            period = `until ${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.state.endDate)}-${new Intl.DateTimeFormat('en', { month: 'short' }).format(this.state.endDate)}-${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.state.endDate)}`;
          }
        } else {
          period = `${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.state.startDate)}-${new Intl.DateTimeFormat('en', { month: 'short' }).format(this.state.startDate)}-${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.state.startDate)} to ${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.state.endDate)}-${new Intl.DateTimeFormat('en', { month: 'short' }).format(this.state.endDate)}-${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.state.endDate)}`;
        }
        break;
      }
    }
    pdf.save('Weekly report history - (' + period + ').pdf');
  }


  //-------------------------------------------------------------------------------------------------------

  render() {
    const {
      location, intl, isLoading, errors, summarizedWeeklyReport, customerContracts, getExtendedWeeklyReport, extendedWeeklyReport, assignmentTypes, saveWeeklyReport, getSummarizedWeeklyReport, weeklyReportResponse
    } = this.props;
    const { columns } = this.state;

    return (
      <div>
        <HelmetCustom location={location} />
        {!this.state.openDialog
          ? (
            <MaterialTable
              title=""
              columns={columns}
              data={summarizedWeeklyReport && summarizedWeeklyReport}
              actions={
                [
                  rowData => ({
                    disabled: !rowData.editable || !this.validRow(rowData),
                    icon: () => <Edit variant="outlined" color="action" name="edit" />,
                    tooltip: 'Edit', // intl.formatMessage({ id: 'table.column.actions.edit' }),
                    onClick: evt => this.handleWeeklyReport(evt, rowData)
                  }),
                  {
                    icon: 'save_alt',
                    tooltip: 'Export',
                    disabled: !this.state.searchComplete || !summarizedWeeklyReport.length > 0 || (this.state.period === 'another' && !this.state.startDate && !this.state.endDate),
                    isFreeAction: true,
                    onClick: (event) => this.handleOpenMenu(event)
                  },
                ]
              }
              // localization={localizationMaterialTable(intl)}
              components={this.state.components}
              options={{
                actionsColumnIndex: -1,
                grouping: true,
                /* actionsCellStyle: {
                  paddingLeft: 5,
                  minWidth: 50,
                  width: 50
                } */
              }}
            />
          )
          : (
            <WeeklyReportDetail
              obj={this.state.dataDialog}
              customerContracts={customerContracts}
              extendedWeeklyReport={extendedWeeklyReport}
              allAssignmentTypes={assignmentTypes}
              isLoading={isLoading}
              errors={errors}
              weeklyReportResponse={weeklyReportResponse}
              handleClose={this.handleClose}
              saveWeeklyReport={saveWeeklyReport}
              getSummarizedWeeklyReport={getSummarizedWeeklyReport}
            />
          )}
        {this.state.openMenu
          ? (
            <React.Fragment>
              <Menu
                id="long-menu"
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
      </div>
    );
  }
}

WeeklyReport.propTypes = {
  location: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  weeklyReportResponse: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  summarizedWeeklyReport: state.getIn(['weeklyReport']).summarizedWeeklyReport,
  extendedWeeklyReport: state.getIn(['weeklyReport']).extendedWeeklyReport,
  weeklyReportResponse: state.getIn(['weeklyReport']).weeklyReportResponse,
  isLoading: state.getIn(['weeklyReport']).isLoading,
  errors: state.getIn(['weeklyReport']).errors,

  weeklyReportConfig: state.getIn(['weeklyReportConfig']).weeklyReportConfig,
  // weeklyReportConfigResponse: state.getIn(['weeklyReportConfig']).weeklyReportConfigResponse,

  customerContracts: state.getIn(['staffAssignment']).customerContracts,
  operations: state.getIn(['staffAssignment']).operations,
  // staffAssignmentResponse: state.getIn(['staffAssignment']).staffAssignmentResponse,

  assignmentTypes: state.getIn(['assignmentType']).assignmentTypes,

  staff: state.getIn(['staffs']).staff

});

const mapDispatchToProps = dispatch => bindActionCreators({
  saveWeeklyReport,
  getSummarizedWeeklyReport,
  getExtendedWeeklyReport,
  getWeeklyReportConfig,
  getAllCustomerContractsByEmployee,
  getAllOperationsByEmployeeAndCustomer,
  getAllAssignmentTypes,
  getStaffByCompanyEmail
}, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(WeeklyReport)));
