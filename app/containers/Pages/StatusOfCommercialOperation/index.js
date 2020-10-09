import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { isString } from 'lodash';
import notification from '../../../components/Notification/Notification';
// import styles from '../StaffContract/people-jss';
import {
  addCommercialOperationStatus, deleteCommercialOperationStatus,
  getAllCommercialOperationStatus, updateCommercialOperationStatus
} from '../../../redux/commercialOperationStatus/actions';

const styles = {};

class StatusOfCommercialOperation extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      columns: [
        {
          // eslint-disable-next-line no-useless-concat
          title: 'Name' + '*',
          field: 'name',
          /* cellStyle: { width: 100, maxWidth: 100 },
          headerStyle: { width: 130, maxWidth: 130 } */
        },
        {
          // eslint-disable-next-line no-useless-concat
          title: 'Percentage' + '*',
          field: 'percentage',
          type: 'numeric',
          /* cellStyle: { width: 155, maxWidth: 155 },
          headerStyle: { width: 180, maxWidth: 180 } */
        },
        {
          title: 'Description',
          field: 'description',
          /* cellStyle: { width: 155, maxWidth: 155 },
          headerStyle: { width: 100, maxWidth: 180 } */
        }
      ]
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllCommercialOperationStatus } = this.props;
    getAllCommercialOperationStatus();
  }

  render() {
    const title = brand.name + ' - Status Of Commercial Operation';
    const description = brand.desc;
    const {
      columns
    } = this.state;
    const {
      // eslint-disable-next-line no-shadow
      errors, isLoading, commercialOperationStatusResponse, addCommercialOperationStatus, getAllCommercialOperationStatus, allCommercialOperationStatuss, updateCommercialOperationStatus, deleteCommercialOperationStatus
    } = this.props;
    (!isLoading && commercialOperationStatusResponse) && this.editingPromiseResolve(commercialOperationStatusResponse);
    (!isLoading && !commercialOperationStatusResponse) && this.editingPromiseResolve(errors);
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Status Of Commercial Operation" desc="" noMargin>
          {/* <StatusOfCommercialOperationBlock onSelected={this.handleChangeSelectedStatus} status={status} /> */}
          <MaterialTable
            title=""
            columns={columns}
            data={allCommercialOperationStatuss && allCommercialOperationStatuss}
            options={{
              exportFileName: 'Commercial Operation List',
              // filtering: true,
              // draggable: true,
              exportButton: true,
              pageSize: 10,
              // grouping: true,
              actionsCellStyle: {
              //  paddingLeft: 30,
                // width: 120,
                //   maxWidth: 120,
              },
              actionsColumnIndex: -1
            }}
            editable={{
              onRowAdd: newData => new Promise((resolve) => {
                // add measurement unit action
                addCommercialOperationStatus(newData);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCommercialOperationStatus();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              }),
              onRowUpdate: (newData) => new Promise((resolve) => {
                // update CommercialOperationStatus unit action
                updateCommercialOperationStatus(newData);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCommercialOperationStatus();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              }),
              onRowDelete: oldData => new Promise((resolve) => {
                // delete CommercialOperationStatus action
                deleteCommercialOperationStatus(oldData.commercialOperationStatusId);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCommercialOperationStatus();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              }),
            }}
          />
        </PapperBlock>
      </div>
    );
  }
}
StatusOfCommercialOperation.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
  getAllCommercialOperationStatus: PropTypes.func.isRequired,
  allCommercialOperationStatuss: PropTypes.array.isRequired,
  commercialOperationStatusResponse: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  addCommercialOperationStatus: PropTypes.func.isRequired,
  updateCommercialOperationStatus: PropTypes.func.isRequired,
  deleteCommercialOperationStatus: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  allCommercialOperationStatuss: state.getIn(['commercialOperationStatus']).allCommercialOperationStatuss,
  commercialOperationStatusResponse: state.getIn(['commercialOperationStatus']).commercialOperationStatusResponse,
  isLoading: state.getIn(['commercialOperationStatus']).isLoading,
  errors: state.getIn(['commercialOperationStatus']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCommercialOperationStatus,
  addCommercialOperationStatus,
  updateCommercialOperationStatus,
  deleteCommercialOperationStatus
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusOfCommercialOperation));
