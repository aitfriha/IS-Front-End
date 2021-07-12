import React, { Component, useContext } from 'react';
import {
  Grid,
  FormControl,
  TextField,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography
} from '@material-ui/core';

import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import EditIcon from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import PublishIcon from '@material-ui/icons/Publish';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import Ionicon from 'react-ionicons';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { DataUsageOutlined } from '@material-ui/icons';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Transition from '../../../components/Transition/transition';
import styles from './staff-jss';
import FinancialCompanyService from '../../Services/FinancialCompanyService';
import CountryService from '../../Services/CountryService';
import StateCountryService from '../../Services/StateCountryService';
import StaffContractService from '../../Services/StaffContractService';
import StaffService from '../../Services/StaffService';
import { ThemeContext } from '../../App/ThemeWrapper';
import { setStaff, getAllStaff } from '../../../redux/staff/actions';
import { getAllContractTypeByState } from '../../../redux/contractType/actions';
import { getAllContractModel } from '../../../redux/contractModel/actions';
import { getAllLegalCategoryTypeByCompany } from '../../../redux/legalCategoryType/actions';
import { getAllStaffContractHistoryByContract } from '../../../redux/staffContractHistory/actions';
import { updateStaffContract } from '../../../redux/staffContract/actions';
import notification from '../../../components/Notification/Notification';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const inputContractDoc = React.createRef();
const inputInternalRulesDoc = React.createRef();
const inputPreContractDoc = React.createRef();

const useStyles = makeStyles(styles);

class StaffProfileContractInformation extends Component {
  state = {
    isOpenDocument: false,
    documentType: '',
    numPages: null,
    pageNumber: 1,
    isEditData: false,
    isViewHistory: false,
    contractType: '',
    legalCategoryType: '',
    contractModel: '',
    associateOffice: '',
    hiringCountry: null,
    hiringCountryName: '',
    hiringState: null,
    hiringStateName: '',
    townContract: '',
    personalNumber: '',
    highDate: new Date(),
    lowDate: null,
    registrationDate: new Date(),
    preContractDate: new Date(),
    internalRulesDoc: {},
    contractDoc: {},
    preContractDoc: {},
    newContractDoc: {},
    newInternalRulesDoc: {},
    newPreContractDoc: {},
    countries: [],
    states: [],
    company: null,
    companies: []
  };

  editingPromiseResolve = () => {};

