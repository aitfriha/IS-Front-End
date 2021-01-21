import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import { signIn } from '../../../../transversal-administration/redux/auth/actions';
import notification from '../../../components/Notification/Notification';
class Login extends React.Component {
  componentDidUpdate() {
    const {
      history, isLoading, errors, signInResponse
    } = this.props;

    (!isLoading && !isEmpty(errors) && notification('danger', errors));
    (!isLoading && !isEmpty(signInResponse) && history.push('/app'));
  }

  submitForm(values) {
    const {
      signIn
    } = this.props;

    const authBody = {
      userEmail: values.get('email'),
      userPassword: values.get('password')
    };
    signIn(authBody);
  }


  render() {
    const title = brand.name + ' - Login';
    const description = brand.desc;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <LoginForm onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  signInResponse: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  signInResponse: state.getIn(['auth']).signInResponse,
  isLoading: state.getIn(['auth']).isLoading,
  errors: state.getIn(['auth']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  signIn
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login)));
