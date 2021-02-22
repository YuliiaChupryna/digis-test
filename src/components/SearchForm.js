import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ onSubmit, isError = false, isLoading = false, setIsError }) => {
    const [searchValue, setSearchValue] = useState('');
    const [lastQuery, setLastQuery] = useState('');

    const handleInputChange = ({ target: { value } }) => {
        setIsError(false);
        setSearchValue(value.trimStart());
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(searchValue.toLowerCase().trim());
        setLastQuery(searchValue);
        setSearchValue('');
    }
    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                className="search-form__input"
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={handleInputChange}
            />
            <button
                className="search-form__button"
                disabled={isLoading || searchValue === ''}
                type="submit"
                onClick={handleSubmit}
            >
                {isLoading ? 'Loading...' : 'Search'}
            </button>
            {isError && <p className="search-form__error-text">{`Oops. Forecast for '${lastQuery}' was not found`}</p>}
        </form>
    );
};

export default SearchForm;

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setIsError: PropTypes.func.isRequired,
};