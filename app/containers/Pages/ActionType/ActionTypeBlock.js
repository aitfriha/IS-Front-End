import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CustomToolbar from '../../../components/CustomToolbar/CustomToolbar';
import ActionTypeService from '../../Services/ActionTypeService';
import { ThemeContext } from '../../App/ThemeWrapper';

const useStyles = makeStyles();

class ActionTypeBlock extends React.Component {
  constructor(props) {
    super(props);
    const thelogedUser = JSON.parse(this.props.logedUser);
    this.state = {
      actionTypeId: '',
      datas: [],
      openPopUp: false,
      typeName: '',
      description: '',
      columns: [
        {
          label: 'Action Type Name',
          name: 'typeName',
          options: {
            filter: true
          }
        },
        {
          label: 'Description',
          name: 'description',
          options: {
            filter: true
          }
        },
        {
          label: 'Actions',
          name: 'Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta) => (
              <React.Fragment>
                {thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_access ? (
                  <IconButton onClick={() => this.handleDetails(tableMeta)}>
                    <DetailsIcon color="secondary" />
                  </IconButton>
                ) : null}
                {thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_delete ? (
                  <IconButton onClick={() => this.handleDelete(tableMeta)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                ) : null}
              </React.Fragment>
            )
          }
        }
      ]
    };
  }

  componentDidMount() {
    ActionTypeService.getActionType().then(result => {
      this.setState({ datas: result.data });
    });
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('redTheme');
  }

    // eslint-disable-next-line react/sort-comp
    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].actionTypeId;
      ActionTypeService.getActionTypeById(id).then(result => {
        this.setState({
          actionTypeId: id,
          typeName: result.data.typeName,
          description: result.data.description,
          openPopUp: true
        });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].actionTypeId;
      console.log(id);
      ActionTypeService.deleteActionType(id).then(result => {
        this.setState({ datas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    handleSave = () => {
      const {
        typeName, description, actionTypeId
      } = this.state;
      const ActionType = {
        actionTypeId, typeName, description
      };
      ActionTypeService.updateActionType(ActionType).then(result => {
        this.setState({ datas: result.data, openPopUp: false });
      });
    };

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      const {
        columns, openPopUp, datas, typeName, description
      } = this.state;
      const {
        logedUser
      } = this.props;
      const thelogedUser = JSON.parse(logedUser);
      let exportButton = false;
      if (thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_export) {
        exportButton = true;
      }
      const options = {
        filter: true,
        selectableRows: false,
        filterType: 'dropdown',
        responsive: 'stacked',
        download: exportButton,
        print: exportButton,
        rowsPerPage: 10,
        customToolbar: () => (
          <CustomToolbar
            csvData={datas}
            url="/app/gestion-commercial/Add Action-Type"
            tooltip="add new commercial action type"
            hasAddRole={thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_create}
            hasExportRole={thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_export}
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="Commercial Actions Type List"
            data={datas}
            columns={columns}
            options={options}
          />
          <Dialog
            open={openPopUp}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-slide-title"> View Details</DialogTitle>
            <DialogContent dividers>
              <div>
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                  justify="center"
                >
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="typeName"
                      label="Action Type Name"
                      variant="outlined"
                      name="typeName"
                      value={typeName}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    <TextField
                      id="description"
                      label="Description"
                      variant="outlined"
                      name="description"
                      value={description}
                      required
                      fullWidth
                      multiline
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                            Cancel
              </Button>
              {thelogedUser.userRoles[0].actionsNames.financialModule_typeOfCurrency_modify ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSave}
                >
                            save
                </Button>
              ) : null}
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}

const mapStateToProps = () => ({
  logedUser: localStorage.getItem('logedUser'),
});
const ActionTypeBlockMapped = connect(
  mapStateToProps,
  null
)(ActionTypeBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <ActionTypeBlockMapped changeTheme={changeTheme} classes={classes} />;
};
