import React, { Component } from 'react';
import { Grid, TextField, withStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import PropTypes from 'prop-types';

import styles from './staff-jss';

class StaffEconomicContractInformation extends Component {
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
    totalCompanyCostDateOut: new Date()
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
    const { handleChangeValue } = this.props;
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
    handleChangeValue(ev);
  };

  handleDateValue = (value, name) => {
    const { handleChangeDateValue } = this.props;
    this.setState({
      [name]: value
    });
    handleChangeDateValue(value, name);
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
      totalCompanyCostDateOut
    } = this.state;
    return (
      <Grid
        container
        spacing={5}
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
                onChange={value => this.handleDateValue(value, 'companyContractCostDateGoing')
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
                onChange={value => this.handleDateValue(value, 'companyExpensesCostDateGoing')
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
                onChange={value => this.handleDateValue(value, 'companyObjectivesCostDateGoing')
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
                onChange={value => this.handleDateValue(value, 'companyObjectivesCostDateOut')
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
      </Grid>
    );
  }
}

StaffEconomicContractInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChangeValue: PropTypes.func.isRequired,
  handleChangeDateValue: PropTypes.func.isRequired
};

export default withStyles(styles)(StaffEconomicContractInformation);
