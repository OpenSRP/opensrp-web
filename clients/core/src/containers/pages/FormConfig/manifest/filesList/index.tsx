import React from 'react';
import { Store } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { OPENSRP_API_BASE_URL } from '../../../../../configs/env';
import Loading from '../../../../../components/page/Loading';
import {
    VIEW_RELEASE_PAGE_URL,
    OPENSRP_FORMS_ENDPOINT,
    OPENSRP_MANIFEST_ENDPOINT,
    MANIFEST_FILE_UPLOAD,
} from '../../../../../constants';
import ConnectedManifestFilesList from '../../../../../formConfig/Manifest/FilesList';
import { generateOptions } from '../../../../../services/opensrp';

/**manifest files props interface */

interface ManifestFilesProps {
    formVersion: string;
}

/**simple wrapper for manifest file lists component */
const ManifestFiles = (props: ManifestFilesProps) => {
    const { formVersion } = props;
    const ManifestFilesListProps = {
        baseURL: OPENSRP_API_BASE_URL,
        currentUrl: VIEW_RELEASE_PAGE_URL,
        endpoint: OPENSRP_FORMS_ENDPOINT,
        fileUploadUrl: MANIFEST_FILE_UPLOAD,
        formVersion,
        getPayload: generateOptions,
        LoadingComponent: <Loading />,
        manifestEndPoint: OPENSRP_MANIFEST_ENDPOINT,
    };

    return <ConnectedManifestFilesList {...ManifestFilesListProps} />;
};

/** Map props to state
 * @param {Partial<Store>} -  the  redux store
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (_: Partial<Store>, ownProps: RouteComponentProps<any>): ManifestFilesProps => {
    const formVersion = ownProps.match.params.id;
    return {
        formVersion,
    };
};

/** Connected ManifestFiles component */
const ConnectedManifestFiles = connect(mapStateToProps)(ManifestFiles);

export default ConnectedManifestFiles;
