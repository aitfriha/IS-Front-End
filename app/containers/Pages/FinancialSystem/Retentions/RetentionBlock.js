import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import RetentionService from '../../../Services/RetentionService';
import { getAllCountry } from '../../../../redux/country/actions';
import { getAllStateByCountry } from '../../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../../redux/city/actions';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import { ThemeContext } from '../../../App/ThemeWrapper';

const useStyles = makeStyles();

class RetentionBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      retentionId: '',
      name: '',
      description: '',
      openPopUp: false,
      currentCity: '',
      addressId: '',
      address: [],
      datas: [],
      columns: [
        {
          name: 'name',
          label: 'Name',
          options: {
            filter: true
          }
        },
        {
          name: 'description',
          label: 'Description',
          options: {
            filter: true
          }
        },
        {
          label: 'Country',
          name: 'address',
          options: {
            filter: true,
            customBodyRender: (address) => (
              <React.Fragment>
                {
                  address.city.stateCountry.country.countryName
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'address',
          label: 'State',
          options: {
            filter: true,
            customBodyRender: (address) => (
              <React.Fragment>
                {
                  address.city.stateCountry.stateName
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'address',
          label: 'City',
          options: {
            filter: true,
            customBodyRender: (address) => (
              <React.Fragment>
                {
                  address.city.cityName
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
                {thelogedUser.userRoles[0].actionsNames.financialModule_typeOfRententions_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="secondary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_typeOfRententions_delete ? (
                  <IconButton onClick={() => this.handleDelete(tableMeta)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                ) : null}
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
    const id = this.state.datas[index].retentionId;
    RetentionService.getRetentionById(id).then(result => {
      console.log(result.data);
      this.setState({
        retentionId: result.data._id,
        name: result.data.name,
        description: result.data.description,
        address: result.data.address,
        addressId: result.data.address.addressId,
        openPopUp: true
      });
    });
  }

  handleDelete = (tableMeta) => {
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
        + tableMeta.rowIndex;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const id = this.state.datas[index].retentionId;
    RetentionService.deleteRetention(id).then(result => {
      console.log(result.data);
      this.setState({ datas: result.data });
    });
  };

  handleSave = () => {
    const {
      retentionId, name, descrption, currentCity, addressId
    } = this.state;
    const city = { _id: currentCity };
    const address = {
      addressId, city
    };
    const Retention = {
      retentionId, name, descrption, address
    };

    RetentionService.updateRetention(Retention).then(result => {
      this.setState({ datas: result.data, openPopUp: false });
    });
  };

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  componentDidMount() {
    RetentionService.getRetention().then(result => {
      console.log(result);
      this.setState({ datas: result.data });
    });
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCountry } = this.props;
    getAllCountry();
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

  handleChangeCountry = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllStateByCountry } = this.props;
    getAllStateByCountry(value.countryId);
  };

  handleChangeState = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCityByState } = this.props;
    getAllCityByState(value.stateCountryId);
  };

  handleChangeCity = (ev, value) => {
    this.setState({ currentCity: value.cityId });
  };

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      allCountrys, allStateCountrys, allCitys, logedUser
    } = this.props;
    const thelogedUser = JSON.parse(logedUser);
    let exportButton = false;
    if (thelogedUser.userRoles[0].actionsNames.financialModule_typeOfRententions_export) {
      exportButton = true;
    }
    const {
      datas, columns, openPopUp,
      name, description
    } = this.state;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      download: exportButton,
      print: exportButton,
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={datas}
          url="/app/gestion-financial/Add-Retention"
          tooltip="Add New Type of Retention"
          hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_typeOfRententions_create}
          hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_typeOfRententions_export}
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title=" Retention List"
          data={datas}
          columns={columns}
          options={options}
        />
        <Dialog
          open={openPopUp}
          keepMounted
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
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={4}>
                <Chip label="General Information" avatar={<Avatar>G</Avatar>} color="primary" />
                <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      name="name"
                      value={name}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="description"
                      label="Description"
                      variant="outlined"
                      name="description"
                      value={description}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <Chip label="Company Address" avatar={<Avatar>S</Avatar>} color="primary" />
                <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
                <Autocomplete
                  id="combo-box-demo"
                  options={allCountrys}
                  getOptionLabel={option => option.countryName}
                  onChange={this.handleChangeCountry}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the country"
                      variant="outlined"
                    />
                  )}
                />
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
                <Autocomplete
                  id="combo-box-demo"
                  options={allCitys}
                  getOptionLabel={option => option.cityName}
                  onChange={this.handleChangeCity}
                  style={{ marginTop: 15 }}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the city"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            {thelogedUser.userRoles[0].actionsNames.financialModule_typeOfRententions_modify ? (
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
              save
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
RetentionBlock.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  add: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  back: PropTypes.func.isRequired
};

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
  logedUser: localStorage.getItem('logedUser')
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCountry,
  getAllStateByCountry,
  getAllCityByState,
}, dispatch);

const RetentionBlockMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetentionBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <RetentionBlockMapped changeTheme={changeTheme} classes={classes} />;
};
