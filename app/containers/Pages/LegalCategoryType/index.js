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
import styles from './legalCategoryType-jss';
import { ThemeContext } from '../../App/ThemeWrapper';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import {
  getAllLegalCategoryType,
  updateLegalCategoryType,
  deleteLegalCategoryType
} from '../../../redux/legalCategoryType/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class LegalCategoryType extends React.Component {
  state = {
    name: '',
    functions: '',
    isDialogOpen: false,
    legalCategoryTypeIndex: 0
  };

  editingPromiseResolve = () => {};

  columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true
      }
    },
    {
      label: 'Functions',
      name: 'functions',
      options: {
        filter: true
      }
    },
    {
      label: 'Company',
      name: 'companyName',
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
    const { changeTheme, getAllLegalCategoryType } = this.props;
    changeTheme('blueCyanTheme');
    getAllLegalCategoryType();
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleUpdate = () => {
    const {
      allLegalCategoryType,
      getAllLegalCategoryType,
      updateLegalCategoryType
    } = this.props;
    const { name, functions, legalCategoryTypeIndex } = this.state;
    const legalCategoryTypeData = allLegalCategoryType[legalCategoryTypeIndex];
    const legalCategoryType = {
      legalCategoryTypeId: legalCategoryTypeData.legalCategoryTypeId,
      name,
      functions
    };
    const promise = new Promise(resolve => {
      updateLegalCategoryType(legalCategoryType);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllLegalCategoryType();
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
    const { allLegalCategoryType } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    this.setState({
      legalCategoryTypeIndex: index,
      name: allLegalCategoryType[index].name,
      functions: allLegalCategoryType[index].functions,
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
      allLegalCategoryType,
      getAllLegalCategoryType,
      deleteLegalCategoryType
    } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    const promise = new Promise(resolve => {
      deleteLegalCategoryType(allLegalCategoryType[index].legalCategoryTypeId);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllLegalCategoryType();
      } else {
        notification('danger', result);
      }
    });
  };

  render() {
    const {
      classes,
      allLegalCategoryType,
      isLoadingLegalCategoryType,
      legalCategoryTypeResponse,
      errorLegalCategoryType
    } = this.props;
    const { name, functions, isDialogOpen } = this.state;
    const title = brand.name + ' - Types of legal category';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allLegalCategoryType}
          url="/app/hh-rr/legalCategoryType/create-legal-category-type"
          tooltip="add new legal category type"
        />
      )
    };
    !isLoadingLegalCategoryType
      && legalCategoryTypeResponse
      && this.editingPromiseResolve(legalCategoryTypeResponse);
    !isLoadingLegalCategoryType
      && !legalCategoryTypeResponse
      && this.editingPromiseResolve(errorLegalCategoryType);
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
            Edit Legal Category Type
          </DialogTitle>
          <DialogContent>
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
              label="Functions"
              variant="outlined"
              name="functions"
              value={functions}
              fullWidth
              required
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
              disabled={!functions || !name}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <PapperBlock
          title="Types of Legal Category"
          icon="ios-paper-outline"
          noMargin
        >
          <MUIDataTable
            title=""
            data={allLegalCategoryType}
            columns={this.columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allLegalCategoryType: state.getIn(['legalCategoryTypes'])
    .allLegalCategoryType,
  legalCategoryTypeResponse: state.getIn(['legalCategoryTypes'])
    .legalCategoryTypeResponse,
  isLoadingLegalCategoryType: state.getIn(['legalCategoryTypes']).isLoading,
  errorLegalCategoryType: state.getIn(['legalCategoryTypes']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateLegalCategoryType,
    getAllLegalCategoryType,
    deleteLegalCategoryType
  },
  dispatch
);

const LegalCategoryTypeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(LegalCategoryType);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <LegalCategoryTypeMapped changeTheme={changeTheme} classes={classes} />
  );
};
