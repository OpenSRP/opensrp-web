import React from 'react';
import ConnectedManifestReleases from '../../../../formConfig/Manifest/Releases';
import { OPENSRP_API_BASE_URL } from '../../../../configs/env';
import Loading from '../../../../components/page/Loading';
import { OPENSRP_MANIFEST_ENDPOINT } from '../../../../constants';
import { generateOptions } from '../../../../services/opensrp';

export const ManifestReleasesPage = () => {
    const manifestReleasesProps = {
        baseURL: OPENSRP_API_BASE_URL,
        endpoint: OPENSRP_MANIFEST_ENDPOINT,
        getPayload: generateOptions,
    };
    return <ConnectedManifestReleases {...manifestReleasesProps} />;
};
