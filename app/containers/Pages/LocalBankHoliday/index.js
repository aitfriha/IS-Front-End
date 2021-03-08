import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';

import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Transition from '../../../components/Transition/transition';
import AutoComplete from '../../../components/AutoComplete';
import styles from './localBankHoliday-jss';
import { ThemeContext } from '../../App/ThemeWrapper';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import {
  getAllLocalBankHoliday,
  getAllLocalBankHolidayByCompany,
  updateLocalBankHoliday,
  deleteLocalBankHoliday
} from '../../../redux/localBankHoliday/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class LocalBankHoliday extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      name: '',
      code: '',
      type: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      minEndDate: new Date(),
      companyId: '',
      isStartDateError: false,
      isEndDateError: false,
      isDialogOpen: false,
      isRelated: false,
      localBankHolidaySelected: {},
      columns: [
        {
          name: 'localBankHolidayId',
          label: 'Local Bank Holiday Id',
          options: {
            display: false,
            filter: false
          }
        },
        {
          name: 'name',
          label: 'Name',
          options: {
            filter: true
          }
        },
        {
          label: 'Code',
          name: 'code',
          options: {
            filter: true
          }
        },
        {
          label: 'Type',
          name: 'type',
          options: {
            filter: true
          }
        },
        {
          label: 'Description',
          name: 'description',
          options: {
            filter: true
          }
        },
        {
          label: 'Company',
          name: 'companyName',
          options: {
            filter: true
          }
        },

        {
          label: 'Start Date',
          name: 'startDate',
          options: {
            filter: true
          }
        },
        {
          label: 'End Date',
          name: 'endDate',
          options: {
            filter: true
          }
        },
        {
          label: 'Total Days',
          name: 'totalDays',
          options: {
            filter: true
          }
        },
        {
          label: ' ',
          name: ' ',
          options: {
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {thelogedUser.userRoles[0].actionsNames.hh_localBankHolidays_modify
                  ? (
                    <IconButton onClick={() => this.handleOpenDialog(tableMeta)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                  ) : null}
                {thelogedUser.userRoles[0].actionsNames.hh_localBankHolidays_delete
                  ? (
                    <IconButton onClick={() => this.handleDelete(tableMeta)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  ) : null}
              </React.Fragment>
            )
          }
        }
      ]
    };
    this.editingPromiseResolve1 = () => {
    };
    this.editingPromiseResolve2 = () => {
    };
  }

  componentDidMount() {
    const { changeTheme, getAllLocalBankHoliday } = this.props;
    changeTheme('blueCyanTheme');
    getAllLocalBankHoliday();
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleUpdate = () => {
    const {
      allLocalBankHoliday,
      getAllLocalBankHoliday,
      updateLocalBankHoliday
    } = this.props;
    const {
      name,
      code,
      type,
      description,
      startDate,
      endDate,
      localBankHolidaySelected
    } = this.state;
    const localBankHoliday = {
      localBankHolidayId: localBankHolidaySelected.localBankHolidayId,
      name,
      code,
      type,
      description,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      totalDays: this.calculDays()
    };
    const promise = new Promise(resolve => {
      updateLocalBankHoliday(localBankHoliday);
      this.editingPromiseResolve1 = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllLocalBankHoliday();
        console.log(result);
        this.setState({
          isDialogOpen: false
        });
      } else {
        console.log(result);
        notification('danger', result);
      }
    });
  };

  handleOpenDialog = tableMeta => {
    const { allLocalBankHoliday, getAllLocalBankHolidayByCompany } = this.props;
    const localBankHolidaySelected = allLocalBankHoliday.filter(
      localBankHoliday => localBankHoliday.localBankHolidayId === tableMeta.rowData[0]
    )[0];
    console.log(localBankHolidaySelected.financialCompanyId);
    getAllLocalBankHolidayByCompany(
      localBankHolidaySelected.financialCompanyId
    );
    this.setState({
      localBankHolidaySelected,
      name: localBankHolidaySelected.name,
      code: localBankHolidaySelected.code,
      type: localBankHolidaySelected.type,
      description: localBankHolidaySelected.description,
      startDate: new Date(localBankHolidaySelected.startDate),
      endDate: new Date(localBankHolidaySelected.endDate),
      companyId: localBankHolidaySelected.financialCompanyId,
      isDialogOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isDialogOpen: false,
      newId: ''
    });
  };

  handleDelete = tableMeta => {
    const { getAllLocalBankHoliday, deleteLocalBankHoliday } = this.props;
    const promise = new Promise(resolve => {
      deleteLocalBankHoliday(tableMeta.rowData[0]);
      this.editingPromiseResolve1 = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllLocalBankHoliday();
        this.handleClose();
      } else {
        notification('danger', result);
      }
    });
  };

  handleDateValue = (value, name) => {
    if (name === 'startDate') {
      this.setState({
        minEndDate: value,
        [name]: value
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  onErrorDate = (error, value, input) => {
    if (error !== '') {
      if (input === 'startDate') {
        this.setState({
          isStartDateError: true
        });
      } else {
        this.setState({
          isEndDateError: true
        });
      }
    }
  };

  onAcceptDate = (value, input) => {
    if (input === 'startDate') {
      this.setState({
        isStartDateError: false
      });
    } else {
      this.setState({
        isEndDateError: false
      });
    }
  };

  calculDays = () => {
    const { startDate, endDate } = this.state;
    const start = moment(startDate, 'DD/MM/YYYY');
    const end = moment(endDate, 'DD/MM/YYYY');

    const endFirstWeek = start.clone().endOf('week');
    const startLastWeek = end.clone().startOf('week');
    const days = (startLastWeek.diff(endFirstWeek, 'days') * 5) / 7;
    let firstWeekDays = endFirstWeek.day() - start.day(); // check first week
    if (start.day() == 0) --firstWeekDays; // -1 if start with sunday
    let lastWeekDays = end.day() - startLastWeek.day(); // check startLastWeek week
    if (end.day() == 6) --lastWeekDays; // -1 if end with saturday
    const workingDays = firstWeekDays + Math.floor(days) + lastWeekDays;

    console.log(startDate);
    console.log(endDate);
    console.log(workingDays);

    return workingDays;
  };

  handleValueChange = (value, type) => {
    console.log(value, type);
    this.setState({ [type]: value });
  };

  render() {
    const {
      classes,
      allLocalBankHoliday,
      allLocalBankHolidayByCompany,
      isLoadingLocalBankHoliday,
      localBankHolidayResponse,
      errorLocalBankHoliday,
      isLoadingStaffContract,
      staffContractResponse,
      errorStaffContract,
      logedUser,
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.hh_localBankHolidays_export) {
      exportButton = true;
    }
    const {
      name,
      code,
      type,
      description,
      startDate,
      endDate,
      minEndDate,
      isStartDateError,
      isEndDateError,
      isDialogOpen,
      columns
    } = this.state;
    console.log(allLocalBankHolidayByCompany);
    const title = brand.name + ' - Types of legal category';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      download: exportButton,
      print: exportButton,
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allLocalBankHoliday}
          url="/app/hh-rr/localBankHoliday/create-local-bank-holiday"
          tooltip="add new legal category type"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.hh_localBankHolidays_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.hh_localBankHolidays_export}
        />
      )
    };
    !isLoadingLocalBankHoliday
      && localBankHolidayResponse
      && this.editingPromiseResolve1(localBankHolidayResponse);
    !isLoadingLocalBankHoliday
      && !localBankHolidayResponse
      && this.editingPromiseResolve1(errorLocalBankHoliday);

    !isLoadingStaffContract
      && staffContractResponse
      && this.editingPromiseResolve2(staffContractResponse);
    !isLoadingStaffContract
      && !staffContractResponse
      && this.editingPromiseResolve2(errorStaffContract);

    const holidayTypes = ['Country', 'Local'];

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={desc} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={desc} />
        </Helmet>
        <Dialog
          open={isDialogOpen}
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">
            Edit Local Bank Holiday
          </DialogTitle>
          <DialogContent>
            <div style={{ width: '100%' }}>
              <AutoComplete
                value={this.handleValueChange}
                placeholder="Name"
                data={allLocalBankHolidayByCompany}
                type="name"
                attribute="name"
              />
            </div>
            <div style={{ width: '100%' }}>
              <AutoComplete
                value={this.handleValueChange}
                placeholder="Code"
                data={allLocalBankHolidayByCompany}
                type="code"
                attribute="code"
              />
            </div>
            <FormControl
              className={classes.formControl}
              style={{ width: '100%', marginTop: 1 }}
            >
              <InputLabel>Type of holiday</InputLabel>

              <Select name="type" value={type} onChange={this.handleChange}>
                {holidayTypes.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              value={description}
              fullWidth
              multiline
              className={classes.textField}
              onChange={this.handleChange}
            />
            <div style={{ width: '100%', marginTop: 1 }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  name="startDate"
                  label="Start Date"
                  value={startDate}
                  onError={(error, value) => this.onErrorDate(error, value, 'startDate')
                  }
                  onAccept={value => this.onAcceptDate(value, 'startDate')}
                  onChange={value => this.handleDateValue(value, 'startDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
            </div>
            <div style={{ width: '100%', marginTop: 1 }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  name="endDate"
                  label="End Date"
                  value={endDate}
                  minDate={minEndDate}
                  onError={(error, value) => this.onErrorDate(error, value, 'endDate')
                  }
                  onAccept={value => this.onAcceptDate(value, 'endDate')}
                  onChange={value => this.handleDateValue(value, 'endDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleUpdate}
              disabled={!code || !name || isStartDateError || isEndDateError}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <PapperBlock
          title="Local bank holidays"
          icon="ios-paper-outline"
          noMargin
        >
          <MUIDataTable
            title=""
            data={allLocalBankHoliday}
            columns={columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allLocalBankHoliday: state.getIn(['localBankHolidays']).allLocalBankHoliday,
  allLocalBankHolidayByCompany: state.getIn(['localBankHolidays'])
    .allLocalBankHolidayByCompany,
  localBankHolidayResponse: state.getIn(['localBankHolidays'])
    .localBankHolidayResponse,
  isLoadingLocalBankHoliday: state.getIn(['localBankHolidays']).isLoading,
  errorLocalBankHoliday: state.getIn(['localBankHolidays']).errors,
  staffContractResponse: state.getIn(['staffContracts']).staffContractResponse,
  isLoadingStaffContract: state.getIn(['staffContracts']).isLoading,
  errorStaffContract: state.getIn(['staffContracts']).errors,
  allStaffContractByLocalBankHoliday: state.getIn(['staffContracts'])
    .allStaffContractByLocalBankHoliday,
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateLocalBankHoliday,
    getAllLocalBankHoliday,
    getAllLocalBankHolidayByCompany,
    deleteLocalBankHoliday
  },
  dispatch
);

const LocalBankHolidayMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalBankHoliday);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <LocalBankHolidayMapped changeTheme={changeTheme} classes={classes} />;
};
