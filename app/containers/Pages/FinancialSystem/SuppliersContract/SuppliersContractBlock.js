import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import { ThemeContext } from '../../../App/ThemeWrapper';
import PurchaseOrderAcceptanceService from '../../../Services/PurchaseOrderAcceptanceService';

const useStyles = makeStyles();

class SuppliersContractBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseOrderAcceptanceId: '',
      generatedPurchase: '',
      adminAcceptance: '',
      operationalAcceptance: '',
      datas: [],
      openPopUp: false,
      row: [],
      columns: [
        {
          label: 'Purchase Order Generated by',
          name: 'generatedPurchase',
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
          label: 'Administration Acceptance',
          name: 'adminAcceptance',
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
          label: 'Operational Acceptance',
          name: 'operationalAcceptance',
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
    PurchaseOrderAcceptanceService.getPurchaseOrderAcceptance().then(result => {
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
      const id = this.state.datas[index].purchaseOrderAcceptanceId;
      PurchaseOrderAcceptanceService.getPurchaseOrderAcceptanceById(id).then(result => {
        console.log(result);
        this.setState({
          purchaseOrderAcceptanceId: id,
          generatedPurchase: result.data.generatedPurchase,
          adminAcceptance: result.data.adminAcceptance,
          operationalAcceptance: result.data.operationalAcceptance,
          openPopUp: true
        });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].purchaseOrderAcceptanceId;
      console.log(id);
      // eslint-disable-next-line array-callback-return,react/destructuring-assignment
      PurchaseOrderAcceptanceService.deletePurchaseOrderAcceptance(id).then(result => {
        this.setState({ datas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    handleSave = () => {
      const {
        purchaseOrderAcceptanceId, generatedPurchase, adminAcceptance, operationalAcceptance
      } = this.state;
      const PurchaseOrderAcceptance = {
        purchaseOrderAcceptanceId, generatedPurchase, adminAcceptance, operationalAcceptance
      };
      PurchaseOrderAcceptanceService.updatePurchaseOrderAcceptance(PurchaseOrderAcceptance).then(result => {
        this.setState({ datas: result.data, openPopUp: false });
      });
    };

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      console.log(this.state);
      const {
        columns, openPopUp, datas,
        generatedPurchase, adminAcceptance, operationalAcceptance
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
            url="/app/gestion-financial/Add-Suppliers-Contract"
            tooltip="Add New Supplier Contract"
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="The Suppliers Contract List"
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
                <Grid item xs={12} md={6}>
                  <TextField
                    id="generatedPurchase"
                    label="Purchase Order Generated By"
                    variant="outlined"
                    name="generatedPurchase"
                    value={generatedPurchase}
                    required
                    fullWidth
                    onChange={this.handleChange}
                  />
                  <br />
                  <br />
                  <TextField
                    id="adminAcceptance"
                    label="Administration Acceptance By"
                    variant="outlined"
                    name="adminAcceptance"
                    value={adminAcceptance}
                    required
                    fullWidth
                    onChange={this.handleChange}
                  />
                  <br />
                  <br />
                  <TextField
                    id="operationalAcceptance"
                    label="Operational Acceptance By"
                    variant="outlined"
                    name="operationalAcceptance"
                    value={operationalAcceptance}
                    required
                    fullWidth
                    onChange={this.handleChange}
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
        </div>
      );
    }
}
const PurchaseOrderMapped = connect()(SuppliersContractBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <PurchaseOrderMapped changeTheme={changeTheme} classes={classes} />;
};
