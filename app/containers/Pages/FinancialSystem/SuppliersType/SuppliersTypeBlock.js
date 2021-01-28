import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import { ThemeContext } from '../../../App/ThemeWrapper';
import SuppliersTypeService from '../../../Services/SuppliersTypeService';

const useStyles = makeStyles();

class SuppliersTypeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierTypeId: '',
      name: '',
      description: '',
      operationAssociated: false,
      internalOrder: false,
      datas: [],
      openPopUp: false,
      row: [],
      columns: [
        {
          label: 'Name',
          name: 'name',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          label: 'Description',
          name: 'description',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          label: 'Operation Associated',
          name: 'operationAssociated',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  (value ? 'Yes' : 'No')
                }
              </React.Fragment>
            ),
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          label: 'Internal Order',
          name: 'internalOrder',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  (value ? 'Yes' : 'No')
                }
              </React.Fragment>
            ),
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          label: 'Actions',
          name: 'Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                <IconButton onClick={() => this.handleDetails(tableMeta)}>
                  <DetailsIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => this.handleDelete(tableMeta)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

  componentDidMount() {
    SuppliersTypeService.getSuppliersType().then(result => {
      console.log(result);
      this.setState({ datas: result.data });
    });
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

    // eslint-disable-next-line react/sort-comp
    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].supplierTypeId;
      SuppliersTypeService.getSuppliersTypeById(id).then(result => {
        console.log(result);
        this.setState({
          supplierTypeId: id,
          name: result.data.name,
          description: result.data.description,
          operationAssociated: result.data.operationAssociated,
          internalOrder: result.data.internalOrder,
          openPopUp: true
        });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].supplierTypeId;
      console.log(id);
      // eslint-disable-next-line array-callback-return,react/destructuring-assignment
      SuppliersTypeService.deleteSuppliersType(id).then(result => {
        this.setState({ datas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    handleSave = () => {
      const {
        supplierTypeId, name, description, operationAssociated, internalOrder
      } = this.state;
      const SupplierType = {
        supplierTypeId, name, description, operationAssociated, internalOrder
      };
      SuppliersTypeService.updateSuppliersType(SupplierType).then(result => {
        this.setState({ datas: result.data, openPopUp: false });
      });
    };

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleCheck = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.operationAssociated;
      this.setState({ operationAssociated: ok });
    }

    handleCheck2 = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.internalOrder;
      this.setState({ internalOrder: ok });
    }

    render() {
      console.log(this.state);
      const {
        columns, openPopUp, datas, openWarning,
        name, description, operationAssociated, internalOrder
      } = this.state;
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add-Suppliers"
            tooltip="Add New Supplier Type"
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="The Suppliers Type List"
            data={datas}
            columns={columns}
            options={options}
          />
          <Dialog
            open={openPopUp}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> View Details</DialogTitle>
            <DialogContent dividers>
              <Grid
                container
                spacing={6}
                alignItems="flex-start"
                direction="row"
                justify="center"
              >
                <Grid item xs={10} md={6}>
                  <TextField
                    id="outlined-name"
                    label="Supplier Name"
                    variant="outlined"
                    name="name"
                    value={name}
                    required
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={10} md={6}>
                  <TextField
                    id="outlined-description"
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={description}
                    required
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={6}
                alignItems="flex-start"
                direction="row"
                justify="center"
              >
                <Grid item xs={10} md={6}>
                  <FormControlLabel
                    id="operationAssociated"
                    name="operationAssociated"
                    value={operationAssociated}
                    control={<Checkbox color="primary" checked={operationAssociated} onChange={this.handleCheck} />}
                    label="● Associated with Commercial Operation "
                    labelPlacement="start"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    id="internalOrder"
                    name="internalOrder"
                    value={internalOrder}
                    control={<Checkbox color="primary" checked={internalOrder} onChange={this.handleCheck2} />}
                    label="● Had an Internal Order "
                    labelPlacement="start"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                            Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                            save
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openWarning}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth=""
            maxWidth=""
          >
            <DialogTitle id="alert-dialog-slide-title"> Operation Denied </DialogTitle>
            <DialogContent dividers>
              <Typography
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  opacity: 0.4,
                  marginRight: 20,
                  width: '100%'
                }}
              >
                 This Currency is used in other module of this application
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}
const SuppliersTypeMapped = connect()(SuppliersTypeBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <SuppliersTypeMapped changeTheme={changeTheme} classes={classes} />;
};
