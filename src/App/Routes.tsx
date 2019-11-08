import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import ConnectedPrivateRoute from '@onaio/connected-private-route';
import { ConnectedLogout, ConnectedOauthCallback } from '@onaio/gatekeeper';
import { isAuthenticated } from '@onaio/session-reducer';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';

import { Route, Switch } from 'react-router';
import Loading from '../components/page/Loading';
import SideMenu from '../components/page/SideMenu';
import { SUPERSET_PREGNANCY_ANALYSIS_ENDPOINT, SUPERSET_SMS_DATA_SLICE } from '../configs/env';
import { providers } from '../configs/settings';
import {
  HIERARCHICAL_DATA_URL,
  LOGOUT_URL,
  NBC_AND_PNC,
  NBC_AND_PNC_COMPARTMENTS_URL,
  NBC_AND_PNC_DASHBOARD_WELCOME,
  NBC_AND_PNC_URL,
  NEWBORN_REPORT,
  NUTRITION,
  NUTRITION_DASHBOARD_WELCOME,
  NUTRITION_LOGFACE_URL,
  NUTRITION_URL,
  PNC_AND_NBC_LOGFACE_URL,
  PREGNANCY,
  PREGNANCY_ANALYSIS_URL,
  PREGNANCY_COMPARTMENTS_URL,
  PREGNANCY_DASHBOARD_WELCOME,
  PREGNANCY_DESCRIPTION,
  PREGNANCY_LOGFACE_URL,
  PREGNANCY_REGISTRATION,
  SMS_TYPE,
} from '../constants';
import { PREGNANCY_URL } from '../constants';
import Compartments from '../containers/Compartments';
import ConnectedHierarchichalDataTable from '../containers/HierarchichalDataTable';
import ConnectedLogFace from '../containers/LogFace';
import Analysis from '../containers/pages/Analysis';
import Home from '../containers/pages/Home';
import ModuleHome from '../containers/pages/ModuleHome';
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
      <SideMenu authenticated={authenticated} />
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
            path={PREGNANCY_URL}
            // tslint:disable-next-line: jsx-no-lambda
            component={() => (
              <ModuleHome
                title={PREGNANCY_DASHBOARD_WELCOME}
                description={PREGNANCY_DESCRIPTION}
                logFaceUrl={PREGNANCY_LOGFACE_URL}
                compartmentUrl={PREGNANCY_COMPARTMENTS_URL}
                analysisUrl={PREGNANCY_ANALYSIS_URL}
              />
            )}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path={NBC_AND_PNC_URL}
            // tslint:disable-next-line: jsx-no-lambda
            component={() => (
              <ModuleHome
                title={NBC_AND_PNC_DASHBOARD_WELCOME}
                description={PREGNANCY_DESCRIPTION}
                logFaceUrl={PREGNANCY_LOGFACE_URL}
                compartmentUrl={NBC_AND_PNC_COMPARTMENTS_URL}
                analysisUrl={PREGNANCY_ANALYSIS_URL}
              />
            )}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path={NUTRITION_URL}
            // tslint:disable-next-line: jsx-no-lambda
            component={() => (
              <ModuleHome
                title={NUTRITION_DASHBOARD_WELCOME}
                description={PREGNANCY_DESCRIPTION}
                deactivateLinks={true}
                logFaceUrl={NUTRITION_LOGFACE_URL}
              />
            )}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path={PREGNANCY_COMPARTMENTS_URL}
            // tslint:disable-next-line: jsx-no-lambda
            component={() => (
              <Compartments
                filterArgs={[
                  {
                    comparator: '===',
                    field: SMS_TYPE,
                    value: PREGNANCY_REGISTRATION,
                  },
                ]}
                module={PREGNANCY}
              />
            )}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path={NBC_AND_PNC_COMPARTMENTS_URL}
            // tslint:disable-next-line: jsx-no-lambda
            component={() => (
              <Compartments
                filterArgs={[
                  {
                    comparator: '===',
                    field: SMS_TYPE,
                    value: NEWBORN_REPORT,
                  },
                ]}
                module={NBC_AND_PNC}
              />
            )}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path={`${HIERARCHICAL_DATA_URL}/:module?/:risk_highlighter?/:title?/:current_level?/:direction?/:node_id?/:from_level?`}
            component={ConnectedHierarchichalDataTable}
          />
          <ConnectedPrivateRoute
            disableLoginProtection={false}
            exact={true}
            path={PREGNANCY_ANALYSIS_URL}
            // tslint:disable-next-line: jsx-no-lambda
            component={() => <Analysis endpoint={SUPERSET_PREGNANCY_ANALYSIS_ENDPOINT} />}
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

          <ConnectedPrivateRoute
            exact={false}
            path={PREGNANCY_LOGFACE_URL}
            // tslint:disable-next-line: jsx-no-lambda
            component={() => (
              <ConnectedLogFace header={PREGNANCY} sliceId={SUPERSET_SMS_DATA_SLICE} />
            )}
          />
          <ConnectedPrivateRoute
            exact={false}
            path={PNC_AND_NBC_LOGFACE_URL}
            // tslint:disable-next-line: jsx-no-lambda
            component={() => (
              <ConnectedLogFace header={NBC_AND_PNC} sliceId={SUPERSET_SMS_DATA_SLICE} />
            )}
          />
          <ConnectedPrivateRoute
            exact={false}
            path={NUTRITION_LOGFACE_URL}
            // tslint:disable-next-line: jsx-no-lambda
            component={() => (
              <ConnectedLogFace header={NUTRITION} sliceId={SUPERSET_SMS_DATA_SLICE} />
            )}
          />
          {/* tslint:disable jsx-no-lambda */}
          <Route
            exact={true}
            path="/oauth/callback/:id"
            render={routeProps => (
              <ConnectedOauthCallback
                LoadingComponent={Loading}
                providers={providers}
                oAuthUserInfoGetter={oAuthUserInfoGetter}
                SuccessfulLoginComponent={Home}
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

const ConnectedRoutes = connect(mapStateToProps)(Routes);

export default ConnectedRoutes;