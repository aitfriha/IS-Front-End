import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import TextField from '@material-ui/core/TextField/TextField';
import { isString } from 'lodash';
import { bindActionCreators } from 'redux';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';
import notification from '../Notification/Notification';
import { changePasswordUser, forgetPasswordUser } from '../../../transversal-administration/redux/users/actions';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

class ResetForm extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      newPassword: '',
      confirmNewPassword: '',
      error: false,
      disabled: false
    };
  }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }

    handleChangeConfirm = (event) => {
      const { newPassword } = this.state;
      this.setState({ [event.target.name]: event.target.value });
      if (newPassword !== event.target.value) {
        this.setState({ error: true });
        this.setState({ disabled: true });
      } else {
        this.setState({ error: false });
        this.setState({ disabled: false });
      }
    }

    resetPassword = () => {
      const token = (new URLSearchParams(window.location.search)).get('token');
      console.log(token);
      const { newPassword } = this.state;
      const data = {
        token,
        password: newPassword
      };
      const { changePasswordUser } = this.props;
      new Promise((resolve) => {
        changePasswordUser(data);
        this.editingPromiseResolve = resolve;
      }).then((result) => {
        if (isString(result)) {
          notification('success', result);
        } else {
          notification('danger', result);
        }
      });
    }

    render() {
      const {
        newPassword, confirmNewPassword, error, disabled
      } = this.state;
      const {
        classes,
        handleSubmit,
        pristine,
        submitting,
        deco,
      } = this.props;
      const {
        errors, isLoading, userResponse
      } = this.props;
        // Sent resolve to editing promises
      (!isLoading && userResponse) && this.editingPromiseResolve(userResponse);
      (!isLoading && !userResponse) && this.editingPromiseResolve(errors);
      return (
        <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              {/* <img src={logo} alt={brand.name} /> */}
              {' '}
              {/* {brand.name} */}
            </NavLink>
          </div>
          <Typography variant="h4" className={classes.title} gutterBottom style={{ fontWeight: 'bold' }}>
              Sistemas Internos
          </Typography>
          <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
            Reset Password
          </Typography>
          <section className={classes.formWrap}>
            <form>
              <div>
                <FormControl className={classes.formControl}>
                  <TextField
                    name="newPassword"
                    placeholder="New password"
                    label="New password"
                    type="password"
                    onChange={this.handleChange}
                    required
                    value={newPassword}
                    className={classes.field}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    name="confirmNewPassword"
                    placeholder="Confirm New password"
                    label="Confirm New password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={this.handleChangeConfirm}
                    required
                    error={error}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" onClick={this.resetPassword} disabled={disabled}>
                Send
                </Button>
              </div>
            </form>
          </section>
        </Paper>
      );
    }
}

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  userResponse: state.getIn(['user']).userResponse,
  isLoading: state.getIn(['user']).isLoading,
  errors: state.getIn(['user']).errors,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  forgetPasswordUser, changePasswordUser
}, dispatch);
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetForm)));
