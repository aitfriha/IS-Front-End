import React, { Component } from 'react';
import {
  IconButton,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
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
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import PublishIcon from '@material-ui/icons/Publish';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import notification from '../../../components/Notification/Notification';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const inputDoc = React.createRef();

const extList = ['pdf', 'jpg', 'jpeg', 'png', 'tiff'];

class StaffProfileGeneralInformation extends Component {
  state = {
    isEditData: false,
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
    birthCountry: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    photo: '',
    fullAddress: '',
    adCountry: {},
    postCode: '',
    state: {},
    city: {},
    localData: {},
    docNumber: '',
    docExpeditionDate: new Date(),
    docExpirationDate: new Date(),
    doc: {},
    docExtension: '',
    docId: '',
    docType: ''
  };

  componentDidMount() {
    this.setInitialData();
    CountryService.getCountries().then(({ data }) => {
      this.setState({ countries: data });
    });
  }

  setInitialData = () => {
    const { staff } = this.props;
    console.log(staff);
    this.setState({
      firstName: staff.firstName,
      fatherFamilyName: staff.fatherFamilyName,
      motherFamilyName: staff.motherFamilyName,
      personalPhone: staff.personalPhone,
      personalEmail: staff.personalEmail,
      companyName: staff.staffContract.companyName,
      companyPhone: staff.companyPhone,
      companyMobilePhone: staff.companyMobilePhone,
      companyEmail: staff.companyEmail,
      skype: staff.skype,
      birthday: new Date(staff.birthday),
      birthCountry: staff.birthCountry,
      emergencyContactName: staff.emergencyContactName,
      emergencyContactPhone: staff.emergencyContactPhone,
      fullAddress: staff.address.fullAddress,
      adCountry: staff.address.city.stateCountry.country,
      postCode: staff.address.postCode,
      state: staff.address.city.stateCountry,
      city: staff.address.city,
      hnsCardNumber: '',
      hnsCardExpeditionDate: new Date(),
      hnsCardExpirationDate: new Date(),
      idCardDoc: {},
      passportDoc: {},
      professionalIdCardDoc: {},
      hnsCardDoc: {},
      isEditData: false
    });
  };

  restoreData = () => {
    const { staff } = this.props;
    this.setState({
      firstName: staff.firstName,
      fatherFamilyName: staff.fatherFamilyName,
      motherFamilyName: staff.motherFamilyName,
      personalPhone: staff.personalPhone,
      personalEmail: staff.personalEmail,
      companyName: staff.staffContract.companyName,
      companyPhone: staff.companyPhone,
      companyMobilePhone: staff.companyMobilePhone,
      companyEmail: staff.companyEmail,
      skype: staff.skype,
      birthday: new Date(staff.birthday),
      birthCountry: staff.birthCountry,
      emergencyContactName: staff.emergencyContactName,
      emergencyContactPhone: staff.emergencyContactPhone,
      fullAddress: staff.address.fullAddress,
      adCountry: staff.address.city.stateCountry.country,
      postCode: staff.address.postCode,
      state: staff.address.city.stateCountry,
      city: staff.address.city,
      isEditData: false
    });
  };

  handleOpenEditData = () => {
    const { setEdit } = this.props;
    const {
      personalPhone,
      companyPhone,
      companyMobilePhone,
      emergencyContactPhone
    } = this.state;
    this.setState(
      {
        isEditData: true,
        personalPhone: personalPhone.slice(4),
        companyPhone: companyPhone.slice(4),
        companyMobilePhone: companyMobilePhone.slice(4),
        emergencyContactPhone: emergencyContactPhone.slice(4)
      },
      () => {
        setEdit(true);
      }
    );
  };

  handleOpenEditDocumentation = () => {
    this.setState({
      isAddDocumentation: true
    });
  };

  handleChange = ev => {
    const {
      personalPhone,
      companyPhone,
      companyMobilePhone,
      emergencyContactPhone
    } = this.state;
    if (ev.target.name === 'adCountry') {
      this.setState({
        personalPhone: ev.target.value.phonePrefix + personalPhone,
        companyPhone: ev.target.value.phonePrefix + companyPhone,
        companyMobilePhone: ev.target.value.phonePrefix + companyMobilePhone,
        emergencyContactPhone:
          ev.target.value.phonePrefix + emergencyContactPhone
      });
    }
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
    this.restoreData();
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
      addressId: staff.address.addressId,
      cityId: city.cityId,
      fullAddress,
      postCode
    };

    const promise = new Promise(resolve => {
      // get client information
      updateStaff(newStaff);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllStaff();
      } else {
        notification('danger', result);
      }
    });

    /* StaffService.updateStaff(newStaff).then(({ data }) => {
      console.log(data);
      this.setState(
        {
          isEditData: false
        },
        () => {
          setEdit(false);
          setStaff(data);
        }
      );
    }); */
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
      isAddDocumentation: false
    });
  };

  handleAddDocument = () => {
    const { setStaff, staff } = this.props;
    const {
      docNumber,
      docExpeditionDate,
      docExpirationDate,
      docExtension,
      doc,
      docType
    } = this.state;
    const document = {
      name: docType,
      number: docNumber,
      expeditionDate: docExpeditionDate.toISOString().slice(0, 10),
      expirationDate: docExpirationDate.toISOString().slice(0, 10),
      docExtension
    };

    const formData = new FormData();
    formData.append('doc', doc);
    formData.append(
      'staffDocuments',
      new Blob([JSON.stringify(document)], {
        type: 'application/json'
      })
    );

    StaffDocumentsService.addStaffDocument(formData, staff.staffId).then(() => {
      StaffService.getStaffById(staff.staffId).then(({ data }) => {
        setStaff(data);
        this.setState({
          isAddDocumentation: false
        });
      });
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
        staff.staffDocuments.find(doc => doc.staffDocumentsId === docId)
          .document
      }`;
    }
    return '';
  };

  handleDeleteDocument = documentId => {
    const { setStaff, staff } = this.props;
    StaffDocumentsService.deleteStaffDocument(documentId).then(() => {
      StaffService.getStaffById(staff.staffId).then(({ data }) => {
        setStaff(data);
      });
    });
  };

  render() {
    const { classes, staff } = this.props;
    const {
      isEditData,
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
      countries,
      docNumber,
      docExpeditionDate,
      docExpirationDate,
      doc,
      docExtension,
      docType
    } = this.state;
    console.log(staff);
    const docTypes = [
      'ID Card',
      'Passport',
      'Professional ID Card',
      'Health National Security Card'
    ];
    !isLoadingStaff
      && staffResponse
      && this.editingPromiseResolve(staffResponse);
    !isLoadingStaff && !staffResponse && this.editingPromiseResolve(errorStaff);
    return (
      <div>
        <Dialog
          maxWidth="lg"
          fullWidth
          scroll="paper"
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
                <Page pageNumber={pageNumber} />
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
          {!isEditData ? (
            <div>
              <Tooltip title="Edit">
                <Button
                  name="personalInformation"
                  style={{ backgroundColor: 'transparent' }}
                  disableRipple
                  endIcon={<EditIcon />}
                  onClick={this.handleOpenEditData}
                />
              </Tooltip>
            </div>
          ) : (
            <div />
          )}
        </div>
        {!isEditData ? (
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
                    {staff.staffContract.companyName}
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
                    {staff.address.city.stateCountry.country.countryName}
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
                    {staff.address.fullAddress}
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
                    {staff.address.postCode}
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
                    {staff.address.city.cityName}
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
                    {staff.address.city.stateCountry.stateName}
                  </Typography>
                </div>
              </div>
            </div>
            {' '}
          </div>
        ) : (
          <div />
        )}

        {isEditData ? (
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
                  options={countries}
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
                  <AddressBlock onChangeInput={this.handleChange} />
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
          {!isEditData ? (
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
          {!isEditData ? (
            <div>
              <Tooltip title="Edit">
                <Button
                  name="personalInformation"
                  style={{ backgroundColor: 'transparent' }}
                  disableRipple
                  endIcon={<AddBoxIcon />}
                  onClick={this.handleOpenEditDocumentation}
                />
              </Tooltip>
            </div>
          ) : (
            <div />
          )}
        </div>
        {!isEditData ? (
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
                    <TableRow key={row.staffDocumentsId}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.number}</TableCell>
                      <TableCell align="right">{row.expeditionDate}</TableCell>
                      <TableCell align="right">{row.expirationDate}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => this.handleOpenDialog(
                            row.staffDocumentsId,
                            row.docExtension
                          )
                          }
                        >
                          <VisibilityIcon color="gray" />
                        </IconButton>
                        <IconButton
                          onClick={() => this.handleDeleteDocument(row.staffDocumentsId)
                          }
                        >
                          <DeleteForeverIcon color="red" />
                        </IconButton>
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

StaffProfileGeneralInformation.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  staff: state.getIn(['staffs']).selectedStaff,
  allStaff: state.getIn(['staffs']).allStaff,
  staffResponse: state.getIn(['staffs']).staffResponse,
  isLoadingStaff: state.getIn(['staffs']).isLoading,
  errorsStaff: state.getIn(['staffs']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateStaff,
    getAllStaff,
    setStaff,
    setEdit
  },
  dispatch
);

const StaffProfileGeneralInformationMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffProfileGeneralInformation);

export default withStyles(styles)(StaffProfileGeneralInformationMapped);
