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
import history from '../../../../utils/history';
import Converter from '../../../../components/CurrencyConverter/Converter';

class AddContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: '',
      operation: '',
      company: '',
      state: '',
      clientContractSigned: '',
      taxeIdentityNumber: '',
      addressOfBill: '',
      countryOfBill: '',
      cityOfBill: '',
      signedDate: '',
      startDate: '',
      endDate: '',
      finalReelDate: '',
      amountEuro: '',
      amountLocal: '',
      currency: '',
      penalties: '',
      penaltyQuantity: '',
      penaltyValue: 0,
      penaltyCost: '',
      penaltyPer: '',
      penaltyMaxValue: '',
      penaltyMaxType: '',
      penaltiesListe: [''],
      purchaseOrder: 0,
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
      client, operation, company, state, clientContractSigned, taxeIdentityNumber, countryOfBill, cityOfBill, addressOfBill, signedDate, startDate, endDate, finalReelDate, penaltyMaxType, amountEuro, amountLocal, currency, penalties, penaltyQuantity, penaltyValue, penaltyCost, penaltyPer, penaltyMaxValue, purchaseOrder, penaltiesListe, purchaseOrderNumber, purchaseOrderReceiveDate, insure, firstDayInsured, lastDayInsured, amountInsured, proposal, open, open2, open3, open4, openDoc
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
        <PapperBlock title="Contract " desc="Create new contract  " icon="ios-add-circle">
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
            <div align="center">
              <Grid item xs={12} sm={8} md={8} alignItems="flex-start" align="center">
                <TextField
                  id="nameOperation"
                  label="Operation Name"
                  name="nameOperation"
                  value={operation}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  required
                />
              </Grid>
            </div>
            <Grid
              container
              spacing={2}
              alignItems="flex-start"
              direction="row"
              justify="space-around"
            >
              <Grid item xs={12} md={4} sm={4}>
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
              <Grid item xs={12} md={4} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel>Select the Company</InputLabel>
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
              <Grid item xs={12} md={4} sm={4}>
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
              <Grid item xs={12} md={3} sm={3}>
                <TextField
                  id="addressOfBill"
                  label="Full Address Of Bill"
                  name="addressOfBill"
                  value={addressOfBill}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
              </Grid>
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
                    <div>
                      <Grid
                        container
                        spacing={1}
                        alignItems="flex-start"
                        direction="row"
                      >
                        <Grid item xs={3}>
                          <Button
                            fullWidth
                            variant="outlined"
                            component="span"
                            startIcon={<Image color="primary" />}
                          >
                                    Documentation
                          </Button>
                        </Grid>
                        <Grid xs={1}>
                          <IconButton size="medium" color="primary" onClick={() => this.handleOpenDoc3()}>
                            <AddIcon />
                          </IconButton>
                          <IconButton size="small" color="primary" onClick={() => this.handleDeleteDoc3(row)}>
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </div>
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
                label="Reel end Date"
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
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="space-around"
          >
            <Grid>
              <Converter Title="Contract Trade Volume  " />
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
                label="PurchaseOrder"
                labelPlacement="start"
              />
              {open2 === false ? (
                <div />
              ) : (
                <div>
                  <TextField
                    id="purchaseOrderNumber"
                    label="Number of Purchase Order"
                    type="number"
                    name="purchaseOrderNumber"
                    value={purchaseOrderNumber}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    required
                  />
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
              <br />
              <br />
              {open3 === false ? (
                <div />
              ) : (
                <FormControl>
                  <input
                    style={{ display: 'none' }}
                    id="outlined-button-file-2"
                    type="file"
                    onClick={this.handleChangeFile.bind(this)}
                  />
                  <FormLabel htmlFor="outlined-button-file-2">
                    {/* eslint-disable-next-line react/destructuring-assignment */}
                    {this.state.proposalDocumentations.map((row) => (
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
                            <IconButton size="small" color="primary" onClick={() => this.handleOpenDoc2()}>
                              <AddIcon />
                            </IconButton>
                            <IconButton size="small" color="primary" onClick={() => this.handleDeleteDoc2(row)}>
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                        <br />
                      </div>
                    ))}
                  </FormLabel>
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
                        <Grid item xs={3}>
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
                        <Grid item x={2}>
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
