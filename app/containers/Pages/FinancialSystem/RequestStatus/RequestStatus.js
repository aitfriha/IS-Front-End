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
  getAllRequestStatus,
  addRequestStatus,
  updateRequestStatus,
  deleteRequestStatus,
} from '../../../../redux/requestStatus/actions';

const styles = {};

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class RequestStatus extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      requestStatusColumns: [
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
    const { getAllRequestStatus } = this.props;
    getAllRequestStatus();
  }

  componentWillUnmount() {

  }


  //----------------------------------------------------------------------------------------------


  render() {
    const {
      location, intl, errors, isLoading, requestStatusResponse,
      requestStatus, getAllRequestStatus, addRequestStatus, updateRequestStatus, deleteRequestStatus
    } = this.props;

    const { requestStatusColumns } = this.state;

    (!isLoading && requestStatusResponse) && this.editingPromiseResolve(requestStatusResponse);
    (!isLoading && !requestStatusResponse) && this.editingPromiseResolve(errors);

    return (
      <div>
        <HelmetCustom location={location} />
        <Card>
          <CardContent>
            <Grid item xs={12} md={12} style={{ marginTop: '10px' }}>
              <MaterialTable
                title="Request status list"
                columns={requestStatusColumns}
                data={requestStatus && requestStatus}
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
                    // add request status action
                    addRequestStatus(newData);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllRequestStatus();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  }), */
                  onRowUpdate: (newData) => new Promise((resolve) => {
                    // update request status action
                    updateRequestStatus(newData);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllRequestStatus();
                      notification('success', result);
                    } else {
                      notification('danger', result);
                    }
                  }),
                  onRowDelete: oldData => new Promise((resolve) => {
                    // delete request status action
                    deleteRequestStatus(oldData.id);
                    this.editingPromiseResolve = resolve;
                  }).then((result) => {
                    if (isString(result)) {
                      // Fetch data
                      getAllRequestStatus();
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

RequestStatus.propTypes = {
  location: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  requestStatusResponse: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  requestStatus: state.getIn(['requestStatus']).requestStatus,

  requestStatusResponse: state.getIn(['requestStatus']).requestStatusResponse,
  isLoading: state.getIn(['requestStatus']).isLoading,
  errors: state.getIn(['requestStatus']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllRequestStatus,
  addRequestStatus,
  updateRequestStatus,
  deleteRequestStatus
}, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(RequestStatus)));