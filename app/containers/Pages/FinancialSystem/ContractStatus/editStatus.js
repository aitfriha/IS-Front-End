import React from 'react';
import {
  Grid,
  TextField,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Companies/companies-jss';

class EditStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusCode: '',
      statusName: '',
      description: ''
    };
  }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
      console.log(this.state);
      const { classes } = this.props;
      const {
        statusCode,
        statusName,
        description
      } = this.state;
      return (
        <div>
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={8}>
              <TextField
                id="outlined-basic"
                label="Status Code"
                type="number"
                variant="outlined"
                name="statusCode"
                value={statusCode}
                required
                fullWidth
                onChange={this.handleChange}
                className={classes.textField}
              />
              <TextField
                id="outlined-basic"
                label="Status Name"
                variant="outlined"
                name="statusName"
                value={statusName}
                required
                fullWidth
                onChange={this.handleChange}
                className={classes.textField}
              />
              <TextField
                id="outlined-basic"
                label="Description "
                variant="outlined"
                name="description"
                value={description}
                required
                fullWidth
                onChange={this.handleChange}
                className={classes.textField}
              />
              <br />
              <br />
            </Grid>
          </Grid>
        </div>
      );
    }
}
EditStatus.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EditStatus);
