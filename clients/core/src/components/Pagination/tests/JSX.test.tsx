/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { BootstrapJSX, Props } from '../JSX';

describe('src/components/pagination/bootsrapJSX', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        const genericMock = jest.fn();
        const props: Props = {
            paginationState: {
                ellipsisIsLoading: false,
                showEndingEllipsis: false,
                currentPage: 4,
                pagesToDisplay: ['2', '3', '4', '5', '6'],
            } as any,
            nextPage: genericMock,
            firstPage: genericMock,
            lastPage: genericMock,
            goToPage: genericMock,
            previousPage: genericMock,
            canNextPage: true,
            canPreviousPage: true,
        };
        shallow(<BootstrapJSX {...props} />);
    });

    it('renders correctly', () => {
        const genericMock = jest.fn();
        const props = {
            paginationState: {
                ellipsisIsLoading: false,
                showEndingEllipsis: false,
                currentPage: 4,
                pagesToDisplay: ['2', '3', '4', '5', '6'],
            } as any,
            nextPage: genericMock,
            firstPage: genericMock,
            lastPage: genericMock,
            goToPage: genericMock,
            previousPage: genericMock,
            canNextPage: true,
            canPreviousPage: true,
        };
        const wrapper = mount(<BootstrapJSX {...props} />);
        expect(wrapper.text()).toEqual('StartStartPreviousPrevious23456NextNextLastLast');
        const paginationItems = wrapper.find('PaginationItem');
        expect(paginationItems.length).toEqual(9);

        // start pagination item should not be disabled
        expect(paginationItems.at(0).hasClass('disabled')).toBeFalsy();
        // previous pagination item should not be disabled
        expect(paginationItems.at(1).hasClass('disabled')).toBeFalsy();
        // next pagination item should not be disabled
        expect(paginationItems.at(7).hasClass('disabled')).toBeFalsy();
        // last pagination item should not be disabled
        expect(paginationItems.at(8).hasClass('disabled')).toBeFalsy();
        // pagination item for page 4 should be active
        expect(paginationItems.at(4).hasClass('active')).toBeTruthy();
    });

    it('pagination items invokes the correct callbacks', () => {
        const genericMock = jest.fn();
        const props = {
            paginationState: {
                ellipsisIsLoading: true,
                showEndingEllipsis: false,
                currentPage: 4,
                pagesToDisplay: ['2', '3', '4', '5', '6'],
            } as any,
            nextPage: genericMock,
            firstPage: genericMock,
            lastPage: genericMock,
            goToPage: genericMock,
            previousPage: genericMock,
            canNextPage: true,
            canPreviousPage: true,
            fetchMoreApiData: genericMock,
        };
        const wrapper = mount(<BootstrapJSX {...props} />);
        const paginationItems = wrapper.find('PaginationItem');
        paginationItems.forEach(item => {
            const paginationLink = item.find('PaginationLink');
            paginationLink.simulate('click');
        });
        expect(genericMock.mock.calls).toEqual([[], [], [2], [3], [4], [5], [6], [], []]);
    });
});
