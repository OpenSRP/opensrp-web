import { Client } from './clients';
import {
    fetchClientsFactory,
    removeClientsFactory,
    setTotalRecordsFactory,
    reducerFactory,
    getClientsByIdFactory,
    getClientsArrayFactory,
    getClientByIdFactory,
    getTotalRecordsFactory,
} from './baseClients';

/** The reducer name */
export const reducerName = 'opensrp-web/client-type/child';

/** Interface for Child object same as client */
export type Child = Client;

/** Client Reducer */
const reducer = reducerFactory<Child>(reducerName);

// action creators
export const fetchChildList = fetchClientsFactory<Child>(reducerName);
export const removeChildList = removeClientsFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// selectors
export const getChildListById = getClientsByIdFactory<Child>(reducerName);
export const getChildArray = getClientsArrayFactory<Child>(reducerName);
export const getChildById = getClientByIdFactory<Child>(reducerName);
export const getTotalRecords = getTotalRecordsFactory(reducerName);

export default reducer;
