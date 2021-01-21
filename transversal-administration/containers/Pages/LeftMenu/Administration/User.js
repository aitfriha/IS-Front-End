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
import notification from '../../../../../app/components/Notification/Notification';
import {
    addUser,
    deleteUser,
    getAllUsers,
    updateUser
} from '../../../../redux/users/actions';
import { getAllRoles } from '../../../../redux/rolesAbilities/actions';
import { getAllDepartments } from '../../../../redux/departments/actions';


const styles = {};

class User extends React.Component {
    constructor(props) {
        super(props);

        const { intl } = props;
        this.editingPromiseResolve = () => {
        };
        this.state = {
            columns: [
                {
                    title: intl.formatMessage({ id: 'user.full_name' }) + '*',
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
                {
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
                },
                {
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
                },
                {
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
                },
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
                    title: intl.formatMessage({ id: 'user.roles' }) + '*',
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
                    title: intl.formatMessage({ id: 'user.is_active' }) + '*',
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
                {
                    title: intl.formatMessage({ id: 'user.status' }),
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
                },
                {
                    title: intl.formatMessage({ id: 'department' }),
                    field: 'userDepartmentId',
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
                },
                {
                    title: intl.formatMessage({ id: 'date.creation_date' }),
                    field: 'userCreatedAt',
                    type: 'date',
                    editable: 'never',
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
                    title: intl.formatMessage({ id: 'date.last_update_date' }),
                    field: 'userUpdatedAt',
                    type: 'date',
                    editable: 'never',
                    cellStyle: {
                        width: 140,
                        maxWidth: 140
                    },
                    headerStyle: {
                        width: 140,
                        maxWidth: 140
                    }
                },
            ]
        };
    }

    componentDidMount() {
        const { getAllUsers, getAllRoles, getAllDepartments } = this.props;
        getAllUsers();
        getAllRoles();
        getAllDepartments();
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
        };*/


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

    render() {
        const {
            location, intl, allUsers, addUser, errors, isLoading, userResponse, getAllUsers, updateUser, deleteUser,
        } = this.props;
        const { columns } = this.state;
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

                    editable={{
                        onRowAdd: newData => new Promise((resolve) => {
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
                        }),
                        onRowUpdate: (newData) => new Promise((resolve) => {
                            // newData.userDepartment = newData.userDepartment.departmentCode;
                            // update User action
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addUser,
    deleteUser,
    getAllUsers,
    updateUser,
    getAllRoles,
    getAllDepartments,
}, dispatch);

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(User)));
