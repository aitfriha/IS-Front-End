import React from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import EditStatus from './editStatus';

class StatusBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopUp: false,
      columns: [
        {
          name: 'statusCode',
          label: 'Status Code',
          options: {
            filter: true
          }
        },
        {
          label: 'Status Name',
          name: 'statusName',
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
        statusCode: '1',
        statusName: 'SIGNED',
        description: 'Contract not started yet'
      },
      {
        statusCode: '2',
        statusName: 'STARTED',
        description: 'Contract is started '
      },
      {
        statusCode: '3',
        statusName: 'IN PROGRESS',
        description: 'Contract is process is running '
      },
      {
        statusCode: '10',
        statusName: 'FINISHED',
        description: 'Contract has been terminated',
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
          url="/app/gestion-financial/Contract-Status/Add-Status"
          tooltip="add new Status"
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="The Status List"
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
            <EditStatus />
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

export default StatusBlock;
