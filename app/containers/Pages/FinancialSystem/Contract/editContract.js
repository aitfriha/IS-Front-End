import React from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import history from '../../../../utils/history';
import Converter from '../../../../components/CurrencyConverter/Converter';

class EditContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: '',
      operation: '',
      company: '',
      state: '',
      signedDate: '',
      startDate: '',
      endDate: '',
      finalReelDate: '',
      amountEuro: '',
      amountLocal: '',
      currency: '',
      penalties: '',
      purchaseOrder: 0,
      insure: '',
      firstDayInsured: '',
      lastDayInsured: '',
      amountInsured: '',
      open: false
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

    handleCreate = () => {
      history.push('/app/gestion-financial/Contracts');
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Contracts');
    }

    render() {
      console.log(this.state);
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
          label: 'STARTED',
        },
        {
          value: '2',
          label: 'TERMINATED',
        }];
      const {
        client, operation, company, state, signedDate, startDate, endDate, finalReelDate, amountEuro, amountLocal, currency, penalties, purchaseOrder, insure, firstDayInsured, lastDayInsured, amountInsured, open
      } = this.state;
      return (
        <div>
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
            </Grid>
          </div>
          <br />
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
          <Typography variant="subtitle2" component="h2" color="primary">
                        Economic Value Of The Contract
          </Typography>
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
            spacing={0}
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
                  <Grid
                    container
                    spacing={0}
                    alignItems="flex-start"
                    direction="row"
                    justify="space-around"
                  >
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                      <Converter Title="Insure Value" />
                    </Grid>
                  </Grid>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              <FormControlLabel
                id="purchaseOrder"
                name="purchaseOrder"
                value={purchaseOrder}
                control={<Checkbox color="primary" />}
                label="PurchaseOrder"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={12} sm={7} md={3}>
              <FormControlLabel
                id="penalties"
                name="penalties"
                value={penalties}
                control={<Checkbox color="primary" />}
                label="Penalties"
                labelPlacement="start"
              />
            </Grid>
          </Grid>
        </div>
      );
    }
}
export default EditContract;
