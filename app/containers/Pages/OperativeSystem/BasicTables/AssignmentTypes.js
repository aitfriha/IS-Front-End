import React from 'react';
import MaterialTable from 'material-table';

import { PropTypes } from 'prop-types';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import notification from '../../../../components/Notification/Notification';
import HelmetCustom from '../../../../components/HelmetCustom/HelmetCustom';
import localizationMaterialTable from '../../../../api/localizationMaterialUI/localizationMaterialTable';

import {
  addAssignmentType,
  updateAssignmentType,
  deleteAssignmentType,
  getAllAssignmentTypes
} from '../../../../redux/assignmentType/actions';

const styles = {};

class AssignmentType extends React.Component {
  constructor(props) {
    super(props);

    const { intl } = props;

    this.editingPromiseResolve = () => { };

    this.state = {
      columns: [
        {
          title: 'Id', // intl.formatMessage({ id: 'connection.id' }),
          field: 'id',
          searchable: false,
          hidden: true
        },
        {
          title: 'Code', // intl.formatMessage({ id: 'connection.id' }),
          field: 'code',
          searchable: true,
          minWidth: 120,
          width: 120,
          maxWidth: 120,
        },
        {
          title: 'Name', // intl.formatMessage({ id: 'connection.id' }),
          field: 'name',
          minWidth: 150,
          searchable: true,
        },
        {
          title: 'Description', // intl.formatMessage({ id: 'connection.server' }),
          field: 'description',
          searchable: true,
          minWidth: 300
        }
      ]
    };
  }

  componentDidMount() {
    const { getAllAssignmentTypes } = this.props;
    getAllAssignmentTypes();
  }

  componentWillUnmount() {
    this.setState({
      columns: this.state.columns
    });
  }

  render() {
    const {
      location, intl, errors, isLoading, assignmentTypeResponse, getAllAssignmentTypes, assignmentTypes, addAssignmentType, updateAssignmentType, deleteAssignmentType
    } = this.props;

    const { columns } = this.state;

    // Sent resolve to editing promises
    (!isLoading && assignmentTypeResponse) && this.editingPromiseResolve(assignmentTypeResponse);
    (!isLoading && !assignmentTypeResponse) && this.editingPromiseResolve(errors);

    return (
      <div>
        <HelmetCustom location={location} />
        <MaterialTable
          title="Assignment type list"
          columns={columns}
          data={assignmentTypes && assignmentTypes}
          // localization={localizationMaterialTable(intl)}
          options={{
            actionsColumnIndex: -1,
            actionsCellStyle: {
              paddingLeft: 10,
              minWidth: 80,
              width: 80
            }
          }}
          editable={{
            onRowAdd: newData => new Promise((resolve) => {
              // add assignment type action
              addAssignmentType(newData);
              this.editingPromiseResolve = resolve;
            }).then((result) => {
              if (isString(result)) {
                // Fetch data
                getAllAssignmentTypes();
                notification('success', result);
              } else {
                notification('danger', result);
              }
            }),
            onRowUpdate: (newData) => new Promise((resolve) => {
              // update assignment type action
              updateAssignmentType(newData);
              this.editingPromiseResolve = resolve;
            }).then((result) => {
              if (isString(result)) {
                // Fetch data
                getAllAssignmentTypes();
                notification('success', result);
              } else {
                notification('danger', result);
              }
            }),
            onRowDelete: oldData => new Promise((resolve) => {
              // delete assignment type action
              deleteAssignmentType(oldData.id);
              this.editingPromiseResolve = resolve;
            }).then((result) => {
              if (isString(result)) {
                // Fetch data
                getAllAssignmentTypes();
                notification('success', result);
              } else {
                notification('danger', result);
              }
            })
          }}
        />
      </div>
    );
  }
}

AssignmentType.propTypes = {
  location: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  assignmentTypeResponse: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  assignmentTypes: state.getIn(['assignmentType']).assignmentTypes,
  assignmentTypeResponse: state.getIn(['assignmentType']).assignmentTypeResponse,
  isLoading: state.getIn(['assignmentType']).isLoading,
  errors: state.getIn(['assignmentType']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllAssignmentTypes,
  addAssignmentType,
  updateAssignmentType,
  deleteAssignmentType
}, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(AssignmentType)));
