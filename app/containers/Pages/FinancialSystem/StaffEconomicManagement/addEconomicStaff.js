import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  Button, Grid, TextField
} from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import history from '../../../../utils/history';
import EconomicStaffService from '../../../Services/EconomicStaffService';
import { ThemeContext } from '../../../App/ThemeWrapper';

const useStyles = makeStyles();

class AddEconomicStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      employeeNumber: '',
      name: '',
      fatherName: '',
      motherName: '',
      highDate: '',
      lowDate: '',
      grosSalary: '',
      netSalary: '',
      contributionSalary: '',
      companyCost: '',
      open: false
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      changeTheme
    } = this.props;
    changeTheme('greyTheme');
  }

    handleSubmit = () => {
      const {
        retentionId, name, descrption, currentCity, addressId
      } = this.state;
      const city = { _id: currentCity };
      const address = {
        addressId, city
      };
      const EconomicStaff = {
        retentionId, name, descrption, address
      };
      EconomicStaffService.saveEconomicStaff(EconomicStaff).then(result => {
        console.log(result);
        history.push('/app/gestion-financial/Staff Economic Management');
      });
    }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    handleGoBack = () => {
      history.push('/app/gestion-financial/Staff Economic Management');
    }

    render() {
      console.log(this.state);
      const title = brand.name + ' - Add Commercial Staff';
      const { desc } = brand;
      // eslint-disable-next-line react/prop-types
      const {
        name
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
            title="New Commercial Staff"
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
              spacing={3}
              alignItems="flex-start"
              direction="row"
            >
              <Grid item xs={12} md={4}>
                <TextField
                  id="Name"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={name}
                  required
                  fullWidth
                  onChange={this.handleChange}
                  className={classes.textField}
                />
              </Grid>
            </Grid>
            <div align="center">
              <br />
              <br />
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
AddEconomicStaff.propTypes = {
  classes: PropTypes.object.isRequired
};

const AddEconomicStaffMapped = connect()(AddEconomicStaff);

export default () => {
  const { changeTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return <AddEconomicStaffMapped changeTheme={changeTheme} classes={classes} />;
};
