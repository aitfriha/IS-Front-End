import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  FormControl,
  Grid, InputLabel, MenuItem, Select, TextField, Typography
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { connect } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import { Image } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import history from '../../../../utils/history';
import { ThemeContext } from '../../../App/ThemeWrapper';
import SuppliersContractService from '../../../Services/SuppliersContractService';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';
import ExternalSuppliersService from '../../../Services/ExternalSuppliersService';
import CurrencyService from '../../../Services/CurrencyService';

const useStyles = makeStyles();

class AddSuppliersContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      codeContract: '',
      codeSupplier: '',
      changeFactor: 1,
      currencies: [],
      currencyId: '',
      contractTradeVolume: 0,
      contractTradeVolumeEuro: 0,
      commercialOperationInfo: [],
      document: '',
      companies: [],
      externalSuppliers: [],
      externalSupplierId: '',
      financialCompanyId: '',
      type: '',
      haveExternal: false,
      haveInternal: false
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
    FinancialCompanyService.getCompany().then(result => {
      console.log(result);
      this.setState({ companies: result.data });
    });
    ExternalSuppliersService.getExternalSuppliers().then(result => {
      console.log(result);
      this.setState({ externalSuppliers: result.data });
    });
    CurrencyService.getFilteredCurrency().then(result => {
      this.setState({ currencies: result.data });
    });
  }


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

    handleSubmit = () => {
      const {
        name, codeContract, codeSupplier, document, externalSupplierId, financialCompanyId, type,
        currencyId, contractTradeVolume, contractTradeVolumeEuro, changeFactor
      } = this.state;
      const currency = { _id: currencyId };
      let financialCompany = { _id: '' };
      let externalSupplier = { _id: '' };
      if (financialCompanyId !== '') financialCompany = { _id: financialCompanyId };
      if (externalSupplierId !== '') externalSupplier = { _id: externalSupplierId };
      const SuppliersContract = {
        name, codeContract, codeSupplier, document, externalSupplier, financialCompany, type, currency, contractTradeVolume, contractTradeVolumeEuro, changeFactor
      };
      console.log(SuppliersContract);
      SuppliersContractService.saveSuppliersContract(SuppliersContract).then(result => {
        console.log(result);
        history.push('/app/gestion-financial/Suppliers Contract');
      });
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Suppliers Contract');
    }

    handleChange = (ev) => {
      let changeFactor;
      if (ev.target.name === 'currencyId') {
        // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const tradeValue = this.state.contractTradeVolume;
        // eslint-disable-next-line react/destructuring-assignment,array-callback-return
        this.state.currencies.map(currency => {
          // eslint-disable-next-line prefer-destructuring
          if (currency.currencyId === ev.target.value) {
            // eslint-disable-next-line prefer-destructuring
            changeFactor = currency.changeFactor;
          }
        });
        this.setState({ contractTradeVolumeEuro: tradeValue * changeFactor, changeFactor });
      }
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
      const title = brand.name + ' - Add New Supplier Contract';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        name, codeSupplier, companies, externalSuppliers, type, document,
        currencyId, contractTradeVolume, contractTradeVolumeEuro, currencies,
        haveExternal, haveInternal, externalSupplierId, financialCompanyId
      } = this.state;
      return (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={desc} />
          </Helmet>
          <PapperBlock
            title="Supplier Contract"
            desc="Please, Fill in the fields"
            icon="ios-add-circle"
          >
            <Grid container spacing={1}>
              <Grid item xs={11} />
              <Grid item xs={1}>
                <IconButton onClick={() => this.handleGoBack()}>
                  <KeyboardBackspaceIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
            <br />
            <Typography variant="subtitle2" component="h2" color="primary" align="center" />
            <br />
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
                <Grid
                  container
                  spacing={2}
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="Contract Trade Volume"
                      label="Contract Trade Volume"
                      type="number"
                      name="contractTradeVolume"
                      value={contractTradeVolume}
                      onChange={this.handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Currency</InputLabel>
                      <Select
                        name="currencyId"
                        value={currencyId}
                        onChange={this.handleChange}
                      >
                        {
                          currencies.map((clt) => (
                            <MenuItem key={clt.currencyId} value={clt.currencyId}>
                              {clt.typeOfCurrency.currencyName}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="contractTradeVolumeEuro"
                      label="Trade Value (Euro)"
                      type="number"
                      name="contractTradeVolumeEuro"
                      value={contractTradeVolumeEuro}
                      onChange={this.handleChange}
                      fullWidth
                      required
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
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
            <div align="center">
              <br />
              <br />
              <Button size="small" color="inherit" onClick={this.handleGoBack}>Cancel</Button>
              <Button variant="contained" color="primary" type="button" onClick={this.handleSubmit}>
                            Save
              </Button>
            </div>
          </PapperBlock>
        </div>
      );
    }
}


const AddSuppliersContractMapped = connect(
)(AddSuppliersContract);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddSuppliersContractMapped changeTheme={changeTheme} classes={classes} />;
};
