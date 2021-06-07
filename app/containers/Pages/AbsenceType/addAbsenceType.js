import React, { useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  FormControl,
  InputLabel,
  FormLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import { PapperBlock } from 'dan-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutoComplete from '../../../components/AutoComplete';
import styles from './absenceType-jss';
import history from '../../../utils/history';
import '../Configurations/map/app.css';
import { ThemeContext } from '../../App/ThemeWrapper';
import { isString } from 'lodash';
import CountryService from '../../Services/CountryService';
import StateCountryService from '../../Services/StateCountryService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getAllAbsenceType,
  getAllAbsenceTypeByState,
  saveAbsenceType
} from '../../../redux/absenceType/actions';
import { getAllStaff } from '../../../redux/staff/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

const inputDoc = React.createRef();

const extList = ['pdf', 'jpg', 'jpeg', 'png', 'tiff'];

class AddAbsenceType extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {};
    this.state = {
      code: '',
      name: '',
      description: '',
      country: null,
      state: null,
      countries: [],
      states: [],
      durationType: '',
      documentsMandatory: '',
      absenceResponsible: null,
      inCopyResponsible: null,
      doc: {},
      docExtension: ''
    };
  }

  componentDidMount() {
    const { changeTheme, getAllStaff } = this.props;
    changeTheme('blueCyanTheme');
    getAllStaff();
    CountryService.getCountries().then(({ data }) => {
      this.setState({ countries: data });
    });
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitAbsenceType = () => {
    const { saveAbsenceType, getAllAbsenceType } = this.props;
    const {
      code,
      name,
      description,
      state,
      durationType,
      documentsMandatory,
      absenceResponsible,
      inCopyResponsible,
      docExtension,
      doc
    } = this.state;
    const absenceType = {
      code,
      name,
      description,
      durationType,
      documentsMandatory,
      stateId: state.stateCountryId,
      absenceResponsibleId: absenceResponsible.staffId,
      inCopyResponsibleId: inCopyResponsible.staffId,
      docExtension
    };

    const formData = new FormData();
    if (doc.constructor === File) {
      formData.append('doc', doc);
    } else {
      formData.append(
        'doc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    }
    Object.keys(absenceType).forEach(e => formData.append(e, absenceType[e]));

    const promise = new Promise(resolve => {
      saveAbsenceType(formData);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllAbsenceType();
        console.log(result);
        history.push('/app/hh-rr/absenceType');
      } else {
        console.log(result);
        notification('danger', result);
      }
    });
  };

  handleChangeCountry = (ev, value) => {
    StateCountryService.getStatesByCountry(value.countryId).then(({ data }) => {
      console.log(data);
      this.setState({
        country: value,
        states: data.payload
      });
    });
  };

  handleChangeState = (ev, value) => {
    const { getAllAbsenceTypeByState } = this.props;
    this.setState({ state: value });
    getAllAbsenceTypeByState(value.stateCountryId);
  };

  handleChangeAbsenceResponsible = (ev, value) => {
    this.setState({ absenceResponsible: value });
  };

  handleChangeInCopyResponsible = (ev, value) => {
    this.setState({ inCopyResponsible: value });
  };

  handleValueChange = (value, type) => {
    console.log(value, type);
    this.setState({ [type]: value });
  };

  handleUploadDocClick = () => {
    inputDoc.current.click();
  };

  handleDocChange = () => {
    const lastDot = inputDoc.current.files[0].name.lastIndexOf('.');
    const ext = inputDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (extList.includes(ext)) {
      this.setState({
        doc: inputDoc.current.files[0],
        docExtension: ext
      });
    }
  };

  render() {
    const {
      classes,
      isLoadingAbsenceType,
      absenceTypeResponse,
      errorAbsenceType,
      allAbsenceTypeByState,
      allStaff
    } = this.props;
    const {
      code,
      name,
      description,
      countries,
      states,
      country,
      state,
      durationType,
      documentsMandatory,
      absenceResponsible,
      inCopyResponsible,
      doc
    } = this.state;
    !isLoadingAbsenceType
      && absenceTypeResponse
      && this.editingPromiseResolve(absenceTypeResponse);
    !isLoadingAbsenceType
      && !absenceTypeResponse
      && this.editingPromiseResolve(errorAbsenceType);
    console.log(allAbsenceTypeByState);

    const menuItems = [
      { name: 'Hours', value: 'hour' },
      { name: 'Days', value: 'day' }
    ];

    return (
      <div>
        <PapperBlock
          desc=""
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
                value={country}
                options={countries}
                getOptionLabel={option => option.countryName}
                onChange={this.handleChangeCountry}
                style={{ width: '40%', marginTop: 1 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Country"
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                id="combo-box-demo"
                value={state}
                options={states}
                getOptionLabel={option => option.stateName}
                onChange={this.handleChangeState}
                style={{ width: '40%', marginTop: 1 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="State"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
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
              <div
                style={
                  Object.keys(states).length === 0
                    ? { pointerEvents: 'none', opacity: '0.7', width: '40%' }
                    : { width: '40%' }
                }
              >
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Code"
                  data={allAbsenceTypeByState}
                  type="code"
                  attribute="code"
                  lenghtCode="10"
                />
              </div>
              <div
                style={
                  Object.keys(states).length === 0
                    ? { pointerEvents: 'none', opacity: '0.7', width: '40%' }
                    : { width: '40%' }
                }
              >
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Name"
                  data={allAbsenceTypeByState}
                  type="name"
                  attribute="name"
                  disabled={Object.keys(states).length === 0}
                />
              </div>
            </Grid>

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
                value={absenceResponsible}
                options={allStaff}
                getOptionLabel={option => `${option.firstName} ${option.fatherFamilyName} ${
                  option.motherFamilyName
                }`
                }
                getOptionSelected={(option, value) => option.staffId === value.staffId
                }
                onChange={this.handleChangeAbsenceResponsible}
                style={{ width: '40%', marginTop: 1 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Absence Responsible"
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                id="combo-box-demo"
                value={inCopyResponsible}
                options={allStaff}
                getOptionLabel={option => `${option.firstName} ${option.fatherFamilyName} ${
                  option.motherFamilyName
                }`
                }
                getOptionSelected={(option, value) => option.staffId === value.staffId
                }
                onChange={this.handleChangeInCopyResponsible}
                style={{ width: '40%', marginTop: 1 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="InCopy Responsible"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
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
              <FormControl
                className={classes.formControl}
                style={{ width: '40%', marginTop: 1 }}
              >
                <InputLabel>Duration Type</InputLabel>

                <Select
                  name="durationType"
                  value={durationType}
                  onChange={this.handleChange}
                >
                  {menuItems.map(item => (
                    <MenuItem key={item.name} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div style={{ width: '40%', marginTop: 1 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Are documents mandatory?
                  </FormLabel>
                  <RadioGroup
                    aria-label="isCommercialLevel1"
                    row
                    name="documentsMandatory"
                    value={documentsMandatory}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>
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
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description"
                value={description}
                style={{ width: '100%' }}
                className={classes.textField}
                onChange={this.handleChange}
              />
            </Grid>
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 20,
                  marginBottom: 20,
                  width: '100%'
                }}
              >
                <IconButton
                  className={
                    doc.constructor === Object
                      ? classes.uploadAvatarEmpty
                      : classes.uploadAvatarDone
                  }
                  onClick={this.handleUploadDocClick}
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
                      ref={inputDoc}
                      multiple={false}
                      style={{ display: 'none' }}
                      onChange={this.handleDocChange}
                    />
                    <PublishIcon
                      className={classes.uploadIcon}
                      color="secondary"
                    />
                    <Typography
                      variant="subtitle1"
                      className={classes.uploadText}
                    >
                      Document
                    </Typography>
                  </div>
                </IconButton>
              </div>
            </Grid>

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
                  !code
                  || !name
                  || durationType === ''
                  || documentsMandatory === ''
                  || !absenceResponsible
                  || !inCopyResponsible
                }
              >
                Save Type
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allAbsenceType: state.getIn(['absenceTypes']).allAbsenceType,
  allAbsenceTypeByState: state.getIn(['absenceTypes']).allAbsenceTypeByState,
  absenceTypeResponse: state.getIn(['absenceTypes']).absenceTypeResponse,
  isLoadingAbsenceType: state.getIn(['absenceTypes']).isLoading,
  errorAbsenceType: state.getIn(['absenceTypes']).errors,
  allStaff: state.getIn(['staffs']).allStaff
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    saveAbsenceType,
    getAllAbsenceType,
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
