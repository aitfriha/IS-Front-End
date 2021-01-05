import React from 'react';
import {
  Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EconomicStaffYearService from '../../../Services/EconomicStaffYearService';
import EconomicStaffMonthService from '../../../Services/EconomicStaffMonthService';
import EconomicStaffExtraService from '../../../Services/EconomicStaffExtraService';

class ConsultStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      economicStaff: {},
      economicStaffsYear: [],
      economicStaffsMonth: [],
      economicStaffsExtra: [],
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
      openCompanyCost: false,
      consultYear: ''
    };
  }

    // eslint-disable-next-line react/sort-comp
    editingPromiseResolve = () => {};

    componentDidMount() {
      EconomicStaffYearService.getEconomicStaffYear().then(result => {
        console.log(result.data);
        this.setState({ economicStaffsYear: result.data });
      });
      EconomicStaffMonthService.getEconomicStaffMonth().then(result => {
        console.log(result.data);
        this.setState({ economicStaffsMonth: result.data });
      });
      EconomicStaffExtraService.getEconomicStaffExtra().then(result => {
        console.log(result.data);
        this.setState({ economicStaffsExtra: result.data });
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
          currencyCode: economicStaff.currency.typeOfCurrency.currencyCode,
          totalPayment: economicStaff.contributionSalary + economicStaff.grosSalary,
          totalPaymentEuro: economicStaff.contributionSalaryEuro + economicStaff.grosSalaryEuro,
          economicStaff
        });
      }
    }

    handleChange = (ev) => {
      const {
        economicStaffsYear, economicStaffsMonth, economicStaffsExtra, economicStaffId
      } = this.state;
      if (ev.target.name === 'consultYear') {
        const year = ev.target.value;
        // eslint-disable-next-line array-callback-return
        economicStaffsMonth.map(row => {
          const monthYear = row.monthPayment.substr(0, 4);
          if (Number(monthYear) === year && row.economicStaff._id === economicStaffId) {
            this.setState({ grosSalary: row.grosSalaryMonth, grosSalaryEuro: row.grosSalaryEuroMonth });
          }
        });
        // eslint-disable-next-line array-callback-return
        economicStaffsExtra.map(row => {
          const extraYear = row.extraordinaryDate.substr(0, 4);
          if (Number(extraYear) === year && row.economicStaff._id === economicStaffId) {
            this.setState({
              extraordinaryExpenses: row.extraordinaryExpenses,
              extraordinaryExpensesEuro: row.extraordinaryExpensesEuro,
              extraordinaryObjectives: row.extraordinaryObjectives,
              extraordinaryObjectivesEuro: row.extraordinaryObjectivesEuro
            });
          }
        });
        // eslint-disable-next-line array-callback-return
        economicStaffsYear.map(row => {
          const yearDate = row.yearPayment.substr(0, 4);
          if (Number(yearDate) === year && row.economicStaff._id === economicStaffId) {
            this.setState({
              netSalary: row.netSalaryYear,
              netSalaryEuro: row.netSalaryEuroYear,
              contributionSalary: row.contributionSalaryYear,
              contributionSalaryEuro: row.contributionSalaryEuroYear
            });
          }
        });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

  handleCalculCompanyCost = () => {
    const {
      grosSalary, grosSalaryEuro, extraordinaryExpenses, extraordinaryExpensesEuro, extraordinaryObjectives,
      extraordinaryObjectivesEuro, netSalary, netSalaryEuro, contributionSalary, contributionSalaryEuro
    } = this.state;
    const total = Number(grosSalary) + extraordinaryExpenses + extraordinaryObjectives + netSalary + contributionSalary;
    const totalEuro = grosSalaryEuro + extraordinaryExpensesEuro + extraordinaryObjectivesEuro + netSalaryEuro + contributionSalaryEuro;
    console.log(total);
    console.log(totalEuro);
    this.setState({
      companyCost: total,
      companyCostEuro: totalEuro,
      salaryCompanyCost: total,
      salaryCompanyCostEuro: totalEuro,
      openCompanyCost: true
    });
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
        grosSalaryEuro, netSalaryEuro, contributionSalaryEuro, companyCostEuro, openCompanyCost,
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
            <Grid item xs={9} />
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleCalculCompanyCost}
              >
                Company Cost
              </Button>
            </Grid>
            <Grid item xs={12} md={1} />
            {openCompanyCost === false ? (
              <div />
            ) : (
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                direction="row"
                justify="center"
              >
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
            )}
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
