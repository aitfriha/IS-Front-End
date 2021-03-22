import React, { useContext } from 'react';
import {
  Grid,
  Card,
  CardContent
} from '@material-ui/core';

import MaterialTable, { MTableEditRow, MTableToolbar } from 'material-table';

import { injectIntl } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
// import HelmetCustom from '../../../../components/HelmetCustom/HelmetCustom';


import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { makeStyles } from '@material-ui/core/styles';
import notification from '../../../../components/Notification/Notification';
import {
  getAllVoucherTypes,
  addVoucherType,
  updateVoucherType,
  deleteVoucherType
} from '../../../../redux/voucherType/actions';
import { ThemeContext } from '../../../App/ThemeWrapper';

const styles = {};

const useStyles = makeStyles((theme) => {

});
const title = brand.name + ' - Voucher Types';
const description = brand.desc;

class VoucherTypes extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      voucherTypesColumns: [
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

    const { getAllVoucherTypes } = this.props;
    getAllVoucherTypes();
  }

  componentWillUnmount() {
  }


  //----------------------------------------------------------------------------------------------
  render() {
    const {
      location, intl, errors, isLoading, addVoucherType, updateVoucherType, deleteVoucherType, getAllVoucherTypes, voucherTypes, voucherTypeResponse, logedUser
    } = this.props;
    const { voucherTypesColumns } = this.state;
    const thelogedUser = JSON.parse(logedUser);
    (!isLoading && voucherTypeResponse) && this.editingPromiseResolve(voucherTypeResponse);
    (!isLoading && !voucherTypeResponse) && this.editingPromiseResolve(errors);

    // console.log(voucherTypes);

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
                title="Voucher types list"
                columns={voucherTypesColumns}
                data={voucherTypes && voucherTypes}
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
                  onRowAdd: thelogedUser.userRoles[0].actionsNames.financialModule_voucherType_create ? (newData => new Promise((resolve) => {
                    // add person type action
                    addVoucherType(newData);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllVoucherTypes();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  })) : null,
                  onRowUpdate: thelogedUser.userRoles[0].actionsNames.financialModule_voucherType_modify ? (newData => new Promise((resolve) => {
                    // update person type action
                    updateVoucherType(newData);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllVoucherTypes();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  })) : null,
                  onRowDelete: thelogedUser.userRoles[0].actionsNames.financialModule_voucherType_delete ? (oldData => new Promise((resolve) => {
                    // delete assignment type action
                    deleteVoucherType(oldData.id);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllVoucherTypes();
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

VoucherTypes.propTypes = {
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  voucherTypeResponse: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  voucherTypes: state.getIn(['voucherType']).voucherTypes,
  voucherTypeResponse: state.getIn(['voucherType']).voucherTypeResponse,
  isLoading: state.getIn(['voucherType']).isLoading,
  errors: state.getIn(['voucherType']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators({

  getAllVoucherTypes,
  addVoucherType,
  updateVoucherType,
  deleteVoucherType

}, dispatch);

const VoucherTypesMapped = connect(mapStateToProps, mapDispatchToProps)(injectIntl(VoucherTypes));

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <VoucherTypesMapped changeTheme={changeTheme} classes={classes} />;
};

// export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(VoucherTypes)));
