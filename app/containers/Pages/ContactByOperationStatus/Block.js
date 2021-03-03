import React from 'react';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid, withStyles
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import notification from '../../../components/Notification/Notification';
import {
  deleteContactByOperation,
  getAllContactByOperation,
  updateContactByOperation
} from '../../../redux/contactByOperation/actions';
import styles from '../Staff/staff-jss';
let mondatoryList = [];
class ContactByOperationStatusBlock extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.editingPromiseResolveDelete = () => {
    };
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
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
      operationName: '',
      contactTypeName: '',
      openPopUpAttributes: false,
      buttonUpdateAttributes: false,
      openPopUpDelete: false,
      statusId: '',
      statusIdToDelete: '',
      contactTypeNameToDelete: '',
      columns: [
        {
          name: 'statusName',
          label: 'Status Name',
          options: {
            filter: true
          }
        },
        /*        {
          name: 'description',
          label: 'Status Description',
          options: {
            filter: true
          }
        }, */
        {
          name: 'contactsType',
          label: 'contacts Type',
          options: {
            filter: true
          }
        },
        {
          name: 'contactByOperationId',
          label: 'contacts Type',
          options: {
            display: 'excluded'
          }
        },
        {
          name: 'description',
          label: 'mandatory Attributes',
          options: {
            customBodyRender: (value, data) => (
              <React.Fragment>
                <IconButton onClick={() => this.showMondatoryAttributes(data.rowIndex, data)}>
                  <VisibilityIcon color="secondary" />
                </IconButton>
              </React.Fragment>
            )
          }
        },
        {
          label: 'Actions',
          name: ' ',
          options: {
            customBodyRender: (value, data) => (
              <React.Fragment>
                { thelogedUser.userRoles[0].actionsNames.commercial_contactByOperationStatus_modify ? (
                  <IconButton onClick={() => this.updateStatus(data.rowIndex, data)}>
                    <EditIcon color="secondary" />
                  </IconButton>
                ) : null}
                { thelogedUser.userRoles[0].actionsNames.commercial_contactByOperationStatus_delete ? (
                  <IconButton onClick={() => this.deleteMondatoryAttributes(data.rowIndex, data)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                ) : null}
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

  /*  showMondatoryAttributes= (data) => {
    const { contacts } = this.props;
    console.log(contacts[data].contactsTypes);
    for (const key in contacts[data].contactsTypes) {
      if (contacts[data].contactsTypes[key] === 'contact of the decision-maker') {
        this.setState({ c00: true });
      }
      if (contacts[data].contactsTypes[key] === 'contact of the technical leader') {
        this.setState({ c01: true });
      }
      if (contacts[data].contactsTypes[key] === 'contact of the person close to the decision-maker') {
        this.setState({ c02: true });
      }
      if (contacts[data].contactsTypes[key] === 'Other contact 1') {
        this.setState({ c03: true });
      }
      if (contacts[data].contactsTypes[key] === 'Other contact 2') {
        this.setState({ c04: true });
      }
      if (contacts[data].contactsTypes[key] === 'Other contact 3') {
        this.setState({ c05: true });
      }
      /!** ******************** *!/
      if (contacts[data].contactsTypes[key] === 'pd contact 1') {
        this.setState({ c10: true });
      }
      if (contacts[data].contactsTypes[key] === 'pd contact 2') {
        this.setState({ c11: true });
      }
      if (contacts[data].contactsTypes[key] === 'pd contact 3') {
        this.setState({ c12: true });
      }
      /!** ******************** *!/
      if (contacts[data].contactsTypes[key] === 'la contact 1') {
        this.setState({ c20: true });
      }
      if (contacts[data].contactsTypes[key] === 'la contact 2') {
        this.setState({ c21: true });
      }
      if (contacts[data].contactsTypes[key] === 'la contact 3') {
        this.setState({ c22: true });
      }
    }
    this.setState({ openPopUp: true });
  }; */
  showMondatoryAttributes= (data, aaa) => {
    console.log(aaa.rowData[0]);
    console.log(aaa.rowData[2]);
    const { contacts } = this.props;
    this.setState(
      {
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
        buttonUpdateAttributes: false,
        operationName: aaa.rowData[0],
        contactTypeName: aaa.rowData[2],
        statusId: aaa.rowData[3],
      });


    for (const key in contacts[data].mandatoryAttributes) {
      if (contacts[data].mandatoryAttributes[key] === 'first name') {
        this.setState({ firstName: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'father family name') {
        this.setState({ fatherFamilyName: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'mother family name') {
        this.setState({ motherFamilyName: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'company') {
        this.setState({ company: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'department') {
        this.setState({ department: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'position') {
        this.setState({ position: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'companyFixPhone') {
        this.setState({ companyFixPhone: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'companyMobilePhone') {
        this.setState({ companyMobilePhone: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'companyEmail') {
        this.setState({ companyEmail: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'personalMobilePhone') {
        this.setState({ personalMobilePhone: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'personalEmail') {
        this.setState({ personalEmail: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'skype') {
        this.setState({ skype: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'fullAddress') {
        this.setState({ fullAddress: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'postCode') {
        this.setState({ postCode: true });
      }
    }
    this.setState({ openPopUpAttributes: true });
  };

  deleteMondatoryAttributes= (data, aaa) => {
    this.setState({
      openPopUpDelete: true,
      statusIdToDelete: aaa.rowData[3],
      contactTypeNameToDelete: aaa.rowData[2]
    });
  };

  deleteConfirmeMondatoryAttributes= () => {
    const { statusIdToDelete, contactTypeNameToDelete } = this.state;
    const { deleteContactByOperation, refresh, getAllContactByOperation } = this.props;
    const promise = new Promise((resolve) => {
      deleteContactByOperation(statusIdToDelete, contactTypeNameToDelete);
      this.editingPromiseResolveDelete = resolve;
    });
    promise.then((result) => {
      console.log(result);
      if (isString(result)) {
        notification('success', result);
        getAllContactByOperation();
      } else {
        notification('danger', result);
        getAllContactByOperation();
      }
    });
    this.setState({ openPopUpDelete: false });
  };

  handleCloseDelete = () => {
    this.setState({ openPopUpDelete: false });
  };

  updateStatus = (data, aaa) => {
    // fill all attributes in a list
    console.log(aaa.rowData[0]);
    console.log(aaa.rowData[2]);
    const { contacts } = this.props;
    this.setState(
      {
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
        buttonUpdateAttributes: true,
        operationName: aaa.rowData[0],
        contactTypeName: aaa.rowData[2],
        statusId: aaa.rowData[3],
      });
    mondatoryList = contacts[data].mandatoryAttributes;

    for (const key in contacts[data].mandatoryAttributes) {
      if (contacts[data].mandatoryAttributes[key] === 'first name') {
        this.setState({ firstName: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'father family name') {
        this.setState({ fatherFamilyName: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'mother family name') {
        this.setState({ motherFamilyName: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'company') {
        this.setState({ company: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'department') {
        this.setState({ department: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'position') {
        this.setState({ position: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'companyFixPhone') {
        this.setState({ companyFixPhone: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'companyMobilePhone') {
        this.setState({ companyMobilePhone: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'companyEmail') {
        this.setState({ companyEmail: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'personalMobilePhone') {
        this.setState({ personalMobilePhone: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'personalEmail') {
        this.setState({ personalEmail: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'skype') {
        this.setState({ skype: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'fullAddress') {
        this.setState({ fullAddress: true });
      }
      if (contacts[data].mandatoryAttributes[key] === 'postCode') {
        this.setState({ postCode: true });
      }
    }
    this.setState({ openPopUpAttributes: true });
  };

  handleClose = () => {
    this.setState({ openPopUpAttributes: false });
  };


  updateContactByOperation = () => {
    const { contactTypeName, statusId } = this.state;
    const { getAllContactByOperation, updateContactByOperation } = this.props;
    const contactByOperationObject = {
      contactByOperationId: statusId,
      contactsType: contactTypeName,
      mandatoryAttributes: mondatoryList,
    };
    const promise = new Promise((resolve) => {
      updateContactByOperation(contactByOperationObject);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      console.log('result : ', result);
      if (isString(result)) {
        notification('success', result);
        // getAllContactByOperation();
      } else {
        notification('danger', result);
      }
    });
    this.setState({ openPopUpAttributes: false });
  };

  handleChangeCheckAddAttributes = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
    const index = mondatoryList.findIndex(x => x === event.target.value);
    if (index === -1) {
      mondatoryList.push(event.target.value);
    }
    /** ******** ELSE ******** */
    else {
      mondatoryList.splice(mondatoryList.indexOf(event.target.value), 1);
    }
  };

  componentDidUpdate(prevProps) {
    const { allContactByOperations } = this.props;
    if (allContactByOperations != prevProps.allContactByOperations) {
      // console.log()
    }
    /*    console.log('componentDidUpdate');
    const {
      errorsContactByOperation, isLoadingContactByOperation, contactByOperationResponse,
    } = this.props;
    console.log('contactByOperationResponse:',contactByOperationResponse);
    console.log('contactByOperationResponse prev :',prevProps.contactByOperationResponse);

    if (contactByOperationResponse && contactByOperationResponse == 'deleted') {
      (!isLoadingContactByOperation && contactByOperationResponse) && notification('success', contactByOperationResponse);
      (!isLoadingContactByOperation && !contactByOperationResponse) && notification('danger', errorsContactByOperation);
    }
    if (contactByOperationResponse && contactByOperationResponse == '') {
      console.log('eeeeeeeeeeee');
    (!isLoadingContactByOperation && contactByOperationResponse) && notification('success', contactByOperationResponse);
      (isLoadingContactByOperation && !contactByOperationResponse) && notification('danger', errorsContactByOperation);
    } */
  }

  render() {
    const {
      openPopUpAttributes, operationName, contactTypeName, buttonUpdateAttributes, openPopUpDelete,
      firstName, fatherFamilyName, motherFamilyName, company, department, position, companyFixPhone, companyMobilePhone, companyEmail, personalMobilePhone, personalEmail, skype, fullAddress, postCode
    } = this.state;
    const {
      contacts, classes, logedUser,
      isLoadingContactByOperation, contactByOperationResponse, errorsContactByOperation,
    } = this.props;
    const { columns } = this.state;
    (!isLoadingContactByOperation && contactByOperationResponse === 'updated') && this.editingPromiseResolve(contactByOperationResponse);
    // (!isLoadingContactByOperation && !contactByOperationResponse) && this.editingPromiseResolve(errorsContactByOperation);

    (!isLoadingContactByOperation && contactByOperationResponse == 'deleted') && this.editingPromiseResolveDelete(contactByOperationResponse);
    /*    (!isLoadingContactByOperation && !contactByOperationResponse) && this.editingPromiseResolveDelete(errorsContactByOperation); */
    const thelogedUser = JSON.parse(logedUser);
    if (!thelogedUser.userRoles[0].actionsNames.commercial_contactByOperationStatus_modify && !thelogedUser.userRoles[0].actionsNames.commercial_contactByOperationStatus_delete) {
      columns[4] = '';
    }
    let download = false;
    if (thelogedUser.userRoles[0].actionsNames.commercial_contactByOperationStatus_export) {
      download = true;
    }
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      download,
      print: download
    };
    return (
      <div>
        <MUIDataTable
          title="Status of Commercial Operation"
          data={contacts}
          columns={columns}
          options={options}
        />
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
                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={firstName} onChange={this.handleChangeCheckAddAttributes} name="firstName" value="first name" />}
                        label="first name"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={firstName} name="firstName" value="first name" />}
                        label="first name"
                      />
                    )
                    }

                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={fatherFamilyName} onChange={this.handleChangeCheckAddAttributes} name="fatherFamilyName" value="father family name" />}
                        label="father family name"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={fatherFamilyName} name="fatherFamilyName" value="father family name" />}
                        label="father family name"
                      />
                    )
                    }

                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={motherFamilyName} onChange={this.handleChangeCheckAddAttributes} name="motherFamilyName" value="mother family name" />}
                        label="mother family name"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={motherFamilyName} name="motherFamilyName" value="mother family name" />}
                        label="mother family name"
                      />
                    )
                    }
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
                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={company} onChange={this.handleChangeCheckAddAttributes} name="company" value="company" />}
                        label="company"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={company} name="company" value="company" />}
                        label="company"
                      />
                    )
                    }


                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={department} onChange={this.handleChangeCheckAddAttributes} name="department" value="department" />}
                        label="department"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={department} name="department" value="department" />}
                        label="department"
                      />
                    )
                    }

                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={position} onChange={this.handleChangeCheckAddAttributes} name="position" value="position" />}
                        label="position"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={position} name="position" value="position" />}
                        label="position"
                      />
                    )
                    }

                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={companyFixPhone} onChange={this.handleChangeCheckAddAttributes} name="companyFixPhone" value="companyFixPhone" />}
                        label="company fix phone"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={companyFixPhone} name="companyFixPhone" value="companyFixPhone" />}
                        label="company fix phone"
                      />
                    )
                    }

                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={companyMobilePhone} onChange={this.handleChangeCheckAddAttributes} name="companyMobilePhone" value="companyMobilePhone" />}
                        label="company mobile phone"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={companyMobilePhone} name="companyMobilePhone" value="companyMobilePhone" />}
                        label="company mobile phone"
                      />
                    )
                    }

                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={companyEmail} onChange={this.handleChangeCheckAddAttributes} name="companyEmail" value="companyEmail" />}
                        label="company email"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={companyEmail} name="companyEmail" value="companyEmail" />}
                        label="company email"
                      />
                    )
                    }

                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={personalMobilePhone} onChange={this.handleChangeCheckAddAttributes} name="personalMobilePhone" value="personalMobilePhone" />}
                        label="personal mobile phone"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={personalMobilePhone} name="personalMobilePhone" value="personalMobilePhone" />}
                        label="personal mobile phone"
                      />
                    )
                    }

                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={personalEmail} onChange={this.handleChangeCheckAddAttributes} name="personalEmail" value="personalEmail" />}
                        label="personal email"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={personalEmail} name="personalEmail" value="personalEmail" />}
                        label="personal email"
                      />
                    )
                    }

                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={skype} onChange={this.handleChangeCheckAddAttributes} name="skype" value="skype" />}
                        label="skype"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={skype} name="skype" value="skype" />}
                        label="skype"
                      />
                    )
                    }
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
                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={fullAddress} onChange={this.handleChangeCheckAddAttributes} name="fullAddress" value="fullAddress" />}
                        label="name of address"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={fullAddress} name="fullAddress" value="fullAddress" />}
                        label="name of address"
                      />
                    )
                    }

                    {buttonUpdateAttributes == true ? (
                      <FormControlLabel
                        control={<Checkbox checked={postCode} onChange={this.handleChangeCheckAddAttributes} name="postCode" value="postCode" />}
                        label="post code"
                      />
                    ) : (
                      <FormControlLabel
                        control={<Checkbox checked={postCode} name="postCode" value="postCode" />}
                        label="post code"
                      />
                    )
                    }
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>
              Close
            </Button>
            {buttonUpdateAttributes == true ? (
              <Button
                variant="contained"
                color="primary"
                onClick={this.updateContactByOperation}
              >
                Update
              </Button>
            ) : (<br />)
            }
          </DialogActions>
        </Dialog>
        <Dialog
          open={openPopUpDelete}
          keepMounted
          scroll="body"
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth=""
          maxWidth=""
        >
          <DialogTitle id="alert-dialog-slide-title"> Delete contact type by operation </DialogTitle>
          <DialogContent dividers>
           Are you sure you want to delete ?
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleCloseDelete}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.deleteConfirmeMondatoryAttributes}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //
  allContactByOperations: state.getIn(['contactByOperations']).allContactByOperations,
  contactByOperationResponse: state.getIn(['contactByOperations']).contactByOperationResponse,
  isLoadingContactByOperation: state.getIn(['contactByOperations']).isLoading,
  errorsContactByOperation: state.getIn(['contactByOperations']).errors,

  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllContactByOperation,
  updateContactByOperation,
  deleteContactByOperation
}, dispatch);
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ContactByOperationStatusBlock)
);
