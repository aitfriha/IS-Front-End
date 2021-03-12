import React, { useContext } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem
} from '@material-ui/core';

import MaterialTable from 'material-table';

import { injectIntl } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
//import HelmetCustom from '../../../../components/HelmetCustom/HelmetCustom';
import notification from '../../../../components/Notification/Notification';
import {
  getAllExpenseEmailAddresses,
  addExpenseEmailAddress,
  updateExpenseEmailAddress,
  deleteExpenseEmailAddress
} from '../../../../redux/expenseEmailAddress/actions';

const styles = {};

import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeContext } from '../../../App/ThemeWrapper';

const useStyles = makeStyles((theme) => {

});
const title = brand.name + ' - Expense Email Address';
const description = brand.desc;


class ExpenseEmailAddress extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      selectedAction: 0,
      emailAddressesColumns: [
        {
          title: 'Action', // intl.formatMessage({ id: 'connection.id' }),
          field: 'action',
          searchable: true,
          minWidth: 200,
          width: 200,
          maxWidth: 200,
          validate: rowData => (!rowData.hasOwnProperty('action') ? this.state.selectedAction > 0 : rowData.action !== ''),
          editComponent: props => (
            <Select
              id="action-select"
              name="action"
              value={this.state.selectedAction || this.getValueOfAction(props.value)}
              onChange={(e) => this.changeActionValue(e)}
              error={!props.rowData.hasOwnProperty('action') ? this.state.selectedAction === 0 : props.value === ''}
            >
              <MenuItem value={0}>
                <em>Empty</em>
              </MenuItem>
              <MenuItem value={1}>
                Who approves
              </MenuItem>
              <MenuItem value={2}>
                Who do the payment
              </MenuItem>
            </Select>
          )
        },
        {
          title: 'Email', // intl.formatMessage({ id: 'connection.id' }),
          field: 'email',
          searchable: true,
          minWidth: 280,
          validate: rowData => rowData.hasOwnProperty('email') && rowData.email !== ''
        }
      ]
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('greyTheme');

    const { getAllExpenseEmailAddresses } = this.props;
    getAllExpenseEmailAddresses();
  }


  //----------------------------------------------------------------------------------------------


  changeActionValue(e) {
    this.setState({
      selectedAction: e.target.value
    });
  }

  getActionNameByValue(value) {
    switch (value) {
      case 1: {
        return 'Who approves';
      }
      case 2: {
        return 'Who do the payment';
      }
      default: {

      }
    }
  }

  getValueOfAction(action) {
    switch (action) {
      case 'Who approves': {
        return 1;
      }
      case 'Who do the payment': {
        return 2;
      }
      default: {
        return 0;
      }
    }
  }

  render() {
    const {
      location, intl, errors, isLoading, logedUser, expenseEmailAddressResponse, emailAddresses, getAllExpenseEmailAddresses, addExpenseEmailAddress, updateExpenseEmailAddress, deleteExpenseEmailAddress
    } = this.props;
    const { emailAddressesColumns } = this.state;
    const thelogedUser = JSON.parse(logedUser);
    (!isLoading && expenseEmailAddressResponse) && this.editingPromiseResolve(expenseEmailAddressResponse);
    (!isLoading && !expenseEmailAddressResponse) && this.editingPromiseResolve(errors);

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
                title="Expense email addresses list"
                columns={emailAddressesColumns}
                data={emailAddresses && emailAddresses}
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
                  onRowUpdateCancelled: rowData => {
                    this.setState({
                      selectedAction: 0
                    });
                  },
                  onRowAdd: thelogedUser.userRoles[0].actionsNames.financialModule_expensesEmailAddress_create ? (newData => new Promise((resolve) => {
                    // add email action
                    newData.action = this.getActionNameByValue(this.state.selectedAction);
                    addExpenseEmailAddress(newData);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    this.setState({
                      selectedAction: 0
                    });
                    if (isString(result)) {
                      // Fetch data
                      getAllExpenseEmailAddresses();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  })) : null,
                  onRowUpdate: thelogedUser.userRoles[0].actionsNames.financialModule_expensesEmailAddress_modify ? ((newData, oldData) => new Promise((resolve) => {
                    // update email action
                    newData.action = this.state.selectedAction ? this.getActionNameByValue(this.state.selectedAction) : oldData.action;
                    updateExpenseEmailAddress(newData);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    this.setState({
                      selectedAction: 0
                    });
                    if (isString(result)) {
                      // Fetch data
                      getAllExpenseEmailAddresses();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  })) : null,
                  onRowDelete: thelogedUser.userRoles[0].actionsNames.financialModule_expensesEmailAddress_delete ? (oldData => new Promise((resolve) => {
                    // delete email action
                    deleteExpenseEmailAddress(oldData.id);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllExpenseEmailAddresses();
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

ExpenseEmailAddress.propTypes = {
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  expenseEmailAddressResponse: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  emailAddresses: state.getIn(['expenseEmailAddress']).emailAddresses,

  expenseEmailAddressResponse: state.getIn(['expenseEmailAddress']).expenseEmailAddressResponse,
  isLoading: state.getIn(['expenseEmailAddress']).isLoading,
  errors: state.getIn(['expenseEmailAddress']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllExpenseEmailAddresses,
  addExpenseEmailAddress,
  updateExpenseEmailAddress,
  deleteExpenseEmailAddress

}, dispatch);

const ExpenseEmailAddressMapped = connect(mapStateToProps, mapDispatchToProps)(injectIntl(ExpenseEmailAddress));

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <ExpenseEmailAddressMapped changeTheme={changeTheme} classes={classes} />;
};

//export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ExpenseEmailAddress)));
