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
import styles from './absenceType-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import {
  getAllAbsenceType,
  updateAbsenceType,
  deleteAbsenceType
} from '../../../redux/absenceType/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class AbsenceType extends React.Component {
  state = {
    code: '',
    name: '',
    description: '',
    isDialogOpen: false,
    absenceTypeIndex: 0
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
    const { changeTheme, getAllAbsenceType } = this.props;
    changeTheme('blueCyanTheme');
    getAllAbsenceType();
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleUpdate = () => {
    const { allAbsenceType, getAllAbsenceType, updateAbsenceType } = this.props;
    const {
      code, name, description, absenceTypeIndex
    } = this.state;
    const absenceTypeData = allAbsenceType[absenceTypeIndex];
    const absenceType = {
      absenceTypeId: absenceTypeData.absenceTypeId,
      code,
      name,
      description
    };
    const promise = new Promise(resolve => {
      updateAbsenceType(absenceType);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllAbsenceType();
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
    const { allAbsenceType } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    this.setState({
      absenceTypeIndex: index,
      code: allAbsenceType[index].code,
      name: allAbsenceType[index].name,
      description: allAbsenceType[index].description,
      isDialogOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isDialogOpen: false
    });
  };

  handleDeleteType = tableMeta => {
    const { allAbsenceType, getAllAbsenceType, deleteAbsenceType } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    const promise = new Promise(resolve => {
      deleteAbsenceType(allAbsenceType[index].absenceTypeId);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllAbsenceType();
      } else {
        notification('danger', result);
      }
    });
  };

  render() {
    const {
      classes,
      allAbsenceType,
      isLoadingAbsenceType,
      absenceTypeResponse,
      errorsAbsenceType
    } = this.props;
    const {
      code, name, description, isDialogOpen
    } = this.state;
    const title = brand.name + ' - Types of staff absence';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allAbsenceType}
          url="/app/hh-rr/absenceType/create-absence-type"
          tooltip="add new staff absence type"
        />
      )
    };
    !isLoadingAbsenceType
      && absenceTypeResponse
      && this.editingPromiseResolve(absenceTypeResponse);
    !isLoadingAbsenceType
      && !absenceTypeResponse
      && this.editingPromiseResolve(errorsAbsenceType);
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
            Edit Staff Absence Type
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
          title="Types of staff absence"
          icon="ios-paper-outline"
          noMargin
        >
          <MUIDataTable
            title=""
            data={allAbsenceType}
            columns={this.columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allAbsenceType: state.getIn(['absenceTypes']).allAbsenceType,
  absenceTypeResponse: state.getIn(['absenceTypes']).absenceTypeResponse,
  isLoadingAbsenceType: state.getIn(['absenceTypes']).isLoading,
  errorsAbsenceType: state.getIn(['absenceTypes']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateAbsenceType,
    getAllAbsenceType,
    deleteAbsenceType
  },
  dispatch
);

const AbsenceTypeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenceType);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AbsenceTypeMapped changeTheme={changeTheme} classes={classes} />;
};
