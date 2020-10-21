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
  addCommercialServiceType, deleteCommercialServiceType,
  getAllCommercialServiceType,
  updateCommercialServiceType
} from '../../../redux/serviceType/actions';

const styles = {};

class serviceType extends React.Component {
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
    const { getAllCommercialServiceType } = this.props;
    getAllCommercialServiceType();
  }

  render() {
    const title = brand.name + ' - Service  type';
    const description = brand.desc;
    const {
      columns
    } = this.state;
    const {
      // eslint-disable-next-line no-shadow
      errors, isLoading, commercialServiceTypeResponse, addCommercialServiceType, getAllCommercialServiceType, allCommercialServiceType, updateCommercialServiceType, deleteCommercialServiceType
    } = this.props;
    (!isLoading && commercialServiceTypeResponse) && this.editingPromiseResolve(commercialServiceTypeResponse);
    (!isLoading && !commercialServiceTypeResponse) && this.editingPromiseResolve(errors);
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
        <PapperBlock title="Service Type" desc="" noMargin>
          {/* <StatusOfCommercialOperationBlock onSelected={this.handleChangeSelectedStatus} status={status} /> */}
          <MaterialTable
            title=""
            columns={columns}
            data={allCommercialServiceType && allCommercialServiceType}
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
                addCommercialServiceType(newData);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCommercialServiceType();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              }),
              onRowUpdate: (newData) => new Promise((resolve) => {
                // update CommercialServiceType unit action
                updateCommercialServiceType(newData);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCommercialServiceType();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              }),
              onRowDelete: oldData => new Promise((resolve) => {
                // delete CommercialServiceType action
                deleteCommercialServiceType(oldData.serviceTypeId);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCommercialServiceType();
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
serviceType.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
  getAllCommercialServiceType: PropTypes.func.isRequired,
  allCommercialServiceType: PropTypes.array.isRequired,
  commercialServiceTypeResponse: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  addCommercialServiceType: PropTypes.func.isRequired,
  updateCommercialServiceType: PropTypes.func.isRequired,
  deleteCommercialServiceType: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  allCommercialServiceType: state.getIn(['commercialServiceType']).allCommercialServiceType,
  commercialServiceTypeResponse: state.getIn(['commercialServiceType']).commercialServiceTypeResponse,
  isLoading: state.getIn(['commercialServiceType']).isLoading,
  errors: state.getIn(['commercialServiceType']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCommercialServiceType,
  addCommercialServiceType,
  updateCommercialServiceType,
  deleteCommercialServiceType
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(serviceType));
