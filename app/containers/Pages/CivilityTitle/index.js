import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { isString } from 'lodash';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import notification from '../../../components/Notification/Notification';
// import styles from '../StaffContract/people-jss';
import {
  addCivilityTitleStatus, deleteCivilityTitleStatus,
  getAllCivilityTitleStatus, updateCivilityTitleStatus
} from '../../../redux/civilityTitle/actions';
import { ThemeContext } from "../../App/ThemeWrapper";
import { makeStyles } from "@material-ui/core/styles";

const styles = {};
const useStyles = makeStyles();
class StatusOfCommercialOperation extends React.Component {
  constructor(props) {
      super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      openPopUp: false,
      rowDataCivilityTitleId: '',
      message: '',
      columns: [
        {
          // eslint-disable-next-line no-useless-concat
          title: 'Name' + '*',
          field: 'name'
        },
        {
          // eslint-disable-next-line no-useless-concat
          title: 'Code' + '*',
          field: 'code'
        }
      ]
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllCivilityTitleStatus, changeTheme } = this.props;
    changeTheme('redTheme');
    getAllCivilityTitleStatus();
  }

delete = (event, rowData) => {
  this.setState({ rowDataCivilityTitleId: rowData.civilityTitleId });
  if (rowData.related == true) {
    this.setState({ message: 'this title type is related to contact !' });
  } else {
    this.setState({ message: 'Are you sure you want to delete ?' });
  }
  this.setState({ openPopUp: true });
}

handleClose = (event, rowData) => {
  this.setState({ openPopUp: false });
}

deleteConfirme= () => {
  const { rowDataCivilityTitleId } = this.state;
  console.log(rowDataCivilityTitleId);
  const { deleteCivilityTitleStatus, getAllCivilityTitleStatus } = this.props;
  new Promise((resolve) => {
    // delete CommercialOperationStatus action
    deleteCivilityTitleStatus(rowDataCivilityTitleId);
    this.editingPromiseResolve = resolve;
  }).then((result) => {
    if (isString(result)) {
      // Fetch data
      getAllCivilityTitleStatus();
      notification('success', result);
    } else {
      notification('danger', result);
    }
  });
  this.setState({ openPopUp: false });
};

render() {
  const title = brand.name + ' - Status Of Commercial Operation';
  const description = brand.desc;
  const {
    columns, openPopUp, message
  } = this.state;
  const {
    // eslint-disable-next-line no-shadow
    errors, isLoading, civilityTitleResponse, addCivilityTitleStatus, getAllCivilityTitleStatus, allCivilityTitles, updateCivilityTitleStatus, deleteCivilityTitleStatus,logedUser
  } = this.props;
  const thelogedUser = JSON.parse(logedUser);
  (!isLoading && civilityTitleResponse) && this.editingPromiseResolve(civilityTitleResponse);
  (!isLoading && !civilityTitleResponse) && this.editingPromiseResolve(errors);
  let disableDelete = true;
  if(thelogedUser.userRoles[0].actionsNames.commercial_titleType_add){
    disableDelete=false;
  }
  let disableExport = false;
  if(thelogedUser.userRoles[0].actionsNames.commercial_titleType_export){
    disableExport=true;
  }
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
      <PapperBlock title="Title type Management" desc="" noMargin>
        <MaterialTable
          title=""
          columns={columns}
          data={allCivilityTitles && allCivilityTitles}
          options={{
            exportFileName: 'title type List',
            // filtering: true,
            // draggable: true,
            exportButton: disableExport,
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
            onRowAdd: thelogedUser.userRoles[0].actionsNames.commercial_titleType_add ? (newData => new Promise((resolve) => {
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
            })):null,
            onRowUpdate: thelogedUser.userRoles[0].actionsNames.commercial_titleType_modify ? ((newData) => new Promise((resolve) => {
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
            })):null,
            /*              onRowDelete: oldData => new Promise((resolve) => {
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
              }), */

          }}
          actions={[
            {
              icon: 'delete',
              tooltip: 'Delete User',
              disabled: disableDelete,
              onClick: (event, rowData) => this.delete(event, rowData)
            }
          ]}
        />
      </PapperBlock>
      <Dialog
        open={openPopUp}
        keepMounted
        scroll="body"
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth=""
        maxWidth=""
      >
        <DialogTitle id="alert-dialog-slide-title"> Delete title type </DialogTitle>
        <DialogContent dividers>
          {message !== 'Are you sure you want to delete ?' ? (
            <p style={{ color: 'red' }}>{message}</p>
          ) : (
            <p>{message}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={this.handleClose}>
              Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.deleteConfirme}
          >
              Delete
          </Button>
        </DialogActions>
      </Dialog>
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
  errors: state.getIn(['civilityTitle']).errors,

  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCivilityTitleStatus,
  addCivilityTitleStatus,
  updateCivilityTitleStatus,
  deleteCivilityTitleStatus
}, dispatch);

const StatusOfCommercialOperationMapped = connect(
    mapStateToProps,
    mapDispatchToProps
)(StatusOfCommercialOperation);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <StatusOfCommercialOperationMapped changeTheme={changeTheme} classes={classes} />;
};