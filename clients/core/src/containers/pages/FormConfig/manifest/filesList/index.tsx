import React from 'react';
import { Store } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { OPENSRP_API_BASE_URL } from '../../../../../configs/env';
import Loading from '../../../../../components/page/Loading';
import {
    MANIFEST_FILE_UPLOAD,
    OPENSRP_MANIFEST_FORMS_ENDPOINT,
    OPENSRP_FORMS_ENDPOINT,
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
    const manifestFilesListProps = {
        baseURL: OPENSRP_API_BASE_URL,
        downloadEndPoint: OPENSRP_FORMS_ENDPOINT,
        endpoint: OPENSRP_MANIFEST_FORMS_ENDPOINT,
        fileUploadUrl: MANIFEST_FILE_UPLOAD,
        formVersion,
        getPayload: generateOptions,
        isJsonValidator: false,
        LoadingComponent: <Loading />,
    };

    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}> Release Files</h4>
            <ConnectedManifestFilesList {...manifestFilesListProps} />
        </div>
    );
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
