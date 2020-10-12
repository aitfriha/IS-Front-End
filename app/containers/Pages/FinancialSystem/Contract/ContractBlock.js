import React from 'react';
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import EditContract from './editContract';

class CompaniesBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopUp: false,
      data: [],
      columns: [
        {
          label: ' ',
          name: 'isActive',
          options: {
            customBodyRender: (value) => (
              <React.Fragment>
                <IconButton>
                  <RadioButtonUncheckedIcon style={{
                    backgroundColor: value === 'Yes' ? 'green' : (value === 'Zombie' ? 'gray' : 'red'),
                    color: value === 'Yes' ? 'green' : (value === 'Zombie' ? 'gray' : 'red'),
                    borderRadius: '100%'
                  }}
                  />
                </IconButton>
              </React.Fragment>
            )
          }
        },
        {
          name: 'client',
          label: 'Client',
          options: {
            filter: true
          }
        },
        {
          name: 'operation',
          label: 'Operation',
          options: {
            filter: true
          }
        },
        {
          label: 'Company',
          name: 'company',
          options: {
            filter: true
          }
        },
        {
          label: 'State',
          name: 'state',
          options: {
            filter: true
          }
        },
        {
          label: 'Signed Date',
          name: 'signedDate',
          options: {
            filter: true
          }
        },
        {
          label: 'Start Date',
          name: 'startDate',
          options: {
            filter: true
          }
        },
        {
          name: 'endDate',
          label: 'End Date',
          options: {
            filter: true
          }
        },
        {
          name: 'duration',
          label: 'Duration',
          options: {
            filter: true
          }
        },
        {
          name: 'amount',
          label: 'Amount (€)',
          options: {
            filter: true
          }
        },
        {
          name: 'penalties',
          label: 'Penalties',
          options: {
            filter: true
          }
        },
        {
          name: 'insure',
          label: 'Insure',
          options: {
            filter: true
          }
        },
        {
          name: 'purchaseOrder',
          label: 'Purchase Order',
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
        operation: 'Evolution ISFlights 14',
        client: 'WFS-FRANCIA',
        company: 'Implemental System',
        state: 'FINISHED',
        signedDate: '17/11/2019',
        startDate: '01/01/2020',
        endDate: '01/01/2021',
        duration: '12 Months',
        amount: '850000',
        penalties: 'Yes',
        purchaseOrder: 'No',
        insure: 'No',
        isActive: 'No'
      },
      {
        operation: 'Evolution SSRS 3',
        client: 'WFS-FRANCIA',
        company: ' TechniBout',
        state: 'SIGNED',
        signedDate: '01/10/2020',
        startDate: '01/01/2020',
        endDate: '31/12/2023',
        duration: '35 Months',
        amount: '95000000',
        penalties: 'Yes',
        purchaseOrder: 'Yes',
        insure: 'Yes',
        isActive: 'Zombie'
      },
      {
        operation: 'Evolution ISFlights 14',
        client: 'Water Supply',
        company: 'TechniU ',
        state: ' IN PROGRESS',
        signedDate: '01/10/2018',
        startDate: '01/01/2019',
        endDate: '01/06/2020',
        duration: '17 Months',
        amount: '1000000',
        penalties: 'Yes',
        purchaseOrder: 'Yes',
        insure: 'Yes',
        isActive: 'Yes'
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
          url="/app/gestion-financial/Add-Contract"
          tooltip="add new Contract"
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="Client Contracts List"
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
            <EditContract />
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


export default CompaniesBlock;
