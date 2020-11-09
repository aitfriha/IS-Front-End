import React, { useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';
import { PapperBlock } from 'dan-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AutoComplete from '../../../components/AutoComplete';
import styles from './contractType-jss';
import history from '../../../utils/history';
import '../Configurations/map/app.css';
import { ThemeContext } from '../../App/ThemeWrapper';
import ContractTypeService from '../../Services/ContractTypeService';
import CountryService from '../../Services/CountryService';
import StateCountryService from '../../Services/StateCountryService';

const useStyles = makeStyles(styles);

class AddContractType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      name: '',
      description: '',
      country: {},
      state: {},
      countries: [],
      states: [],
      contractTypes: []
    };
  }

  componentDidMount() {
    CountryService.getCountries().then(({ data }) => {
      this.setState({ countries: data });
    });
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitContractType = () => {
    const {
      code, name, description, state
    } = this.state;
    const contractType = {
      code,
      name,
      description,
      stateId: state.stateCountryId
    };
    ContractTypeService.saveContractType(contractType).then(({ data }) => {
      console.log(data);
      history.push('/app/hh-rr/contractType');
    });
  };

  handleChangeCountry = (ev, value) => {
    StateCountryService.getStatesByCountry(value.countryId).then(({ data }) => {
      console.log(data);
      this.setState({
        country: value,
        states: data.payload
      });
    });
  };

  handleChangeState = (ev, value) => {
    ContractTypeService.getAllByState(value.stateCountryId).then(({ data }) => {
      this.setState({ contractTypes: data, state: value });
    });
  };

  handleValueChange = (value, type) => {
    console.log(value, type);
    this.setState({ [type]: value });
  };

  render() {
    const { classes } = this.props;
    const {
      code,
      name,
      description,
      countries,
      states,
      country,
      state,
      contractTypes
    } = this.state;
    return (
      <div>
        <PapperBlock
          title="Add contract type"
          icon="ios-paper-outline"
          noMargin
          whiteBg
        >
          <Grid
            container
            spacing={6}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              md={7}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 12
              }}
            >
              <Autocomplete
                id="combo-box-demo"
                value={country}
                options={countries}
                getOptionLabel={option => option.countryName}
                onChange={this.handleChangeCountry}
                style={{ width: '40%', marginTop: 7 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Country"
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                id="combo-box-demo"
                value={state}
                options={states}
                getOptionLabel={option => option.stateName}
                onChange={this.handleChangeState}
                style={{ width: '40%', marginTop: 7 }}
                clearOnEscape
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="State"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 12
              }}
            >
              <div
                style={
                  Object.keys(states).length === 0
                    ? { pointerEvents: 'none', opacity: '0.7', width: '40%' }
                    : { width: '40%' }
                }
              >
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Code"
                  data={contractTypes}
                  type="code"
                  attribute="code"
                />
              </div>
              <div
                style={
                  Object.keys(states).length === 0
                    ? { pointerEvents: 'none', opacity: '0.7', width: '40%' }
                    : { width: '40%' }
                }
              >
                <AutoComplete
                  value={this.handleValueChange}
                  placeholder="Name"
                  data={contractTypes}
                  type="name"
                  attribute="name"
                  disabled={Object.keys(states).length === 0}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 12
              }}
            >
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description"
                value={description}
                style={{ width: '100%' }}
                className={classes.textField}
                onChange={this.handleChange}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={7}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 12
              }}
            >
              <Button
                color="primary"
                variant="contained"
                size="medium"
                onClick={this.handleSubmitContractType}
                disabled={!code || !name}
              >
                Save Type
              </Button>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddContractType changeTheme={changeTheme} classes={classes} />;
};
