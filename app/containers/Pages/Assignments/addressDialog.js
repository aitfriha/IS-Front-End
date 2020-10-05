import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import Transition from '../../../components/Transition/transition';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
  Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, withStyles
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import PostAddIcon from '@material-ui/icons/PostAdd';
import styles from './assignment-jss';

class AddressDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      address: '',
      generalPhone: '',
      email: ''
    }
  }

  handleOpenAddress = () => {
    const { addressA } = this.props;
    this.setState({
      address: addressA.address,
      generalPhone: addressA.generalPhone,
      email: addressA.email,
      open: true
    });
  };

  handleCloseAddress = () => {
    this.setState({ open: false });
  };

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmit = () => {
    const {
      address,
      generalPhone,
      email
    } = this.state;
    const addressN = {
      address,
      generalPhone,
      email
    };
    const { addressFunc } = this.props;
    addressFunc(addressN);
    this.handleCloseAddress();
  };

  render() {
    const {
      open,
      address,
      generalPhone,
      email
    } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Tooltip title="add new address">
          <IconButton onClick={this.handleOpenAddress} color="primary">
            <PostAddIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleCloseAddress}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth="sm"
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-slide-title">New Address</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Typography variant="subtitle2" component="h2">
                Please, fill in all the field of the form
              </Typography>
            </DialogContentText>
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="address"
              value={address || ''}
              fullWidth
              required
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              required
              name="email"
              value={email || ''}
              type="email"
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-basic"
              label="general Phone"
              variant="outlined"
              fullWidth
              name="generalPhone"
              value={generalPhone || ''}
              required
              className={classes.textField}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleCloseAddress}>
              Cancel
            </Button>
            <Button  color="primary" onClick={this.handleSubmit}>
              save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
AddressDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  addressFunc: PropTypes.func.isRequired,
  addressA: PropTypes.object.isRequired
};
export default withStyles(styles)(AddressDialog);
