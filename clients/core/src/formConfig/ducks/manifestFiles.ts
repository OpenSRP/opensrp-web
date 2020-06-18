import {
    fetchActionCreatorFactory,
    removeActionCreatorFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
} from '@opensrp/reducer-factory';

/** manifest files interface */
export interface ManifestFilesTypes {
    createdAt: string;
    id: string;
    identifier: string;
    isDraft: boolean;
    isJsonValidator: boolean;
    jursdiction: string;
    label: string;
    module: string;
    version: string;
}

/** reducer name */
export const reducerName = 'manifestFiles';

/** manifest files Reducer */
const reducer = reducerFactory<ManifestFilesTypes>(reducerName);

// action
/** fetch manifest files to store action */
export const fetchManifestFiles = fetchActionCreatorFactory<ManifestFilesTypes>(reducerName, 'id');

/** clear manifest files data in store action*/
export const removeManifestFiles = removeActionCreatorFactory(reducerName);

// selectors
export const getAllManifestFilesById = getItemsByIdFactory<ManifestFilesTypes>(reducerName);
export const getManifestFilesById = getItemByIdFactory<ManifestFilesTypes>(reducerName);
export const getAllManifestFilesArray = getItemsArrayFactory<ManifestFilesTypes>(reducerName);

export default reducer;
