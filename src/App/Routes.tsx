import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import ConnectedPrivateRoute from '@onaio/connected-private-route';
import { ConnectedLogout, ConnectedOauthCallback } from '@onaio/gatekeeper';
import { getUser, isAuthenticated, logOutUser } from '@onaio/session-reducer';
import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';

import { exportSpecifier } from '@babel/types';
import { match, Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import ConnectedHierarchichalDataTable from '../components/HierarchichalDataTable';
import { HeaderProps } from '../components/page/Header/Header';
import Loading from '../components/page/Loading';
import SideMenu from '../components/page/SideMenu';
import SidenavComponent from '../components/page/SideNav/sidenav';
import { DISABLE_LOGIN_PROTECTION } from '../configs/env';
import { providers } from '../configs/settings';
import {
  ANALYSIS_URL,
  COMPARTMENTS_URL,
  HIERARCHICAL_DATA_URL,
  LOGFACE_URL,
  LOGOUT_URL,
} from '../constants';
import { CLIENT_URL } from '../constants';
import Analysis from '../containers/Clients/Analysis/';
import ConnectedClientList from '../containers/Clients/List';
import Compartments from '../containers/Compartments';
import ConnectedLogFace from '../containers/LogFace';
import Home from '../containers/pages/Home/Home';
import PregnancyHome from '../containers/pages/Home/PregnancyHome';
import ConnectedPatientDetails from '../containers/PatientDetails';
import { headerShouldNotRender, oAuthUserInfoGetter } from '../helpers/utils';
import './App.css';

library.add(faUser);

const mapStateToProps = (state: Partial<Store>) => {
  return {
    authenticated: isAuthenticated(state),
  };
};

export interface RoutesProps {
  authenticated: boolean;
}

export const Routes = (props: RoutesProps) => {
  const { authenticated } = props;
  return (
    <div
      className={`${
        authenticated && !headerShouldNotRender() ? 'main-container' : 'hidden-container'
      }`}
    >
      <div
        className={`${authenticated && !headerShouldNotRender() ? 'sidebar' : 'hidden-container'}`}
      >
        {<SideMenu />}
      </div>
      <div className="content">
        <Switch>
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path="/"
            component={Home}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path="/pregnancy"
            component={PregnancyHome}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path={CLIENT_URL}
            component={ConnectedClientList}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={true}
            exact={true}
            path={COMPARTMENTS_URL}
            component={Compartments}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={true}
            exact={true}
            path={`${HIERARCHICAL_DATA_URL}/:current_level?/:direction?/:node_id?/:from_level?`}
            component={ConnectedHierarchichalDataTable}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={true}
            exact={true}
            path={ANALYSIS_URL}
            component={Analysis}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path={'/analysis'}
            component={Analysis}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path={'/patient_detail/:patient_id'}
            component={ConnectedPatientDetails}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path={LOGOUT_URL}
            component={ConnectedLogout}
          />
          <ConnectedPrivateRoute exact={true} path={LOGFACE_URL} component={ConnectedLogFace} />
          {/* tslint:disable jsx-no-lambda */}
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
        </Switch>
      </div>
    </div>
  );
};

// class Routes extends Component<{}, {}> {

//   public render() {
//     console.log("props??", this.props);
//     //const { authenticated } = this.props;
//     debugger;
//     // if (!authenticated) {
//     //   return null;
//     // }
//     return (
//       <div className="main-container">
//         <div className="sidebar">
//           <SidenavComponent />
//         </div>
//         <div className="content">
//         <Switch>
//           <ConnectedPrivateRoute
//             disableLoginProtection={DISABLE_LOGIN_PROTECTION}
//             exact={true}
//             path="/"
//             component={Home}
//           />
//           <ConnectedPrivateRoute
//             disableLoginProtection={DISABLE_LOGIN_PROTECTION}
//             exact={true}
//             path="/pregnancy"
//             component={PregnancyHome}
//           />
//           <ConnectedPrivateRoute
//             disableLoginProtection={DISABLE_LOGIN_PROTECTION}
//             exact={true}
//             path={CLIENT_URL}
//             component={ConnectedClientList}
//           />

//           {/* tslint:disable jsx-no-lambda */}
//           <Route
//             exact={true}
//             path="/oauth/callback/:id"
//             render={routeProps => (
//               <ConnectedOauthCallback
//                 LoadingComponent={Loading}
//                 providers={providers}
//                 oAuthUserInfoGetter={oAuthUserInfoGetter}
//                 {...routeProps}
//               />
//             )}
//           />
//           {/* tslint:enable jsx-no-lambda */}
//           <ConnectedPrivateRoute
//             disableLoginProtection={DISABLE_LOGIN_PROTECTION}
//             exact={true}
//             path={LOGOUT_URL}
//             component={ConnectedLogout}
//           />
//           <ConnectedPrivateRoute
//             exact={true}
//             path={LOGFACE_URL}
//             component={ConnectedLogFace}
//           />
//         </Switch>
//       </div>
//       </div>
//     );
//   }
// }

const ConnectedRoutes = connect(mapStateToProps)(Routes);

export default ConnectedRoutes;
