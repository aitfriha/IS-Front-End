import React from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Dialog, DialogContent, DialogTitle
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import BillService from '../../../Services/BillService';
import EditBill from './editBill';

class BillingBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopUp: false,
      datas: [],
      bill: {},
      columns: [
        {
          label: ' ',
          name: 'state',
          options: {
            customBodyRender: (value) => (
              <React.Fragment>
                <IconButton>
                  <RadioButtonUncheckedIcon style={{
                    backgroundColor: value === 'Yes' ? 'green' : (value === 'Zombie' ? 'orange' : 'red'),
                    color: value === 'Yes' ? 'green' : (value === 'Zombie' ? 'orange' : 'red'),
                    borderRadius: '100%'
                  }}
                  />
                </IconButton>
              </React.Fragment>
            )
          }
        },
        {
          name: 'code',
          label: 'Code',
          options: {
            filter: true
          }
        },
        /*        {
          name: 'billNumber',
          label: 'Bill Number',
          options: {
            filter: true
          }
        },  */
        {
          name: 'billingDate',
          label: 'Invoice Date',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value.toString().slice(0, 10)
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'paymentDay',
          label: 'Bill Date',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value.toString().slice(0, 10)
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'paymentDate',
          label: 'Payment Date',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value.toString().slice(0, 10)
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'paymentsBDDay',
          label: 'Payment Days',
          options: {
            filter: true
          }
        },
        {
          name: 'reelPaymentDay',
          label: 'Reel Payment Date',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value.toString().slice(0, 10)
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'reelPaymentDays',
          label: 'Reel Payment Days',
          options: {
            filter: true
          }
        },
        {
          name: 'paymentDone',
          label: 'Payment Done ?',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value ? 'Yes' : 'No'
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Contractor',
          name: 'financialCompany',
          options: {
            filter: true,
            customBodyRender: (financialCompany) => (
              <React.Fragment>
                {
                  financialCompany.name
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Client',
          name: 'client',
          options: {
            filter: true,
            customBodyRender: (client) => (
              <React.Fragment>
                {
                  client.name
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Operation',
          name: 'commercialOperation',
          options: {
            filter: true,
            customBodyRender: (commercialOperation) => (
              <React.Fragment>
                {
                  commercialOperation.name
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Client Signed',
          name: 'clientSigned',
          options: {
            filter: true,
            customBodyRender: (clientSigned) => (
              <React.Fragment>
                {
                  clientSigned.name
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'purchaseOrderNumber',
          label: 'Purchase Order',
          options: {
            filter: true
          }
        },
        {
          name: 'totalLocal',
          label: 'Total USD (L)',
          options: {
            filter: true
          }
        },
        {
          name: 'currency',
          label: 'Currency',
          options: {
            filter: true,
            customBodyRender: (currency) => (
              <React.Fragment>
                {
                  currency.currencyCode
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'totalEuro',
          label: 'Total (€)',
          options: {
            filter: true
          }
        },
        {
          name: 'iva',
          label: 'IVA %',
          options: {
            filter: true,
            customBodyRender: (iva) => (
              <React.Fragment>
                {
                  iva.value ? iva.value : ''
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'valueIVAEuro',
          label: 'Total IVA (€)',
          options: {
            filter: true
          }
        },
        {
          name: 'valueIVALocal',
          label: 'Total IVA (L)',
          options: {
            filter: true
          }
        },
        {
          name: 'totalAmountLocal',
          label: 'Total Amount (L)',
          options: {
            filter: true
          }
        },
        {
          name: 'totalAmountEuro',
          label: 'Total Amount (€)',
          options: {
            filter: true
          }
        },
        {
          name: 'Actions',
          label: ' Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
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
    BillService.getBill().then(result => {
      const today = new Date();
      // eslint-disable-next-line array-callback-return
      result.data.map(row => {
        if (row.paymentDone) row.state = 'Yes';
        if (today.getTime() < (new Date(row.paymentDate).getTime()) && !row.paymentDone) row.state = 'Zombie';
        if (today.getTime() > (new Date(row.paymentDate).getTime()) && !row.paymentDone) row.state = 'No';
      });
      this.setState({ datas: result.data });
    });
  }

  // eslint-disable-next-line react/sort-comp
  handleDetails = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
        + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].billId;
    BillService.getBillById(id).then(result => {
      const bill = result.data;
      this.setState({ openPopUp: true, bill });
    });
  }

  handleDelete = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
        + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].billId;
    BillService.deleteBill(id).then(result => {
      const today = new Date();
      // eslint-disable-next-line array-callback-return
      result.data.map(row => {
        if (row.paymentDone) row.state = 'Yes';
        if (today.getTime() < (new Date(row.paymentDate).getTime()) && !row.paymentDone) row.state = 'Zombie';
        if (today.getTime() > (new Date(row.paymentDate).getTime()) && !row.paymentDone) row.state = 'No';
      });
      this.setState({ datas: result.data });
    });
  };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

  myCallback = (dataFromChild) => {
    this.setState({ openPopUp: dataFromChild });
  };

  render() {
    const {
      datas, columns, openPopUp, bill
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
          url="/app/gestion-financial/Add-Bill"
          tooltip="Add New Bill"
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="The Bills List"
          data={datas}
          columns={columns}
          options={options}
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
          <DialogTitle id="alert-dialog-slide-title"> View Details</DialogTitle>
          <DialogContent dividers>
            <EditBill Info={bill} callbackFromParent={this.myCallback} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}


export default BillingBlock;
