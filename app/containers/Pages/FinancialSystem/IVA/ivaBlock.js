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
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import IvaService from '../../../Services/IvaService';
import { getAllCountry } from '../../../../redux/country/actions';
import { getAllStateByCountry } from '../../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../../redux/city/actions';
import styles from '../../Companies/companies-jss';

class IvaBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ivaId: '',
      ivaCode: '',
      stateCountry: '',
      state: '',
      value: '',
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
          name: 'stateCountry',
          options: {
            filter: true,
            customBodyRender: (stateCountry) => (
              <React.Fragment>
                {
                  stateCountry.country.countryName
                }
              </React.Fragment>
            )
          }
        },
        {
          label: 'State',
          name: 'stateCountry',
          options: {
            filter: true,
            customBodyRender: (stateCountry) => (
              <React.Fragment>
                {
                  stateCountry.stateName
                }
              </React.Fragment>
            )
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
          label: 'Ending Date',
          name: 'endingDate',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  value ? value.toString().slice(0, 10) : ' '
                }
              </React.Fragment>
            )
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
  }

  componentDidMount() {
    IvaService.getIva().then(result => {
      console.log(result);
      this.setState({ datas: result.data });
    });
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCountry } = this.props;
    getAllCountry();
  }

    // eslint-disable-next-line react/sort-comp
    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
          + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].ivaId;
      IvaService.getIvaById(id).then(result => {
        this.setState({
          ivaId: result.data._id,
          ivaCode: result.data.ivaCode,
          state: result.data.stateCountry._id,
          stateName: result.data.stateCountry.stateName,
          countryName: result.data.stateCountry.country.countryName,
          stateCountry: result.data.stateCountry.country.countryId,
          value: result.data.value,
          startingDate: result.data.startingDate.substr(0, 10),
          endingDate: result.data.endingDate !== null ? result.data.endingDate.substr(0, 10) : '',
          electronicInvoice: result.data.electronicInvoice,
          openPopUp: true
        });
        console.log(this.state);
        console.log(this.props);
      });
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleSave = () => {
      const {
        state, value, startingDate, endingDate, electronicInvoice, ivaCode, ivaId
      } = this.state;
      const stateCountry = { _id: state };
      const Iva = {
        ivaId, ivaCode, value, startingDate, endingDate, electronicInvoice, stateCountry
      };
      IvaService.updateIva(Iva).then(result => {
        this.setState({ datas: result.data, openPopUp: false });
      });
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

  handleChangeCountry = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllStateByCountry } = this.props;
    getAllStateByCountry(value.countryId);
  };

  handleChangeState = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCityByState } = this.props;
    getAllCityByState(value.stateCountryId);
    this.setState({ state: value.stateCountryId });
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
      const {
        // eslint-disable-next-line react/prop-types
        allCountrys, allStateCountrys
      } = this.props;
      const {
        columns, openPopUp, datas, value, startingDate, endingDate, electronicInvoice, ivaCode, state, stateCountry
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
                    <Autocomplete
                      id="combo-box-demo"
                      options={allCountrys}
                      getOptionLabel={option => option.countryName}
                      onChange={this.handleChangeCountry}
                      style={{ marginTop: 15 }}
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Choose the country"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={allStateCountrys}
                      getOptionLabel={option => option.stateName}
                      onChange={this.handleChangeState}
                      style={{ marginTop: 15 }}
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Choose the state"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} sm={2}>
                    <br />
                    <TextField
                      id="value"
                      label="I.V.A Value %"
                      variant="outlined"
                      name="value"
                      value={value}
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
const mapStateToProps = state => ({
  allCountrys: state.getIn(['countries']).allCountrys,
  countryResponse: state.getIn(['countries']).countryResponse,
  isLoading: state.getIn(['countries']).isLoading,
  errors: state.getIn(['countries']).errors,
  // state
  allStateCountrys: state.getIn(['stateCountries']).allStateCountrys,
  stateCountryResponse: state.getIn(['stateCountries']).stateCountryResponse,
  isLoadingState: state.getIn(['stateCountries']).isLoading,
  errorsState: state.getIn(['stateCountries']).errors,
  // city
  allCitys: state.getIn(['cities']).allCitys,
  cityResponse: state.getIn(['cities']).cityResponse,
  isLoadingCity: state.getIn(['cities']).isLoading,
  errorsCity: state.getIn(['cities']).errors,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCountry,
  getAllStateByCountry,
  getAllCityByState
}, dispatch);
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(IvaBlock));
