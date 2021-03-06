import React, { ChangeEvent } from 'react';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/index.css';
import { SEARCH_LABEL } from '../../constants';

/** SearchBar props interface  */
export interface SearchBarDefaultProps {
    placeholder?: string;
    debounceTime?: number;
}

/** function type for custom onChangeHandler functions */
export type OnChangeType = (event: ChangeEvent<HTMLInputElement>) => void;

/** search bar props interface */
export interface SearchBarProps extends SearchBarDefaultProps {
    onChangeHandler: OnChangeType;
}

/** simple component for handling search */
export const SearchBar = (props: SearchBarProps) => {
    const { placeholder, debounceTime, onChangeHandler } = props;

    /** inbuilt default onChangeHandler that debounces the passed changeHandler
     * @param {ChangeEvent<HTMLInputElement>} event - the input event
     */
    const debouncedOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const debouncedFn = debounce((ev: ChangeEvent<HTMLInputElement>) => onChangeHandler(ev), debounceTime);
        debouncedFn(event);
    };

    return (
        <div className="search-input-wrapper">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text bg-transparent border-right-0">
                        <FontAwesomeIcon className="search-icon" icon="search" />
                    </span>
                </div>
                <input
                    type="text"
                    className="form-control border-left-0 border search-input"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                    name="search"
                    placeholder={placeholder}
                    onInput={debouncedOnChangeHandler}
                />
            </div>
        </div>
    );
};

/** default props */
const defaultProps: SearchBarDefaultProps = {
    placeholder: SEARCH_LABEL,
    debounceTime: 1000,
};

SearchBar.defaultProps = defaultProps;

export { SearchBar };
