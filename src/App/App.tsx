import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import ConnectedPrivateRoute from '@onaio/connected-private-route';
import { ConnectedLogout, ConnectedOauthCallback, OauthLogin } from '@onaio/gatekeeper';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Loading from '../components/page/Loading';
import { DISABLE_LOGIN_PROTECTION } from '../configs/env';
import { providers } from '../configs/settings';
import { LOGIN_URL, LOGOUT_URL } from '../constants';
import ConnectedHeader from '../containers/ConnectedHeader';
import './App.css';

import SidenavComponent from '../components/page/SideNav/sidenav';
import { CLIENT_URL } from '../constants';
import ConnectedClientList from '../containers/Clients/List';
import Home from '../containers/pages/Home/Home';
import { oAuthUserInfoGetter } from '../helpers/utils';
import './App.css';

library.add(faUser);

import './App.css';

/** Main App component */
class App extends Component {
  public render() {
    return (
      <div className="main-app-container">
        <ConnectedHeader />
        <div className="main-container">
          <div className="content">
            {/* <Row id="main-page-row">
              <Col> */}
            <Switch>
              <ConnectedPrivateRoute
                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                exact={true}
                path="/"
                component={Home}
              />
              <ConnectedPrivateRoute
                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                exact={true}
                path={CLIENT_URL}
                component={ConnectedClientList}
              />

              {/* tslint:disable jsx-no-lambda */}
              <Route
                exact={true}
                path={LOGIN_URL}
                render={routeProps => <OauthLogin providers={providers} {...routeProps} />}
              />
              <Route
                exact={true}
                path="/oauth/callback/:id"
                render={routeProps => (
                  <ConnectedOauthCallback
                    LoadingComponent={Loading}
                    providers={providers}
                    oAuthUserInfoGetter={oAuthUserInfoGetter}
                    {...routeProps}
                  />
                )}
              />
              {/* tslint:enable jsx-no-lambda */}
              <ConnectedPrivateRoute
                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                exact={true}
                path={LOGOUT_URL}
                component={ConnectedLogout}
              />
            </Switch>
            {/*  */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
