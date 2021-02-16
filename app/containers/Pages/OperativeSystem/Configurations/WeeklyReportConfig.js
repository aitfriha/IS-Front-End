import React, { useContext } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  FormControl,
  FormHelperText,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Tooltip
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';


import { injectIntl } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isString } from 'lodash';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { makeStyles } from '@material-ui/core/styles';
import notification from '../../../../components/Notification/Notification';


import {
  updateWeeklyReportConfig,
  getWeeklyReportConfig,
  getWeeklyReportConfigById
} from '../../../../redux/weeklyReportConfig/actions';

import {
  filterStaffByEmail
} from '../../../../redux/staffAssignment/actions';

import { ThemeContext } from '../../../App/ThemeWrapper';

const styles = {};

const useStyles = makeStyles((theme) => {

});
const title = brand.name + ' - Weekly Report Config';
const description = brand.desc;

class WeeklyReportConfig extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => { };
    self = this;
    this.state = {
      numberOfDays: 1,
      employees: [],
      options: [],
      value: null,
      inputValue: '',
      error: false
    };
  }

  componentDidMount() {
    const { changeTheme } = this.props;
    changeTheme('greenTheme');

    const { getWeeklyReportConfig, weeklyReportConfig } = this.props;
    getWeeklyReportConfig();

    this.setState({
      numberOfDays: (weeklyReportConfig && weeklyReportConfig.numberOfDays) ? weeklyReportConfig.numberOfDays : this.state.numberOfDays,
      employees: (weeklyReportConfig && weeklyReportConfig.employees) ? weeklyReportConfig.employees : this.state.employees,
      options: [],
      value: null,
      inputValue: '',
      error: false
    });
  }


  componentWillUnmount() {
    this.state = {
      numberOfDays: 1,
      employees: [],
      options: [],
      value: null,
      inputValue: '',
      error: false
    };
  }

  //----------------------------------------------------------------------------------------------


  // HANDLE ACTIONS

  changeNumberOfDays(e) {
    const newValue = e.target.value;
    this.setState({
      numberOfDays: newValue,
      employees: this.state.employees,
      error: newValue === '' || newValue < 1
    });
  }

  handleInputChange(event) {
    const { filterStaffByEmail, filterStaff } = this.props;
    const enterValue = event ? event.target.value : '';
    const newOptions = [];
    if (enterValue) {
      filterStaffByEmail(enterValue);
      // let values = filterStaff && filterStaff;
      filterStaff.forEach(element => {
        const index = this.state.employees.indexOf(element.companyEmail);
        if (index === -1) {
          newOptions.push(element.companyEmail);
        }
      });
    }
    this.setState({
      options: newOptions
    });
  }

  handleAddEmployee(e) {
    const { employees } = this.state;
    employees.push(this.state.value);
    this.setState({
      numberOfDays: this.state.numberOfDays,
      employees,
      options: [],
      value: null,
      inputValue: ''
    });
  }

  handleDeleteEmployee(e, email) {
    const newEmployeesList = this.state.employees;
    const indexToDelete = newEmployeesList.findIndex(obj => obj === email);
    newEmployeesList.splice(indexToDelete, 1);
    this.setState({
      numberOfDays: this.state.numberOfDays,
      employees: newEmployeesList
    });
  }


  handleSaveConfiguration(e) {
    const { weeklyReportConfig, getWeeklyReportConfigById, updateWeeklyReportConfig } = this.props;
    const configurationId = weeklyReportConfig ? weeklyReportConfig.id : '';
    const data = {
      id: configurationId,
      numberOfDays: this.state.numberOfDays,
      employees: this.state.employees,
      removable: false
    };

    const promise = new Promise((resolve) => {
      updateWeeklyReportConfig(data);
      self.editingPromiseResolve = resolve;
    });
    promise.then((result) => {
      if (isString(result)) {
        getWeeklyReportConfigById(configurationId);
        notification('success', result);
      } else {
        notification('danger', result);
      }
    });
  }


  render() {
    const {
      location, intl, errors, isLoading, weeklyReportConfigResponse, weeklyReportConfig
    } = this.props;

    const { numberOfDays, employees } = this.state;


    (!isLoading && weeklyReportConfigResponse) && this.editingPromiseResolve(weeklyReportConfigResponse);
    (!isLoading && !weeklyReportConfigResponse) && this.editingPromiseResolve(errors);

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
        <Card>
          <CardContent>
            <Grid style={{ marginTop: '10px' }}>
              <Typography component="span" variant="subtitle2" gutterBottom>
                Enter the threshold (in number of days) in which the weekly report can be modified
              </Typography>
              <Grid item style={{ marginTop: '10px' }}>
                <FormControl variant="outlined" size="small">
                  <TextField
                    id="numberOfDays"
                    label="Number of days"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    variant="outlined"
                    value={numberOfDays}
                    onChange={(e) => this.changeNumberOfDays(e)}
                    error={this.state.error}
                  />
                  {this.state.error ? <FormHelperText error>Incorrect entry</FormHelperText> : null}
                </FormControl>
              </Grid>
            </Grid>

            <Grid style={{ marginTop: '10px' }}>
              <Typography component="span" variant="subtitle2" gutterBottom>
                Set the staff who can modify weekly reports in addition to the owner
              </Typography>
              <Grid container style={{ marginTop: '10px' }}>
                <Grid item style={{ marginTop: '10px' }}>
                  <FormControl style={{ minWidth: '350px' }}>
                    <Autocomplete
                      id="email-autocomplete"
                      style={{ minWidth: '40%' }}
                      options={this.state.options}
                      autoComplete
                      value={this.state.value}
                      onChange={(event, newValue) => {
                        this.setState({
                          value: newValue
                        });
                      }}
                      onInputChange={(e) => this.handleInputChange(e)}
                      onClose={(event) => {
                        this.setState({
                          options: []
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          size="small"
                          label="Company email"
                          placeholder="Type a company email"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item style={{ marginLeft: '5px', marginTop: '6px' }}>
                  <Tooltip title="Add">
                    <span>
                      <IconButton aria-label="Add" disabled={!this.state.value} onClick={(e) => this.handleAddEmployee(e)}>
                        <AddBoxIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
              <List>
                {employees.map(email => (
                  <ListItem key={email}>
                    <ListItemText primary={email} />
                    <ListItemSecondaryAction>
                      <Tooltip title="Delete">
                        <IconButton aria-label="Delete" onClick={(e) => this.handleDeleteEmployee(e, email)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </CardContent>
          <CardActions style={{ marginLeft: '10px' }}>
            <Button variant="contained" size="small" disabled={this.state.error} onClick={(e) => this.handleSaveConfiguration(e)} color="primary">
              Save Configurations
              {/* } {intl.formatMessage({ id: 'connection.row.body.yes' })} */}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

WeeklyReportConfig.propTypes = {
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,

  getWeeklyReportConfig: PropTypes.func.isRequired,
  updateWeeklyReportConfig: PropTypes.func.isRequired,

  intl: PropTypes.object.isRequired,

  filterStaff: PropTypes.array.isRequired,
  filterStaffByEmail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  weeklyReportConfig: state.getIn(['weeklyReportConfig']).weeklyReportConfig,
  weeklyReportConfigResponse: state.getIn(['weeklyReportConfig']).weeklyReportConfigResponse,
  isLoading: state.getIn(['weeklyReportConfig']).isLoading,
  errors: state.getIn(['weeklyReportConfig']).errors,

  filterStaff: state.getIn(['staffAssignment']).filterStaff,
  staffAssignmentResponse: state.getIn(['staffAssignment']).staffAssignmentResponse,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateWeeklyReportConfig,
  getWeeklyReportConfig,
  getWeeklyReportConfigById,
  filterStaffByEmail
}, dispatch);


const WeeklyReportConfigMapped = connect(mapStateToProps, mapDispatchToProps)(injectIntl(WeeklyReportConfig));

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <WeeklyReportConfigMapped changeTheme={changeTheme} classes={classes} />;
};

// export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(injectIntl(WeeklyReportConfig)));
