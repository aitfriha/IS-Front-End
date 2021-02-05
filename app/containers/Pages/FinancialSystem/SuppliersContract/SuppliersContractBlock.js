import React, { useContext } from 'react';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DetailsIcon from '@material-ui/icons/Details';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Image } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import ExternalSuppliersService from '../../../Services/ExternalSuppliersService';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';
import SuppliersContractService from '../../../Services/SuppliersContractService';
import { ThemeContext } from '../../../App/ThemeWrapper';
import CustomToolbar from '../../../../components/CustomToolbar/CustomToolbar';

const useStyles = makeStyles();

class SuppliersContractBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierContractId: '',
      name: '',
      codeContract: '',
      codeSupplier: '',
      document: '',
      companies: [],
      externalSuppliers: [],
      externalSupplierId: '',
      financialCompanyId: '',
      type: '',
      haveExternal: false,
      haveInternal: false,
      datas: [],
      openPopUp: false,
      row: [],
      columns: [
        {
          label: 'Contract Name',
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
          label: 'Code Contract',
          name: 'codeContract',
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
          label: 'Code Supplier',
          name: 'codeSupplier',
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
          label: 'Supplier Type',
          name: 'type',
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
          label: 'Supplier Name',
          name: 'externalSupplier',
          options: {
            filter: true,
            customBodyRender: (externalSupplier) => (
              <React.Fragment>
                {
                  externalSupplier ? externalSupplier.companyName : '---'
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
          label: 'Supplier Code',
          name: 'externalSupplier',
          options: {
            filter: true,
            customBodyRender: (externalSupplier) => (
              <React.Fragment>
                {
                  externalSupplier ? externalSupplier.code : '---'
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
          label: 'Company Name',
          name: 'financialCompany',
          options: {
            filter: true,
            customBodyRender: (financialCompany) => (
              <React.Fragment>
                {
                  financialCompany ? financialCompany.name : '---'
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
                  financialCompany ? financialCompany.code : '---'
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
          label: 'Signed Contract Doc',
          name: 'document',
          options: {
            filter: true,
            customBodyRender: (document) => (
              <React.Fragment>
                {
                  document ? 'Yes' : 'No'
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
    SuppliersContractService.getSuppliersContract().then(result => {
      console.log(result);
      this.setState({ datas: result.data });
    });
    FinancialCompanyService.getCompany().then(result => {
      console.log(result);
      this.setState({ companies: result.data });
    });
    ExternalSuppliersService.getExternalSuppliers().then(result => {
      console.log(result);
      this.setState({ externalSuppliers: result.data });
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
      const id = this.state.datas[index].supplierContractId;
      SuppliersContractService.getSuppliersContractById(id).then(result => {
        console.log(result);
        this.setState({
          supplierContractId: id,
          name: result.data.name,
          codeContract: result.data.codeContract,
          codeSupplier: result.data.codeSupplier,
          document: result.data.document,
          externalSupplierId: result.data.type === 'external' ? result.data.externalSupplier._id : '',
          financialCompanyId: result.data.type === 'internal' ? result.data.financialCompany._id : '',
          type: result.data.type,
          haveExternal: result.data.type === 'external',
          haveInternal: result.data.type === 'internal',
          openPopUp: true
        });
      });
    }

    handleDelete = (tableMeta) => {
      const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage
            + tableMeta.rowIndex;
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const id = this.state.datas[index].supplierContractId;
      console.log(id);
      // eslint-disable-next-line array-callback-return,react/destructuring-assignment
      SuppliersContractService.deleteSuppliersContract(id).then(result => {
        this.setState({ datas: result.data });
      });
    };

    handleClose = () => {
      this.setState({ openPopUp: false });
    };

    // eslint-disable-next-line react/sort-comp
    readURI(e) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        console.log(e.target.files);
        reader.onload = function (ev) {
          this.setState({ document: ev.target.result });
        }.bind(this);
        reader.readAsDataURL(e.target.files[0]);
      }
    }

    handleChangeLogo = e => {
      this.readURI(e);
    };

    handleSave = () => {
      const {
        supplierContractId, name, codeContract, codeSupplier, document, externalSupplierId, financialCompanyId, type
      } = this.state;
      let financialCompany = { _id: '' };
      let externalSupplier = { _id: '' };
      if (financialCompanyId !== '') financialCompany = { _id: financialCompanyId };
      if (externalSupplierId !== '') externalSupplier = { _id: externalSupplierId };
      const SuppliersContract = {
        supplierContractId, name, codeContract, codeSupplier, document, externalSupplier, financialCompany, type
      };
      console.log(SuppliersContract);
      SuppliersContractService.updateSuppliersContract(SuppliersContract).then(result => {
        this.setState({ datas: result.data, openPopUp: false });
      });
    };

    handleChange = (ev) => {
      if (ev.target.name === 'type') {
        if (ev.target.value === 'external') this.setState({ haveExternal: true, haveInternal: false });
        else this.setState({ haveInternal: true, haveExternal: false });
      }
      if (ev.target.name === 'externalSupplierId') {
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.externalSuppliers.map(row => {
          if (row.externalSupplierId === ev.target.value) this.setState({ codeSupplier: row.code, codeContract: row.code, financialCompanyId: '' });
        });
      }
      if (ev.target.name === 'financialCompanyId') {
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.companies.map(row => {
          if (row.financialCompanyId === ev.target.value) this.setState({ codeSupplier: row.code, codeContract: row.code, externalSupplierId: '' });
        });
      }
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      console.log(this.state);
      const {
        columns, openPopUp, datas,
        name, codeSupplier, companies, externalSuppliers, type, document,
        haveExternal, haveInternal, externalSupplierId, financialCompanyId
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
            url="/app/gestion-financial/Add-Suppliers-Contract"
            tooltip="Add New Supplier Contract"
          />
        )
      };

      return (
        <div>
          <MUIDataTable
            title="The Suppliers Contract List"
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
              <Grid
                container
                spacing={6}
                alignItems="flex-start"
                direction="row"
                justify="center"
              >
                <Grid item xs={12} md={6}>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={name}
                    required
                    fullWidth
                    onChange={this.handleChange}
                  />
                  <br />
                  <br />
                  <FormControl component="fieldset">
                    <FormLabel component="legend"> ● Supplier Type</FormLabel>
                    <RadioGroup row aria-label="position" name="type" value={type} onChange={this.handleChange}>
                      <FormControlLabel
                        value="external"
                        control={<Radio color="primary" />}
                        label="External"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="internal"
                        control={<Radio color="primary" />}
                        label="Internal"
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <br />
                  {haveExternal ? (
                    <Grid
                      container
                      spacing={2}
                      alignItems="flex-start"
                      direction="row"
                      justify="center"
                    >
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth required>
                          <InputLabel>Select External Supplier</InputLabel>
                          <Select
                            name="externalSupplierId"
                            value={externalSupplierId}
                            variant="outlined"
                            fullWidth
                            onChange={this.handleChange}
                          >
                            {
                              externalSuppliers.map((clt) => (
                                <MenuItem key={clt.externalSupplierId} value={clt.externalSupplierId}>
                                  {clt.companyName}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="codeSupplier"
                          label="Supplier Code"
                          variant="outlined"
                          name="codeSupplier"
                          value={codeSupplier}
                          required
                          fullWidth
                          disabled
                        />
                      </Grid>
                    </Grid>
                  ) : (<div />)}
                  {haveInternal ? (
                    <Grid
                      container
                      spacing={2}
                      alignItems="flex-start"
                      direction="row"
                      justify="center"
                    >
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth required>
                          <InputLabel>Select Internal Company</InputLabel>
                          <Select
                            name="financialCompanyId"
                            value={financialCompanyId}
                            variant="outlined"
                            onChange={this.handleChange}
                            fullWidth
                          >
                            {
                              companies.map((clt) => (
                                <MenuItem key={clt.financialCompanyId} value={clt.financialCompanyId}>
                                  {clt.name}
                                </MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="codeSupplier"
                          label="Supplier Code"
                          variant="outlined"
                          name="codeSupplier"
                          value={codeSupplier}
                          required
                          fullWidth
                          disabled
                        />
                      </Grid>
                    </Grid>
                  ) : (<div />)}
                  <br />
                  <br />
                  <FormControl>
                    <input
                      style={{ display: 'none' }}
                      id="outlined-button-file-2"
                      type="file"
                      onChange={this.handleChangeLogo.bind(this)}
                    />
                    <FormLabel htmlFor="outlined-button-file-2">
                      <Button
                        fullWidth
                        variant="outlined"
                        component="span"
                        startIcon={<Image color="primary" />}
                      >
                        Document
                      </Button>
                    </FormLabel>
                  </FormControl>
                  <br />
                  <br />
                  {
                    document ? (
                      <Avatar alt="User Name" src={document} />
                    ) : (<div />)
                  }
                </Grid>
              </Grid>
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
        </div>
      );
    }
}
const PurchaseOrderMapped = connect()(SuppliersContractBlock);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <PurchaseOrderMapped changeTheme={changeTheme} classes={classes} />;
};
