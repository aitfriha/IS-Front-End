import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import {
  Avatar,
  Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography, withStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import { isString } from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../Staff/staff-jss';
import EditContact from '../Contact/editContact';
import ContactByOperationStatusBlock from './Block';
import AutoCompleteMultiLineDisabled from './AutoCompleteWithDisabled';
import {
  getAllCommercialOperationStatus,
} from '../../../redux/commercialOperationStatus/actions';
import { addContactByOperation, getAllContactByOperation } from '../../../redux/contactByOperation/actions';
import notification from '../../../components/Notification/Notification';
import { getAllClient } from '../../../redux/client/actions';
import { ThemeContext } from '../../App/ThemeWrapper';

const mondatoryList = [];
const contactOfTheDecisionMakerMandatoryAttributesTemp = [];
const contactOfTheTechnicalLeaderMandatoryAttributesTemp = [];
const contactOfThePersoncloseToTheDecisionMakerMandatoryAttributesTemp = [];
const otherContact1MandatoryAttributesTemp = [];
const otherContact2MandatoryAttributesTemp = [];
const otherContact3MandatoryAttributesTemp = [];

const pdContact1MandatoryAttributesTemp = [];
const pdContact2MandatoryAttributesTemp = [];
const pdContact3MandatoryAttributesTemp = [];

const laContact1MandatoryAttributesTemp = [];
const laContact2MandatoryAttributesTemp = [];
const laContact3MandatoryAttributesTemp = [];
const useStyles = makeStyles();
class ContactByOperationStatus extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      statusName: '',
      createOrUpdate: true,
      contacts: [],
      description: '',
      openPopUp: false,
      c00: false,
      c01: false,
      c02: false,
      c03: false,
      c04: false,
      c05: false,
      c10: false,
      c11: false,
      c12: false,
      c20: false,
      c21: false,
      c22: false,
      mandatoryC00: true,
      mandatoryC01: true,
      mandatoryC02: true,
      mandatoryC03: true,
      mandatoryC04: true,
      mandatoryC05: true,

      mandatoryC10: true,
      mandatoryC11: true,
      mandatoryC12: true,

      mandatoryC20: true,
      mandatoryC21: true,
      mandatoryC22: true,

      firstName: false,
      fatherFamilyName: false,
      motherFamilyName: false,
      company: false,
      department: false,
      position: false,
      companyFixPhone: false,
      companyMobilePhone: false,
      companyEmail: false,
      personalMobilePhone: false,
      personalEmail: false,
      skype: false,
      fullAddress: false,
      postCode: false,


      buttonControle: true,
      operationName: '',
      statusId: '',
      contactsTypes: [],
      openPopUpAttributes: false,
      contactTypeName: '',
      /* **************** */
      contactOfTheDecisionMakerMandatoryAttributes: [],
      contactOfTheTechnicalLeaderMandatoryAttributes: [],
      contactOfThePersoncloseToTheDecisionMakerMandatoryAttributes: [],
      otherContact1MandatoryAttributes: [],
      otherContact2MandatoryAttributes: [],
      otherContact3MandatoryAttributes: [],

      pdContact1MandatoryAttributes: [],
      pdContact2MandatoryAttributes: [],
      pdContact3MandatoryAttributes: [],

      laContact1MandatoryAttributes: [],
      laContact2MandatoryAttributes: [],
      laContact3MandatoryAttributes: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllCommercialOperationStatus, getAllContactByOperation, changeTheme } = this.props;
    changeTheme('redTheme');
    getAllCommercialOperationStatus();
    getAllContactByOperation();
  }

  refresh = () => {
    const { getAllContactByOperation } = this.props;
    getAllContactByOperation();
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleOpenDialog= ev => {
    this.setState({ openPopUp: true });
  };

  handleSubmitStatus = () => {
    const {
      statusId, description, contactsTypes,
      contactOfTheDecisionMakerMandatoryAttributes,
      contactOfTheTechnicalLeaderMandatoryAttributes,
      otherContact1MandatoryAttributes,
      contactOfThePersoncloseToTheDecisionMakerMandatoryAttributes,
      otherContact2MandatoryAttributes,
      otherContact3MandatoryAttributes,
      pdContact1MandatoryAttributes,
      pdContact2MandatoryAttributes,
      pdContact3MandatoryAttributes,
      laContact1MandatoryAttributes,
      laContact2MandatoryAttributes,
      laContact3MandatoryAttributes
    } = this.state;
    const { addContactByOperation, getAllContactByOperation } = this.props;
    const objectsContactTypeMandatoryAttributes = [
      {
        statusId,
        description,
        contactsType: 'contact of the decision-maker',
        mandatoryAttributes: contactOfTheDecisionMakerMandatoryAttributes
      },
      {
        statusId,
        description,
        contactsType: 'contact of the technical leader',
        mandatoryAttributes: contactOfTheTechnicalLeaderMandatoryAttributes
      },
      {
        statusId,
        description,
        contactsType: 'contact of the person close to the decision-maker',
        mandatoryAttributes: contactOfThePersoncloseToTheDecisionMakerMandatoryAttributes
      },
      {
        statusId,
        description,
        contactsType: 'Other contact 1',
        mandatoryAttributes: otherContact1MandatoryAttributes
      },
      {
        statusId,
        description,
        contactsType: 'Other contact 2',
        mandatoryAttributes: otherContact2MandatoryAttributes
      },
      {
        statusId,
        description,
        contactsType: 'Other contact 3',
        mandatoryAttributes: otherContact3MandatoryAttributes
      },

      {
        statusId,
        description,
        contactsType: 'procurement department contact 1',
        mandatoryAttributes: pdContact1MandatoryAttributes
      },
      {
        statusId,
        description,
        contactsType: 'procurement department contact 2',
        mandatoryAttributes: pdContact2MandatoryAttributes
      },
      {
        statusId,
        description,
        contactsType: 'rocurement department contact 3',
        mandatoryAttributes: pdContact3MandatoryAttributes
      },
      {
        statusId,
        description,
        contactsType: 'legal area contact 1',
        mandatoryAttributes: laContact1MandatoryAttributes
      },
      {
        statusId,
        description,
        contactsType: 'legal area contact 2',
        mandatoryAttributes: laContact2MandatoryAttributes
      },
      {
        statusId,
        description,
        contactsType: 'legal area contact 3',
        mandatoryAttributes: laContact3MandatoryAttributes
      },
    ];
    console.log(objectsContactTypeMandatoryAttributes);
    // return null;
    const cbo = {
      statusId,
      description,
      contactsTypes
    };
    const promise = new Promise((resolve) => {
      addContactByOperation(objectsContactTypeMandatoryAttributes);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        notification('success', result);
        getAllContactByOperation();
      } else {
        notification('danger', result);
      }
    });
    this.setState({ openPopUp: false });
  };

  handleCancel = () => {
    this.setState({ createOrUpdate: true, description: '', statusName: '' });
  }

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  handleChangeSelectedStatus = (status) => {
    console.log(status);
    this.setState(
      {
        statusName: status.statusName,

        description: status.description,
        createOrUpdate: false,
        buttonControle: false,
      });
  };

  handleChangeState= (ev, value) => {
    this.setState(
      {
        buttonControle: false,
        operationName: value.name,
        statusId: value.commercialOperationStatusId,
      });
  }

  closeMandatoryattributes = () => {
    this.setState({ openPopUpAttributes: false });
  };

  submitMandatoryattributes = () => {
    this.setState({ openPopUpAttributes: false });
  };

  // Enable desable mandatory attributes
   handleChangeCheck = (event) => {
     this.setState({ [event.target.name]: event.target.checked });
     const index = mondatoryList.findIndex(x => x === event.target.value);
     console.log(event.target.value);
     if (index === -1) {
       if (event.target.value === 'contact of the decision-maker') {
         this.setState(
           {
             mandatoryC00: false,
           });
       }
       if (event.target.value === 'contact of the technical leader') {
         this.setState(
           {
             mandatoryC01: false,
           });
       }
       if (event.target.value === 'contact of the person close to the decision-maker') {
         this.setState(
           {
             mandatoryC02: false,
           });
       }
       if (event.target.value === 'Other contact 1') {
         this.setState(
           {
             mandatoryC03: false,
           });
       }
       if (event.target.value === 'Other contact 2') {
         this.setState(
           {
             mandatoryC04: false,
           });
       }
       if (event.target.value === 'Other contact 3') {
         this.setState(
           {
             mandatoryC05: false,
           });
       }
       if (event.target.value === 'procurement department contact 1') {
         this.setState(
           {
             mandatoryC10: false,
           });
       }
       if (event.target.value === 'procurement department contact 2') {
         this.setState(
           {
             mandatoryC11: false,
           });
       }
       if (event.target.value === 'rocurement department contact 3') {
         this.setState(
           {
             mandatoryC12: false,
           });
       }
       if (event.target.value === 'legal area contact 1') {
         this.setState(
           {
             mandatoryC20: false,
           });
       }
       if (event.target.value === 'legal area contact 2') {
         this.setState(
           {
             mandatoryC21: false,
           });
       }
       if (event.target.value === 'legal area contact 3') {
         this.setState(
           {
             mandatoryC22: false,
           });
       }
       mondatoryList.push(event.target.value);
     }

     /** ******** ELSE ******** */
     else {
       if (event.target.value === 'contact of the decision-maker') {
         this.setState(
           {
             mandatoryC00: true,
           });
       }
       if (event.target.value === 'contact of the technical leader') {
         this.setState(
           {
             mandatoryC01: true,
           });
       }
       if (event.target.value === 'contact of the person close to the decision-maker') {
         this.setState(
           {
             mandatoryC02: true,
           });
       }
       if (event.target.value === 'Other contact 1') {
         this.setState(
           {
             mandatoryC03: true,
           });
       }
       if (event.target.value === 'Other contact 2') {
         this.setState(
           {
             mandatoryC04: true,
           });
       }
       if (event.target.value === 'Other contact 3') {
         this.setState(
           {
             mandatoryC05: true,
           });
       }
       if (event.target.value === 'procurement department contact 1') {
         this.setState(
           {
             mandatoryC10: true,
           });
       }
       if (event.target.value === 'procurement department contact 2') {
         this.setState(
           {
             mandatoryC11: true,
           });
       }
       if (event.target.value === 'rocurement department contact 3') {
         this.setState(
           {
             mandatoryC12: true,
           });
       }
       if (event.target.value === 'legal area contact 1') {
         this.setState(
           {
             mandatoryC20: true,
           });
       }
       if (event.target.value === 'legal area contact 2') {
         this.setState(
           {
             mandatoryC21: true,
           });
       }
       if (event.target.value === 'legal area contact 3') {
         this.setState(
           {
             mandatoryC22: true,
           });
       }
       mondatoryList.splice(mondatoryList.indexOf(event.target.value), 1);
     }
     this.setState(
       {
         contactsTypes: mondatoryList,
       });
   };

  handleChangeCheckAddAttributes = (event) => {
    const { contactTypeName } = this.state;
    this.setState({ [event.target.name]: event.target.checked });
    if (contactTypeName === 'contact of the decision-maker') {
      const index = contactOfTheDecisionMakerMandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        contactOfTheDecisionMakerMandatoryAttributesTemp.push(event.target.value);
      } else {
        contactOfTheDecisionMakerMandatoryAttributesTemp.splice(contactOfTheDecisionMakerMandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('Decision-Maker : ', contactOfTheDecisionMakerMandatoryAttributesTemp);
      this.setState(
        {
          contactOfTheDecisionMakerMandatoryAttributes: contactOfTheDecisionMakerMandatoryAttributesTemp,
        });
    }
    if (contactTypeName === 'contact of the technical leader') {
      const index = contactOfTheTechnicalLeaderMandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        contactOfTheTechnicalLeaderMandatoryAttributesTemp.push(event.target.value);
      } else {
        contactOfTheTechnicalLeaderMandatoryAttributesTemp.splice(contactOfTheTechnicalLeaderMandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('TechnicalLeader : ', contactOfTheTechnicalLeaderMandatoryAttributesTemp);
      this.setState(
        {
          contactOfTheTechnicalLeaderMandatoryAttributes: contactOfTheTechnicalLeaderMandatoryAttributesTemp,
        });
    }
    if (contactTypeName === 'contact of the person close to the decision-maker') {
      const index = contactOfThePersoncloseToTheDecisionMakerMandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        contactOfThePersoncloseToTheDecisionMakerMandatoryAttributesTemp.push(event.target.value);
      } else {
        contactOfThePersoncloseToTheDecisionMakerMandatoryAttributesTemp.splice(contactOfThePersoncloseToTheDecisionMakerMandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('contact of the person close to the decision-maker : ', contactOfThePersoncloseToTheDecisionMakerMandatoryAttributesTemp);
      this.setState(
        {
          contactOfThePersoncloseToTheDecisionMakerMandatoryAttributes: contactOfThePersoncloseToTheDecisionMakerMandatoryAttributesTemp,
        });
    }
    if (contactTypeName === 'Other contact 1') {
      const index = otherContact1MandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        otherContact1MandatoryAttributesTemp.push(event.target.value);
      } else {
        otherContact1MandatoryAttributesTemp.splice(otherContact1MandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('Other contact 1 : ', otherContact1MandatoryAttributesTemp);
      this.setState(
        {
          otherContact1MandatoryAttributes: otherContact1MandatoryAttributesTemp,
        });
    }
    if (contactTypeName === 'Other contact 2') {
      const index = otherContact2MandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        otherContact2MandatoryAttributesTemp.push(event.target.value);
      } else {
        otherContact2MandatoryAttributesTemp.splice(otherContact2MandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('Other contact 2 : ', otherContact2MandatoryAttributesTemp);
      this.setState(
        {
          otherContact2MandatoryAttributes: otherContact2MandatoryAttributesTemp,
        });
    }
    if (contactTypeName === 'Other contact 3') {
      const index = otherContact3MandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        otherContact3MandatoryAttributesTemp.push(event.target.value);
      } else {
        otherContact3MandatoryAttributesTemp.splice(otherContact3MandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('Other contact 3 : ', otherContact3MandatoryAttributesTemp);
      this.setState(
        {
          otherContact3MandatoryAttributes: otherContact3MandatoryAttributesTemp,
        });
    }
    if (contactTypeName === 'procurement department contact 1') {
      const index = pdContact1MandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        pdContact1MandatoryAttributesTemp.push(event.target.value);
      } else {
        pdContact1MandatoryAttributesTemp.splice(pdContact1MandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('procurement department contact 1 : ', pdContact1MandatoryAttributesTemp);
      this.setState(
        {
          pdContact1MandatoryAttributes: pdContact1MandatoryAttributesTemp,
        });
    }
    if (contactTypeName === 'procurement department contact 2') {
      const index = pdContact2MandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        pdContact2MandatoryAttributesTemp.push(event.target.value);
      } else {
        pdContact2MandatoryAttributesTemp.splice(pdContact2MandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('procurement department contact 2 : ', pdContact2MandatoryAttributesTemp);
      this.setState(
        {
          pdContact2MandatoryAttributes: pdContact2MandatoryAttributesTemp,
        });
    }
    if (contactTypeName === 'rocurement department contact 3') {
      const index = pdContact3MandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        pdContact3MandatoryAttributesTemp.push(event.target.value);
      } else {
        pdContact3MandatoryAttributesTemp.splice(pdContact3MandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('rocurement department contact 3 : ', pdContact3MandatoryAttributesTemp);
      this.setState(
        {
          pdContact3MandatoryAttributes: pdContact3MandatoryAttributesTemp,
        });
    }
    if (contactTypeName === 'legal area contact 1') {
      const index = laContact1MandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        laContact1MandatoryAttributesTemp.push(event.target.value);
      } else {
        laContact1MandatoryAttributesTemp.splice(laContact1MandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('legal area contact 1 : ', laContact1MandatoryAttributesTemp);
      this.setState(
        {
          laContact1MandatoryAttributes: laContact1MandatoryAttributesTemp,
        });
    }
    if (contactTypeName === 'legal area contact 2') {
      const index = laContact2MandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        laContact2MandatoryAttributesTemp.push(event.target.value);
      } else {
        laContact2MandatoryAttributesTemp.splice(laContact2MandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('legal area contact 2 : ', laContact2MandatoryAttributesTemp);
      this.setState(
        {
          laContact2MandatoryAttributes: laContact2MandatoryAttributesTemp,
        });
    }
    if (contactTypeName === 'legal area contact 3') {
      const index = laContact3MandatoryAttributesTemp.findIndex(x => x === event.target.value);
      if (index === -1) {
        laContact3MandatoryAttributesTemp.push(event.target.value);
      } else {
        laContact3MandatoryAttributesTemp.splice(laContact3MandatoryAttributesTemp.indexOf(event.target.value), 1);
      }
      console.log('legal area contact 3 : ', laContact3MandatoryAttributesTemp);
      this.setState(
        {
          laContact3MandatoryAttributes: laContact3MandatoryAttributesTemp,
        });
    }
  }

  displayAttributes= (contactTypeName) => {
    this.setState(
      {
        openPopUpAttributes: true,
        contactTypeName,
        firstName: false,
        fatherFamilyName: false,
        motherFamilyName: false,
        company: false,
        department: false,
        position: false,
        companyFixPhone: false,
        companyMobilePhone: false,
        companyEmail: false,
        personalMobilePhone: false,
        personalEmail: false,
        skype: false,
        fullAddress: false,
        postCode: false
      });
  };

  render() {
    const title = brand.name + ' - Contact by Operation';
    const {
      contacts, createOrUpdate, statusName, description, openPopUp, openPopUpAttributes, contactTypeName,
      c00, c01, c02, c03, c04, c05,
      c10, c11, c12,
      c20, c21, c22,
      mandatoryC00, mandatoryC01, mandatoryC02, mandatoryC03, mandatoryC04, mandatoryC05,
      mandatoryC10, mandatoryC11, mandatoryC12,
      mandatoryC20, mandatoryC21, mandatoryC22,
      buttonControle,
      operationName,

      firstName, fatherFamilyName, motherFamilyName, company, department, position, companyFixPhone, companyMobilePhone, companyEmail, personalMobilePhone, personalEmail, skype, fullAddress, postCode
    } = this.state;
    const {
      classes, allCommercialOperationStatus, allContactByOperations, contactByOperationResponse, errorsContactByOperation, isLoadingContactByOperation, logedUser
    } = this.props;
    (!isLoadingContactByOperation && contactByOperationResponse) && this.editingPromiseResolve(contactByOperationResponse);
    (!isLoadingContactByOperation && !contactByOperationResponse) && this.editingPromiseResolve(errorsContactByOperation);
    const thelogedUser = JSON.parse(logedUser);
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
        <PapperBlock title="Contact by Operation status" desc="" noMargin>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Grid
              item
              xs={12}
              md={5}
              style={{ display: 'flex' }}
            >
              <Typography variant="subtitle2" color="primary" style={{ width: '20%' }}>Status</Typography>
              <div style={{ width: '80%' }}>
                <Autocomplete
                  id="combo-box-demo"
                  options={allCommercialOperationStatus}
                  getOptionLabel={option => option.name}
                  onChange={this.handleChangeState}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Select the status"
                      variant="outlined"
                    />
                  )}
                />
              </div>
            </Grid>
            {thelogedUser.userRoles[0].actionsNames.commercial_contactByOperationStatus_create ? (
              <Grid
                item
                xs={12}
                md={5}
                style={{ display: 'flex' }}
              >
                <Typography variant="subtitle2" color="primary" style={{ width: '20%' }}>Contact type</Typography>
                <div style={{ width: '60%' }}>
                  <Button
                    disabled={buttonControle}
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={this.handleOpenDialog}
                  >
                      Add contact Type
                  </Button>
                </div>
              </Grid>
            ) : null
            }

            <Grid
              item
              xs={12}
              md={5}
              style={{ display: 'flex' }}
            />
          </Grid>
          <br />
          <Dialog
            open={openPopUp}
            keepMounted
            scroll="body"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth="xl"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {' '}
                Mondatory contact type for status :
              <span style={{ color: 'blue' }}>
                {' '}
                {operationName}
              </span>
            </DialogTitle>
            <DialogContent dividers>
              <Grid
                container
                spacing={4}
                direction="row"
              >
                <Grid item xs={12} md={3}>
                  <Chip
                    label="Qualification Process Contacts"
                    avatar={<Avatar>1</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={c00} onChange={this.handleChangeCheck} name="c00" value="contact of the decision-maker" />}
                        label="contact of the decision-maker"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={c01} onChange={this.handleChangeCheck} name="c01" value="contact of the technical leader" />}
                        label="contact of the technical leader"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={c02} onChange={this.handleChangeCheck} name="c02" value="contact of the person close to the decision-maker" />}
                        label="contact of the person close to the decision-maker"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={c03} onChange={this.handleChangeCheck} name="c03" value="Other contact 1" />}
                        label="Other contact 1"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={c04} onChange={this.handleChangeCheck} name="c04" value="Other contact 2" />}
                        label="Other contact 2"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={c05} onChange={this.handleChangeCheck} name="c05" value="Other contact 3" />}
                        label="Other contact 3"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={1}>
                  <Chip
                    label="attributes"
                    avatar={<Avatar>M</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('contact of the decision-maker')} disabled={mandatoryC00}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('contact of the technical leader')} disabled={mandatoryC01}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('contact of the person close to the decision-maker')} disabled={mandatoryC02}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('Other contact 1')} disabled={mandatoryC03}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('Other contact 2')} disabled={mandatoryC04}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('Other contact 3')} disabled={mandatoryC05}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Chip
                    label="Procurement Department"
                    avatar={<Avatar>2</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <FormControl component="fieldset" className={classes.formControl}>
                    {/*     <FormLabel component="legend">Assign responsibility</FormLabel> */}
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={c10} onChange={this.handleChangeCheck} name="c10" value="procurement department contact 1" />}
                        label="Contact 1"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={c11} onChange={this.handleChangeCheck} name="c11" value="procurement department contact 2" />}
                        label="Contact 2"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={c12} onChange={this.handleChangeCheck} name="c12" value="rocurement department contact 3" />}
                        label="Contact 3"
                      />
                    </FormGroup>
                    {/* <FormHelperText>Be careful</FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={1}>
                  <Chip
                    label="attributes"
                    avatar={<Avatar>M</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('procurement department contact 1')} disabled={mandatoryC10}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('procurement department contact 2')} disabled={mandatoryC11}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('rocurement department contact 3')} disabled={mandatoryC12}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Chip
                    label="Legal Area"
                    avatar={<Avatar>3</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={c20} onChange={this.handleChangeCheck} name="c20" value="legal area contact 1" />}
                        label="Contact 1"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={c21} onChange={this.handleChangeCheck} name="c21" value="legal area contact 2" />}
                        label="Contact 2"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={c22} onChange={this.handleChangeCheck} name="c22" value="legal area contact 3" />}
                        label="Contact 3"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={1}>
                  <Chip
                    label="attributes"
                    avatar={<Avatar>M</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('legal area contact 1')} disabled={mandatoryC20}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('legal area contact 2')} disabled={mandatoryC21}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                  <div style={{ marginTop: '-5px' }}>
                    <IconButton onClick={() => this.displayAttributes('legal area contact 3')} disabled={mandatoryC22}>
                      <LibraryBooks color="secondary" />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmitStatus}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <ContactByOperationStatusBlock onSelected={this.handleChangeSelectedStatus} contacts={allContactByOperations} classes={classes} refresh={this.refresh} />
          {/* attributes */}
          <Dialog
            open={openPopUpAttributes}
            keepMounted
            scroll="body"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth="xl"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {' '}
              Mondatory attributes for Status :
              <span style={{ color: 'blue' }}>
                {' '}
                {operationName}
                {' '}
              </span>
              contact type :
              <span style={{ color: 'blue' }}>
                {' '}
                {contactTypeName}
                {' '}
              </span>
            </DialogTitle>
            <DialogContent dividers>
              <Grid
                container
                spacing={4}
                direction="row"
              >
                <Grid item xs={12} md={4}>
                  <Chip
                    label="Personnal information"
                    avatar={<Avatar>p</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={firstName} onChange={this.handleChangeCheckAddAttributes} name="firstName" value="first name" />}
                        label="first name"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={fatherFamilyName} onChange={this.handleChangeCheckAddAttributes} name="fatherFamilyName" value="father family name" />}
                        label="father family name"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={motherFamilyName} onChange={this.handleChangeCheckAddAttributes} name="motherFamilyName" value="mother family name" />}
                        label="mother family name"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Chip
                    label="Contact information"
                    avatar={<Avatar>2</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={company} onChange={this.handleChangeCheckAddAttributes} name="company" value="company" />}
                        label="company"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={department} onChange={this.handleChangeCheckAddAttributes} name="department" value="department" />}
                        label="department"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={position} onChange={this.handleChangeCheckAddAttributes} name="position" value="position" />}
                        label="position"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={companyFixPhone} onChange={this.handleChangeCheckAddAttributes} name="companyFixPhone" value="companyFixPhone" />}
                        label="company fix phone"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={companyMobilePhone} onChange={this.handleChangeCheckAddAttributes} name="companyMobilePhone" value="companyMobilePhone" />}
                        label="company mobile phone"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={companyEmail} onChange={this.handleChangeCheckAddAttributes} name="companyEmail" value="companyEmail" />}
                        label="company email"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={personalMobilePhone} onChange={this.handleChangeCheckAddAttributes} name="personalMobilePhone" value="personalMobilePhone" />}
                        label="personal mobile phone"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={personalEmail} onChange={this.handleChangeCheckAddAttributes} name="personalEmail" value="personalEmail" />}
                        label="personal email"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={skype} onChange={this.handleChangeCheckAddAttributes} name="skype" value="skype" />}
                        label="skype"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Chip
                    label="Address"
                    avatar={<Avatar>3</Avatar>}
                    color="primary"
                  />
                  <Divider
                    variant="fullWidth"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  />
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={fullAddress} onChange={this.handleChangeCheckAddAttributes} name="fullAddress" value="fullAddress" />}
                        label="name of address"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={postCode} onChange={this.handleChangeCheckAddAttributes} name="postCode" value="postCode" />}
                        label="post code"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.closeMandatoryattributes}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.submitMandatoryattributes}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </PapperBlock>
      </div>
    );
  }
}
ContactByOperationStatus.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
  getAllCommercialOperationStatus: PropTypes.func.isRequired,
  allCommercialOperationStatus: PropTypes.array.isRequired,
  commercialOperationStatusResponse: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  allCommercialOperationStatus: state.getIn(['commercialOperationStatus']).allCommercialOperationStatuss,
  commercialOperationStatusResponse: state.getIn(['commercialOperationStatus']).commercialOperationStatusResponse,
  isLoading: state.getIn(['commercialOperationStatus']).isLoading,
  errors: state.getIn(['commercialOperationStatus']).errors,
  //
  allContactByOperations: state.getIn(['contactByOperations']).allContactByOperations,
  contactByOperationResponse: state.getIn(['contactByOperations']).contactByOperationResponse,
  isLoadingContactByOperation: state.getIn(['contactByOperations']).isLoading,
  errorsContactByOperation: state.getIn(['contactByOperations']).errors,

  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCommercialOperationStatus,
  addContactByOperation,
  getAllContactByOperation
}, dispatch);

const ContactByOperationStatusMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactByOperationStatus);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <ContactByOperationStatusMapped changeTheme={changeTheme} classes={classes} />;
};
