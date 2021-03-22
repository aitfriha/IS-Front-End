import React, { useContext } from 'react';
import {
  Grid,
  Card,
  CardContent,
} from '@material-ui/core';

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
  getAllExpenseStatus,
  addExpenseStatus,
  updateExpenseStatus,
  deleteExpenseStatus
} from '../../../../redux/expenseStatus/actions';

const styles = {};

import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeContext } from '../../../App/ThemeWrapper';

const useStyles = makeStyles((theme) => {

});
const title = brand.name + ' - Expense Status';
const description = brand.desc;


class ExpenseStatus extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      expenseStatusColumns: [
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
          title: 'Description', // intl.formatMessage({ id: 'connection.id' }),
          field: 'description',
          minWidth: 200,
          searchable: true
        }
      ]
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('greyTheme');

    const { getAllExpenseStatus } = this.props;
    getAllExpenseStatus();
  }


  //----------------------------------------------------------------------------------------------

  render() {
    const {
      location, intl, errors, isLoading, expenseStatusResponse,
      expensesStatus, getAllExpenseStatus, addExpenseStatus, updateExpenseStatus, deleteExpenseStatus, logedUser
    } = this.props;

    const { expenseStatusColumns } = this.state;
    const thelogedUser = JSON.parse(logedUser);
    (!isLoading && expenseStatusResponse) && this.editingPromiseResolve(expenseStatusResponse);
    (!isLoading && !expenseStatusResponse) && this.editingPromiseResolve(errors);

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
            <Grid item xs={12} md={12} style={{ marginTop: '10px' }}>
              <MaterialTable
                title="Expenses status list"
                columns={expenseStatusColumns}
                data={expensesStatus && expensesStatus}
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
                  isDeletable: rowData => rowData.removable,
                  /* onRowAdd: newData => new Promise((resolve) => {
                    // add expense status action
                    addExpenseStatus(newData);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllExpenseStatus();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  }), */
                  onRowUpdate: thelogedUser.userRoles[0].actionsNames.financialModule_expensesStatus_modify ? (newData => new Promise((resolve) => {
                    // update expense status action
                    updateExpenseStatus(newData);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllExpenseStatus();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  })) : null,
                  onRowDelete: thelogedUser.userRoles[0].actionsNames.financialModule_expensesStatus_delete ? (oldData => new Promise((resolve) => {
                    // delete expense status action
                    deleteExpenseStatus(oldData.id);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllExpenseStatus();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  })) : null
                }}
              />
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

ExpenseStatus.propTypes = {
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  expenseStatusResponse: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  expensesStatus: state.getIn(['expenseStatus']).expensesStatus,

  expenseStatusResponse: state.getIn(['expenseStatus']).expenseStatusResponse,
  isLoading: state.getIn(['expenseStatus']).isLoading,
  errors: state.getIn(['expenseStatus']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllExpenseStatus,
  addExpenseStatus,
  updateExpenseStatus,
  deleteExpenseStatus

}, dispatch);

const ExpenseStatusMapped = connect(mapStateToProps, mapDispatchToProps)(injectIntl(ExpenseStatus));

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <ExpenseStatusMapped changeTheme={changeTheme} classes={classes} />;
};

//export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ExpenseStatus)));
