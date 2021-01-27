import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Outer from '../Templates/Outer';
import {
  Login,
  Register,
  ResetPassword,
  ComingSoon,
  Maintenance,
  NotFound,
  UnauthorizedDedicated,
  ForgetPassword
} from '../pageListAsync';

function Auth() {
  return (
    <Outer>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/forget-password" component={ForgetPassword} />
        <Route path="/maintenance" component={Maintenance} />
        <Route path="/coming-soon" component={ComingSoon} />
        <Route path="/unauthorized" component={UnauthorizedDedicated} />
        <Route component={() => <NotFound auth />} />
      </Switch>
    </Outer>
  );
}

export default Auth;
