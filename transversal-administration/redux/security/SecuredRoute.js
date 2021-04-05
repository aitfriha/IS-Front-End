import { Route } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isTokenValid } from './security';
import { UnauthorizedDedicated } from '../../../app/containers/pageListAsync';

const SecuredRoute = ({ component: Component, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props => {
      if (isTokenValid() === true) {
        return <Component {...props} {...otherProps} />;
      } if (isTokenValid() === false) {
        return <UnauthorizedDedicated title="401" desc={(<FormattedMessage id="page.session_timed_out_please_login.title" />)} />;
      }
      return <UnauthorizedDedicated title="401" desc={(<FormattedMessage id="page.unauthorized.title" />)} />;
    }
    }
  />
);

SecuredRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default (SecuredRoute);
