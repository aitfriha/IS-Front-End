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
  };

  render() {
    const { classes, staff } = this.props;
    const { value } = this.state;
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
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '20px',

                  fontWeight: 'bold'
                }}
              >
                Contac Data :
              </Typography>
              <div className={classes.divInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px',
                    marginTop: 20
                  }}
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
              <div className={classes.divInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                >
                  {'Personal mobile phone :  '}
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
                  {staff.personalMobilePhone}
                </Typography>
              </div>
              <div className={classes.divInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
                >
                  {'Email :  '}
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
                  {staff.email}
                </Typography>
              </div>
              <div className={classes.divInline}>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: '#000',
                    fontFamily: 'sans-serif , Arial',
                    fontSize: '17px'
                  }}
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
            </Paper>
            <Paper
              elevation={2}
              style={{ padding: 20, width: '100%', marginTop: 15 }}
            >
              <Typography
                variant="subtitle1"
                style={{
                  color: '#000',
                  fontFamily: 'sans-serif , Arial',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
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
          <Grid
            item
            xs={8}
            container
            spacing={10}
            direction="row"
            justifyContent="left"
            alignItems="start"
          >
            <Grid item xs={12}>
              <Paper elevation={0}>
                <Tabs
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Personal Information" />
                  <Tab label="General Contract Information" />
                  <Tab label="Economic Contract Information" />
                </Tabs>
              </Paper>
              <Paper
                elevation={2}
                style={{
                  padding: 20,
                  width: '100%',
                  height: '100%',
                  marginTop: 15,
                  paddingBottom: 0
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'Left' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '50%'
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px'
                      }}
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'left',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '50%'
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px'
                      }}
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
                <div style={{ display: 'flex', justifyContent: 'Left' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '50%'
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px'
                      }}
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'left',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '50%'
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px'
                      }}
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
                      {staff.residenceCountry}
                    </Typography>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'Left' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'Left',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '50%'
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px'
                      }}
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'left',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '50%'
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: '#000',
                        fontFamily: 'sans-serif , Arial',
                        fontSize: '17px'
                      }}
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
              </Paper>
            </Grid>
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
