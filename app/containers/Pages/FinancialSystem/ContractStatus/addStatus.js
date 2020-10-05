import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Grid, TextField
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import history from '../../../../utils/history';
import styles from '../../Companies/companies-jss';

class AddStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusCode: '',
      statusName: '',
      description: ''
    };
  }

    handleSubmit = () => {
      history.push('/app/gestion-financial/Contract-Status');
    }

    handleGoBack = () => {
      history.push('/app/gestion-financial/Contract-Status');
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleDetails = () => {
      this.setState({ openPopUp: true });
    }

    render() {
      console.log(this.state);
      const title = brand.name + ' - Add Status';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        statusCode,
        statusName,
        description
      } = this.state;
      const { classes } = this.props;
      return (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={desc} />
          </Helmet>
          <PapperBlock
            title="New Contract Status"
            desc="Please, Fill in the all field"
            icon="ios-add-circle"
          >
            <Grid container spacing={1}>
              <Grid item xs={11} />
              <Grid item xs={1}>
                <IconButton onClick={() => this.handleGoBack()}>
                  <KeyboardBackspaceIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={10}
              alignItems="flex-start"
              direction="row"
              justify="center"
            >
              <Grid item xs={12} md={6}>
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
                  multiline
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
                <br />
              </Grid>
            </Grid>
            <div align="center">
              <Button size="small" color="inherit" onClick={this.handleGoBack}>Cancel</Button>
              <Button variant="contained" color="primary" type="button" onClick={this.handleSubmit}>
                      Save
              </Button>
            </div>
          </PapperBlock>
        </div>
      );
    }
}
AddStatus.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AddStatus);
