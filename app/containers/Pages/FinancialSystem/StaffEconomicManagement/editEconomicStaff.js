import React from 'react';
import {
  Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EconomicStaffService from '../../../Services/EconomicStaffService';
import { getAllStaff } from '../../../../redux/staff/actions';

class EditEconomicStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      economicStaffId: '',
      // eslint-disable-next-line react/destructuring-assignment,react/prop-types
      staffs: this.props.allStaff,
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
      grosSalary: '',
      netSalary: '',
      contributionSalary: '',
      companyCost: '',
      grosSalaryEuro: '',
      netSalaryEuro: '',
      contributionSalaryEuro: '',
      companyCostEuro: '',
      open: false
    };
  }

    // eslint-disable-next-line react/sort-comp
    editingPromiseResolve = () => {};

    componentDidMount() {
      // eslint-disable-next-line no-shadow,react/prop-types
      const { getAllStaff } = this.props;
      const promise = new Promise(resolve => {
        // get client information
        getAllStaff();
        this.editingPromiseResolve = resolve;
      });
      promise.then(result => {
        const staffs = [];
        console.log(result);
        // eslint-disable-next-line react/destructuring-assignment,react/prop-types
        this.props.allStaff.forEach(staff => {
          staffs.push(staff);
        });
        this.setState({ staffs });
      });
    }

    componentWillReceiveProps(props) {
      // eslint-disable-next-line react/prop-types
      const economicStaff = props.Infos;
      console.log(economicStaff);
      if (economicStaff._id) {
        this.setState({
          economicStaffId: economicStaff._id,
          staffId: economicStaff.staff.staffId,
          companyId: economicStaff.financialCompany._id,
          changeFactor: economicStaff.changeFactor,
          company: economicStaff.financialCompany.name,
          employeeNumber: economicStaff.employeeNumber,
          name: economicStaff.staff.staffId,
          fatherName: economicStaff.fatherName,
          motherName: economicStaff.motherName,
          highDate: economicStaff.highDate,
          lowDate: economicStaff.lowDate,
          grosSalary: economicStaff.grosSalary,
          netSalary: economicStaff.netSalary,
          contributionSalary: economicStaff.contributionSalary,
          companyCost: economicStaff.companyCost,
          grosSalaryEuro: economicStaff.grosSalaryEuro,
          netSalaryEuro: economicStaff.netSalaryEuro,
          contributionSalaryEuro: economicStaff.contributionSalaryEuro,
          companyCostEuro: economicStaff.companyCostEuro
        });
      }
    }

    handleSubmit = () => {
      const {
        economicStaffId, staffId, highDate, lowDate, changeFactor, employeeNumber, name, fatherName, motherName, companyId,
        grosSalary, netSalary, contributionSalary, companyCost, grosSalaryEuro, netSalaryEuro, contributionSalaryEuro, companyCostEuro,
      } = this.state;
      const staff = { staffId };
      const financialCompany = { _id: companyId };
      const EconomicStaff = {
        economicStaffId,
        staff,
        financialCompany,
        changeFactor,
        employeeNumber,
        name,
        fatherName,
        motherName,
        highDate,
        lowDate,
        grosSalary,
        netSalary,
        contributionSalary,
        companyCost,
        grosSalaryEuro,
        netSalaryEuro,
        contributionSalaryEuro,
        companyCostEuro
      };
      console.log(EconomicStaff);
      EconomicStaffService.saveEconomicStaff(EconomicStaff).then(result => {
        console.log(result);
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        this.props.callsbackFromParent(false);
      });
    }

    handleChange = (ev) => {
      // eslint-disable-next-line react/destructuring-assignment
      const changefactor = this.state.changeFactor;
      if (ev.target.name === 'name') {
        const id = ev.target.value;
        // eslint-disable-next-line array-callback-return,react/destructuring-assignment
        this.state.staffs.map(staff => {
          if (staff.staffId === id) {
            this.setState({
              name: staff.firstName,
              staffId: staff.staffId,
              changeFactor: staff.changeFactor,
              fatherName: staff.fatherFamilyName,
              motherName: staff.motherFamilyName,
              highDate: staff.highDate,
              lowDate: staff.lowDate,
              companyId: staff.companyId,
              company: staff.companyName,
              employeeNumber: staff.personalNumber
            });
          }
        });
      }
      if (ev.target.name === 'grosSalary') {
        this.setState({ grosSalaryEuro: ev.target.value * changefactor });
      }
      if (ev.target.name === 'netSalary') {
        this.setState({ netSalaryEuro: ev.target.value * changefactor });
      }
      if (ev.target.name === 'contributionSalary') {
        this.setState({ contributionSalaryEuro: ev.target.value * changefactor });
      }
      if (ev.target.name === 'companyCost') {
        this.setState({ companyCostEuro: ev.target.value * changefactor });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleGoBack = () => {
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      this.props.callsbackFromParent(false);
    }

    render() {
      console.log(this.state);
      const {
        name, fatherName, motherName, highDate, lowDate, company, employeeNumber,
        grosSalary, netSalary, contributionSalary, companyCost, staffs,
        grosSalaryEuro, netSalaryEuro, contributionSalaryEuro, companyCostEuro
      } = this.state;
      const {
        // eslint-disable-next-line react/prop-types
        isLoadingStaff, staffResponse, errorStaff
      } = this.props;

      !isLoadingStaff
        && staffResponse
        && this.editingPromiseResolve(staffResponse);
      !isLoadingStaff && !staffResponse && this.editingPromiseResolve(errorStaff);

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
              <FormControl fullWidth required>
                <InputLabel>Select Employee </InputLabel>
                <Select
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                >
                  {
                    staffs.map((clt) => (
                      <MenuItem key={clt.staffId} value={clt.staffId}>
                        {clt.fatherFamilyName}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
          </Grid>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
                        Economic Management
          </Typography>
          <br />
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
                label="Gross Salary"
                name="grosSalary"
                value={grosSalary}
                type="number"
                onChange={this.handleChange}
                fullWidth
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
            <Grid item xs={10} md={5}>
              <TextField
                id="companyCost"
                label="Company Cost"
                name="companyCost"
                value={companyCost}
                type="number"
                onChange={this.handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={10} md={5}>
              <TextField
                id="companyCostEuro"
                label="Company Cost (€)"
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
            <Button size="small" color="inherit" onClick={this.handleGoBack}>Cancel</Button>
            <Button variant="contained" color="primary" type="button" onClick={this.handleSubmit}>
                            Save
            </Button>
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
    getAllStaff
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEconomicStaff);
