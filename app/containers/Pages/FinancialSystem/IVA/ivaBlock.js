import React from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import EditIVA from './editIva';

class IvaBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopUp: false,
      columns: [
        {
          name: 'ivaCode',
          label: 'I.V.A Code',
          options: {
            filter: true
          }
        },
        {
          label: 'Country',
          name: 'country',
          options: {
            filter: true
          }
        },
        {
          label: 'I.V.A Value (%)',
          name: 'ivaValue',
          options: {
            filter: true
          }
        },
        {
          label: 'Starting Date',
          name: 'startingDate',
          options: {
            filter: true
          }
        },
        {
          label: 'Ending Date',
          name: 'endingDate',
          options: {
            filter: true
          }
        },
        {
          label: 'Electronic Invoice ',
          name: 'electronicInvoice',
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
                    {/* eslint-disable-next-line react/no-this-in-sfc */}
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

    render() {
      const { columns, openPopUp } = this.state;
      const datas = [
        {
          ivaCode: '1',
          country: 'Morocco',
          ivaValue: '2.5',
          startingDate: '01/01',
          endingDate: '31/12',
          electronicInvoice: 'No'
        },
        {
          ivaCode: '2',
          country: 'Spain',
          ivaValue: '1.5',
          startingDate: '01/01',
          endingDate: '31/12',
          electronicInvoice: 'Yes'
        }];
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add-IVA"
            tooltip="add new I.V.A"
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="I.V.A List"
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
              <EditIVA />
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

export default IvaBlock;
