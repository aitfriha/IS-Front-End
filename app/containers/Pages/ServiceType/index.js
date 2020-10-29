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
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import styles from '../Clients/clients-jss';
import notification from '../../../components/Notification/Notification';
// import styles from '../StaffContract/people-jss';
import {
  addCommercialServiceType, deleteCommercialServiceType,
  getAllCommercialServiceType,
  updateCommercialServiceType, updateDeleteCommercialServiceType
} from '../../../redux/serviceType/actions';
import EditServiceType from './EditServiceType';
import { getAllClient } from '../../../redux/client/actions';

/* MuiFormControl: {
  root: {
    '& label + div': {
      alignItems: 'flex-end',
          '&[role="radiogroup"]': {
        alignItems: 'flex-start',
      },
      paddingBottom: 4,
          '& input, > div, > select': {
        padding: '24px 8px 0',
      },
    },
  },
}, */
class serviceType extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.editingPromiseResolve2 = () => {
    };
    this.state = {
      openPopUp: false,
      operationCommercial: '',
      index: 0,
      serviceTypeNameCurrent: [],
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
        },
        {
          title: 'Related operation',
          field: 'operationCommercial',
          editable: 'never'
          /* cellStyle: { width: 155, maxWidth: 155 },
                    headerStyle: { width: 100, maxWidth: 180 } */
        }
      ]
    };
  }

  handleDetails = (data) => {
    const theserviceType1 = [];
    this.setState({ operationCommercial: (data.operationCommercial).filter((value, index, arr) => value !== ' , ') });
    this.setState({ openPopUp: true });
    theserviceType1.push(data.name);
    for (const key in this.props.allCommercialServiceType) {
      if (this.props.allCommercialServiceType[key].name === data.name) {
        this.setState({ serviceTypeNameCurrent: [this.props.allCommercialServiceType[key]] });
        break;
      }
    }
  }

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  deleteAndUpdateServiceType= () => {
    const theserviceType1 = [];
    const {
      operationCommercial, serviceTypeNameCurrent
    } = this.state;
    for (const key in serviceTypeNameCurrent) {
      theserviceType1.push(serviceTypeNameCurrent[key].name);
    }
    console.log('serviceTypeNameCurrent ', theserviceType1);
    console.log('operationCommercial ', operationCommercial);
    const { updateDeleteCommercialServiceType, getAllCommercialServiceType } = this.props;
    const promise = new Promise((resolve) => {
      updateDeleteCommercialServiceType(theserviceType1, operationCommercial);
      this.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        notification('success', result);
        getAllCommercialServiceType();
      } else {
        notification('danger', result);
      }
    });

    this.handleClose();
  };

  handleChangeServiceType= (ev, value) => {
    console.log(value);
    const theserviceType = [];
    for (const key in value) {
      for (const j in this.props.allCommercialServiceType) {
        if (this.props.allCommercialServiceType[j].name === value[key].name) {
          console.log('AAAAAAAAAAAAAA');
          theserviceType.push(this.props.allCommercialServiceType[j]);
          // break;
        }
      }
      // theserviceType.push(this.props.allCommercialServiceType[key]);
    }
    console.log(theserviceType);
    this.setState({ serviceTypeNameCurrent: theserviceType });
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllCommercialServiceType } = this.props;
    getAllCommercialServiceType();
  }

  render() {
    const title = brand.name + ' - Service  type';
    const description = brand.desc;
    const {
      columns, openPopUp, operationCommercial, serviceTypeNameCurrent, index
    } = this.state;
    const {
      // eslint-disable-next-line no-shadow
      classes, errors, isLoading, commercialServiceTypeResponse, addCommercialServiceType, getAllCommercialServiceType, allCommercialServiceType, updateCommercialServiceType, deleteCommercialServiceType
    } = this.props;
    (!isLoading && commercialServiceTypeResponse) && this.editingPromiseResolve(commercialServiceTypeResponse);
    (!isLoading && !commercialServiceTypeResponse) && this.editingPromiseResolve(errors);
    console.log(index);
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
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert('You saved ' + rowData.name)
              },
              {
                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, rowData) => this.handleDetails(rowData)
              }
            ]}
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
            <DialogTitle id="alert-dialog-slide-title"> Change Service type in Operation</DialogTitle>
            <DialogContent dividers>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Commercial Operation related"
                  variant="outlined"
                  name="name"
                  fullWidth
                  value={operationCommercial}
                  onChange={this.handleChange}
                  required
                  className={classes.textField}
                />
                <Autocomplete
                  multiple
                  className={classes.textField}
                  id="combo-box-demo"
                  options={allCommercialServiceType}
                  getOptionLabel={option => option.name}
                  // value={allCommercialServiceType.find(v => v.name === serviceTypeNameCurrent[0]) || ''}
                  value={serviceTypeNameCurrent}
                  onChange={this.handleChangeServiceType}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the country"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.deleteAndUpdateServiceType}
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
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
  deleteCommercialServiceType,
  updateDeleteCommercialServiceType
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(serviceType));
