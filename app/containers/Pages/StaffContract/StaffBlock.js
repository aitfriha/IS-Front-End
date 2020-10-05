import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import { Tooltip } from '@material-ui/core';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import styles from './people-jss';
import StaffService from '../../Services/StaffService';

class StaffBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          label: 'Photo',
          name: 'photo',
          options: {
            customBodyRender: value => (
              <React.Fragment>
                <Avatar alt="User Name" src={value} />
              </React.Fragment>
            )
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
          name: 'company',
          label: 'Company',
          options: {
            filter: true
          }
        },
        {
          name: 'personalMobilePhone',
          label: 'Phone',
          options: {
            filter: true
          }
        },
        {
          name: 'companyPhone',
          label: 'Company phone',
          options: {
            filter: true
          }
        },
        {
          name: 'companyMobilePhone',
          label: 'Company mobile phone',
          options: {
            filter: true
          }
        },
        {
          name: 'companyEmail',
          label: 'Company email',
          options: {
            filter: true
          }
        },
        {
          name: 'residenceCountry',
          label: 'Residence country',
          options: {
            filter: true
          }
        },
        {
          name: 'functionalLevel',
          label: 'Functional level',
          options: {
            filter: true
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
                <Tooltip title="View Staff">
                  <IconButton
                    onClick={() => this.viewStaffProfile(value, tableMeta)}
                  >
                    <Visibility color="secondary" />
                  </IconButton>
                </Tooltip>
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

  componentDidMount() {
    StaffService.getStaffs().then(({ data }) => {
      this.setState({ data });
    });
  }

  viewStaffProfile = (value, tableMeta) => {
    const { data } = this.state;
    const { showProfile } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    console.log(data[index]);
    showProfile(true, data[index]);
  };

  render() {
    const { data, columns } = this.state;
    const options = {
      filter: true,
      selectableRows: false,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={data}
          url="/app/hh-rr/staff/create-staff"
          tooltip="add new worker"
        />
      )
    };

    return (
      <div>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}
StaffBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  showProfile: PropTypes.func.isRequired
};

export default withStyles(styles)(StaffBlock);
