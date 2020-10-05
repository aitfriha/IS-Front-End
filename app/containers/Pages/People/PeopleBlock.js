import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import PeopleService from '../../Services/PeopleService';
import styles from './people-jss';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';

class PeopleBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          label: 'Photo',
          name: 'photo',
          options: {
            customBodyRender: (value) => (
              <React.Fragment>
                <Avatar alt="User Name" src={value} />
              </React.Fragment>
            )
          }
        },
        {
          name: 'firstName',
          label: 'First Name',
          options: {
            filter: true,
          }
        },
        {
          name: 'lastName',
          label: 'LastName',
          options: {
            filter: true,
          }
        },
        {
          name: 'lastName2',
          label: 'Last Name 2',
          options: {
            filter: true,
          }
        },
        {
          name: 'address',
          label: 'Country',
          options: {
            filter: true,
            customBodyRender: (value) => {
              console.log(value);
              return (
                <React.Fragment>
                  <div>{value.country.countryName}</div>
                </React.Fragment>
              );
            }
          }
        },
        {
          name: 'company',
          label: 'Company Phone',
          options: {
            filter: true,
            customBodyRender: (value) => {
              console.log(value);
              return (
                <React.Fragment>
                  <div>{value.phone}</div>
                </React.Fragment>
              );
            }
          }
        },
        {
          name: 'company',
          label: 'Company Email',
          options: {
            filter: true,
            customBodyRender: (value) => {
              console.log(value);
              return (
                <React.Fragment>
                  <div>{value.email}</div>
                </React.Fragment>
              );
            }
          }
        },
        {
          name: 'phone',
          label: 'Personal Phone',
          options: {
            filter: true,
          }
        },
        {
          name: 'email',
          label: 'Personal Email',
          options: {
            filter: true,
          }
        },
      ]
    };
  }

  componentDidMount() {
    PeopleService.getPeoples().then(({ data }) => {
      this.setState({ data });
    });
  }

  render() {
    const { data, columns } = this.state;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar csvData={data} url="/app/configurations/workers/create-worker" tooltip="add new worker" />
      )
    };

    return (
      <div>
        <MUIDataTable title="Workers" data={data} columns={columns} options={options} />
      </div>
    );
  }
}
PeopleBlock.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(PeopleBlock);
