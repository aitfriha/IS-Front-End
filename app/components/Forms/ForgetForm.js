import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import { Select } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';
import { bindActionCreators } from "redux";
import { signIn } from "../../../transversal-administration/redux/auth/actions";
import { withRouter } from 'react-router-dom';
import { forgetPasswordUser } from "../../../transversal-administration/redux/users/actions";
import { isString } from "lodash";
import notification from "../Notification/Notification";
// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

class ForgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.editingPromiseResolve = () => {
    };
    this.state = {
      userEmail: ''
    };
  }

        handleChange = (event) => {
          this.setState({ userEmail: event.target.value });
        }

    handleClick = () => {
    const {forgetPasswordUser}= this.props;
      const { userEmail } = this.state;
      new Promise((resolve) => {
        forgetPasswordUser(userEmail);
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
        classes,
        handleSubmit,
        pristine,
        submitting,

      } = this.props;
      const {
        userEmail
      } = this.state;
      const {
        errors, isLoading, userResponse
      } = this.props;
      // Sent resolve to editing promises
      (!isLoading && userResponse) && this.editingPromiseResolve(userResponse);
      (!isLoading && !userResponse) && this.editingPromiseResolve(errors);

      return (
        <Paper className={classNames(classes.paperWrap, classes.petal)}>
          {/*        <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt={brand.name} /> Internal Project
            {brand.name}
          </NavLink>
        </div> */}

          <Typography variant="h4" className={classes.title} gutterBottom>
          forget Password
          </Typography>
          <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
            Did you forget your password ?
          </Typography>
          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl}>
                  <TextField
                    name="userEmail"
                    /* component={TextFieldRedux} */
                    value={userEmail}
                    placeholder="email"
                    label="email"
                    required
                    /* validate={[required, email]} */
                    className={classes.field}
                    onChange={this.handleChange}
                  />
                </FormControl>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" onClick={this.handleClick}>
                Send
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                </Button>
              </div>
            </form>
          </section>
        </Paper>
      );
    }
}

ForgetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,

};
const mapStateToProps = state => ({
  userResponse: state.getIn(['user']).userResponse,
  isLoading: state.getIn(['user']).isLoading,
  errors: state.getIn(['user']).errors,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  forgetPasswordUser
}, dispatch);
export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ForgetForm)));