  columns = [
    {
      name: 'index',
      label: 'Index',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>{tableMeta.rowIndex}</React.Fragment>
        )
      }
    },
    {
      name: 'updatedAt',
      label: 'Created at',
      options: {
        filter: true
      }
    },
    {
      name: 'Actions',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            <Tooltip title="View Data">
              <IconButton
                onClick={() => this.viewHistoryInformation(value, tableMeta)}
              >
                <Visibility color="secondary" />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )
      }
    }
  ];

  componentDidMount() {
    const {
      staff,
      getAllContractTypeByState,
      getAllLegalCategoryTypeByCompany,
      getAllStaffContractHistoryByContract,
      getAllContractModel
    } = this.props;
    getAllContractTypeByState(staff.contractTypeStateId);
    getAllLegalCategoryTypeByCompany(staff.companyId);
    getAllStaffContractHistoryByContract(staff.staffContractId);
    getAllContractModel();
    FinancialCompanyService.getCompany().then(({ data }) => {
      this.setState({ companies: data });
    });
    CountryService.getCountries().then(({ data }) => {
      this.setState({ countries: data });
      StateCountryService.getStatesByCountry(staff.contractTypeCountryId).then(
        response => {
          this.setState(
            {
              hiringCountryName: staff.hiringCountry,
              hiringStateName: staff.contractTypeState,
              states: response.data.payload
            },
            () => {
              this.setInitialData();
            }
          );
        }
      );
    });
  }

  setInitialData = () => {
    const { staff } = this.props;
    const { countries, states, companies } = this.state;
    const hiringCountry = countries.filter(
      country => country.countryName === staff.hiringCountry
    )[0];
    const hiringState = states.filter(
      state => state.stateCountryId === staff.contractTypeStateId
    )[0];
    const company = companies.filter(
      cmp => cmp.financialCompanyId === staff.companyId
    )[0];
    const staffContract = {
      contractType: staff.contractTypeId,
      legalCategoryType: staff.legalCategoryTypeId,
      contractModel: staff.contractModelId,
      associateOffice: staff.associateOffice,
      hiringCountry,
      hiringCountryName: staff.hiringCountry,
      hiringState,
      hiringStateName: staff.contractTypeState,
      company,
      townContract: staff.townContract,
      personalNumber: staff.personalNumber,
      highDate: new Date(staff.highDate),
      //  lowDate: new Date(staff.lowDate),
      registrationDate: new Date(staff.registrationDate),
      preContractDate: new Date(staff.preContractDate),
      internalRulesDoc: staff.internalRulesDoc,
      contractDoc: staff.contractDoc,
      preContractDoc: staff.preContractDoc,
      newInternalRulesDoc: {},
      newContractDoc: {},
      newPreContractDoc: {}
    };
    if (staff.lowDate !== '') {
      staffContract.lowDate = new Date(staff.lowDate);
    }
    this.setState({
      ...staffContract,
      isEditData: false,
      isViewHistory: false
    });
  };

  handleDownload = () => {
    const { staff } = this.props;
    const {
      documentType,
      contractDoc,
      internalRulesDoc,
      preContractDoc
    } = this.state;
    let doc = null;
    let docName = null;
    if (documentType === 'contract') {
      doc = contractDoc;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_Contract`;
    } else if (documentType === 'internalRules') {
      doc = internalRulesDoc;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_Internal-Rules`;
    } else if (documentType === 'preContract') {
      doc = preContractDoc;
      docName = `${staff.firstName}-${staff.fatherFamilyName}-${
        staff.motherFamilyName
      }_PreContract`;
    }

    const documentBase64 = this.fileToBase64(doc);
    const documentBlob = new Blob([documentBase64], {
      type: 'application/pdf'
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(documentBlob);
    link.download = docName;
    link.click();
  };

  handleDialogClose = () => {
    this.setState({
      isOpenDocument: false
    });
  };

  handleOpenDialog = documentType => {
    this.setState({
      isOpenDocument: true,
      documentType
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

  renderFile = () => {
    const {
      documentType,
      contractDoc,
      internalRulesDoc,
      preContractDoc
    } = this.state;
    switch (documentType) {
      case 'contract':
        return `data:application/pdf;base64,${contractDoc}`;
      case 'internalRules':
        return `data:application/pdf;base64,${internalRulesDoc}`;
      case 'preContract':
        return `data:application/pdf;base64,${preContractDoc}`;
      default:
        return '';
    }
  };

  restoreData = () => {
    const { staff } = this.props;
    const { states } = this.state;
    this.setState({
      contractType: staff.contractTypeId,
      legalCategoryType: staff.legalCategoryTypeId,
      associateOffice: staff.associateOffice,
      contractModel: staff.contractModelId,
      hiringCountryName: staff.hiringCountry,
      // hiringState: staff.contractTypeState,
      hiringStateName: staff.contractTypeState,
      townContract: staff.townContract,
      personalNumber: staff.personalNumber,
      highDate: new Date(staff.highDate),
     // lowDate: new Date(staff.lowDate),
      registrationDate: new Date(staff.registrationDate),
      preContractDate: new Date(staff.preContractDate),
      internalRulesDoc: staff.internalRulesDoc,
      contractDoc: staff.contractDoc,
      preContractDoc: staff.preContractDoc,
      isEditData: false,
      isViewHistory: false,
      newContractDoc: {},
      newInternalRulesDoc: {},
      newPreContractDoc: {}
    });
    const hiringState = states.filter(
      state => state.stateCountryId === staff.contractTypeStateId
    )[0];
    this.setState({
      hiringState
    });
    if (staff.lowDate === '' || staff.lowDate === null) {
      this.setState({ lowDate: null });
    } else {
      this.setState({ lowDate: new Date(staff.lowDate) });
    }
  };

  handleOpenEdit = () => {
    this.setState({
      isEditData: true
    });
  };

  handleCancel = () => {
    this.restoreData();
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
    const { getAllContractTypeByState } = this.props;
    this.setState({ hiringState: value });
    getAllContractTypeByState(value.stateCountryId);
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleChangeCompany = (ev, value) => {
    const { getAllLegalCategoryTypeByCompany } = this.props;
    getAllLegalCategoryTypeByCompany(value.financialCompanyId);
    this.setState({
      company: value
    });
  };

  handleDateValue = (value, name) => {
    this.setState({
      [name]: value
    });
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

  handleContractDocChange = () => {
    const lastDot = inputContractDoc.current.files[0].name.lastIndexOf('.');
    const ext = inputContractDoc.current.files[0].name
      .substring(lastDot + 1)
      .toLowerCase();
    if (ext === 'pdf') {
      this.setState({
        newContractDoc: inputContractDoc.current.files[0]
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
        newInternalRulesDoc: inputInternalRulesDoc.current.files[0]
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
        newPreContractDoc: inputPreContractDoc.current.files[0]
      });
    }
  };

  viewHistoryInformation = (value, tableMeta) => {
    const { allStaffContractHistoryByContract } = this.props;
    const index = tableMeta.rowIndex;
    const data = allStaffContractHistoryByContract[index];
    this.setState({
      contractType: data.contractTypeId,
      legalCategoryType: data.legalCategoryTypeId,
      contractModel: data.contractModelId,
      associateOffice: data.associateOffice,
      hiringCountryName: data.hiringCountry,
      hiringState: data.contractTypeState,
      hiringStateName: data.contractTypeState,
      townContract: data.townContract,
      personalNumber: data.personalNumber,
      highDate: new Date(data.highDate),
      // lowDate: new Date(data.lowDate),
      registrationDate: new Date(data.registrationDate),
      preContractDate: new Date(data.preContractDate),
      internalRulesDoc: data.internalRulesDoc,
      contractDoc: data.contractDoc,
      preContractDoc: data.preContractDoc,
      isViewHistory: true
    });
    if (data.lowDate === '' || data.lowDate === null) {
      this.setState({ lowDate: null });
    } else {
      this.setState({ lowDate: new Date(data.lowDate) });
    }
  };

  handleUpdate = () => {
    const {
      staff,
      updateStaffContract,
      setStaff,
      getAllStaffContractHistoryByContract
    } = this.props;
    const {
      associateOffice,
      hiringCountry,
      townContract,
      personalNumber,
      contractType,
      legalCategoryType,
      contractModel,
      highDate,
      lowDate,
      registrationDate,
      preContractDate,
      newInternalRulesDoc,
      newContractDoc,
      newPreContractDoc,
      company
    } = this.state;
    const contract = {
      staffContractId: staff.staffContractId,
      companyId: company.financialCompanyId,
      associateOffice,
      hiringCountry: hiringCountry.countryName,
      townContract,
      personalNumber,
      highDate: highDate.toISOString().slice(0, 10),
      // lowDate: lowDate.toISOString().slice(0, 10),
      registrationDate: registrationDate.toISOString().slice(0, 10),
      preContractDate: preContractDate.toISOString().slice(0, 10),
      contractTypeId: contractType,
      legalCategoryTypeId: legalCategoryType,
      contractModelId: contractModel,
      updatedAt: new Date().toISOString().slice(0, 10)
    };
    if (lowDate === '' || lowDate === null) {
      contract.lowDate = '';
    } else {
      contract.lowDate = lowDate.toISOString().slice(0, 10);
    }

    const formData = new FormData();
    Object.keys(contract).forEach(e => formData.append(e, contract[e]));
    if (newContractDoc.constructor === File) {
      formData.append('contractDoc', newContractDoc);
    } else {
      formData.append(
        'contractDoc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    }
    if (newInternalRulesDoc.constructor === File) {
      formData.append('internalRulesDoc', newInternalRulesDoc);
    } else {
      formData.append(
        'internalRulesDoc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    }
    if (newPreContractDoc.constructor === File) {
      formData.append('preContractDoc', newPreContractDoc);
    } else {
      formData.append(
        'preContractDoc',
        new Blob([JSON.stringify({})], {
          type: 'application/json'
        })
      );
    }

    const promise = new Promise(resolve => {
      // get client information
      updateStaffContract(formData);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllStaff();
        getAllStaffContractHistoryByContract(staff.staffContractId);
        StaffService.getStaffById(staff.staffId).then(({ data }) => {
          setStaff(data);
          this.setInitialData();
        });
      } else {
        notification('danger', result);
      }
    });

    /* StaffContractService.updateStaffContract(
      id,
      contractData,
      contractType,
      legalCategoryType
    ).then(({ data }) => {
      const staffContract = {
        contractType: data.contractType._id,
        legalCategoryType: data.legalCategoryType.legalCategoryTypeId,
        associateOffice: data.associateOffice,
        hiringCountry: data.hiringCountry,
        hiringState: data.contractType.state.stateName,
        townContract: data.townContract,
        personalNumber: data.personalNumber,
        highDate: new Date(data.highDate),
        lowDate: new Date(data.lowDate),
        registrationDate: new Date(data.registrationDate),
        preContractDate: new Date(data.preContractDate),
        internalRulesDoc: data.internalRulesDoc,
        contractDoc: data.contractDoc,
        preContractDoc: data.preContractDoc
      };
      history.push({ staffContractHistory: data });
      this.setState({
        ...staffContract,
        isEditData: false,
        history,
        newContractDoc: {},
        newInternalRulesDoc: {},
        newPreContractDoc: {},
        hiringCountry: hiringCountry.countryName
      });
    }); */
  };

  render() {
    const {
      staff,
      classes,
      allContractTypeByState,
      allLegalCategoryTypeByCompany,
      allStaffContractHistoryByContract,
      allContractModel,
      isLoadingStaffContract,
      staffContractResponse,
      errorStaffContract,
      logedUser
    } = this.props;
    const {
      isOpenDocument,
      pageNumber,
      isEditData,
      isViewHistory,
      countries,
      states,
      associateOffice,
      hiringCountry,
      hiringCountryName,
      hiringState,
      hiringStateName,
      townContract,
      personalNumber,
      highDate,
      lowDate,
      registrationDate,
      preContractDate,
      contractType,
      legalCategoryType,
      contractModel,
      contractDoc,
      preContractDoc,
      internalRulesDoc,
      newContractDoc,
      newPreContractDoc,
      newInternalRulesDoc,
      company,
      companies
    } = this.state;
    const thelogedUser = JSON.parse(logedUser);
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.hh_staff_personalInformationManagement_export) {
      exportButton = true;
    }
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 3,
      download: exportButton,
      print: exportButton,
      rowsPerPageOptions: [3]
    };
    !isLoadingStaffContract
      && staffContractResponse
      && this.editingPromiseResolve(staffContractResponse);
    !isLoadingStaffContract
      && !staffContractResponse
      && this.editingPromiseResolve(errorStaffContract);
    return (
      <div>
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
            <Document
              file={this.renderFile()}
              onLoadSuccess={this.onDocumentLoadSuccess}
              onLoadError={console.error}
            >
              <Page pageNumber={pageNumber} />
            </Document>
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
            General Information :
          </Typography>
          {!isEditData ? (
            <div>
              <Tooltip title="Return">
                <Button
                  name="restore"
                  style={{ backgroundColor: 'transparent' }}
                  disableRipple
                  endIcon={<SettingsBackupRestoreIcon />}
                  onClick={this.restoreData}
                  disabled={!isViewHistory}
                />
              </Tooltip>
              {thelogedUser.userRoles[0].actionsNames.hh_staff_contractInformationManagement_modify
                ? (
                  <Tooltip title="Edit">
                    <Button
                      name="personalInformation"
                      style={{ backgroundColor: 'transparent' }}
                      disableRipple
                      endIcon={<EditIcon />}
                      onClick={this.handleOpenEdit}
                    />
                  </Tooltip>
                ) : null}
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
                marginTop: 20
              }}
            >
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-desktop" />
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
                    {'Associate Office :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    {associateOffice}
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
                    {'Town Contract :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    {townContract}
                  </Typography>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 20
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
                    {'Hiring Country :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    {hiringCountryName}
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
                    {'Hiring State :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    {hiringStateName}
                  </Typography>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 20
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
                    {'Employee Number :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    {personalNumber}
                  </Typography>
                </div>
              </div>
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-contract" />
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
                    {'Contract Model :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    {staff.contractModelName}
                  </Typography>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 20
              }}
            >
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-contract" />
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
                    {'Contract Type :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    {staff.contractTypeName}
                  </Typography>
                </div>
              </div>
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-contract" />
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
                    {'Legal category type :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    {staff.legalCategoryTypeName}
                  </Typography>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 20
              }}
            >
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
                    {'High Date :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    {highDate.toISOString().slice(0, 10)}
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
                    {'Low Date :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    { (lowDate === null || lowDate === '' || lowDate === 'Invalid Date') ? (lowDate) : (
                      lowDate.toISOString().slice(0, 10))
                    }
                  </Typography>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 20
              }}
            >
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
                    {'Registration Date :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    {registrationDate.toISOString().slice(0, 10)}
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
                    {'PreContract Date :  '}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={
                      isViewHistory
                        ? classes.historyTypography
                        : classes.normalTypography
                    }
                  >
                    {preContractDate.toISOString().slice(0, 10)}
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
                marginTop: 20
              }}
              color="secondary"
            >
              Document :
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 20
              }}
            >
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-document" />
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
                    {'Contract :  '}
                  </Typography>
                  {contractDoc ? (
                    <Button
                      variant="subtitle1"
                      className={
                        isViewHistory
                          ? classes.historyButtonLink
                          : classes.buttonLink
                      }
                      onClick={() => this.handleOpenDialog('contract', 'pdf')}
                    >
                      {`${staff.firstName}-${staff.fatherFamilyName}-${
                        staff.motherFamilyName
                      }_Contract`}
                    </Button>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-document" />
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
                    {'Internal Rules :  '}
                  </Typography>
                  {internalRulesDoc ? (
                    <Button
                      variant="subtitle1"
                      className={
                        isViewHistory
                          ? classes.historyButtonLink
                          : classes.buttonLink
                      }
                      onClick={() => this.handleOpenDialog('internalRules', 'pdf')
                      }
                    >
                      {`${staff.firstName}-${staff.fatherFamilyName}-${
                        staff.motherFamilyName
                      }_Internal-Rules`}
                    </Button>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'Left',
                width: '100%',
                marginTop: 20
              }}
            >
              <div className={classes.divInline}>
                <Avatar>
                  <Ionicon icon="md-document" />
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
                    {'PreContract :  '}
                  </Typography>
                  {preContractDoc ? (
                    <Button
                      variant="subtitle1"
                      className={
                        isViewHistory
                          ? classes.historyButtonLink
                          : classes.buttonLink
                      }
                      onClick={() => this.handleOpenDialog('preContract', 'pdf')
                      }
                    >
                      {`${staff.firstName}-${staff.fatherFamilyName}-${
                        staff.motherFamilyName
                      }_PreContract`}
                    </Button>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
            <MUIDataTable
              title=""
              data={allStaffContractHistoryByContract}
              columns={this.columns}
              options={options}
            />
          </div>
        ) : (
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
                      !newContractDoc
                        ? classes.uploadAvatarEmpty
                        : newContractDoc.constructor === Object
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
                  <IconButton
                    className={
                      !newInternalRulesDoc
                        ? classes.uploadAvatarEmpty
                        : newInternalRulesDoc.constructor === Object
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
                      !newPreContractDoc
                        ? classes.uploadAvatarEmpty
                        : newPreContractDoc.constructor === Object
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
                    <TextField
                      id="outlined-basic"
                      label="Employee Number"
                      variant="outlined"
                      name="personalNumber"
                      style={{ width: '30%' }}
                      value={personalNumber}
                      required
                      className={classes.textField}
                      onChange={this.handleChange}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Town contract"
                      variant="outlined"
                      name="townContract"
                      style={{ width: '30%' }}
                      value={townContract}
                      required
                      className={classes.textField}
                      onChange={this.handleChange}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Associate office"
                      variant="outlined"
                      name="associateOffice"
                      style={{ width: '30%' }}
                      value={associateOffice}
                      required
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
                    <Autocomplete
                      id="combo-box-demo"
                      value={company}
                      options={companies}
                      getOptionLabel={option => (option ? option.name : '')}
                      onChange={this.handleChangeCompany}
                      style={{ width: '30%', marginTop: 7 }}
                      clearOnEscape
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Company"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.divSpace} style={{ width: '100%' }}>
                    <FormControl
                      className={classes.formControl}
                      style={{ width: '30%' }}
                      required
                    >
                      <InputLabel>Contract type</InputLabel>
                      <Select
                        name="contractType"
                        value={contractType}
                        onChange={this.handleChange}
                      >
                        {allContractTypeByState.map(type => (
                          <MenuItem key={type.code} value={type.contractTypeId}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      className={classes.formControl}
                      style={{ width: '30%' }}
                      required
                    >
                      <InputLabel>Contract legal category</InputLabel>
                      <Select
                        name="legalCategoryType"
                        value={legalCategoryType}
                        onChange={this.handleChange}
                      >
                        {allLegalCategoryTypeByCompany.map(type => (
                          <MenuItem
                            key={type.code}
                            value={type.legalCategoryTypeId}
                          >
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      className={classes.formControl}
                      style={{ width: '30%' }}
                      required
                    >
                      <InputLabel>Contract model</InputLabel>
                      <Select
                        name="contractModel"
                        value={contractModel}
                        onChange={this.handleChange}
                      >
                        {allContractModel.map(model => (
                          <MenuItem
                            key={model.code}
                            value={model.contractModelId}
                          >
                            {model.name}
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
                        inputProps={{ readOnly: true }}
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
                        inputProps={{ readOnly: true }}
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
                        inputProps={{ readOnly: true }}
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
                        inputProps={{ readOnly: true }}
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
                <Grid item xs={12} md={8}>
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
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allContractTypeByState: state.getIn(['contractTypes']).allContractTypeByState,
  allLegalCategoryTypeByCompany: state.getIn(['legalCategoryTypes'])
    .allLegalCategoryTypeByCompany,
  allStaffContractHistoryByContract: state.getIn(['staffContractHistories'])
    .allStaffContractHistoryByContract,
  allContractModel: state.getIn(['contractModels']).allContractModel,
  staff: state.getIn(['staffs']).selectedStaff,
  staffContractResponse: state.getIn(['staffContracts']).staffContractResponse,
  isLoadingStaffContract: state.getIn(['staffContracts']).isLoading,
  errorStaffContract: state.getIn(['staffContracts']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAllStaff,
    setStaff,
    getAllContractTypeByState,
    getAllLegalCategoryTypeByCompany,
    getAllStaffContractHistoryByContract,
    getAllContractModel,
    updateStaffContract
  },
  dispatch
);

const StaffProfileContractInformationMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffProfileContractInformation);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <StaffProfileContractInformationMapped
      changeTheme={changeTheme}
      classes={classes}
    />
  );
};
