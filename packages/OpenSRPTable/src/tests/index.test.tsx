import { mount } from 'enzyme';
import React from 'react';
import { OpenSRPTable } from '..';
import { columns, firstNameSortedTDs, tableData } from './fixtures';

const TestComponent: React.FC<{}> = () => (
    <OpenSRPTable data={tableData} tableColumns={React.useMemo(() => columns, [])} />
);

describe('src/components/ReactTable', () => {
    it('renders without crashing', () => {
        mount(<TestComponent />);
    });

    it('renders correctly', () => {
        const wrapper = mount(<TestComponent />);
        expect(wrapper.find('.react-table').length).toEqual(1);
        expect(wrapper.find('tbody tr').length).toEqual(404);
        // sort on visits is disabled.
        expect(wrapper.find('.react-table thead').text()).toMatchInlineSnapshot(
            `"First Name   ↕Last Name   ↕Age   ↕VisitsStatus   ↕Profile Progress   ↕"`,
        );
    });

    it('sorts data ', () => {
        const wrapper = mount(<TestComponent />);
        // simulate click on one of the columns; will choose first name
        const firstNameTH = wrapper.find('.react-table thead th').at(0);
        expect(firstNameTH.text()).toMatchInlineSnapshot(`"First Name   ↕"`);
        firstNameTH.simulate('click');
        wrapper.update();
        // note the arrow changes its now pointing up - expect data to be sorted in asc
        expect(firstNameTH.text()).toMatchInlineSnapshot(`"First Name   ↑"`);

        // grab all first Names records and make sure they are sorted.
        const allTableRows = wrapper.find('.react-table tbody tr');
        const allFirstNameTDs = allTableRows.map(eachRow =>
            eachRow
                .find('td')
                .at(0)
                .text(),
        );
        expect(allFirstNameTDs).toEqual(firstNameSortedTDs);
        firstNameTH.simulate('click');
        wrapper.update();
        // note the arrow changes its now pointing down - expect data to be sorted in desc
        expect(firstNameTH.text()).toMatchInlineSnapshot(`"First Name   ↓"`);
    });
});
