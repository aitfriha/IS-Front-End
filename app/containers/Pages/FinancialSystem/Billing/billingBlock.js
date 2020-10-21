import React from 'react';
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';

class BillingBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopUp: false,
      data: [],
      columns: [
        {
          name: 'code',
          label: 'Code',
          options: {
            filter: true
          }
        },
        {
          name: 'billNumber',
          label: 'Bill Number',
          options: {
            filter: true
          }
        },
        {
          name: 'billingDate',
          label: 'Bill Date',
          options: {
            filter: true
          }
        },
        {
          label: 'Contractor',
          name: 'contractor',
          options: {
            filter: true
          }
        },
        {
          label: 'Client',
          name: 'client',
          options: {
            filter: true
          }
        },
        {
          label: 'Commercial Operation',
          name: 'commercialOperation',
          options: {
            filter: true
          }
        },
        {
          label: 'Client Contract Signed',
          name: 'clientContractSigned',
          options: {
            filter: true
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
          name: 'totalEuro',
          label: 'Total (€)',
          options: {
            filter: true
          }
        },
        {
          name: 'totalLocal',
          label: 'Total USD (Local)',
          options: {
            filter: true
          }
        },
        {
          name: 'iva',
          label: 'I.V.A ',
          options: {
            filter: true
          }
        },
        {
          name: 'totalIVAEuro',
          label: 'Total I.V.A (€)',
          options: {
            filter: true
          }
        },
        {
          name: 'totalIVALocal',
          label: 'Total I.V.A (Local)',
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
          name: 'totalAmountLocal',
          label: 'Total Amount (Local)',
          options: {
            filter: true
          }
        },
        {
          name: 'localCurrency',
          label: 'Local Currency',
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
            customBodyRender: () => (
              <div>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <IconButton onClick={() => this.handleDetails()}>
                      <DetailsIcon color="secondary" />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            )
          }
        }
      ]
    };
  }

    // eslint-disable-next-line react/sort-comp
    handleDetails = () => {
      this.setState({ openPopUp: true });
    }

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    componentDidMount() {}

    render() {
      const { data, columns, openPopUp } = this.state;
      const datas = [
        {
          code: '1',
          billNumber: '2020/003',
          billingDate: '10/10/2020',
          contractor: 'TechniU',
          client: 'SVF Flight',
          commercialOperation: 'Is-Flight Version 5',
          clientContractSigned: 'SVF Flight',
          purchaseOrderNumber: '545124',
          totalEuro: '50000',
          totalLocal: '650000',
          iva: '2.5 %',
          totalIVAEuro: '750',
          totalIVALocal: '6400',
          totalAmountEuro: '49350',
          totalAmountLocal: '590000',
          localCurrency: 'MAD'
        },
        {
          code: '2',
          billNumber: '2020/004',
          billingDate: '01/12/2020',
          contractor: 'TechniU',
          client: 'SVF Flight',
          commercialOperation: 'Is-Flight Version 6',
          clientContractSigned: 'SVF Flight',
          purchaseOrderNumber: '600501',
          totalEuro: '750000',
          totalLocal: '1000000',
          iva: '1.7 %',
          totalIVAEuro: '50000',
          totalIVALocal: '90025',
          totalAmountEuro: '700000',
          totalAmountLocal: '913500',
          localCurrency: 'POS'
        },
        {
          code: '1',
          billNumber: '2019/001',
          billingDate: '05/05/2019',
          contractor: 'Implemental Systems',
          client: 'Water Supply',
          commercialOperation: 'IS-Water Distribution',
          clientContractSigned: 'Water Supply',
          purchaseOrderNumber: '120050',
          totalEuro: '3500000',
          totalLocal: '4000000',
          iva: '1 %',
          totalIVAEuro: '35000',
          totalIVALocal: '400000',
          totalAmountEuro: '31500000',
          totalAmountLocal: '36000000',
          localCurrency: 'USD'
        }];
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={data}
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
              <div />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                            Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClose}
              >
                            save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}


export default BillingBlock;
