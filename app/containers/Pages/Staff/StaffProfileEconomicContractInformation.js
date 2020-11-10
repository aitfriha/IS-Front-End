import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Button,
  Typography,
  Grid,
  TextField,
  Divider,
  Tooltip,
  IconButton
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MUIDataTable from 'mui-datatables';
import EditIcon from '@material-ui/icons/Edit';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './staff-jss';
import StaffEconomicContractInformationService from '../../Services/StaffEconomicContractInformationService';
import StaffEconomicContractInformationHistoryService from '../../Services/StaffEconomicContractInformationHistoryService';
import { ThemeContext } from '../../App/ThemeWrapper';
import {
  setStaff,
  setEdit,
  getAllStaff,
  updateStaff
} from '../../../redux/staff/actions';

const useStyles = makeStyles(styles);

class StaffProfileEconomicContractInformation extends Component {
  state = {
    contractSalary: 0,
    companyContractCost: 0,
    expenses: 0,
    companyExpensesCost: 0,
    objectives: 0,
    companyObjectivesCost: 0,
    totalCompanyCost: 0,
    contractSalaryDateGoing: new Date(),
    contractSalaryDateOut: new Date(),
    companyContractCostDateGoing: new Date(),
    companyContractCostDateOut: new Date(),
    expensesDateGoing: new Date(),
    expensesDateOut: new Date(),
    companyExpensesCostDateGoing: new Date(),
    companyExpensesCostDateOut: new Date(),
    objectivesDateGoing: new Date(),
    objectivesDateOut: new Date(),
    companyObjectivesCostDateGoing: new Date(),
    companyObjectivesCostDateOut: new Date(),
    totalCompanyCostDateGoing: new Date(),
    totalCompanyCostDateOut: new Date(),
    isEditData: false,
    isViewHistory: false,
    history: []
  };

