import React, { useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Badge,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  withStyles,
  Chip,
  Divider,
} from '@material-ui/core';
import ProfilePicture from 'profile-picture';
import 'profile-picture/build/ProfilePicture.css';
import '../Configurations/map/app.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
import EditRoundedIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import styles from '../Staff/staff-jss';
import CountryService from '../../Services/CountryService';
import notification from '../../../components/Notification/Notification';
import AddressBlock from '../Address';
import { getAllClient } from '../../../redux/client/actions';
import { addContact, getAllContact, updateContact } from '../../../redux/contact/actions';
import { getAllCountry } from '../../../redux/country/actions';
import { getAllStateByCountry } from '../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../redux/city/actions';

const SmallAvatar = withStyles(theme => ({
  root: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.background.paper}`
  }
}))(Avatar);

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {};
    this.state = {
      isChangeProfilePic: false,
      firstName: '',
      cityId: '',
      fatherFamilyName: '',
      motherFamilyName: '',
      personalPhone: '',
      personalEmail: '',
      companyId: '',
      department: '',
      companyPhone: '',
      position: '',
      companyFixPhone: '',
      companyMobilePhone: '',
      companyEmail: '',
      personalMobilePhone: '',
      skype: '',
      photo: '',
      fullAddress: '',
      postCode: '',
      city: {},
      keyCountry: {},
      keyState: {},
      keyCity: {},
      keyClient: {},
      contactId:'',
    };
  }

  componentDidMount() {
    const {
      getAllCountry, selectedContact, getAllStateByCountry, getAllClient
    } = this.props;
    console.log(selectedContact);
    getAllCountry();
    // console.log(selectedContact)
    // getAllStateByCountry(selectedContact.countryName);
    // changeTheme('blueCyanTheme');
    /*    CountryService.getCountries().then(({ data }) => {
      this.setState({ countries: data });
    }); */
    getAllClient();
  }

  handleChange = ev => {
    console.log(ev.target.name);
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleDateValue = (value, name) => {
    this.setState({
      [name]: value
    });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.selectedContact !== this.props.selectedContact) {
      this.setState({contactId: newProps.selectedContact.contactId});
      this.setState({firstName: newProps.selectedContact.firstName});
      this.setState({fatherFamilyName: newProps.selectedContact.fatherFamilyName});
      this.setState({motherFamilyName: newProps.selectedContact.motherFamilyName});
      this.setState({department: newProps.selectedContact.department});
      this.setState({position: newProps.selectedContact.position});

      this.setState({companyFixPhone: newProps.selectedContact.companyFixPhone});
      this.setState({companyMobilePhone: newProps.selectedContact.companyMobilePhone});
      this.setState({companyEmail: newProps.selectedContact.companyEmail});
      this.setState({personalMobilePhone: newProps.selectedContact.personalMobilePhone});

      this.setState({personalEmail: newProps.selectedContact.personalEmail});
      this.setState({skype: newProps.selectedContact.skype});

      this.setState({fullAddress: newProps.selectedContact.fullAddress});
      this.setState({postCode: newProps.selectedContact.postCode});
    }
    if (newProps.selectedContact !== this.props.selectedContact) {
      // console.log(newProps.selectedClient);
      for (const key in newProps.allCountrys) {
        if (newProps.allCountrys[key].countryName === newProps.selectedContact.countryName) {
          this.setState({ keyCountry: newProps.allCountrys[key] });
          break;
        }
      }
    }
    if (newProps.allStateCountrys === this.props.allStateCountrys) {
      for (const key in newProps.allStateCountrys) {
        console.log(newProps.allStateCountrys);
        if (newProps.allStateCountrys[key].stateCountryId === newProps.selectedContact.countryStateId) {
          this.setState({ keyState: newProps.allStateCountrys[key] });
          break;
        }
      }
      for (const key in this.props.allClients) {
        if (this.props.allClients[key].clientId === newProps.selectedContact.companyId) {
          this.setState({ keyClient: this.props.allClients[key]  });
          break;
        }
      }
      for (const key in newProps.allCitys) {
        if (newProps.allCitys[key].cityName === newProps.selectedContact.cityName) {
          this.setState({ keyCity: newProps.allCitys[key] });
          this.setState({ cityId: newProps.allCitys[key].cityId });
          break;
        }
      }
    }
  }

  handleChangeCountry = (ev, value) => {
    const { getAllStateByCountry } = this.props;
    getAllStateByCountry(value.countryId);
    this.setState({ keyCountry: value });
  };

  handleChangeState = (ev, value) => {
    const { getAllCityByState } = this.props;
    getAllCityByState(value.stateCountryId);
    this.setState({ keyState: value });
  };

  handleChangeCity = (ev, value) => {
    this.setState({ cityId: value.cityId });
    this.setState({ keyCity: value });
  };

  handleSubmitContact = () => {
    const { updateContact, getAllContact } = this.props;
    const {
      firstName,
      fatherFamilyName,
      motherFamilyName,
      department,
      position,
      companyFixPhone,
      companyMobilePhone,
      companyEmail,
      personalMobilePhone,
      personalEmail,
      skype,
      photo,
      cityId,
      fullAddress,
      postCode,
      keyClient,
      contactId
    } = this.state;


    const contact = {
      firstName,
      fatherFamilyName,
      motherFamilyName,
      department,
      position,
      companyFixPhone,
      companyMobilePhone,
      companyEmail,
      personalMobilePhone,
      personalEmail,
      skype,
      photo,
      cityId,
      fullAddress,
      postCode,
      contactId,
      companyId: keyClient.clientId
    };
    console.log(contact);
    const promise = new Promise(resolve => {
      // get client information
      updateContact(contact);
      this.editingPromiseResolve = resolve;
    });

    promise.then(result => {
      if (isString(result)) {
        this.props.handleClose();
        notification('success', result);
        getAllContact();
        //   getAllStaff();
      } else {
        this.props.handleClose();
        notification('danger', result);
      }
    });
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
    const PP = this.profilePictureRef.current;
    const photo = PP.getImageAsDataUrl();
    this.setState({
      photo
    });
    this.handleDialogClose();
    // add here the upload logic...
  };

  handleChangeCompany = (ev, value) => {
    this.setState({ companyId: value.clientId });
    this.setState({ keyClient: value  });
  };

  render() {
    const {
      classes, isLoadingContact, contactResponse, errorsContact, allClients,
      allCountrys, allCitys, allStateCountrys, selectedContact
    } = this.props;
    const {
      firstName,
      fatherFamilyName,
      motherFamilyName,
      department,
      position,
      companyFixPhone,
      companyMobilePhone,
      companyEmail,
      personalMobilePhone,
      personalEmail,
      skype,
      photo,
      isChangeProfilePic,
      keyCountry,
      keyState,
      keyCity,
      keyClient,
      fullAddress,
      postCode,
    } = this.state;
    (!isLoadingContact && contactResponse) && this.editingPromiseResolve(contactResponse);
    (!isLoadingContact && !contactResponse) && this.editingPromiseResolve(errorsContact);
    return (
      <div>
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
        <div>
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
                <Autocomplete
                  id="combo-box-demo"
                  options={allClients && allClients}
                  getOptionLabel={option => (option ? option.name : '')}
                  value={allClients.find(v => v.name === keyClient.name) || ''}
                  onChange={this.handleChangeCompany}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the company"
                      required
                      variant="outlined"
                    />
                  )}
                />
                <TextField
                  id="outlined-basic"
                  label="Department"
                  variant="outlined"
                  name="department"
                  fullWidth
                  value={department}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Position"
                  variant="outlined"
                  name="position"
                  fullWidth
                  required
                  value={position}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Company fix phone"
                  variant="outlined"
                  name="companyFixPhone"
                  fullWidth
                  required
                  value={companyFixPhone}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Company mobile phone"
                  variant="outlined"
                  name="companyMobilePhone"
                  fullWidth
                  required
                  value={companyMobilePhone}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Company Email"
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
                  label="personal mobile phone"
                  variant="outlined"
                  name="personalMobilePhone"
                  fullWidth
                  value={personalMobilePhone}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="personal email"
                  variant="outlined"
                  name="personalEmail"
                  fullWidth
                  value={personalEmail}
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
                  {/* <AddressBlock onChangeInput={this.handleChange} /> */}
                  <Autocomplete
                    id="combo-box-demo"
                    options={allCountrys}
                    getOptionLabel={option => option.countryName}
                    value={allCountrys.find(v => v.countryName === keyCountry.countryName) || ''}
                    onChange={this.handleChangeCountry}
                    renderInput={params => (
                      <TextField
                        fullWidth
                        {...params}
                        label="Choose the country"
                        variant="outlined"
                      />
                    )}
                  />
                  <Autocomplete
                    id="combo-box-demo"
                    options={allStateCountrys}
                    getOptionLabel={option => option.stateName}
                    value={allStateCountrys.find(v => v.stateName === keyState.stateName) || ''}
                    onChange={this.handleChangeState}
                    style={{ marginTop: 15 }}
                    renderInput={params => (
                      <TextField
                        fullWidth
                        {...params}
                        label="Choose the state"
                        variant="outlined"
                      />
                    )}
                  />
                  <Autocomplete
                    id="combo-box-demo"
                    options={allCitys}
                    getOptionLabel={option => option.cityName}
                    value={allCitys.find(v => v.cityName === keyCity.cityName) || ''}
                    onChange={this.handleChangeCity}
                    style={{ marginTop: 15 }}
                    renderInput={params => (
                      <TextField
                        fullWidth
                        {...params}
                        label="Choose the city"
                        variant="outlined"
                      />
                    )}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Name of address"
                    variant="outlined"
                    name="fullAddress"
                    fullWidth
                    required
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
              </Grid>
            </Grid>
          </div>
          <div className={classes.btnCenter} style={{ marginTop: 20 }}>
            <Button
              className={classes.textField}
              color="primary"
              variant="contained"
              size="small"
              onClick={this.handleSubmitContact}
            >
              Update Contact
            </Button>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  // contacts
  allContacts: state.getIn(['contacts']).allContacts,
  contactResponse: state.getIn(['contacts']).contactResponse,
  isLoadingContact: state.getIn(['contacts']).isLoading,
  errorsContact: state.getIn(['contacts']).errors,
  // client
  allClients: state.getIn(['clients']).allClients,
  clientResponse: state.getIn(['clients']).clientResponse,
  isLoading: state.getIn(['clients']).isLoading,
  errors: state.getIn(['clients']).errors,
  // country
  allCountrys: state.getIn(['countries']).allCountrys,
  countryResponse: state.getIn(['countries']).countryResponse,
  isLoadingCounty: state.getIn(['countries']).isLoading,
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
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAllClient,
    addContact,
    getAllCountry,
    getAllStateByCountry,
    getAllCityByState,
    updateContact,
    getAllContact
  },
  dispatch
);

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditContact)
);
