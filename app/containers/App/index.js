import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import ThemeWrapper, { AppContext } from './ThemeWrapper';
import SecuredRoute from '../../../transversal-administration/redux/security/SecuredRoute';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  return (
    <ThemeWrapper>
      <AppContext.Consumer>
        {(changeMode) => (
          <Switch>
            <Route path="/" exact component={LoginDedicated} />
            <SecuredRoute
              path="/app"
              component={(props) => <Application {...props} changeMode={changeMode} />}
            />
            <Route component={Auth} changeMode={changeMode} />
            <Route component={NotFound} />
          </Switch>
        )}
      </AppContext.Consumer>
    </ThemeWrapper>
  );
}

export default App;
