import React, { useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import moment from 'moment';
import emailjs from 'emailjs-com';
import { PapperBlock } from 'dan-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutoComplete from '../../../components/AutoComplete';
import styles from './absenceRequest-jss';
import history from '../../../utils/history';
import '../Configurations/map/app.css';
import { ThemeContext } from '../../App/ThemeWrapper';
import { isString } from 'lodash';
import CountryService from '../../Services/CountryService';
import StateCountryService from '../../Services/StateCountryService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  saveAbsenceRequest,
  getAllAbsenceRequest
} from '../../../redux/absenceRequest/actions';
import { getAllAbsenceTypeByState } from '../../../redux/absenceType/actions';
import { getAllStaff } from '../../../redux/staff/actions';
import notification from '../../../components/Notification/Notification';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  TimePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(styles);

class AddAbsenceType extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {};
    this.state = {
      staff: null,
      absenceType: null,
      startDate: new Date(),
      endDate: new Date(),
      minEndDate: new Date(),
      isStartDateError: false,
      isEndDateError: false,
      startHour: new Date(),
      endHour: new Date()
    };
  }

  componentDidMount() {
    const { changeTheme, getAllStaff } = this.props;
    changeTheme('blueCyanTheme');
    getAllStaff();
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitAbsenceType = () => {
    const { saveAbsenceRequest, getAllAbsenceRequest } = this.props;
    const {
      staff,
      absenceType,
      startDate,
      endDate,
      startHour,
      endHour
    } = this.state;
    console.log(staff);
    console.log(absenceType);

    const absenceRequest = {
      startDate:
        absenceType.durationType === 'day'
          ? startDate.toISOString().slice(0, 10)
          : '-',
      endDate:
        absenceType.durationType === 'day'
          ? endDate.toISOString().slice(0, 10)
          : '-',
      absenceDays: absenceType.durationType === 'day' ? this.calculDays() : '-',
      startHour:
        absenceType.durationType === 'hour'
          ? moment(startHour).format('LT')
          : '-',
      endHour:
        absenceType.durationType === 'hour'
          ? moment(endHour).format('LT')
          : '-',
      absenceHours:
        absenceType.durationType === 'hour' ? this.calculHours() : '-',
      staffId: staff.staffId,
      absenceTypeId: absenceType.absenceTypeId,
      sendToName: absenceType.absenceResponsibleName,
      fromName:
        staff.firstName
        + ' '
        + staff.fatherFamilyName
        + ' '
        + staff.motherFamilyName,
      sendToEmail: absenceType.absenceResponsibleEmail
    };

    const promise = new Promise(resolve => {
      saveAbsenceRequest(absenceRequest);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        /* this.sendEmail(
          absenceType.absenceResponsibleName,
          staff.firstName
            + ' '
            + staff.fatherFamilyName
            + ' '
            + staff.motherFamilyName,
          absenceType.absenceResponsibleEmail
        ); */
        notification('success', result);
        getAllAbsenceRequest();
        console.log(result);
        history.push('/app/hh-rr/absenceRequest');
      } else {
        console.log(result);
        notification('danger', result);
      }
    });
  };

  handleChangeStaff = (ev, value) => {
    const { getAllAbsenceTypeByState } = this.props;
    getAllAbsenceTypeByState(value.contractTypeStateId);
    this.setState({ staff: value });
  };

  handleChangeAbsenceType = (ev, value) => {
    this.setState({ absenceType: value });
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

  handleTimeValue = (value, name) => {
    const { startHour, endHour } = this.state;
    if (name === 'endHour') {
      const minTime = moment(startHour, 'HH:mm');
      const maxTime = moment(value, 'HH:mm');
      if (maxTime.isAfter(minTime)) {
        this.setState({
          [name]: value
        });
      }
    } else {
      const minTime = moment(value, 'HH:mm');
      const maxTime = moment(endHour, 'HH:mm');
      if (maxTime.isAfter(minTime)) {
        this.setState({
          [name]: value
        });
      }
    }
  };

  handleTimeValue1 = (value, name) => {
    this.setState({
      [name]: value
    });
  };

  handleValueChange = (value, type) => {
    console.log(value, type);
    this.setState({ [type]: value });
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

  formatTime = date => {
    if (date) {
      return (
        date
          .getHours()
          .toString()
          .padStart(2, '0')
        + ':'
        + date
          .getMinutes()
          .toString()
          .padStart(2, '0')
      );
    }
    return null;
  };

  calculHours = () => {
    const { startHour, endHour } = this.state;
    const hours = moment(endHour, 'HH:mm:ss').diff(
      moment(startHour, 'HH:mm:ss'),
      'hours'
    );
    const minutes = moment(endHour, 'HH:mm:ss').diff(
      moment(startHour, 'HH:mm:ss'),
      'minutes'
    ) % 60;
    console.log(startHour);
    console.log(endHour);
    console.log(hours);
    console.log(minutes);
    console.log(minutes % 60);
    return hours + 'h ' + minutes + 'm ';
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

  sendEmail = (to_name, from_name, send_to) => {
    console.log('send email');
    emailjs
      .send(
        'service_5dw5k4d',
        'template_svs4ese',
        {
          to_name,
          from_name,
          send_to
        },
        'user_tL8sZHzEcw2kjuBxHvasN'
      )
      .then(
        response => {
          console.log('SUCCESS!', response.status, response.text);
        },
        error => {
          console.log('FAILED...', error);
        }
      );
  };

  render() {
    const {
      classes,
      allAbsenceTypeByState,
      allStaff,
      isLoadingAbsenceRequest,
      absenceRequestResponse,
      errorAbsenceRequest
    } = this.props;
    const {
      staff,
      absenceType,
      startDate,
      endDate,
      minEndDate,
      isStartDateError,
      isEndDateError,
      startHour,
      endHour
    } = this.state;
    console.log(
      moment()
        .startOf(startDate)
        .from(endDate)
    );

    !isLoadingAbsenceRequest
      && absenceRequestResponse
      && this.editingPromiseResolve(absenceRequestResponse);
    !isLoadingAbsenceRequest
      && !absenceRequestResponse
      && this.editingPromiseResolve(errorAbsenceRequest);
    console.log(allAbsenceTypeByState);
    return (
      <div>
        <PapperBlock
          title="Add absence type"
          icon="ios-paper-outline"
          noMargin
          whiteBg
        >
          <Grid
            container
            spacing={6}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              md={7}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 12
              }}
            >
              <Autocomplete
                id="combo-box-demo"
                value={staff}
                options={allStaff}
                getOptionLabel={option => `${option.firstName} ${option.fatherFamilyName} ${
                  option.motherFamilyName
                }`
                }
                getOptionSelected={(option, value) => option.staffId === value.staffId
                }
                onChange={this.handleChangeStaff}
                style={{ width: '40%', marginTop: 1 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Staff"
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                id="combo-box-demo"
                value={absenceType}
                options={allAbsenceTypeByState}
                getOptionLabel={option => `${option.name}`}
                getOptionSelected={(option, value) => option.absenceRequestId === value.absenceRequestId
                }
                onChange={this.handleChangeAbsenceType}
                style={{ width: '40%', marginTop: 1 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Absence Type"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            {absenceType !== null && absenceType.durationType === 'day' ? (
              <Grid
                item
                xs={12}
                md={7}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 12
                }}
              >
                <div style={{ width: '40%', marginTop: 1 }}>
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
                      onChange={value => this.handleDateValue(value, 'startDate')
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div style={{ width: '40%', marginTop: 1 }}>
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
              </Grid>
            ) : (
              <div />
            )}
            {absenceType !== null && absenceType.durationType === 'hour' ? (
              <Grid
                item
                xs={12}
                md={7}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 12
                }}
              >
                <div style={{ width: '40%', marginTop: 1 }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                      disableToolbar
                      variant="inline"
                      format="hh:mm"
                      margin="normal"
                      id="date-picker-inline"
                      name="startHour"
                      label="Start Hour"
                      value={startHour}
                      ampm={false}
                      minutesStep={1}
                      onChange={value => this.handleTimeValue(value, 'startHour')
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change time'
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div style={{ width: '40%', marginTop: 1 }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                      disableToolbar
                      variant="inline"
                      format="hh:mm"
                      margin="normal"
                      id="date-picker-inline"
                      name="endHour"
                      label="End Hour"
                      value={endHour}
                      ampm={false}
                      minutesStep={1}
                      onChange={value => this.handleTimeValue(value, 'endHour')}
                      KeyboardButtonProps={{
                        'aria-label': 'change time'
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </Grid>
            ) : (
              <div />
            )}

            <Grid
              item
              xs={12}
              md={7}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 12
              }}
            >
              <Button
                color="primary"
                variant="contained"
                size="medium"
                onClick={this.handleSubmitAbsenceType}
                disabled={
                  !staff || !absenceType || isStartDateError || isEndDateError
                }
              >
                Submit Request
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allAbsenceTypeByState: state.getIn(['absenceTypes']).allAbsenceTypeByState,
  allStaff: state.getIn(['staffs']).allStaff,
  absenceRequestResponse: state.getIn(['absenceRequests'])
    .absenceRequestResponse,
  isLoadingAbsenceRequest: state.getIn(['absenceRequests']).isLoading,
  errorAbsenceRequest: state.getIn(['absenceRequests']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    saveAbsenceRequest,
    getAllAbsenceRequest,
    getAllAbsenceTypeByState,
    getAllStaff
  },
  dispatch
);

const AddAbsenceTypeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAbsenceType);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddAbsenceTypeMapped changeTheme={changeTheme} classes={classes} />;
};
