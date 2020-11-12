import React from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {
  Dialog, DialogContent, DialogTitle
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import EditContract from './editContract';
import ContractService from '../../../Services/ContractService';

class CompaniesBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopUp: false,
      contract: {},
      datas: [],
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
          label: 'Title',
          name: 'contractTitle',
          options: {
            filter: true
          }
        },
        {
          name: 'client',
          label: 'Client',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                { value.name }
              </React.Fragment>
            )
          }
        },
        {
          name: 'commercialOperation',
          label: 'Operation',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                { value.name }
              </React.Fragment>
            )
          }
        },
        {
          label: 'Company',
          name: 'financialCompany',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                { value.name }
              </React.Fragment>
            )
          }
        },
        {
          label: 'State',
          name: 'contractStatus',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                { value.statusName }
              </React.Fragment>
            )
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
          name: 'finalReelDate',
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
          name: 'conceptTotalAmount',
          label: 'Amount ',
          options: {
            filter: true
          }
        },
        {
          label: 'Currency',
          name: 'currency',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                { value.currencyCode }
              </React.Fragment>
            )
          }
        },
        {
          name: 'conceptTotalAmountEuro',
          label: 'Amount (€)',
          options: {
            filter: true
          }
        },
        {
          name: 'penaltyValue',
          label: 'penalties',
          options: {
            filter: true,
            customBodyRender: (penaltyValue) => (
              <React.Fragment>
                { penaltyValue.length > 1 ? 'Yes' : 'No' }
              </React.Fragment>
            )
          }
        },
        {
          name: 'amountInsured',
          label: 'Insure',
          options: {
            filter: true,
            customBodyRender: (amountInsured) => (
              <React.Fragment>
                { amountInsured > 0 ? 'Yes' : 'No' }
              </React.Fragment>
            )
          }
        },
        {
          name: 'purchaseOrderNumber',
          label: 'Purchase Order',
          options: {
            filter: true,
            customBodyRender: (purchaseOrderNumber) => (
              <React.Fragment>
                { purchaseOrderNumber.length > 1 ? 'Yes' : 'No' }
              </React.Fragment>
            )
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

  // eslint-disable-next-line react/sort-comp
  handleDetails = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
        + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].financialContractId;
    ContractService.getContractById(id).then(result => {
      const contract = result.data;
      this.setState({ openPopUp: true, contract });
    });
  }

  handleDelete = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
        + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].financialContractId;
    ContractService.deleteContract(id).then(result => {
      // eslint-disable-next-line array-callback-return
      result.data.map(row => {
        const date1 = new Date(row.finalReelDate);
        const date2 = new Date(row.startDate);
        const durationS = date1.getTime() - date2.getTime();
        const durationM = Math.round(((durationS / 86400000) / 30) + 0.4);
        row.duration = durationM;
        if (row.purchaseOrderNumber.length > 1 && row.contractDocumentation.length > 1) row.isActive = 'Yes';
        if (row.purchaseOrderNumber.length <= 1) row.isActive = 'No';
        if (row.purchaseOrderNumber.length > 1 && row.contractDocumentation.length === 0) row.isActive = 'Zombie';
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

  componentDidMount() {
    ContractService.getContract().then(result => {
      // eslint-disable-next-line array-callback-return
      result.data.map(row => {
        const date1 = new Date(row.finalReelDate);
        const date2 = new Date(row.startDate);
        const durationS = date1.getTime() - date2.getTime();
        const durationM = Math.round(((durationS / 86400000) / 30) + 0.4);
        row.duration = durationM;
        if (row.purchaseOrderNumber.length > 1 && row.contractDocumentation.length > 1) row.isActive = 'Yes';
        if (row.purchaseOrderNumber.length <= 1) row.isActive = 'No';
        if (row.purchaseOrderNumber.length > 1 && row.contractDocumentation.length === 0) row.isActive = 'Zombie';
      });
      this.setState({ datas: result.data });
      console.log(this.state);
    });
  }

  render() {
    const {
      datas, columns, openPopUp, contract
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
            <EditContract Info={contract} callbackFromParent={this.myCallback} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}


export default CompaniesBlock;
