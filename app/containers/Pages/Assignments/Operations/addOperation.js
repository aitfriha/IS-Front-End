import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import AreaService from '../../../Services/AreaService';
import PeopleService from '../../../Services/PeopleService';
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import '../../Configurations/map/app.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import styles from './Operation-jss';
import DirectionService from '../../../Services/DirectionService';
import OperationConfigService from '../../../Services/OperationConfigService';
import history from '../../../../utils/history';

class AddOperation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: {
        firstName: '',
        lastName: ''
      },
      workers: [],
      direction: {
        directionName: ''
      },
      directions: [],
      area: {
        areaName: ''
      },
      areas: [],
      endDate: '',
      startDate: ''
    };
  }


  componentDidMount() {
    PeopleService.getPeoples().then(({ data }) => {
      this.setState({ workers: data });
    });
    DirectionService.getDirections().then(({ data }) => {
      this.setState({ directions: data });
    });
  }

  handleWorker = (ev, value) => {
    this.setState({ worker: value });
  };

  handleArea = (ev, value) => {
    this.setState({ area: value });
  };

  handleDirection = (ev, value) => {
    console.log(value);
    AreaService.getAreasByDirection(value.directionId).then(({ data }) => {
      this.setState({ direction: value, areas: data });
    });
  };


  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitOperation = () => {
    const {
      worker,
      direction,
      area,
      endDate,
      startDate
    } = this.state;
    const NewWorkerConfig = {
      people: worker,
      direction,
      area,
      operationStartDate:  startDate,
      operationEndDate: endDate
    };
    console.log(NewWorkerConfig);
    OperationConfigService.saveOperationConfig(NewWorkerConfig).then(({ data }) => {
      console.log(data);
      history.push('/app/configurations/assignments/workers-assignment');
    });
  };


  render() {
    const title = brand.name + ' - Assignments';
    const description = brand.desc;
    const { classes } = this.props;
    const {
      worker, workers,
      area, areas,
      direction, directions,
      endDate, startDate
    } = this.state;
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
        <PapperBlock title="Create worker assignment" desc="Please, Fill in the all field" icon="ios-person">
          <Grid
            container
            spacing={10}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={5}>
              <Autocomplete
                value={worker}
                options={workers}
                autoHighlight
                getOptionLabel={option => option.firstName + ' ' + option.lastName}
                renderOption={option => (
                  <React.Fragment>
                    {option.firstName + ' ' + option.lastName}
                  </React.Fragment>
                )}
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Worker"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
                onChange={(event, value) => this.handleWorker(event, value)}
              />
              <Autocomplete
                className={classes.textField}
                value={direction}
                options={directions}
                autoHighlight
                getOptionLabel={option => option.directionName}
                renderOption={option => (
                  <React.Fragment>
                    {option.directionName}
                  </React.Fragment>
                )}
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Direction"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
                onChange={(event, value) => this.handleDirection(event, value)}
              />
              <Autocomplete
                className={classes.textField}
                value={area}
                options={areas}
                autoHighlight
                getOptionLabel={option => option.areaName}
                renderOption={option => (
                  <React.Fragment>
                    {option.areaName}
                  </React.Fragment>
                )}
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Area"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
                onChange={(event, value) => this.handleArea(event, value)}
              />
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
              <TextField
                id="date"
                label="End Date"
                className={classes.textField}
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="endDate"
                fullWidth
                value={endDate}
                onChange={this.handleChange}
              />
              <Button className={classes.textField} color="primary" variant="contained" size="medium" onClick={this.handleSubmitOperation}>Assign</Button>
            </Grid>
          </Grid>
        </PapperBlock>
      </div>
    );
  }
}
AddOperation.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddOperation);
