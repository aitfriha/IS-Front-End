import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable, { MTableEditField } from 'material-table';
import { PropTypes } from 'prop-types';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { isEmpty, isString } from 'lodash';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import {
  Avatar,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Divider,
  FormControl, InputLabel,
  TextField,
  Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import AutoComplete from '../../../../../app/components/AutoComplete';
import { getAllDepartments } from '../../../../redux/departments/actions';
import { getAllRoles } from '../../../../redux/rolesAbilities/actions';
import {
  addUser,
  deleteUser,
  getAllUsers,
  updateUser
} from '../../../../redux/users/actions';
import notification from '../../../../../app/components/Notification/Notification';
import { getAllClient } from '../../../../../app/redux/client/actions';
import FinancialCompanyService from '../../../../../app/containers/Services/FinancialCompanyService';
import StaffService from '../../../../../app/containers/Services/StaffService';

const styles = {};

class User extends React.Component {
  constructor(props) {
    super(props);

    const { intl } = props;
    this.editingPromiseResolve = () => {
    };
    this.state = {
      firstName: '',
      fatherFamilyName: '',
      motherFamilyName: '',
      userEmail: '',
      openPopUp: false,
      client: '',
      staff: '',
      companies: [],
      xclients: [],
      actif: false,
      company: '',
      userPassword: '',
      columns: [
        {
          title: 'full name *',
          field: 'userFullName',
          cellStyle: {
            width: 140,
            maxWidth: 140
          },
          headerStyle: {
            width: 140,
            maxWidth: 140
          }
        },
        /*               {
                    title: intl.formatMessage({ id: 'user.company_id' }),
                    field: 'userCompanyId',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                }, */
        /*                {
                    title: intl.formatMessage({ id: 'user.national_id' }),
                    field: 'userNationalId',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                }, */
        /*                {
                    title: intl.formatMessage({ id: 'user.passport_id' }),
                    field: 'userPassportId',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                }, */
        {
          title: intl.formatMessage({ id: 'email' }) + '*',
          field: 'userEmail',
          cellStyle: {
            width: 140,
            maxWidth: 140
          },
          headerStyle: {
            width: 140,
            maxWidth: 140
          }
        },
        {
          title: intl.formatMessage({ id: 'mobile' }),
          field: 'userMobileNumber',
          /*           cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    } */
        },
        {
          title: 'roles*',
          field: 'userRolesIds',
          render: rowData => rowData && rowData.userRolesIds.join(', '),
          cellStyle: {
            width: 140,
            maxWidth: 140
          },
          headerStyle: {
            width: 140,
            maxWidth: 140
          }
        },
        {
          title: 'is active*',
          field: 'userIsActive',
          lookup: {
            true: 'yes',
            false: 'no',
          },
          cellStyle: {
            width: 140,
            maxWidth: 140
          },
          headerStyle: {
            width: 140,
            maxWidth: 140
          }
        },
        /*        {
          title: 'status',
          field: 'userStatus',
          lookup: {
            online: 'online',
            offline: 'offline',
          },
                     cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
        }, */
        {
          title: intl.formatMessage({ id: 'department' }),
          field: 'userDepartmentId',
        /*            cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    } */
        },
        /*                {
                    title: intl.formatMessage({ id: 'user.default_country_language' }) + '*',
                    field: 'userCountryLanguage',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                }, */
        {
          title: 'creation date',
          field: 'userCreatedAt',
          type: 'date',
          editable: 'never',
          /*                cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    } */
        },
        {
          title: 'last update',
          field: 'userUpdatedAt',
          type: 'date',
          editable: 'never',
          /*                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    } */
        },
      ]
    };
  }

  componentDidMount() {
    const {
      getAllUsers, getAllRoles, getAllDepartments, getAllClient
    } = this.props;
    getAllUsers();
    getAllRoles();
    getAllDepartments();
    getAllClient();
    FinancialCompanyService.getCompany().then(result => {
      this.setState({ companies: result.data });
    });
  }

  static getDerivedStateFromProps(props, state) {
    const subjectColumnLookupAdapterRole = (allRoles) => {
      const lookupRole = {};
      allRoles.forEach(m => {
        lookupRole[m.roleName] = m.roleName;
      });

      return lookupRole;
    };
    const subjectColumnLookupAdapterDepartment = (allDepartments) => {
      const lookupDepartment = {};
      allDepartments.forEach(m => {
        lookupDepartment[m.departmentCode] = m.departmentCode;
      });
      return lookupDepartment;
    };
    /* const subjectColumnLookupAdapterLanguage = (languages) => {
            const lookupLanguage = {};
            ['en-US', ...props.systemTranslateLanguages].map(e => (e));
            languages.forEach(e => {
                lookupLanguage[e] = e;
            });
            return lookupLanguage;
        }; */


    if (!isEmpty(props.allRoles) || !isEmpty(props.allDepartments)) {
      state.columns.find(e => e.field === 'userRolesIds').lookup = subjectColumnLookupAdapterRole(props.allRoles);
      state.columns.find(e => e.field === 'userDepartmentId').lookup = subjectColumnLookupAdapterDepartment(props.allDepartments);
      //  state.columns.find(e => e.field === 'userCountryLanguage').lookup = subjectColumnLookupAdapterLanguage(['en-US', ...props.systemTranslateLanguages]);
      return state.columns;
    }
    /* if (!isEmpty(props.allDepartments)) {
            state.columns.find(e => e.field === 'userDepartment').lookup = subjectColumnLookupAdapter2(props.allDepartments);
            return state.columns;
        } */

    // Return null if the state hasn't changed
    return null;
  }

    selectedRows = (rows) => {
      console.log('ffffffffffffffffffffffffffffff');
      this.setState({ openPopUp: true });
      /* const listClientToUpdate = rows.map((row) => row.clientId);
        this.setState({ listClientToUpdate });
        this.setState({ openPopUp: true });
        this.setState({ display: 'none' }); */
    };

    handleCloseDelete= () => {
      this.setState({ openPopUp: false });
    };

  handleChangePassword= (event) => {
    this.setState({ userPassword: event.target.value });
    console.log('xxxxxxxxxxxxxxxxxxxxx');
  };

    handleChangeActif = (event) => {
      const { actif } = this.state;
      this.setState({ actif: !actif });
    };

    handleChangeCompany = (ev) => {
      const { allClients } = this.props;
      this.setState({ [ev.target.name]: ev.target.value });
      StaffService.getAllStaffsByCompany(ev.target.value).then(result => {
        console.log(result.data);
        this.setState({ xclients: result.data });
      });
    }

    handleChangeStaff= (ev) => {
      const { xclients } = this.state;
      this.setState({ [ev.target.name]: ev.target.value });
      for (const key in xclients) {
        if (xclients[key].staffId === ev.target.value) {
          console.log(xclients[key]);
          this.setState({ firstName: xclients[key].firstName });
          this.setState({ fatherFamilyName: xclients[key].fatherFamilyName });
          this.setState({ motherFamilyName: xclients[key].motherFamilyName });
          this.setState({ userEmail: xclients[key].companyEmail });
          break;
        }
      }
    }

  addUser = () => {
    const {
      userEmail, userPassword, firstName, fatherFamilyName, motherFamilyName
    } = this.state;
    const newData = {
      userCompanyId: '37',
      userNationalId: '37',
      userPassportId: '37',
      userEmail: 'aitfriha.zaid@gmail.com',
      userPassword,
      userFullName: firstName + ' ' + fatherFamilyName + ' ' + motherFamilyName,
      userMobileNumber: '3711111',
      userStatus: 'status',
      userCountryLanguage: 'en',
      userIsActive: false,
      userRolesIds: ['ADMIN'],
      userDepartment: '5f0c320c8ebd876a33b2a66e'
    };
    const { addUser, getAllUsers } = this.props;
    new Promise((resolve) => {
      addUser(newData);
      this.editingPromiseResolve = resolve;
    }).then((result) => {
      if (isString(result)) {
        // Fetch data
        getAllUsers();
        notification('success', result);
      } else {
        notification('danger', result);
      }
    });
  }

  render() {
    const {
      location, intl, allUsers, addUser, errors, isLoading, userResponse, getAllUsers, updateUser, deleteUser, allClients
    } = this.props;
    const {
      columns, openPopUp, client, actif, companies, company, xclients, staff, userPassword,
      firstName,
      fatherFamilyName,
      motherFamilyName,
      userEmail,
    } = this.state;
      // Sent resolve to editing promises
    (!isLoading && userResponse) && this.editingPromiseResolve(userResponse);
    (!isLoading && !userResponse) && this.editingPromiseResolve(errors);

    return (
      <div>
        <MaterialTable
          components={{
            EditField: fieldProps => {
              const {
                columnDef: { lookup },
              } = fieldProps;
              if (lookup && fieldProps.columnDef.field === 'userRolesIds') {
                return (


                  <Select
                    multiple
                    value={fieldProps.value ? fieldProps.value : []}
                    onChange={e => fieldProps.onChange(e.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {Object.values(fieldProps.columnDef.lookup).map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>

                );
              }
              return <MTableEditField {...{ ...fieldProps, value: fieldProps.value || '' }} />;
            },
          }}
          title=""
          columns={columns}
          data={allUsers && allUsers}
          options={{
            exportFileName: intl.formatMessage({ id: 'users' }),
            filtering: true,
            grouping: true,
            exportButton: true,
            pageSize: 10,
            actionsCellStyle: {
              paddingLeft: 30,
              width: 140,
              maxWidth: 140,
            },
          }}
          actions={[
            {
              tooltip: 'Add',
              icon: 'person_add',
              onClick: (evt, data) => this.selectedRows(data),
              isFreeAction: true,
            }
          ]}

          editable={{
            /* onRowAdd: newData => new Promise((resolve) => {
                            addUser(newData);
                            this.editingPromiseResolve = resolve;
                        }).then((result) => {
                            if (isString(result)) {
                                // Fetch data
                                getAllUsers();
                                notification('success', result);
                            } else {
                                notification('danger', result);
                            }
                        }), */
            onRowUpdate: (newData) => new Promise((resolve) => {
              // newData.userDepartment = newData.userDepartment.departmentCode;
              // update User action
              console.log(newData);
              return;
              updateUser(newData);
              this.editingPromiseResolve = resolve;
            }).then((result) => {
              if (isString(result)) {
                // Fetch data
                getAllUsers();
                notification('success', result);
              } else {
                notification('danger', result);
              }
            }),
            onRowDelete: oldData => new Promise((resolve) => {
              // delete User action
              deleteUser(oldData.userId);
              this.editingPromiseResolve = resolve;
            }).then((result) => {
              if (isString(result)) {
                // Fetch data
                getAllUsers();
                notification('success', result);
              } else {
                notification('danger', result);
              }
            }),
          }}
        />
        <Dialog
          open={openPopUp}
          keepMounted
          scroll="body"
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth="md"
          maxWidth="md"
        >
          <DialogTitle id="alert-dialog-slide-title"> Add new User </DialogTitle>
          {/*   style={{ textAlign: 'center' }} */}
          <DialogContent dividers>
            <div>
              <FormControl fullWidth="false" required style={{ width: '50%' }}>
                <InputLabel>Select Company Name</InputLabel>
                <Select
                  name="company"
                  value={company}
                  onChange={this.handleChangeCompany}
                >
                  {
                    companies.map((clt) => (
                      <MenuItem key={clt.financialCompanyId} value={clt.financialCompanyId}>
                        {clt.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth="false" required style={{ width: '50%' }}>
                <InputLabel>Select the Staff associated</InputLabel>
                <Select
                  name="staff"
                  value={staff}
                  onChange={this.handleChangeStaff}
                >
                  {
                    xclients.map((clt) => (
                      <MenuItem key={clt.staffId} value={clt.staffId} staff={clt}>
                        {clt.firstName}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
            <Chip
              style={{ marginTop: '9px' }}
              label="Additional information"
              avatar={<Avatar>A</Avatar>}
              color="primary"
            />
            <Divider
              variant="fullWidth"
              style={{ marginBottom: '10px', marginTop: '10px' }}
            />
            <div>
              <FormControl component="fieldset">
                <TextField id="standard-basic" label="first name" value={firstName} />
              </FormControl>
                &nbsp;
              <FormControl component="fieldset">
                <TextField id="standard-basic" label="Father Family Name" value={fatherFamilyName} />
              </FormControl>
                &nbsp;
              <FormControl component="fieldset">
                <TextField id="standard-basic" label="Mother Family Name" value={motherFamilyName} />
              </FormControl>
                &nbsp;
              <FormControl component="fieldset">
                <TextField id="standard-basic" label="User Email" value={userEmail} />
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={actif}
                      onChange={this.handleChangeActif}
                      name="checkedB"
                      color="primary"
                    />
                  )}
                  label="Is Active"
                />
              </FormControl>
            </div>
            <div>
              <FormControl component="fieldset">
                <TextField id="standard-basic" label="password" onChange={this.handleChangePassword} value={userPassword} />
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleCloseDelete}>
                            Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addUser}
            >
                            Add
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}


User.propTypes = {
  /** Location */
  location: PropTypes.object.isRequired,
  /** intl */
  intl: PropTypes.object.isRequired,
  /** Errors */
  errors: PropTypes.object.isRequired,
  /** isLoading */
  isLoading: PropTypes.bool.isRequired,
  /** getAllUsers */
  getAllUsers: PropTypes.func.isRequired,
  /** allUsers */
  allUsers: PropTypes.array.isRequired,
  /** addUser */
  addUser: PropTypes.func.isRequired,
  /** user Response */
  userResponse: PropTypes.string.isRequired,
  /** addUser */
  updateUser: PropTypes.func.isRequired,
  /** deleteUser */
  deleteUser: PropTypes.func.isRequired,
  /** getAllRoles */
  getAllRoles: PropTypes.func.isRequired,
  /** getAllDepartments */
  getAllDepartments: PropTypes.func.isRequired,

};


const mapStateToProps = state => ({
  allUsers: state.getIn(['user']).allUsers,
  userResponse: state.getIn(['user']).userResponse,
  isLoading: state.getIn(['user']).isLoading,
  errors: state.getIn(['user']).errors,
  allRoles: state.getIn(['roles']).allRoles,
  allDepartments: state.getIn(['department']).allDepartments,
  // systemTranslateLanguages: state.getIn(['translateSentences']).systemTranslateLanguages,

  allClients: state.getIn(['clients']).allClients,
  clientResponse: state.getIn(['clients']).clientResponse,
  isLoadingClient: state.getIn(['clients']).isLoading,
  errorsClient: state.getIn(['clients']).errors,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getAllRoles,
  getAllDepartments,
  getAllClient,
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(User)));
