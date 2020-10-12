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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import { Image } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import history from '../../../../utils/history';
import Converter from '../../../../components/CurrencyConverter/Converter';

class AddContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: '',
      operation: '',
      company: '',
      state: 1,
      clientContractSigned: '',
      taxeIdentityNumber: '',
      addressOfBill: '',
      countryOfBill: '',
      stateOfBill: '',
      cityOfBill: '',
      level1: '',
      level2: '',
      level3: '',
      signedDate: '',
      startDate: '',
      endDate: '',
      finalReelDate: '',
      amountEuro: '',
      amountLocal: '',
      currency: '',
      paymentsBDDays: '',
      nbrConcepts: ['1'],
      conceptType: 0,
      conceptValue: '',
      conceptValueLocal: '',
      conceptValueEuro: '',
      conceptCurrency: '',
      conceptTotalAmount: 0,
      conceptTotalAmountEuro: 0,
      penalties: '',
      penaltyQuantity: '',
      penaltyValue: 0,
      penaltyCost: '',
      penaltyPer: '',
      penaltyMaxValue: '',
      penaltyMaxType: '',
      penaltiesListe: [''],
      purchaseOrder: 0,
      purchaseOrders: ['1'],
      purchaseOrderNumber: 0,
      purchaseOrderReceiveDate: '',
      insure: '',
      firstDayInsured: '',
      lastDayInsured: '',
      amountInsured: '',
      proposal: '',
      proposalDocumentations: ['1'],
      insureDocumentation: '',
      insureDocumentations: ['1'],
      contractDocumentations: ['1'],
      contractDocDescreption: '',
      radio: '',
      open: false,
      open2: false,
      open3: false,
      open4: false,
      openDoc: true
    };
  }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleCheck = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok = !this.state.open;
      this.setState({ open: ok });
    }

    handleCheck2 = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const ok2 = !this.state.open2;
      this.setState({ open2: ok2 });
    }

  handleCheck3 = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const ok3 = !this.state.open3;
    this.setState({ open3: ok3 });
  }

  handleCheck4 = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const ok4 = !this.state.open4;
    this.setState({ open4: ok4 });
  }

  handleCheck5 = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const ok = !this.state.open5;
    this.setState({ open5: ok });
  }

  handleCheck6 = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const ok = !this.state.open6;
    this.setState({ open6: ok });
  }

  handleOpenDoc3 = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.contractDocumentations.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.contractDocumentations.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeleteDoc3 = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.contractDocumentations.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.contractDocumentations.filter(rows => rows !== row);
      this.setState({ contractDocumentations: newDocs });
    }
  }

    handleOpenDoc2 = () => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newElement = this.state.proposalDocumentations.length + 1;
      // eslint-disable-next-line react/destructuring-assignment
      this.state.proposalDocumentations.push(newElement);
      this.setState({ openDoc: true });
    }

  handleDeleteDoc2 = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.proposalDocumentations.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.proposalDocumentations.filter(rows => rows !== row);
      this.setState({ proposalDocumentations: newDocs });
    }
  }

  handleOpenDoc = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.insureDocumentations.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.insureDocumentations.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeleteDoc = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.insureDocumentations.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.insureDocumentations.filter(rows => rows !== row);
      this.setState({ insureDocumentations: newDocs });
    }
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

  handleAddPenalty = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.penaltiesListe.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.penaltiesListe.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeletePenalty = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.penaltiesListe.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.penaltiesListe.filter(rows => rows !== row);
      this.setState({ penaltiesListe: newDocs });
    }
  }

  handleOpenPurchase = () => {
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const newElement = this.state.purchaseOrders.length + 1;
    // eslint-disable-next-line react/destructuring-assignment
    this.state.purchaseOrders.push(newElement);
    this.setState({ openDoc: true });
  }

  handleDeletePurchase = (row) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.purchaseOrders.length > 1) {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newDocs = this.state.purchaseOrders.filter(rows => rows !== row);
      this.setState({ purchaseOrders: newDocs });
    }
  }

    handleCreate = () => {
      history.push('/app/gestion-financial/Contracts');
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Contracts');
    }

  handleChangeFile = e => {
    this.readURI(e);
  };

  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.files);
      reader.onload = function (ev) {
        this.setState({ insureDocumentation: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  render() {
    console.log(this.state);
    const Level1 = [
      {
        value: 1,
        label: 'Gestion',
      },
      {
        value: 2,
        label: 'Commercial',
      }];
    const Level2 = [
      {
        value: 1,
        label: 'Assistant',
      },
      {
        value: 2,
        label: 'Human Resources',
      }];
    const conceptTypes = [
      {
        value: 1,
        label: 'Percentage % ',
      },
      {
        value: 2,
        label: 'Amount',
      }];
    const operations = [
      {
        value: '1',
        label: 'Operation 1',
      },
      {
        value: '2',
        label: 'Operation 2',
      }];
    const MaxValue = [
      {
        value: '1',
        label: 'Of the Value Of Contract',
      },
      {
        value: '2',
        label: 'Of the Value Of Purchase Order',
      }];
    const Quantities = [
      {
        value: '1',
        label: 'Per cent %',
      },
      {
        value: '2',
        label: 'Per Economic Volume',
      }];
    const penaltiesCost = [
      {
        value: '1',
        label: 'Per All The Volume Of Contract',
      },
      {
        value: '2',
        label: 'Per One Activity',
      }];
    const penaltiesPer = [
      {
        value: '1',
        label: 'Per Hour',
      },
      {
        value: '2',
        label: 'Per Day',
      },
      {
        value: '3',
        label: 'Per Week',
      },
      {
        value: '4',
        label: 'Per Month',
      }];
    const clients = [
      {
        value: '1',
        label: 'WFS-FRANCIA',
      },
      {
        value: '2',
        label: 'WATER SUPPLY',
      },
      {
        value: '3',
        label: 'IS-FLIGHT',
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
    const states = [
      {
        value: '1',
        label: 'SIGNED',
      },
      {
        value: '2',
        label: 'IN PROGRESS',
      },
      {
        value: '3',
        label: 'FINISHED',
      },
      {
        value: '4',
        label: 'FINISHED PENDING PAYMENT',
      }];
    const {
      client, operation, company, state, clientContractSigned, taxeIdentityNumber, nbrConcepts, radio,
      conceptType, conceptValue, conceptValueEuro, conceptValueLocal, conceptCurrency, conceptTotalAmount, conceptTotalAmountEuro,
      countryOfBill, stateOfBill, cityOfBill, addressOfBill, signedDate, startDate, endDate, finalReelDate,
      penaltyMaxType, amountEuro, amountLocal, currency, paymentsBDDays, penalties, penaltyQuantity, penaltyValue,
      penaltyCost, penaltyPer, penaltyMaxValue, purchaseOrder, penaltiesListe, purchaseOrderNumber, purchaseOrderReceiveDate, purchaseOrders,
      insure, firstDayInsured, lastDayInsured, amountInsured, proposal, open, open2, open3, open4, level1, level2, level3, openDoc, contractDocDescreption
    } = this.state;
    const title = brand.name + ' - Blank Page';
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
        <PapperBlock title="Client Contracts " desc="Create new client contract " icon="ios-add-circle">
          <Grid container spacing={1}>
            <Grid item xs={11} />
            <Grid item xs={1}>
              <IconButton onClick={() => this.handleGoBack()}>
                <KeyboardBackspaceIcon color="secondary" />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="subtitle2" component="h2" color="primary">
                        Contract Information
          </Typography>
          <br />
          <div>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="space-around"
            >
              <Grid item xs={12} md={3} sm={3}>
                <FormControl fullWidth required>
                  <InputLabel>Select the client</InputLabel>
                  <Select
                    name="client"
                    value={client}
                    onChange={this.handleChange}
                  >
                    {
                      clients.map((clt) => (
                        <MenuItem key={clt.value} value={clt.value}>
                          {clt.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} md={3} alignItems="flex-start">
                <FormControl fullWidth required>
                  <InputLabel>Select Operation</InputLabel>
                  <Select
                    name="operation"
                    value={operation}
                    onChange={this.handleChange}
                  >
                    {
                      operations.map((clt) => (
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
                  <InputLabel>Select Client Company Name</InputLabel>
                  <Select
                    name="company"
                    value={company}
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
              <Grid item xs={12} md={3} sm={3}>
                <FormControl fullWidth required>
                  <InputLabel>Select State</InputLabel>
                  <Select
                    name="state"
                    value={state}
                    onChange={this.handleChange}
                  >
                    {
                      states.map((clt) => (
                        <MenuItem key={clt.value} value={clt.value}>
                          {clt.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h2" color="primary">
                  Functional Structure Assigned
                </Typography>
              </Grid>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                direction="row"
                justify="space-around"
              >
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Level 1</InputLabel>
                    <Select
                      name="level1"
                      value={level1}
                      onChange={this.handleChange}
                    >
                      {
                        Level1.map((clt) => (
                          <MenuItem key={clt.value} value={clt.value}>
                            {clt.label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Level 2</InputLabel>
                    <Select
                      name="level2"
                      value={level2}
                      onChange={this.handleChange}
                    >
                      {
                        Level2.map((clt) => (
                          <MenuItem key={clt.value} value={clt.value}>
                            {clt.label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Level 3</InputLabel>
                    <Select
                      name="level3"
                      value={level3}
                      onChange={this.handleChange}
                    >
                      {
                        Level2.map((clt) => (
                          <MenuItem key={clt.value} value={clt.value}>
                            {clt.label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" component="h2" color="primary">
                  Taxe Identity
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="taxeIdentityNumber"
                  label="Taxe Identity Number"
                  name="taxeIdentityNumber"
                  value={operation}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
              </Grid>
              {/*   <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="addressOfBill"
                  label="Full Address Of Bill"
                  name="addressOfBill"
                  value={addressOfBill}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
              </Grid> */}
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="countryOfBill"
                  label=" Country Of Bill "
                  name="countryOfBill"
                  value={countryOfBill}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="stateOfBill"
                  label="State Of Bill "
                  name="stateOfBill"
                  value={stateOfBill}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="cityOfBill"
                  label="City Of Bill "
                  name="cityOfBill"
                  value={cityOfBill}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            {openDoc === false ? (
              <div />
            ) : (
              <FormControl fullWidth required>
                <br />
                <input
                  style={{ display: 'none' }}
                  id="outlined-button-file-2"
                  type="file"
                  onClick={this.handleChangeFile.bind(this)}
                />
                <FormLabel htmlFor="outlined-button-file-2">
                  {/* eslint-disable-next-line react/destructuring-assignment */}
                  {this.state.contractDocumentations.map((row) => (
                    <Grid
                      container
                      spacing={3}
                      alignItems="flex-start"
                      direction="row"
                    >
                      <Grid item xs={3}>
                        <br />
                        <Button
                          fullWidth
                          variant="outlined"
                          component="span"
                          startIcon={<Image color="primary" />}
                        >
                                    Documentation File
                        </Button>
                      </Grid>
                      <Grid xs={4}>
                        <TextField
                          id="contractDocDescreption"
                          label="Description"
                          name="contractDocDescreption"
                          value={contractDocDescreption}
                          onChange={this.handleChange}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid xs={1}>
                        <br />
                        <IconButton size="medium" color="primary" onClick={() => this.handleOpenDoc3()}>
                          <AddIcon />
                        </IconButton>
                        <IconButton size="small" color="primary" onClick={() => this.handleDeleteDoc3(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </FormLabel>
              </FormControl>
            )}
            <br />
            <br />
          </div>
          <Typography variant="subtitle2" component="h2" color="primary">
                        Dates Of Contract
          </Typography>
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid item xs={12} sm={7} md={5}>
              <TextField
                id="signedDate"
                label="Signed Date"
                type="date"
                name="signedDate"
                value={signedDate}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={7} md={5}>
              <TextField
                id="startDate"
                label="Start Date"
                type="date"
                name="startDate"
                value={startDate}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={7} md={5}>
              <TextField
                id="endDate"
                label="End Date"
                type="date"
                name="endDate"
                value={endDate}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={7} md={5}>
              <TextField
                id="finalReelDate"
                label="Reel End Date"
                type="date"
                name="finalReelDate"
                value={finalReelDate}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
                        Economic Value Of The Contract
          </Typography>
          <br />
          <br />
          <Grid
            container
            spacing={1}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid item xs={6}>
              <Converter Title="Contract Trade Volume  " />
            </Grid>
            <Grid item xs={5}>
              <br />
              <TextField
                id="paymentsBDDays"
                label="Payments BD per Day"
                type="number"
                name="paymentsBDDays"
                value={paymentsBDDays}
                onChange={this.handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
            Method of Payment
          </Typography>
          <br />
          {nbrConcepts.map((row) => (
            <Grid
              container
              spacing={1}
              alignItems="flex-start"
              direction="row"
            >
              <Grid item xs={1} align="center">
                <Typography variant="subtitle2" component="h3" color="grey">
                  <br />
                  Concept
                  {' '}
                  { row }
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth required>
                  <InputLabel>Select Type</InputLabel>
                  <Select
                    name="conceptType"
                    value={conceptType}
                    onChange={this.handleChange}
                  >
                    {
                      conceptTypes.map((clt) => (
                        <MenuItem key={clt.value} value={clt.value}>
                          {clt.label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="conceptValue"
                  label="Concept Value"
                  type="number"
                  name="conceptValue"
                  value={conceptValue}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
              </Grid>
              {conceptType === 2 ? (
                <Grid item xs={2} />
              ) : (
                <Grid item xs={2}>
                  <TextField
                    id="conceptValueLocal"
                    label="Concept Value in Currency"
                    name="conceptValueLocal"
                    value={conceptValueLocal}
                    type="number"
                    onChange={this.handleChange}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={1}>
                <TextField
                  id="conceptCurrency"
                  label="Currency"
                  name="conceptCurrency"
                  value={conceptCurrency}
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="conceptValueEuro"
                  label="Concept Value in EURO"
                  name="conceptValueEuro"
                  value={conceptValueEuro}
                  type="number"
                  onChange={this.handleChange}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
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
          <Grid
            container
            spacing={1}
            alignItems="flex-start"
            direction="row"
          >
            <Grid item xs={12} sm={3} md={3} />
            <Grid item xs={12} sm={3} md={3} align="center">
              <TextField
                id="conceptTotalAmount"
                label="Concept Total Amount in currency"
                name="conceptTotalAmount"
                value={conceptTotalAmount}
                type="number"
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} align="center">
              <TextField
                id="conceptTotalAmountEuro"
                label="Concept Total Amount in Euro"
                name="conceptTotalAmountEuro"
                value={conceptTotalAmountEuro}
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
          <Typography variant="subtitle2" component="h2" color="primary">
                Details
          </Typography>
          <br />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid item xs={12} sm={7} md={3}>
              <FormControlLabel
                id="insure"
                name="insure"
                value={insure}
                control={<Checkbox color="primary" onChange={this.handleCheck} />}
                label="Insure"
                labelPlacement="start"
              />
              {open === false ? (
                <div />
              ) : (
                <div>
                  <TextField
                    id="firstDayInsured"
                    label="Insured First Day "
                    type="date"
                    name="firstDayInsured"
                    value={firstDayInsured}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                  />
                  <TextField
                    id="lastDayInsured"
                    label="Insured last Date"
                    type="date"
                    name="lastDayInsured"
                    value={lastDayInsured}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                  />
                  <Converter Title="Insure Value  " />
                  <br />
                  <FormControl>
                    <input
                      style={{ display: 'none' }}
                      id="outlined-button-file-2"
                      type="file"
                      onClick={this.handleChangeFile.bind(this)}
                    />
                    <FormLabel htmlFor="outlined-button-file-2">
                      {/* eslint-disable-next-line react/destructuring-assignment */}
                      {this.state.insureDocumentations.map((row) => (
                        <div>
                          <Grid container>
                            <Grid item xs={9}>
                              <Button
                                fullWidth
                                variant="outlined"
                                component="span"
                                startIcon={<Image color="primary" />}
                              >
                                Documentation
                              </Button>
                            </Grid>
                            <Grid item x={3}>
                              <IconButton size="small" color="primary" onClick={() => this.handleOpenDoc()}>
                                <AddIcon />
                              </IconButton>
                              <IconButton size="small" color="primary" onClick={() => this.handleDeleteDoc(row)}>
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                          <br />
                        </div>
                      ))}
                    </FormLabel>
                  </FormControl>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              <FormControlLabel
                id="purchaseOrder"
                name="purchaseOrder"
                value={purchaseOrder}
                control={<Checkbox color="primary" onChange={this.handleCheck2} />}
                label="Purchase Order"
                labelPlacement="start"
              />
              {open2 === false ? (
                <div />
              ) : (
                <div>
                  {purchaseOrders.map((row) => (
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <TextField
                          id="purchaseOrderNumber"
                          label={'Purchase Order ' + row}
                          type="number"
                          name="purchaseOrderNumber"
                          value={purchaseOrderNumber}
                          onChange={this.handleChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <br />
                        <IconButton size="small" color="primary" onClick={() => this.handleOpenPurchase()}>
                          <AddIcon />
                        </IconButton>
                        <IconButton size="small" color="primary" onClick={() => this.handleDeletePurchase(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <TextField
                    id="purchaseOrderReceiveDate"
                    label="Purchase Order Receive Date"
                    type="date"
                    name="purchaseOrderReceiveDate"
                    value={purchaseOrderReceiveDate}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                  />
                  <br />
                  <FormControl>
                    <input
                      style={{ display: 'none' }}
                      id="outlined-button-file-2"
                      type="file"
                      onClick={this.handleChangeFile.bind(this)}
                    />
                    <FormLabel htmlFor="outlined-button-file-2">
                      <div>
                        <br />
                        <br />
                        <Button
                          fullWidth
                          variant="outlined"
                          component="span"
                          startIcon={<Image color="primary" />}
                        >
                                Documentation File
                        </Button>
                      </div>
                    </FormLabel>
                  </FormControl>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              <FormControlLabel
                id="proposal"
                name="proposal"
                value={proposal}
                control={<Checkbox color="primary" onChange={this.handleCheck3} />}
                label="Proposal"
                labelPlacement="start"
              />
              {open3 === false ? (
                <div />
              ) : (
                <FormControl component="fieldset">
                  <RadioGroup aria-label="gender" name="radio" value={radio} onChange={this.handleChange}>
                    <FormControlLabel value="oneProposal" control={<Radio />} label="Technical & Economical" />
                    {radio === 'oneProposal' ? (
                      <FormControl>
                        <input
                          style={{ display: 'none' }}
                          id="outlined-button-file-2"
                          type="file"
                          onClick={this.handleChangeFile.bind(this)}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <FormLabel htmlFor="outlined-button-file-11">
                              <Button
                                fullWidth
                                variant="outlined"
                                component="span"
                                startIcon={<Image color="primary" />}
                              >
                                     Proposal File
                              </Button>
                            </FormLabel>
                          </Grid>
                        </Grid>
                      </FormControl>
                    ) : (
                      <div />
                    )}
                    <FormControlLabel value="separatedProposal" control={<Radio />} label="Separated Proposals" />
                    {radio === 'separatedProposal' ? (
                      <FormControl>
                        <input
                          style={{ display: 'none' }}
                          id="outlined-button-file-2"
                          type="file"
                          onClick={this.handleChangeFile.bind(this)}
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <FormLabel htmlFor="outlined-button-file-22">
                              <Button
                                fullWidth
                                variant="outlined"
                                component="span"
                                startIcon={<Image color="primary" />}
                              >
                                    Technical Proposal
                              </Button>
                            </FormLabel>
                          </Grid>
                          <Grid item xs={12}>
                            <FormLabel htmlFor="outlined-button-file-33">
                              <Button
                                fullWidth
                                variant="outlined"
                                component="span"
                                startIcon={<Image color="primary" />}
                              >
                                    Economical Proposal
                              </Button>
                            </FormLabel>
                          </Grid>
                        </Grid>
                      </FormControl>
                    ) : (
                      <div />
                    )}
                  </RadioGroup>
                </FormControl>
              )}
            </Grid>
          </Grid>
          <br />
          <Typography variant="subtitle2" component="h2" color="primary">
            Others
          </Typography>
          <br />
          <Grid
            container
            spacing={1}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid item xs={12}>
              <FormControlLabel
                id="penalties"
                name="penalties"
                value={penalties}
                control={<Checkbox color="primary" onChange={this.handleCheck4} />}
                label="Penalties"
                labelPlacement="start"
              />
              {open4 === false ? (
                <div />
              ) : (
                <Grid container spacing={4}>
                  <Grid item xs={12} />
                  {
                    penaltiesListe.map((row) => (
                      <Grid container spacing={4}>
                        <Grid item xs={1} />
                        <Grid item xs={2}>
                          <FormControl fullWidth required>
                            <InputLabel>Select Quantity</InputLabel>
                            <Select
                              name="penaltyQuantity"
                              value={penaltyQuantity}
                              onChange={this.handleChange}
                            >
                              {
                                Quantities.map((clt) => (
                                  <MenuItem key={clt.value} value={clt.value}>
                                    {clt.label}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            label="Penalty Value"
                            type="number"
                            name="penaltyValue"
                            value={penaltyValue}
                            onChange={this.handleChange}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <FormControl fullWidth required>
                            <InputLabel>Select Value</InputLabel>
                            <Select
                              name="penaltyCost"
                              value={penaltyCost}
                              onChange={this.handleChange}
                            >
                              {
                                penaltiesCost.map((clt) => (
                                  <MenuItem key={clt.value} value={clt.value}>
                                    {clt.label}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <FormControl fullWidth required>
                            <InputLabel>Select Unit</InputLabel>
                            <Select
                              name="penaltyPer"
                              value={penaltyPer}
                              onChange={this.handleChange}
                            >
                              {
                                penaltiesPer.map((clt) => (
                                  <MenuItem key={clt.value} value={clt.value}>
                                    {clt.label}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <br />
                          <IconButton size="small" color="primary" onClick={() => this.handleAddPenalty()}>
                            <AddIcon />
                          </IconButton>
                          <IconButton size="small" color="primary" onClick={() => this.handleDeletePenalty(row)}>
                            <DeleteIcon />
                          </IconButton>
                          <br />
                          <br />
                        </Grid>
                      </Grid>
                    ))
                  }
                  <Grid item xs={12} />
                  <Typography variant="subtitle2" component="h2" color="primary" align="center">
                        Maximum Value Of Penalty
                  </Typography>
                  <Grid item xs={4}>
                    <br />
                    <TextField
                      id="penaltyMaxValue"
                      label="Penalty Maximum Value (%)"
                      type="number"
                      name="penaltyMaxValue"
                      value={penaltyMaxValue}
                      onChange={this.handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <br />
                    <FormControl fullWidth required>
                      <InputLabel>Select Type </InputLabel>
                      <Select
                        name="penaltyMaxType"
                        value={penaltyMaxType}
                        onChange={this.handleChange}
                      >
                        {
                          MaxValue.map((clt) => (
                            <MenuItem key={clt.value} value={clt.value}>
                              {clt.label}
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
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
export default AddContract;
