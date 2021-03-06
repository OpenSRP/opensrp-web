import reducerRegistry from '@onaio/redux-reducer-registry';
import { act } from 'react-dom/test-utils';
import { fetchManifestFiles, filesReducerName, manifestFilesReducer } from '@opensrp/form-config';
import { OpenSRPService } from '@opensrp/server-service';
import { mount, shallow } from 'enzyme';
import flushPromises from 'flush-promises';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { JSONValidatorListPage } from '..';
import { fixManifestFiles } from './fixtures';
import store from '../../../../../store';

/** register the reducers */
reducerRegistry.register(filesReducerName, manifestFilesReducer);

const history = createBrowserHistory();

describe('containers/pages/ConfigForm/JSONValidator', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        shallow(<JSONValidatorListPage />);
    });

    it('renders validators list correctly', async () => {
        const mockList = jest.fn();
        OpenSRPService.prototype.list = mockList;
        mockList.mockReturnValueOnce(Promise.resolve(fixManifestFiles));

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <JSONValidatorListPage />
                </Router>
            </Provider>,
        );
        await act(async () => {
            await flushPromises();
            wrapper.update();
        });
        const helmet = Helmet.peek();
        expect(helmet.title).toEqual('JSON Validators');
        expect(wrapper.find('.page-title').text()).toEqual('JSON Validators');

        store.dispatch(fetchManifestFiles(fixManifestFiles));
        wrapper.update();
        expect(wrapper.find('ManifestFilesList').props()).toMatchSnapshot();

        expect(wrapper.find('DrillDownTable').length).toEqual(1);

        expect(wrapper.find('SearchBar').length).toEqual(1);
    });
});
