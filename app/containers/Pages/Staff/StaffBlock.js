import React from 'react';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import {
  Button,
  TableCell,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
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
      columnsType: 'generalInformation',
      generalInformationColumns: [
        {
          label: 'Photo',
          name: 'photo',
          options: {
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps(),
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
          options: this.columnOptions
        },
        {
          name: 'fatherFamilyName',
          label: 'Father Family Name',
          options: this.columnOptions
        },

        {
          name: 'motherFamilyName',
          label: 'Mother Family Name',
          options: this.columnOptions
        },
        {
          label: 'Company',
          name: 'companyName',
          options: this.columnOptions
        },
        {
          name: 'personalPhone',
          label: 'Phone',
          options: this.columnOptions
        },
        {
          name: 'companyPhone',
          label: 'Company phone',
          options: this.columnOptions
        },
        {
          name: 'companyMobilePhone',
          label: 'Company mobile phone',
          options: this.columnOptions
        },
        {
          name: 'companyEmail',
          label: 'Company email',
          options: this.columnOptions
        },
        {
          label: 'Residence country',
          name: 'countryName',
          options: this.columnOptions
        },
        {
          name: 'levelName',
          label: 'Functional level',
          options: this.columnOptions
        },

        {
          name: 'Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps(),
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
      ],
      contractInformationColumns: [
        {
          label: 'Photo',
          name: 'photo',
          options: {
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps(),
            customBodyRender: value => (
              <React.Fragment>
                <Avatar alt="User Name" src={value} />
              </React.Fragment>
            )
          }
        },
        {
          name: 'associateOffice',
          label: 'Associate Office',
          options: this.columnOptions
        },

        {
          name: 'hiringCountry',
          label: 'Hiring Country',
          options: this.columnOptions
        },

        {
          name: 'townContract',
          label: 'Town Contract',
          options: this.columnOptions
        },
        {
          label: 'Personal Number',
          name: 'personalNumber',
          options: this.columnOptions
        },
        {
          name: 'highDate',
          label: 'High Date',
          options: this.columnOptions
        },
        {
          name: 'lowDate',
          label: 'Low Date',
          options: this.columnOptions
        },
        {
          name: 'companyMobilePhone',
          label: 'Company mobile phone',
          options: this.columnOptions
        },
        {
          name: 'registrationDate',
          label: 'Registration Date',
          options: this.columnOptions
        },
        {
          label: 'PreContract Date',
          name: 'preContractDate',
          options: this.columnOptions
        },
        {
          name: 'contractTypeName',
          label: 'Contract Type',
          options: this.columnOptions
        },
        {
          name: 'legelCategoryTypeName',
          label: 'Legel Category Type',
          options: this.columnOptions
        },

        {
          name: 'Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps(),
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
      ],
      economicInformationColumns: [
        {
          label: 'Photo',
          name: 'photo',
          options: {
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps(),
            customBodyRender: value => (
              <React.Fragment>
                <Avatar alt="User Name" src={value} />
              </React.Fragment>
            )
          }
        },
        {
          name: 'contractSalary',
          label: 'Contract Salary',
          options: this.columnOptions
        },
        {
          name: 'contractSalaryDateGoing',
          label: 'Contract Salary Date Going',
          options: this.columnOptions
        },
        {
          name: 'contractSalaryDateOut',
          label: 'Contract Salary Date Out',
          options: this.columnOptions
        },
        {
          name: 'companyContractCost',
          label: 'Company Contract Cost',
          options: this.columnOptions
        },
        {
          name: 'companyContractCostDateGoing',
          label: 'Company Contract Cost Date Going',
          options: this.columnOptions
        },
        {
          name: 'companyContractCostDateOut',
          label: 'Company Contract Cost Date Out',
          options: this.columnOptions
        },
        {
          name: 'expenses',
          label: 'Expenses',
          options: this.columnOptions
        },
        {
          name: 'expensesDateGoing',
          label: 'Expenses Date Going',
          options: this.columnOptions
        },
        {
          name: 'expensesDateOut',
          label: 'Expenses Date Out',
          options: this.columnOptions
        },
        {
          label: 'Company Expenses Cost',
          name: 'companyExpensesCost',
          options: this.columnOptions
        },
        {
          label: 'Company Expenses Cost Date Going',
          name: 'companyExpensesCostDateGoing',
          options: this.columnOptions
        },
        {
          label: 'Company Expenses Cost Date Out',
          name: 'companyExpensesCostDateOut',
          options: this.columnOptions
        },
        {
          name: 'objectives',
          label: 'Objectives',
          options: this.columnOptions
        },
        {
          name: 'objectivesDateGoing',
          label: 'Objectives Date Going',
          options: this.columnOptions
        },
        {
          name: 'objectivesDateOut',
          label: 'Objectives Date Out',
          options: this.columnOptions
        },
        {
          name: 'companyObjectivesCost',
          label: 'Company Objectives Cost',
          options: this.columnOptions
        },
        {
          name: 'companyObjectivesCostDateGoing',
          label: 'Company Objectives Cost Date Going',
          options: this.columnOptions
        },
        {
          name: 'companyObjectivesCostDateOut',
          label: 'Company Objectives Cost Date Out',
          options: this.columnOptions
        },
        {
          name: 'totalCompanyCost',
          label: 'Total Company Cost',
          options: this.columnOptions
        },
        {
          name: 'totalCompanyCostDateGoing',
          label: 'Total Company Cost Date Going',
          options: this.columnOptions
        },
        {
          name: 'totalCompanyCostDateOut',
          label: 'Total Company Cost Date Out',
          options: this.columnOptions
        },
        {
          name: 'Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            setCellProps: () => this.setCellProps(),
            setCellHeaderProps: () => this.setCellHeaderProps(),
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

  columnOptions = {
    filter: true,
    setCellProps: () => this.setCellProps(),
    setCellHeaderProps: () => this.setCellHeaderProps()
  };

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

  handleSetColumns = columnsType => {
    this.setState({
      columnsType
    });
  };

  setCellProps = () => ({
    style: {
      whiteSpace: 'nowrap',
      position: 'sticky',
      left: '0',
      background: 'white',
      zIndex: 100
    }
  });

  setCellHeaderProps = () => ({
    style: {
      whiteSpace: 'nowrap',
      position: 'sticky',
      left: 0,
      background: 'white',
      zIndex: 101
    }
  });

  renderColumns = () => {
    const {
      columnsType,
      generalInformationColumns,
      contractInformationColumns,
      economicInformationColumns
    } = this.state;
    if (columnsType === 'generalInformation') {
      return generalInformationColumns;
    }
    if (columnsType === 'contractInformation') {
      return contractInformationColumns;
    }
    if (columnsType === 'economicInformation') {
      return economicInformationColumns;
    }
    return [];
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  render() {
    const { allStaff, classes } = this.props;
    const { columnsType } = this.state;
    const options = {
      fixedHeader: true,
      fixedSelectColumn: false,
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
    const menuItems = [
      { name: 'General Information', value: 'generalInformation' },
      { name: 'Contract Information', value: 'contractInformation' },
      { name: 'Economic Information', value: 'economicInformation' }
    ];

    return (
      <div>
        {/* <Button onClick={() => this.handleSetColumns('generalInformation')}>
          General information
        </Button>
        <Button onClick={() => this.handleSetColumns('contractInformation')}>
          Contract information
        </Button>
        <Button onClick={() => this.handleSetColumns('economicInformation')}>
          Economic information
        </Button> */}
        <div className={classes.divInline}>
          <Typography
            variant="subtitle1"
            style={{
              color: '#000',
              fontFamily: 'sans-serif , Arial',
              fontSize: '15px',
              fontWeight: 'bold',
              opacity: 0.6,
              marginRight: 20
            }}
          >
            Show :
          </Typography>
          <FormControl className={classes.formControl} style={{ width: '50%' }}>
            <Select
              name="columnsType"
              value={columnsType}
              onChange={this.handleChange}
            >
              {menuItems.map(item => (
                <MenuItem key={item.name} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <MUIDataTable
          title=""
          data={allStaff}
          columns={this.renderColumns()}
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
