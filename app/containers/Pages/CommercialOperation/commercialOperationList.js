import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DetailsIcon from '@material-ui/icons/Details';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import Grid from '@material-ui/core/Grid';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  withStyles,
  Chip,
  Avatar,
  Divider,
  Typography,
  InputLabel,
  Select, MenuItem
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import LibraryBooks from '@material-ui/core/SvgIcon/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import PapperBlock from '../../../components/PapperBlock/PapperBlock';
import StepperIndex from '../../../components/Stepper/StepperIndex';
import {
  addClientCommercial, deleteClient, getAllClient, updateClient
} from '../../../redux/client/actions';
import { getAllStateByCountry } from '../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../redux/city/actions';
import styles from '../Clients/clients-jss';
import { getAllCommercialOperation } from '../../../redux/commercialOperation/actions';
import AddContact from '../Contact/addContact';
import { ThemeContext } from '../../App/ThemeWrapper';
/* createMuiTheme({
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        overflowX: 'auto'
      },
    },
  },
}); */
let legalAreaContacts = [];
let procurementDepartmentContacts = [];
let qualificationProcessContacts = [];
const useStyles = makeStyles();
class commercialOperationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: [],
      oprationName: '',
      openPopUp: false,
      columns: [
        {
          label: 'Operation Code',
          name: 'code',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'name',
          label: 'Operation Name',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'planned Date Q',
          name: 'plannedDateQ',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Country',
          name: 'countryName',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'Client',
          name: 'clientName',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'primary sector',
          name: 'sector1',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'second sector',
          name: 'sector2',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          label: 'third sector',
          name: 'sector3',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'serviceTypeName',
          label: 'Service Type',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
          }
        },
        {
          name: 'devise',
          label: 'devise',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'estimatedTradeVolume',
          label: 'Estimated T.V',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        {
          name: 'estimatedTradeVolumeInEuro',
          label: 'Estimated T.V in Euros',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        /*        {
          name: 'commercialResponsible',
          label: 'Commercial Responsible',
          options: {
            filter: true,
            sort: true,
          }
        }, */
        {
          name: 'stateName',
          label: 'status',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            })
          }
        },
        /*      {
          name: 'contactDtos',
          label: 'contacts',
          options: {
            filter: true,
            sort: true,
            setCellProps: () => ({
              style: {
                whiteSpace: "nowrap",
                position: "sticky",
                left: "0",
                background: "white",
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: "nowrap",
                position: "sticky",
                left: 0,
                background: "white",
                zIndex: 101
              }
            })
          }
        }, */

        {
          name: 'contactDtos',
          label: 'contacts',
          options: {
            customBodyRender: (value, data) => (
              <React.Fragment>
                <IconButton onClick={() => this.showContacts(value, data)}>
                  <VisibilityIcon color="secondary" />
                </IconButton>
              </React.Fragment>
            )
          }
        },

        {
          name: '',
          options: {
            filter: false,
            sort: false,
            empty: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: () => (
              <div>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <IconButton onClick={() => this.handleProgress()}>
                      <VisibilityIcon color="secondary" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton onClick={() => this.handleDetails()}>
                      <DetailsIcon color="secondary" />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            )
          }
        },
      ],
      viewDetails: false,
      viewProgress: false,
      contactOtherContactList: [],
      contactCloseToDecisionMaker: '',
      contactTechnicalLeader: '',
      legalAreaContactsList: [],
      procurementDepartmentContactList: [],
      contactDecisionMaker: ''
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllClient, getAllCommercialOperation, changeTheme } = this.props;
    changeTheme('redTheme');
    getAllClient(); getAllCommercialOperation();
  }

  showContacts= (data, aaa) => {
    this.setState({ openPopUp: true });
    this.setState({ oprationName: aaa.rowData[1] });
    this.setState({ contactOtherContactList: [] });
    this.setState({ procurementDepartmentContactList: [] });
    this.setState({ legalAreaContactsList: [] });
    this.setState({ contactDecisionMaker: '' });
    this.setState({ contactCloseToDecisionMaker: '' });
    this.setState({ contactTechnicalLeader: '' });
    procurementDepartmentContacts = [];
    legalAreaContacts = [];
    qualificationProcessContacts = [];
    for (const cle in data) {
      console.log(data[cle]);
      if (data[cle].supplierType === 'decision - maker' && data[cle].suppliersArea === 'Suppliers Area') {
        this.setState({ contactDecisionMaker: data[cle].firstName + ' ' + data[cle].fatherFamilyName });
      }
      if (data[cle].supplierType === 'Other contact' && data[cle].suppliersArea === 'Suppliers Area') {
        qualificationProcessContacts.push(data[cle].firstName + ' ' + data[cle].fatherFamilyName);
        this.setState({ contactOtherContactList: qualificationProcessContacts });
      }
      if (data[cle].supplierType === 'close to the decision - maker') {
        this.setState({ contactCloseToDecisionMaker: data[cle].firstName + ' ' + data[cle].fatherFamilyName });
      }
      if (data[cle].supplierType === 'technical leader') {
        this.setState({ contactTechnicalLeader: data[cle].firstName + ' ' + data[cle].fatherFamilyName });
      }
      if (data[cle].suppliersArea === 'Procurement Department Contacts' && data[cle].supplierType === 'Other contact') {
        procurementDepartmentContacts.push(data[cle].firstName + ' ' + data[cle].fatherFamilyName);
        this.setState({ procurementDepartmentContactList: procurementDepartmentContacts });
      }
      if (data[cle].suppliersArea === 'Legal Area Contact' && data[cle].supplierType === 'Other contact') {
        legalAreaContacts.push(data[cle].firstName + ' ' + data[cle].fatherFamilyName);
        this.setState({ legalAreaContactsList: legalAreaContacts });
      }
    }
  }

  handleDetails = () => {
    this.setState({ viewDetails: true });
  }

  handleProgress = () => {
    this.setState({ viewProgress: true });
  }

  handleClose = () => {
    this.setState({ viewProgress: false });
  };

  handleSubmit = () => {
    this.setState({ viewProgress: false });
  }

  handleClose= () => {
    this.setState({ openPopUp: false });
  }

  render() {
    const {
      viewProgress, openPopUp, oprationName, contactOtherContactList, contactCloseToDecisionMaker, contactTechnicalLeader, legalAreaContactsList, procurementDepartmentContactList, contactDecisionMaker
    } = this.state;
    const {
      allClients, allCommercialOperations, logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    const title = brand.name + ' - Commercial Operations';
    const description = brand.desc;
    const { data, columns } = this.state;
    const options = {
      fixedHeader: true,
      fixedSelectColumn: false,
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allCommercialOperations}
          url="/app/gestion-commercial/Add-Operation"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.commercial_commercialOperation_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.commercial_commercialOperation_export}
          tooltip="add new Operation"
        />
      )
    };

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
        <PapperBlock title="Commercial Operations" desc="The List of operations" icon="ios-pricetags-outline" noMargin overflowX>
          <div>
            <MUIDataTable title="" data={allCommercialOperations} columns={columns} options={options} />
            <Dialog
              open={viewProgress}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              fullWidth="lg"
              maxWidth="lg"
            >
              <DialogTitle id="alert-dialog-slide-title"> Operation Progress</DialogTitle>
              <DialogContent>
                <StepperIndex />
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={this.handleClose}>
                        Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                >
                      save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </PapperBlock>
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
           Contact assigned to operation
            <span style={{ color: 'blue' }}>
              {' '}
              {oprationName}
            </span>
          </DialogTitle>
          <DialogContent dividers>
            <Grid
              container
              spacing={4}
              direction="row"
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
                {contactDecisionMaker != '' ? (
                  <div style={{ display: 'flex' }}>
                  decision macker  &nbsp;
                    <span style={{ color: 'blue' }}>{contactDecisionMaker}</span>
                  </div>
                ) : ''
                }
                {contactTechnicalLeader != '' ? (
                  <div style={{ display: 'flex' }}>
                    technical leader  &nbsp;
                    <span style={{ color: 'blue' }}>{contactTechnicalLeader}</span>
                  </div>
                ) : ''
                }
                {contactCloseToDecisionMaker != '' ? (
                  <div style={{ display: 'flex' }}>
                    close to the decision macker &nbsp;
                    <span style={{ color: 'blue' }}>
                      {' '}
                      {contactCloseToDecisionMaker}
                    </span>
                  </div>
                ) : ''
                }
                {contactOtherContactList.map(contact => (
                  <div style={{ display: 'flex' }}>
                      contact 1 &nbsp;
                    <span style={{ color: 'blue' }}>{contact}</span>
                  </div>
                ))}
                {(contactDecisionMaker == '' && contactCloseToDecisionMaker == '' && contactOtherContactList.length == 0) ? <span style={{ color: 'blue' }}>no contact assigned !</span> : ''}
                <br />
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
                {procurementDepartmentContactList.map(contact => (
                  <div style={{ display: 'flex' }}>
                      contact 1 &nbsp;
                    <span style={{ color: 'blue' }}>{contact}</span>
                  </div>
                ))}
                {(procurementDepartmentContactList.length == 0) ? <span style={{ color: 'blue' }}>no contact assigned !</span> : '' }
                <br />
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
                {legalAreaContactsList.map(contact => (
                  <div style={{ display: 'flex' }}>
                    contact 1 &nbsp;
                    <span style={{ color: 'blue' }}>{contact}</span>
                  </div>
                ))}
                {(legalAreaContactsList.length == 0) ? <span style={{ color: 'blue' }}>no contact assigned !</span> : '' }
                <br />
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

commercialOperationList.propTypes = {
  classes: PropTypes.object.isRequired,
  // add: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  addClientCommercial: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  getAllClient: PropTypes.func.isRequired,
  allClients: PropTypes.array.isRequired,
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
  // commercialOperation
  allCommercialOperations: state.getIn(['commercialOperation']).allCommercialOperations,
  commercialOperationResponse: state.getIn(['commercialOperation']).commercialOperationResponse,
  isLoadingCommercialOperation: state.getIn(['commercialOperation']).isLoading,
  errorsCommercialOperation: state.getIn(['commercialOperation']).errors,

  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addClientCommercial,
  updateClient,
  deleteClient,
  getAllClient,
  getAllStateByCountry,
  getAllCityByState,
  getAllCommercialOperation
}, dispatch);


const CommercialOperationListMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(commercialOperationList);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <CommercialOperationListMapped changeTheme={changeTheme} classes={classes} />;
};
