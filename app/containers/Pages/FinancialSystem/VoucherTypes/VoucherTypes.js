import React from 'react';
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
import HelmetCustom from '../../../../components/HelmetCustom/HelmetCustom';
import notification from '../../../../components/Notification/Notification';

import {
  getAllVoucherTypes,
  addVoucherType,
  updateVoucherType,
  deleteVoucherType
} from '../../../../redux/voucherType/actions';

const styles = {};


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
    const { getAllVoucherTypes } = this.props;
    getAllVoucherTypes();
  }

  componentWillUnmount() {
  }


  //----------------------------------------------------------------------------------------------
  render() {
    const {
      location, intl, errors, isLoading, addVoucherType, updateVoucherType, deleteVoucherType, getAllVoucherTypes, voucherTypes, voucherTypeResponse
    } = this.props;
    const { voucherTypesColumns } = this.state;

    (!isLoading && voucherTypeResponse) && this.editingPromiseResolve(voucherTypeResponse);
    (!isLoading && !voucherTypeResponse) && this.editingPromiseResolve(errors);

    // console.log(voucherTypes);

    return (
      <div>
        <HelmetCustom location={location} />
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
                  onRowAdd: newData => new Promise((resolve) => {
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
                  }),
                  onRowUpdate: (newData) => new Promise((resolve) => {
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
                  }),
                  onRowDelete: oldData => new Promise((resolve) => {
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
                  })
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
  location: PropTypes.object.isRequired,
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
});

const mapDispatchToProps = dispatch => bindActionCreators({

  getAllVoucherTypes,
  addVoucherType,
  updateVoucherType,
  deleteVoucherType

}, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(VoucherTypes)));
