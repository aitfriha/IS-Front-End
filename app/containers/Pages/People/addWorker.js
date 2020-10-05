import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import PeopleService from '../../Services/PeopleService';
import styles from './people-jss';
import {
  Grid,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import history from '../../../utils/history';
import FormLabel from '@material-ui/core/FormLabel';
import { Image } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import '../Configurations/map/app.css';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import AddressBlock from '../Address';
import Autocomplete from '@material-ui/lab/Autocomplete';

class AddWorker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      country: '',
      phone: '',
      salutation: '',
      email: '',
      city: '',
      address: '',
      photo: '',
      company: {},
      companyPhone: '',
      companyEmail: '',
      adCountry: {},
      postCode: '',
      state: '',
      adCity: '',
      lastName2: '',
      type: 'Worker'
    };
  }

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleChangeCompany = (ev, value) => {
    if (value === null) {
      this.setState({ company: {} });
    } else {
      this.setState({ company: value });
    }
  }

  handleChangeSalutation = (ev, value) => {
    this.setState({ salutation: value });
  }

  handleChangeType = (ev, value) => {
    this.setState({ type: value });
  }

  handleSubmitWorker = () => {
    const {
      firstName,
      lastName,
      phone,
      salutation,
      email,
      photo,
      company,
      adCountry,
      postCode,
      state,
      adCity,
      lastName2,
      address,
      type
    } = this.state;
    const worker = {
      firstName,
      lastName,
      lastName2,
      address: {
        country:  adCountry,
        address,
        postCode,
        state,
        city: adCity
      },
      company,
      phone,
      salutation,
      email,
      photo,
      type
    };
    PeopleService.savePeople(worker).then(({ data }) => {
      console.log(data);
      history.push('/app/configurations/workers', {});
    });
  };

  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      console.log(e.target.files);
      reader.onload = function (ev) {
        this.setState({ photo: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleChangeLogo = (e) => {
    this.readURI(e);
  };

  render() {
    const title = brand.name + ' - Create Worker';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      firstName, lastName, salutation,
      email, lastName2, photo, company,
      type
    } = this.state;
    const salutations = ['Mr.', 'Mrs', 'Miss'];
    const types = ['Worker.', 'Commercial', 'Leader'];
    const companies = [
      { name: 'TechniU', phone: '+21265482154', email: 'techniU@gmail.com' },
      { name: 'Implemental Systems', phone: '+21265482154', email: 'implemental@gmail.com' },
      { name: 'International GDE', phone: '+21265482154', email: 'internationalgde@gmail.com' }
    ];
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
        <PapperBlock title="New Worker" desc="Please, Fill in the all field" icon="ios-person">
          <Grid
            container
            spacing={10}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={3}>
              <Chip label="General Information" avatar={<Avatar>G</Avatar>} color="primary" />
              <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
              <Autocomplete
                id="combo-box-demo"
                value={salutation}
                options={salutations}
                getOptionLabel={option => option}
                onChange={this.handleChangeSalutation}
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Salutation"
                    variant="outlined"
                  />
                )}
              />
              <TextField
                id="outlined-basic"
                label="Last Name 1"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={this.handleChange}
                required
                name="lastName"
                className={classes.textField}
              />
              <TextField
                id="outlined-basic"
                label="Last Name 2"
                variant="outlined"
                fullWidth
                value={lastName2}
                onChange={this.handleChange}
                name="lastName2"
                className={classes.textField}
              />
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                name="firstName"
                value={firstName}
                fullWidth
                required
                className={classes.textField}
                onChange={this.handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={this.handleChange}
                required
                name="email"
                className={classes.textField}
              />
              <Autocomplete className={classes.textField}
                id="combo-box-demo"
                value={type}
                options={types}
                getOptionLabel={option => option}
                onChange={this.handleChangeType}
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Type"
                    variant="outlined"
                  />
                )}
              />
              <FormControl className={classes.textField}>
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
                    Photo
                  </Button>
                </FormLabel>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Chip label="Worker Company" avatar={<Avatar>C</Avatar>} color="primary" />
              <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
              <Autocomplete
                id="combo-box-demo"
                value={company}
                options={companies}
                getOptionLabel={option => option.name}
                onChange={this.handleChangeCompany}
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Company"
                    variant="outlined"
                  />
                )}
              />
              <TextField
                id="outlined-basic"
                label="Company Phone"
                variant="outlined"
                fullWidth
                value={company.phone ? company.phone : ''}
                required
                name="companyPhone"
                disabled
                className={classes.textField}
              />
              <TextField
                id="outlined-basic"
                label="Company Email"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '12px' }}
                value={company.email ? company.email : ''}
                disabled
                className={classes.textField}
              />
              {
                photo ? (
                  <Avatar alt="User Name" src={photo} className={classes.large} />
                ) : (<div />)
              }
              <div />
            </Grid>
            <Grid item xs={12} md={3}>
              <Chip label="Habitual Residence" avatar={<Avatar>H</Avatar>} color="primary" />
              <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
              <AddressBlock onChangeInput={this.handleChange} type />
            </Grid>
          </Grid>
          <div className={classes.btnCenter}>
            <Button className={classes.textField} color="primary" variant="contained" size="small" onClick={this.handleSubmitWorker}>Save Worker</Button>
          </div>
        </PapperBlock>
      </div>
    );
  }
}
AddWorker.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddWorker);
