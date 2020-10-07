import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import brand from 'dan-api/dummy/brand';
import csc from 'country-state-city';
import MUIDataTable from 'mui-datatables';
import {
  Button, FormControl, withStyles,
} from '@material-ui/core';
import Select from 'react-select';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
// import { isString } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../StaffContract/people-jss';
import notification from '../../../components/Notification/Notification';
import { addCity, getAllCitys } from '../../../redux/city/actions';
class StateCountry extends React.Component {
  countries = csc.getAllCountries();

  updatedCountries = this.countries.map(country => ({
    label: country.name,
    value: country.id,
    ...country
  }));


  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      columns: [
        {
          name: 'cityName',
          label: 'Country',
        },
        {
          name: 'stateName',
          label: 'State',

        },
        {
          name: 'countryName',
          label: 'Country',
        },
      ],
    };
  }


  /* const {
    values, handleSubmit, setFieldValue, setValues
  } = addressFromik; */

  // useEffect(() => {}, [values]);
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getAllCitys } = this.props;
    getAllCitys();
  }

  updatedCities = stateId => csc.getCitiesOfState(stateId).map(city => ({ label: city.name, value: city.id, ...city }));

  updatedStates = countryId => csc.getStatesOfCountry(countryId).map(state => ({
    label: state.name,
    value: state.id,
    ...state
  }));

  render() {
    const title = brand.name + ' - State Country';
    const description = brand.desc;
    // eslint-disable-next-line no-shadow
    const {
      // eslint-disable-next-line no-shadow
      classes, allCitys, cityResponse, isLoading, errors, addCity
    } = this.props;
    console.log(allCitys);
    const { columns } = this.state;
    const options = {
      filter: true,
      option: 'none',
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      /*     customToolbar: () => (
        <CustomToolbar
          csvData={data}
          url="/app/hh-rr/staff/create-staff"
          tooltip="add new worker"
        />
      ) */
    };
    // Sent resolve to editing promises
    (!isLoading && cityResponse) && this.editingPromiseResolve(cityResponse);
    (!isLoading && !cityResponse) && this.editingPromiseResolve(errors);
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
        <PapperBlock title="States" desc="" noMargin>
          <Formik
            enableReinitialize
            initialValues={{
              country: null,
              state: null,
              city: null
            }}
            //  onSubmit: values => StateService.saveState((JSON.stringify(values))).then(({ data }) => {
            onSubmit={async (values) => {
              const datafinal = {
                // country
                countryName: values.country.name,
                countryCode: values.country.sortname,
                phonePrefix: values.country.phonecode,
                // state
                stateName: values.state.name,
                // city
                cityName: values.city.name,
              };
              const promise = new Promise((resolve) => {
                // get client information
                addCity(datafinal);
                this.editingPromiseResolve = resolve;
              });
              promise.then((result) => {
                console.log(result);
                notification('success', { status: 'OK', result });
              });
            }}
          >
            {props => {
              const {
                values,
                handleSubmit,
                setFieldValue,
              } = props;
              return (
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <FormControl className={classes.formControl} fullWidth>
                    <Select
                      id="country"
                      name="country"
                      label="country"
                      options={this.updatedCountries}
                      value={values.country}
                      onChange={value => {
                        setFieldValue('country', value);
                        setFieldValue('state', null);
                        setFieldValue('city', null);
                      }}
                      /*   onChange={value => {
                        setValues({ country: value, state: null, city: null }, false);
                      }} */
                    />
                  </FormControl>
                  <p />
                  <FormControl className={classes.formControl} fullWidth>
                    <Select
                      id="state"
                      name="state"
                      options={this.updatedStates(values.country ? values.country.value : null)}
                      value={values.state}
                      /*   onChange={value => {
                        setValues({ state: value, city: null }, false);
                      }} */
                      onChange={value => {
                        setFieldValue('state', value);
                        setFieldValue('city', null);
                      }}
                    />
                  </FormControl>
                  <p />
                  <FormControl className={classes.formControl} fullWidth>
                    <Select
                      id="city"
                      name="city"
                      options={this.updatedCities(values.state ? values.state.value : null)}
                      value={values.city}
                      // onChange={value => setFieldValue('city', value)}
                      onChange={value => {
                        setFieldValue('city', value);
                      }}
                    />
                  </FormControl>
                  <div className={classes.btnCenter} style={{ marginTop: 5 }}>
                    <Button
                      className={classes.textField}
                      color="primary"
                      variant="contained"
                      size="small"
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <MUIDataTable
                      title=""
                      data={allCitys && allCitys}
                      columns={columns}
                      options={options}
                    />
                  </div>
                  <p>{JSON.stringify(csc.get)}</p>
                </form>
              );
            }}
          </Formik>
        </PapperBlock>
      </div>
    );
  }
}
StateCountry.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllCitys: PropTypes.func.isRequired,
  allCitys: PropTypes.array.isRequired,
  cityResponse: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  addCity: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  allCitys: state.getIn(['cities']).allCitys,
  cityResponse: state.getIn(['cities']).cityResponse,
  isLoading: state.getIn(['cities']).isLoading,
  errors: state.getIn(['cities']).errors
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addCity,
  getAllCitys,
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(StateCountry));
