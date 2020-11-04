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
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import PublishIcon from '@material-ui/icons/Publish';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
import { ThemeContext } from '../../App/ThemeWrapper';
import history from '../../../utils/history';
import styles from './staff-jss';
import AddressBlock from '../Address';
import StaffService from '../../Services/StaffService';
import CountryService from '../../Services/CountryService';
import StateCountryService from '../../Services/StateCountryService';
import ContractTypeService from '../../Services/ContractTypeService';
import LegalCategoryTypeService from '../../Services/LegalCategoryTypeService';
import StaffContractService from '../../Services/StaffContractService';
import StaffEconomicContractInformation from './StaffEconomicContractInformation';
import { getAllStaff, saveStaff } from '../../../redux/staff/actions';
import notification from '../../../components/Notification/Notification';


const SmallAvatar = withStyles(theme => ({
  root: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.background.paper}`
  }
}))(Avatar);

const extList = ['pdf', 'jpg', 'jpeg', 'png', 'tiff'];

const inputContractDoc = React.createRef();
const inputInternalRulesDoc = React.createRef();
const inputPreContractDoc = React.createRef();
const inputIdCardDoc = React.createRef();
const inputPassportDoc = React.createRef();
const inputProfessionalIdCardDoc = React.createRef();
const inputHnsCardDoc = React.createRef();
const reader = new FileReader();

const useStyles = makeStyles(styles);

class AddStaff extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      isChangeProfilePic: false,
      isPersonalInformation: true,
      isGeneralContractInformation: false,
      isEconomicContractInformation: false,
      isStaffDocumentation: false,
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
      company: {},
      adCountry: {},
      postCode: '',
      state: {},
      city: {},
      contractType: '',
      legalCategoryType: '',
      associateOffice: '',
      hiringCountry: '',
      hiringState: '',
      townContract: '',
      personalNumber: '',
      highDate: new Date(),
      lowDate: new Date(),
      registrationDate: new Date(),
      preContractDate: new Date(),
      internalRulesDoc: {},
      contractDoc: {},
      preContractDoc: {},
      countries: [],
      states: [],
      idCardNumber: '',
      idCardExpeditionDate: new Date(),
      idCardExpirationDate: new Date(),
      passportNumber: '',
      passportExpeditionDate: new Date(),
      passportExpirationDate: new Date(),
      professionalIdCardNumber: '',
      professionalIdCardExpeditionDate: new Date(),
      professionalIdCardExpirationDate: new Date(),
      hnsCardNumber: '',
      hnsCardExpeditionDate: new Date(),
      hnsCardExpirationDate: new Date(),
      idCardDoc: {},
      passportDoc: {},
      professionalIdCardDoc: {},
      hnsCardDoc: {},
      idCardDocExtension: '',
      passportDocExtension: '',
      professionalIdCardDocExtension: '',
      hnsCardDocExtension: '',
      contractTypes: [],
      legalCategoryTypes: [],
      contractSalary: 0,
      companyContractCost: 0,
      expenses: 0,
      companyExpensesCost: 0,
      objectives: 0,
      companyObjectivesCost: 0,
      totalCompanyCost: 0,
      contractSalaryDateGoing: new Date(),
      contractSalaryDateOut: new Date(),
      companyContractCostDateGoing: new Date(),
      companyContractCostDateOut: new Date(),
      expensesDateGoing: new Date(),
      expensesDateOut: new Date(),
      companyExpensesCostDateGoing: new Date(),
      companyExpensesCostDateOut: new Date(),
      objectivesDateGoing: new Date(),
      objectivesDateOut: new Date(),
      companyObjectivesCostDateGoing: new Date(),
      companyObjectivesCostDateOut: new Date(),
      totalCompanyCostDateGoing: new Date(),
      totalCompanyCostDateOut: new Date()
    };
  }

  profilePictureRef = React.createRef();

  componentDidMount() {
    // const { changeTheme } = this.props;
    // changeTheme('blueCyanTheme');
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
    if (ev.target.name === 'adCountry') {
      this.setState({
        personalPhone: ev.target.value.phonePrefix + personalPhone,
        companyPhone: ev.target.value.phonePrefix + companyPhone,
        companyMobilePhone: ev.target.value.phonePrefix + companyMobilePhone,
        emergencyContactPhone:
            ev.target.value.phonePrefix + emergencyContactPhone
      });
    }
    if (ev.target.name === 'companyName') {
      LegalCategoryTypeService.getAllLegalCategoryTypesByCompany(
        ev.target.value
      ).then(({ data }) => {
        this.setState({ legalCategoryTypes: data });
      });
    }
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleDateValue = (value, name) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmitStaff = () => {
    const { saveStaff, getAllStaff } = this.props;
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
      fullAddress,
      postCode,
      city,
      staffContractId,
      associateOffice,
      hiringCountry,
      townContract,
      personalNumber,
      contractType,
      legalCategoryType,
      highDate,
      lowDate,
      registrationDate,
      preContractDate,
      internalRulesDoc,
      contractDoc,
      preContractDoc,
      passportDoc,
      professionalIdCardDoc,
      hnsCardDoc,
      idCardDocExtension,
      idCardDoc,
      passportDocExtension,
      professionalIdCardDocExtension,
      hnsCardDocExtension,
      idCardNumber,
      idCardExpeditionDate,
      idCardExpirationDate,
      passportNumber,
      passportExpeditionDate,
      passportExpirationDate,
      professionalIdCardNumber,
      professionalIdCardExpeditionDate,
      professionalIdCardExpirationDate,
      hnsCardNumber,
      hnsCardExpeditionDate,
      hnsCardExpirationDate,
      contractSalary,
      companyContractCost,
      expenses,
      companyExpensesCost,
      objectives,
      companyObjectivesCost,
      totalCompanyCost,
      contractSalaryDateGoing,
      contractSalaryDateOut,
      companyContractCostDateGoing,
      companyContractCostDateOut,
      expensesDateGoing,
      expensesDateOut,
      companyExpensesCostDateGoing,
      companyExpensesCostDateOut,
      objectivesDateGoing,
      objectivesDateOut,
      companyObjectivesCostDateGoing,
      companyObjectivesCostDateOut,
      totalCompanyCostDateGoing,
      totalCompanyCostDateOut
    } = this.state;

    const contract = {
      staffContractId,
      companyName,
      associateOffice,
      hiringCountry: hiringCountry.countryName,
      townContract,
      personalNumber,
      highDate: highDate.toISOString().slice(0, 10),
      lowDate: lowDate.toISOString().slice(0, 10),
      registrationDate: registrationDate.toISOString().slice(0, 10),
      preContractDate: preContractDate.toISOString().slice(0, 10)
    };
    const total = parseInt(companyContractCost)
        + parseInt(companyExpensesCost)
        + parseInt(companyObjectivesCost);
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
      birthday: birthday.toISOString().slice(0, 10),
      birthCountry: birthCountry.countryName,
      emergencyContactName,
      emergencyContactPhone,
      photo,
      isLeader: 'no',
      cityId: '5f8d48445c2a4625620c884d',
      fullAddress,
      postCode,

      staffContractId,
      companyName,
      associateOffice,
      hiringCountry: hiringCountry.countryName,
      townContract,
      personalNumber,
      highDate: highDate.toISOString().slice(0, 10),
      lowDate: lowDate.toISOString().slice(0, 10),
      registrationDate: registrationDate.toISOString().slice(0, 10),
      preContractDate: preContractDate.toISOString().slice(0, 10),
      contractType,
      legalCategoryType,

      contractSalary,
      companyContractCost,
      expenses,
      companyExpensesCost,
      objectives,
      companyObjectivesCost,
      totalCompanyCost: total,
      contractSalaryDateGoing: contractSalaryDateGoing
        .toISOString()
        .slice(0, 10),
      contractSalaryDateOut: contractSalaryDateOut.toISOString().slice(0, 10),
      companyContractCostDateGoing: companyContractCostDateGoing
        .toISOString()
        .slice(0, 10),
      companyContractCostDateOut: companyContractCostDateOut
        .toISOString()
        .slice(0, 10),
      expensesDateGoing: expensesDateGoing.toISOString().slice(0, 10),
      expensesDateOut: expensesDateOut.toISOString().slice(0, 10),
      companyExpensesCostDateGoing: companyExpensesCostDateGoing
        .toISOString()
        .slice(0, 10),
      companyExpensesCostDateOut: companyExpensesCostDateOut
        .toISOString()
        .slice(0, 10),
      objectivesDateGoing: objectivesDateGoing.toISOString().slice(0, 10),
      objectivesDateOut: objectivesDateOut.toISOString().slice(0, 10),
      companyObjectivesCostDateGoing: companyObjectivesCostDateGoing
        .toISOString()
        .slice(0, 10),
      companyObjectivesCostDateOut: companyObjectivesCostDateOut
        .toISOString()
        .slice(0, 10),
      totalCompanyCostDateGoing: totalCompanyCostDateGoing
        .toISOString()
        .slice(0, 10),
      totalCompanyCostDateOut: totalCompanyCostDateOut
        .toISOString()
        .slice(0, 10),

      idCardNumber,
      idCardExpeditionDate: idCardExpeditionDate.toISOString().slice(0, 10),
      idCardExpirationDate: idCardExpirationDate.toISOString().slice(0, 10),
      idCardDocExtension,
      passportNumber,
      passportExpeditionDate: passportExpeditionDate.toISOString().slice(0, 10),
      passportExpirationDate: passportExpirationDate.toISOString().slice(0, 10),
      passportDocExtension,
      professionalIdCardNumber,
      professionalIdCardExpeditionDate: professionalIdCardExpeditionDate
        .toISOString()
        .slice(0, 10),
      professionalIdCardExpirationDate: professionalIdCardExpirationDate
        .toISOString()
        .slice(0, 10),
      professionalIdCardDocExtension,
      hnsCardNumber,
      hnsCardExpeditionDate: hnsCardExpeditionDate.toISOString().slice(0, 10),
      hnsCardExpirationDate: hnsCardExpirationDate.toISOString().slice(0, 10),
      hnsCardDocExtension
    };
    const Documents = new FormData();
    if (contractDoc.constructor !== Object) {
      Documents.append('contractDoc', contractDoc);
    } else {
      Documents.append(
        'contractDoc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    }
    if (internalRulesDoc.constructor !== Object) {
      Documents.append('internalRulesDoc', internalRulesDoc);
    } else {
      Documents.append(
        'internalRulesDoc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    }
    if (preContractDoc.constructor !== Object) {
      Documents.append('preContractDoc', preContractDoc);
    } else {
      Documents.append(
        'preContractDoc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    }
    Documents.append(
      'staffContract',
      new Blob([JSON.stringify(contract)], {
        type: 'application/json'
      })
    );

    // Documents.append('files[]', idCardDoc);
    Documents.append('files[]', passportDoc);
    Documents.append('files[]', professionalIdCardDoc);
    Documents.append('files[]', hnsCardDoc);
    console.log('idCardDoc :' + idCardDoc);

    const formData = new FormData();
    Object.keys(staff)
      .forEach(e => formData.append(e, staff[e]));
    formData.append('idCardPhoto', idCardDoc);
    formData.append('passportPhoto', idCardDoc);
    formData.append('professionalIdCardDatePhoto', idCardDoc);
    formData.append('hnsPhoto', idCardDoc);
    const promise = new Promise((resolve) => {
      // get client information
      saveStaff(formData);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        notification('success', result);
        getAllStaff();
      } else {
        notification('danger', result);
      }
    });
    /*    StaffContractService.saveStaffContract(
      contractData,
      contractType,
      legalCategoryType
    ).then(response => {
      staffData.append(
        'staffContract',
        new Blob([JSON.stringify(response.data)], {
          type: 'application/json'
        })
      );
      StaffService.saveStaff(staffData).then(({ data }) => {
        history.push('/app/hh-rr/staff', {});
      });
    }); */
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

  handleUploadContractDocClick = () => {
    inputContractDoc.current.click();
  };

  handleUploadInternalRulesDocClick = () => {
    inputInternalRulesDoc.current.click();
  };

  handleUploadPreContractDocClick = () => {
    inputPreContractDoc.current.click();
  };

  handleUploadIdCardDocClick = () => {
    inputIdCardDoc.current.click();
  };

  handleUploadPassportDocClick = () => {
    inputPassportDoc.current.click();
  };

  handleUploadProfessionalIdCardDocClick = () => {
    inputProfessionalIdCardDoc.current.click();
  };

  handleUploadHnsCardDocClick = () => {
    inputHnsCardDoc.current.click();
  };

  handleContractDocChange = () => {
    const lastDot = inputContractDoc.current.files[0].name.lastIndexOf('.');
    const ext = inputContractDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (ext === 'pdf') {
      this.setState({
        contractDoc: inputContractDoc.current.files[0]
      });
    }
  };

  handleInternalRulesDocChange = () => {
    const lastDot = inputInternalRulesDoc.current.files[0].name.lastIndexOf(
      '.'
    );
    const ext = inputInternalRulesDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (ext === 'pdf') {
      this.setState({
        internalRulesDoc: inputInternalRulesDoc.current.files[0]
      });
    }
  };

  handlePreContractDocChange = () => {
    const lastDot = inputPreContractDoc.current.files[0].name.lastIndexOf('.');
    const ext = inputPreContractDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (ext === 'pdf') {
      this.setState({
        preContractDoc: inputPreContractDoc.current.files[0]
      });
    }
  };

  handleIdCardDocChange = () => {
    console.log('eeeeeeeeeeeeeee');
    const lastDot = inputIdCardDoc.current.files[0].name.lastIndexOf('.');
    const ext = inputIdCardDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (extList.includes(ext)) {
      this.setState({
        idCardDoc: inputIdCardDoc.current.files[0],
        idCardDocExtension: ext
      });
    }
  };

  handlePassportDocChange = () => {
    const lastDot = inputPassportDoc.current.files[0].name.lastIndexOf('.');
    const ext = inputPassportDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (extList.includes(ext)) {
      this.setState({
        passportDoc: inputPassportDoc.current.files[0],
        passportDocExtension: ext
      });
    }
  };

  handleProfessionalIdCardDocChange = () => {
    const lastDot = inputProfessionalIdCardDoc.current.files[0].name.lastIndexOf(
      '.'
    );
    const ext = inputProfessionalIdCardDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (extList.includes(ext)) {
      this.setState({
        professionalIdCardDoc: inputProfessionalIdCardDoc.current.files[0],
        professionalIdCardDocExtension: ext
      });
    }
  };

  handleHnsCardDocChange = () => {
    const lastDot = inputHnsCardDoc.current.files[0].name.lastIndexOf('.');
    const ext = inputHnsCardDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (extList.includes(ext)) {
      this.setState({
        hnsCardDoc: inputHnsCardDoc.current.files[0],
        hnsCardDocExtension: ext
      });
    }
  };

  handleExpandClick = compName => {
    const {
      isPersonalInformation,
      isGeneralContractInformation,
      isEconomicContractInformation,
      isStaffDocumentation
    } = this.state;
    if (compName === 'personalInformation') {
      this.setState({
        isPersonalInformation: !isPersonalInformation
      });
    } else if (compName === 'generalContractInformation') {
      this.setState({
        isGeneralContractInformation: !isGeneralContractInformation
      });
    } else if (compName === 'economicContractInformation') {
      this.setState({
        isEconomicContractInformation: !isEconomicContractInformation
      });
    } else if (compName === 'staffDocumentation') {
      this.setState({
        isStaffDocumentation: !isStaffDocumentation
      });
    }
  };

  handleChangeBirthCountry = (ev, value) => {
    this.setState({ birthCountry: value });
  };

  handleChangeHiringCountry = (ev, value) => {
    StateCountryService.getStatesByCountry(value.countryId).then(({ data }) => {
      this.setState({
        hiringCountry: value,
        states: data.payload
      });
    });
  };

  handleChangeHiringState = (ev, value) => {
    ContractTypeService.getAllByState(value.stateCountryId).then(({ data }) => {
      this.setState({ contractTypes: data, hiringState: value });
    });
  };

  /* getAll = () => {
    TestClassService.getFiles().then(response => {
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
    const {
      classes, isLoadingStaff, staffResponse, errorStaff
    } = this.props;
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
      isEconomicContractInformation,
      isStaffDocumentation,
      isChangeProfilePic,
      countries,
      states,
      associateOffice,
      hiringCountry,
      hiringState,
      townContract,
      personalNumber,
      highDate,
      lowDate,
      registrationDate,
      preContractDate,
      contractType,
      legalCategoryType,
      contractDoc,
      preContractDoc,
      internalRulesDoc,
      idCardDoc,
      passportDoc,
      professionalIdCardDoc,
      hnsCardDoc,
      idCardNumber,
      idCardExpeditionDate,
      idCardExpirationDate,
      passportNumber,
      passportExpeditionDate,
      passportExpirationDate,
      professionalIdCardNumber,
      professionalIdCardExpeditionDate,
      professionalIdCardExpirationDate,
      hnsCardNumber,
      hnsCardExpeditionDate,
      hnsCardExpirationDate,
      contractTypes,
      legalCategoryTypes,
    } = this.state;
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
    (!isLoadingStaff && staffResponse) && this.editingPromiseResolve(staffResponse);
    (!isLoadingStaff && !staffResponse) && this.editingPromiseResolve(errorStaff);
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
                      value={birthday}
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
                name="staffDocumentation"
                style={{ backgroundColor: 'transparent', width: '100%' }}
                disableRipple
                endIcon={
                  isStaffDocumentation ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )
                }
                onClick={() => this.handleExpandClick('staffDocumentation')}
              >
                  Staff Documentation
              </Button>
            </div>
          </Paper>
          <Collapse in={isStaffDocumentation}>
            <div>
              <Grid
                container
                spacing={6}
                direction="row"
                justifyContent="left"
                alignItems="start"
              >
                <Grid item xs={12} md={4}>
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
                      className={
                        professionalIdCardDoc.constructor === Object
                          ? classes.uploadAvatarEmpty
                          : classes.uploadAvatarDone
                      }
                      onClick={this.handleUploadProfessionalIdCardDocClick}
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
                          ref={inputProfessionalIdCardDoc}
                          multiple={false}
                          style={{ display: 'none' }}
                          onChange={this.handleProfessionalIdCardDocChange}
                        />
                        <PublishIcon
                          className={classes.uploadIcon}
                          color="secondary"
                        />
                        <Typography
                          variant="subtitle1"
                          className={classes.uploadText}
                        >
                            Professional ID
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          className={classes.uploadText}
                        >
                            Card
                        </Typography>
                      </div>
                    </IconButton>
                    <div
                      className={classes.divInline}
                      style={{ width: '100%' }}
                    >
                      <IconButton
                        className={
                          idCardDoc.constructor === Object
                            ? classes.uploadAvatarEmpty
                            : classes.uploadAvatarDone
                        }
                        onClick={this.handleUploadIdCardDocClick}
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
                            ref={inputIdCardDoc}
                            multiple={false}
                            style={{ display: 'none' }}
                            onChange={this.handleIdCardDocChange}
                          />
                          <PublishIcon
                            className={classes.uploadIcon}
                            color="secondary"
                          />
                          <Typography
                            variant="subtitle1"
                            className={classes.uploadText}
                          >
                              Id Card
                          </Typography>
                        </div>
                      </IconButton>
                      <IconButton
                        className={classes.uploadAvatarEmpty}
                        className={
                          passportDoc.constructor === Object
                            ? classes.uploadAvatarEmpty
                            : classes.uploadAvatarDone
                        }
                        onClick={this.handleUploadPassportDocClick}
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
                            ref={inputPassportDoc}
                            multiple={false}
                            style={{ display: 'none' }}
                            onChange={this.handlePassportDocChange}
                          />
                          <PublishIcon
                            className={classes.uploadIcon}
                            color="secondary"
                          />
                          <Typography
                            variant="subtitle1"
                            className={classes.uploadText}
                          >
                              Passport
                          </Typography>
                        </div>
                      </IconButton>
                    </div>
                    <IconButton
                      className={
                        hnsCardDoc.constructor === Object
                          ? classes.uploadAvatarEmpty
                          : classes.uploadAvatarDone
                      }
                      onClick={this.handleUploadHnsCardDocClick}
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
                          ref={inputHnsCardDoc}
                          multiple={false}
                          style={{ display: 'none' }}
                          onChange={this.handleHnsCardDocChange}
                        />
                        <PublishIcon
                          className={classes.uploadIcon}
                          color="secondary"
                        />
                        <Typography
                          variant="subtitle1"
                          className={classes.uploadText}
                        >
                            Health national
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          className={classes.uploadText}
                        >
                            security
                        </Typography>
                      </div>
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Chip
                    label="ID Card"
                    avatar={<Avatar>I</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Number"
                    variant="outlined"
                    name="idCardNumber"
                    fullWidth
                    required
                    value={idCardNumber}
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
                      name="idCardExpeditionDate"
                      label="Expedition date"
                      value={idCardExpeditionDate}
                      onChange={value => this.handleDateValue(value, 'idCardExpeditionDate')
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
                      name="idCardExpirationDate"
                      label="Expiration date"
                      value={idCardExpirationDate}
                      onChange={value => this.handleDateValue(value, 'idCardExpirationDate')
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Chip
                    label="Passport"
                    avatar={<Avatar>P</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Number"
                    variant="outlined"
                    name="passportNumber"
                    fullWidth
                    required
                    value={passportNumber}
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
                      name="passportExpeditionDate"
                      label="Expedition date"
                      value={passportExpeditionDate}
                      onChange={value => this.handleDateValue(value, 'passportExpeditionDate')
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
                      name="passportExpirationDate"
                      label="Expiration date"
                      value={passportExpirationDate}
                      onChange={value => this.handleDateValue(value, 'passportExpirationDate')
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Chip
                    label="Professional ID Card"
                    avatar={<Avatar>PC</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Number"
                    variant="outlined"
                    name="professionalIdCardNumber"
                    fullWidth
                    required
                    value={professionalIdCardNumber}
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
                      name="professionalIdCardExpeditionDate"
                      label="Expedition date"
                      value={professionalIdCardExpeditionDate}
                      onChange={value => this.handleDateValue(
                        value,
                        'professionalIdCardExpeditionDate'
                      )
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
                      name="professionalIdCardExpirationDate"
                      label="Expiration date"
                      value={professionalIdCardExpirationDate}
                      onChange={value => this.handleDateValue(
                        value,
                        'professionalIdCardExpirationDate'
                      )
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Chip
                    label="Health National Security"
                    avatar={<Avatar>H</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Number"
                    variant="outlined"
                    name="hnsCardNumber"
                    fullWidth
                    required
                    value={hnsCardNumber}
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
                      name="hnsCardExpeditionDate"
                      label="Expedition date"
                      value={hnsCardExpeditionDate}
                      onChange={value => this.handleDateValue(value, 'hnsCardExpeditionDate')
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
                      name="hnsCardExpirationDate"
                      label="Expiration date"
                      value={hnsCardExpirationDate}
                      onChange={value => this.handleDateValue(value, 'hnsCardExpirationDate')
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
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
                <Grid item xs={12} md={4}>
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
                      className={
                        contractDoc.constructor === Object
                          ? classes.uploadAvatarEmpty
                          : classes.uploadAvatarDone
                      }
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
                          className={classes.uploadText}
                        >
                            Contract
                        </Typography>
                      </div>
                    </IconButton>
                    <div
                      className={classes.divInline}
                      style={{ width: '100%' }}
                    >
                      <IconButton
                        className={classes.uploadAvatarEmpty}
                        className={
                          internalRulesDoc.constructor === Object
                            ? classes.uploadAvatarEmpty
                            : classes.uploadAvatarDone
                        }
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
                            className={classes.uploadText}
                          >
                              Internal Rules
                          </Typography>
                        </div>
                      </IconButton>
                      <IconButton
                        className={
                          preContractDoc.constructor === Object
                            ? classes.uploadAvatarEmpty
                            : classes.uploadAvatarDone
                        }
                        onClick={this.handleUploadPreContractDocClick}
                        style={{
                          marginTop: 30
                        }}
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
                            ref={inputPreContractDoc}
                            multiple={false}
                            style={{ display: 'none' }}
                            onChange={this.handlePreContractDocChange}
                          />
                          <PublishIcon
                            className={classes.uploadIcon}
                            color="secondary"
                          />
                          <Typography
                            variant="subtitle1"
                            className={classes.uploadText}
                          >
                              PreContract
                          </Typography>
                        </div>
                      </IconButton>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={8}
                  container
                  spacing={5}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <div className={classes.divSpace} style={{ width: '100%' }}>
                      <FormControl
                        className={classes.formControl}
                        style={{ width: '45%' }}
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
                        style={{ width: '45%' }}
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
                        clearOnEscape
                        renderInput={params => (
                          <TextField
                            fullWidth
                            {...params}
                            label="Hiring Country"
                            variant="outlined"
                          />
                        )}
                      />
                      <Autocomplete
                        id="combo-box-demo"
                        value={hiringState}
                        options={states}
                        getOptionLabel={option => option.stateName}
                        onChange={this.handleChangeHiringState}
                        style={{ width: '30%', marginTop: 7 }}
                        clearOnEscape
                        renderInput={params => (
                          <TextField
                            fullWidth
                            {...params}
                            label="Hiring State"
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
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.divSpace} style={{ width: '100%' }}>
                      <TextField
                        id="outlined-basic"
                        label="Employee Number"
                        variant="outlined"
                        name="personalNumber"
                        style={{ width: '30%' }}
                        value={personalNumber}
                        className={classes.textField}
                        onChange={this.handleChange}
                      />
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
                            <MenuItem key={type.code} value={type._id}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl
                        className={classes.formControl}
                        style={{ width: '30%' }}
                      >
                        <InputLabel>Contract legal category</InputLabel>
                        <Select
                          name="legalCategoryType"
                          value={legalCategoryType}
                          onChange={this.handleChange}
                        >
                          {legalCategoryTypes.map(type => (
                            <MenuItem
                              key={type.code}
                              value={type.legalCategoryTypeId}
                            >
                              {type.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
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
                          value={highDate}
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
                          value={lowDate}
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
                          disabled
                          value={registrationDate}
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
                          value={preContractDate}
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
          <Paper
            elevation={1}
            style={{ width: '100%', marginTop: '10px', marginBottom: 20 }}
          >
            <div className={classes.divCenter}>
              <Button
                name="economicContractInformation"
                style={{ backgroundColor: 'transparent', width: '100%' }}
                disableRipple
                endIcon={
                  isEconomicContractInformation ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )
                }
                onClick={() => this.handleExpandClick('economicContractInformation')
                }
              >
                  Economic Contract Information
              </Button>
            </div>
          </Paper>
          <Collapse in={isEconomicContractInformation}>
            <StaffEconomicContractInformation
              handleChangeValue={this.handleChange}
              handleChangeDateValue={this.handleDateValue}
            />
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

/* export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddStaff changeTheme={changeTheme} classes={classes} />;
}; */

const mapStateToProps = state => ({
  allStaff: state.getIn(['staffs']).allStaff,
  staffResponse: state.getIn(['staffs']).staffResponse,
  isLoadingStaff: state.getIn(['staffs']).isLoading,
  errorsStaff: state.getIn(['staffs']).errors,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  saveStaff,
  getAllStaff,
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStaff));
