import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Typography,
  Grid,
  TextField,
  Tooltip,
  IconButton
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MapIcon from '@material-ui/icons/Map';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import styles from './country-jss';
import LeaderService from '../../../Services/LeaderService';
import CountryService from '../../../Services/CountryService';
import '../map/app.css';
import CountryConfigService from '../../../Services/CountryConfigService';
import LogService from '../../../Services/LogService';
import AmchartMap from '../map/amchartMap';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
class CustomToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      countries: [],
      countryName: '',
      leader: {},
      leaders: [],
      map: false,
      endDate: '',
      startDate: '08/09/2020',
      error: false,
      phonePrefix: '',
      countryCode: '',
      state: '',
      city: ''
    };
  }

  getData = () => {
    LeaderService.getLeader().then(({ data }) => {
      this.setState({ leaders: data });
    });
    CountryService.getCountries().then(({ data }) => {
      const countries = [];
      data.forEach(country => countries.push(country.countryName));
      this.setState({ countries });
    });
  };

  handleClick = () => {
    const { csvData, fileName, type } = this.props;
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    console.log(csvData);
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    if (type === true) {
      LogService.saveLog('countryConfig').then(({ data }) => console.log(data));
    } else {
      LogService.saveLog('country').then(({ data }) => console.log(data));
    }
  };

  handleGoToAddClient = () => {
    this.getData();
    this.setState({ open: true });
  };

  handleClose = () => {
    const { reload } = this.props;
    reload({ can: true });
    this.setState({
      open: false,
      error: false,
      countryName: '',
      leader: {},
      phonePrefix: '',
      countryCode: ''
    });
  };

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleCountry = (ev, value) => {
    this.setState({ countryName: value });
  };

  handleCountryTest = (ev) => {
    this.setState({ countryName: ev.target.value });
  };

  handleLeader = (ev, value) => {
    this.setState({ leader: value });
  };

  handleSubmit = () => {
    const {
      countryName,
      leader, endDate,
      startDate,
      phonePrefix,
      countryCode
    } = this.state;
    const { type } = this.props;
    if (type) {
      CountryService.getCountry(countryName).then(({ data }) => {
        if (data) {
          const countryConfig = {
            country: {
              countryName
            },
            leader,
            endDate,
            startDate
          };
          CountryConfigService.saveCountryConfig(countryConfig)
            .then(() => {
              this.handleClose();
            });
        } else {
          this.setState({ error: true });
        }
      });
    } else {
      const countryNames = countryName.split(' ');
      countryNames.forEach((s, index) => {
        countryNames[index] = s.charAt(0).toUpperCase() + s.slice(1);
      });
      const name = countryNames.join('-');
      CountryService.getCountry(name).then(({ data }) => {
        if (!data) {
          const newCountry = {
            countryName: countryName.trim(),
            phonePrefix,
            countryCode
          };
          CountryService.saveCountry(newCountry).then(({ data }) => {
            console.log(data);
            this.handleClose();
          });
        } else {
          this.setState({ error: true });
        }
      }).catch(error => console.log(error));
    }
  };

  handleMapOpen = () => {
    const { map } = this.state;
    this.setState({ map: !map });
  };

  countrySelected = ({ country }) => {
    this.setState({ countryName: country });
  };

  countryFromMap = (data) => {
    const { id, name } = data;
    const number = phoneUtil.parseAndKeepRawInput('1254', id);
    this.setState({ phonePrefix: '+' + number.getCountryCode(), countryCode: id, countryName: name });
  };

  render() {
    const {
      classes, title, type
    } = this.props;
    const {
      open, countries, countryName,
      leader, leaders, startDate, error,
      phonePrefix,
      countryCode,
      state,
      city
    } = this.state;

    return (
      <React.Fragment>
        <Tooltip title="export in Excel" className={classes.toolbarBtn}>
          <IconButton onClick={this.handleClick}>
            <GetAppIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={type ? 'add new config' : 'add new Country'} className={classes.toolbarBtn}>
          <IconButton onClick={this.handleGoToAddClient}>
            <AddIcon />
          </IconButton>
        </Tooltip>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth="lg"
          maxWidth="lg"
          className={classes.container}
        >
          <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
          {
            type ? (
              <DialogContent>
                <div className={classes.divDisplay}>
                  <Typography variant="subtitle2" component="h2">
                    Please, configure the country leader
                  </Typography>
                  <Tooltip title="Select Country from Map" aria-label="add">
                    <IconButton size="medium" onClick={this.handleMapOpen}>
                      <MapIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </div>
                <Grid container justify="center" spacing={3}>
                  <Grid item sm="12" lg="3" md="3" xl="3">
                    {
                      error ? (
                        <Typography variant="subtitle2" component="h2" color="primary">
                          Country doesn't exits in the database
                        </Typography>
                      ) : <div />
                    }
                    <Autocomplete
                      id="free-solo-demo"
                      value={countryName}
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
                    <Autocomplete
                      value={leader}
                      options={leaders}
                      autoHighlight
                      getOptionLabel={option => option.name}
                      renderOption={option => (
                        <React.Fragment>
                          {option.name}
                        </React.Fragment>
                      )}
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Leader"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                      onChange={(event, value) => this.handleLeader(event, value)}
                    />
                    <div className={classes.dateContainer}>
                      <TextField
                        id="date"
                        label="Start Date"
                        className={classes.textField}
                        type="date"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="startDate"
                        fullWidth
                        required
                        value={startDate}
                        onChange={this.handleChange}
                      />
                    </div>
                    <Typography variant="subtitle2" component="h2" align="start">
                      {
                        countryName || leader ? (
                          <Typography variant="subtitle2" component="h2" align="center">
                            {countryName}
                            {' '}
&rarr;
                            {leader.name}
                          </Typography>
                        ) : <div />
                      }
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSubmit}
                      className={classes.btn}
                    >
                      save
                    </Button>
                  </Grid>
                  <Grid item sm="12" lg="9" md="9" xl="9">
                    <AmchartMap type={type} getCountryInfo={this.countryFromMap} />
                  </Grid>
                </Grid>
              </DialogContent>
            ) : (
              <DialogContent>
                <Grid container justify="center" spacing={3}>
                  <Grid item sm="12" lg="3" md="3" xl="3">
                    {
                      error ? (
                        <Typography variant="subtitle2" component="h2" color="primary">
                          this country is already saved
                        </Typography>
                      ) : <div />
                    }
                    <Autocomplete
                      value={countryName}
                      options={countries}
                      autoHighlight
                      getOptionLabel={option => option}
                      renderOption={option => (
                        <React.Fragment>
                          {option}
                        </React.Fragment>
                      )}
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Country"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                          onChange={this.handleCountryTest}
                        />
                      )}
                      fullWidth
                      freeSolo
                      onChange={(event, value) => this.handleCountry(event, value)}
                    />
                    <TextField
                      id="date"
                      label="Country Code"
                      variant="outlined"
                      name="countryCode"
                      className={classes.textField}
                      fullWidth
                      required
                      value={countryCode}
                      onChange={this.handleChange}
                    />
                    <TextField
                      id="phone"
                      label="Phone Prefix"
                      variant="outlined"
                      className={classes.textField}
                      name="phonePrefix"
                      fullWidth
                      required
                      value={phonePrefix}
                      onChange={this.handleChange}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSubmit}
                      className={classes.btn}
                    >
                      save
                    </Button>
                  </Grid>
                  <Grid item sm="12" lg="9" md="9" xl="9">
                    <AmchartMap type={type} getCountryInfo={this.countryFromMap} />
                  </Grid>
                </Grid>
              </DialogContent>
            )
          }
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
CustomToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  csvData: PropTypes.array.isRequired,
  type: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  reload: PropTypes.func.isRequired,
};
export default withStyles(styles)(CustomToolbar);
