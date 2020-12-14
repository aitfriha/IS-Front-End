import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import blue from '@material-ui/core/colors/blue';
import EconomicStaffService from '../../../Services/EconomicStaffService';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import { ThemeContext } from '../../../App/ThemeWrapper';
import EditEconomicStaff from './editEconomicStaff';

const useStyles = makeStyles();

class EconomicStaffBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      economicStaff: {},
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
      openPopUp: false,
      openStaff: false,
      openYear: false,
      openMonth: false,
      openExtra: false,
      openCompanyCost: false,
      openCompanyCostMonth: false,
      yearPayment: 2020,
      grosSalaryYear: 0,
      netSalaryYear: 0,
      contributionSalaryYear: 0,
      companyCostYear: 0,
      grosSalaryEuroYear: 0,
      netSalaryEuroYear: 0,
      contributionSalaryEuroYear: 0,
      companyCostEuroYear: 0,
      monthPayment: 0,
      grosSalaryMonth: 0,
      netSalaryMonth: 0,
      contributionSalaryMonth: 0,
      companyCostMonth: 0,
      grosSalaryEuroMonth: 0,
      netSalaryEuroMonth: 0,
      contributionSalaryEuroMonth: 0,
      companyCostEuroMonth: 0,
      extraordinaryDate: '',
      extraordinaryExpenses: 0,
      extraordinaryExpensesEuro: 0,
      extraordinaryObjectives: 0,
      extraordinaryObjectivesEuro: 0,
      datas: [],
      columns: [
        {
          name: 'staff',
          label: 'First Name',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (staff) => (
              <React.Fragment>
                {
                  staff.firstName
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'fatherName',
          label: 'Father Name',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'motherName',
          label: 'Mother Name',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'highDate',
          label: 'High Date',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'lowDate',
          label: 'Low Date',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'grosSalary',
          label: 'Gross Salary',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'grosSalaryEuro',
          label: 'Gross Salary (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'netSalary',
          label: 'Net Salary',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'netSalaryEuro',
          label: 'Net Salary (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'contributionSalary',
          label: 'Contribution Salary',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'contributionSalaryEuro',
          label: 'Contribution Salary (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'companyCost',
          label: 'Company Cost',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'companyCostEuro',
          label: 'Company Cost (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'Actions',
          label: ' Actions',
          options: {
            filter: false,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 250
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 251
              }
            }),
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                <IconButton size="small" onClick={() => this.handleMonth(tableMeta)}>
                  <Button size="small" variant="contained" style={{ color: blue[700], fontSize: 12 }}>
                    Month
                  </Button>
                </IconButton>
                <IconButton size="small" onClick={() => this.handleYear(tableMeta)}>
                  <Button size="small" variant="contained" style={{ color: yellow[700], fontSize: 12 }}>
                    Year
                  </Button>
                </IconButton>
                <IconButton size="small" onClick={() => this.handleStaffs(tableMeta)}>
                  <Button size="small" variant="contained" style={{ color: red[700], fontSize: 12 }}>
                    Staff
                  </Button>
                </IconButton>
                <IconButton size="small" onClick={() => this.handleExtra(tableMeta)}>
                  <Button size="small" variant="contained" style={{ color: green[700], fontSize: 12 }}>
                    Extra
                  </Button>
                </IconButton>
                <IconButton size="small" onClick={() => this.handleDetails(tableMeta)}>
                  <DetailsIcon color="secondary" />
                </IconButton>
                <IconButton size="small" onClick={() => this.handleDelete(tableMeta)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

    // eslint-disable-next-line react/sort-comp
    handleYear = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        const economicStaff = result.data;
        console.log(economicStaff);
        this.setState({ openYear: true, economicStaff });
      });
    }

    handleMonth = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        const economicStaff = result.data;
        console.log(economicStaff);
        this.setState({ openMonth: true, economicStaff });
      });
    }

    handleStaffs = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        const economicStaff = result.data;
        console.log(economicStaff);
        this.setState({ openStaff: true, economicStaff });
      });
    }

    handleExtra = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        const economicStaff = result.data;
        console.log(economicStaff);
        this.setState({ openExtra: true, economicStaff });
      });
    }

    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        const economicStaff = result.data;
        console.log(economicStaff);
        this.setState({ openPopUp: true, economicStaff });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.deleteEconomicStaff(id).then(result => {
        this.setState({ datas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    handleCloseYear = () => {
      this.setState({ openYear: false, openCompanyCost: false });
    };

    handleSaveYear = () => {
    };

    handleCalculCompanyCost = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const gros = this.state.grosSalaryYear; const net = this.state.netSalaryYear; const contribution = this.state.contributionSalaryYear; const changefactor = this.state.economicStaff.changeFactor;
      const companycostyear = Number(gros) + Number(net) + Number(contribution);
      this.setState({ companyCostYear: companycostyear, companyCostEuroYear: companycostyear * changefactor, openCompanyCost: true });
    };

    handleCloseMonth = () => {
      this.setState({ openMonth: false, openCompanyCostMonth: false });
    };

    handleSaveMonth = () => {
    };

    handleCalculCompanyCostMonth = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const gros = this.state.grosSalaryMonth; const net = this.state.netSalaryMonth; const contribution = this.state.contributionSalaryMonth; const changefactor = this.state.economicStaff.changeFactor;
      const companycostMonth = Number(gros) + Number(net) + Number(contribution);
      this.setState({ companyCostMonth: companycostMonth, companyCostEuroMonth: companycostMonth * changefactor, openCompanyCostMonth: true });
    };

    handleCloseExtra = () => {
      this.setState({ openExtra: false });
    };

    handleSaveExtra = () => {
    };

    componentDidMount() {
      EconomicStaffService.getEconomicStaff().then(result => {
        this.setState({ datas: result.data });
      });
      const {
        // eslint-disable-next-line react/prop-types
        changeTheme
      } = this.props;
      changeTheme('greyTheme');
    }

    handleChange = (ev) => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const changefactor = this.state.economicStaff.changeFactor;
      if (ev.target.name === 'grosSalaryYear') {
        this.setState({ grosSalaryEuroYear: ev.target.value * changefactor });
      }
      if (ev.target.name === 'netSalaryYear') {
        this.setState({ netSalaryEuroYear: ev.target.value * changefactor });
      }
      if (ev.target.name === 'contributionSalaryYear') {
        this.setState({ contributionSalaryEuroYear: ev.target.value * changefactor });
      }
      if (ev.target.name === 'grosSalaryMonth') {
        this.setState({ grosSalaryEuroMonth: ev.target.value * changefactor });
      }
      if (ev.target.name === 'netSalaryMonth') {
        this.setState({ netSalaryEuroMonth: ev.target.value * changefactor });
      }
      if (ev.target.name === 'contributionSalaryMonth') {
        this.setState({ contributionSalaryEuroMonth: ev.target.value * changefactor });
      }
      if (ev.target.name === 'extraordinaryExpenses') {
        this.setState({ extraordinaryExpensesEuro: ev.target.value * changefactor });
      }
      if (ev.target.name === 'extraordinaryObjectives') {
        this.setState({ extraordinaryObjectivesEuro: ev.target.value * changefactor });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    myCallback = (dataFromChild) => {
      EconomicStaffService.getEconomicStaff().then(result => {
        this.setState({ datas: result.data, openPopUp: dataFromChild });
      });
    };

    render() {
      console.log(this.state);
      const maxOffset = 10;
      const thisYear = (new Date()).getFullYear();
      const allYears = [];
      const allMonths = [];
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x);
      }
      // eslint-disable-next-line no-plusplus
      for (let x = 1; x <= 12; x++) {
        allMonths.push(x);
      }
      const {
        datas, columns, openPopUp, economicStaff, openStaff, openExtra, openMonth, openYear, openCompanyCost, openCompanyCostMonth,
        yearPayment, grosSalaryYear, netSalaryYear, contributionSalaryYear, companyCostYear,
        grosSalaryEuroYear, netSalaryEuroYear, contributionSalaryEuroYear, companyCostEuroYear,
        monthPayment, grosSalaryMonth, netSalaryMonth, contributionSalaryMonth, companyCostMonth,
        grosSalaryEuroMonth, netSalaryEuroMonth, contributionSalaryEuroMonth, companyCostEuroMonth,
        extraordinaryDate, extraordinaryExpenses, extraordinaryObjectives, extraordinaryExpensesEuro, extraordinaryObjectivesEuro
      } = this.state;
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add Economic Staff"
            tooltip="Add New Economic Staff"
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title=" Economic Staff List"
            data={datas}
            columns={columns}
            options={options}
          />
          <Dialog
            open={openPopUp}
            keepMounted
            scroll="body"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title"> View Details</DialogTitle>
            <DialogContent dividers>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={0} />
                <Grid item xs={11}>
                  <EditEconomicStaff Infos={economicStaff} callsbackFromParent={this.myCallback} />
                </Grid>
                <Grid item xs={0} />
              </Grid>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openYear}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> Year Payment </DialogTitle>
            <DialogContent dividers>
              <div>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                  fullWidth=""
                  maxWidth=""
                >
                  <Grid item xs={12} md={8}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Year </InputLabel>
                      <Select
                        name="yearPayment"
                        value={yearPayment}
                        onChange={this.handleChange}
                      >
                        {
                          allYears.map((clt) => (
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
                      id="grosSalaryYear"
                      label="Gross Salary (Year)"
                      name="grosSalaryYear"
                      value={grosSalaryYear}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="grosSalaryEuroYear"
                      label="Gross Salary (€)"
                      name="grosSalaryEuroYear"
                      value={grosSalaryEuroYear}
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
                      id="netSalaryYear"
                      label="Net Salary (Year)"
                      name="netSalaryYear"
                      value={netSalaryYear}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="netSalaryEuroYear"
                      label="Net Salary (€)"
                      name="netSalaryEuroYear"
                      value={netSalaryEuroYear}
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
                      id="contributionSalaryYear"
                      label="Contribution Salary (Year)"
                      name="contributionSalaryYear"
                      value={contributionSalaryYear}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="contributionSalaryEuroYear"
                      label="Contribution Salary (€)"
                      name="contributionSalaryEuroYear"
                      value={contributionSalaryEuroYear}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
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
                      <Grid item xs={12} md={0} />
                      <Grid item xs={10} md={5}>
                        <TextField
                          id="companyCostYear"
                          label="Company Cost (Year)"
                          name="companyCostYear"
                          value={companyCostYear}
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
                          id="companyCostEuroYear"
                          label="Company Cost (€)"
                          name="companyCostEuroYear"
                          value={companyCostEuroYear}
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
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleCloseYear}> Cancel </Button>
              <Button variant="contained" color="primary" onClick={this.handleSaveYear}> save </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openMonth}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> Month Payment </DialogTitle>
            <DialogContent dividers>
              <div>
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
                    <FormControl fullWidth required>
                      <InputLabel>Select Year </InputLabel>
                      <Select
                        name="yearPayment"
                        value={yearPayment}
                        onChange={this.handleChange}
                      >
                        {
                          allYears.map((clt) => (
                            <MenuItem key={clt} value={clt}>
                              {clt}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Month </InputLabel>
                      <Select
                        name="monthPayment"
                        value={monthPayment}
                        onChange={this.handleChange}
                      >
                        {
                          allMonths.map((clt) => (
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
                      id="grosSalaryMonth"
                      label="Gross Salary (Month)"
                      name="grosSalaryMonth"
                      value={grosSalaryMonth}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="grosSalaryEuroMonth"
                      label="Gross Salary (€)"
                      name="grosSalaryEuroMonth"
                      value={grosSalaryEuroMonth}
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
                      id="netSalaryMonth"
                      label="Net Salary (Month)"
                      name="netSalaryMonth"
                      value={netSalaryMonth}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="netSalaryEuroMonth"
                      label="Net Salary (€)"
                      name="netSalaryEuroMonth"
                      value={netSalaryEuroMonth}
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
                      id="contributionSalaryMonth"
                      label="Contribution Salary (Month)"
                      name="contributionSalaryMonth"
                      value={contributionSalaryMonth}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <TextField
                      id="contributionSalaryEuroMonth"
                      label="Contribution Salary (€)"
                      name="contributionSalaryEuroMonth"
                      value={contributionSalaryEuroMonth}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} />
                  <Grid item xs={2}>
                    <Button variant="contained" color="primary" onClick={this.handleCalculCompanyCostMonth}> Company Cost </Button>
                  </Grid>
                  {openCompanyCostMonth === false ? (
                    <div />
                  ) : (
                    <Grid
                      container
                      spacing={2}
                      alignItems="flex-start"
                      direction="row"
                      justify="center"
                    >
                      <Grid item xs={12} md={0} />
                      <Grid item xs={10} md={5}>
                        <TextField
                          id="companyCostMonth"
                          label="Company Cost (Month)"
                          name="companyCostMonth"
                          value={companyCostMonth}
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
                          id="companyCostEuroMonth"
                          label="Company Cost (€)"
                          name="companyCostEuroMonth"
                          value={companyCostEuroMonth}
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
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleCloseMonth}> Cancel </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSaveMonth}
              >
                save
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openExtra}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> Extraordinary Payment </DialogTitle>
            <DialogContent dividers>
              <div>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                  fullWidth=""
                  maxWidth=""
                >
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="extraordinaryDate"
                      label="Extraordinary Payment Date"
                      variant="outlined"
                      name="extraordinaryDate"
                      value={extraordinaryDate}
                      type="date"
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
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
                      id="extraordinaryExpenses"
                      label="Extraordinary Expenses"
                      name="extraordinaryExpenses"
                      value={extraordinaryExpenses}
                      type="number"
                      onChange={this.handleChange}
                      fullWidth
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
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleCloseExtra}> Cancel </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSaveExtra}
              >
                save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}
const RetentionBlockMapped = connect()(EconomicStaffBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <RetentionBlockMapped changeTheme={changeTheme} classes={classes} />;
};
