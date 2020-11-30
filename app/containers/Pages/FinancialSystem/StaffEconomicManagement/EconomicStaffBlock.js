import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import EconomicStaffService from '../../../Services/EconomicStaffService';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import { ThemeContext } from '../../../App/ThemeWrapper';

const useStyles = makeStyles();

class EconomicStaffBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retentionId: '',
      name: '',
      description: '',
      openPopUp: false,
      currentCity: '',
      addressId: '',
      address: [],
      datas: [],
      columns: [
        {
          name: 'name',
          label: 'Name',
          options: {
            filter: true
          }
        },
        {
          name: 'description',
          label: 'Description',
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
      const id = this.state.datas[index].retentionId;
      EconomicStaffService.getEconomicStaffById(id).then(result => {
        console.log(result.data);
        this.setState({
          retentionId: result.data._id,
          name: result.data.name,
          description: result.data.description,
          address: result.data.address,
          addressId: result.data.address.addressId,
          openPopUp: true
        });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].retentionId;
      EconomicStaffService.deleteEconomicStaff(id).then(result => {
        console.log(result.data);
        this.setState({ datas: result.data });
      });
    };

    handleSave = () => {
      const {
        retentionId, name, descrption, currentCity, addressId
      } = this.state;
      const city = { _id: currentCity };
      const address = {
        addressId, city
      };
      const EconomicStaff = {
        retentionId, name, descrption, address
      };

      EconomicStaffService.updateEconomicStaff(EconomicStaff).then(result => {
        this.setState({ datas: result.data, openPopUp: false });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    componentDidMount() {
      EconomicStaffService.getEconomicStaff().then(result => {
        console.log(result);
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

    render() {
      console.log(this.state);
      const {
        datas, columns, openPopUp
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
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> View Details</DialogTitle>
            <DialogContent dividers />
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                            Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                            save
              </Button>
            </DialogActions>
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
