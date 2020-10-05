import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  withStyles,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styles from './contractType-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import ContractTypeService from '../../Services/ContractTypeService';

class ContractType extends React.Component {
  state = {
    data: [],
    code: '',
    name: '',
    description: '',
    isDialogOpen: false,
    contractTypeIndex: 0
  };

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
    ContractTypeService.getAllContractTypes().then(({ data }) => {
      this.setState({
        data
      });
    });
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleUpdate = () => {
    const {
      code, name, description, data, contractTypeIndex
    } = this.state;
    const contractType = { code, name, description };
    console.log(data[contractTypeIndex]);
    ContractTypeService.updateContractType(
      data[contractTypeIndex].contractTypeId,
      contractType
    ).then(() => {
      const types = JSON.parse(JSON.stringify(data));
      types[contractTypeIndex] = {
        ...types[contractTypeIndex],
        code,
        name,
        description
      };
      console.log(types);
      this.setState({
        data: types,
        isDialogOpen: false
      });
    });
  };

  handleOpenDialog = tableMeta => {
    const { data } = this.state;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    this.setState({
      contractTypeIndex: index,
      code: data[index].code,
      name: data[index].name,
      description: data[index].description,
      isDialogOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isDialogOpen: false
    });
  };

  handleDeleteType = tableMeta => {
    const { data } = this.state;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    ContractTypeService.deleteContractType(data[index].contractTypeId).then(
      () => {
        this.setState({
          data: data.length > 1 ? data.splice(index, 1) : []
        });
      }
    );
  };

  render() {
    const { classes } = this.props;
    const {
      data, code, name, description, isDialogOpen
    } = this.state;
    const title = brand.name + ' - Types of contract';
    const { desc } = brand;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={data}
          url="/app/hh-rr/contractType/create-contract-type"
          tooltip="add new contract type"
        />
      )
    };

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
          <DialogTitle id="alert-dialog-title">Edit Contract Type</DialogTitle>
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
          title="Types of Contract"
          icon="ios-paper-outline"
          noMargin
        >
          <MUIDataTable
            title=""
            data={data}
            columns={this.columns}
            options={options}
          />
        </PapperBlock>
      </div>
    );
  }
}

ContractType.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContractType);
