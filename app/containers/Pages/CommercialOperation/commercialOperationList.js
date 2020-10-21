import React from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DetailsIcon from '@material-ui/icons/Details';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import Grid from '@material-ui/core/Grid';
import {
  Dialog, DialogTitle, DialogContent, Button, DialogActions
} from '@material-ui/core';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import PapperBlock from '../../../components/PapperBlock/PapperBlock';
import StepperIndex from '../../../components/Stepper/StepperIndex';

class commercialOperationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: [],
      columns: [
        {
          label: 'Operation Code',
          name: 'codeOperation',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'nameOperation',
          label: 'Operation Name',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          label: 'Planned Contract',
          name: 'plannedContract',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          label: 'Country',
          name: 'country',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          label: 'Client',
          name: 'client',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'type',
          label: 'Service Type',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'estimatedTradeVolume',
          label: 'Estimated Trade Volume',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'commercialResponsible',
          label: 'Commercial Responsible',
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: 'progress',
          label: 'Progress',
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
    console.log(this.state);
    const {
      viewProgress,
    } = this.state;
    const datas = [
      {
        codeOperation: 'MOR-062-0102',
        nameOperation: 'SSRS Tool',
        plannedContract: 'Q1-2022',
        country: 'S-Morocco',
        client: 'GIS-Coporativo',
        type: 'Nuevo',
        estimatedTradeVolume: '250000.00',
        commercialResponsible: 'SOUIAT Aymane',
        progress: '30 %',
      },
      {
        codeOperation: 'MEX-041-0101',
        nameOperation: 'IS-Water Distribution',
        plannedContract: 'Q1-2022',
        country: 'S-Mexico',
        client: 'Aguas de Puebla',
        type: 'Nuevo',
        estimatedTradeVolume: '600000.00',
        commercialResponsible: 'SOUIAT Aymane',
        progress: '0 %',
      }];
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
            <MUIDataTable title="" data={datas} columns={columns} options={options} />
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

export default (commercialOperationList);