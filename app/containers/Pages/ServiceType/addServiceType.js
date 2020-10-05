import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  Button,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './serviceType-jss';
import SectorConfigService from '../../Services/SectorConfigService';
import '../Configurations/map/app.css';
import AutoComplete from '../../../components/AutoComplete';
import SectorService from '../../Services/SectorService';
import { bindActionCreators } from 'redux';
import { addSectorConfig } from '../../../redux/actions/sectorConfigActions';
import { connect } from 'react-redux';

class AddServiceType extends React.Component {
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

  render() {
    const { classes } = this.props;
    const {
      description1,serviceName
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
            <Typography variant="subtitle2" color="primary" style={{ width: '15%' }}>Service Type</Typography>
            <TextField
              id="outlined-basic"
              label="Service Type Name"
              variant="outlined"
              name="serviceName"
              value={serviceName}
              style={{ width: '42%' }}
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description1"
              value={description1}
              style={{ width: '42%' }}
              className={classes.textField}
              onChange={this.handleChange}
            />
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
              Save Service Type
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
AddServiceType.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddServiceType);
