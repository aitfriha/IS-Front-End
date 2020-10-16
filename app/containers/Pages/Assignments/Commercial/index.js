import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../Configurations/map/app.css';
import {
  withStyles,
  Typography,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addClient } from '../../../../redux/actions/clientActions';
import CommercialService from '../../../Services/CommercialService';
import AssignmentService from '../../../Services/AssignmentService';
import AddressService from '../../../Services/AddressService';
import styles from '../assignment-jss';
import CountryService from '../../../Services/CountryService';
import ClientService from '../../../Services/ClientService';
import Notification from '../../../../components/Notification/Notification';
import CommercialAssignmentsMapped from './assignmentBlock';
import ClientBlockMapped from '../../Clients/ClientBlock';
import history from '../../../../utils/history';


class Commercial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      startDate: '',
      endDate: '',
      commercials: [],
      responsibleAssignments: [],
      assistantAssignments: [],
      responsibleAssignment: {},
      commercial: {},
      type: 'assignment',
      countries: [],
      country: '',
      clients: [],
      notifMessage: '',
      client: ''
    };
  }


  componentDidMount() {
    if (history.location.state) {
      this.setState({ type: history.location.state.type });
    }
    this.getCommercials();
    CountryService.getCountries().then(({ data }) => {
      const countries = [];
      data.forEach(country => countries.push(country.countryName));
      this.setState({ countries });
    });
  }

  getClientAddresses = () => {
    const { client } = this.props;
    AddressService.getClientAddresses(client.clientId).then(({ data }) => {
      this.setState({ addresses: data || [] });
    });
  };

  closeNotif = () => {
    this.setState({
      notifMessage: ''
    });
  };

  handleClient = (ev, value) => {
    this.setState({ client: value });
  };

  openNotif = message => {
    this.setState({
      notifMessage: message
    });
  };

  handleClients = () => {
    const { country } = this.state;
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    ClientService.getClientsByCountry(country).then((res) => {
      console.log(res);
      if (res.data.length > 0) {
        const clients = [];
        res.data.forEach(client => clients.push(client.code + '~' + client.name));
        this.setState({ clients, type: 'clients' });
      } else {
        this.openNotif('No Clients in this country');
      }
    });
  };

  getClientAssignment = () => {
    const { client } = this.props;
    AssignmentService.getClientAssignment(client.clientId).then(({ data }) => {
      const assignments = data;
      const responsibleAssignments = [];
      const assistantAssignments = [];
      assignments.forEach((assignment) => {
        if (assignment.type === 'Responsible Commercial') {
          responsibleAssignments.push(assignment);
        } else {
          assistantAssignments.push(assignment);
        }
      });
      this.setState({ responsibleAssignments, assistantAssignments });
    });
  };

  getCommercials = () => {
    CommercialService.getCommercials().then(({ data }) => {
      console.log('getCommercialsgetCommercialsgetCommercialsgetCommercialsgetCommercials',data);
      this.setState({ commercials: data });
    });
  };

  handleCountry = (ev, value) => {
    this.setState({ country: value });
  };

  handleBack = (type) => {
    this.setState({ type });
  };

  handleClientInfo = () => {
    const { client } = this.state;
    const { add } = this.props;
    const code = client.split('~')[0];
    ClientService.getClientsByCode(code).then(res => {
      add(res.data);
      this.setState({ type: 'assignment' });
    });
  };

  render() {
    const title = brand.name + ' - Assignments';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      addresses,
      responsibleAssignments,
      assistantAssignments,
      commercials,
      type, countries, country,
      notifMessage, client, clients
    } = this.state;
 console.log('clients', clients);
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
        <PapperBlock title="Assignment" desc="" icon="ios-more">
          <Slide
            direction="right"
            in={type === 'country'}
            style={{ transitionDelay: type === 'country' ? '500ms' : '0ms' }}
            mountOnEnter
            unmountOnExit
          >
            <Grid container spacing={3} justify="center">
              <Grid item sm={6} lg={6} xs={6} md={6}>
                <Typography variant="subtitle2" component="h2" color="primary" gutterBottom>
                  Please, select the country
                </Typography>
                <Autocomplete
                  id="free-solo-demo"
                  value={country}
                  onChange={(event, value) => this.handleCountry(event, value)}
                  options={countries.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      margin="normal"
                      name="country"
                      variant="outlined"
                    />
                  )}
                />
                <Button color="primary" variant="contained" endIcon={<SearchIcon />} onClick={this.handleClients}>
                  Clients
                </Button>
              </Grid>
            </Grid>
          </Slide>
          <Slide
            direction="right"
            in={type === 'clients'}
            style={{ transitionDelay: type === 'clients' ? '500ms' : '0ms' }}
            mountOnEnter
            unmountOnExit
          >
            <Grid container spacing={3} justify="center">
              <Grid item sm={6} lg={6} xs={6} md={6}>
                <Button color="default" size="small" variant="text" startIcon={<KeyboardBackspaceIcon />} onClick={() => this.handleBack('country')}>
                  Back
                </Button>
                <Typography variant="subtitle2" component="h2" color="primary" gutterBottom align="center">
                  Please, select Client
                </Typography>
                <Autocomplete
                  id="free-solo-demo"
                  value={client}
                  onChange={(event, value) => this.handleClient(event, value)}
                  options={clients.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Client"
                      margin="normal"
                      name="clients"
                      variant="outlined"
                    />
                  )}
                />
                <Button color="primary" variant="contained" endIcon={<AssignmentIcon />} onClick={this.handleClientInfo}>
                  Client
                </Button>
              </Grid>
            </Grid>
          </Slide>
          <Slide
            direction="right"
            in={type === 'assignment'}
            style={{ transitionDelay: type === 'assignment' ? '500ms' : '0ms' }}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <CommercialAssignmentsMapped back={this.handleBack} />
            </div>
          </Slide>
          <Slide
            direction="right"
            in={type === 'all'}
            style={{ transitionDelay: type === 'all' ? '500ms' : '0ms' }}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <Button color="default" size="small" variant="text" startIcon={<KeyboardBackspaceIcon />} onClick={() => this.handleBack('assignment')}>
                Back
              </Button>
              <ClientBlockMapped back={this.handleBack} />
            </div>
          </Slide>

         {/*<Notification message={notifMessage} close={this.closeNotif} />*/}
        </PapperBlock>
      </div>
    );
  }
}
Commercial.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
  add: bindActionCreators(addClient, dispatch),
});

const CommercialMapped = connect(
  null,
  mapDispatchToProps
)(Commercial);

export default withStyles(styles)(CommercialMapped);
