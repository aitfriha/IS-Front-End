import React from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DetailsIcon from '@material-ui/icons/Details';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import Grid from '@material-ui/core/Grid';
import {
  Dialog, DialogTitle, DialogContent, Button, DialogActions, withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import PapperBlock from '../../../components/PapperBlock/PapperBlock';
import StepperIndex from '../../../components/Stepper/StepperIndex';
import {
  addClientCommercial, deleteClient, getAllClient, updateClient
} from '../../../redux/client/actions';
import { getAllStateByCountry } from '../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../redux/city/actions';
import styles from '../Clients/clients-jss';
import { getAllCommercialOperation } from '../../../redux/commercialOperation/actions';

class commercialOperationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: [],
      columns: [
        {
          label: 'Operation Code',
          name: 'code',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'name',
          label: 'Operation Name',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          label: 'planned Date Q',
          name: 'plannedDateQ',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          label: 'Country',
          name: 'countryName',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          label: 'Client',
          name: 'clientName',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'serviceTypeName',
          label: 'Service Type',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'devise',
          label: 'devise',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'estimatedTradeVolume',
          label: 'Estimated T.V',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'estimatedTradeVolumeInEuro',
          label: 'Estimated T.V in Euros',
          options: {
            filter: true,
            sort: true,
          }
        },
        /*        {
          name: 'commercialResponsible',
          label: 'Commercial Responsible',
          options: {
            filter: true,
            sort: true,
          }
        }, */
        {
          name: 'stateName',
          label: 'status',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: '',
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: () => (
              <div>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <IconButton onClick={() => this.handleProgress()}>
                      <VisibilityIcon color="secondary" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton onClick={() => this.handleDetails()}>
                      <DetailsIcon color="secondary" />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            )
          }
        },
      ],
      viewDetails: false,
      viewProgress: false
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllClient, getAllCommercialOperation } = this.props;
    getAllClient(); getAllCommercialOperation();
  }


  handleDetails = () => {
    this.setState({ viewDetails: true });
  }

  handleProgress = () => {
    this.setState({ viewProgress: true });
  }

  handleClose = () => {
    this.setState({ viewProgress: false });
  };

  handleSubmit = () => {
    this.setState({ viewProgress: false });
  }

  render() {
    const {
      viewProgress,
    } = this.state;
    const {
      allClients, allCommercialOperations
    } = this.props;

    const title = brand.name + ' - Commercial Operations';
    const description = brand.desc;
    const { data, columns } = this.state;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar csvData={data} url="/app/gestion-commercial/Add-Operation" tooltip="add new Operation" />
      )
    };

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Commercial Operations" desc="The List of operations" icon="ios-pricetags-outline" noMargin overflowX>
          <div>
            <MUIDataTable title="" data={allCommercialOperations} columns={columns} options={options} />
            <Dialog
              open={viewProgress}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              fullWidth="lg"
              maxWidth="lg"
            >
              <DialogTitle id="alert-dialog-slide-title"> Operation Progress</DialogTitle>
              <DialogContent>
                <StepperIndex />
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={this.handleClose}>
                        Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                >
                      save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </PapperBlock>
      </div>
    );
  }
}

commercialOperationList.propTypes = {
  classes: PropTypes.object.isRequired,
  // add: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  addClientCommercial: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  getAllClient: PropTypes.func.isRequired,
  allClients: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  allClients: state.getIn(['clients']).allClients,
  clientResponse: state.getIn(['clients']).clientResponse,
  isLoading: state.getIn(['clients']).isLoading,
  errors: state.getIn(['clients']).errors,

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
  // commercialOperation
  allCommercialOperations: state.getIn(['commercialOperation']).allCommercialOperations,
  commercialOperationResponse: state.getIn(['commercialOperation']).commercialOperationResponse,
  isLoadingCommercialOperation: state.getIn(['commercialOperation']).isLoading,
  errorsCommercialOperation: state.getIn(['commercialOperation']).errors,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addClientCommercial,
  updateClient,
  deleteClient,
  getAllClient,
  getAllStateByCountry,
  getAllCityByState,
  getAllCommercialOperation
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(commercialOperationList));
