import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Button, FormControl, Grid, TextField
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import { Image } from '@material-ui/icons';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import history from '../../../../utils/history';
import styles from '../../Companies/companies-jss';
import { getAllCountry } from '../../../../redux/country/actions';
import { getAllStateByCountry } from '../../../../redux/stateCountry/actions';
import { getAllCityByState } from '../../../../redux/city/actions';
import { addClientCommercial, getAllClient } from '../../../../redux/client/actions';
import FinancialCompanyService from '../../../Services/FinancialCompanyService';

class AddFinancialCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone1: '',
      phone2: '',
      logo: '',
      currentCity: '',
      postCode: '',
      fullAddress: ''
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCountry } = this.props;
    getAllCountry();
  }

  handleChangeCountry = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllStateByCountry } = this.props;
    getAllStateByCountry(value.countryId);
  };

  handleChangeState = (ev, value) => {
    // eslint-disable-next-line no-shadow,react/prop-types
    const { getAllCityByState } = this.props;
    getAllCityByState(value.stateCountryId);
  };

  handleChangeCity = (ev, value) => {
    this.setState({ currentCity: value.cityId });
  };

  // eslint-disable-next-line react/sort-comp
  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.files);
      reader.onload = function (ev) {
        this.setState({ logo: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

    handleChangeLogo = e => {
      this.readURI(e);
    };

    handleSubmit = () => {
      const {
        name, email, phone1, phone2, logo, postCode, currentCity, fullAddress
      } = this.state;
      const city = { _id: currentCity };
      const address = {
        postCode, city, fullAddress
      };
      const FinancialCompany = {
        name, email, phone1, phone2, logo, address
      };
      FinancialCompanyService.saveCompany(FinancialCompany).then(result => {
        console.log(result);
      });
      history.push('/app/gestion-financial/Company');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleGoBack = () => {
      history.push('/app/gestion-financial/Company');
    }

    render() {
      const {
        // eslint-disable-next-line react/prop-types
        allCountrys, allStateCountrys, allCitys
      } = this.props;
      console.log(this.state);
      const title = brand.name + ' - Companies';
      const description = brand.desc;
      // eslint-disable-next-line react/prop-types
      const {
        name,
        email,
        phone1,
        phone2,
        logo,
        postCode,
        fullAddress
      } = this.state;
      const { classes } = this.props;
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
          <PapperBlock
            title="New Financial Company"
            desc="Please, Fill in the all field"
            icon="ios-add-circle"
          >
            <Grid
              container
              spacing={10}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={4}>
                <Chip label="General Information" avatar={<Avatar>G</Avatar>} color="primary" />
                <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={name}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={email}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <TextField
                  id="outlined-basic"
                  label="General Phone 1"
                  variant="outlined"
                  name="phone1"
                  value={phone1}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <TextField
                  id="outlined-basic"
                  label="General Phone 2"
                  variant="outlined"
                  name="phone2"
                  value={phone2}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
                <br />
                <br />
                <FormControl>
                  <input
                    style={{ display: 'none' }}
                    id="outlined-button-file-2"
                    type="file"
                    onChange={this.handleChangeLogo.bind(this)}
                    className={classes.textField}
                  />
                  <FormLabel htmlFor="outlined-button-file-2">
                    <Button
                      fullWidth
                      variant="outlined"
                      component="span"
                      startIcon={<Image color="primary" />}
                    >
                                        Photo
                    </Button>
                  </FormLabel>
                </FormControl>
                {
                  logo ? (
                    <Avatar alt="User Name" src={logo} className={classes.large} />
                  ) : (<div />)
                }
              </Grid>
              <Grid item xs={12} md={3}>
                <Chip label="Company Address" avatar={<Avatar>S</Avatar>} color="primary" />
                <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
                <Autocomplete
                  id="combo-box-demo"
                  options={allCountrys}
                  getOptionLabel={option => option.countryName}
                  onChange={this.handleChangeCountry}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the country"
                      variant="outlined"
                    />
                  )}
                />
                <Autocomplete
                  id="combo-box-demo"
                  options={allStateCountrys}
                  getOptionLabel={option => option.stateName}
                  onChange={this.handleChangeState}
                  style={{ marginTop: 15 }}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the state"
                      variant="outlined"
                    />
                  )}
                />
                <Autocomplete
                  id="combo-box-demo"
                  options={allCitys}
                  getOptionLabel={option => option.cityName}
                  onChange={this.handleChangeCity}
                  style={{ marginTop: 15 }}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Choose the city"
                      variant="outlined"
                    />
                  )}
                />
                <TextField
                  id="fullAddress"
                  label="Name of address"
                  variant="outlined"
                  name="fullAddress"
                  value={fullAddress}
                  fullWidth
                  required
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Post Code"
                  variant="outlined"
                  fullWidth
                  value={postCode}
                  required
                  name="postCode"
                  className={classes.textField}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  size="small"
                  color="inherit"
                  onClick={this.handleGoBack}
                >
                    Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="medium"
                  onClick={this.handleSubmit}
                >
                                Save Company
                </Button>
              </Grid>
            </Grid>
          </PapperBlock>
        </div>
      );
    }
}
AddFinancialCompany.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  allCountrys: state.getIn(['countries']).allCountrys,
  countryResponse: state.getIn(['countries']).countryResponse,
  isLoading: state.getIn(['countries']).isLoading,
  errors: state.getIn(['countries']).errors,
  // state
  allStateCountrys: state.getIn(['stateCountries']).allStateCountrys,
  stateCountryResponse: state.getIn(['stateCountries']).stateCountryResponse,
  isLoadingState: state.getIn(['stateCountries']).isLoading,
  errorsState: state.getIn(['stateCountries']).errors,
  // city
  allCitys: state.getIn(['cities']).allCitys,
  cityResponse: state.getIn(['cities']).cityResponse,
  isLoadingCity: state.getIn(['cities']).isLoading,
  errorsCity: state.getIn(['cities']).errors,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllCountry,
  getAllStateByCountry,
  getAllCityByState,
  addClientCommercial,
  getAllClient
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFinancialCompany));
