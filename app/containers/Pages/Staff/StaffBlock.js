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
import { setStaff, getAllStaff } from '../../../redux/staff/actions';

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
          name: 'companyName',
          options: {
            filter: true
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
          name: 'countryName',
          options: {
            filter: true
          }
        },
        {
          name: 'levelName',
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
    const { getAllStaff } = this.props;
    const promise = new Promise(resolve => {
      // get client information
      getAllStaff();
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      console.log(result);
    });
  }

  viewStaffProfile = (value, tableMeta) => {
    const { setStaff, allStaff } = this.props;
    const { showProfile } = this.props;
    const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
      + tableMeta.rowIndex;
    setStaff(allStaff[index]);
    showProfile(true);
  };

  render() {
    const { allStaff } = this.props;
    const { data, columns } = this.state;
    const options = {
      filter: true,
      selectableRows: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      customToolbar: () => (
        <CustomToolbar
          csvData={allStaff}
          url="/app/hh-rr/staff/create-staff"
          tooltip="add new worker"
        />
      )
    };

    console.log(allStaff);

    return (
      <div>
        <MUIDataTable
          title=""
          data={allStaff}
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
  setStaff: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  staff: state.getIn(['staffs']).selectedStaff,
  allStaff: state.getIn(['staffs']).allStaff
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAllStaff,
    setStaff
  },
  dispatch
);

const StaffBlockMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffBlock);

export default withStyles(styles)(StaffBlockMapped);
