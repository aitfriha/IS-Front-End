import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  Button,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import SectorConfigService from '../../Services/SectorConfigService';
import '../Configurations/map/app.css';
import AutoComplete from '../../../components/AutoComplete';
import SectorService from '../../Services/SectorService';
import { bindActionCreators } from 'redux';
import { addSectorConfig } from '../../../redux/actions/sectorConfigActions';
import { connect } from 'react-redux';

class AddCity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description1: '',
      serviceName: '',
      servicesTypes: [],
    };
  }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmitSector = () => {
  };

  handleValueChange = (value, type) => {
    this.setState({ [type]: value });
  };

  render() {
    const { classes } = this.props;
    const {
      description1, servicesTypes,
    } = this.state;
    return (
      <div>
        <Grid
          container
          spacing={6}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={10}
            style={{ display: 'flex', justifyContent: 'space-between' }}
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle2" color="primary" style={{ width: '15%' }}>City</Typography>
            <div style={{ width: '35%' }}>
              <AutoComplete value={this.handleValueChange} placeholder="City Name" data={servicesTypes} type="city" attribute="cityName" />
            </div>
            <div style={{ width: '35%' }}>
              <AutoComplete value={this.handleValueChange} placeholder="state" data={servicesTypes} type="state" attribute="stateName" />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}
          >
            <Button
              color="primary"
              variant="contained"
              size="medium"
              onClick={this.handleSubmitSector}
            >
              Save city
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
AddCity.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default (AddCity);
