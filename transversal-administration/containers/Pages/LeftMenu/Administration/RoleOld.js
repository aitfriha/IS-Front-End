import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable, { MTableEditField } from 'material-table';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  isString, isEmpty, uniq, map, find, capitalize, isBoolean, pickBy
} from 'lodash';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import { red, teal } from '@material-ui/core/colors';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import {
  addRole, deleteRole, getAllRoles, updateRole, addRoleAbilities
} from '../../../../redux/rolesAbilities/actions';
import notification from '../../../../../app/components/Notification/Notification';
import { getAllSubjects } from '../../../../redux/subjects/actions';
import { getAllActions } from '../../../../redux/actions/actions';
import IconButton from "@material-ui/core/IconButton";
const styles = (theme) => ({
  gridItemMargin: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },

  parentRow: {
    backgroundColor: '#cfd8dc'
  }

});

class Role extends React.Component {
  constructor(props) {
    super(props);

    this.editingPromiseResolve = () => {
    };
    this.state = {
      columns: [
        {
          title: 'role*',
          field: 'roleName'
        },
        {
          title: 'description',
          field: 'roleDescription'
        },
        {
          title: 'Actions',
          field: '',
          editable: false,
          render: (rowData) => rowData && (
            <IconButton
              color="secondary"
              onClick={this.displayAction(rowData)}
            >
             {/* <AddIcon />*/}actions
            </IconButton>
          )
        }
      ]
    };
  }

  componentDidMount() {
    const { getAllRoles } = this.props;
    getAllRoles();
  }

  displayAction = (rowData) => {
   console.log(rowData);
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
        />
      </div>
    );
  }
}


Role.propTypes = {
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
)(Role));
