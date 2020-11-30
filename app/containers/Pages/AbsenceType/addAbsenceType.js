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
import styles from './absenceType-jss';
import history from '../../../utils/history';
import '../Configurations/map/app.css';
import { ThemeContext } from '../../App/ThemeWrapper';
import { isString } from 'lodash';
import CountryService from '../../Services/CountryService';
import StateCountryService from '../../Services/StateCountryService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getAllAbsenceType,
  getAllAbsenceTypeByState,
  saveAbsenceType
} from '../../../redux/absenceType/actions';
import notification from '../../../components/Notification/Notification';

const useStyles = makeStyles(styles);

class AddAbsenceType extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {};
    this.state = {
      code: '',
      name: '',
      description: '',
      country: null,
      state: null,
      countries: [],
      states: []
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('blueCyanTheme');
    CountryService.getCountries().then(({ data }) => {
      this.setState({ countries: data });
    });
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitAbsenceType = () => {
    const { saveAbsenceType, getAllAbsenceType } = this.props;
    const {
      code, name, description, state
    } = this.state;
    const absenceType = {
      code,
      name,
      description,
      stateId: state.stateCountryId
    };

    const promise = new Promise(resolve => {
      saveAbsenceType(absenceType);
      this.editingPromiseResolve = resolve;
    });
    promise.then(result => {
      if (isString(result)) {
        notification('success', result);
        getAllAbsenceType();
        console.log(result);
        history.push('/app/hh-rr/absenceType');
      } else {
        console.log(result);
        notification('danger', result);
      }
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
    const { getAllAbsenceTypeByState } = this.props;
    this.setState({ state: value });
    getAllAbsenceTypeByState(value.stateCountryId);
  };

  handleValueChange = (value, type) => {
    console.log(value, type);
    this.setState({ [type]: value });
  };

  render() {
    const {
      classes,
      isLoadingAbsenceType,
      absenceTypeResponse,
      errorAbsenceType,
      allAbsenceTypeByState
    } = this.props;
    const {
      code,
      name,
      description,
      countries,
      states,
      country,
      state
    } = this.state;
    !isLoadingAbsenceType
      && absenceTypeResponse
      && this.editingPromiseResolve(absenceTypeResponse);
    !isLoadingAbsenceType
      && !absenceTypeResponse
      && this.editingPromiseResolve(errorAbsenceType);
    console.log(allAbsenceTypeByState);
    return (
      <div>
        <PapperBlock
          title="Add absence type"
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
                  data={allAbsenceTypeByState}
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
                  data={allAbsenceTypeByState}
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
                onClick={this.handleSubmitAbsenceType}
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

const mapStateToProps = state => ({
  allAbsenceType: state.getIn(['absenceTypes']).allAbsenceType,
  allAbsenceTypeByState: state.getIn(['absenceTypes']).allAbsenceTypeByState,
  absenceTypeResponse: state.getIn(['absenceTypes']).absenceTypeResponse,
  isLoadingAbsenceType: state.getIn(['absenceTypes']).isLoading,
  errorAbsenceType: state.getIn(['absenceTypes']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    saveAbsenceType,
    getAllAbsenceType,
    getAllAbsenceTypeByState
  },
  dispatch
);

const AddAbsenceTypeMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAbsenceType);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddAbsenceTypeMapped changeTheme={changeTheme} classes={classes} />;
};
