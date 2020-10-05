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
  MenuItem
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ProfilePicture from 'profile-picture';
import 'profile-picture/build/ProfilePicture.css';
import '../Configurations/map/app.css';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import history from '../../../utils/history';
import styles from './people-jss';
import AddressBlock from '../Address';
import StaffService from '../../Services/StaffService';
import CountryService from '../../Services/CountryService';

const SmallAvatar = withStyles(theme => ({
  root: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.background.paper}`
  }
}))(Avatar);

class AddStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChangePicture: false,
      isPersonalInformation: true,
      name: '',
      personalPhone: '',
      personalEmail: '',
      companyName: '',
      companyPhone: '',
      companyMobilePhone: '',
      companyEmail: '',
      birthday: '',
      birthCountry: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      photo: '',
      city: '',
      address: '',
      company: {},
      adCountry: {},
      postCode: '',
      state: '',
      adCity: '',
      type: 'Staff',
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
    const { personalPhone, companyPhone, companyMobilePhone } = this.state;
    console.log(ev.target.name);
    if (ev.target.name === 'adCountry') {
      this.setState({
        personalPhone: ev.target.value.phonePrefix + personalPhone,
        companyPhone: ev.target.value.phonePrefix + companyPhone,
        companyMobilePhone: ev.target.value.phonePrefix + companyMobilePhone
      });
    }
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitStaff = () => {
    const {
      name,
      personalPhone,
      personalEmail,
      companyPhone,
      companyMobilePhone,
      companyEmail,
      birthday,
      birthCountry,
      emergencyContactName,
      emergencyContactPhone,
      photo,
      adCountry,
      state,
      address,
      postCode,
      adCity
    } = this.state;
    const staff = {
      name,
      personalPhone,
      personalEmail,
      companyPhone,
      companyMobilePhone,
      companyEmail,
      birthday,
      birthCountry,
      emergencyContactName,
      emergencyContactPhone,
      photo,
      address: {
        country: adCountry,
        address,
        postCode,
        state,
        city: adCity
      }
    };
    console.log('save');
    StaffService.saveStaff(staff).then(({ data }) => {
      console.log(data);
      history.push('/app/hh-rr/staff', {});
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

  handleDateValue = value => {
    this.setState({
      birthday: value.toISOString().slice(0, 10)
    });
  };

  handleExpandClick = compName => {
    const { isPersonalInformation } = this.state;
    if (compName === 'personalInformation') {
      this.setState({
        isPersonalInformation: !isPersonalInformation
      });
    }
  };

  handleChangeBirthCountry = (ev, value) => {
    this.setState({ birthCountry: value });
  };

  render() {
    const title = brand.name + ' - Clients';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      name,
      personalPhone,
      personalEmail,
      companyName,
      companyPhone,
      companyMobilePhone,
      companyEmail,
      birthday,
      birthCountry,
      emergencyContactName,
      emergencyContactPhone,
      photo,
      company,
      type,
      isPersonalInformation,
      isChangeProfilePic,
      countries
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
                    label="Name"
                    variant="outlined"
                    name="name"
                    fullWidth
                    required
                    value={name}
                    className={classes.textField}
                    onChange={this.handleChange}
                  />
                  <FormControl className={classes.formControl} fullWidth>
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
                      onChange={this.handleDateValue}
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
