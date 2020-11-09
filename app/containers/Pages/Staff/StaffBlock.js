import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import { TableCell, Tooltip } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import styles from './staff-jss';
import StaffService from '../../Services/StaffService';
import { setStaff } from '../../../redux/staff/actions';

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
          name: 'firstName',
          label: 'First Name',
          options: {
            filter: true
          }
        },

        {
          name: 'fatherFamilyName',
          label: 'Father Family Name',
          options: {
            filter: true
          }
        },

        {
          name: 'motherFamilyName',
          label: 'Mother Family Name',
          options: {
            filter: true
          }
        },
        {
          label: 'Company',
          name: 'staffContract',
          options: {
            customBodyRender: (value, data) => (
              <React.Fragment>{value.companyName}</React.Fragment>
            )
          }
        },
        {
          name: 'personalPhone',
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
          label: 'Residence country',
          name: 'address',
          options: {
            customBodyRender: (value, data) => (
              <React.Fragment>
                {value.city.stateCountry.country.countryName}
              </React.Fragment>
            )
          }
        },
        {
          name: 'level',
          label: 'Functional level',
          options: {
            customBodyRender: (value, data) => (
              <React.Fragment>{value ? value.name : 'none'}</React.Fragment>
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
      console.log(data);
      this.setState({ data });
    });
  }

  viewStaffProfile = (value, tableMeta) => {
    const { setStaffData } = this.props;
    const { data } = this.state;
    const { showProfile } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    setStaffData(data[index]);
    showProfile(true);
  };

  render() {
    const { data, columns } = this.state;
    const options = {
      filter: true,
      selectableRows: 'none',
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
  showProfile: PropTypes.func.isRequired,
  setStaffData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  staff: state.get('staffs').selectedStaff
});
const mapDispatchToProps = dispatch => ({
  setStaffData: bindActionCreators(setStaff, dispatch)
});

const StaffBlockMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffBlock);

export default withStyles(styles)(StaffBlockMapped);
