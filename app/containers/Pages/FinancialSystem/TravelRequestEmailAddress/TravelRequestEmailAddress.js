import React, { useContext } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Chip,
  TextField,
  FormControl,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Tooltip,
  FormHelperText
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import { injectIntl } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
// import HelmetCustom from '../../../../components/HelmetCustom/HelmetCustom';


import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { makeStyles } from '@material-ui/core/styles';
import notification from '../../../../components/Notification/Notification';
import {
  getAllTravelRequestEmailAddresses,
  addTravelRequestEmailAddress,
  updateTravelRequestEmailAddress,
  deleteTravelRequestEmailAddress
} from '../../../../redux/travelRequestEmailAddress/actions';
import { ThemeContext } from '../../../App/ThemeWrapper';

const styles = {};

const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const useStyles = makeStyles((theme) => {

});
const title = brand.name + ' - Travel Request Email Address';
const description = brand.desc;

class TravelRequestEmailAddress extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      email: {
        value: '',
        error: false
      }
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('greyTheme');

    const { getAllTravelRequestEmailAddresses } = this.props;
    getAllTravelRequestEmailAddresses();
  }

  componentWillUnmount() {
  }


  //----------------------------------------------------------------------------------------------

  changeEmailAddressValue(e) {
    const newValue = e.target.value;
    const valid = !newValue || reg.test(newValue);
    this.setState({
      email: {
        value: newValue,
        error: !valid
      }
    });
  }

  handleAddEmailAddress(e) {
    const { addTravelRequestEmailAddress, getAllTravelRequestEmailAddresses } = this.props;
    new Promise((resolve) => {
      // add email address action
      const newData = {
        id: '',
        email: this.state.email.value
      };
      addTravelRequestEmailAddress(newData);
      this.editingPromiseResolve = resolve;
    }).then((result) => {
      if (isString(result)) {
        // Fetch data
        getAllTravelRequestEmailAddresses();
        this.setState({
          email: {
            value: '',
            error: false
          }
        });
        notification('success', result);
      } else {
        notification('danger', result);
      }
    });
  }

  handleDeleteEmailAddress(e, email) {
    const { deleteTravelRequestEmailAddress, getAllTravelRequestEmailAddresses } = this.props;
    new Promise((resolve) => {
      // delete email address action
      deleteTravelRequestEmailAddress(email.id);
      this.editingPromiseResolve = resolve;
    }).then((result) => {
      if (isString(result)) {
        // Fetch data
        getAllTravelRequestEmailAddresses();
        notification('success', result);
      } else {
        notification('danger', result);
      }
    });
  }

  render() {
    const {
      location, intl, errors, isLoading, travelRequestEmailAddressResponse, emailAddresses, logedUser
    } = this.props;

    const thelogedUser = JSON.parse(logedUser);
    (!isLoading && travelRequestEmailAddressResponse) && this.editingPromiseResolve(travelRequestEmailAddressResponse);
    (!isLoading && !travelRequestEmailAddressResponse) && this.editingPromiseResolve(errors);

    return (
      <div>
        {/* <HelmetCustom location={location} /> */}
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <Card>
          <CardContent>
            <Grid item xs={12} md={12} style={{ marginTop: '10px' }}>
              <Chip label="Email addresses list" color="secondary" />
              <Grid container>
                <Grid item style={{ marginTop: '10px' }}>
                  <FormControl style={{ minWidth: '350px' }}>
                    <TextField
                      id="email-textfield"
                      size="small"
                      variant="outlined"
                      label="Email address"
                      value={this.state.email.value}
                      error={this.state.email.error}
                      onChange={(e) => this.changeEmailAddressValue(e)}
                    />
                    {this.state.email.error ? <FormHelperText error>Invalid email address format</FormHelperText> : null}
                  </FormControl>
                </Grid>
                {thelogedUser.userRoles[0].actionsNames.financialModule_travelRequestEmailAddress_create ? (
                  <Grid item style={{ marginLeft: '5px', marginTop: '6px' }}>
                    <Tooltip title="Save">
                      <span>
                        <IconButton disabled={!this.state.email.value || this.state.email.error} onClick={(e) => this.handleAddEmailAddress(e)}>
                          <SaveIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Grid>
                ) : null}
              </Grid>

              <List>
                {emailAddresses.map((email, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={email.email} />
                    <ListItemSecondaryAction>
                      {thelogedUser.userRoles[0].actionsNames.financialModule_travelRequestEmailAddress_create ? (
                        <Tooltip title="Delete">
                          <IconButton aria-label="Delete" onClick={(e) => this.handleDeleteEmailAddress(e, email)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

TravelRequestEmailAddress.propTypes = {
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  travelRequestEmailAddressResponse: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  emailAddresses: state.getIn(['travelRequestEmailAddress']).emailAddresses,
  travelRequestEmailAddressResponse: state.getIn(['travelRequestEmailAddress']).travelRequestEmailAddressResponse,
  isLoading: state.getIn(['travelRequestEmailAddress']).isLoading,
  errors: state.getIn(['travelRequestEmailAddress']).errors,
  logedUser: localStorage.getItem('logedUser')
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllTravelRequestEmailAddresses,
  addTravelRequestEmailAddress,
  updateTravelRequestEmailAddress,
  deleteTravelRequestEmailAddress

}, dispatch);

const TravelRequestEmailAddressMapped = connect(mapStateToProps, mapDispatchToProps)(injectIntl(TravelRequestEmailAddress));

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <TravelRequestEmailAddressMapped changeTheme={changeTheme} classes={classes} />;
};

// export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(TravelRequestEmailAddress)));
