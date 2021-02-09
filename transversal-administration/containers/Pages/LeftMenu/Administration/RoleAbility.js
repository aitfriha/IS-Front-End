import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable from 'material-table';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  isString, uniq, map, find, capitalize, isBoolean, pickBy
} from 'lodash';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import { red, teal } from '@material-ui/core/colors';
import {
  addRole, deleteRole, getAllRoles, updateRole, addRoleAbilities
} from '../../../../redux/rolesAbilities/actions';
import notification from '../../../../../app/components/Notification/Notification';
import { getAllSubjects } from '../../../../redux/subjects/actions';
import { getAllActions } from '../../../../redux/actions/actions';

const styles = (theme) => ({
  gridItemMargin: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },

  parentRow: {
    backgroundColor: '#cfd8dc'
  }

});

class RoleAbility extends React.Component {
  constructor(props) {
    super(props);

    this.editingPromiseResolve = () => {
    };
    this.state = {
      columns: [
        {
          title: 'role*',
          field: 'roleName'
        }, {
          title: 'description',
          field: 'roleDescription'
        },

      ]
    };
  }

  componentDidMount() {
    const { getAllRoles, getAllSubjects, getAllActions } = this.props;
    getAllRoles();
    getAllSubjects();
    getAllActions();
  }

    /**
     * Constructs abilities table columns
     *
     * @param actions
     * @return {{field: string, readonly: boolean, editable: string, title: string, align: string}[]}
     */
    getTableColumnsFromActions = (actions) => [{
      title: 'Subject',
      field: 'subjectCode',
      editable: 'never'
    },
    {
      title: 'Subject Type',
      field: 'subjectType',
      editable: 'never',
      render: rowData => <Chip label={rowData.subjectType} variant="outlined" />
    },
    {
      title: 'Subject Description',
      field: 'subjectDescription',
      editable: 'never'
    }
    ].concat(uniq(map(actions, 'actionCode')).map(actionCode => ({
      title: capitalize(actionCode),
      field: actionCode,
      type: 'boolean',
      editable: (_, rowData) => this.doesThisActionConcernsThisSubject(actions, actionCode, rowData.subjectType),
      render: rowData => (this.doesThisActionConcernsThisSubject(actions, actionCode, rowData.subjectType) ? rowData[actionCode] ? <Icon style={{ color: teal[500] }}>check</Icon> : <Icon style={{ color: red[500] }}>close</Icon> : '')

    })));

    /**
     * Checks if an action concerns a subject
     *
     * @param actions
     * @param actionCode
     * @param subjectType
     * @return {boolean}
     */
    doesThisActionConcernsThisSubject = (actions, actionCode, subjectType) => !!find(actions, {
      actionConcerns: subjectType,
      actionCode
    });


    /**
     * Construct abilities table rows
     *
     * @param subjects
     * @return {*}
     */
    getTableRowsFromSubjectsAndActions = (subjects) => subjects.map(subject => ({
      subjectId: subject.subjectId,
      subjectCode: subject.subjectCode,
      subjectParentId: subject.subjectParent && subject.subjectParent.subjectId,
      subjectType: subject.subjectType,
      subjectDescription: subject.subjectDescription,
      read: false,
      update: false,
      access: false,
      export: false
    }));


    /**
     * Get color based on suject type
     *
     * @param param
     * @return {string}
     */
    getSubjectTypeRowColor = (param) => {
      switch (param) {
        case 'module':
          return '#4fc3f7';
        case 'sub-module':
          return '#81d4fa';
        case 'form':
          return '#b3e5fc';
        case 'table':
          return '#b3e5fc';
        default:
          return '#e1f5fe';
      }
    };

