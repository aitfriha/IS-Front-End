import React, { useContext } from 'react';
import MaterialTable from 'material-table';

import { PropTypes } from 'prop-types';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { makeStyles } from '@material-ui/core/styles';
import notification from '../../../../components/Notification/Notification';
// import HelmetCustom from '../../../../components/HelmetCustom/HelmetCustom';
import localizationMaterialTable from '../../../../api/localizationMaterialUI/localizationMaterialTable';


import {
  addAssignmentType,
  updateAssignmentType,
  deleteAssignmentType,
  getAllAssignmentTypes
} from '../../../../redux/assignmentType/actions';

import { ThemeContext } from '../../../App/ThemeWrapper';


const styles = {};

const useStyles = makeStyles((theme) => {

});
const title = brand.name + ' - Weekly Report';
const description = brand.desc;

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
    const { changeTheme } = this.props;
    changeTheme('greenTheme');

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
      location, intl, errors, isLoading, assignmentTypeResponse, getAllAssignmentTypes, assignmentTypes, addAssignmentType, updateAssignmentType, deleteAssignmentType, logedUser
    } = this.props;

    const { columns } = this.state;
    const thelogedUser = JSON.parse(logedUser);
    // Sent resolve to editing promises
    (!isLoading && assignmentTypeResponse) && this.editingPromiseResolve(assignmentTypeResponse);
    (!isLoading && !assignmentTypeResponse) && this.editingPromiseResolve(errors);

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
            onRowAdd: thelogedUser.userRoles[0].actionsNames.operativeModule_AssignmentType_create ? (newData => new Promise((resolve) => {
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
            })) : null,
            onRowUpdate: thelogedUser.userRoles[0].actionsNames.operativeModule_AssignmentType_modify ? (newData => new Promise((resolve) => {
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
            })) : null,
            onRowDelete: thelogedUser.userRoles[0].actionsNames.operativeModule_AssignmentType_delete ? (oldData => new Promise((resolve) => {
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
            })) : null
          }}
        />
      </div>
    );
  }
}

AssignmentType.propTypes = {
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  assignmentTypeResponse: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  assignmentTypes: state.getIn(['assignmentType']).assignmentTypes,
  assignmentTypeResponse: state.getIn(['assignmentType']).assignmentTypeResponse,
  isLoading: state.getIn(['assignmentType']).isLoading,
  errors: state.getIn(['assignmentType']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllAssignmentTypes,
  addAssignmentType,
  updateAssignmentType,
  deleteAssignmentType
}, dispatch);

const AssignmentTypeMapped = connect(mapStateToProps, mapDispatchToProps)(injectIntl(AssignmentType));

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AssignmentTypeMapped changeTheme={changeTheme} classes={classes} />;
};

// export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(AssignmentType)));
