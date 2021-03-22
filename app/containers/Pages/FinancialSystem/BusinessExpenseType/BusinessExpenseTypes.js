import React, { useContext } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Chip,
  Checkbox,
  Button
} from '@material-ui/core';

import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';

import VisibilityIcon from '@material-ui/icons/Visibility';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

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
  addBusinessExpenseType,
  updateBusinessExpenseType,
  deleteBusinessExpenseType,
  getBusinessExpensesTypes,
  addBusinessExpenseSubtype,
  updateBusinessExpenseSubtype,
  deleteBusinessExpenseSubtype
} from '../../../../redux/businessExpenseType/actions';

import { makeStyles } from '@material-ui/core/styles';
import { ThemeContext } from '../../../App/ThemeWrapper';

const styles = {};

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const useStyles = makeStyles((theme) => {

});
const title = brand.name + ' - Business Expense Types';
const description = brand.desc;

class BusinessExpenseTypes extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      selectedType: null,
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
          title: 'Requires Approval', // intl.formatMessage({ id: 'connection.id' }),
          field: 'requiresApproval',
          minWidth: 120,
          width: 120,
          maxWidth: 120,
          searchable: true,
          editable: (_, rowData) => this.state.selectedType.masterValue === 'TRANSPORT',
          render: rowData => (
            this.state.selectedType && this.state.selectedType.masterValue === 'TRANSPORT'
              ? <Checkbox checked={rowData.requiresApproval} color="default" />
              : null
          ),
          editComponent: props => (
            <Checkbox
              color="default"
              checked={props.rowData.requiresApproval || false}
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

    const { getBusinessExpensesTypes } = this.props;
    getBusinessExpensesTypes();
  }

  componentWillUnmount() {
    this.state = {
      selectedType: null
    };
  }


  //----------------------------------------------------------------------------------------------

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
    const { businessExpensesTypes } = this.props;
    const index = businessExpensesTypes.findIndex(obj => obj.id === this.state.selectedType.id);
    const list = [];
    if (index > -1) {
      businessExpensesTypes[index].subtypes.forEach(el => {
        list.push(el);
      });
    }
    return list;
  }


  render() {
    const {
      location, intl, errors, isLoading, businessExpenseTypeResponse,
      addBusinessExpenseType, updateBusinessExpenseType, deleteBusinessExpenseType, businessExpensesTypes, getBusinessExpensesTypes,
      addBusinessExpenseSubtype, updateBusinessExpenseSubtype, deleteBusinessExpenseSubtype,logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    const { typesColumns, subtypesColumns } = this.state;

    (!isLoading && businessExpenseTypeResponse) && this.editingPromiseResolve(businessExpenseTypeResponse);
    (!isLoading && !businessExpenseTypeResponse) && this.editingPromiseResolve(errors);

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
                    title="Business expense types list"
                    columns={typesColumns}
                    data={businessExpensesTypes && businessExpensesTypes}
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
                      // add business expense type action
                      addBusinessExpenseType(newData);
                      this.editingPromiseResolve = resolve;
                    }).then((result) => {
                      if (isString(result)) {
                        // Fetch data
                        getBusinessExpensesTypes();
                        notification('success', result);
                      } else {
                        notification('danger', result);
                      }
                    }), */
                      onRowUpdate: thelogedUser.userRoles[0].actionsNames.financialModule_businessExpenseTypes_modify ? (newData => new Promise((resolve) => {
                        // update business expense type action
                        updateBusinessExpenseType(newData);
                        this.editingPromiseResolve = resolve;
                      }).then((result) => {
                        if (isString(result)) {
                          // Fetch data
                          getBusinessExpensesTypes();
                          notification('success', result);
                        } else {
                          notification('danger', result);
                        }
                      })) : null,
                      onRowDelete: thelogedUser.userRoles[0].actionsNames.financialModule_businessExpenseTypes_delete ? (oldData => new Promise((resolve) => {
                        // delete business expense type action
                        deleteBusinessExpenseType(oldData.id);
                        this.editingPromiseResolve = resolve;
                      }).then((result) => {
                        if (isString(result)) {
                          // Fetch data
                          getBusinessExpensesTypes();
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
                      onRowAdd:  thelogedUser.userRoles[0].actionsNames.financialModule_businessExpenseTypes_create ? (newData => new Promise((resolve) => {
                        // add business expense subtype action
                        newData.type = this.state.selectedType.id;
                        newData.masterValueType = this.state.selectedType.masterValue;
                        /* if (newData.masterValueType === 'LODGING') {
                        newData.requirement = this.state.requirementModified ? this.getRequirementByValue(this.state.selectedRequirement) : newData.requirement
                      } */
                        addBusinessExpenseSubtype(newData);
                        this.editingPromiseResolve = resolve;
                      }).then((result) => {
                        if (isString(result)) {
                          // Fetch data
                          getBusinessExpensesTypes();
                          this.setState({
                            requirementModified: false,
                            selectedRequirement: ''
                          });
                          notification('success', result);
                        } else {
                          notification('danger', result);
                        }
                      })) : null,
                      onRowUpdate: thelogedUser.userRoles[0].actionsNames.financialModule_businessExpenseTypes_modify ? (newData => new Promise((resolve) => {
                        // update business expense subtype action
                        /* if (newData.masterValueType === 'LODGING') {
                          newData.requirement = this.state.requirementModified ? this.getRequirementByValue(this.state.selectedRequirement) : newData.requirement
                        } */
                        updateBusinessExpenseSubtype(newData);
                        this.editingPromiseResolve = resolve;
                      }).then((result) => {
                        if (isString(result)) {
                          // Fetch data
                          getBusinessExpensesTypes();
                          this.setState({
                            requirementModified: false,
                            selectedRequirement: ''
                          });
                          notification('success', result);
                        } else {
                          notification('danger', result);
                        }
                      })) : null,
                      onRowDelete: thelogedUser.userRoles[0].actionsNames.financialModule_businessExpenseTypes_delete ? (oldData => new Promise((resolve) => {
                        // delete business expense subtype action
                        const data = {
                          typeId: oldData.type,
                          subtypeId: oldData.id
                        };
                        deleteBusinessExpenseSubtype(data);
                        this.editingPromiseResolve = resolve;
                      }).then((result) => {
                        if (isString(result)) {
                          // Fetch data
                          getBusinessExpensesTypes();
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

BusinessExpenseTypes.propTypes = {
  //location: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  businessExpenseTypeResponse: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  businessExpensesTypes: state.getIn(['businessExpenseType']).businessExpensesTypes,
  businessExpenseTypeResponse: state.getIn(['businessExpenseType']).businessExpenseTypeResponse,
  isLoading: state.getIn(['businessExpenseType']).isLoading,
  errors: state.getIn(['businessExpenseType']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addBusinessExpenseType,
  updateBusinessExpenseType,
  deleteBusinessExpenseType,
  getBusinessExpensesTypes,
  addBusinessExpenseSubtype,
  updateBusinessExpenseSubtype,
  deleteBusinessExpenseSubtype
}, dispatch);


const BusinessExpenseTypesMapped = connect(mapStateToProps, mapDispatchToProps)(injectIntl(BusinessExpenseTypes));

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <BusinessExpenseTypesMapped changeTheme={changeTheme} classes={classes} />;
};

//export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(BusinessExpenseTypes)));
