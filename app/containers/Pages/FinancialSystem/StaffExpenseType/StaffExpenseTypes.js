import React, { useContext } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Checkbox,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core';

import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import VisibilityIcon from '@material-ui/icons/Visibility';

import MaterialTable, { MTableEditRow, MTableToolbar } from 'material-table';

import { injectIntl } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
//import HelmetCustom from '../../../../components/HelmetCustom/HelmetCustom';
import notification from '../../../../components/Notification/Notification';

import {
  addStaffExpenseType,
  updateStaffExpenseType,
  deleteStaffExpenseType,
  getStaffExpensesTypes,
  addStaffExpenseSubtype,
  updateStaffExpenseSubtype,
  deleteStaffExpenseSubtype
} from '../../../../redux/staffExpenseType/actions';

const styles = {};

import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeContext } from '../../../App/ThemeWrapper';

const useStyles = makeStyles((theme) => {

});
const title = brand.name + ' - Staff Expense Types';
const description = brand.desc;

class StaffExpenseTypes extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      selectedType: null,
      selectedRequirement: null,
      requirementModified: false,
      typesColumns: [
        {
          title: 'Code', // intl.formatMessage({ id: 'connection.id' }),
          field: 'code',
          minWidth: 100,
          width: 100,
          maxWidth: 100,
          searchable: true
        },
        {
          title: 'Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'name',
          minWidth: 250,
          searchable: true
        },
        {
          title: 'Allow Subtypes', // intl.formatMessage({ id: 'connection.id' }),
          field: 'allowSubtypes',
          minWidth: 120,
          width: 120,
          maxWidth: 120,
          searchable: true,
          editable: (_, rowData) => !rowData || (rowData && rowData.removable),
          render: rowData => (
            <Checkbox checked={rowData.allowSubtypes} color="default" />// rowData.allowSubtypes ? 'Yes' : 'No'
          ),
          editComponent: props => (
            <Checkbox
              color="default"
              checked={props.rowData.allowSubtypes || false}
              onChange={e => props.onChange(e.target.checked)}
            />
          )
        }
      ],
      subtypesColumns: [
        {
          title: 'Code', // intl.formatMessage({ id: 'connection.id' }),
          field: 'code',
          minWidth: 120,
          width: 120,
          maxWidth: 120,
          searchable: true
        },
        {
          title: 'Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'name',
          minWidth: 150,
          searchable: true
        },
        {
          title: 'Requirement', // intl.formatMessage({ id: 'connection.id' }),
          field: 'requirement',
          minWidth: 150,
          searchable: true,
          editable: (_, rowData) => this.state.selectedType.masterValue === 'LODGING',
          editComponent: props => (
            <Select
              id="requirement-select"
              name="requirement"
              value={this.state.selectedRequirement || this.getValueOfRequirement(props.value) || 'none'}
              onChange={(e) => this.changeRequirementValue(e)}
            >
              <MenuItem value="none">
                <em>Empty</em>
              </MenuItem>
              <MenuItem value="direction">
                Full direction
              </MenuItem>
              <MenuItem value="name">
                Only name
              </MenuItem>
            </Select>
          )
        },
        {
          title: 'Validate', // intl.formatMessage({ id: 'connection.id' }),
          field: 'validate',
          minWidth: 120,
          width: 120,
          maxWidth: 120,
          searchable: true,
          render: rowData => (
            <Checkbox checked={rowData.validate} color="default" />
          ),
          editComponent: props => (
            <Checkbox
              color="default"
              checked={props.rowData.validate || false}
              onChange={e => props.onChange(e.target.checked)}
            />
          )
        }
      ]
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('greyTheme');

    const { getStaffExpensesTypes } = this.props;
    getStaffExpensesTypes();
  }

  componentWillUnmount() {
    this.state = {
      selectedType: null
    };
  }


  //----------------------------------------------------------------------------------------------

  changeRequirementValue(evt) {
    this.setState({
      requirementModified: true,
      selectedRequirement: evt.target.value
    });
  }

  getValueOfRequirement(requirement) {
    switch (requirement) {
      case 'Full direction': {
        return 'direction';
      }
      case 'Only name': {
        return 'name';
      }
      default: {
        return 'none';
      }
    }
  }

  getRequirementByValue(value) {
    switch (value) {
      case 'direction': {
        return 'Full direction';
      }
      case 'name': {
        return 'Only name';
      }
      default: {
        return '';
      }
    }
  }

  loadSubtypes() {
    const { staffExpensesTypes } = this.props;
    const index = staffExpensesTypes.findIndex(obj => obj.id === this.state.selectedType.id);
    const list = [];
    if (index > -1) {
      staffExpensesTypes[index].subtypes.forEach(el => {
        list.push(el);
      });
    }
    return list;
  }


  render() {
    const {
      location, intl, errors, isLoading, addStaffExpenseType, updateStaffExpenseType,
      deleteStaffExpenseType, getStaffExpensesTypes, addStaffExpenseSubtype, updateStaffExpenseSubtype,
      deleteStaffExpenseSubtype, staffExpensesTypes, staffExpenseTypeResponse,logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    const { typesColumns, subtypesColumns } = this.state;


    (!isLoading && staffExpenseTypeResponse) && this.editingPromiseResolve(staffExpenseTypeResponse);
    (!isLoading && !staffExpenseTypeResponse) && this.editingPromiseResolve(errors);

    // console.log(staffExpensesTypes);

    return (
      <div>
        {/* <HelmetCustom location={location} /> */}
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Card>
          <CardContent>
            {!this.state.selectedType
              ? (
                <Grid item xs={12} md={12} style={{ marginTop: '10px' }}>
                  <MaterialTable
                    title="Staff expense types list"
                    columns={typesColumns}
                    data={staffExpensesTypes && staffExpensesTypes}
                    actions={[
                      rowData => ({
                        icon: () => <VisibilityIcon />,
                        tooltip: 'View',
                        disabled: !rowData.allowSubtypes,
                        onClick: (event, rowData) => {
                          this.setState({
                            selectedType: rowData
                          });
                        }
                      })
                    ]}
                    style={{ marginTop: '10px' }}
                    options={{
                      actionsColumnIndex: -1,
                      actionsCellStyle: {
                        paddingLeft: 15,
                        minWidth: 120,
                        width: 120
                      }
                    }}
                    editable={{
                      isDeletable: rowData => rowData.removable && rowData.subtypes.length === 0,
                      /* onRowAdd: newData => new Promise((resolve) => {
                      // add staff expense type action
                      addStaffExpenseType(newData);
                      this.editingPromiseResolve = resolve;
                    }).then((result) => {
                      if (isString(result)) {
                        // Fetch data
                        getStaffExpensesTypes();
                        notification('success', result);
                      } else {
                        notification('danger', result);
                      }
                    }), */
                      onRowUpdate: thelogedUser.userRoles[0].actionsNames.financialModule_staffExpensesTypes_modify ? (newData => new Promise((resolve) => {
                        // update staff expense type action
                        updateStaffExpenseType(newData);
                        this.editingPromiseResolve = resolve;
                      }).then((result) => {
                        if (isString(result)) {
                          // Fetch data
                          getStaffExpensesTypes();
                          notification('success', result);
                        } else {
                          notification('danger', result);
                        }
                      })) : null,
                      onRowDelete: thelogedUser.userRoles[0].actionsNames.financialModule_staffExpensesTypes_delete ? (oldData => new Promise((resolve) => {
                        // delete staff expense type action
                        deleteStaffExpenseType(oldData.id);
                        this.editingPromiseResolve = resolve;
                      }).then((result) => {
                        if (isString(result)) {
                          // Fetch data
                          getStaffExpensesTypes();
                          notification('success', result);
                        } else {
                          notification('danger', result);
                        }
                      })) : null
                    }}
                  />
                </Grid>
              )
              : (
                <Grid item xs={12} md={12} style={{ marginTop: '10px' }}>
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<KeyboardReturnIcon />}
                    onClick={(e) => this.setState({ selectedType: null })}
                  >
                    Return
                  </Button>
                  <MaterialTable
                    title={`${this.state.selectedType.name} subtypes list`}
                    columns={subtypesColumns}
                    data={this.loadSubtypes()}
                    options={{
                      actionsColumnIndex: -1,
                      actionsCellStyle: {
                        paddingLeft: 10,
                        minWidth: 80,
                        width: 80
                      }
                    }}
                    style={{ marginTop: '10px' }}
                    editable={{
                      onRowAdd: thelogedUser.userRoles[0].actionsNames.financialModule_staffExpensesTypes_create ? (newData => new Promise((resolve) => {
                        // add staff expense subtype action
                        newData.type = this.state.selectedType.id;
                        newData.masterValueType = this.state.selectedType.masterValue;
                        if (newData.masterValueType === 'LODGING') {
                          newData.requirement = this.state.requirementModified ? this.getRequirementByValue(this.state.selectedRequirement) : newData.requirement;
                        }
                        addStaffExpenseSubtype(newData);
                        this.editingPromiseResolve = resolve;
                      }).then((result) => {
                        if (isString(result)) {
                          // Fetch data
                          getStaffExpensesTypes();
                          this.setState({
                            requirementModified: false,
                            selectedRequirement: ''
                          });
                          notification('success', result);
                        } else {
                          notification('danger', result);
                        }
                      })) : null,
                      onRowUpdate: thelogedUser.userRoles[0].actionsNames.financialModule_staffExpensesTypes_modify ? (newData => new Promise((resolve) => {
                        // update staff expense subtype action
                        if (newData.masterValueType === 'LODGING') {
                          newData.requirement = this.state.requirementModified ? this.getRequirementByValue(this.state.selectedRequirement) : newData.requirement;
                        }
                        updateStaffExpenseSubtype(newData);
                        this.editingPromiseResolve = resolve;
                      }).then((result) => {
                        if (isString(result)) {
                          // Fetch data
                          getStaffExpensesTypes();
                          this.setState({
                            requirementModified: false,
                            selectedRequirement: ''
                          });
                          notification('success', result);
                        } else {
                          notification('danger', result);
                        }
                      })) : null,
                      onRowDelete: thelogedUser.userRoles[0].actionsNames.financialModule_staffExpensesTypes_delete ? (oldData => new Promise((resolve) => {
                        // delete staff expense subtype action
                        const data = {
                          typeId: oldData.type,
                          subtypeId: oldData.id
                        };
                        deleteStaffExpenseSubtype(data);
                        this.editingPromiseResolve = resolve;
                      }).then((result) => {
                        if (isString(result)) {
                          // Fetch data
                          getStaffExpensesTypes();
                          notification('success', result);
                        } else {
                          notification('danger', result);
                        }
                      })) : null
                    }}
                  />
                </Grid>
              )}
          </CardContent>
        </Card>
      </div>
    );
  }
}

StaffExpenseTypes.propTypes = {
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  staffExpenseTypeResponse: PropTypes.string.isRequired,

  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  staffExpensesTypes: state.getIn(['staffExpenseType']).staffExpensesTypes,
  staffExpenseTypeResponse: state.getIn(['staffExpenseType']).staffExpenseTypeResponse,
  isLoading: state.getIn(['staffExpenseType']).isLoading,
  errors: state.getIn(['staffExpenseType']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addStaffExpenseType,
  updateStaffExpenseType,
  deleteStaffExpenseType,

  getStaffExpensesTypes,
  addStaffExpenseSubtype,
  updateStaffExpenseSubtype,
  deleteStaffExpenseSubtype

}, dispatch);

const StaffExpenseTypesMapped = connect(mapStateToProps, mapDispatchToProps)(injectIntl(StaffExpenseTypes));

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <StaffExpenseTypesMapped changeTheme={changeTheme} classes={classes} />;
};

//export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(StaffExpenseTypes)));
