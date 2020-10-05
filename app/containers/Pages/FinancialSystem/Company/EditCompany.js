import React from 'react';
import {
  Button,
  FormControl,
  Grid,
  TextField,
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import { Image } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddressBlock from '../../Address';
import styles from '../../Companies/companies-jss';

class EditCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone1: '',
      phone2: '',
      logo: ''
    };
  }

    handleChange = (ev) => {
      this.setState({ [ev.target.name]: ev.target.value });
    };

    // eslint-disable-next-line react/sort-comp
    readURI(e) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        console.log(e.target.files);
        reader.onload = function (ev) {
          this.setState({ logo: ev.target.result });
        }.bind(this);
        reader.readAsDataURL(e.target.files[0]);
      }
    }

    handleChangeLogo = e => {
      this.readURI(e);
    };

    render() {
      console.log(this.state);
      const { classes } = this.props;
      const {
        name,
        email,
        phone1,
        phone2,
      } = this.state;
      return (
        <div>
          <Grid
            container
            spacing={10}
            alignItems="flex-start"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={4}>
              <Chip label="General Information" avatar={<Avatar>G</Avatar>} color="primary" />
              <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                value={name}
                required
                fullWidth
                onChange={this.handleChange}
                className={classes.textField}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                value={email}
                required
                fullWidth
                onChange={this.handleChange}
                className={classes.textField}
              />
              <TextField
                id="outlined-basic"
                label="General Phone 1"
                variant="outlined"
                name="phone1"
                value={phone1}
                required
                fullWidth
                onChange={this.handleChange}
                className={classes.textField}
              />
              <TextField
                id="outlined-basic"
                label="General Phone 2"
                variant="outlined"
                name="phone2"
                value={phone2}
                required
                fullWidth
                onChange={this.handleChange}
                className={classes.textField}
              />
              <br />
              <br />
              <FormControl>
                <input
                  style={{ display: 'none' }}
                  id="outlined-button-file-2"
                  type="file"
                  onChange={this.handleChangeLogo.bind(this)}
                  className={classes.textField}
                />
                <FormLabel htmlFor="outlined-button-file-2">
                  <Button
                    fullWidth
                    variant="outlined"
                    component="span"
                    startIcon={<Image color="primary" />}
                  >
                                    Photo
                  </Button>
                </FormLabel>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Chip label="Company Address" avatar={<Avatar>A</Avatar>} color="primary" />
              <Divider variant="fullWidth" style={{ marginBottom: '10px', marginTop: '10px' }} />
              <AddressBlock onChangeInput={this.handleChange} />
            </Grid>
          </Grid>
        </div>
      );
    }
}
EditCompany.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EditCompany);
