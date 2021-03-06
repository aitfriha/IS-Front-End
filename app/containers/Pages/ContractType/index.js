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
import styles from './contractType-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import {
  getAllContractType,
  updateContractType,
  deleteContractType
} from '../../../redux/contractType/actions';
import { getAllStaffContractByContractType } from '../../../redux/staffContract/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class ContractType extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      code: '',
      name: '',
      description: '',
      isDialogOpen: false,
      isDeleteDialogOpen: false,
      isRelated: false,
      contractTypeSelected: {},
      replaceContractTypeList: [],
      oldId: '',
      newId: '',
      columns: [
        {
          name: 'contractTypeId',
          label: 'Contract Type Id',
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
          label: 'Country',
          name: 'countryName',
          options: {
            filter: true
          }
        },
        {
          label: 'State',
          name: 'stateName',
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
                {thelogedUser.userRoles[0].actionsNames.hh_typesOfContracts_modify
                  ? (
                    <IconButton onClick={() => this.handleOpenDialog(tableMeta)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                  ) : null}
                {thelogedUser.userRoles[0].actionsNames.hh_typesOfContracts_delete
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

    this.editingPromiseResolve1 = () => {
    };

    this.editingPromiseResolve2 = () => {
    };
  }

  componentDidMount() {
    const { changeTheme, getAllContractType } = this.props;
    changeTheme('blueCyanTheme');
    getAllContractType();
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleUpdate = () => {
    const {
      allContractType,
      getAllContractType,
      updateContractType
    } = this.props;
    const {
      code, name, description, contractTypeSelected
    } = this.state;
    const contractType = {
      contractTypeId: contractTypeSelected.contractTypeId,
      code,
      name,
      description
    };
    const promise = new Promise(resolve => {
      updateContractType(contractType);
      this.editingPromiseResolve1 = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllContractType();
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
    const { allContractType } = this.props;
    const contractTypeSelected = allContractType.filter(
      contractType => contractType.contractTypeId === tableMeta.rowData[0]
    )[0];
    this.setState({
      contractTypeSelected,
      code: contractTypeSelected.code,
      name: contractTypeSelected.name,
      description: contractTypeSelected.description,
      isDialogOpen: true
    });
  };

  handleOpenDeleteDialog = tableMeta => {
    const { allContractType, getAllStaffContractByContractType } = this.props;
    const contractTypeSelected = allContractType.filter(
      contractType => contractType.contractTypeId === tableMeta.rowData[0]
    )[0];
    const promise = new Promise(resolve => {
      // get client information
      getAllStaffContractByContractType(contractTypeSelected.contractTypeId);
      this.editingPromiseResolve2 = resolve;
    });
    promise.then(result => {
      if (this.props.allStaffContractByContractType.length === 0) {
        this.setState({
          isDeleteDialogOpen: true,
          isRelated: false,
          oldId: contractTypeSelected.contractTypeId
        });
      } else {
        const replaceContractTypeList = allContractType.filter(
          type => type.contractTypeId !== contractTypeSelected.contractTypeId
            && type.stateName === contractTypeSelected.stateName
        );
        this.setState({
          isDeleteDialogOpen: true,
          isRelated: true,
          oldId: contractTypeSelected.contractTypeId,
          replaceContractTypeList
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

  handleDeleteType = () => {
    const { getAllContractType, deleteContractType } = this.props;
    const { oldId, newId } = this.state;
    const promise = new Promise(resolve => {
      deleteContractType(oldId, newId);
      this.editingPromiseResolve1 = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllContractType();
        this.handleClose();
      } else {
        notification('danger', result);
      }
    });
  };

  render() {
    const {
      classes,
      allContractType,
      isLoadingContractType,
      contractTypeResponse,
      errorContractType,
      isLoadingStaffContract,
      staffContractResponse,
      errorStaffContract,
      logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    const {
      code,
      name,
      description,
      isDialogOpen,
      isDeleteDialogOpen,
      isRelated,
      replaceContractTypeList,
      newId,
      columns
    } = this.state;
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.hh_typesOfContracts_export) {
      exportButton = true;
    }
    const title = brand.name + ' - Types of staff contract';
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
          csvData={allContractType}
          url="/app/hh-rr/contractType/create-contract-type"
          tooltip="add new staff contract type"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.hh_typesOfContracts_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.hh_typesOfContracts_export}
        />
      )
    };
    !isLoadingContractType
      && contractTypeResponse
      && this.editingPromiseResolve1(contractTypeResponse);
    !isLoadingContractType
      && !contractTypeResponse
      && this.editingPromiseResolve1(errorContractType);

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
            Delete Contract Type
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
                  this type is related to some contracts, choose an other
                  contract type to replace it:
                </Typography>
                <div>
                  <FormControl
                    className={classes.formControl}
                    required
                    style={{ width: '30%' }}
                  >
                    <InputLabel>Contract type</InputLabel>
                    <Select
                      name="newId"
                      value={newId}
                      onChange={this.handleChange}
                    >
                      {replaceContractTypeList.map(type => (
                        <MenuItem key={type.code} value={type.contractTypeId}>
                          {type.name}
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
                  contract type will be deleted permanently
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
                this type is not related to any contract, are you sure you want
                to delete this type?
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
                onClick={this.handleDeleteType}
              >
                Replace and delete
              </Button>
            ) : (
              <Button color="primary" onClick={this.handleDeleteType}>
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
          <DialogTitle id="alert-dialog-title">
            Edit Staff Contract Type
          </DialogTitle>
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
        <PapperBlock
          title="Types of staff contract"
          icon="ios-paper-outline"
          noMargin
        >
          <MUIDataTable
            title=""
            data={allContractType}
            columns={columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allContractType: state.getIn(['contractTypes']).allContractType,
  contractTypeResponse: state.getIn(['contractTypes']).contractTypeResponse,
  isLoadingContractType: state.getIn(['contractTypes']).isLoading,
  errorContractType: state.getIn(['contractTypes']).errors,
  staffContractResponse: state.getIn(['staffContracts']).staffContractResponse,
  isLoadingStaffContract: state.getIn(['staffContracts']).isLoading,
  errorStaffContract: state.getIn(['staffContracts']).errors,
  allStaffContractByContractType: state.getIn(['staffContracts'])
    .allStaffContractByContractType,
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateContractType,
    getAllContractType,
    deleteContractType,
    getAllStaffContractByContractType
  },
  dispatch
);

const ContractTypeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractType);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <ContractTypeMapped changeTheme={changeTheme} classes={classes} />;
};
