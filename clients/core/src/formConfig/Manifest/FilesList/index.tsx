import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { OpenSRPService, URLParams } from '@opensrp/server-service';
import SearchBar, { SearchBarDefaultProps } from '../../SearchBar/searchBar';
import { Store } from 'redux';
import { DrillDownTable } from '@onaio/drill-down-table';
import { connect } from 'react-redux';
import { FormConfigProps } from '../../helpers/types';
import { handleDownload } from '../../helpers/fileDownload';
import { Link } from 'react-router-dom';
import FilesReducer, {
    fetchManifestFiles,
    reducerName,
    ManifestFilesTypes,
    getAllManifestFilesArray,
    removeManifestFiles,
} from '../../ducks/manifestFiles';
import { Row, Col } from 'reactstrap';

/** Register reducer */
reducerRegistry.register(reducerName, FilesReducer);

/** default props interface */
interface DefaultProps extends SearchBarDefaultProps {
    data: ManifestFilesTypes[];
    fetchFiles: typeof fetchManifestFiles;
    removeFiles: typeof removeManifestFiles;
}

/** manifest files list props interface */
interface ManifestFilesListProps extends DefaultProps, FormConfigProps {
    downloadEndPoint: string;
    formVersion: string | null;
    fileUploadUrl: string;
    isJsonValidator: boolean;
    uploadTypeUrl: string;
}

/** view manifest forms */
const ManifestFilesList = (props: ManifestFilesListProps) => {
    const {
        baseURL,
        endpoint,
        getPayload,
        LoadingComponent,
        data,
        debounceTime,
        placeholder,
        fetchFiles,
        fileUploadUrl,
        isJsonValidator,
        growl,
        formVersion,
        downloadEndPoint,
        removeFiles,
        uploadTypeUrl,
    } = props;

    const [loading, setLoading] = useState(false);
    const [stateData, setStateData] = useState<ManifestFilesTypes[]>(data);

    /** get manifest files */
    const getManifestForms = async () => {
        setLoading(true);
        let params = null;
        // if form version is available -  means request is to get manifest files else get json validator files
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        params = formVersion ? { identifier: formVersion } : { is_json_validator: true };
        removeFiles();
        const clientService = new OpenSRPService(baseURL, endpoint, getPayload);
        await clientService
            .list(params)
            .then((res: ManifestFilesTypes[]) => {
                fetchFiles(res);
            })
            .catch(error => {
                growl && growl(String(error), { type: 'error' });
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getManifestForms();
    }, []);

    useEffect(() => {
        setStateData(data);
    }, [data]);

    /**
     *
     * @param {string} name name of file
     * @param {URLParams} params url params
     */
    const downloadFile = async (name: string, params: URLParams) => {
        const clientService = new OpenSRPService(baseURL, downloadEndPoint, getPayload);
        await clientService
            .list(params)
            .then(res => {
                handleDownload(res.clientForm.json, name);
            })
            .catch(error => {
                growl && growl(String(error), { type: 'error' });
            });
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toUpperCase();
        const searchResult = data.filter(
            dt =>
                dt.label.toUpperCase().includes(input) ||
                dt.identifier.toUpperCase().includes(input) ||
                (dt.module && dt.module.toUpperCase().includes(input)),
        );
        setStateData(searchResult);
    };

    /**
     * called when download link is clicked
     * @param {MouseEvent} e
     * @param {ManifestFilesTypes} obj table row data
     */
    const onDownloadClick = (e: MouseEvent, obj: ManifestFilesTypes) => {
        e.preventDefault();
        const { identifier } = obj;
        const params = {
            form_identifier: identifier, // eslint-disable-line @typescript-eslint/camelcase
            form_version: obj.version, // eslint-disable-line @typescript-eslint/camelcase
        };

        downloadFile(identifier, params);
    };

    /**
     * create edit upload link
     * @param {TableData} obj table row data
     */
    const linkToEditFile = (obj: ManifestFilesTypes) => {
        return <Link to={`${fileUploadUrl}/${uploadTypeUrl}/${obj.id}`}>Upload Edit</Link>;
    };
    let columns = [
        {
            Header: 'Identifier',
            accessor: `identifier`,
        },
        {
            Header: 'File Name',
            accessor: `label`,
        },
        {
            Header: 'File Version',
            accessor: `version`,
        },
        {
            Header: 'Module',
            accessor: (obj: ManifestFilesTypes) => (() => <span>{obj.module || '_'}</span>)(),
            disableSortBy: true,
        },
        {
            Header: 'Edit',
            accessor: (obj: ManifestFilesTypes) => linkToEditFile(obj),
            disableSortBy: true,
        },
        {
            Header: ' ',
            accessor: (obj: ManifestFilesTypes) =>
                (() => (
                    <a href="#" onClick={e => onDownloadClick(e, obj)}>
                        Download
                    </a>
                ))(),
            disableSortBy: true,
        },
    ];

    if (isJsonValidator) {
        columns = columns.filter(col => col.Header !== 'Module');
    }

    const DrillDownTableProps = {
        columns,
        data: stateData,
        paginate: false,
        useDrillDown: false,
    };

    const searchBarProps = {
        debounceTime,
        onChangeHandler,
        placeholder,
    };

    if (LoadingComponent && loading) {
        return <div>{LoadingComponent}</div>;
    }

    return (
        <div>
            <Row>
                <Col xs="8">
                    <SearchBar {...searchBarProps} />
                </Col>
                <Col xs="4">
                    {isJsonValidator && (
                        <Link className="btn btn-secondary float-right" to={`${fileUploadUrl}/${uploadTypeUrl}`}>
                            Upload New File
                        </Link>
                    )}
                </Col>
            </Row>
            <DrillDownTable {...DrillDownTableProps} />
        </div>
    );
};

/** declear default props */
const defaultProps: DefaultProps = {
    data: [],
    debounceTime: 1000,
    fetchFiles: fetchManifestFiles,
    placeholder: 'Find Release Files',
    removeFiles: removeManifestFiles,
};

/** pass default props to component */
ManifestFilesList.defaultProps = defaultProps;
export { ManifestFilesList };

/** Connect the component to the store */

/** interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    data: ManifestFilesTypes[];
}

/** Map props to state
 * @param {Partial<Store>} -  the  redux store
 */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const data: ManifestFilesTypes[] = getAllManifestFilesArray(state);
    data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return {
        data,
    };
};

/** map dispatch to props */
const mapDispatchToProps = {
    fetchFiles: fetchManifestFiles,
    removeFiles: removeManifestFiles,
};

/** Connected ManifestFilesList component */
const ConnectedManifestFilesList = connect(mapStateToProps, mapDispatchToProps)(ManifestFilesList);

export default ConnectedManifestFilesList;