  columns = [
    {
      name: 'index',
      label: 'Index',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>{tableMeta.rowIndex}</React.Fragment>
        )
      }
    },
    {
      name: 'staffEconomicContractInformationHistory',
      label: 'Created at',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            {new Date(value.createdAt).toISOString().slice(0, 10)}
          </React.Fragment>
        )
      }
    },
    {
      name: 'Actions',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            <Tooltip title="View Data">
              <IconButton
                onClick={() => this.viewHistoryInformation(value, tableMeta)}
              >
                <Visibility color="secondary" />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )
      }
    }
  ];

  componentDidMount() {
    const { staff } = this.props;
    this.setInitialData();
    StaffEconomicContractInformationHistoryService.getStaffEconomicContractInformationHistoryByStaff(
      staff.staffEconomicContractInformationId
    ).then(({ data }) => {
      console.log(data);
      this.setState({
        history: data
      });
    });
  }

  setInitialData = () => {
    const { staff } = this.props;
    this.setState({
      contractSalary: staff.contractSalary,
      companyContractCost: staff.companyContractCost,
      expenses: staff.expenses,
      companyExpensesCost: staff.companyExpensesCost,
      objectives: staff.objectives,
      companyObjectivesCost: staff.companyObjectivesCost,
      totalCompanyCost: staff.totalCompanyCost,
      contractSalaryDateGoing: new Date(staff.contractSalaryDateGoing),
      contractSalaryDateOut: new Date(staff.contractSalaryDateOut),
      companyContractCostDateGoing: new Date(
        staff.companyContractCostDateGoing
      ),
      companyContractCostDateOut: new Date(staff.companyContractCostDateOut),
      expensesDateGoing: new Date(staff.expensesDateGoing),
      expensesDateOut: new Date(staff.expensesDateOut),
      companyExpensesCostDateGoing: new Date(
        staff.companyExpensesCostDateGoing
      ),
      companyExpensesCostDateOut: new Date(staff.companyExpensesCostDateOut),
      objectivesDateGoing: new Date(staff.objectivesDateGoing),
      objectivesDateOut: new Date(staff.objectivesDateOut),
      companyObjectivesCostDateGoing: new Date(
        staff.companyObjectivesCostDateGoing
      ),
      companyObjectivesCostDateOut: new Date(
        staff.companyObjectivesCostDateOut
      ),
      totalCompanyCostDateGoing: new Date(staff.totalCompanyCostDateGoing),
      totalCompanyCostDateOut: new Date(staff.totalCompanyCostDateOut),
      isEditData: false,
      isViewHistory: false
    });
  };

  restoreData = () => {
    const { staff } = this.props;
    this.setState({
      contractSalary: staff.contractSalary,
      companyContractCost: staff.companyContractCost,
      expenses: staff.expenses,
      companyExpensesCost: staff.companyExpensesCost,
      objectives: staff.objectives,
      companyObjectivesCost: staff.companyObjectivesCost,
      totalCompanyCost: staff.totalCompanyCost,
      contractSalaryDateGoing: new Date(staff.contractSalaryDateGoing),
      contractSalaryDateOut: new Date(staff.contractSalaryDateOut),
      companyContractCostDateGoing: new Date(
        staff.companyContractCostDateGoing
      ),
      companyContractCostDateOut: new Date(staff.companyContractCostDateOut),
      expensesDateGoing: new Date(staff.expensesDateGoing),
      expensesDateOut: new Date(staff.expensesDateOut),
      companyExpensesCostDateGoing: new Date(
        staff.companyExpensesCostDateGoing
      ),
      companyExpensesCostDateOut: new Date(staff.companyExpensesCostDateOut),
      objectivesDateGoing: new Date(staff.objectivesDateGoing),
      objectivesDateOut: new Date(staff.objectivesDateOut),
      companyObjectivesCostDateGoing: new Date(
        staff.companyObjectivesCostDateGoing
      ),
      companyObjectivesCostDateOut: new Date(
        staff.companyObjectivesCostDateOut
      ),
      totalCompanyCostDateGoing: new Date(staff.totalCompanyCostDateGoing),
      totalCompanyCostDateOut: new Date(staff.totalCompanyCostDateOut),
      isEditData: false,
      isViewHistory: false
    });
  };

  calcTotal = newValues => {
    const {
      companyContractCost,
      companyExpensesCost,
      companyObjectivesCost
    } = newValues;
    const newTotal = parseInt(companyContractCost)
      + parseInt(companyExpensesCost)
      + parseInt(companyObjectivesCost);
    this.setState({
      totalCompanyCost: newTotal
    });
  };

  handleChange = ev => {
    const { name } = ev.target;
    this.setState({ [name]: ev.target.value });
    if (
      name === 'companyContractCost'
      || name === 'companyExpensesCost'
      || name === 'companyObjectivesCost'
    ) {
      const newValues = {
        ...this.state,
        [name]: ev.target.value
      };
      this.calcTotal(newValues);
    }
  };

  handleDateValue = (value, name) => {
    this.setState({
      [name]: value
    });
  };

  handleCancel = () => {
    this.restoreData();
  };

  handleUpdate = () => {
    const { staff } = this.props;
    const {
      contractSalary,
      companyContractCost,
      expenses,
      companyExpensesCost,
      objectives,
      companyObjectivesCost,
      totalCompanyCost,
      contractSalaryDateGoing,
      contractSalaryDateOut,
      companyContractCostDateGoing,
      companyContractCostDateOut,
      expensesDateGoing,
      expensesDateOut,
      companyExpensesCostDateGoing,
      companyExpensesCostDateOut,
      objectivesDateGoing,
      objectivesDateOut,
      companyObjectivesCostDateGoing,
      companyObjectivesCostDateOut,
      totalCompanyCostDateGoing,
      totalCompanyCostDateOut,
      history
    } = this.state;

    const id = staff.staffEconomicContractInformationId;
    const economicContractInformation = {
      contractSalary,
      companyContractCost,
      expenses,
      companyExpensesCost,
      objectives,
      companyObjectivesCost,
      totalCompanyCost,
      contractSalaryDateGoing: contractSalaryDateGoing
        .toISOString()
        .slice(0, 10),
      contractSalaryDateOut: contractSalaryDateOut.toISOString().slice(0, 10),
      companyContractCostDateGoing: companyContractCostDateGoing
        .toISOString()
        .slice(0, 10),
      companyContractCostDateOut: companyContractCostDateOut
        .toISOString()
        .slice(0, 10),
      expensesDateGoing: expensesDateGoing.toISOString().slice(0, 10),
      expensesDateOut: expensesDateOut.toISOString().slice(0, 10),
      companyExpensesCostDateGoing: companyExpensesCostDateGoing
        .toISOString()
        .slice(0, 10),
      companyExpensesCostDateOut: companyExpensesCostDateOut
        .toISOString()
        .slice(0, 10),
      objectivesDateGoing: objectivesDateGoing.toISOString().slice(0, 10),
      objectivesDateOut: objectivesDateOut.toISOString().slice(0, 10),
      companyObjectivesCostDateGoing: companyObjectivesCostDateGoing
        .toISOString()
        .slice(0, 10),
      companyObjectivesCostDateOut: companyObjectivesCostDateOut
        .toISOString()
        .slice(0, 10),
      totalCompanyCostDateGoing: totalCompanyCostDateGoing
        .toISOString()
        .slice(0, 10),
      totalCompanyCostDateOut: totalCompanyCostDateOut
        .toISOString()
        .slice(0, 10)
    };

    StaffEconomicContractInformationService.updateStaffEconomicContractInformation(
      id,
      economicContractInformation
    ).then(({ data }) => {
      const object = {
        ...economicContractInformation,
        createdAt: new Date()
      };
      history.push({ staffEconomicContractInformationHistory: object });
      console.log('pushed');
      this.setState({
        isEditData: false,
        history
      });
    });
  };

  handleOpenEdit = () => {
    this.setState({
      isEditData: true
    });
  };

  viewHistoryInformation = (value, tableMeta) => {
    const { history } = this.state;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    const data = history[index].staffEconomicContractInformationHistory;
    this.setState({
      contractSalary: data.contractSalary,
      companyContractCost: data.companyContractCost,
      expenses: data.expenses,
      companyExpensesCost: data.companyExpensesCost,
      objectives: data.objectives,
      companyObjectivesCost: data.companyObjectivesCost,
      totalCompanyCost: data.totalCompanyCost,
      contractSalaryDateGoing: new Date(data.contractSalaryDateGoing),
      contractSalaryDateOut: new Date(data.contractSalaryDateOut),
      companyContractCostDateGoing: new Date(data.companyContractCostDateGoing),
      companyContractCostDateOut: new Date(data.companyContractCostDateOut),
      expensesDateGoing: new Date(data.expensesDateGoing),
      expensesDateOut: new Date(data.expensesDateOut),
      companyExpensesCostDateGoing: new Date(data.companyExpensesCostDateGoing),
      companyExpensesCostDateOut: new Date(data.companyExpensesCostDateOut),
      objectivesDateGoing: new Date(data.objectivesDateGoing),
      objectivesDateOut: new Date(data.objectivesDateOut),
      companyObjectivesCostDateGoing: new Date(
        data.companyObjectivesCostDateGoing
      ),
      companyObjectivesCostDateOut: new Date(data.companyObjectivesCostDateOut),
      totalCompanyCostDateGoing: new Date(data.totalCompanyCostDateGoing),
      totalCompanyCostDateOut: new Date(data.totalCompanyCostDateOut),
      isViewHistory: true
    });
  };

  render() {
    const { classes } = this.props;
    const {
      contractSalary,
      companyContractCost,
      expenses,
      companyExpensesCost,
      objectives,
      companyObjectivesCost,
      totalCompanyCost,
      contractSalaryDateGoing,
      contractSalaryDateOut,
      companyContractCostDateGoing,
      companyContractCostDateOut,
      expensesDateGoing,
      expensesDateOut,
      companyExpensesCostDateGoing,
      companyExpensesCostDateOut,
      objectivesDateGoing,
      objectivesDateOut,
      companyObjectivesCostDateGoing,
      companyObjectivesCostDateOut,
      totalCompanyCostDateGoing,
      totalCompanyCostDateOut,
      isEditData,
      history,
      isViewHistory
    } = this.state;
    console.log(contractSalaryDateGoing.toISOString());

    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 3,
      rowsPerPageOptions: [3]
    };

    return (
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <div className={classes.divSpace}>
          <Typography
            variant="subtitle1"
            style={{
              fontFamily: 'sans-serif , Arial',
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: 15
            }}
            color="secondary"
          >
            Economic Information :
          </Typography>
          {!isEditData ? (
            <div>
              <Tooltip title="Return">
                <Button
                  name="restore"
                  style={{ backgroundColor: 'transparent' }}
                  disableRipple
                  endIcon={<SettingsBackupRestoreIcon />}
                  onClick={this.restoreData}
                  disabled={!isViewHistory}
                />
              </Tooltip>
              <Tooltip title="Edit">
                <Button
                  name="personalInformation"
                  style={{ backgroundColor: 'transparent' }}
                  disableRipple
                  endIcon={<EditIcon />}
                  onClick={this.handleOpenEdit}
                />
              </Tooltip>
            </div>
          ) : (
            <div />
          )}
        </div>

        {!isEditData ? (
          <div>
            <div className={classes.divEconomicInline}>
              <div style={{ width: '35%' }} />
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                  color="secondary"
                >
                  {'Value'}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                  color="secondary"
                >
                  {'Date Going'}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                  color="secondary"
                >
                  {'Date Out'}
                </Typography>
              </div>
            </div>
            <div className={classes.divEconomicInline}>
              <div style={{ width: '35%' }}>
                <Typography
                  variant="subtitle1"
                  className={classes.normalTypography}
                >
                  {'Contract Salary: '}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {contractSalary}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {contractSalaryDateGoing.toISOString().slice(0, 10)}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {contractSalaryDateOut.toISOString().slice(0, 10)}
                </Typography>
              </div>
            </div>
            <div className={classes.divEconomicInline}>
              <div style={{ width: '35%' }}>
                <Typography
                  variant="subtitle1"
                  className={classes.normalTypography}
                >
                  {'Company Contract Cost: '}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {companyContractCost}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {companyContractCostDateGoing.toISOString().slice(0, 10)}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {companyContractCostDateOut.toISOString().slice(0, 10)}
                </Typography>
              </div>
            </div>
            <div className={classes.divEconomicInline}>
              <div style={{ width: '35%' }}>
                <Typography
                  variant="subtitle1"
                  className={classes.normalTypography}
                >
                  {'Expenses: '}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {expenses}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {expensesDateGoing.toISOString().slice(0, 10)}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {expensesDateOut.toISOString().slice(0, 10)}
                </Typography>
              </div>
            </div>
            <div className={classes.divEconomicInline}>
              <div style={{ width: '35%' }}>
                <Typography
                  variant="subtitle1"
                  className={classes.normalTypography}
                >
                  {'Company Expenses Cost: '}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {companyExpensesCost}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {companyExpensesCostDateGoing.toISOString().slice(0, 10)}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {companyExpensesCostDateOut.toISOString().slice(0, 10)}
                </Typography>
              </div>
            </div>
            <div className={classes.divEconomicInline}>
              <div style={{ width: '35%' }}>
                <Typography
                  variant="subtitle1"
                  className={classes.normalTypography}
                >
                  {'Objectives: '}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {objectives}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {objectivesDateGoing.toISOString().slice(0, 10)}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {objectivesDateOut.toISOString().slice(0, 10)}
                </Typography>
              </div>
            </div>
            <div className={classes.divEconomicInline}>
              <div style={{ width: '35%' }}>
                <Typography
                  variant="subtitle1"
                  className={classes.normalTypography}
                >
                  {'Company Objectives Cost: '}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {companyObjectivesCost}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {companyObjectivesCostDateGoing.toISOString().slice(0, 10)}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {companyObjectivesCostDateOut.toISOString().slice(0, 10)}
                </Typography>
              </div>
            </div>
            <Divider variant="middle" />
            <div
              className={classes.divEconomicInline}
              style={{ marginTop: 10 }}
            >
              <div style={{ width: '35%' }}>
                <Typography
                  variant="subtitle1"
                  className={classes.normalTypography}
                >
                  {'Total Company Cost: '}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {totalCompanyCost}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {totalCompanyCostDateGoing.toISOString().slice(0, 10)}
                </Typography>
              </div>
              <div style={{ width: '20%' }}>
                <Typography
                  variant="subtitle1"
                  className={
                    isViewHistory
                      ? classes.historyTypography
                      : classes.normalTypography
                  }
                >
                  {totalCompanyCostDateOut.toISOString().slice(0, 10)}
                </Typography>
              </div>
            </div>
            <MUIDataTable
              title=""
              data={history}
              columns={this.columns}
              options={options}
            />
          </div>
        ) : (
          <Grid
            container
            spacing={0}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} md={8}>
              <div className={classes.divSpace} style={{ width: '100%' }}>
                <TextField
                  id="outlined-basic"
                  label="Contract Salary"
                  variant="outlined"
                  name="contractSalary"
                  type="number"
                  style={{ width: '30%', marginTop: 33 }}
                  value={contractSalary}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="contractSalaryDateGoing"
                    label="Date going"
                    value={contractSalaryDateGoing}
                    onChange={value => this.handleDateValue(value, 'contractSalaryDateGoing')
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="contractSalaryDateOut"
                    label="Date out"
                    value={contractSalaryDateOut}
                    onChange={value => this.handleDateValue(value, 'contractSalaryDateOut')
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className={classes.divSpace} style={{ width: '100%' }}>
                <TextField
                  id="outlined-basic"
                  label="Company Contract Cost"
                  variant="outlined"
                  name="companyContractCost"
                  type="number"
                  style={{ width: '30%', marginTop: 33 }}
                  value={companyContractCost}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="companyContractCostDateGoing"
                    label="Date going"
                    value={companyContractCostDateGoing}
                    onChange={value => this.handleDateValue(
                      value,
                      'companyContractCostDateGoing'
                    )
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="companyContractCostDateOut"
                    label="Date out"
                    value={companyContractCostDateOut}
                    onChange={value => this.handleDateValue(value, 'companyContractCostDateOut')
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className={classes.divSpace} style={{ width: '100%' }}>
                <TextField
                  id="outlined-basic"
                  label="Expenses"
                  variant="outlined"
                  name="expenses"
                  type="number"
                  style={{ width: '30%', marginTop: 33 }}
                  value={expenses}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="expensesDateGoing"
                    label="Date Going"
                    value={expensesDateGoing}
                    onChange={value => this.handleDateValue(value, 'expensesDateGoing')
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="expensesDateOut"
                    label="Date Out"
                    value={expensesDateOut}
                    onChange={value => this.handleDateValue(value, 'expensesDateOut')
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className={classes.divSpace} style={{ width: '100%' }}>
                <TextField
                  id="outlined-basic"
                  label="Company Expenses Cost"
                  variant="outlined"
                  name="companyExpensesCost"
                  type="number"
                  style={{ width: '30%', marginTop: 33 }}
                  value={companyExpensesCost}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="companyExpensesCostDateGoing"
                    label="Date Going"
                    value={companyExpensesCostDateGoing}
                    onChange={value => this.handleDateValue(
                      value,
                      'companyExpensesCostDateGoing'
                    )
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="companyExpensesCostDateOut"
                    label="Date Out"
                    value={companyExpensesCostDateOut}
                    onChange={value => this.handleDateValue(value, 'companyExpensesCostDateOut')
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className={classes.divSpace} style={{ width: '100%' }}>
                <TextField
                  id="outlined-basic"
                  label="Objectives"
                  variant="outlined"
                  name="objectives"
                  type="number"
                  style={{ width: '30%', marginTop: 33 }}
                  value={objectives}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="objectivesDateGoing"
                    label="Date Going"
                    value={objectivesDateGoing}
                    onChange={value => this.handleDateValue(value, 'objectivesDateGoing')
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="objectivesDateOut"
                    label="Date Out"
                    value={objectivesDateOut}
                    onChange={value => this.handleDateValue(value, 'objectivesDateOut')
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className={classes.divSpace} style={{ width: '100%' }}>
                <TextField
                  id="outlined-basic"
                  label="Company Objectives Cost "
                  variant="outlined"
                  name="companyObjectivesCost"
                  type="number"
                  style={{ width: '30%', marginTop: 33 }}
                  value={companyObjectivesCost}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="companyObjectivesCostDateGoing"
                    label="Date Going"
                    value={companyObjectivesCostDateGoing}
                    onChange={value => this.handleDateValue(
                      value,
                      'companyObjectivesCostDateGoing'
                    )
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="companyObjectivesCostDateOut"
                    label="Date Out"
                    value={companyObjectivesCostDateOut}
                    onChange={value => this.handleDateValue(
                      value,
                      'companyObjectivesCostDateOut'
                    )
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className={classes.divSpace} style={{ width: '100%' }}>
                <TextField
                  id="outlined-basic"
                  label="Total Company Cost"
                  variant="outlined"
                  name="totalCompanyCost"
                  type="number"
                  style={{ width: '30%', marginTop: 33 }}
                  value={totalCompanyCost}
                  disabled
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="totalCompanyCostDateGoing"
                    label="Date Going"
                    value={totalCompanyCostDateGoing}
                    onChange={value => this.handleDateValue(value, 'totalCompanyCostDateGoing')
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    name="totalCompanyCostDateOut"
                    label="Date Out"
                    value={totalCompanyCostDateOut}
                    onChange={value => this.handleDateValue(value, 'totalCompanyCostDateOut')
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    style={{ width: '30%' }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className={classes.divSpace} style={{ marginTop: 20 }}>
                <Button
                  className={classes.textField}
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className={classes.textField}
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={this.handleUpdate}
                >
                  Update
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  staff: state.getIn(['staffs']).selectedStaff,
  allStaff: state.getIn(['staffs']).allStaff,
  staffResponse: state.getIn(['staffs']).staffResponse,
  isLoadingStaff: state.getIn(['staffs']).isLoading,
  errorsStaff: state.getIn(['staffs']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateStaff,
    getAllStaff,
    setStaff,
    setEdit
  },
  dispatch
);

const StaffProfileEconomicContractInformationMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffProfileEconomicContractInformation);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <StaffProfileEconomicContractInformationMapped
      changeTheme={changeTheme}
      classes={classes}
    />
  );
};
