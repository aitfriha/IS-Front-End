import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Dialog, DialogContent, DialogTitle, Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import EconomicStaffService from '../../../Services/EconomicStaffService';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import { ThemeContext } from '../../../App/ThemeWrapper';
import EditEconomicStaff from './editEconomicStaff';

const useStyles = makeStyles();

class EconomicStaffBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      economicStaff: {},
      staffId: '',
      companyId: '',
      changeFactor: '',
      company: '',
      employeeNumber: '',
      name: '',
      fatherName: '',
      motherName: '',
      highDate: '',
      lowDate: '',
      grosSalary: '',
      netSalary: '',
      contributionSalary: '',
      companyCost: '',
      grosSalaryEuro: '',
      netSalaryEuro: '',
      contributionSalaryEuro: '',
      companyCostEuro: '',
      openPopUp: false,
      datas: [],
      columns: [
        {
          name: 'staff',
          label: 'First Name',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
            customBodyRender: (staff) => (
              <React.Fragment>
                {
                  staff.firstName
                }
              </React.Fragment>
            )
          }
        },
        {
          name: 'fatherName',
          label: 'Father Name',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'motherName',
          label: 'Mother Name',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'highDate',
          label: 'High Date',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'lowDate',
          label: 'Low Date',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'grosSalary',
          label: 'Gross Salary',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'grosSalaryEuro',
          label: 'Gross Salary (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'netSalary',
          label: 'Net Salary',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'netSalaryEuro',
          label: 'Net Salary (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'contributionSalary',
          label: 'Contribution Salary',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'contributionSalaryEuro',
          label: 'Contribution Salary (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'companyCost',
          label: 'Company Cost',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'companyCostEuro',
          label: 'Company Cost (€)',
          options: {
            filter: true,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 100
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 101
              }
            }),
          }
        },
        {
          name: 'Actions',
          label: ' Actions',
          options: {
            filter: false,
            setCellProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: '0',
                background: 'white',
                zIndex: 250
              }
            }),
            setCellHeaderProps: () => ({
              style: {
                whiteSpace: 'nowrap',
                position: 'sticky',
                left: 0,
                background: 'white',
                zIndex: 251
              }
            }),
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                <IconButton onClick={() => this.handleDetails(tableMeta)}>
                  <DetailsIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => this.handleDelete(tableMeta)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

    // eslint-disable-next-line react/sort-comp
    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        const economicStaff = result.data;
        console.log(economicStaff);
        this.setState({ openPopUp: true, economicStaff });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].economicStaffId;
      EconomicStaffService.deleteEconomicStaff(id).then(result => {
        this.setState({ datas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    componentDidMount() {
      EconomicStaffService.getEconomicStaff().then(result => {
        this.setState({ datas: result.data });
      });
      const {
        // eslint-disable-next-line react/prop-types
        changeTheme
      } = this.props;
      changeTheme('greyTheme');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    myCallback = (dataFromChild) => {
      EconomicStaffService.getEconomicStaff().then(result => {
        this.setState({ datas: result.data, openPopUp: dataFromChild });
      });
    };

    render() {
      console.log(this.state);
      const {
        datas, columns, openPopUp, economicStaff
      } = this.state;
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-financial/Add Economic Staff"
            tooltip="Add New Economic Staff"
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title=" Economic Staff List"
            data={datas}
            columns={columns}
            options={options}
          />
          <Dialog
            open={openPopUp}
            keepMounted
            scroll="body"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth=""
            maxWidth=""
          >
            <DialogTitle id="alert-dialog-slide-title"> View Details</DialogTitle>
            <DialogContent dividers>
              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={0} />
                <Grid item xs={11}>
                  <EditEconomicStaff Infos={economicStaff} callsbackFromParent={this.myCallback} />
                </Grid>
                <Grid item xs={0} />
              </Grid>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
}
const RetentionBlockMapped = connect()(EconomicStaffBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <RetentionBlockMapped changeTheme={changeTheme} classes={classes} />;
};
