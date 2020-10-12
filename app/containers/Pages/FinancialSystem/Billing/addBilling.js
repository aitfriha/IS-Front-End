import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import history from '../../../../utils/history';

class AddBilling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      billingDate: '',
      contractor: '',
      client: '',
      clientContractSigned: '',
      commercialOperation: '',
      purchaseOrderNumber: '',
      totalEuro: 0,
      totalLocal: 0,
      ivaCountry: '',
      ivaState: '',
      valueIVALocal: 0,
      valueIVAEuro: 0,
      totalIVAEuro: 0,
      totalIVALocal: 0,
      totalAmountEuro: 0,
      totalAmountLocal: 0,
      localCurrency: '',
      nbrConcepts: ['1'],
      items: [],
      desc: '',
      descTotalUSD: 0
    };
  }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleCreate = () => {
      history.push('/app/gestion-financial/Billing');
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Billing');
    }

    handleOpenConcept = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newElement = this.state.nbrConcepts.length + 1;
      // eslint-disable-next-line react/destructuring-assignment
      this.state.nbrConcepts.push(newElement);
      this.setState({ openDoc: true });
    }

    handleDeleteConcept = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
      if (this.state.nbrConcepts.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
        const newDocs = this.state.nbrConcepts.filter(rows => rows !== row);
        this.setState({ nbrConcepts: newDocs });
      }
    }

    render() {
      console.log(this.state);
      const clients = [
        {
          value: '1',
          label: 'aymen',
        },
        {
          value: '2',
          label: 'badr',
        },
        {
          value: '3',
          label: 'nour',
        }];
      const codeBill = [
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        }];
      const companies = [
        {
          value: '1',
          label: 'Implemental System',
        },
        {
          value: '2',
          label: 'TechniU',
        },
        {
          value: '3',
          label: 'CGD',
        }];
      const commercialOperations = [
        {
          value: '1',
          label: 'IS-Water Distribution',
        },
        {
          value: '2',
          label: 'SSRS Tool',
        }];
      const purchaseOrders = [
        {
          value: '1',
          label: '2154',
        },
        {
          value: '2',
          label: '2184',
        }];
      const currencies = [
        {
          value: '1',
          label: 'USD',
        },
        {
          value: '2',
          label: 'AUD',
        },
        {
          value: '3',
          label: 'BRL',
        },
        {
          value: '4',
          label: 'CAD',
        },
        {
          value: '5',
          label: 'ARS',
        },
        {
          value: '6',
          label: 'CLF',
        },
        {
          value: '7',
          label: 'COP',
        },
        {
          value: '8',
          label: 'CRC',
        },
        {
          value: '9',
          label: 'CUP',
        },
        {
          value: '10',
          label: 'DKK',
        }, {
          value: '11',
          label: 'MAD',
        }
      ];
      const ivaContries = [
        {
          value: '1',
          label: 'SPAIN',
        },
        {
          value: '2',
          label: 'FRANCE',
        },
        {
          value: '3',
          label: 'MOROCCO',
        }];
      const ivaStates = [
        {
          value: '1',
          label: 'Madrid',
        },
        {
          value: '2',
          label: 'Barcelona',
        },
        {
          value: '3',
          label: 'Malaga',
        }];
      const {
        code, billingDate, contractor,
        client, commercialOperation, clientContractSigned, purchaseOrderNumber, nbrConcepts,
        totalEuro, totalLocal, ivaCountry, ivaState, valueIVALocal, valueIVAEuro, totalIVAEuro, totalIVALocal, totalAmountEuro, totalAmountLocal, localCurrency, items, desc, descTotalUSD
      } = this.state;
      const title = brand.name + ' - Add New Bill';
      const description = brand.desc;
      return (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
          </Helmet>
          <PapperBlock title="Billing" desc="Create new bill" icon="ios-add-circle-outline">
            <Grid container spacing={1}>
              <Grid item xs={11} />
              <Grid item xs={1}>
                <IconButton onClick={() => this.handleGoBack()}>
                  <KeyboardBackspaceIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
            <Typography variant="subtitle2" component="h2" color="primary">
                       General Bill Informations
            </Typography>
            <br />
            <div>
              <div align="center">
                <Grid item xs={12} sm={8} md={8} alignItems="flex-start" align="center" />
              </div>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                direction="row"
                justify="space-around"
              >
                <Grid item xs={12} md={3} sm={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Code</InputLabel>
                    <Select
                      name="code"
                      value={code}
                      onChange={this.handleChange}
                    >
                      {
                        codeBill.map((clt) => (
                          <MenuItem key={clt.value} value={clt.value}>
                            {clt.label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3} sm={3}>
                  <TextField
                    id="billingDate"
                    label="Invoice Date"
                    name="billingDate"
                    value={billingDate}
                    type="date"
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Contractor</InputLabel>
                    <Select
                      name="contractor"
                      value={contractor}
                      onChange={this.handleChange}
                    >
                      {
                        companies.map((clt) => (
                          <MenuItem key={clt.value} value={clt.value}>
                            {clt.label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
                        Client Informations
            </Typography>
            <br />
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="space-around"
            >
              <Grid item xs={12} md={5} sm={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Client </InputLabel>
                  <Select
                    name="client"
                    value={client}
                    onChange={this.handleChange}
                  >
                    {
                      clients.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5} sm={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Commercial Operation</InputLabel>
                  <Select
                    name="commercialOperation"
                    value={commercialOperation}
                    onChange={this.handleChange}
                  >
                    {
                      commercialOperations.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5} sm={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Contract Signed Client</InputLabel>
                  <Select
                    name="clientContractSigned"
                    value={clientContractSigned}
                    onChange={this.handleChange}
                  >
                    {
                      clients.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5} sm={5}>
                <FormControl fullWidth required>
                  <InputLabel>Select Purchase Order Number</InputLabel>
                  <Select
                    name="purchaseOrderNumber"
                    value={purchaseOrderNumber}
                    onChange={this.handleChange}
                  >
                    {
                      purchaseOrders.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
                        Concepts Of The Invoice
            </Typography>
            <br />
            {nbrConcepts.map((row) => (
              <Grid
                container
                spacing={4}
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={0} />
                <Grid item xs={1} align="center">
                  <Typography variant="subtitle2" component="h3" color="grey">
                    <br />
                    Item
                    {' '}
                    { row }
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="desc"
                    label="Description"
                    name="desc"
                    value={desc}
                    multiline
                    rows={1}
                    onChange={this.handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="TotalUSD"
                    label="Amount in Currency"
                    name="descTotalUSD"
                    value={descTotalUSD}
                    type="number"
                    onChange={this.handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={1}>
                  <br />
                  <IconButton size="medium" color="primary" onClick={() => this.handleOpenConcept()}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="primary" onClick={() => this.handleDeleteConcept(row)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
                        Economic Value Of The Bill
            </Typography>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="space-around"
            >
              <Grid item md={0} />
              <Grid item xs={12} md={6}>
                <br />
                <Typography variant="subtitle2" component="h2" color="primary">
                        Total Amount Net
                </Typography>
              </Grid>
              <Grid item md={3} />
              <Grid item xs={12} md={4} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel>Select Local Currency </InputLabel>
                  <Select
                    name="localCurrency"
                    value={localCurrency}
                    onChange={this.handleChange}
                  >
                    {
                      currencies.map((clt) => (
                        <MenuItem key={clt.value} value={clt.value}>
                          {clt.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                  id="totalLocal"
                  label="Total in Local Currency"
                  name="totalLocal"
                  value={totalLocal}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                  id="totalEuro"
                  label="Total in EURO"
                  name="totalEuro"
                  value={totalEuro}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={0} />
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" component="h2" color="primary">
                    I.V.A Taxes
                </Typography>
              </Grid>
              <Grid item md={3} />
              <Grid item xs={12} md={3} sm={3}>
                <FormControl fullWidth required>
                  <InputLabel>Select I.V.A Country</InputLabel>
                  <Select
                    name="ivaCountry"
                    value={ivaCountry}
                    onChange={this.handleChange}
                  >
                    {
                      ivaContries.map((clt) => (
                        <MenuItem key={clt.value} value={clt.value}>
                          {clt.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <FormControl fullWidth required>
                  <InputLabel>Select State</InputLabel>
                  <Select
                    name="ivaState"
                    value={ivaState}
                    onChange={this.handleChange}
                  >
                    {
                      ivaStates.map((clt) => (
                        <MenuItem key={clt.value} value={clt.value}>
                          {clt.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="totalIVALocal"
                  label="I.V.A Value in Local Currency"
                  name="totalIVALocal"
                  value={valueIVALocal}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="totalIVAEuro"
                  label="I.V.A Value in EURO"
                  name="totalIVAEuro"
                  value={valueIVAEuro}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={2} />
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                  id="totalIVALocal"
                  label="Total I.V.A in Local Currency"
                  name="totalIVALocal"
                  value={totalIVALocal}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <TextField
                  id="totalIVAEuro"
                  label="Total I.V.A in EURO"
                  name="totalIVAEuro"
                  value={totalIVAEuro}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={2} />
              <Grid item md={0} />
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" component="h2" color="primary">
                        Total Amount
                </Typography>
              </Grid>
              <Grid item md={3} />
              <Grid item xs={12} md={5} sm={5}>
                <TextField
                  id="totalAmountLocal"
                  label="Total Amount in Local Currency"
                  name="totalAmountLocal"
                  value={totalAmountLocal}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5} sm={5}>
                <TextField
                  id="totalAmountEuro"
                  label="Total Amount in EURO"
                  name="totalAmountEuro"
                  value={totalAmountEuro}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <br />
            <Typography variant="subtitle2" component="h2" color="primary">
                Possible Retentions
            </Typography>
            <br />
            <br />
            <div align="center">
              <Button size="small" color="inherit" onClick={this.handleGoBack}>Cancel</Button>
              <Button variant="contained" color="primary" type="button" onClick={this.handleCreate}>
                            Save
              </Button>
            </div>
          </PapperBlock>
        </div>
      );
    }
}

export default AddBilling;
