import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Store } from 'redux';
import { OPENSRP_CLIENT_ENDPOINT, OPENSRP_HOUSEHOLD_ENDPOINT } from '../../../configs/env';
import { OpenSRPService } from '../../../services/opensrp';
import clientReducer, {
  fetchClient,
  fetchEvents,
  fetchMembers,
  getClient,
  getEventsArray,
  getMembersArray,
  reducerName as clientReducerName,
} from '../../../store/ducks/client';
import { Event } from '../../../store/ducks/client';
import { Household } from '../../../store/ducks/clients';

/** register the client reducer */
reducerRegistry.register(clientReducerName, clientReducer);

/** interface for HouseholdProfile URL params */
interface HouseholdProfileURLParams {
  id: string;
}

/** interface for HouseholdProfileProps */
export interface HouseholdProfileProps extends RouteComponentProps<HouseholdProfileURLParams> {
  household: Household;
  events: Event[];
  members: Household[];
  fetchClientActionCreator: typeof fetchClient;
  fetchMembersActionCreator: typeof fetchMembers;
  fetchEventsActionCreator: typeof fetchEvents;
  opensrpService: typeof OpenSRPService;
}

class HouseholdProfile extends React.Component<HouseholdProfileProps> {
  public render() {
    const { match } = this.props;
    const householdId = match.params.id || '';
    return <div> Household Profile {householdId} </div>;
  }
}

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  household: Household;
  events: Event[];
  members: Household[];
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    events: getEventsArray(state),
    household: getClient(state),
    members: getMembersArray(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {
  fetchClientActionCreator: fetchClient,
  fetchEventsActionCreator: fetchEvents,
  fetchMembersActionCreator: fetchMembers,
};

const ConnectedHouseholdProfile = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HouseholdProfile)
);

export default ConnectedHouseholdProfile;
