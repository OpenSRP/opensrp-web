import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import SubMenu from '..';

const history = createBrowserHistory();

describe('components/page/SubMenu', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        const mock: jest.Mock = jest.fn();
        const props = {
            childNavs: [],
            collapsedModuleLabel: 'All client Records',
            history,
            location: mock,
            match: mock,
            parentNav: { icon: ['far', 'user'] as IconProp, label: 'All client Records' },
        };
        shallow(
            <Router history={history}>
                <SubMenu {...props} />
            </Router>,
        );
    });

    it('renders subMenu correctly when in collapsed state', () => {
        const mock: jest.Mock = jest.fn();
        const props = {
            childNavs: [
                { label: 'Users', url: '/users' },
                { label: 'Roles', url: '/roles' },
            ],
            collapsedModuleLabel: 'Admin',
            history,
            location: { pathname: '/users' },
            match: mock,
            parentNav: { icon: ['fas', 'cog'] as IconProp, label: 'Admin' },
        };

        const wrapper = mount(
            <Router history={history}>
                <SubMenu {...props} />
            </Router>,
        );
        // parent nav
        const parentNav = wrapper.find('.collapse-menu-title');
        expect(parentNav.length).toEqual(1);

        // the child navs
        const usersNav = wrapper.find('div.collapse.show a[href="/users"]');
        expect(usersNav.length).toEqual(1);

        const rolesNav = wrapper.find('div.collapse.show a[href="/roles"]');
        expect(rolesNav.length).toEqual(1);

        wrapper.unmount();
    });

    it('renders subMenu correctly when in closed state', () => {
        const mock: jest.Mock = jest.fn();
        const props = {
            childNavs: [
                { label: 'Users', url: '/users' },
                { label: 'Roles', url: '/roles' },
            ],
            collapsedModuleLabel: '',
            history,
            location: { pathname: '/users' },
            match: mock,
            parentNav: { icon: ['fas', 'cog'] as IconProp, label: 'Admin' },
        };

        const wrapper = mount(
            <Router history={history}>
                <SubMenu {...props} />
            </Router>,
        );
        // parent nav
        const parentNav = wrapper.find('.collapse-menu-title');
        expect(parentNav.length).toEqual(1);

        // the child navs
        const usersNav = wrapper.find('div.collapse.show a[href="/users"]');
        expect(usersNav.length).toEqual(0);

        const rolesNav = wrapper.find('div.collapse.show a[href="/roles"]');
        expect(rolesNav.length).toEqual(0);

        wrapper.unmount();
    });

    it('simulates click and calls mock function properly', () => {
        const mockCallBack = jest.fn();
        const mock = jest.fn();
        const pathname = '/somePath';
        const props = {
            childNavs: [
                { label: 'Users', url: '/users' },
                { label: 'Roles', url: '/roles' },
            ],
            collapsedModuleLabel: '',
            history,
            location: { pathname },
            match: mock,
            parentNav: { icon: ['fas', 'cog'] as IconProp, label: 'Admin' },
            setCollapsedModuleLabel: mockCallBack,
        };
        const wrapper = mount(
            <Router history={history}>
                <SubMenu {...props} />
            </Router>,
        );
        wrapper.find('Nav .side-collapse-nav').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
        wrapper.unmount();
    });

    it('simulates click and calls mock function with correct value', () => {
        const mockCallBack = jest.fn();
        const mock = jest.fn();
        const pathname = '/somePath';
        const props = {
            childNavs: [
                { label: 'Users', url: '/users' },
                { label: 'Roles', url: '/roles' },
            ],
            collapsedModuleLabel: 'Admin',
            history,
            location: { pathname },
            match: mock,
            parentNav: { icon: ['fas', 'cog'] as IconProp, label: 'Admin' },
            setCollapsedModuleLabel: mockCallBack,
        };
        const wrapper = mount(
            <Router history={history}>
                <SubMenu {...props} />
            </Router>,
        );
        wrapper.find('Nav .side-collapse-nav').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
        expect(mockCallBack.mock.calls).toEqual([['']]);
        wrapper.unmount();
    });

    it('module link is rendered correctly when it has url', () => {
        const mock: jest.Mock = jest.fn();
        const props = {
            childNavs: [],
            collapsedModuleLabel: 'Reports',
            history,
            location: mock,
            match: mock,
            parentNav: { url: '/reports', icon: ['far', 'user'] as IconProp, label: 'Reports' },
        };
        const wrapper = mount(
            <Router history={history}>
                <SubMenu {...props} />
            </Router>,
        );
        // the parent Nav should be rendered as a navigational link
        const parentNav = wrapper.find('#module-link NavLink');
        expect(parentNav.length).toEqual(1);
    });
});
