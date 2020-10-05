import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import {
  Grid,
  FormControl,
  TextField,
  Button,
  Collapse,
  Badge,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  withStyles,
  Paper,
  Chip,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ProfilePicture from 'profile-picture';
import 'profile-picture/build/ProfilePicture.css';
import '../Configurations/map/app.css';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import PublishIcon from '@material-ui/icons/Publish';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import history from '../../../utils/history';
import styles from './staff-jss';
import AddressBlock from '../Address';
import StaffService from '../../Services/StaffService';
import CountryService from '../../Services/CountryService';
import StaffContractService from '../../Services/StaffContractService';

const SmallAvatar = withStyles(theme => ({
  root: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.background.paper}`
  }
}))(Avatar);

const inputContractDoc = React.createRef();
const inputInternalRulesDoc = React.createRef();
const reader = new FileReader();

class AddStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChangePicture: false,
      isPersonalInformation: false,
      isGeneralContractInformation: true,
      name: '',
      personalPhone: '',
      personalEmail: '',
      companyName: '',
      companyPhone: '',
      companyMobilePhone: '',
      companyEmail: '',
      skype: '',
      birthday: '',
      birthCountry: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      photo: '',
      address: '',
      company: {},
      adCountry: {},
      postCode: '',
      state: {},
      city: {},
      contractType: '',
      associateOffice: '',
      hiringCountry: '',
      townContract: '',
      personalNumber: '',
      highDate: '',
      lowDate: '',
      registrationDate: '',
      preContractDate: '',
      selectedContractDocName: '',
      selectedInternalRulesDocName: '',
      internalRulesDoc: {},
      contractDoc: {},
      countries: []
    };
  }

  profilePictureRef = React.createRef();

  componentDidMount() {
    CountryService.getCountries().then(({ data }) => {
      this.setState({ countries: data });
    });
  }

  handleChange = ev => {
    const {
      personalPhone,
      companyPhone,
      companyMobilePhone,
      emergencyContactPhone
    } = this.state;
    console.log(ev.target.name);
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

  handleSubmitStaff = () => {
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
      photo,
      address,
      postCode,
      city,
      staffContractId,
      associateOffice,
      hiringCountry,
      townContract,
      personalNumber,
      highDate,
      lowDate,
      registrationDate,
      preContractDate,
      internalRulesDoc,
      contractDoc
    } = this.state;
    const staff = {
      firstName,
      fatherFamilyName,
      motherFamilyName,
      personalPhone,
      personalEmail,
      companyPhone,
      companyMobilePhone,
      companyEmail,
      skype,
      birthday: birthday || new Date(),
      birthCountry: birthCountry.countryName,
      emergencyContactName,
      emergencyContactPhone,
      photo,
      address: {
        address,
        postCode
      }
    };
    const contract = {
      staffContractId,
      associateOffice,
      hiringCountry: hiringCountry.countryName,
      townContract,
      personalNumber,
      highDate: highDate || new Date(),
      lowDate: lowDate || new Date(),
      registrationDate: registrationDate || new Date(),
      preContractDate: preContractDate || new Date()
    };

    const data = new FormData();
    data.append('files[]', contractDoc);
    data.append('files[]', internalRulesDoc);
    data.append(
      'staffContract',
      new Blob([JSON.stringify(contract)], {
        type: 'application/json'
      })
    );

    StaffContractService.saveStaffContract(data).then(response => {
      console.log('save');
      const items = [staff, city, response.data];
      StaffService.saveStaff(items).then(({ data }) => {
        console.log(data);
        history.push('/app/hh-rr/staff', {});
      });
    });
  };

  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.files);
      reader.onload = function (ev) {
        this.setState({ photo: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleChangeLogo = e => {
    this.readURI(e);
  };

  handleDialogClose = () => {
    this.setState({
      isChangeProfilePic: false
    });
  };

  handleOpenDialog = () => {
    this.setState({
      isChangeProfilePic: true
    });
  };

  handleUpload = () => {
    // const PP = this.profilePicture.current;
    /* const imageData = PP.getData();
        const file = imageData.file; */
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    const { user } = this.state;
    const PP = this.profilePictureRef.current;
    const photo = PP.getImageAsDataUrl();
    this.setState({
      photo
    });
    this.handleDialogClose();
    // add here the upload logic...
  };

  handleUploadContractDocClick = () => {
    inputContractDoc.current.click();
  };

  handleUploadInternalRulesDocClick = () => {
    inputInternalRulesDoc.current.click();
  };

  handleContractDocChange = () => {
    this.setState({
      selectedContractDocName: inputContractDoc.current.files[0].name,
      contractDoc: inputContractDoc.current.files[0]
    });
    console.log(inputContractDoc.current.files[0].name);
    console.log(reader.readAsDataURL(inputContractDoc.current.files[0]));
  };

  handleInternalRulesDocChange = () => {
    this.setState({
      selectedInternalRulesDocName: inputInternalRulesDoc.current.files[0].name,
      internalRulesDoc: inputInternalRulesDoc.current.files[0]
    });
  };

  handleDateValue = (value, name) => {
    switch (name) {
      case 'birthday':
        this.setState({
          birthday: value.toISOString().slice(0, 10)
        });
      case 'highDate':
        this.setState({
          highDate: value.toISOString().slice(0, 10)
        });
      case 'lowDate':
        this.setState({
          lowDate: value.toISOString().slice(0, 10)
        });
      case 'registrationDate':
        this.setState({
          registrationDate: value.toISOString().slice(0, 10)
        });
      case 'preContractDate':
        this.setState({
          preContractDate: value.toISOString().slice(0, 10)
        });
    }
    this.setState({
      birthday: value.toISOString().slice(0, 10)
    });
  };

  handleExpandClick = compName => {
    const { isPersonalInformation, isGeneralContractInformation } = this.state;
    if (compName === 'personalInformation') {
      this.setState({
        isPersonalInformation: !isPersonalInformation
      });
    } else if (compName === 'generalContractInformation') {
      this.setState({
        isGeneralContractInformation: !isGeneralContractInformation
      });
    }
  };

  handleChangeBirthCountry = (ev, value) => {
    console.log(value);
    this.setState({ birthCountry: value });
  };

  handleChangeHiringCountry = (ev, value) => {
    this.setState({ hiringCountry: value });
  };

  /* getAll = () => {
    TestClassService.getFiles().then(response => {
      console.log(response);
      const binaryString = window.atob(response.data[0].contractDoc);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);
      for (let i = 0; i < binaryLen; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      const blob = new Blob([bytes], {
        type: 'application/pdf'
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'myFileName.pdf';
      link.click();
    });
  }; */

  render() {
    const title = brand.name + ' - Clients';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      firstName,
      fatherFamilyName,
      motherFamilyName,
      personalPhone,
      personalEmail,
      companyName,
      companyPhone,
      companyMobilePhone,
      companyEmail,
      skype,
      birthday,
      birthCountry,
      emergencyContactName,
      emergencyContactPhone,
      photo,
      isPersonalInformation,
      isGeneralContractInformation,
      isChangeProfilePic,
      countries,
      associateOffice,
      hiringCountry,
      townContract,
      personalNumber,
      highDate,
      lowDate,
      registrationDate,
      preContractDate,
      contractType,
      selectedInternalRulesDocName,
      selectedContractDocName
    } = this.state;
    const salutations = ['Mr.', 'Mrs', 'Miss'];
    const types = ['Staff.', 'Commercial', 'Leader'];
    const companies = [
      { name: 'TechniU', phone: '+21265482154', email: 'techniU@gmail.com' },
      {
        name: 'Implemental Systems',
        phone: '+21265482154',
        email: 'implemental@gmail.com'
      },
      {
        name: 'International GDE',
        phone: '+21265482154',
        email: 'internationalgde@gmail.com'
      }
    ];
    const contractTypes = [
      { name: 'CDI' },
      {
        name: 'CDD'
      },
      {
        name: 'Part-Time'
      }
    ];
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          fullWidth
          aria-labelledby="changeProfilePic"
          open={isChangeProfilePic}
          classes={{
            paper: classes.paper
          }}
        >
          <DialogTitle id="SaveFormula">Change profile picture</DialogTitle>
          <DialogContent>
            <ProfilePicture
              ref={this.profilePictureRef}
              frameSize={1}
              frameFormat="circle"
              useHelper
              debug
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleUpload} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>

        <PapperBlock
          title="New Staff"
          desc="Please, Fill in the all field"
          icon="ios-person"
        >
          <Paper
            elevation={1}
            style={{ width: '100%', marginTop: '10px', marginBottom: 20 }}
          >
            <div className={classes.divCenter}>
              <Button
                name="personalInformation"
                style={{ backgroundColor: 'transparent', width: '100%' }}
                disableRipple
                endIcon={
                  isPersonalInformation ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )
                }
                onClick={() => this.handleExpandClick('personalInformation')}
              >
                General Information
              </Button>
            </div>
          </Paper>
          <Collapse in={isPersonalInformation}>
            <div>
              <Grid
                container
                spacing={6}
                direction="row"
                justifyContent="left"
                alignItems="start"
              >
                <Grid item xs={12} md={3}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Badge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      badgeContent={(
                        <Tooltip title="Change profile picture">
                          <SmallAvatar>
                            <Button
                              variant="contained"
                              onClick={this.handleOpenDialog}
                              className={classes.badgeButton}
                            >
                              <EditRoundedIcon color="secondary" />
                            </Button>
                          </SmallAvatar>
                        </Tooltip>
                      )}
                    >
                      <Avatar
                        alt="User Name"
                        src={photo}
                        className={classes.large}
                      />
                    </Badge>
                  </div>
                </Grid>
                <Grid item xs={12} md={3}>
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
                      value={birthday ? new Date(birthday) : new Date()}
                      onChange={value => this.handleDateValue(value, 'birthday')
                      }
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
                <Grid item xs={12} md={3}>
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
                    required
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
                    required
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
                <Grid item xs={12} md={3}>
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
            </div>
          </Collapse>
          <Paper
            elevation={1}
            style={{ width: '100%', marginTop: '10px', marginBottom: 20 }}
          >
            <div className={classes.divCenter}>
              <Button
                name="generalContractInformation"
                style={{ backgroundColor: 'transparent', width: '100%' }}
                disableRipple
                endIcon={
                  isGeneralContractInformation ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )
                }
                onClick={() => this.handleExpandClick('generalContractInformation')
                }
              >
                General Contract Information
              </Button>
            </div>
          </Paper>
          <Collapse in={isGeneralContractInformation}>
            <div>
              <Grid
                container
                spacing={6}
                direction="row"
                justifyContent="left"
                alignItems="start"
              >
                <Grid item xs={12} md={3}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <IconButton
                      className={classes.large}
                      onClick={this.handleUploadContractDocClick}
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
                          accept=".pdf"
                          ref={inputContractDoc}
                          multiple={false}
                          style={{ display: 'none' }}
                          onChange={this.handleContractDocChange}
                        />
                        <PublishIcon
                          className={classes.uploadIcon}
                          color="secondary"
                        />
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: 12,
                            fontWeight: 'bold',
                            opacity: 0.6,
                            wordWrap: 'break-word'
                          }}
                          display="inline"
                        >
                          Contract Document
                        </Typography>
                      </div>
                    </IconButton>
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: 14,
                        fontWeight: 'bold',
                        opacity: 0.8,
                        wordWrap: 'break-word',
                        marginTop: 15
                      }}
                      display="inline"
                    >
                      Selected Contract:
                      {' '}
                      {selectedContractDocName || 'none'}
                    </Typography>
                    <IconButton
                      className={classes.large}
                      onClick={this.handleUploadInternalRulesDocClick}
                      style={{ marginTop: 30 }}
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
                          accept=".pdf"
                          ref={inputInternalRulesDoc}
                          multiple={false}
                          style={{ display: 'none' }}
                          onChange={this.handleInternalRulesDocChange}
                        />
                        <PublishIcon
                          className={classes.uploadIcon}
                          color="secondary"
                        />
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: 12,
                            fontWeight: 'bold',
                            opacity: 0.6,
                            wordWrap: 'break-word'
                          }}
                          display="inline"
                        >
                          Internal Rules Document
                        </Typography>
                      </div>
                    </IconButton>
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: 14,
                        fontWeight: 'bold',
                        opacity: 0.8,
                        wordWrap: 'break-word',
                        marginTop: 15
                      }}
                      display="inline"
                    >
                      Selected Internal Rules:
                      {' '}
                      {selectedInternalRulesDocName || 'none'}
                    </Typography>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={9}
                  container
                  spacing={6}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <div className={classes.divSpace} style={{ width: '100%' }}>
                      <FormControl
                        className={classes.formControl}
                        style={{ width: '30%' }}
                      >
                        <InputLabel>Contract type</InputLabel>
                        <Select
                          name="contractType"
                          value={contractType}
                          onChange={this.handleChange}
                        >
                          {contractTypes.map(type => (
                            <MenuItem key={type.name} value={type.name}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl
                        className={classes.formControl}
                        style={{ width: '30%' }}
                      >
                        <InputLabel>Company</InputLabel>
                        <Select
                          name="companyName"
                          value={companyName}
                          onChange={this.handleChange}
                        >
                          {companies.map(company => (
                            <MenuItem key={company.name} value={company.name}>
                              {company.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        id="outlined-basic"
                        label="Associate office"
                        variant="outlined"
                        name="associateOffice"
                        style={{ width: '30%' }}
                        value={associateOffice}
                        className={classes.textField}
                        onChange={this.handleChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.divSpace} style={{ width: '100%' }}>
                      <Autocomplete
                        id="combo-box-demo"
                        value={hiringCountry}
                        options={countries}
                        getOptionLabel={option => option.countryName}
                        onChange={this.handleChangeHiringCountry}
                        style={{ width: '30%', marginTop: 7 }}
                        renderInput={params => (
                          <TextField
                            fullWidth
                            {...params}
                            label="Hiring Country"
                            variant="outlined"
                          />
                        )}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Town contract"
                        variant="outlined"
                        name="townContract"
                        style={{ width: '30%' }}
                        value={townContract}
                        className={classes.textField}
                        onChange={this.handleChange}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Personal Number"
                        variant="outlined"
                        name="personalNumber"
                        style={{ width: '30%' }}
                        value={personalNumber}
                        className={classes.textField}
                        onChange={this.handleChange}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.divSpace} style={{ width: '100%' }}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          name="highDate"
                          label="High Date"
                          value={highDate ? new Date(highDate) : new Date()}
                          onChange={value => this.handleDateValue(value, 'highDate')
                          }
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                          style={{ width: ' 23%' }}
                        />
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          name="lowDate"
                          label="Low Date"
                          value={lowDate ? new Date(lowDate) : new Date()}
                          onChange={value => this.handleDateValue(value, 'lowDate')
                          }
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                          style={{ width: ' 23%' }}
                        />
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          name="registrationDate"
                          label="Registration Date"
                          value={
                            registrationDate
                              ? new Date(registrationDate)
                              : new Date()
                          }
                          onChange={value => this.handleDateValue(value, 'registrationDate')
                          }
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                          style={{ width: ' 23%' }}
                        />
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          name="preContractDate"
                          label="Precontract Date"
                          value={
                            preContractDate
                              ? new Date(preContractDate)
                              : new Date()
                          }
                          onChange={value => this.handleDateValue(value, 'preContractDate')
                          }
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                          style={{ width: ' 23%' }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Collapse>
          <div className={classes.btnCenter} style={{ marginTop: 20 }}>
            <Button
              className={classes.textField}
              color="primary"
              variant="contained"
              size="small"
              onClick={this.handleSubmitStaff}
            >
              Save Staff
            </Button>
          </div>
        </PapperBlock>
      </div>
    );
  }
}
AddStaff.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AddStaff);
