import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import { addCompany } from '../../../../redux/actions/companyActions';
import styles from './companies-jss';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import mylogo from '../../../../../public/images/logo.png';
import mylogo2 from '../../../../../public/images/pp_boy.svg';
import EditCompany from './EditCompany';

class CompaniesBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopUp: false,
      data: [],
      columns: [
        {
          name: 'logo',
          label: 'Logo',
          options: {
            filter: true
          }
        },
        {
          name: 'name',
          label: 'Name',
          options: {
            filter: true
          }
        },
        {
          name: 'email',
          label: 'Email',
          options: {
            filter: true
          }
        },
        {
          label: 'Phone 1',
          name: 'phone1',
          options: {
            filter: true
          }
        },
        {
          label: 'Phone 2',
          name: 'phone2',
          options: {
            filter: true
          }
        },
        {
          label: 'Address',
          name: 'address',
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
          name: 'city',
          label: 'City',
          options: {
            filter: true
          }
        },
        {
          name: 'state',
          label: 'State',
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
    console.log(this.state);
    const { data, columns, openPopUp } = this.state;
    const datas = [
      {
        name: 'CBD SYSTEMS',
        email: 'cbd@cbdsystems.com',
        phone1: '+212 625845225',
        phone2: '+212 514144141',
        // eslint-disable-next-line jsx-a11y/alt-text
        logo: <Image source={mylogo} />,
        address: '15 Office Building, Charles Street',
        country: 'France',
        city: 'Paris',
        state: 'Paris'
      },
      {
        name: 'SLS CONNECTIVITY',
        email: 'sls@connect.com',
        phone1: '+212 695959895',
        phone2: '+212 514151612',
        // eslint-disable-next-line jsx-a11y/alt-text
        logo: <Image source={mylogo} />,
        address: '15 Office Building, Hassan 2 Street',
        country: 'Morroco',
        city: 'Tanger',
        state: 'Tanger-Tétouan'
      },
      {
        name: 'Peformance Market ',
        email: 'direction@performancemarket.com',
        phone1: '+212 611213141',
        phone2: '+212 505153055',
        logo: <Image source={mylogo2} />,
        address: '18 Office Building, Peace Street',
        country: 'United kingdom',
        city: 'London',
        state: 'London'
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
          url="/app/gestion-financial/Company/Add-Company"
          tooltip="add new Company"
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title="The Companies List"
          data={datas}
          columns={columns}
          options={options}
        />
        <Dialog
          open={openPopUp}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth=""
          maxWidth=""
        >
          <DialogTitle id="alert-dialog-slide-title"> View Details</DialogTitle>
          <DialogContent dividers>
            <EditCompany />
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
CompaniesBlock.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  add: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  back: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  add: bindActionCreators(addCompany, dispatch)
});
const CompaniesBlockMapped = connect(
  null,
  mapDispatchToProps
)(CompaniesBlock);

export default withStyles(styles)(CompaniesBlockMapped);
