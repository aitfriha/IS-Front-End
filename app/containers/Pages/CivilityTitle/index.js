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
  addCivilityTitleStatus, deleteCivilityTitleStatus,
  getAllCivilityTitleStatus, updateCivilityTitleStatus
} from '../../../redux/civilityTitle/actions';

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
          title: 'Code' + '*',
          field: 'code',
          /* cellStyle: { width: 100, maxWidth: 100 },
          headerStyle: { width: 130, maxWidth: 130 } */
        }
      ]
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllCivilityTitleStatus } = this.props;
    getAllCivilityTitleStatus();
  }

  render() {
    const title = brand.name + ' - Status Of Commercial Operation';
    const description = brand.desc;
    const {
      columns
    } = this.state;
    const {
      // eslint-disable-next-line no-shadow
      errors, isLoading, civilityTitleResponse, addCivilityTitleStatus, getAllCivilityTitleStatus, allCivilityTitles, updateCivilityTitleStatus, deleteCivilityTitleStatus
    } = this.props;
    (!isLoading && civilityTitleResponse) && this.editingPromiseResolve(civilityTitleResponse);
    (!isLoading && !civilityTitleResponse) && this.editingPromiseResolve(errors);
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
            data={allCivilityTitles && allCivilityTitles}
            options={{
              exportFileName: 'Coivility Title List',
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
                addCivilityTitleStatus(newData);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCivilityTitleStatus();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              }),
              onRowUpdate: (newData) => new Promise((resolve) => {
                // update CommercialOperationStatus unit action
                updateCivilityTitleStatus(newData);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCivilityTitleStatus();
                  notification('success', result);
                } else {
                  notification('danger', result);
                }
              }),
              onRowDelete: oldData => new Promise((resolve) => {
                // delete CommercialOperationStatus action
                deleteCivilityTitleStatus(oldData.civilityTitleId);
                this.editingPromiseResolve = resolve;
              }).then((result) => {
                if (isString(result)) {
                  // Fetch data
                  getAllCivilityTitleStatus();
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
  getAllCivilityTitleStatus: PropTypes.func.isRequired,
  allCivilityTitles: PropTypes.array.isRequired,
  civilityTitleResponse: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  addCivilityTitleStatus: PropTypes.func.isRequired,
  updateCivilityTitleStatus: PropTypes.func.isRequired,
  deleteCivilityTitleStatus: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  allCivilityTitles: state.getIn(['civilityTitle']).allCivilityTitles,
  civilityTitleResponse: state.getIn(['civilityTitle']).civilityTitleResponse,
  isLoading: state.getIn(['civilityTitle']).isLoading,
  errors: state.getIn(['civilityTitle']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCivilityTitleStatus,
  addCivilityTitleStatus,
  updateCivilityTitleStatus,
  deleteCivilityTitleStatus
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusOfCommercialOperation));
