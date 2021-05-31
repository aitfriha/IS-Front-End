import React, { Component, useContext } from 'react';
import {
  IconButton,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Tooltip,
  Button,
  Grid,
  TextField,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';

import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Document, Page, pdfjs } from 'react-pdf';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import PublishIcon from '@material-ui/icons/Publish';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showSpinner } from 'dan-redux/actions/uiActions';
import Transition from '../../../components/Transition/transition';
import { ThemeContext } from '../../App/ThemeWrapper';
import CountryService from '../../Services/CountryService';
import StaffService from '../../Services/StaffService';
import StaffDocumentsService from '../../Services/StaffDocumentsService';
import AddressBlock from '../Address';
import styles from './staff-jss';
import {
  setStaff,
  setEdit,
  getAllStaff,
  updateStaff
} from '../../../redux/staff/actions';
import { getAllCountry } from '../../../redux/country/actions';
import { getAllStateByCountry } from '../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../redux/city/actions';
import {
  addStaffDocument,
  deleteStaffDocument
} from '../../../redux/staffDocument/actions';
import notification from '../../../components/Notification/Notification';
pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.js';

/* pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`; */

const inputDoc = React.createRef();

const extList = ['pdf', 'jpg', 'jpeg', 'png', 'tiff'];

const useStyles = makeStyles(styles);

class StaffProfileGeneralInformation extends Component {
  state = {
    isAddDocumentation: false,
    isOpenDocument: false,
    firstName: '',
    fatherFamilyName: '',
    motherFamilyName: '',
    personalPhone: '',
    personalEmail: '',
    companyName: '',
    companyPhone: '',
    companyMobilePhone: '',
    companyEmail: '',
    skype: '',
    birthday: new Date(),
    birthCountry: null,
    emergencyContactName: '',
    emergencyContactPhone: '',
    photo: '',
    fullAddress: '',
    adCountry: null,
    postCode: '',
    state: null,
    city: null,
    docNumber: '',
    docExpeditionDate: new Date(),
    docExpirationDate: new Date(),
    doc: {},
    docExtension: '',
    docId: '',
    docType: ''
  };

  editingPromiseResolve1 = () => {};

  editingPromiseResolve2 = () => {};

  editingPromiseResolve3 = () => {};

  editingPromiseResolve4 = () => {};

  editingPromiseResolve5 = () => {};

  componentDidMount() {
    const {
      staff,
      getAllCountry,
      getAllStateByCountry,
      getAllCityByState,
      showSpinner
    } = this.props;

    const promise1 = new Promise(resolve => {
      // get client information
      getAllCountry();
      this.editingPromiseResolve3 = resolve;
    });
    promise1.then(() => {
      const promise2 = new Promise(resolve => {
        // get client information
        getAllStateByCountry(staff.countryId);
        this.editingPromiseResolve4 = resolve;
      });
      promise2.then(() => {
        const promise3 = new Promise(resolve => {
          // get client information
          getAllCityByState(staff.stateId);
          this.editingPromiseResolve5 = resolve;
        });
        promise3.then(() => {
          this.setInitialData();
          showSpinner(false);
        });
      });
    });
  }

  setInitialData = () => {
    const { staff } = this.props;
    const birthCountry = this.props.allCountrys.filter(
      country => country.countryName === staff.birthCountry
    )[0];
    const adCountry = this.props.allCountrys.filter(
      country => country.countryName === staff.countryName
    )[0];
    const state = this.props.allStateCountrys.filter(
      state1 => state1.stateName === staff.stateName
    )[0];
    const city = this.props.allCitys.filter(
      city1 => city1.cityName === staff.cityName
    )[0];
    this.setState({
      firstName: staff.firstName,
      fatherFamilyName: staff.fatherFamilyName,
      motherFamilyName: staff.motherFamilyName,
      personalPhone: staff.personalPhone,
      personalEmail: staff.personalEmail,
      companyName: staff.companyName,
      companyPhone: staff.companyPhone,
      companyMobilePhone: staff.companyMobilePhone,
      companyEmail: staff.companyEmail,
      skype: staff.skype,
      birthday: new Date(staff.birthday),
      birthCountry,
      emergencyContactName: staff.emergencyContactName,
      emergencyContactPhone: staff.emergencyContactPhone,
      fullAddress: staff.fullAddress,
      adCountry,
      postCode: staff.postCode,
      state,
      city
    });
  };

