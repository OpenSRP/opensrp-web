import { history } from '@onaio/connected-reducer-registry';
import { ConnectedRouter } from 'connected-react-router';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import ConnectedLogFace from '..';
import { DEFAULT_NUMBER_OF_LOGFACE_ROWS } from '../../../constants';
import store from '../../../store';
import { fetchSms } from '../../../store/ducks/sms_events';
import { smsSlice } from './fixtures';

describe('components/ConnectedHeader', () => {
  const props = { header: 'Pregnancy' };
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <ConnectedLogFace {...props} />
      </Provider>
    );
  });

  it('renders correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedLogFace {...props} />
      </Provider>
    );
    expect(toJson(wrapper.find('table'))).toMatchSnapshot('table snapshot');
    expect(toJson(wrapper.find('.location-type-filter'))).toMatchSnapshot('filter div');
    expect(toJson(wrapper.find('input#input'))).toMatchSnapshot('search div');
    expect(toJson(wrapper.find('#logface_title'))).toMatchSnapshot('logface title');
    expect(toJson(wrapper.find('.paginator'))).toMatchSnapshot('paginator');
    wrapper.unmount();
  });

  it('it renders only 10 items per page ', () => {
    store.dispatch(fetchSms(smsSlice));
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedLogFace {...props} />
        </ConnectedRouter>
      </Provider>
    );

    // + 1 is added here to unclude the header `tr`
    expect(wrapper.find('tr').length).toBe(DEFAULT_NUMBER_OF_LOGFACE_ROWS + 1);
    wrapper.unmount();
  });

  it('search works correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedLogFace {...props} />
        </ConnectedRouter>
      </Provider>
    );

    expect(wrapper.find('input').length).toBe(1);
    wrapper.find('input').simulate('change', { target: { value: '1569837448461' } });
    // + 1 is added here to unclude the header `tr`
    expect(wrapper.find('tr').length).toBe(DEFAULT_NUMBER_OF_LOGFACE_ROWS + 1);
  });
});