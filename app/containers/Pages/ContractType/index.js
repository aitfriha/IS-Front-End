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
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThemeContext } from '../../App/ThemeWrapper';
import styles from './contractType-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import ContractTypeService from '../../Services/ContractTypeService';
import {
  getAllContractType,
  updateContractType,
  deleteContractType
} from '../../../redux/contractType/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class ContractType extends React.Component {
  state = {
    code: '',
    name: '',
    description: '',
    isDialogOpen: false,
    contractTypeIndex: 0
  };

  editingPromiseResolve = () => {};

  columns = [
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
            <IconButton onClick={() => this.handleOpenDialog(tableMeta)}>
              <EditIcon color="secondary" />
            </IconButton>
            <IconButton onClick={() => this.handleDeleteType(tableMeta)}>
              <DeleteIcon color="primary" />
            </IconButton>
          </React.Fragment>
        )
      }
    }
  ];

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
      code, name, description, contractTypeIndex
    } = this.state;
    const contractTypeData = allContractType[contractTypeIndex];
    const contractType = {
      contractTypeId: contractTypeData.contractTypeId,
      code,
      name,
      description
    };
    const promise = new Promise(resolve => {
      updateContractType(contractType);
      this.editingPromiseResolve = resolve;
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
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    this.setState({
      contractTypeIndex: index,
      code: allContractType[index].code,
      name: allContractType[index].name,
      description: allContractType[index].description,
      isDialogOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isDialogOpen: false
    });
  };

  handleDeleteType = tableMeta => {
    const {
      allContractType,
      getAllContractType,
      deleteContractType
    } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    const promise = new Promise(resolve => {
      deleteContractType(allContractType[index].contractTypeId);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllContractType();
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
      errorsContractType
    } = this.props;
    const {
      code, name, description, isDialogOpen
    } = this.state;
    const title = brand.name + ' - Types of staff contract';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allContractType}
          url="/app/hh-rr/contractType/create-contract-type"
          tooltip="add new staff contract type"
        />
      )
    };
    !isLoadingContractType
      && contractTypeResponse
      && this.editingPromiseResolve(contractTypeResponse);
    !isLoadingContractType
      && !contractTypeResponse
      && this.editingPromiseResolve(errorsContractType);
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
          open={isDialogOpen}
          disableBackdropClick
          disableEscapeKeyDown
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
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
            columns={this.columns}
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
  errorsContractType: state.getIn(['contractTypes']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateContractType,
    getAllContractType,
    deleteContractType
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