    render() {
      const {
        classes, location, allRoles, addRole, errors, isLoading, roleResponse, getAllRoles, updateRole, deleteRole, allActions, allSubjects, addRoleAbilities
      } = this.props;

      const { columns } = this.state;
      // Sent resolve to editing promises
      (!isLoading && roleResponse) && this.editingPromiseResolve(roleResponse);
      (!isLoading && !roleResponse) && this.editingPromiseResolve(errors);
      return (
        <div>
          <MaterialTable
            title=""
            columns={columns}
            data={allRoles && allRoles}
            options={{
              filtering: true,
              grouping: true,
              exportButton: true,
              pageSize: 10,
              actionsCellStyle: {
                paddingLeft: 30,
                width: 120,
                maxWidth: 120,
              },
            }}

            editable={{
              onRowAdd: newData => new Promise((resolve) => {
                // add Role*
                newData.roleName = newData.roleName.toUpperCase();
                addRole(newData);

                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllRoles();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              }),
              onRowUpdate: (newData) => new Promise((resolve) => {
                // update Role
                newData.roleName = newData.roleName.toUpperCase();
                updateRole(newData);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllRoles();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              }),
              onRowDelete: oldData => new Promise((resolve) => {
                // delete Role
                console.log(oldData.roleId);
                deleteRole(oldData.roleId);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllRoles();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              }),
            }}
            detailPanel={rowData => (

              <Grid container direction="column">
                <Grid className={classes.gridItemMargin} item xs>

                  <MaterialTable
                    columns={this.getTableColumnsFromActions(allActions)}
                    data={this.getTableRowsFromSubjectsAndActions(allSubjects)}
                    parentChildData={(row, rows) => rows.find(a => a.subjectId === row.subjectParentId)}
                    options={{
                      showTitle: false,
                      paging: false,
                      grouping: false,
                      sorting: false,
                      draggable: false,
                      defaultExpanded: true,
                      rowStyle: rowData => ({
                        backgroundColor: this.getSubjectTypeRowColor(rowData.subjectType)
                      }),
                      headerStyle: {
                        backgroundColor: '#cfd8dc',
                      },
                    }}
                    style={{
                      boxShadow: 'none',
                      borderColor: '#000'
                    }}
                    editable={{
                      onRowUpdate: (newData) => new Promise((resolve) => {
                        // case of add ability for the first time

                        let abilityRequest = { };
                        if (!newData.abilityId) {
                          /*
                                                looping on the newData ability actions
                                                get from each ability the action code & the subject code from their values
                                                */
                          abilityRequest = {
                            ...{ roleId: rowData.roleId },
                            roleAbilities: map(pickBy(newData, isBoolean), (value, key) => ({ actionCode: key, actionCodeValue: value })).filter(action => find(allActions, {
                              actionCode: action.actionCode,
                              actionConcerns: newData.subjectType
                            }) !== undefined
                            ).map(action => ({
                              abilityActionId: find(allActions, {
                                actionCode: action.actionCode,
                                actionConcerns: newData.subjectType
                              }).actionId,
                              abilitySubjectId: newData.subjectId,
                              abilityValue: action.actionCodeValue
                            })
                            )
                          };

                          console.log(abilityRequest);
                          addRoleAbilities(abilityRequest);
                        }
                        resolve();
                      })
                    }}

                    localization={{
                      header: {
                        actions: ''
                      }
                    }}
                  />

                </Grid>
              </Grid>

            )
            }
          />
        </div>
      );
    }
}


RoleAbility.propTypes = {
  /** Classes */
  classes: PropTypes.object.isRequired,
  /** Location */
  location: PropTypes.object.isRequired,
  /** Errors */
  errors: PropTypes.object.isRequired,
  /** isLoading */
  isLoading: PropTypes.bool.isRequired,
  /** getAllRoles */
  getAllRoles: PropTypes.func.isRequired,
  /** allRoles */
  allRoles: PropTypes.array.isRequired,
  /** allSubjects */
  allSubjects: PropTypes.array.isRequired,
  /** allActions */
  allActions: PropTypes.array.isRequired,
  /** addRole */
  addRole: PropTypes.func.isRequired,
  /** Role Response */
  roleResponse: PropTypes.string.isRequired,
  /** addRole */
  updateRole: PropTypes.func.isRequired,
  /** deleteRole */
  deleteRole: PropTypes.func.isRequired,
  /** getAllSubjects */
  getAllSubjects: PropTypes.func.isRequired,
  /** getAllActions */
  getAllActions: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  allSubjects: state.getIn(['subject']).allSubjects,
  allActions: state.getIn(['action']).allActions,
  allRoles: state.getIn(['roles']).allRoles,
  roleResponse: state.getIn(['roles']).roleResponse,
  isLoading: state.getIn(['roles']).isLoading,
  errors: state.getIn(['roles']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addRole,
  addRoleAbilities,
  deleteRole,
  getAllRoles,
  updateRole,
  getAllSubjects,
  getAllActions
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleAbility));
