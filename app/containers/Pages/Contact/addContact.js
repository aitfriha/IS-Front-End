import React, { useContext } from 'react';
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
  makeStyles,
  Paper,
  Chip,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography
} from '@material-ui/core';
import ProfilePicture from 'profile-picture';
import 'profile-picture/build/ProfilePicture.css';
import '../Configurations/map/app.css';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
import EditRoundedIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import styles from '../Staff/staff-jss';
import CountryService from '../../Services/CountryService';
import StateCountryService from '../../Services/StateCountryService';
import ContractTypeService from '../../Services/ContractTypeService';
import LegalCategoryTypeService from '../../Services/LegalCategoryTypeService';
import { getAllStaff, saveStaff } from '../../../redux/staff/actions';
import notification from '../../../components/Notification/Notification';
import AddressBlock from '../Address';
import { getAllClient } from '../../../redux/client/actions';
import { addContact, getAllContact } from '../../../redux/contact/actions';
import history from '../../../utils/history';
import { getAllCivilityTitleStatus } from '../../../redux/civilityTitle/actions';

const SmallAvatar = withStyles(theme => ({
  root: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.background.paper}`
  }
}))(Avatar);


class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {};
    this.state = {
      isChangeProfilePic: false,
      firstName: '',
      fatherFamilyName: '',
      motherFamilyName: '',
      personalPhone: '',
      personalEmail: '',
      companyId: '',
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
      company: {},
      adCountry: {},
      postCode: '',
      state: {},
      city: {},
      department: '',
      position: '',
      companyFixPhone: ''
    };
  }

  profilePictureRef = React.createRef();

  componentDidMount() {
    const { getAllClient, getAllCivilityTitleStatus } = this.props;
    // changeTheme('blueCyanTheme');
    CountryService.getCountries().then(({ data }) => {
      this.setState({ countries: data });
    });
    getAllClient();
    getAllCivilityTitleStatus();
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

  closeDialog = (b) => {
    this.props.close(b);
  };

  handleSubmitStaff = () => {
    const {
      addContact, getAllContact, suppliersArea, supplierType,
      first_name, _skype, full_address, post_code, mother_family_name, father_family_name, _position, _department,
      company_fix_phone, company_mobile_phone, company_email, personal_mobile_phone, personal_email, theCompany, etat
    } = this.props;


    const {
      firstName,
      fatherFamilyName,
      motherFamilyName,
      companyId,
      department,
      position,
      companyFixPhone,
      companyMobilePhone,
      companyEmail,
      personalMobilePhone,
      personalEmail,
      skype,
      photo,
      city,
      civilityId,
      fullAddress,
      postCode,

    } = this.state;
    console.log(theCompany);
    if (first_name == true && firstName == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'first name is mandatory');
      return;
    }
    if (_skype == true && skype == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'skype is mandatory');
      return;
    }
    if (full_address == true && fullAddress == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'full address is mandatory');
      return;
    }
    if (post_code == true && postCode == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'post code is mandatory');
      return;
    }
    if (father_family_name == true && fatherFamilyName == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'father family name is mandatory');
      return;
    }
    if (mother_family_name == true && motherFamilyName == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'mother family name is mandatory');
      return;
    }
    if (_department == true && department == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'department is mandatory');
      return;
    }
    if (_position == true && position == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'position is mandatory');
      return;
    }
    if (company_fix_phone == true && companyFixPhone == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'company fix phone is mandatory');
      return;
    }
    if (company_mobile_phone == true && companyMobilePhone == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'company mobile phone is mandatory');
      return;
    }
    if (company_email == true && companyEmail == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'company email is mandatory');
      return;
    }
    if (personal_mobile_phone == true && personalMobilePhone == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'personal mobile phone is mandatory');
      return;
    }
    if (personal_email == true && personalEmail == '') {
      // this.setState({ qualification_process_contacts_technical_leaderError: true });
      this.closeDialog(false);
      notification('danger', 'personal email is mandatory');
      return;
    }
    var contact={};
    if(theCompany!='')
    {
       contact = {
        firstName,
        fatherFamilyName,
        motherFamilyName,
        companyId: theCompany,
        department,
        position,
        companyFixPhone,
        companyMobilePhone,
        companyEmail,
        personalMobilePhone,
        personalEmail,
        skype,
        photo,
        cityId: city.cityId,
        civilityId,
        fullAddress,
        postCode,
        suppliersArea,
        supplierType
      };
    }
    else {
       contact = {
        firstName,
        fatherFamilyName,
        motherFamilyName,
        companyId,
        department,
        position,
        companyFixPhone,
        companyMobilePhone,
        companyEmail,
        personalMobilePhone,
        personalEmail,
        skype,
        photo,
        cityId: city.cityId,
        civilityId,
        fullAddress,
        postCode,
        suppliersArea,
        supplierType
      };
    }
    const promise = new Promise(resolve => {
      // get client information
      addContact(contact);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllContact();
        history.push('/app/gestion-commercial/contacts');
      } else {
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
  };

  handleChangeCivility = (ev, value) => {
    this.setState({ civilityId: value.civilityTitleId });
  };

  onChangeInput = () => {

  }

  render() {
    const title = brand.name + ' - Clients';
    const description = brand.desc;
    const {
      classes, isLoadingContact, contactResponse, errorsContact, allClients, allCivilityTitles,
      first_name,
      father_family_name,
      mother_family_name,
      _department,
      _position,
      company_fix_phone,
      company_mobile_phone,
      company_email,
      personal_mobile_phone,
      personal_email,
      _skype,
      full_address,
      post_code,
      theCompany,
      etat
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
    } = this.state;
    (!isLoadingContact && contactResponse) && this.editingPromiseResolve(contactResponse);
    (!isLoadingContact && !contactResponse) && this.editingPromiseResolve(errorsContact);
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
          title="New contact"
          desc="Please, Fill in the all field"
          icon="ios-person"
        >
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
                <Autocomplete
                  id="combo-box-demo"
                  options={allCivilityTitles && allCivilityTitles}
                  getOptionLabel={option => (option ? option.name : '')}
                  onChange={this.handleChangeCivility}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Title type*"
                      variant="outlined"
                    />
                  )}
                />
                <TextField
                  id="outlined-basic"
                  label="First name"
                  variant="outlined"
                  name="firstName"
                  fullWidth
                  required={first_name}
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
                  required={father_family_name}
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
                  required={mother_family_name}
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
                { etat == 'externe'
                  ? (
                    <Autocomplete
                      id="combo-box-demo"
                      options={allClients}
                      getOptionLabel={option => (option ? option.name : '')}
                      value={allClients.find(v => v.clientId === theCompany) || ''}
                      onChange={this.handleChangeCompany}
                      disabled
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Choose the company*"
                          variant="outlined"
                        />
                      )}
                    />
                  )
                  : (
                    <Autocomplete
                      id="combo-box-demo"
                      options={allClients && allClients}
                      getOptionLabel={option => (option ? option.name : '')}
                      onChange={this.handleChangeCompany}
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Choose the company*"
                          variant="outlined"
                        />
                      )}
                    />
                  )}

                <TextField
                  id="outlined-basic"
                  label="Department"
                  variant="outlined"
                  name="department"
                  required={_department}
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
                  required={_position}
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
                  required={company_fix_phone}
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
                  required={company_mobile_phone}
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
                  required={company_email}
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
                  required={personal_mobile_phone}
                  value={personalMobilePhone}
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="personal email"
                  variant="outlined"
                  name="personalEmail"
                  required={personal_email}
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
                  required={_skype}
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
                  <AddressBlock onChangeInput={this.handleChange} />
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
              onClick={this.handleSubmitStaff}
            >
              Save Contact
            </Button>
          </div>
        </PapperBlock>
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
  // Civility
  allCivilityTitles: state.getIn(['civilityTitle']).allCivilityTitles,
  civilityTitleResponse: state.getIn(['civilityTitle']).civilityTitleResponse,
  isLoadingCivilityTitles: state.getIn(['civilityTitle']).isLoading,
  errorsCivilityTitles: state.getIn(['civilityTitle']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAllCivilityTitleStatus,
    getAllClient,
    addContact,
    getAllContact
  },
  dispatch
);

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddContact)
);
