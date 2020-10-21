import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import MUIDataTable from 'mui-datatables';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { format } from 'date-fns';
import { TableCell } from '@material-ui/core';
import CountryConfigService from '../../../Services/CountryConfigService';

import CustomToolbar from './customToolbar';
import styles from './country-jss';

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          name: 'name',
          label: 'Name',
          options: {
            filter: true,
          }
        },
        {
          label: 'Leader',
          name: 'leader',
          options: {
            filter: true,
          }
        },
        {
          label: 'Start Date',
          name: 'startDate',
          options: {
            filter: false,
            customBodyRender: (value) => (
              <React.Fragment>
                <TableCell align="right">{format(new Date(value), 'dd/MM/yyyy')}</TableCell>
              </React.Fragment>
            )
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
                  <DeleteIcon color="primary" />
                </IconButton>
              </React.Fragment>
            )
          }
        },
      ],
      error: false
    };
  }

  componentDidMount() {
    this.getCountryConfig();
  }

  getCountryConfig = () => {
    CountryConfigService.getCountryConfig().then(({ data }) => {
      const datas = [];

      data.forEach(da => {
        const dat = da;
        const country = {
          name: dat.country.countryName,
          leader: dat.leader.name,
          endDate: dat.endDate,
          startDate: dat.startDate

        };
        datas.push(country);
      });
      console.log("************************************");
      console.log(datas);
      this.setState({ data: datas });
    });
  };

  reloadConfig = (can) => {
    can ? this.getCountryConfig() : null;
  };

  render() {
    const title = brand.name + ' - Countries';
    const description = brand.desc;
    const { data, columns, error } = this.state;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar csvData={data} type title="Config Country" fileName="countries" error={error} reload={this.reloadConfig} />
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
        <PapperBlock title="Countries*" desc="" icon="ios-settings">
          <MUIDataTable title="Countries Configuration" data={data} columns={columns} options={options} />
        </PapperBlock>
      </div>
    );
  }
}

export default withStyles(styles)(Country);
