import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';
import TypeOfCurrencylService from '../../../Services/TypeOfCurrencylService';
import { ThemeContext } from '../../../App/ThemeWrapper';
import SuppliersTypeService from '../../../Services/SuppliersTypeService';

const useStyles = makeStyles();

class ExternalSuppliersBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      openPopUp: false,
      row: [],
      columns: [
        {
          label: 'Name',
          name: 'name',
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
          label: 'Description',
          name: 'description',
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
          label: 'Operation Associated',
          name: 'operationAssociated',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  (value ? 'Yes' : 'No')
                }
              </React.Fragment>
            ),
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
          label: 'Client Name',
          name: 'client',
          options: {
            filter: true,
            customBodyRender: (client) => (
              <React.Fragment>
                {
                  (client.name ? client.name : '')
                }
              </React.Fragment>
            ),
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
          label: 'Client Code',
          name: 'client',
          options: {
            filter: true,
            customBodyRender: (client) => (
              <React.Fragment>
                {
                  (client.code ? client.code : '')
                }
              </React.Fragment>
            ),
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
          label: 'Operation Name',
          name: 'commercialOperation',
          options: {
            filter: true,
            customBodyRender: (commercialOperation) => (
              <React.Fragment>
                {
                  (commercialOperation.name ? commercialOperation.name : '')
                }
              </React.Fragment>
            ),
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
          label: 'Operation Code',
          name: 'commercialOperation',
          options: {
            filter: true,
            customBodyRender: (commercialOperation) => (
              <React.Fragment>
                {
                  (commercialOperation.code ? commercialOperation.code : '')
                }
              </React.Fragment>
            ),
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
          label: 'Status',
          name: 'commercialOperation',
          options: {
            filter: true,
            customBodyRender: (commercialOperation) => (
              <React.Fragment>
                {
                  (commercialOperation.status ? commercialOperation.status : '')
                }
              </React.Fragment>
            ),
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
          label: 'Estimated Trade Volume',
          name: 'commercialOperation',
          options: {
            filter: true,
            customBodyRender: (commercialOperation) => (
              <React.Fragment>
                {
                  (commercialOperation.estimatedTradeVolume ? commercialOperation.estimatedTradeVolume : '')
                }
              </React.Fragment>
            ),
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
          label: 'Devise',
          name: 'commercialOperation',
          options: {
            filter: true,
            customBodyRender: (commercialOperation) => (
              <React.Fragment>
                {
                  (commercialOperation.devise ? commercialOperation.devise : '')
                }
              </React.Fragment>
            ),
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
          label: 'Estimated Trade Volume (€)',
          name: 'commercialOperation',
          options: {
            filter: true,
            customBodyRender: (commercialOperation) => (
              <React.Fragment>
                {
                  (commercialOperation.estimatedTradeVolumeInEuro ? commercialOperation.estimatedTradeVolumeInEuro : '')
                }
              </React.Fragment>
            ),
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
          label: 'Internal Order',
          name: 'internalOrder',
          options: {
            filter: true,
            customBodyRender: (value) => (
              <React.Fragment>
                {
                  (value ? 'Yes' : 'No')
                }
              </React.Fragment>
            ),
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
          label: 'Company',
          name: 'financialCompany',
          options: {
            filter: true,
            customBodyRender: (financialCompany) => (
              <React.Fragment>
                {
                  financialCompany.name
                }
              </React.Fragment>
            ),
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
          label: 'Company Code',
          name: 'financialCompany',
          options: {
            filter: true,
            customBodyRender: (financialCompany) => (
              <React.Fragment>
                {
                  (financialCompany.code ? financialCompany.code : '')
                }
              </React.Fragment>
            ),
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
          label: 'Tax Number',
          name: 'financialCompany',
          options: {
            filter: true,
            customBodyRender: (financialCompany) => (
              <React.Fragment>
                {
                  (financialCompany.taxNumber ? financialCompany.taxNumber : '')
                }
              </React.Fragment>
            ),
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
          label: 'Actions',
          name: 'Actions',
          options: {
            filter: false,
            sort: false,
            empty: true,
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

  componentDidMount() {
    SuppliersTypeService.getSuppliersType().then(result => {
      console.log(result);
      this.setState({ datas: result.data });
    });
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

    // eslint-disable-next-line react/sort-comp
    handleDetails = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].typeOfCurrencyId;
      TypeOfCurrencylService.getTypeOfCurrencyById(id).then(result => {
        this.setState({
          typeOfCurrencyId: id,
          currencyName: result.data.currencyName,
          currencyCode: result.data.currencyCode,
          openPopUp: true
        });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
      let test = false;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].typeOfCurrencyId;
      console.log(id);
      // eslint-disable-next-line array-callback-return,react/destructuring-assignment
      this.state.currencies.map(row => {
        if ((row.typeOfCurrency._id) === (id)) test = true;
      });
      if (test) this.setState({ openWarning: true });
      else {
        TypeOfCurrencylService.deleteTypeOfCurrency(id).then(result => {
          this.setState({ datas: result.data });
        });
      }
    };

    handleClose = () => {
      this.setState({ openPopUp: false, openWarning: false });
    };

    handleSave = () => {
      let {
        currencyName, currencyCode
      } = this.state;
      const {
        typeOfCurrencyId
      } = this.state;
      currencyName = currencyName.toUpperCase();
      currencyCode = currencyCode.toUpperCase();
      const Currency = {
        typeOfCurrencyId, currencyName, currencyCode
      };
      TypeOfCurrencylService.updateTypeOfCurrency(Currency).then(result => {
        this.setState({ datas: result.data, openPopUp: false });
      });
    };

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      console.log(this.state);
      const {
        columns, openPopUp, datas, currencyName, currencyCode, openWarning
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
            url="/app/gestion-financial/Add-External Suppliers"
            tooltip="Add New External Supplier"
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="The Suppliers Type List"
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
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="currencyName"
                      label="Currency Name"
                      variant="outlined"
                      name="currencyName"
                      value={currencyName}
                      required
                      fullWidth
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="currencyCode"
                      label="Currency Code"
                      variant="outlined"
                      name="currencyCode"
                      value={currencyCode}
                      required
                      fullWidth
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
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSave}
              >
                            save
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openWarning}
            keepMounted
            scroll="paper"
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth=""
            maxWidth=""
          >
            <DialogTitle id="alert-dialog-slide-title"> Operation Denied </DialogTitle>
            <DialogContent dividers>
              <Typography
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  opacity: 0.4,
                  marginRight: 20,
                  width: '100%'
                }}
              >
                 This Currency is used in other module of this application
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}
const SuppliersTypeMapped = connect()(ExternalSuppliersBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <SuppliersTypeMapped changeTheme={changeTheme} classes={classes} />;
};
