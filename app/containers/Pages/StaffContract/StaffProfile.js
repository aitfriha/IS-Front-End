import React, { Component } from 'react';
import {
  Grid,
  FormControl,
  TextField,
  Button,
  Collapse,
  Badge,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  withStyles,
  Typography,
  Paper,
  Tab,
  Tabs
} from '@material-ui/core';
import Ionicon from 'react-ionicons';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PropTypes from 'prop-types';
import styles from './people-jss';
import avatarApi from '../../../api/images/avatars';

export class StaffProfile extends Component {
  state = {
    value: 0
  };

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  };

  handleBack = () => {
    const { showProfile } = this.props;
    showProfile(false, {});
  };

  render() {
    const { classes, staff } = this.props;
    const { value } = this.state;
    console.log(staff);
    return (
      <div>
        <div>
          <IconButton onClick={() => this.handleBack()}>
            <KeyboardBackspaceIcon color="secondary" />
          </IconButton>
        </div>
        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
          alignItems="start"
        >
          <Grid
            item
            xs={4}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'start'
            }}
          >
            <Avatar
              alt="User Name"
              src={staff.photo ? staff.photo : avatarApi[6]}
              className={classes.large}
            />
            <div
              className={classes.divCenter}
              style={{ width: '100%', marginTop: 20 }}
            >
              <Typography
                variant="subtitle1"
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '25px',
                  fontWeight: 'bold',
                  opacity: 0.6
                }}
              >
                {staff.name}
              </Typography>
            </div>
            <Paper
              elevation={2}
              style={{ padding: 20, width: '100%', marginTop: 30 }}
            >
              <Typography
                variant="subtitle1"
                style={{
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '20px',

                  fontWeight: 'bold'
                }}
                color="primary"
              >
                Contact Data :
              </Typography>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    marginTop: 20
                  }}
                  color="secondary"
                >
                  {'Personal phone :  '}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    opacity: 0.7,
                    marginTop: 20
                  }}
                >
                  {staff.personalPhone}
                </Typography>
              </div>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                  color="secondary"
                >
                  {'Company phone :  '}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    opacity: 0.7
                  }}
                >
                  {staff.companyPhone}
                </Typography>
              </div>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                  color="secondary"
                >
                  {'Personal email :  '}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    opacity: 0.7
                  }}
                >
                  {staff.personalEmail}
                </Typography>
              </div>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                  color="secondary"
                >
                  {'Company email :  '}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    opacity: 0.7
                  }}
                >
                  {staff.companyEmail}
                </Typography>
              </div>
              <div className={classes.divContactInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                  color="secondary"
                >
                  {'Skype :  '}
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    opacity: 0.7
                  }}
                >
                  {staff.skype}
                </Typography>
              </div>
            </Paper>
            <Paper
              elevation={2}
              style={{ padding: 20, width: '100%', marginTop: 15 }}
            >
              <Typography
                variant="subtitle1"
                style={{
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
                color="primary"
              >
                Functional Structure :
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '17px',
                  marginTop: 20,
                  marginLeft: 20
                }}
              >
                Level 1
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '17px',
                  marginTop: 10,
                  marginLeft: 40
                }}
              >
                Level 2
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '17px',
                  marginTop: 10,
                  marginLeft: 60
                }}
              >
                Level 3
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <div style={{ display: 'table', height: '100%', width: '100%' }}>
              <div style={{ display: 'table-row', height: 0 }}>
                <Paper elevation={2}>
                  <Tabs
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab label="General Information" />
                    <Tab label="General Contract Information" />
                    <Tab label="Economic Contract Information" />
                  </Tabs>
                </Paper>
              </div>
              <div style={{ display: 'table-row', height: 15 }} />
              <div style={{ display: 'table-row' }}>
                <Paper
                  elevation={2}
                  style={{
                    padding: 50,
                    width: '100%',
                    height: '100%'
                  }}
                  id="1"
                  hidden={value !== 0}
                >
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }}
                    color="secondary"
                  >
                    Personal Information :
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-person" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Name :  '}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            opacity: 0.7
                          }}
                        >
                          {staff.name}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-calendar" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Birthday :  '}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            opacity: 0.7
                          }}
                        >
                          {staff.birthday}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-map" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Birth Country :  '}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            opacity: 0.7
                          }}
                        >
                          {staff.birthCountry}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-map" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Residence Country :  '}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            opacity: 0.7
                          }}
                        >
                          {staff.address.country.countryName}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-alert" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Emergency Contact Name :  '}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            opacity: 0.7
                          }}
                        >
                          {staff.emergencyContactName}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-alert" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Emergency Contact Phone :  '}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            opacity: 0.7
                          }}
                        >
                          {staff.emergencyContactPhone}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <Typography
                    variant="subtitle1"
                    style={{
                      fontFamily: 'sans-serif , Arial',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      marginTop: 20
                    }}
                    color="secondary"
                  >
                    Address :
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-locate" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Address :  '}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            opacity: 0.7
                          }}
                        >
                          {staff.address.address}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-locate" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'Post code :  '}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            opacity: 0.7
                          }}
                        >
                          {staff.address.postCode}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      width: '100%',
                      marginTop: 20
                    }}
                  >
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-locate" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'City :  '}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            opacity: 0.7
                          }}
                        >
                          {staff.address.city}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.divInline}>
                      <Avatar>
                        <Ionicon icon="md-locate" />
                      </Avatar>
                      <div style={{ marginLeft: 20 }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px'
                          }}
                          color="secondary"
                        >
                          {'State :  '}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          style={{
                            color: '#000',
                            fontFamily: 'sans-serif , Arial',
                            fontSize: '17px',
                            opacity: 0.7
                          }}
                        >
                          {staff.address.state}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

StaffProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  staff: PropTypes.object.isRequired,
  showProfile: PropTypes.func.isRequired
};

export default withStyles(styles)(StaffProfile);