  handleOpenEditData = () => {
    const { setEdit } = this.props;

    setEdit(true);
  };

  handleOpenEditDocumentation = () => {
    this.setState({
      isAddDocumentation: true
    });
  };

  handleChangeCountry = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllStateByCountry } = this.props;
    const {
      personalPhone,
      companyPhone,
      companyMobilePhone,
      emergencyContactPhone
    } = this.state;
    this.setState({
      adCountry: value,
      personalPhone: value.phonePrefix + personalPhone,
      companyPhone: value.phonePrefix + companyPhone,
      companyMobilePhone: value.phonePrefix + companyMobilePhone,
      emergencyContactPhone: value.phonePrefix + emergencyContactPhone
    });
    getAllStateByCountry(value.countryId);
  };

  handleChangeState = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCityByState } = this.props;
    this.setState({
      state: value
    });
    getAllCityByState(value.stateCountryId);
  };

  handleChangeCity = (ev, value) => {
    this.setState({ city: value });
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleDateValue = (value, name) => {
    this.setState({
      [name]: value
    });
  };

  handleChangeBirthCountry = (ev, value) => {
    this.setState({ birthCountry: value });
  };

  handleCancel = () => {
    const { setEdit } = this.props;
    setEdit(false);
    this.setInitialData();
  };

  handleUpdate = () => {
    const {
      setStaff, setEdit, staff, updateStaff, getAllStaff
    } = this.props;
    const {
      firstName,
      fatherFamilyName,
      motherFamilyName,
      personalPhone,
      personalEmail,
      companyPhone,
      companyMobilePhone,
      companyEmail,
      skype,
      birthday,
      birthCountry,
      emergencyContactName,
      emergencyContactPhone,
      fullAddress,
      postCode,
      city
    } = this.state;
    const newStaff = {
      staffId: staff.staffId,
      firstName,
      fatherFamilyName,
      motherFamilyName,
      personalPhone,
      personalEmail,
      companyPhone,
      companyMobilePhone,
      companyEmail,
      skype,
      birthday: birthday.toISOString().slice(0, 10),
      birthCountry: birthCountry.countryName,
      emergencyContactName,
      emergencyContactPhone,
      addressId: staff.addressId,
      cityId: city ? city.cityId : '',
      fullAddress,
      postCode,
      photo: staff.photo
    };

    const promise = new Promise(resolve => {
      // get client information
      updateStaff(newStaff);
      this.editingPromiseResolve1 = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllStaff();
        setEdit(false);
        StaffService.getStaffById(staff.staffId).then(({ data }) => {
          setStaff(data);
        });
      } else {
        notification('danger', result);
      }
    });
  };

  handleUpdateDocuments = () => {};

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

  handleClose = () => {
    this.setState({
      isAddDocumentation: false,
      docNumber: '',
      docExpeditionDate: new Date(),
      docExpirationDate: new Date(),
      docExtension: '',
      doc: {},
      docType: ''
    });
  };

  handleAddDocument = () => {
    const { setStaff, staff, addStaffDocument } = this.props;
    const {
      docNumber,
      docExpeditionDate,
      docExpirationDate,
      docExtension,
      doc,
      docType
    } = this.state;
    const document = {
      staffId: staff.staffId,
      name: docType,
      number: docNumber,
      expeditionDate: docExpeditionDate.toISOString().slice(0, 10),
      expirationDate: docExpirationDate.toISOString().slice(0, 10),
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
    Object.keys(document).forEach(e => formData.append(e, document[e]));

    const promise = new Promise(resolve => {
      // get client information
      addStaffDocument(formData);
      this.editingPromiseResolve2 = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllStaff();
        StaffService.getStaffById(staff.staffId).then(({ data }) => {
          setStaff(data);
        });
        this.setState({
          isAddDocumentation: false,
          docNumber: '',
          docExpeditionDate: new Date(),
          docExpirationDate: new Date(),
          docExtension: '',
          doc: {},
          docType: ''
        });
      } else {
        notification('danger', result);
      }
    });
  };

  handleOpenDialog = (docId, docExtension) => {
    this.setState({
      isOpenDocument: true,
      docId,
      docExtension
    });
  };

  handleDialogClose = () => {
    this.setState({
      isOpenDocument: false,
      docId: ''
    });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages
    });
  };

  fileToBase64 = file => {
    const binaryString = window.atob(file);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };

  handleFileDataType = ext => {
    switch (ext) {
      case 'pdf':
        return 'application/pdf';
      case 'jpg':
        return 'image/jpeg';
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'tiff':
        return 'image/tiff';
    }
  };

  renderFile = () => {
    const { staff } = this.props;
    const { docId, docExtension } = this.state;
    if (docId !== '') {
      return `data:${this.handleFileDataType(docExtension)};base64,${
        staff.staffDocuments.find(doc => doc.staffDocumentId === docId).document
      }`;
    }
    return '';
  };

  handleDeleteDocument = documentId => {
    const { setStaff, staff, deleteStaffDocument } = this.props;
    const promise = new Promise(resolve => {
      // get client information
      deleteStaffDocument(documentId);
      this.editingPromiseResolve2 = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllStaff();
        StaffService.getStaffById(staff.staffId).then(({ data }) => {
          setStaff(data);
        });
      } else {
        notification('danger', result);
      }
    });
  };

  render() {
    const {
      classes,
      staff,
      isEdit,
      allCountrys,
      allStateCountrys,
      allCitys,
      isLoadingStaff,
      staffResponse,
      errorStaff,
      isLoadingStaffDocument,
      staffDocumentResponse,
      errorStaffDocument,
      isLoadingCountry,
      countryResponse,
      errorsCountry,
      isLoadingState,
      stateCountryResponse,
      errorsState,
      isLoadingCity,
      cityResponse,
      errorsCity,
      logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    /*    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.hh_functionalStructureDefinition_export) {
      exportButton = true;
    } */
    const {
      isAddDocumentation,
      isOpenDocument,
      firstName,
      fatherFamilyName,
      motherFamilyName,
      personalPhone,
      personalEmail,
      companyPhone,
      companyMobilePhone,
      companyEmail,
      skype,
      birthday,
      birthCountry,
      emergencyContactName,
      emergencyContactPhone,
      adCountry,
      state,
      city,
      fullAddress,
      postCode,
      docNumber,
      docExpeditionDate,
      docExpirationDate,
      doc,
      docExtension,
      docType
    } = this.state;
    const docTypes = [
      'ID Card',
      'Passport',
      'Professional ID Card',
      'Health National Security Card'
    ];
    !isLoadingStaff
      && staffResponse
      && this.editingPromiseResolve1(staffResponse);
    !isLoadingStaff
      && !staffResponse
      && this.editingPromiseResolve1(errorStaff);

    !isLoadingStaffDocument
      && staffDocumentResponse
      && this.editingPromiseResolve2(staffDocumentResponse);
    !isLoadingStaffDocument
      && !staffDocumentResponse
      && this.editingPromiseResolve2(errorStaffDocument);

    !isLoadingCountry
      && countryResponse
      && this.editingPromiseResolve3(countryResponse);
    !isLoadingCountry
      && !countryResponse
      && this.editingPromiseResolve3(errorsCountry);

    !isLoadingState
      && stateCountryResponse
      && this.editingPromiseResolve4(stateCountryResponse);
    !isLoadingState
      && !stateCountryResponse
      && this.editingPromiseResolve4(errorsState);

    !isLoadingCity && cityResponse && this.editingPromiseResolve5(cityResponse);
    !isLoadingCity && !cityResponse && this.editingPromiseResolve5(errorsCity);
    return (
      <div>
        hello
        <Dialog
          maxWidth="lg"
          TransitionComponent={Transition}
          fullWidth
          scroll="body"
          aria-labelledby="changeProfilePic"
          open={isOpenDocument}
          classes={{
            paper: classes.paper
          }}
        >
          <DialogTitle id="SaveFormula">Document preview</DialogTitle>
          <DialogContent>
            {docExtension === 'pdf' ? (
              <Document
                file={this.renderFile()}
                onLoadSuccess={this.onDocumentLoadSuccess}
                onLoadError={console.error}
              >
                {/* <Page pageNumber={10} />*/}
              </Document>
            ) : (
              <img src={this.renderFile()} alt="Document" />
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleDialogClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleDownload} color="primary">
              Download
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={isAddDocumentation}
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">Add new document</DialogTitle>
          <DialogContent>
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
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="docType"
                value={docType}
                onChange={this.handleChange}
              >
                {docTypes.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Number"
              variant="outlined"
              name="docNumber"
              fullWidth
              required
              value={docNumber}
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
                name="docExpeditionDate"
                label="Expedition date"
                value={docExpeditionDate}
                onChange={value => this.handleDateValue(value, 'docExpeditionDate')
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                fullWidth
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                name="docExpirationDate"
                label="Expiration date"
                value={docExpirationDate}
                onChange={value => this.handleDateValue(value, 'docExpirationDate')
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleAddDocument}
              disabled={doc.constructor === Object}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classes.divSpace}>
          <Typography
            variant="subtitle1"
            style={{
              fontFamily: 'sans-serif , Arial',
              fontSize: '20px',
              fontWeight: 'bold'
            }}
            color="secondary"
          >
            Personal Information :
          </Typography>
          {!isEdit ? (
            <div>
              {thelogedUser.userRoles[0].actionsNames.hh_staff_personalInformationManagement_modify
                ? (
                  <Tooltip title="Edit">
                    <Button
                      name="personalInformation"
                      style={{ backgroundColor: 'transparent' }}
                      disableRipple
                      endIcon={<EditIcon />}
                      onClick={this.handleOpenEditData}
                    />
                  </Tooltip>
                ) : null}
            </div>
          ) : (
            <div />
          )}
        </div>
        {!isEdit ? (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 10
              }}
            >
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-person" />
                </Avatar>
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Company :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.companyName}
                  </Typography>
                </div>
              </div>
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-calendar" />
                </Avatar>
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Birthday :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.birthday}
                  </Typography>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 10
              }}
            >
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-map" />
                </Avatar>
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Birth Country :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.birthCountry}
                  </Typography>
                </div>
              </div>
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-map" />
                </Avatar>
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Residence Country :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.countryName}
                  </Typography>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 10
              }}
            >
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-alert" />
                </Avatar>
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Emergency Contact Name :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.emergencyContactName}
                  </Typography>
                </div>
              </div>
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-alert" />
                </Avatar>
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Emergency Contact Phone :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.emergencyContactPhone}
                  </Typography>
                </div>
              </div>
            </div>
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: 'sans-serif , Arial',
                fontSize: '20px',
                fontWeight: 'bold',
                marginTop: 10
              }}
              color="secondary"
            >
              Address :
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 10
              }}
            >
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-locate" />
                </Avatar>
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Address :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.fullAddress}
                  </Typography>
                </div>
              </div>
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-locate" />
                </Avatar>
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'Post code :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.postCode}
                  </Typography>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 10
              }}
            >
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-locate" />
                </Avatar>
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'City :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.cityName}
                  </Typography>
                </div>
              </div>
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-locate" />
                </Avatar>
                <div style={{ marginLeft: 20 }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px'
                    }}
                    color="secondary"
                  >
                    {'State :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '17px',
                      opacity: 0.7
                    }}
                  >
                    {staff.stateName}
                  </Typography>
                </div>
              </div>
            </div>
            {' '}
          </div>
        ) : (
          <div />
        )}

        {isEdit ? (
          <div>
            <Grid
              container
              spacing={6}
              direction="row"
              justifyContent="left"
              alignItems="start"
            >
              <Grid item xs={12} md={4}>
                <Chip
                  label="Personal information"
                  avatar={<Avatar>P</Avatar>}
                  color="primary"
                />
                <Divider
                  variant="fullWidth"
                  style={{ marginBottom: '10px', marginTop: '10px' }}
                />
                <TextField
                  id="outlined-basic"
                  label="First name"
                  variant="outlined"
                  name="firstName"
                  fullWidth
                  required
                  value={firstName}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Father family name"
                  variant="outlined"
                  name="fatherFamilyName"
                  fullWidth
                  required
                  value={fatherFamilyName}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Mother family name"
                  variant="outlined"
                  name="motherFamilyName"
                  fullWidth
                  required
                  value={motherFamilyName}
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
                    name="birthday"
                    label="Birthday"
                    value={birthday}
                    onChange={value => this.handleDateValue(value, 'birthday')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
                <Autocomplete
                  id="combo-box-demo"
                  value={birthCountry}
                  options={allCountrys}
                  getOptionLabel={option => option.countryName}
                  onChange={this.handleChangeBirthCountry}
                  style={{ marginTop: 25 }}
                  clearOnEscape
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Birth Country"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Chip
                  label="Contact information"
                  avatar={<Avatar>C</Avatar>}
                  color="primary"
                />
                <Divider
                  variant="fullWidth"
                  style={{ marginBottom: '10px', marginTop: '10px' }}
                />
                <TextField
                  id="outlined-basic"
                  label="Personal phone"
                  variant="outlined"
                  name="personalPhone"
                  fullWidth
                  required
                  value={personalPhone}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Personal email"
                  variant="outlined"
                  name="personalEmail"
                  fullWidth
                  required
                  value={personalEmail}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Comapany phone"
                  variant="outlined"
                  name="companyPhone"
                  fullWidth
                  value={companyPhone}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Comapany mobile phone"
                  variant="outlined"
                  name="companyMobilePhone"
                  fullWidth
                  value={companyMobilePhone}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Company email"
                  variant="outlined"
                  name="companyEmail"
                  fullWidth
                  value={companyEmail}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Skype"
                  variant="outlined"
                  name="skype"
                  fullWidth
                  value={skype}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Emergency contact name"
                  variant="outlined"
                  name="emergencyContactName"
                  fullWidth
                  value={emergencyContactName}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Emergency contact phone"
                  variant="outlined"
                  name="emergencyContactPhone"
                  fullWidth
                  value={emergencyContactPhone}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Chip
                  label="Address"
                  avatar={<Avatar>A</Avatar>}
                  color="primary"
                />
                <Divider
                  variant="fullWidth"
                  style={{ marginBottom: '10px', marginTop: '10px' }}
                />
                <div style={{ marginTop: 25 }}>
                  <div>
                    <Autocomplete
                      id="combo-box-demo"
                      value={adCountry}
                      options={allCountrys}
                      getOptionLabel={option => option.countryName}
                      onChange={this.handleChangeCountry}
                      clearOnEscape
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Choose the country"
                          variant="outlined"
                          required
                        />
                      )}
                    />
                    <Autocomplete
                      id="combo-box-demo"
                      value={state}
                      options={allStateCountrys}
                      getOptionLabel={option => option.stateName}
                      onChange={this.handleChangeState}
                      style={{ marginTop: 15 }}
                      clearOnEscape
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Choose the state"
                          variant="outlined"
                          required
                        />
                      )}
                    />
                    <Autocomplete
                      id="combo-box-demo"
                      value={city}
                      options={allCitys}
                      getOptionLabel={option => (option ? option.cityName : '')}
                      onChange={this.handleChangeCity}
                      style={{ marginTop: 15 }}
                      clearOnEscape
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Choose the city"
                          variant="outlined"
                          required
                        />
                      )}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Full Address"
                      variant="outlined"
                      name="fullAddress"
                      fullWidth
                      multiline
                      value={fullAddress}
                      className={classes.textField}
                      onChange={this.handleChange}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Post Code"
                      variant="outlined"
                      fullWidth
                      required
                      name="postCode"
                      value={postCode}
                      className={classes.textField}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
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
          </div>
        ) : (
          <div />
        )}

        <div className={classes.divSpace}>
          {!isEdit ? (
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: 'sans-serif , Arial',
                fontSize: '20px',
                fontWeight: 'bold',
                marginTop: 10
              }}
              color="secondary"
            >
              Document :
            </Typography>
          ) : (
            <div />
          )}
          {!isEdit ? (
            <div>
              {thelogedUser.userRoles[0].actionsNames.hh_staff_personalInformationManagement_create
                ? (
                  <Tooltip title="Edit">
                    <Button
                      name="personalInformation"
                      style={{ backgroundColor: 'transparent' }}
                      disableRipple
                      endIcon={<AddBoxIcon />}
                      onClick={this.handleOpenEditDocumentation}
                    />
                  </Tooltip>
                ) : null}
            </div>
          ) : (
            <div />
          )}
        </div>
        {!isEdit ? (
          <div>
            <Table className={classes.table} aria-label="">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Number</TableCell>
                  <TableCell align="right">Expedition Date</TableCell>
                  <TableCell align="right">Expiration Date</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {staff.staffDocuments ? (
                  staff.staffDocuments.map(row => (
                    <TableRow key={row.staffDocumentId}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.number}</TableCell>
                      <TableCell align="right">{row.expeditionDate}</TableCell>
                      <TableCell align="right">{row.expirationDate}</TableCell>
                      <TableCell align="right">
                        {thelogedUser.userRoles[0].actionsNames.hh_staff_personalInformationManagement_access
                          ? (
                            <IconButton
                              onClick={() => this.handleOpenDialog(
                                row.staffDocumentId,
                                row.docExtension
                              )
                              }
                            >
                              <VisibilityIcon color="gray" />

                            </IconButton>
                          ) : null}
                        {thelogedUser.userRoles[0].actionsNames.hh_staff_personalInformationManagement_delete
                          ? (
                            <IconButton
                              onClick={() => this.handleDeleteDocument(row.staffDocumentId)
                              }
                            >
                              <DeleteForeverIcon color="red" />
                            </IconButton>
                          ) : null}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow />
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div />
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
  errorStaff: state.getIn(['staffs']).errors,
  staffDocumentResponse: state.getIn(['staffDocuments']).staffDocumentResponse,
  isLoadingStaffDocument: state.getIn(['staffDocuments']).isLoading,
  errorStaffDocument: state.getIn(['staffDocuments']).errors,
  isEdit: state.getIn(['staffs']).isEditStaff,
  // country
  allCountrys: state.getIn(['countries']).allCountrys,
  countryResponse: state.getIn(['countries']).countryResponse,
  isLoadingCountry: state.getIn(['countries']).isLoading,
  errorsCountry: state.getIn(['countries']).errors,
  // state
  allStateCountrys: state.getIn(['stateCountries']).allStateCountrys,
  stateCountryResponse: state.getIn(['stateCountries']).stateCountryResponse,
  isLoadingState: state.getIn(['stateCountries']).isLoading,
  errorsState: state.getIn(['stateCountries']).errors,
  // city
  allCitys: state.getIn(['cities']).allCitys,
  cityResponse: state.getIn(['cities']).cityResponse,
  isLoadingCity: state.getIn(['cities']).isLoading,
  errorsCity: state.getIn(['cities']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateStaff,
    getAllStaff,
    setStaff,
    setEdit,
    addStaffDocument,
    deleteStaffDocument,
    getAllCountry,
    getAllStateByCountry,
    getAllCityByState,
    showSpinner
  },
  dispatch
);

const StaffProfileGeneralInformationMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffProfileGeneralInformation);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <StaffProfileGeneralInformationMapped
      changeTheme={changeTheme}
      classes={classes}
    />
  );
};
