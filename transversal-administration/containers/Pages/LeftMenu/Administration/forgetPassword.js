import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ResetForm } from 'dan-components';
// import styles from '../../../components/Forms/user-jss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { signIn } from '../../../../redux/auth/actions';
import styles from '../../../../../app/components/Forms/user-jss';
import { forgetPasswordUser } from '../../../../redux/users/actions';
class ResetPassword extends React.Component {
  state = {
    valueForm: []
  }

  /*  submitForm(values) {
    setTimeout(() => {
      this.setState({ valueForm: values });
      console.log(`You submitted:\n\n${this.state.valueForm}`); // eslint-disable-line
    }, 500); // simulate server latency
  } */
  submitForm(values) {
    console.log(`You submitted:\n\n${values.get('email')}`);
    const {
      forgetPasswordUser
    } = this.props;

    forgetPasswordUser(values.get('email'));
  }

  render() {
    const title = brand.name + ' - Reset Password';
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
            <ResetForm onSubmit={(values) => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  signInResponse: state.getIn(['auth']).signInResponse,
  isLoading: state.getIn(['auth']).isLoading,
  errors: state.getIn(['auth']).errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  forgetPasswordUser
}, dispatch);

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPassword)));
