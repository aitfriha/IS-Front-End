import React from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel, MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import IvaService from '../../../Services/IvaService';

class IvaBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ivaCode: '',
      country: '',
      state: '',
      ivaValue: '',
      startingDate: '',
      endingDate: '',
      electronicInvoice: false,
      datas: [],
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
          label: 'State',
          name: 'state',
          options: {
            filter: true
          }
        },
        {
          label: 'I.V.A Value (%)',
          name: 'value',
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
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value === true ? 'Yes' : 'No'
                }
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
    IvaService.getIva().then(result => {
      this.setState({ datas: result.data });
    });
  }

    // eslint-disable-next-line react/sort-comp
    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
          + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].ivaId;
      IvaService.getIvaById(id).then(result => {
        console.log(result.data);
        this.setState({
          ivaCode: result.data.ivaCode,
          country: result.data.country,
          state: result.data.state,
          ivaValue: result.data.value,
          startingDate: result.data.startingDate.substr(0, 10),
          endingDate: result.data.endingDate !== null ? result.data.endingDate.substr(0, 10) : '',
          electronicInvoice: result.data.electronicInvoice,
          openPopUp: true
        });
      });
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleSave = () => {
      const {
        country, state, ivaValue, startingDate, endingDate, electronicInvoice, ivaCode
      } = this.state;
      const Iva = {
        country, state, ivaValue, startingDate, endingDate, electronicInvoice, ivaCode
      };
      IvaService.updateIva(Iva).then(result => {
        this.setState({ datas: result.data });
      });
      this.setState({ openPopUp: false });
    };

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
        + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].ivaId;
      IvaService.deleteIva(id).then(result => {
        this.setState({ datas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    handleCheck = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.electronicInvoice;
      this.setState({ electronicInvoice: ok });
    }

    render() {
      const states = [
        {
          value: 'Madrid',
          label: 'Madrid',
        },
        {
          value: 'Barcelona',
          label: 'Barcelona',
        },
        {
          value: 'Malaga',
          label: 'Malaga',
        }];
      const countries = [
        {
          value: 'Spain',
          label: 'Spain',
        },
        {
          value: 'UK',
          label: 'UK',
        },
        {
          value: 'Russia',
          label: 'Russia',
        },
        {
          value: 'France',
          label: 'France',
        },
        {
          value: 'Italie',
          label: 'Italie',
        }];
      const {
        columns, openPopUp, datas, country, state, ivaValue, startingDate, endingDate, electronicInvoice, ivaCode
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
              <div>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={12} md={12} sm={12}>
                    <Typography variant="subtitle2" component="h2" color="primary">
                    I.V.A Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2} sm={2}>
                    <br />
                    <TextField
                      id="ivaCode"
                      label="I.V.A Code"
                      variant="outlined"
                      name="ivaCode"
                      value={ivaCode}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4}>
                    <FormControl fullWidth required>
                      <InputLabel>Select the Country</InputLabel>
                      <Select
                        name="country"
                        value={country}
                        onChange={this.handleChange}
                      >
                        {
                          countries.map((clt) => (
                            <MenuItem key={clt.value} value={clt.value}>
                              {clt.label}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sm={4}>
                    <FormControl fullWidth required>
                      <InputLabel>Select the State</InputLabel>
                      <Select
                        name="state"
                        value={state}
                        onChange={this.handleChange}
                      >
                        {
                          states.map((clt) => (
                            <MenuItem key={clt.value} value={clt.value}>
                              {clt.label}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2} sm={2}>
                    <br />
                    <TextField
                      id="ivaValue"
                      label="I.V.A Value %"
                      variant="outlined"
                      name="ivaValue"
                      value={ivaValue}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      id="electronicInvoice"
                      name="electronicInvoice"
                      value={electronicInvoice}
                      control={<Checkbox color="primary" onChange={this.handleCheck} checked={electronicInvoice} />}
                      label="Electronic Invoice"
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item xs={12} md={12} sm={12}>
                    <br />
                    <Typography variant="subtitle2" component="h2" color="primary">
                    I.V.A Dates
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <TextField
                      id="startingDate"
                      label="Starting Date "
                      type="date"
                      variant="outlined"
                      name="startingDate"
                      value={startingDate}
                      required
                      fullWidth
                      onChange={this.handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <TextField
                      id="endingDate"
                      label="Ending Date "
                      type="date"
                      variant="outlined"
                      name="endingDate"
                      value={endingDate}
                      fullWidth
                      onChange={this.handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
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

export default IvaBlock;
