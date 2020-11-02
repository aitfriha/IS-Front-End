import React from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import CurrencyService from '../../../Services/CurrencyService';

class CurrencyBlock extends React.Component {
  constructor(props) {
    super(props);
    const year = (new Date()).getFullYear();
    this.years = Array.from(new Array(20), (val, index) => index + year);
    this.state = {
      currencyId: '',
      datas: [],
      openPopUp: false,
      currencyCode: '',
      currencyName: '',
      year: '',
      month: '',
      changeFactor: '',
      row: [],
      columns: [
        {
          label: 'Currency Name',
          name: 'currencyName',
          options: {
            filter: true
          }
        },
        {
          label: 'Currency Code',
          name: 'currencyCode',
          options: {
            filter: true
          }
        },
        {
          label: 'Year Date',
          name: 'year',
          options: {
            filter: true
          }
        },
        {
          label: 'Month Date',
          name: 'month',
          options: {
            filter: true
          }
        },
        {
          label: 'Change Factor',
          name: 'changeFactor',
          options: {
            filter: true
          }
        },
        {
          label: 'Actions',
          name: 'Actions',
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
    CurrencyService.getCurrency().then(result => {
      this.setState({ datas: result.data });
    });
  }

    // eslint-disable-next-line react/sort-comp
    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].currencyId;
      CurrencyService.getCurrencyById(id).then(result => {
        this.setState({
          currencyId: id,
          currencyName: result.data.currencyName,
          currencyCode: result.data.currencyCode,
          year: result.data.year,
          month: result.data.month,
          changeFactor: result.data.changeFactor,
          openPopUp: true
        });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].currencyId;
      CurrencyService.deleteCurrency(id).then(result => {
        this.setState({ datas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    handleSave = () => {
      let {
        currencyName, currencyCode
      } = this.state;
      const {
        currencyId, year, month, changeFactor
      } = this.state;
      currencyName = currencyName.toUpperCase();
      currencyCode = currencyCode.toUpperCase();
      const Currency = {
        currencyId, currencyName, currencyCode, year, month, changeFactor
      };
      CurrencyService.updateCurrency(Currency).then(result => {
        this.setState({ datas: result.data, openPopUp: false });
      });
    };

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      console.log(this.state);
      const months = [
        {
          value: 1,
          label: 'January ',
        },
        {
          value: 2,
          label: 'February ',
        },
        {
          value: 3,
          label: 'March ',
        },
        {
          value: 4,
          label: 'April ',
        },
        {
          value: 5,
          label: 'May ',
        },
        {
          value: 6,
          label: 'June ',
        },
        {
          value: 7,
          label: 'July ',
        },
        {
          value: 8,
          label: 'August ',
        },

        {
          value: 9,
          label: 'September ',
        },
        {
          value: 10,
          label: 'October ',
        },
        {
          value: 11,
          label: 'November ',
        },
        {
          value: 12,
          label: 'December ',
        }];
      const {
        columns, openPopUp, datas, currencyName, currencyCode, year, month, changeFactor
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
            url="/app/gestion-financial/Add-Currency"
            tooltip="add new Currency"
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="The Currencies List"
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
              <div>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={10} md={4}>
                    <TextField
                      id="currencyName"
                      label="Currency Name"
                      variant="outlined"
                      name="currencyName"
                      value={currencyName}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={10} md={4}>
                    <TextField
                      id="currencyCode"
                      label="Currency Code"
                      variant="outlined"
                      name="currencyCode"
                      value={currencyCode}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={10} md={4}>
                    <TextField
                      id="changeFactor"
                      label=" Change Factor "
                      variant="outlined"
                      name="changeFactor"
                      value={changeFactor}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Year</InputLabel>
                      <Select
                        name="year"
                        value={year}
                        onChange={this.handleChange}
                      >
                        {
                          this.years.map((clt) => (
                            <MenuItem key={clt} value={clt}>
                              {clt}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={10} md={5}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Month</InputLabel>
                      <Select
                        name="month"
                        value={month}
                        onChange={this.handleChange}
                      >
                        {
                          months.map((clt) => (
                            <MenuItem key={clt.value} value={clt.value}>
                              {clt.label}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
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

export default CurrencyBlock;
