import React from 'react';
import {
  Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EconomicStaffService from '../../../Services/EconomicStaffService';
import CurrencyService from '../../../Services/CurrencyService';

class ConsultStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      economicStaffId: '',
      staffId: '',
      companyId: '',
      changeFactor: '',
      company: '',
      employeeNumber: '',
      name: '',
      fatherName: '',
      motherName: '',
      highDate: '',
      lowDate: '',
      grosSalary: 0,
      netSalary: 0,
      contributionSalary: 0,
      companyCost: 0,
      grosSalaryEuro: 0,
      netSalaryEuro: 0,
      contributionSalaryEuro: 0,
      companyCostEuro: 0,
      contractModel: '',
      paymentDate: '',
      yearPayment: '',
      monthPayment: '',
      extraordinaryExpenses: 0,
      extraordinaryExpensesEuro: 0,
      extraordinaryObjectives: 0,
      extraordinaryObjectivesEuro: 0,
      travelExpenses: 0,
      travelExpensesEuro: 0,
      salaryCompanyCost: 0,
      salaryCompanyCostEuro: 0,
      totalPayment: 0,
      totalPaymentEuro: 0,
      currencyCode: '',
      open: false,
      consultYear: ''
    };
  }

    // eslint-disable-next-line react/sort-comp
    editingPromiseResolve = () => {};

    componentDidMount() {
      CurrencyService.getCurrency().then(result => {
        this.setState({ currencies: result.data });
      });
    }

    componentWillReceiveProps(props) {
      // eslint-disable-next-line react/prop-types
      const economicStaff = props.Infos2;
      console.log(economicStaff);
      if (economicStaff._id) {
        this.setState({
          economicStaffId: economicStaff._id,
          staffId: economicStaff.staff.staffId,
          companyId: economicStaff.financialCompany._id,
          changeFactor: economicStaff.changeFactor,
          company: economicStaff.financialCompany.name,
          employeeNumber: economicStaff.employeeNumber,
          name: economicStaff.staff.firstName,
          fatherName: economicStaff.fatherName,
          motherName: economicStaff.motherName,
          highDate: economicStaff.highDate,
          lowDate: economicStaff.lowDate,
          contractModel: economicStaff.staff.staffContract.contractModel.name,
          currencyCode: economicStaff.currency.currencyCode
        });
      }
    }

    handleChange = (ev) => {
      // eslint-disable-next-line react/destructuring-assignment
      let { changeFactor } = this.state;
      if (ev.target.name === 'currencyId') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const { netSalary, contributionSalary } = this.state;
        let currencyCode;
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.currencies.map(currency => {
          if (currency.currencyId === ev.target.value) {
            // eslint-disable-next-line prefer-destructuring
            changeFactor = currency.changeFactor; currencyCode = currency.currencyCode;
          }
        });
        this.setState({
          netSalaryEuro: netSalary * changeFactor, contributionSalaryEuro: contributionSalary * changeFactor, changeFactor, currencyCode
        });
      }
      if (ev.target.name === 'grosSalary') {
        this.setState({ grosSalaryEuro: ev.target.value * changeFactor });
      }
      if (ev.target.name === 'netSalary') {
        this.setState({ netSalaryEuro: ev.target.value * changeFactor });
      }
      if (ev.target.name === 'contributionSalary') {
        this.setState({ contributionSalaryEuro: ev.target.value * changeFactor });
      }
      if (ev.target.name === 'companyCost') {
        this.setState({ companyCostEuro: ev.target.value * changeFactor });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleGoBack = () => {
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      this.props.callsbackFromParent2(false);
    }

    render() {
      console.log(this.state);
      const {
        name, fatherName, motherName, highDate, lowDate, company, employeeNumber, totalPayment, totalPaymentEuro,
        grosSalary, netSalary, contributionSalary, companyCost, contractModel, currencyCode,
        grosSalaryEuro, netSalaryEuro, contributionSalaryEuro, companyCostEuro,
        consultYear, travelExpenses, travelExpensesEuro, salaryCompanyCost, salaryCompanyCostEuro,
        extraordinaryExpenses, extraordinaryExpensesEuro, extraordinaryObjectives, extraordinaryObjectivesEuro
      } = this.state;

      const year = 2015;
      const years = Array.from(new Array(20), (val, index) => year + index);

      return (
        <div>
          <Typography variant="subtitle2" component="h2" color="primary">
                    General Staff Informations
          </Typography>
          <br />
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
            direction="row"
          >
            <Grid item xs={12} md={3}>
              <TextField
                id="name"
                label="Employee  "
                name="name"
                value={name}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="fatherName"
                label="Father Name  "
                name="fatherName"
                value={fatherName}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="motherName"
                label="Mother Name"
                name="motherName"
                value={motherName}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="employeeNumber"
                label="Employee Number"
                name="employeeNumber"
                value={employeeNumber}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="company"
                label="Company"
                name="company"
                value={company}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="highDate"
                label="High Date"
                name="highDate"
                value={highDate}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="lowDate"
                label="Low Date"
                name="lowDate"
                value={lowDate}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                id="contractModel"
                label="Contract Model"
                name="contractModel"
                value={contractModel}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="center"
            fullWidth=""
            maxWidth=""
          >
            <Grid item xs={12} md={4}>
              <TextField
                id="totalPayment"
                label="Total Payment"
                name="totalPayment"
                value={totalPayment}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                id="currencyCode"
                label="Currency"
                name="currencyCode"
                value={currencyCode}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="totalPaymentEuro"
                label="Total Payment (€)"
                name="totalPaymentEuro"
                value={totalPaymentEuro}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
                    Economic Staff Management
          </Typography>
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="center"
            fullWidth=""
            maxWidth=""
          >
            <Grid item xs={12} md={3}>
              <FormControl fullWidth required>
                <InputLabel>Select Year</InputLabel>
                <Select
                  name="consultYear"
                  value={consultYear}
                  onChange={this.handleChange}
                >
                  {
                    years.map((clt) => (
                      <MenuItem key={clt} value={clt}>
                        {clt}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
            direction="row"
          >
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={5}>
              <TextField
                id="grosSalary"
                label="Gross Salary (Month)"
                name="grosSalary"
                value={grosSalary}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="grosSalaryEuro"
                label="Gross Salary (€)"
                name="grosSalaryEuro"
                value={grosSalaryEuro}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={1} />
            <Grid item xs={10} md={5}>
              <TextField
                id="netSalary"
                label="Net Salary"
                name="netSalary"
                value={netSalary}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="netSalaryEuro"
                label="Net Salary (€)"
                name="netSalaryEuro"
                value={netSalaryEuro}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={1} />
            <Grid item xs={10} md={5}>
              <TextField
                id="contributionSalary"
                label="Contribution Salary"
                name="contributionSalary"
                value={contributionSalary}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="contributionSalaryEuro"
                label="Contribution Salary (€)"
                name="contributionSalaryEuro"
                value={contributionSalaryEuro}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={5}>
              <TextField
                id="extraordinaryExpenses"
                label="Extraordinary Expenses"
                name="extraordinaryExpenses"
                value={extraordinaryExpenses}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="extraordinaryExpensesEuro"
                label="Extraordinary Expenses (€)"
                name="extraordinaryExpensesEuro"
                value={extraordinaryExpensesEuro}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={1} />
            <Grid item xs={10} md={5}>
              <TextField
                id="extraordinaryObjectives"
                label="Extraordinary Objectives"
                name="extraordinaryObjectives"
                value={extraordinaryObjectives}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="extraordinaryObjectivesEuro"
                label="Extraordinary Objectives (€)"
                name="extraordinaryObjectivesEuro"
                value={extraordinaryObjectivesEuro}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={1} />
            <Grid item xs={10} md={5}>
              <TextField
                id="salaryCompanyCost"
                label="Salary Company Cost"
                name="salaryCompanyCost"
                value={salaryCompanyCost}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="salaryCompanyCostEuro"
                label="Salary Company Cost (€)"
                name="salaryCompanyCostEuro"
                value={salaryCompanyCostEuro}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={1} />
            <Grid item xs={10} md={5}>
              <TextField
                id="travelExpenses"
                label="Travel Expenses"
                name="travelExpenses"
                value={travelExpenses}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="travelExpensesEuro"
                label="Travel Expenses (€)"
                name="travelExpensesEuro"
                value={travelExpensesEuro}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={1} />
            <Grid item xs={12} md={1} />
            <Grid item xs={10} md={5}>
              <TextField
                id="companyCost"
                label="Company Cost With travels"
                name="companyCost"
                value={companyCost}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="companyCostEuro"
                label="Company Cost With travels (€)"
                name="companyCostEuro"
                value={companyCostEuro}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <div align="center">
            <br />
            <br />
            <Button size="medium" color="primary" onClick={this.handleGoBack}>Cancel</Button>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  staff: state.getIn(['staffs']).selectedStaff,
  allStaff: state.getIn(['staffs']).allStaff,
  staffResponse: state.getIn(['staffs']).staffResponse,
  isLoadingStaff: state.getIn(['staffs']).isLoading,
  errorStaff: state.getIn(['staffs']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsultStaff);
