import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';

import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Transition from '../../../components/Transition/transition';
import { ThemeContext } from '../../App/ThemeWrapper';
import styles from './contractModel-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import {
  getAllContractModel,
  updateContractModel,
  deleteContractModel
} from '../../../redux/contractModel/actions';
import { getAllStaffContractByContractModel } from '../../../redux/staffContract/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class ContractModel extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve1 = () => {};
    this.editingPromiseResolve2 = () => {};
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      code: '',
      name: '',
      description: '',
      isDialogOpen: false,
      isDeleteDialogOpen: false,
      isRelated: false,
      contractModelSelected: {},
      replaceContractModelList: [],
      oldId: '',
      newId: '',
      columns: [
        {
          name: 'contractModelId',
          label: 'Contract Model Id',
          options: {
            display: false,
            filter: false
          }
        },
        {
          name: 'code',
          label: 'Code',
          options: {
            filter: true
          }
        },
        {
          label: 'Name',
          name: 'name',
          options: {
            filter: true
          }
        },
        {
          label: 'Description',
          name: 'description',
          options: {
            filter: true
          }
        },
        {
          label: ' ',
          name: ' ',
          options: {
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {thelogedUser.userRoles[0].actionsNames.hh_contractModels_modify
                  ? (
                    <IconButton onClick={() => this.handleOpenDialog(tableMeta)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                  ) : null}
                {thelogedUser.userRoles[0].actionsNames.hh_contractModels_delete
                  ? (
                    <IconButton onClick={() => this.handleOpenDeleteDialog(tableMeta)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  ) : null}
              </React.Fragment>
            )
          }
        }
      ]
    };
  }


  componentDidMount() {
    const { changeTheme, getAllContractModel } = this.props;
    changeTheme('blueCyanTheme');
    getAllContractModel();
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleUpdate = () => {
    const {
      allContractModel,
      getAllContractModel,
      updateContractModel
    } = this.props;
    const {
      code, name, description, contractModelSelected
    } = this.state;
    const contractModel = {
      contractModelId: contractModelSelected.contractModelId,
      code,
      name,
      description
    };
    const promise = new Promise(resolve => {
      updateContractModel(contractModel);
      this.editingPromiseResolve1 = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllContractModel();
        console.log(result);
        this.setState({
          isDialogOpen: false
        });
      } else {
        console.log(result);
        notification('danger', result);
      }
    });
  };

  handleOpenDialog = tableMeta => {
    const { allContractModel } = this.props;
    const contractModelSelected = allContractModel.filter(
      contractModel => contractModel.contractModelId === tableMeta.rowData[0]
    )[0];
    this.setState({
      contractModelSelected,
      code: contractModelSelected.code,
      name: contractModelSelected.name,
      description: contractModelSelected.description,
      isDialogOpen: true
    });
  };

  /*  handleOpenDeleteDialog = tableMeta => {
    const { allContractModel, getAllStaffContractByContractModel } = this.props;
    const promise = new Promise(resolve => {
      // get client information
      getAllStaffContractByContractModel(tableMeta.rowData[0]);
      this.editingPromiseResolve2 = resolve;
    });
    promise.then(result => {
      if (this.props.allStaffContractByContractModel.length === 0) {
        this.setState({
          isDeleteDialogOpen: true,
          isRelated: false,
          oldId: tableMeta.rowData[0]
        });
      } else {
        const replaceContractModelList = allContractModel.filter(
            model => model.contractModelId !== tableMeta.rowData[0]
        );

        this.setState({
          isDeleteDialogOpen: true,
          isRelated: true,
          oldId: tableMeta.rowData[0],
          replaceContractModelList
        });
      }
    });
  }; */
  handleOpenDeleteDialog = tableMeta => {
    const { allContractModel, getAllStaffContractByContractModel } = this.props;
    const promise = new Promise(resolve => {
      // get client information
      getAllStaffContractByContractModel(tableMeta.rowData[0]);
      this.editingPromiseResolve2 = resolve;
    });
    promise.then(result => {
      if (this.props.allStaffContractByContractModel.length === 0) {
        this.setState({
          isDeleteDialogOpen: true,
          isRelated: false,
          oldId: tableMeta.rowData[0]
        });
      } else {
        const replaceContractModelList = allContractModel.filter(
          model => model.contractModelId !== tableMeta.rowData[0]
        );

        this.setState({
          isDeleteDialogOpen: true,
          isRelated: true,
          oldId: tableMeta.rowData[0],
          replaceContractModelList
        });
      }
    });
  };

  handleClose = () => {
    this.setState({
      isDialogOpen: false,
      isDeleteDialogOpen: false,
      newId: ''
    });
  };

  handleDeleteModel = () => {
    const { getAllContractModel, deleteContractModel } = this.props;
    const { oldId, newId } = this.state;
    const promise = new Promise(resolve => {
      deleteContractModel(oldId, newId);
      this.editingPromiseResolve1 = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllContractModel();
        this.handleClose();
      } else {
        notification('danger', result);
      }
    });
  };

  render() {
    const {
      classes,
      allContractModel,
      isLoadingContractModel,
      contractModelResponse,
      errorContractModel,
      isLoadingStaffContract,
      staffContractResponse,
      errorStaffContract,
      logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.hh_contractModels_export) {
      exportButton = true;
    }
    const {
      code,
      name,
      description,
      isDialogOpen,
      isDeleteDialogOpen,
      isRelated,
      replaceContractModelList,
      newId,
      columns
    } = this.state;
    const title = brand.name + ' - Contract Models';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      download: exportButton,
      print: exportButton,
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allContractModel}
          url="/app/hh-rr/contractModel/create-contract-model"
          tooltip="add new contract model"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.hh_contractModels_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.hh_contractModels_export}
        />
      )
    };
    !isLoadingContractModel
      && contractModelResponse
      && this.editingPromiseResolve1(contractModelResponse);
    !isLoadingContractModel
      && !contractModelResponse
      && this.editingPromiseResolve1(errorContractModel);

    !isLoadingStaffContract
      && staffContractResponse
      && this.editingPromiseResolve2(staffContractResponse);
    !isLoadingStaffContract
      && !staffContractResponse
      && this.editingPromiseResolve2(errorStaffContract);
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={desc} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={desc} />
        </Helmet>
        <Dialog
          open={isDeleteDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">
            Delete Contract Model
          </DialogTitle>
          <DialogContent>
            {isRelated ? (
              <div>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                >
                  this model is related to some contracts, choose an other
                  contract model to replace it:
                </Typography>
                <div>
                  <FormControl
                    className={classes.formControl}
                    required
                    style={{ width: '30%' }}
                  >
                    <InputLabel>Contract model</InputLabel>
                    <Select
                      name="newId"
                      value={newId}
                      onChange={this.handleChange}
                    >
                      {replaceContractModelList.map(model => (
                        <MenuItem
                          key={model.code}
                          value={model.contractModelId}
                        >
                          {model.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#dc3545',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '14px'
                  }}
                >
                  Notice that all the staff contract history related to this
                  contract model will be deleted permanently
                </Typography>
              </div>
            ) : (
              <Typography
                variant="subtitle1"
                style={{
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '17px'
                }}
              >
                this model is not related to any contract, are you sure you want
                to delete this model?
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            {isRelated ? (
              <Button
                color="primary"
                disabled={newId === ''}
                onClick={this.handleDeleteModel}
              >
                Replace and delete
              </Button>
            ) : (
              <Button color="primary" onClick={this.handleDeleteModel}>
                Delete
              </Button>
            )}
          </DialogActions>
        </Dialog>
        <Dialog
          open={isDialogOpen}
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-title">Edit Contract Model</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Code"
              variant="outlined"
              name="code"
              value={code}
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={name}
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              value={description}
              fullWidth
              className={classes.textField}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleUpdate}
              disabled={!code || !name}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <PapperBlock title="Contract Models" icon="ios-paper-outline" noMargin>
          <MUIDataTable
            title=""
            data={allContractModel}
            columns={columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allContractModel: state.getIn(['contractModels']).allContractModel,
  contractModelResponse: state.getIn(['contractModels']).contractModelResponse,
  isLoadingContractModel: state.getIn(['contractModels']).isLoading,
  errorContractModel: state.getIn(['contractModels']).errors,
  staffContractResponse: state.getIn(['staffContracts']).staffContractResponse,
  isLoadingStaffContract: state.getIn(['staffContracts']).isLoading,
  errorStaffContract: state.getIn(['staffContracts']).errors,
  allStaffContractByContractModel: state.getIn(['staffContracts'])
    .allStaffContractByContractModel,
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateContractModel,
    getAllContractModel,
    deleteContractModel,
    getAllStaffContractByContractModel
  },
  dispatch
);

const ContractModelMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractModel);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <ContractModelMapped changeTheme={changeTheme} classes={classes} />;
};
