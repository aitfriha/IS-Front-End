import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable from 'material-table';
import { PropTypes } from 'prop-types';

import { bindActionCreators } from 'redux';
import { isString } from 'lodash';
import { connect } from 'react-redux';
import notification from '../../../../../app/components/Notification/Notification';
import {
  addAction,
  deleteAction,
  getAllActions,
  updateAction
} from '../../../../redux/actions/actions';

const styles = {};

class Action extends React.Component {
  constructor(props) {
    super(props);

    const { intl } = props;
    this.editingPromiseResolve = () => {
    };
    this.state = {
      columns: [
        {
          title: 'code*',
          field: 'actionCode',
          cellStyle: {
            width: 140,
            maxWidth: 140
          },
          headerStyle: {
            width: 200,
            maxWidth: 200
          }
        },
        {
          title: 'concerns',
          field: 'actionConcerns',
          lookup: {
            Access: 'Access',
            Create: 'Create',
            Update: 'Update',
            Delete: 'Delete',
            Export: 'Export',
            Import: 'Import'
          },
          cellStyle: {
            width: 140,
            maxWidth: 140
          },
          headerStyle: {
            width: 200,
            maxWidth: 200
          }
        },
        {
          title: 'description',
          field: 'actionDescription',
          cellStyle: {
            width: 140,
            maxWidth: 140
          },
          headerStyle: {
            width: 200,
            maxWidth: 200
          }
        },
        {
          title: 'creation date',
          field: 'actionCreatedAt',
          type: 'date',
          editable: 'never',
          cellStyle: {
            width: 140,
            maxWidth: 140
          },
          headerStyle: {
            width: 200,
            maxWidth: 200
          }
        },
        {
          title: 'last update date',
          field: 'actionUpdatedAt',
          type: 'date',
          editable: 'never',
          cellStyle: {
            width: 110,
            maxWidth: 110
          },
          headerStyle: {
            width: 320,
            maxWidth: 320
          }
        },
      ]
    };
  }

  componentDidMount() {
    const { getAllActions } = this.props;
    getAllActions();
  }

  render() {
    const {
      location, allActions, addAction, errors, isLoading, actionResponse, getAllActions, updateAction, deleteAction
    } = this.props;
    const { columns } = this.state;
    // Sent resolve to editing promises
    (!isLoading && actionResponse) && this.editingPromiseResolve(actionResponse);
    (!isLoading && !actionResponse) && this.editingPromiseResolve(errors);
    return (
      <div>

        <MaterialTable
          title=""
          columns={columns}
          data={allActions && allActions}
          options={{
            exportFileName: 'water_contracts',
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
              // add Action action
              addAction(newData);
              this.editingPromiseResolve = resolve;
            }).then((result) => {
              if (isString(result)) {
                // Fetch data
                getAllActions();
                notification('success', result);
              } else {
                notification('danger', result);
              }
            }),
            onRowUpdate: (newData) => new Promise((resolve) => {
              // update Action action
              updateAction(newData);
              this.editingPromiseResolve = resolve;
            }).then((result) => {
              if (isString(result)) {
                // Fetch data
                getAllActions();
                notification('success', result);
              } else {
                notification('danger', result);
              }
            }),
            onRowDelete: oldData => new Promise((resolve) => {
              // delete Action action
              console.log(oldData.actionId);
              deleteAction(oldData.actionId);
              this.editingPromiseResolve = resolve;
            }).then((result) => {
              if (isString(result)) {
                // Fetch data
                getAllActions();
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


Action.propTypes = {
  /** Location */
  location: PropTypes.object.isRequired,
  /** Errors */
  errors: PropTypes.object.isRequired,
  /** isLoading */
  isLoading: PropTypes.bool.isRequired,
  /** getAllActions */
  getAllActions: PropTypes.func.isRequired,
  /** allActions */
  allActions: PropTypes.array.isRequired,
  /** addAction */
  addAction: PropTypes.func.isRequired,
  /** Action Response */
  actionResponse: PropTypes.string.isRequired,
  /** addaction */
  updateAction: PropTypes.func.isRequired,
  /** deleteAction */
  deleteAction: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  allActions: state.getIn(['action']).allActions,
  actionResponse: state.getIn(['action']).actionResponse,
  isLoading: state.getIn(['action']).isLoading,
  errors: state.getIn(['action']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addAction,
  deleteAction,
  getAllActions,
  updateAction
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Action));
