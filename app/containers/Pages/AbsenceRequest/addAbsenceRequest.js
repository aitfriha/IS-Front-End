import React, { useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  IconButton,
  Tooltip
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import moment from 'moment';
import { PapperBlock } from 'dan-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from './absenceRequest-jss';
import history from '../../../utils/history';
import '../Configurations/map/app.css';
import { ThemeContext } from '../../App/ThemeWrapper';
import { isString } from 'lodash';
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
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(styles);

const extList = ['pdf', 'jpg', 'jpeg', 'png', 'tiff'];

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
      hourRate: 0,
      doc: {},
      docExtension: '',
      isSubmit: false,
      docList: [{ inputDoc: React.createRef(), doc: {}, docExtension: '' }]
    };
  }

  componentDidMount() {
    const { changeTheme, getAllStaff } = this.props;
    changeTheme('blueCyanTheme');
    getAllStaff();
  }

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  handleSubmitAbsenceType = () => {
    const { saveAbsenceRequest, getAllAbsenceRequest } = this.props;
    const {
      staff,
      absenceType,
      startDate,
      endDate,
      hourRate,
      docList
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
      hourRate: absenceType.durationType === 'hour' ? hourRate : '-',
      staffId: staff.staffId,
      absenceTypeId: absenceType.absenceTypeId,
      fromName:
        staff.firstName
        + ' '
        + staff.fatherFamilyName
        + ' '
        + staff.motherFamilyName
    };

    const docExtensionList = [];
    const formData = new FormData();
    docList.forEach(doc => {
      if (doc.doc.constructor === File) {
        docExtensionList.push(doc.docExtension);
        formData.append('docList', doc.doc);
      }
    });

    /* if (doc.constructor === File) {
      formData.append('doc', doc);
    } else {
      formData.append(
        'doc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    } */
    formData.append('docExtensionList', docExtensionList);

    Object.keys(absenceRequest).forEach(e => formData.append(e, absenceRequest[e])
    );
    const promise = new Promise(resolve => {
      this.setState({
        isSubmit: true
      });
      saveAbsenceRequest(formData);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      this.setState({
        isSubmit: false
      });
      if (isString(result)) {
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
    console.log(value);
    getAllAbsenceTypeByState(value.contractTypeStateId);
    this.setState({ staff: value });
  };

  handleChangeAbsenceType = (ev, value) => {
    console.log(value);
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

  handleUploadDocClick = index => {
    const { docList } = this.state;
    console.log(index);
    console.log(docList[index]);
    docList[index].inputDoc.current.click();
  };

  handleDocChange = index => {
    const { docList } = this.state;
    const lastDot = docList[index].inputDoc.current.files[0].name.lastIndexOf(
      '.'
    );
    const ext = docList[index].inputDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (extList.includes(ext)) {
      docList[index].doc = docList[index].inputDoc.current.files[0];
      docList[index].docExtension = ext;
      this.setState({
        docList
      });
    }
  };

  handleCheckHourRateValue = () => {
    const { hourRate, absenceType } = this.state;
    if (absenceType && absenceType.durationType === 'hour') {
      if (
        Number(hourRate) === parseFloat(hourRate)
        && parseFloat(hourRate) <= 1
        && parseFloat(hourRate) > 0
      ) {
        console.log('return false');
        return false;
      }
      return true;
    }
    return false;
  };

  handleAddDocumentButton = () => {
    const { docList } = this.state;
    docList.push({ inputDoc: React.createRef(), doc: {}, docExtension: '' });
    this.setState({
      docList
    });
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
      hourRate,
      isSubmit,
      docList
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
    return (
      <div>
        <PapperBlock
          title="Add Absence Request"
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
            {absenceType !== null && absenceType.durationType === 'hour' && (
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
                <div style={{ width: '100%' }}>
                  <TextField
                    id="outlined-basic"
                    label="Hour rate"
                    variant="outlined"
                    name="hourRate"
                    value={hourRate}
                    fullWidth
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  {this.handleCheckHourRateValue() && (
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#dc3545',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '11px'
                      }}
                    >
                      the inserted value must be a decimal number greater than 0
                      and equal or less than 1
                    </Typography>
                  )}
                </div>
              </Grid>
            )}
            <Grid item xs={12} md={7}>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                {absenceType !== null
                  && absenceType.documentsMandatory === 'yes'
                  && docList.length > 0
                  && docList.map((doc, index) => (
                    <Button
                      className={
                        doc.doc.constructor === Object
                          ? classes.uploadAvatarEmpty
                          : classes.uploadAvatarDone
                      }
                      onClick={() => this.handleUploadDocClick(index)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <input
                          type="file"
                          id="file"
                          accept=".png, .jpg, .jpeg, .pdf, .tiff"
                          ref={doc.inputDoc}
                          multiple={false}
                          style={{ display: 'none' }}
                          onChange={() => this.handleDocChange(index)}
                        />
                        <PublishIcon
                          className={classes.uploadIcon}
                          color="secondary"
                        />
                      </div>
                    </Button>
                  ))}
              </div>
            </Grid>
            {absenceType !== null && absenceType.documentsMandatory === 'yes' && (
              <Grid
                item
                xs={12}
                md={7}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 5
                }}
              >
                <Tooltip title="Add Document Field">
                  <IconButton
                    color="primary"
                    variant="contained"
                    size="medium"
                    onClick={this.handleAddDocumentButton}
                    disabled={docList.length === 18}
                  >
                    <AddCircleOutlineIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              </Grid>
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
                  !staff
                  || !absenceType
                  || isStartDateError
                  || isEndDateError
                  || (absenceType.documentsMandatory === 'yes'
                    && docList.length > 0
                    && docList[0].doc.constructor === Object)
                  || isSubmit
                  || this.handleCheckHourRateValue()
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
