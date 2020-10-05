import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import styles from './country-jss';
import '../map/app.css';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CustomToolbar from './customToolbar';
import CountryService from '../../../Services/CountryService';

class AddCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: [],
      countryName: '',
      columns: [
        {
          name: 'countryName',
          label: 'Name',
          options: {
            filter: true,
          }
        },
        {
          name: 'Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                <IconButton onClick={() => console.log(value, tableMeta)}>
                  <EditIcon color="secondary"/>
                </IconButton>
                <IconButton onClick={() => console.log(value, tableMeta)}>
                  <DeleteIcon color="primary"/>
                </IconButton>
              </React.Fragment>
            )
          }
        }
      ],
      error: false,
    }
  }

  componentDidMount() {
    this.getCountry();
  }

  getCountry = () => {
    CountryService.getCountries().then(({ data }) => {
      this.setState({ data });
    });
  };


  reloadCountry = (can) => {
    can ? this.getCountry() : null;
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (ev) => {
    console.log(ev.target.value);
    this.setState({ [ev.target.name]: ev.target.value });
  };

  render() {
    const title = brand.name + ' - Country';
    const description = brand.desc;
    const {
      data, columns, error
    } = this.state;
    const options = {
      filter: false,
      viewColumns: false,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={data}
          title="New Country"
          fileName="Countries"
          error={error}
          reload={this.reloadCountry}
          type={false}
        />
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
        <PapperBlock title="Countries" desc="" icon="ios-settings">
          <MUIDataTable title="Countries" data={data} columns={columns} options={options} />
        </PapperBlock>
      </div>
    );
  }
}
AddCountry.propTypes = {
  classes: PropTypes.object.isRequired,
  csvData: PropTypes.array.isRequired,
  saveConfig: PropTypes.func.isRequired,
};
export default withStyles(styles)(AddCountry);
