import 'date-fns';
import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography, withStyles
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { isString } from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormLabel from '@material-ui/core/FormLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import Contact from './contact';
import Transition from '../../../components/Transition/transition';
import Converter from '../../../components/CurrencyConverter/Converter';
import history from '../../../utils/history';
import AutoCompleteMultiLine from '../../../components/AutoCompleteMultiline';
import {
  addClientCommercial, deleteClient, getAllClient, updateClient
} from '../../../redux/client/actions';
import { getAllStateByCountry } from '../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../redux/city/actions';
import styles from './operation-jss';
import { getAllCommercialOperationStatus } from '../../../redux/commercialOperationStatus/actions';
import notification from '../../../components/Notification/Notification';
import { addCommercialOperation } from '../../../redux/commercialOperation/actions';
import { getAllCommercialServiceType } from '../../../redux/serviceType/actions';
import { getAllContact } from '../../../redux/contact/actions';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import EditContact from '../Contact/editContact';
import AddContact from '../Contact/addContact';
import { getContactByOperationById } from '../../../redux/contactByOperation/actions';
const qpcListAdd = [];
const pdcListAdd = [];
const lacListAdd = [];
var contactList = [] ;
var noDupe =[];
class AddCommercialOperation extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.editingPromiseResolveGetStatus = () => {
    };
    this.state = {
      client: '',
      disabled: true,
      statusOperation: {},
      country: '',
      serviceType: '',
      nameOperation: '',
      Description: '',
      descriptionOperation: '',
      plannedDateQ: '',
      commercialFlowQ: '',
      countryName: '',
      // paymentDate: new Date('2014-08-18T21:11:54'),
      paymentDate: new Date(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()),
      documentationDate: new Date(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()),
      contractDate: new Date(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString()),
      estimatedTradeVolume: 0,
      estimatedTradeVolumeInEuro: 0,
      devise: '',
      tradeCurruncy: '',
      contractVolume: 0,
      contractCurruncy: '',
      managementContact: '',
      administrativeContact: '',
      legalAreaMainContact: '',
      commercialResponsible: '',
      commercialResponsibleAssistant: '',
      progress: 0,
      suppliersArea: '',
      decisionMakers: [],
      technicalLeaders: [],
      administrativeContactTechnicalLeader: '',
      closeDecisionMakers: [],

      qpcOthercontacts: [1],
      qpcOthercontact: [],
      qpcListAddOtherOperation: [],

      pdcOthercontacts: [1],
      pdcListAddOtherOperation: [],
      pdcOthercontact: [],

      lacOthercontacts: [1],
      lacListAddOtherOperation: [],
      lacOthercontact: [],

      openPopUp: false,
      /** **** mandatory contact type ******* */
      qualification_process_contacts_decision_maker: false,
      qualification_process_contacts_decision_makerError: false,
      qualification_process_contacts_technical_leader: false,
      qualification_process_contacts_technical_leaderError: false,
      qualification_process_contacts_close_decision_maker: false,
      qualification_process_contacts_close_decision_makerError: false,
      qualification_process_other_contactError: false,
      procurement_department_other_contactError: false,
      legal_area_other_contactErrorError: false,
      qualification_process_other_contact: false,

      procurement_department_other_contact: false,

      legal_area_other_contact: false,
      /** **** mandatory attributes ******* */
      qualification_process_contacts_decision_maker_first_name: false,
      qualification_process_contacts_decision_maker_father_family_name: false,
      qualification_process_contacts_decision_maker_mother_family_name: false,
      qualification_process_contacts_decision_maker_department: false,
      qualification_process_contacts_decision_maker_position: false,
      qualification_process_contacts_decision_maker_company_fix_phone: false,
      qualification_process_contacts_decision_maker_company_mobile_phone: false,
      qualification_process_contacts_decision_maker_company_email: false,
      qualification_process_contacts_decision_maker_personal_mobile_phone: false,
      qualification_process_contacts_decision_maker_personal_email: false,
      qualification_process_contacts_decision_maker_skype: false,
      qualification_process_contacts_decision_maker_full_address: false,
      qualification_process_contacts_decision_maker_post_code: false,
      /** **** mandatory attributes ******* */
      qualification_process_contacts_close_decision_maker_first_name: false,
      qualification_process_contacts_close_decision_maker_father_family_name: false,
      qualification_process_contacts_close_decision_maker_mother_family_name: false,
      qualification_process_contacts_close_decision_maker_department: false,
      qualification_process_contacts_close_decision_maker_position: false,
      qualification_process_contacts_close_decision_maker_company_fix_phone: false,
      qualification_process_contacts_close_decision_maker_company_mobile_phone: false,
      qualification_process_contacts_close_decision_maker_company_email: false,
      qualification_process_contacts_close_decision_maker_personal_mobile_phone: false,
      qualification_process_contacts_close_decision_maker_personal_email: false,
      qualification_process_contacts_close_decision_maker_skype: false,
      qualification_process_contacts_close_decision_maker_full_address: false,
      qualification_process_contacts_close_decision_maker_post_code: false,
      /** **** mandatory attributes ******* */
      qualification_process_contacts_technical_leader_first_name: false,
      qualification_process_contacts_technical_leader_father_family_name: false,
      qualification_process_contacts_technical_leader_mother_family_name: false,
      qualification_process_contacts_technical_leader_department: false,
      qualification_process_contacts_technical_leader_position: false,
      qualification_process_contacts_technical_leader_company_fix_phone: false,
      qualification_process_contacts_technical_leader_company_mobile_phone: false,
      qualification_process_contacts_technical_leader_company_email: false,
      qualification_process_contacts_technical_leader_personal_mobile_phone: false,
      qualification_process_contacts_technical_leader_personal_email: false,
      qualification_process_contacts_technical_leader_skype: false,
      qualification_process_contacts_technical_leader_full_address: false,
      qualification_process_contacts_technical_leader_post_code: false,
      /** **** mandatory attributes ******* */
      qualification_process_contacts_other_first_name: false,
      qualification_process_contacts_other_father_family_name: false,
      qualification_process_contacts_other_mother_family_name: false,
      qualification_process_contacts_other_department: false,
      qualification_process_contacts_other_position: false,
      qualification_process_contacts_other_company_fix_phone: false,
      qualification_process_contacts_other_company_mobile_phone: false,
      qualification_process_contacts_other_company_email: false,
      qualification_process_contacts_other_personal_mobile_phone: false,
      qualification_process_contacts_other_personal_email: false,
      qualification_process_contacts_other_skype: false,
      qualification_process_contacts_other_full_address: false,
      qualification_process_contacts_other_post_code: false,
      /** **** mandatory attributes ******* */
      procurement_department_other_contact_first_name: false,
      procurement_department_other_contact_father_family_name: false,
      procurement_department_other_contact_mother_family_name: false,
      procurement_department_other_contact_department: false,
      procurement_department_other_contact_position: false,
      procurement_department_other_contact_company_fix_phone: false,
      procurement_department_other_contact_company_mobile_phone: false,
      procurement_department_other_contact_company_email: false,
      procurement_department_other_contact_personal_mobile_phone: false,
      procurement_department_other_contact_personal_email: false,
      procurement_department_other_contact_skype: false,
      procurement_department_other_contact_full_address: false,
      procurement_department_other_contact_post_code: false,

      contactsId_DecisionMaker: '',
      contactsId_TechnicalLeader: '',
      contactsId_CloseDecisionMaker: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const {
      getAllClient, getAllCommercialOperationStatus, getAllCommercialServiceType, getAllContact
    } = this.props;
    getAllClient(); getAllCommercialOperationStatus();
    getAllCommercialServiceType();
    getAllClient();
    getAllContact();
  }

  handleOpenDoc3 = () => {
    const { qpcOthercontact, qpcOthercontacts } = this.state;
    if (qpcOthercontact.length > qpcOthercontacts.length) {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newElement = qpcOthercontacts.length + 1;
      // eslint-disable-next-line react/destructuring-assignment
      qpcOthercontacts.push(newElement);
      this.setState({ openDoc: true });
    }
  }

  handleOpenDocpdc = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.pdcOthercontacts.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.pdcOthercontacts.push(newElement);
    this.setState({ openDoc: true });
  }

  handleOpenDoclac = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.lacOthercontacts.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.lacOthercontacts.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeleteConcept = (row) => {
    const { qpcOthercontacts } = this.state;
    const index = qpcListAdd.indexOf(qpcListAdd[row - 1]);
    if (index !== -1) {
      qpcListAdd.splice(index, 1);
    }
    if (qpcOthercontacts.length > 1) {
      const newDocs = qpcOthercontacts.filter(rows => rows !== row);
      this.setState({
        qpcOthercontacts: newDocs
      });
    }
  }

  handleDeleteConceptpdc = (row) => {
    const { pdcOthercontacts } = this.state;
    const index = pdcOthercontacts.indexOf(pdcOthercontacts[row - 1]);
    if (index !== -1) {
      pdcOthercontacts.splice(index, 1);
    }
    if (pdcOthercontacts.length > 1) {
      const newDocs = pdcOthercontacts.filter(rows => rows !== row);
      this.setState({
        pdcOthercontacts: newDocs
      });
    }
  }

  handleDeleteConceptlac = (row) => {
    console.log(row);
    const { lacOthercontacts } = this.state;
    const index = lacListAdd.indexOf(lacListAdd[row - 1]);
    if (index !== -1) {
      lacListAdd.splice(index, 1);
    }
    if (lacOthercontacts.length > 1) {
      const newDocs = lacOthercontacts.filter(rows => rows !== row);
      this.setState({
        lacOthercontacts: newDocs
      });
    }
  }


  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };


  handleChangeStatus = (ev) => {
    const { getContactByOperationById } = this.props;
    this.setState({ [ev.target.name]: (ev.target.value).commercialOperationStatusId });
    this.setState({ disabled: false });
    // console.log(ev.target.value);
    const promise = new Promise((resolve1) => {
      getContactByOperationById(ev.target.value.commercialOperationStatusId);
      this.editingPromiseResolveGetStatus = resolve1;
    });
    promise.then((result) => {
      if (result.length > 0) {
        // notification('danger', result);
        const { allContactByOperations } = this.props;
        // qualification_process_contacts_decision_maker
        this.setState({ qualification_process_contacts_decision_maker: false });
        this.setState({ qualification_process_contacts_technical_leader: false });
        this.setState({ qualification_process_contacts_close_decision_maker: false });
        this.setState({ qualification_process_other_contact: false });
        this.setState({ qualification_process_contacts_decision_maker_first_name: false });
        this.setState({ qualification_process_contacts_decision_maker_father_family_name: false });
        this.setState({ qualification_process_contacts_decision_maker_mother_family_name: false });
        this.setState({ qualification_process_contacts_decision_maker_department: false });
        this.setState({ qualification_process_contacts_decision_maker_position: false });
        this.setState({ qualification_process_contacts_decision_maker_company_fix_phone: false });
        this.setState({ qualification_process_contacts_decision_maker_company_mobile_phone: false });
        this.setState({ qualification_process_contacts_decision_maker_company_email: false });
        this.setState({ qualification_process_contacts_decision_maker_personal_mobile_phone: false });
        this.setState({ qualification_process_contacts_decision_maker_personal_email: false });
        this.setState({ qualification_process_contacts_decision_maker_skype: false });
        this.setState({ qualification_process_contacts_decision_maker_full_address: false });
        this.setState({ qualification_process_contacts_decision_maker_post_code: false });
        // qualification_process_contacts_close_decision_maker
        this.setState({ qualification_process_contacts_close_decision_maker_first_name: false });
        this.setState({ qualification_process_contacts_close_decision_maker_father_family_name: false });
        this.setState({ qualification_process_contacts_close_decision_maker_mother_family_name: false });
        this.setState({ qualification_process_contacts_close_decision_maker_department: false });
        this.setState({ qualification_process_contacts_close_decision_maker_position: false });
        this.setState({ qualification_process_contacts_close_decision_maker_company_fix_phone: false });
        this.setState({ qualification_process_contacts_close_decision_maker_company_mobile_phone: false });
        this.setState({ qualification_process_contacts_close_decision_maker_company_email: false });
        this.setState({ qualification_process_contacts_close_decision_maker_personal_mobile_phone: false });
        this.setState({ qualification_process_contacts_close_decision_maker_personal_email: false });
        this.setState({ qualification_process_contacts_close_decision_maker_skype: false });
        this.setState({ qualification_process_contacts_close_decision_maker_full_address: false });
        this.setState({ qualification_process_contacts_close_decision_maker_post_code: false });
        // qualification_process_contacts_technical_leader
        this.setState({ qualification_process_contacts_technical_leader_first_name: false });
        this.setState({ qualification_process_contacts_technical_leader_father_family_name: false });
        this.setState({ qualification_process_contacts_technical_leader_mother_family_name: false });
        this.setState({ qualification_process_contacts_technical_leader_department: false });
        this.setState({ qualification_process_contacts_technical_leader_position: false });
        this.setState({ qualification_process_contacts_technical_leader_company_fix_phone: false });
        this.setState({ qualification_process_contacts_technical_leader_company_mobile_phone: false });
        this.setState({ qualification_process_contacts_technical_leader_company_email: false });
        this.setState({ qualification_process_contacts_technical_leader_personal_mobile_phone: false });
        this.setState({ qualification_process_contacts_technical_leader_personal_email: false });
        this.setState({ qualification_process_contacts_technical_leader_skype: false });
        this.setState({ qualification_process_contacts_technical_leader_full_address: false });
        this.setState({ qualification_process_contacts_technical_leader_post_code: false });
        // qualification_process_contacts_other
        this.setState({ qualification_process_contacts_other_first_name: false });
        this.setState({ qualification_process_contacts_other_father_family_name: false });
        this.setState({ qualification_process_contacts_other_mother_family_name: false });
        this.setState({ qualification_process_contacts_other_department: false });
        this.setState({ qualification_process_contacts_other_position: false });
        this.setState({ qualification_process_contacts_other_company_fix_phone: false });
        this.setState({ qualification_process_contacts_other_company_mobile_phone: false });
        this.setState({ qualification_process_contacts_other_company_email: false });
        this.setState({ qualification_process_contacts_other_personal_mobile_phone: false });
        this.setState({ qualification_process_contacts_other_personal_email: false });
        this.setState({ qualification_process_contacts_other_skype: false });
        this.setState({ qualification_process_contacts_other_full_address: false });
        this.setState({ qualification_process_contacts_other_post_code: false });
        // procurement_department_other_contact
        this.setState({ procurement_department_other_contact_first_name: false });
        this.setState({ procurement_department_other_contact_father_family_name: false });
        this.setState({ procurement_department_other_contact_mother_family_name: false });
        this.setState({ procurement_department_other_contact_department: false });
        this.setState({ procurement_department_other_contact_position: false });
        this.setState({ procurement_department_other_contact_company_fix_phone: false });
        this.setState({ procurement_department_other_contact_company_mobile_phone: false });
        this.setState({ procurement_department_other_contact_company_email: false });
        this.setState({ procurement_department_other_contact_personal_mobile_phone: false });
        this.setState({ procurement_department_other_contact_personal_email: false });
        this.setState({ procurement_department_other_contact_skype: false });
        this.setState({ procurement_department_other_contact_full_address: false });
        this.setState({ procurement_department_other_contact_post_code: false });
        this.setState({ procurement_department_other_contact: false });
        // legal_area_other_contact
        this.setState({ legal_area_other_contact_first_name: false });
        this.setState({ legal_area_other_contact_father_family_name: false });
        this.setState({ legal_area_other_contact_mother_family_name: false });
        this.setState({ legal_area_other_contact_department: false });
        this.setState({ legal_area_other_contact_position: false });
        this.setState({ legal_area_other_contact_company_fix_phone: false });
        this.setState({ legal_area_other_contact_company_mobile_phone: false });
        this.setState({ legal_area_other_contact_company_email: false });
        this.setState({ legal_area_other_contact_personal_mobile_phone: false });
        this.setState({ legal_area_other_contact_personal_email: false });
        this.setState({ legal_area_other_contact_skype: false });
        this.setState({ legal_area_other_contact_full_address: false });
        this.setState({ legal_area_other_contact_post_code: false });
        this.setState({ legal_area_other_contact: false });


        for (const key in allContactByOperations) {
          if (allContactByOperations[key].contactsType === 'contact of the decision-maker' && allContactByOperations[key].mandatoryAttributes.length > 0 && (ev.target.value).name === allContactByOperations[key].statusName) {
            this.setState({ qualification_process_contacts_decision_maker: true });
            for (const cle in allContactByOperations[key].mandatoryAttributes) {
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'first name') {
                this.setState({ qualification_process_contacts_decision_maker_first_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'father family name') {
                this.setState({ qualification_process_contacts_decision_maker_father_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'mother family name') {
                this.setState({ qualification_process_contacts_decision_maker_mother_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'department') {
                this.setState({ qualification_process_contacts_decision_maker_department: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'position') {
                this.setState({ qualification_process_contacts_decision_maker_position: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyFixPhone') {
                this.setState({ qualification_process_contacts_decision_maker_company_fix_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyMobilePhone') {
                this.setState({ qualification_process_contacts_decision_maker_company_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyEmail') {
                this.setState({ qualification_process_contacts_decision_maker_company_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalMobilePhone') {
                this.setState({ qualification_process_contacts_decision_maker_personal_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalEmail') {
                this.setState({ qualification_process_contacts_decision_maker_personal_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'skype') {
                this.setState({ qualification_process_contacts_decision_maker_skype: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'fullAddress') {
                this.setState({ qualification_process_contacts_decision_maker_full_address: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'postCode') {
                this.setState({ qualification_process_contacts_decision_maker_post_code: true });
              }
            }
          }
          if (allContactByOperations[key].contactsType === 'contact of the technical leader' && allContactByOperations[key].mandatoryAttributes.length > 0 && (ev.target.value).name === allContactByOperations[key].statusName) {
            this.setState({ qualification_process_contacts_technical_leader: true });
            for (const cle in allContactByOperations[key].mandatoryAttributes) {
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'first name') {
                this.setState({ qualification_process_contacts_technical_leader_first_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'father family name') {
                this.setState({ qualification_process_contacts_technical_leader_father_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'mother family name') {
                this.setState({ qualification_process_contacts_technical_leader_mother_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'department') {
                this.setState({ qualification_process_contacts_technical_leader_department: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'position') {
                this.setState({ qualification_process_contacts_technical_leader_position: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyFixPhone') {
                this.setState({ qualification_process_contacts_technical_leader_company_fix_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyMobilePhone') {
                this.setState({ qualification_process_contacts_technical_leader_company_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyEmail') {
                this.setState({ qualification_process_contacts_technical_leader_company_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalMobilePhone') {
                this.setState({ qualification_process_contacts_technical_leader_personal_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalEmail') {
                this.setState({ qualification_process_contacts_technical_leader_personal_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'skype') {
                this.setState({ qualification_process_contacts_technical_leader_skype: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'fullAddress') {
                this.setState({ qualification_process_contacts_technical_leader_full_address: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'postCode') {
                this.setState({ qualification_process_contacts_technical_leader_post_code: true });
              }
            }
          }
          if (allContactByOperations[key].contactsType === 'contact of the person close to the decision-maker' && allContactByOperations[key].mandatoryAttributes.length > 0 && (ev.target.value).name === allContactByOperations[key].statusName) {
            this.setState({ qualification_process_contacts_close_decision_maker: true });
            for (const cle in allContactByOperations[key].mandatoryAttributes) {
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'first name') {
                this.setState({ qualification_process_contacts_close_decision_maker_first_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'father family name') {
                this.setState({ qualification_process_contacts_close_decision_maker_father_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'mother family name') {
                this.setState({ qualification_process_contacts_close_decision_maker_mother_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'department') {
                this.setState({ qualification_process_contacts_close_decision_maker_department: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'position') {
                this.setState({ qualification_process_contacts_close_decision_maker_position: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyFixPhone') {
                this.setState({ qualification_process_contacts_close_decision_maker_company_fix_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyMobilePhone') {
                this.setState({ qualification_process_contacts_close_decision_maker_company_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyEmail') {
                this.setState({ qualification_process_contacts_close_decision_maker_company_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalMobilePhone') {
                this.setState({ qualification_process_contacts_close_decision_maker_personal_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalEmail') {
                this.setState({ qualification_process_contacts_close_decision_maker_personal_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'skype') {
                this.setState({ qualification_process_contacts_close_decision_maker_skype: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'fullAddress') {
                this.setState({ qualification_process_contacts_close_decision_maker_full_address: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'postCode') {
                this.setState({ qualification_process_contacts_close_decision_maker_post_code: true });
              }
            }
          }
          if (allContactByOperations[key].contactsType === 'Other contact 1' && allContactByOperations[key].mandatoryAttributes.length > 0 && (ev.target.value).name === allContactByOperations[key].statusName) {
            this.setState({ qualification_process_other_contact: true });
            for (const cle in allContactByOperations[key].mandatoryAttributes) {
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'first name') {
                this.setState({ qualification_process_contacts_other_first_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'father family name') {
                this.setState({ qualification_process_contacts_other_father_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'mother family name') {
                this.setState({ qualification_process_contacts_other_mother_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'department') {
                this.setState({ qualification_process_contacts_other_department: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'position') {
                this.setState({ qualification_process_contacts_other_position: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyFixPhone') {
                this.setState({ qualification_process_contacts_other_company_fix_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyMobilePhone') {
                this.setState({ qualification_process_contacts_other_company_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyEmail') {
                this.setState({ qualification_process_contacts_other_company_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalMobilePhone') {
                this.setState({ qualification_process_contacts_other_personal_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalEmail') {
                this.setState({ qualification_process_contacts_other_personal_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'skype') {
                this.setState({ qualification_process_contacts_other_skype: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'fullAddress') {
                this.setState({ qualification_process_contacts_other_full_address: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'postCode') {
                this.setState({ qualification_process_contacts_other_post_code: true });
              }
            }
          }
          if (allContactByOperations[key].contactsType === 'pd contact 1' && allContactByOperations[key].mandatoryAttributes.length > 0 && (ev.target.value).name === allContactByOperations[key].statusName) {
            this.setState({ procurement_department_other_contact: true });
            for (const cle in allContactByOperations[key].mandatoryAttributes) {
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'first name') {
                this.setState({ procurement_department_other_contact_first_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'father family name') {
                this.setState({ procurement_department_other_contact_father_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'mother family name') {
                this.setState({ procurement_department_other_contact_mother_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'department') {
                this.setState({ procurement_department_other_contact_department: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'position') {
                this.setState({ procurement_department_other_contact_position: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyFixPhone') {
                this.setState({ procurement_department_other_contact_company_fix_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyMobilePhone') {
                this.setState({ procurement_department_other_contact_company_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyEmail') {
                this.setState({ procurement_department_other_contact_company_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalMobilePhone') {
                this.setState({ procurement_department_other_contact_personal_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalEmail') {
                this.setState({ procurement_department_other_contact_personal_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'skype') {
                this.setState({ procurement_department_other_contact_skype: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'fullAddress') {
                this.setState({ procurement_department_other_contact_full_address: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'postCode') {
                this.setState({ procurement_department_other_contact_post_code: true });
              }
            }
          }
          if (allContactByOperations[key].contactsType === 'la contact 1' && allContactByOperations[key].mandatoryAttributes.length > 0 && (ev.target.value).name === allContactByOperations[key].statusName) {
            this.setState({ legal_area_other_contact: true });
            for (const cle in allContactByOperations[key].mandatoryAttributes) {
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'first name') {
                this.setState({ legal_area_other_contact_first_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'father family name') {
                this.setState({ legal_area_other_contact_father_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'mother family name') {
                this.setState({ legal_area_other_contact_mother_family_name: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'department') {
                this.setState({ legal_area_other_contact_department: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'position') {
                this.setState({ legal_area_other_contact_position: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyFixPhone') {
                this.setState({ legal_area_other_contact_company_fix_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyMobilePhone') {
                this.setState({ legal_area_other_contact_company_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'companyEmail') {
                this.setState({ legal_area_other_contact_company_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalMobilePhone') {
                this.setState({ legal_area_other_contact_personal_mobile_phone: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'personalEmail') {
                this.setState({ legal_area_other_contact_personal_email: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'skype') {
                this.setState({ legal_area_other_contact_skype: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'fullAddress') {
                this.setState({ legal_area_other_contact_full_address: true });
              }
              if (allContactByOperations[key].mandatoryAttributes[cle] === 'postCode') {
                this.setState({ legal_area_other_contact_post_code: true });
              }
            }
          }
        }
      } else {

      }
    });
  };

  LAChandleChangeOtheter= (ev) => {
    console.log(ev.target.name);
    this.setState({ [ev.target.name]: ev.target.value });
    this.setState({ legal_area_other_contactError: false });
    // console.log(ev.target.value);
    /* lacListAdd.push(ev.target.value);
    lacListAdd = Object.keys(lacListAdd.reduce((p, c) => (p[c] = true, p), {}));
    this.setState({ lacListAddOtherOperation: lacListAdd });
    console.log('lac : ', lacListAdd); */
  };

  QPChandleChangeOtheter= (ev) => {
    console.log(ev.target.name);
    this.setState({ [ev.target.name]: ev.target.value });
    this.setState({ qualification_process_other_contactError: false });
    /* qpcListAdd.push(ev.target.value);
    qpcListAdd = Object.keys(qpcListAdd.reduce((p, c) => (p[c] = true, p), {}));
    this.setState({ qpcListAddOtherOperation: qpcListAdd });
    console.log('qpc : ', qpcListAdd); */
  };

  PDChandleChangeOtheter= (ev) => {
    console.log(ev.target.name);
    this.setState({ [ev.target.name]: ev.target.value });
    this.setState({ procurement_department_other_contactError: false });
    /* pdcListAdd.push(ev.target.value);
    pdcListAdd = Object.keys(pdcListAdd.reduce((p, c) => (p[c] = true, p), {}));
    this.setState({ pdcListAddOtherOperation: pdcListAdd });
    console.log('pdc : ', pdcListAdd); */
  };


  handleChangeMaker = (ev) => {
    this.setState({ positionDecisionMaker: 'decision - maker' });
    this.setState({ [ev.target.name]: ev.target.value });
    this.setState({ qualification_process_contacts_decision_makerError: false });
  };

  handleChangeTechnicalLeader = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
    this.setState({ qualification_process_contacts_technical_leaderError: false });
  };

  handleChangeCloseDecisionMaker= (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
    this.setState({ qualification_process_contacts_close_decision_makerError: false });
  };

  handleChangeClient = (ev) => {
    const { allClients } = this.props;
    this.setState({ [ev.target.name]: ev.target.value });

    for (const key in allClients) {
      if (allClients[key].clientId === ev.target.value) {
        this.setState({ countryName: allClients[key].country });
        break;
      }
    }

    const { allContacts } = this.props;
    const { decisionMakers } = this.state;
    /** ************************* */
    const decisionMakersVar = [];
    for (const key in allContacts) {
      if (allContacts[key].supplierType === 'decision - maker') {
        decisionMakersVar.push(allContacts[key]);
        this.setState({ decisionMakers: decisionMakersVar });
      }
    }
    /** ************************* */
    const technicalLeadersList = [];
    for (const key in allContacts) {
      if (allContacts[key].supplierType === 'technical leader') {
        technicalLeadersList.push(allContacts[key]);
        this.setState({ technicalLeaders: technicalLeadersList });
      }
    }
    /** ************************* */
    const closeDecisionMakersList = [];
    for (const key in allContacts) {
      if (allContacts[key].supplierType === 'close to the decision - maker') {
        closeDecisionMakersList.push(allContacts[key]);
        this.setState({ closeDecisionMakers: closeDecisionMakersList });
      }
    }
    /** ************************* */
    const spcOtherContactList = [];
    for (const key in allContacts) {
      if (allContacts[key].supplierType === 'Other contact' && allContacts[key].suppliersArea === 'Suppliers Area') {
        spcOtherContactList.push(allContacts[key]);
        this.setState({ qpcOthercontact: spcOtherContactList });
      }
    }
    /** ************************* */
    const pdcOtherContactList = [];
    for (const key in allContacts) {
      if (allContacts[key].suppliersArea === 'Procurement Department Contacts') {
        pdcOtherContactList.push(allContacts[key]);
        this.setState({ pdcOthercontact: pdcOtherContactList });
      }
    }
    /** ************************* */
    const lacOtherContactList = [];
    for (const key in allContacts) {
      if (allContacts[key].suppliersArea === 'Legal Area Contact') {
        lacOtherContactList.push(allContacts[key]);
        this.setState({ lacOthercontact: lacOtherContactList });
      }
    }
  };

    handleDocumentationDateChange = documentationDate => {
      this.setState({ documentationDate });
    };

    handlePaymentDateChange = paymentDate => {
      this.setState({ paymentDate });
    };

    handleContactDateChange = contractDate => {
      this.setState({ contractDate });
    };

  handleChangeMultiple = (event, value) => {
    const serviceType = [];
    for (const key in value) {
      serviceType.push(value[key].serviceTypeId);
    }

    this.setState({ serviceTypeId: serviceType });
  };

    handleCreate = () => {
      const {
        contactsId_DecisionMaker, contactsId_TechnicalLeader, contactsId_CloseDecisionMaker, qpcListAddOtherOperation, qualification_process_contacts_decision_maker,
        qualification_process_contacts_technical_leader, qualification_process_contacts_close_decision_maker, qualification_process_other_contact,
        lacListAddOtherOperation, pdcListAddOtherOperation, qpcOthercontacts, pdcOthercontacts, lacOthercontacts,legal_area_other_contact,
        procurement_department_other_contact
      } = this.state;
      contactList =[];
      if (qualification_process_contacts_decision_maker == true && contactsId_DecisionMaker === '') {
        this.setState({ qualification_process_contacts_decision_makerError: true });
        notification('danger', 'contact of decision maker is mandatory');
        return;
      }
      if (qualification_process_contacts_technical_leader == true && contactsId_TechnicalLeader === '') {
        this.setState({ qualification_process_contacts_technical_leaderError: true });
        notification('danger', 'contact of technical leader is mandatory');
        return;
      }
      if (qualification_process_contacts_close_decision_maker == true && contactsId_CloseDecisionMaker === '') {
        this.setState({ qualification_process_contacts_close_decision_makerError: true });
        notification('danger', 'contact of the person close to decision maker is mandatory');
        return;
      }

      var compteur1=0;
      for (const key in qpcOthercontacts) {
        const j = parseInt(key) + 1;
        if(typeof this.state.['administrativeContact' + j] != 'undefined') {
          contactList.push(this.state.['administrativeContact' + j]);
          compteur1=compteur1+1;
        }
      }
      if(compteur1==0 && qualification_process_other_contact==true){
        this.setState({ qualification_process_other_contactError: true });
        notification('danger', 'other contact qualification process contacts');
        return;
      }
      var compteur2=0;
      for (const key in pdcOthercontacts) {
        const j = parseInt(key) + 1;
        if(typeof this.state.['proc_depa_cont' + j] != 'undefined') {
          contactList.push(this.state.['proc_depa_cont' + j]);
          compteur2=compteur2+1;
        }
      }
      if(compteur2==0 && procurement_department_other_contact==true){
        this.setState({ procurement_department_other_contactError: true });
        notification('danger', 'other contact procurement department contacts');
        return;
      }
      var compteur3=0;
      for (const key in lacOthercontacts) {
        const j = parseInt(key) + 1;
        if(typeof this.state.['lega_area_conta' + j] != 'undefined') {
          contactList.push(this.state.['lega_area_conta' + j]);
          compteur3=compteur3+1;
        }
      }
      if(compteur3==0 && legal_area_other_contact==true){
        this.setState({ legal_area_other_contactError: true });
        notification('danger', 'other contact legal area contacts');
        return;
      }
    //  contactList = Object.keys(contactList.reduce((p, c) => (p[c] = true, p), {}));

       noDupe = Array.from(new Set(contactList));

      noDupe.push(contactsId_DecisionMaker);
      noDupe.push(contactsId_TechnicalLeader);
      noDupe.push(contactsId_CloseDecisionMaker);
      // const qpcListAddOtherOperationx = Object.keys(qpcListAddOtherOperation.reduce((p, c) => (p[c] = true, p), {}));
      // this.setState({ qpcListAddOtherOperation: qpcListAddOtherOperationx });
      const { addCommercialOperation } = this.props;
      const {
        client,
        nameOperation,
        statusOperation,
        descriptionOperation,
        serviceTypeId,
        plannedDateQ,
        commercialFlowQ,
        paymentDate,
        documentationDate,
        contractDate,
        amount,
        estimatedTradeVolume,
        devise,
        estimatedTradeVolumeInEuro

      } = this.state;
      const operation = {
        clientId: client,
        name: nameOperation,
        stateId: statusOperation,
        description: descriptionOperation,
        serviceTypeId,
        plannedDateQ,
        commercialFlowQ,
        paymentDate,
        documentationDate,
        contractDate,
        amount,
        estimatedTradeVolume,
        devise,
        estimatedTradeVolumeInEuro,
        contactsIds: noDupe
      };
      // console.log(qpcListAddOtherOperationx);return;
      /** */
      const promise = new Promise((resolve) => {
        addCommercialOperation(operation);
        this.editingPromiseResolve = resolve;
      });
      promise.then((result) => {
        if (isString(result)) {
          console.log(result);
          notification('success', result);
          getAllClient();
        } else {
          notification('danger', result);
        }
      });
      // history.push('/app/gestion-commercial/Commercial-Operations');
    }

  handleGoBack = () => {
    history.push('/app/gestion-commercial/Commercial-Operations');
  }

  handleOpen = (suppliersArea, supplierType) => {
    this.setState({ suppliersArea });
    this.setState({ supplierType });
    this.setState({ openPopUp: true });
    // mandatory attributes
    const {
      qualification_process_contacts_decision_maker_first_name,
      qualification_process_contacts_decision_maker_father_family_name,
      qualification_process_contacts_decision_maker_mother_family_name,
      qualification_process_contacts_decision_maker_department,
      qualification_process_contacts_decision_maker_position,
      qualification_process_contacts_decision_maker_company_fix_phone,
      qualification_process_contacts_decision_maker_company_mobile_phone,
      qualification_process_contacts_decision_maker_company_email,
      qualification_process_contacts_decision_maker_personal_mobile_phone,
      qualification_process_contacts_decision_maker_personal_email,
      qualification_process_contacts_decision_maker_skype,
      qualification_process_contacts_decision_maker_full_address,
      qualification_process_contacts_decision_maker_post_code
    } = this.state;

    if (suppliersArea === 'Suppliers Area' && supplierType === 'decision - maker') {
      this.setState({
        first_name: qualification_process_contacts_decision_maker_first_name,
        father_family_name: qualification_process_contacts_decision_maker_father_family_name,
        mother_family_name: qualification_process_contacts_decision_maker_mother_family_name,
        _department: qualification_process_contacts_decision_maker_department,
        _position: qualification_process_contacts_decision_maker_position,
        company_fix_phone: qualification_process_contacts_decision_maker_company_fix_phone,
        company_mobile_phone: qualification_process_contacts_decision_maker_company_mobile_phone,
        company_email: qualification_process_contacts_decision_maker_company_email,
        personal_mobile_phone: qualification_process_contacts_decision_maker_personal_mobile_phone,
        personal_email: qualification_process_contacts_decision_maker_personal_email,
        _skype: qualification_process_contacts_decision_maker_skype,
        full_address: qualification_process_contacts_decision_maker_full_address,
        post_code: qualification_process_contacts_decision_maker_post_code
      });
    }
    if (suppliersArea === 'Suppliers Area' && supplierType === 'technical leader') {
      const {
        qualification_process_contacts_technical_leader_first_name,
        qualification_process_contacts_technical_leader_father_family_name,
        qualification_process_contacts_technical_leader_mother_family_name,
        qualification_process_contacts_technical_leader_department,
        qualification_process_contacts_technical_leader_position,
        qualification_process_contacts_technical_leader_company_fix_phone,
        qualification_process_contacts_technical_leader_company_mobile_phone,
        qualification_process_contacts_technical_leader_company_email,
        qualification_process_contacts_technical_leader_personal_mobile_phone,
        qualification_process_contacts_technical_leader_personal_email,
        qualification_process_contacts_technical_leader_skype,
        qualification_process_contacts_technical_leader_full_address,
        qualification_process_contacts_technical_leader_post_code,
      } = this.state;
      this.setState({
        first_name: qualification_process_contacts_technical_leader_first_name,
        father_family_name: qualification_process_contacts_technical_leader_father_family_name,
        mother_family_name: qualification_process_contacts_technical_leader_mother_family_name,
        _department: qualification_process_contacts_technical_leader_department,
        _position: qualification_process_contacts_technical_leader_position,
        company_fix_phone: qualification_process_contacts_technical_leader_company_fix_phone,
        company_mobile_phone: qualification_process_contacts_technical_leader_company_mobile_phone,
        company_email: qualification_process_contacts_technical_leader_company_email,
        personal_mobile_phone: qualification_process_contacts_technical_leader_personal_mobile_phone,
        personal_email: qualification_process_contacts_technical_leader_personal_email,
        _skype: qualification_process_contacts_technical_leader_skype,
        full_address: qualification_process_contacts_technical_leader_full_address,
        post_code: qualification_process_contacts_technical_leader_post_code
      });
    }

    if (suppliersArea === 'Suppliers Area' && supplierType === 'close to the decision - maker') {
      const {
        qualification_process_contacts_close_decision_maker_first_name,
        qualification_process_contacts_close_decision_maker_father_family_name,
        qualification_process_contacts_close_decision_maker_mother_family_name,
        qualification_process_contacts_close_decision_maker_department,
        qualification_process_contacts_close_decision_maker_position,
        qualification_process_contacts_close_decision_maker_company_fix_phone,
        qualification_process_contacts_close_decision_maker_company_mobile_phone,
        qualification_process_contacts_close_decision_maker_company_email,
        qualification_process_contacts_close_decision_maker_personal_mobile_phone,
        qualification_process_contacts_close_decision_maker_personal_email,
        qualification_process_contacts_close_decision_maker_skype,
        qualification_process_contacts_close_decision_maker_full_address,
        qualification_process_contacts_close_decision_maker_post_code,
      } = this.state;
      this.setState({
        first_name: qualification_process_contacts_close_decision_maker_first_name,
        father_family_name: qualification_process_contacts_close_decision_maker_father_family_name,
        mother_family_name: qualification_process_contacts_close_decision_maker_mother_family_name,
        _department: qualification_process_contacts_close_decision_maker_department,
        _position: qualification_process_contacts_close_decision_maker_position,
        company_fix_phone: qualification_process_contacts_close_decision_maker_company_fix_phone,
        company_mobile_phone: qualification_process_contacts_close_decision_maker_company_mobile_phone,
        company_email: qualification_process_contacts_close_decision_maker_company_email,
        personal_mobile_phone: qualification_process_contacts_close_decision_maker_personal_mobile_phone,
        personal_email: qualification_process_contacts_close_decision_maker_personal_email,
        _skype: qualification_process_contacts_close_decision_maker_skype,
        full_address: qualification_process_contacts_close_decision_maker_full_address,
        post_code: qualification_process_contacts_close_decision_maker_post_code
      });
    }

    if (suppliersArea === 'Suppliers Area' && supplierType === 'Other contact') {
      const {
        qualification_process_contacts_other_first_name,
        qualification_process_contacts_other_father_family_name,
        qualification_process_contacts_other_mother_family_name,
        qualification_process_contacts_other_department,
        qualification_process_contacts_other_position,
        qualification_process_contacts_other_company_fix_phone,
        qualification_process_contacts_other_company_mobile_phone,
        qualification_process_contacts_other_company_email,
        qualification_process_contacts_other_personal_mobile_phone,
        qualification_process_contacts_other_personal_email,
        qualification_process_contacts_other_skype,
        qualification_process_contacts_other_full_address,
        qualification_process_contacts_other_post_code
      } = this.state;

      this.setState({
        first_name: qualification_process_contacts_other_first_name,
        father_family_name: qualification_process_contacts_other_father_family_name,
        mother_family_name: qualification_process_contacts_other_mother_family_name,
        _department: qualification_process_contacts_other_department,
        _position: qualification_process_contacts_other_position,
        company_fix_phone: qualification_process_contacts_other_company_fix_phone,
        company_mobile_phone: qualification_process_contacts_other_company_mobile_phone,
        company_email: qualification_process_contacts_other_company_email,
        personal_mobile_phone: qualification_process_contacts_other_personal_mobile_phone,
        personal_email: qualification_process_contacts_other_personal_email,
        _skype: qualification_process_contacts_other_skype,
        full_address: qualification_process_contacts_other_full_address,
        post_code: qualification_process_contacts_other_post_code
      });
    }

    if (suppliersArea === 'Procurement Department Contacts' && supplierType === 'Other contact') {
      const {
        procurement_department_other_contact_first_name,
        procurement_department_other_contact_father_family_name,
        procurement_department_other_contact_mother_family_name,
        procurement_department_other_contact_department,
        procurement_department_other_contact_position,
        procurement_department_other_contact_company_fix_phone,
        procurement_department_other_contact_company_mobile_phone,
        procurement_department_other_contact_company_email,
        procurement_department_other_contact_personal_mobile_phone,
        procurement_department_other_contact_personal_email,
        procurement_department_other_contact_skype,
        procurement_department_other_contact_full_address,
        procurement_department_other_contact_post_code
      } = this.state;
      this.setState({
        first_name: procurement_department_other_contact_first_name,
        father_family_name: procurement_department_other_contact_father_family_name,
        mother_family_name: procurement_department_other_contact_mother_family_name,
        _department: procurement_department_other_contact_department,
        _position: procurement_department_other_contact_position,
        company_fix_phone: procurement_department_other_contact_company_fix_phone,
        company_mobile_phone: procurement_department_other_contact_company_mobile_phone,
        company_email: procurement_department_other_contact_company_email,
        personal_mobile_phone: procurement_department_other_contact_personal_mobile_phone,
        personal_email: procurement_department_other_contact_personal_email,
        _skype: procurement_department_other_contact_skype,
        full_address: procurement_department_other_contact_full_address,
        post_code: procurement_department_other_contact_post_code
      });
    }

    if (suppliersArea === 'Legal Area Contact' && supplierType === 'Other contact') {
      const {
        legal_area_other_contact_first_name,
        legal_area_other_contact_father_family_name,
        legal_area_other_contact_mother_family_name,
        legal_area_other_contact_department,
        legal_area_other_contact_position,
        legal_area_other_contact_company_fix_phone,
        legal_area_other_contact_company_mobile_phone,
        legal_area_other_contact_company_email,
        legal_area_other_contact_personal_mobile_phone,
        legal_area_other_contact_personal_email,
        legal_area_other_contact_skype,
        legal_area_other_contact_full_address,
        legal_area_other_contact_post_code
      } = this.state;
      this.setState({
        first_name: legal_area_other_contact_first_name,
        father_family_name: legal_area_other_contact_father_family_name,
        mother_family_name: legal_area_other_contact_mother_family_name,
        _department: legal_area_other_contact_department,
        _position: legal_area_other_contact_position,
        company_fix_phone: legal_area_other_contact_company_fix_phone,
        company_mobile_phone: legal_area_other_contact_company_mobile_phone,
        company_email: legal_area_other_contact_company_email,
        personal_mobile_phone: legal_area_other_contact_personal_mobile_phone,
        personal_email: legal_area_other_contact_personal_email,
        _skype: legal_area_other_contact_skype,
        full_address: legal_area_other_contact_full_address,
        post_code: legal_area_other_contact_post_code
      });
    }
  }

  handleCloseContact = () => {
    this.setState({ openPopUp: false });
  }

  myCallback = (estimatedTradeVolume, devise, estimatedTradeVolumeInEuro) => {
    this.setState({ estimatedTradeVolume });
    this.setState({ devise });
    this.setState({ estimatedTradeVolumeInEuro });
    console.log(estimatedTradeVolume);
    console.log(devise);
    console.log(estimatedTradeVolumeInEuro);
  }

  render() {
    const contracts = [
      {
        value: '1',
        label: 'Q1-2020',
      },
      {
        value: '2',
        label: 'Q2-2020',
      },
      {
        value: '3',
        label: 'Q3-2020',
      },
      {
        value: '4',
        label: 'Q4-2020',
      },
      {
        value: '5',
        label: 'Q1-2021',
      },
      {
        value: '6',
        label: 'Q2-2021',
      },
      {
        value: '7',
        label: 'Q3-2021',
      },
      {
        value: '8',
        label: 'Q4-2021',
      },
    ];


    const {
      client, statusOperation, countryName, serviceType,
      nameOperation, descriptionOperation, plannedDateQ,
      commercialFlowQ, documentationDate, paymentDate,
      contractDate, estimatedTradeVolume, contractVolume,
      managementContact, administrativeContact, legalAreaMainContact, contactsId_DecisionMaker, contactsId_TechnicalLeader, contactsId_CloseDecisionMaker,
      commercialResponsible, commercialResponsibleAssistant,
      suppliersArea, supplierType, disabled,
      qualification_process_contacts_decision_maker, qualification_process_contacts_decision_makerError,
      qualification_process_contacts_technical_leader, qualification_process_contacts_technical_leaderError,
      qualification_process_contacts_close_decision_maker, qualification_process_contacts_close_decision_makerError,
      qualification_process_other_contact, qualification_process_other_contactError,procurement_department_other_contactError,legal_area_other_contactError,
      procurement_department_other_contact,
      legal_area_other_contact,
      decisionMakers, technicalLeaders, closeDecisionMakers, qpcOthercontacts, qpcOthercontact, pdcOthercontacts, pdcOthercontact,
      lacOthercontacts, lacOthercontact, openPopUp,

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
      post_code
    } = this.state;

    const title = brand.name + ' - Blank Page';
    const description = brand.desc;
    const {
      // eslint-disable-next-line no-shadow
      classes, allClients, allCommercialOperationStatuss, errorsCommercialOperation, isLoadingCommercialOperation, commercialOperationResponse, allCommercialServiceType,
      isLoadingContactByOperation, contactByOperationResponse, errorsContactByOperation, allContactByOperations

    } = this.props;
    (!isLoadingCommercialOperation && commercialOperationResponse) && this.editingPromiseResolve(commercialOperationResponse);
    (!isLoadingCommercialOperation && !commercialOperationResponse) && this.editingPromiseResolve(errorsCommercialOperation);
    // ContactByOperations
    if (contactByOperationResponse != '' && !isLoadingContactByOperation) {
      this.editingPromiseResolveGetStatus(contactByOperationResponse);
    }
    /* (!isLoadingContactByOperation && contactByOperationResponse) && this.editingPromiseResolveGetStatus(contactByOperationResponse);
    (!isLoadingContactByOperation && !contactByOperationResponse) && this.editingPromiseResolveGetStatus(errorsContactByOperation); */
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
        <PapperBlock title="Commercial Operation" desc="Create new commercial operation process" icon="ios-add-circle-outline">
          <Grid container spacing={1}>
            <Grid item xs={11} />
            <Grid item xs={1}>
              <IconButton onClick={() => this.handleGoBack()}>
                <KeyboardBackspaceIcon color="secondary" />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="subtitle2" component="h2" color="primary">
              Location Of The Commercial Operation
          </Typography>
          <br />
          <div>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="space-around"
            >
              <Grid item xs={12} md={4} sm={4} style={{ display: 'flex' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '10%' }} component="h2" color="primary">
                    Client
                </Typography>
                <FormControl fullWidth required style={{ width: '90%' }}>
                  <InputLabel>Select the client</InputLabel>
                  <Select
                    name="client"
                    value={client}
                    onChange={this.handleChangeClient}
                  >
                    {
                      allClients.map((clt) => (
                        <MenuItem key={clt.clientId} value={clt.clientId}>
                          {clt.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5} sm={5} style={{ display: 'flex' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '15%' }} component="h2" color="primary">
                    Operation
                </Typography>
                <TextField
                  style={{ width: '85%' }}
                  id="nameOperation"
                  label="Operation Name"
                  name="nameOperation"
                  value={nameOperation}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={3} sm={3} style={{ display: 'flex' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '15%' }} component="h2" color="primary">
                    Status
                </Typography>
                <FormControl fullWidth required style={{ width: '90%' }}>
                  <InputLabel>Select the status</InputLabel>
                  <Select
                    name="statusOperation"
                    /* value={statusOperation.commercialOperationStatusId} */
                    onChange={this.handleChangeStatus}
                    defaultValue=""
                  >
                    {
                      allCommercialOperationStatuss && allCommercialOperationStatuss.map((clt) => (
                        <MenuItem key={clt.commercialOperationStatusId} value={clt} defaultValue="">
                          {clt.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12} sm={12} style={{ display: 'flex' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '15%' }} component="h2" color="primary">
                    Commercial Activity Type
                </Typography>
                <div style={{ width: '85%' }}>
                  <Autocomplete
                    multiple
                    fullWidth
                    className="auto-complete-multiline"
                    options={allCommercialServiceType}
                    getOptionLabel={(option) => option.name}
                    onChange={this.handleChangeMultiple}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Service Type" />
                    )}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6} sm={6} style={{ display: 'flex' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '15%' }} component="h2" color="primary">
                    Country
                </Typography>
                <TextField
                  style={{ width: '85%' }}
                  id="country"
                  label="Country Name"
                  name="countryName"
                  value={countryName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6} sm={6} style={{ display: 'flex' }} alignContent="center" alignItems="center">
                <Typography variant="subtitle2" style={{ width: '15%' }} component="h2" color="primary">
                    Description
                </Typography>
                <TextField
                  style={{ width: '85%' }}
                  id="descriptionOperation"
                  label="Description"
                  name="descriptionOperation"
                  value={descriptionOperation}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
              Dates Of Operation Interest
          </Typography>
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid item xs={12} md={6} sm={6} style={{ display: 'flex' }} alignContent="center" alignItems="center">
              <Typography variant="subtitle2" style={{ width: '20%' }} component="h2" color="primary">
                  Q Planned Date
              </Typography>
              <FormControl fullWidth required style={{ width: '80%' }}>
                <InputLabel>Select Q Planned Date </InputLabel>
                <Select
                  name="plannedDateQ"
                  value={plannedDateQ}
                  onChange={this.handleChange}
                >
                  {
                    contracts.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sm={6} style={{ display: 'flex' }} alignContent="center" alignItems="center">
              <Typography variant="subtitle2" style={{ width: '20%' }} component="h2" color="primary">
                  Q Commercial Flow
              </Typography>
              <FormControl style={{ width: '80%' }} fullWidth required>
                <InputLabel>Select Q commercial follow</InputLabel>
                <Select
                  name="commercialFlowQ"
                  value={commercialFlowQ}
                  onChange={this.handleChange}
                >
                  {
                    contracts.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Documentation Date *"
                    value={documentationDate}
                    name="documentationDate"
                    onChange={this.handleDocumentationDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="contract Date*"
                    value={contractDate}
                    onChange={this.handleContactDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="P.O Date *"
                    value={paymentDate}
                    onChange={this.handlePaymentDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
              Economic Value Of The Operation
          </Typography>
          <br />
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid>
              <Converter Title="Estimated Trade Volume " callbackFromParent={this.myCallback} />
            </Grid>
            <Grid>
              <Converter Title="Contract Volume " />
            </Grid>
          </Grid>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
              Suppliers Area
          </Typography>
          <br />
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={4}
              sm={4}
            >
              <Typography variant="subtitle2" component="h2" color="primary">
                  Qualification Process Contacts
              </Typography>
              <div style={{ display: 'flex' }}>
                <FormControl fullWidth required={qualification_process_contacts_decision_maker} disabled={disabled} error={qualification_process_contacts_decision_makerError}>
                  <InputLabel>contact of the the decision - maker</InputLabel>
                  <Select
                    name="contactsId_DecisionMaker"
                    id="contact of the decision - maker"
                    value={contactsId_DecisionMaker && contactsId_DecisionMaker}
                    onChange={this.handleChangeMaker}
                  >
                    {
                      decisionMakers && decisionMakers.map((type) => (
                        <MenuItem key={type.contactId} value={type.contactId}>
                          {type.firstName}
                          {' '}
                          {type.fatherFamilyName}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Suppliers Area', 'decision - maker')}>
                  <AddIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex' }}>
                <FormControl fullWidth required={qualification_process_contacts_technical_leader} disabled={disabled} error={qualification_process_contacts_technical_leaderError}>
                  <InputLabel>contact the technical leader</InputLabel>
                  <Select
                    name="contactsId_TechnicalLeader"
                    value={contactsId_TechnicalLeader && contactsId_TechnicalLeader}
                    onChange={this.handleChangeTechnicalLeader}
                  >
                    {
                      technicalLeaders && technicalLeaders.map((type) => (
                        <MenuItem key={type.contactId} value={type.contactId}>
                          {type.firstName}
                          {' '}
                          {type.fatherFamilyName}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Suppliers Area', 'technical leader')}>
                  <AddIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex' }}>
                <FormControl fullWidth required={qualification_process_contacts_close_decision_maker} disabled={disabled} error={qualification_process_contacts_close_decision_makerError}>
                  <InputLabel>contact of the person close to the decision - maker</InputLabel>
                  <Select
                    name="contactsId_CloseDecisionMaker"
                    value={contactsId_CloseDecisionMaker && contactsId_CloseDecisionMaker}
                    onChange={this.handleChangeCloseDecisionMaker}
                    defaultValue=""
                  >
                    {
                      closeDecisionMakers && closeDecisionMakers.map((type) => (
                        <MenuItem key={type.contactId} value={type.contactId}>
                          {type.firstName}
                          {' '}
                          {type.fatherFamilyName}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={() => this.handleOpen('Suppliers Area', 'close to the decision - maker')}>
                  <AddIcon />
                </IconButton>
              </div>
              {qpcOthercontacts.map((row) => (
                <div style={{ display: 'flex' }}>
                  <FormControl fullWidth disabled={disabled} required={qualification_process_other_contact} error={qualification_process_other_contactError}>
                    <InputLabel>Other Contact 1</InputLabel>
                    <Select
                      name={'administrativeContact' + row}
                      value={administrativeContact[row]}
                      onChange={this.QPChandleChangeOtheter}
                      defaultValue=""
                    >
                      {
                        qpcOthercontact && qpcOthercontact.map((type) => (
                          <MenuItem key={type.contactId} value={type.contactId}>
                            {type.firstName}
                            {' '}
                            {type.fatherFamilyName}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <IconButton size="medium" color="primary" onClick={() => this.handleOpenDoc3()}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => this.handleDeleteConcept(row)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              {/*              <div style={{ width: '85%' }}>
                <Autocomplete
                  multiple
                  fullWidth
                  className="auto-complete-multiline"
                  options={qpcOthercontact}
                  getOptionLabel={(option) => option.firstName + ' ' + option.fatherFamilyName}
                  onChange={this.handleChangeMultiple}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Other Contact" />
                  )}
                />
              </div> */}
              <br />
              <div align="center">
                <Button variant="contained" color="secondary" type="button" disabled={disabled} onClick={() => this.handleOpen('Suppliers Area', 'Other contact')}>
                  Add Other Contact
                </Button>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sm={4}
            >
              <Typography variant="subtitle2" component="h2" color="primary">
                  Procurement Department Contacts
              </Typography>

              <Dialog
                open={openPopUp}
                keepMounted
                scroll="body"
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                fullWidth=""
                maxWidth=""
              >
                <DialogTitle id="alert-dialog-slide-title"> Add contact</DialogTitle>
                <DialogContent dividers>
                  <AddContact
                    handleClose={this.handleClose}
                    theCompany={client}
                    suppliersArea={suppliersArea}
                    supplierType={supplierType}
                    first_name={first_name}
                    father_family_name={father_family_name}
                    mother_family_name={mother_family_name}
                    _department={_department}
                    _position={_position}
                    company_fix_phone={company_fix_phone}
                    company_mobile_phone={company_mobile_phone}
                    company_email={company_email}
                    personal_mobile_phone={personal_mobile_phone}
                    personal_email={personal_email}
                    _skype={_skype}
                    full_address={full_address}
                    post_code={post_code}
                    etat="externe"
                    close={this.handleCloseContact}
                  />
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleCloseContact}>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              {pdcOthercontacts.map((row) => (
                <div style={{ display: 'flex' }}>
                  <FormControl fullWidth disabled={disabled} required={procurement_department_other_contact} error={procurement_department_other_contactError}>
                    <InputLabel>Other Contact 1</InputLabel>
                    <Select
                      name={'proc_depa_cont' + row}
                      value={administrativeContact[row]}
                      onChange={this.PDChandleChangeOtheter}
                      defaultValue=""
                    >
                      {
                        pdcOthercontact && pdcOthercontact.map((type) => (
                          <MenuItem key={type.contactId} value={type.contactId}>
                            {type.firstName}
                            {' '}
                            {type.fatherFamilyName}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <IconButton size="medium" color="primary" onClick={() => this.handleOpenDocpdc()}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => this.handleDeleteConceptpdc(row)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <br />
              <div align="center">
                <Button variant="contained" color="secondary" type="button" disabled={disabled} onClick={() => this.handleOpen('Procurement Department Contacts', 'Other contact')}>
                  Add Other Contact
                </Button>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sm={4}
            >
              <Typography variant="subtitle2" component="h2" color="primary">
                  Legal Area Contact
              </Typography>
              {lacOthercontacts.map((row) => (
                <div style={{ display: 'flex' }}>
                  <FormControl fullWidth disabled={disabled} required={legal_area_other_contact} error={legal_area_other_contactError}>
                    <InputLabel>Other Contact 1</InputLabel>
                    <Select
                      name={'lega_area_conta' + row}
                      value={administrativeContact[row]}
                      onChange={this.LAChandleChangeOtheter}
                      defaultValue=""
                    >
                      {
                        lacOthercontact && lacOthercontact.map((type) => (
                          <MenuItem key={type.contactId} value={type.contactId}>
                            {type.firstName}
                            {' '}
                            {type.fatherFamilyName}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <IconButton size="medium" color="primary" onClick={() => this.handleOpenDoclac()}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => this.handleDeleteConceptlac(row)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
              <br />
              <div align="center">
                <Button variant="contained" color="secondary" type="button" disabled={disabled} onClick={() => this.handleOpen('Legal Area Contact', 'Other contact')}>
                  Add Other Contact
                </Button>
              </div>
            </Grid>
          </Grid>
          <br />
          <br />
          <div align="center">
            <Button variant="contained" color="primary" type="button" onClick={this.handleCreate}>
                Save Operation
            </Button>
          </div>
        </PapperBlock>
      </div>
    );
  }
}

AddCommercialOperation.propTypes = {
  classes: PropTypes.object.isRequired,
  // add: PropTypes.func.isRequired,
  addClientCommercial: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  getAllClient: PropTypes.func.isRequired,
  allClients: PropTypes.array.isRequired,

  getAllCommercialOperationStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  allClients: state.getIn(['clients']).allClients,
  clientResponse: state.getIn(['clients']).clientResponse,
  isLoading: state.getIn(['clients']).isLoading,
  errors: state.getIn(['clients']).errors,

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

  allCommercialOperationStatuss: state.getIn(['commercialOperationStatus']).allCommercialOperationStatuss,

  // commercialOperation
  allCommercialOperations: state.getIn(['commercialOperation']).allCommercialOperations,
  commercialOperationResponse: state.getIn(['commercialOperation']).commercialOperationResponse,
  isLoadingCommercialOperation: state.getIn(['commercialOperation']).isLoading,
  errorsCommercialOperation: state.getIn(['commercialOperation']).errors,

  // service type
  allCommercialServiceType: state.getIn(['commercialServiceType']).allCommercialServiceType,
  // contacts
  allContacts: state.getIn(['contacts']).allContacts,
  contactResponse: state.getIn(['contacts']).contactResponse,
  isLoadingContact: state.getIn(['contacts']).isLoading,
  errorsContact: state.getIn(['contacts']).errors,

  // ContactByOperations
  allContactByOperations: state.getIn(['contactByOperations']).allContactByOperations,
  contactByOperationResponse: state.getIn(['contactByOperations']).contactByOperationResponse,
  isLoadingContactByOperation: state.getIn(['contactByOperations']).isLoading,
  errorsContactByOperation: state.getIn(['contactByOperations']).errors,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addClientCommercial,
  updateClient,
  deleteClient,
  getAllClient,
  getAllStateByCountry,
  getAllCityByState,
  getAllCommercialOperationStatus,
  addCommercialOperation,
  getAllCommercialServiceType,
  getAllContact,
  getContactByOperationById
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommercialOperation));
